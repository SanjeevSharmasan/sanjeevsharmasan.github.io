/**
 * Local, offline-capable speech recognition with Whisper running in the browser
 * (transformers.js + WebGPU/WASM). Audio never leaves the machine.
 */
const CDN = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2';
const TARGET_RATE = 16000;

export const WHISPER_MODELS = [
  { id: 'onnx-community/whisper-tiny', label: 'Tiny · fastest', size: '~45 MB', note: 'Good for quick notes' },
  { id: 'onnx-community/whisper-base', label: 'Base · balanced', size: '~85 MB', note: 'Recommended' },
  { id: 'onnx-community/whisper-small', label: 'Small · accurate', size: '~260 MB', note: 'Slow on CPU' }
];

let libPromise = null;
let pipelinePromise = null;
let currentKey = '';

function loadLib() {
  if (!libPromise) libPromise = import(/* @vite-ignore */ `${CDN}/+esm`);
  return libPromise;
}

async function hasWebGPU() {
  try {
    if (!navigator.gpu) return false;
    const adapter = await navigator.gpu.requestAdapter();
    return !!adapter;
  } catch { return false; }
}

/**
 * Load (or reuse) the ASR pipeline.
 * @param {string} model
 * @param {(p:{status:string,progress:number,file?:string})=>void} onProgress
 */
export async function loadModel(model, onProgress = () => {}) {
  const key = model;
  if (pipelinePromise && currentKey === key) return pipelinePromise;

  currentKey = key;
  pipelinePromise = (async () => {
    const { pipeline, env } = await loadLib();
    env.allowLocalModels = false;
    env.useBrowserCache = true;

    const gpu = await hasWebGPU();
    const build = async (device) => {
      const opts = {
        device,
        progress_callback: p => {
          if (p.status === 'progress' && p.total) {
            onProgress({
              status: 'download',
              progress: Math.max(0, Math.min(100, (p.loaded / p.total) * 100)),
              file: p.file
            });
          } else if (p.status === 'ready') {
            onProgress({ status: 'ready', progress: 100 });
          }
        }
      };
      if (device === 'webgpu') {
        opts.dtype = { encoder_model: 'fp32', decoder_model_merged: 'q4' };
      } else {
        opts.dtype = 'q8';
      }
      return pipeline('automatic-speech-recognition', model, opts);
    };

    if (gpu) {
      try {
        onProgress({ status: 'device', progress: 0, file: 'webgpu' });
        return await build('webgpu');
      } catch (err) {
        console.warn('[echo] WebGPU failed, falling back to WASM', err);
      }
    }
    onProgress({ status: 'device', progress: 0, file: 'wasm' });
    return build('wasm');
  })().catch(err => { pipelinePromise = null; throw err; });

  return pipelinePromise;
}

export function preloadModel(model, onProgress) {
  return loadModel(model, onProgress).catch(() => {});
}

/** Decode any audio/video file into a mono Float32Array at 16 kHz. */
export async function decodeToMono(fileOrBlob, onStatus = () => {}) {
  onStatus('Reading file…');
  const buffer = await fileOrBlob.arrayBuffer();

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) throw new Error('Web Audio is not available in this browser.');

  let ctx;
  try {
    ctx = new Ctx({ sampleRate: TARGET_RATE });
  } catch {
    ctx = new Ctx();
  }

  onStatus('Decoding audio…');
  let decoded;
  try {
    decoded = await ctx.decodeAudioData(buffer.slice(0));
  } catch (err) {
    ctx.close?.();
    throw new Error('Could not decode this file. Try MP3, WAV, M4A, OGG, WEBM or MP4.');
  }

  let mono = mixdown(decoded);

  if (decoded.sampleRate !== TARGET_RATE) {
    onStatus('Resampling audio…');
    const length = Math.ceil(decoded.duration * TARGET_RATE);
    const off = new OfflineAudioContext(1, length, TARGET_RATE);
    const src = off.createBufferSource();
    src.buffer = decoded;
    src.connect(off.destination);
    src.start();
    const rendered = await off.startRendering();
    mono = rendered.getChannelData(0);
  }

  ctx.close?.();
  return { audio: mono, duration: decoded.duration, sampleRate: TARGET_RATE };
}

function mixdown(audioBuffer) {
  const channels = audioBuffer.numberOfChannels;
  if (channels === 1) return audioBuffer.getChannelData(0).slice();
  const len = audioBuffer.length;
  const out = new Float32Array(len);
  for (let c = 0; c < channels; c++) {
    const data = audioBuffer.getChannelData(c);
    for (let i = 0; i < len; i++) out[i] += data[i] / channels;
  }
  return out;
}

/**
 * Transcribe a file/Blob.
 * @returns {Promise<{text:string, segments:Array, language?:string, duration:number}>}
 */
export async function transcribeAudio(fileOrBlob, {
  model = 'onnx-community/whisper-base',
  language = 'auto',
  onProgress = () => {},
  onStatus = () => {}
} = {}) {
  const { audio, duration } = await decodeToMono(fileOrBlob, onStatus);

  if (duration < 0.25) throw new Error('That clip is too short to transcribe.');

  onStatus('Loading speech model…');
  const asr = await loadModel(model, onProgress);

  onStatus(duration > 60 ? `Transcribing ${Math.round(duration / 60)} min of audio…` : 'Transcribing…');

  const options = {
    return_timestamps: true,
    chunk_length_s: 30,
    stride_length_s: 5,
    task: 'transcribe'
  };
  if (language && language !== 'auto') options.language = language;

  let output;
  try {
    output = await asr(audio, options);
  } catch (err) {
    if (String(err?.message || '').includes('language')) {
      delete options.language;
      output = await asr(audio, options);
    } else {
      throw err;
    }
  }

  const segments = [];
  const chunks = output?.chunks?.length
    ? output.chunks
    : [{ text: output?.text || '', timestamp: [0, duration] }];

  for (const chunk of chunks) {
    const text = (chunk.text || '').trim();
    if (!text) continue;
    const [start, end] = chunk.timestamp || [0, duration];
    segments.push(...splitIntoSentences(text, start ?? 0, end ?? duration));
  }

  return {
    text: (output?.text || segments.map(s => s.text).join(' ')).trim(),
    segments,
    duration,
    language: language === 'auto' ? undefined : language
  };
}

/** Split dense Whisper chunks into readable, sentence-sized transcript lines. */
function splitIntoSentences(text, start, end) {
  const span = Math.max(0.3, (end || start + 1) - start);
  const parts = text
    .split(/(?<=[.!?…。！？])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  if (parts.length <= 1) return [{ text, start, end }];

  const total = parts.reduce((n, p) => n + p.length, 0) || 1;
  let cursor = start;
  return parts.map((part, i) => {
    const share = (part.length / total) * span;
    const seg = {
      text: part,
      start: +cursor.toFixed(3),
      end: +(i === parts.length - 1 ? end : cursor + share).toFixed(3)
    };
    cursor += share;
    return seg;
  });
}

export async function modelIsCached(model) {
  try {
    if (!('caches' in window)) return false;
    const names = await caches.keys();
    const hit = names.some(n => n.includes('transformers'));
    if (!hit) return false;
    const cache = await caches.open(names.find(n => n.includes('transformers')));
    const keys = await cache.keys();
    return keys.some(r => r.url.includes(model.split('/').pop()));
  } catch { return false; }
}
