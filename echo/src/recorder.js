/** Microphone capture: level metering + recording to a Blob (used for Whisper / Soniox). */
export class MicCapture {
  constructor({ onLevel, onTick } = {}) {
    this.onLevel = onLevel;
    this.onTick = onTick;
    this.stream = null;
    this.ctx = null;
    this.analyser = null;
    this.data = null;
    this.recorder = null;
    this.chunks = [];
    this.mime = '';
    this.startedAt = 0;
    this.pausedTotal = 0;
    this.pausedAt = 0;
    this.raf = 0;
    this.timer = 0;
    this.stopped = false;
  }

  async start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Microphone access requires a secure page (https or http://localhost).');
    }
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1
      }
    });

    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    const src = this.ctx.createMediaStreamSource(this.stream);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.75;
    src.connect(this.analyser);
    this.data = new Uint8Array(this.analyser.fftSize);

    // Optional recording — may not be supported in every browser
    try {
      const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
      this.mime = candidates.find(t => window.MediaRecorder?.isTypeSupported?.(t)) || '';
      if (window.MediaRecorder) {
        this.recorder = this.mime
          ? new MediaRecorder(this.stream, { mimeType: this.mime })
          : new MediaRecorder(this.stream);
        this.recorder.ondataavailable = e => { if (e.data?.size) this.chunks.push(e.data); };
        this.recorder.start(1000);
      }
    } catch (err) {
      console.warn('[echo] recording unavailable', err);
      this.recorder = null;
    }

    this.startedAt = performance.now();
    this.pausedTotal = 0;
    this.stopped = false;
    this._tick();
    return this;
  }

  _tick() {
    if (this.stopped) return;
    if (this.analyser && this.onLevel) {
      this.analyser.getByteTimeDomainData(this.data);
      let sum = 0;
      for (let i = 0; i < this.data.length; i++) {
        const v = (this.data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / this.data.length);
      this.onLevel(Math.min(1, rms * 4.4));
    }
    this.onTick?.(this.elapsedMs());
    this.raf = requestAnimationFrame(() => this._tick());
  }

  elapsedMs() {
    if (!this.startedAt) return 0;
    const now = this.pausedAt || performance.now();
    return Math.max(0, now - this.startedAt - this.pausedTotal);
  }

  pause() {
    if (this.pausedAt) return;
    this.pausedAt = performance.now();
    try { this.recorder?.pause?.(); } catch { /* ignore */ }
  }

  resume() {
    if (!this.pausedAt) return;
    this.pausedTotal += performance.now() - this.pausedAt;
    this.pausedAt = 0;
    try { this.recorder?.resume?.(); } catch { /* ignore */ }
  }

  get paused() { return !!this.pausedAt; }

  async stop() {
    this.stopped = true;
    cancelAnimationFrame(this.raf);
    const elapsed = this.elapsedMs();

    const blob = await new Promise(resolve => {
      if (!this.recorder || this.recorder.state === 'inactive') return resolve(null);
      this.recorder.onstop = () => {
        resolve(this.chunks.length ? new Blob(this.chunks, { type: this.mime || 'audio/webm' }) : null);
      };
      try { this.recorder.stop(); } catch { resolve(null); }
      setTimeout(() => resolve(this.chunks.length ? new Blob(this.chunks, { type: this.mime || 'audio/webm' }) : null), 1500);
    });

    this.stream?.getTracks?.().forEach(t => t.stop());
    try { await this.ctx?.close(); } catch { /* ignore */ }
    this.analyser = null;
    return { blob, elapsedMs: elapsed };
  }
}

/** Trim silence from the ends of a float32 array (cheap, helps Whisper). */
export function trimSilence(audio, threshold = 0.006) {
  let start = 0, end = audio.length - 1;
  while (start < end && Math.abs(audio[start]) < threshold) start++;
  while (end > start && Math.abs(audio[end]) < threshold) end--;
  if (end - start < 1600) return audio;
  const pad = 800;
  return audio.subarray(Math.max(0, start - pad), Math.min(audio.length, end + pad));
}
