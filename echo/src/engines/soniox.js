/**
 * Optional Soniox cloud engine (bring your own API key).
 * Uses the async REST API: upload → create transcription → poll → fetch transcript.
 * Docs: https://soniox.com/docs
 */
const BASE = 'https://api.soniox.com/v1';

export const SONIOX_MODELS = [
  { id: 'stt-async-preview', label: 'Async · multilingual' },
  { id: 'stt-async-v4', label: 'Async v4' }
];

async function api(path, { key, method = 'GET', body, signal } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {})
    },
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    signal
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON */ }
  if (!res.ok) {
    const msg = json?.error_message || json?.message || json?.error || text || `HTTP ${res.status}`;
    const err = new Error(`Soniox: ${msg}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function transcribeWithSoniox(file, {
  apiKey,
  filename = 'audio.webm',
  language = 'auto',
  model = 'stt-async-preview',
  diarize = true,
  onStatus = () => {},
  signal
} = {}) {
  if (!apiKey) throw new Error('Add your Soniox API key in Settings → Engines.');

  onStatus('Uploading audio to Soniox…');
  const fd = new FormData();
  fd.append('file', file, filename);
  let uploaded;
  try {
    uploaded = await api('/files', { key: apiKey, method: 'POST', body: fd, signal });
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Could not reach Soniox from the browser (network/CORS). Check your connection or use the local Whisper engine.');
    }
    throw err;
  }

  const fileId = uploaded?.id;
  if (!fileId) throw new Error('Soniox did not return a file id.');

  onStatus('Queued for transcription…');
  const body = {
    file_id: fileId,
    model,
    enable_speaker_diarization: !!diarize
  };
  if (language && language !== 'auto') body.language_hints = [language];

  const created = await api('/transcriptions', { key: apiKey, method: 'POST', body, signal });
  const id = created?.id;
  if (!id) throw new Error('Soniox did not return a transcription id.');

  let status = created.status || 'queued';
  let waited = 0;
  while (status !== 'completed' && status !== 'failed') {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    await sleep(1500);
    waited += 1.5;
    const job = await api(`/transcriptions/${id}`, { key: apiKey, signal });
    status = job.status;
    if (status === 'failed') {
      throw new Error(job.error_message || 'Soniox could not transcribe this file.');
    }
    onStatus(`Transcribing… ${Math.round(waited)}s elapsed`);
    if (waited > 60 * 60) throw new Error('Soniox transcription timed out.');
  }

  onStatus('Fetching transcript…');
  const transcript = await api(`/transcriptions/${id}/transcript`, { key: apiKey, signal });
  const tokens = transcript?.tokens || [];
  const segments = tokensToSegments(tokens);

  // Best-effort cleanup so files don't pile up
  api(`/files/${fileId}`, { key: apiKey, method: 'DELETE' }).catch(() => {});

  return {
    text: tokens.map(t => t.text || '').join(' ').replace(/\s+([,.!?])/g, '$1').trim(),
    segments,
    speakers: segments.speakers || [{ id: 'sp1', name: 'DEFAULT' }]
  };
}

function tokensToSegments(tokens) {
  const segments = [];
  const speakers = [];
  let cur = null;
  let lastEnd = 0;

  const speakerId = (name) => {
    const key = name || 'Speaker 1';
    let found = speakers.find(s => s.name === key);
    if (!found) {
      found = { id: `sp${speakers.length + 1}`, name: key };
      speakers.push(found);
    }
    return found.id;
  };

  for (const t of tokens) {
    const text = t.text || '';
    if (!text.trim() && !cur) continue;
    const start = (t.start_ms ?? 0) / 1000;
    const end = (t.end_ms ?? t.start_ms ?? 0) / 1000;
    const sp = speakerId(t.speaker);
    const gap = start - lastEnd;

    if (!cur || cur.speaker !== sp || gap > 1.2 || cur.text.length > 220) {
      if (cur) segments.push(cur);
      cur = { start, end, speaker: sp, text: '' };
    }
    cur.text += text;
    cur.end = Math.max(cur.end, end);
    lastEnd = end;
  }
  if (cur) segments.push(cur);

  const cleaned = segments
    .map(s => ({
      ...s,
      text: s.text.replace(/\s+/g, ' ').trim()
    }))
    .filter(s => s.text);

  cleaned.speakers = speakers.length ? speakers : [{ id: 'sp1', name: 'DEFAULT' }];
  return cleaned;
}
