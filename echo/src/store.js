/* ── Persistent state (localStorage) + audio blobs (IndexedDB) ───────────── */

const KEY = 'echo.state.v1';
const AUDIO_DB = 'echo-audio';
const AUDIO_STORE = 'clips';

const monthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const baseState = () => ({
  version: 1,
  settings: {
    theme: 'system',
    engine: 'browser',                 // browser | whisper | soniox
    model: 'onnx-community/whisper-base',
    language: 'en',
    translateTo: 'es',
    translationProvider: 'mymemory',   // mymemory | libretranslate | off
    libretranslateUrl: '',
    sonioxKey: '',
    sonioxModel: 'stt-async-preview',
    punctuation: true,
    autoScroll: true,
    autoTranslate: false,
    speakerLabels: true
  },
  projects: [],
  sessions: [],
  usage: { month: monthKey(), seconds: 0 },
  credits: { plan: 'Free', limitMinutes: 300 }
});

let state = baseState();
const listeners = new Set();

function migrate(raw) {
  const base = baseState();
  if (!raw || typeof raw !== 'object') return base;
  return {
    ...base,
    ...raw,
    settings: { ...base.settings, ...(raw.settings || {}) },
    usage: { ...base.usage, ...(raw.usage || {}) },
    credits: { ...base.credits, ...(raw.credits || {}) },
    projects: Array.isArray(raw.projects) ? raw.projects : [],
    sessions: Array.isArray(raw.sessions) ? raw.sessions : []
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    state = migrate(raw ? JSON.parse(raw) : null);
  } catch (err) {
    console.warn('[echo] state reset:', err);
    state = baseState();
  }
  if (state.usage.month !== monthKey()) {
    state.usage = { month: monthKey(), seconds: 0 };
  }
  return state;
}

let saveTimer = null;
export function saveState(immediate = false) {
  const write = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('[echo] could not persist state', err);
    }
  };
  if (immediate) { clearTimeout(saveTimer); write(); return; }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(write, 220);
}

export const getState = () => state;
export const settings = () => state.settings;

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function emit(reason = 'change') {
  saveState();
  listeners.forEach(fn => {
    try { fn(state, reason); } catch (err) { console.error(err); }
  });
}

/* ── projects ────────────────────────────────────────────────────────────── */
export function createProject(name, color = '#6d5efc') {
  const p = { id: `pr_${Date.now().toString(36)}`, name: name.trim() || 'Untitled', color, createdAt: Date.now() };
  state.projects.push(p);
  emit('projects');
  return p;
}

export function updateProject(id, patch) {
  const p = state.projects.find(x => x.id === id);
  if (!p) return;
  Object.assign(p, patch);
  emit('projects');
}

export function deleteProject(id, { keepSessions = true } = {}) {
  state.projects = state.projects.filter(p => p.id !== id);
  if (keepSessions) state.sessions.forEach(s => { if (s.projectId === id) s.projectId = null; });
  else state.sessions = state.sessions.filter(s => s.projectId !== id);
  emit('projects');
}

/* ── sessions ────────────────────────────────────────────────────────────── */
export function createSession(partial = {}) {
  const s = {
    id: `ss_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
    title: 'Untitled recording',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    durationMs: 0,
    language: state.settings.language || 'en',
    translatedTo: '',
    engine: state.settings.engine,
    projectId: null,
    source: 'microphone',      // microphone | file
    sourceName: '',
    hasAudio: false,
    segments: [],
    speakers: [{ id: 'sp1', name: 'DEFAULT' }],
    ...partial
  };
  state.sessions.unshift(s);
  emit('session-create');
  return s;
}

export function getSession(id) {
  return state.sessions.find(s => s.id === id) || null;
}

export function updateSession(id, mutator, { touch = true } = {}) {
  const s = getSession(id);
  if (!s) return null;
  mutator(s);
  if (touch) s.updatedAt = Date.now();
  emit('session-update');
  return s;
}

export function deleteSession(id) {
  state.sessions = state.sessions.filter(s => s.id !== id);
  audioStore.del(id);
  emit('session-delete');
}

export function recentSessions(limit = 8) {
  return [...state.sessions].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, limit);
}

export function sessionsByProject(projectId) {
  return state.sessions
    .filter(s => (projectId ? s.projectId === projectId : !s.projectId))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/* ── speakers / segments ─────────────────────────────────────────────────── */
export function ensureSpeaker(session, name = 'Speaker 2') {
  const existing = session.speakers.find(s => s.name.toLowerCase() === name.toLowerCase());
  if (existing) return existing;
  if (session.speakers.length >= 4) {
    const n = session.speakers.length + 1;
    name = `Speaker ${n}`;
  }
  const sp = { id: `sp${session.speakers.length + 1}`, name };
  session.speakers.push(sp);
  return sp;
}

export function addSegment(session, segment) {
  session.segments.push({
    id: `sg_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
    speaker: 'sp1',
    translation: '',
    ...segment
  });
  session.updatedAt = Date.now();
}

/* ── usage ───────────────────────────────────────────────────────────────── */
export function addUsage(seconds) {
  if (!seconds || seconds < 0) return;
  if (state.usage.month !== monthKey()) state.usage = { month: monthKey(), seconds: 0 };
  state.usage.seconds += seconds;
  saveState();
}

export function usagePercent() {
  const limit = (state.credits.limitMinutes || 300) * 60;
  return Math.min(100, (state.usage.seconds / limit) * 100);
}

/* ── audio blob store (IndexedDB, best effort) ───────────────────────────── */
let dbPromise = null;
function db() {
  if (!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB unavailable'));
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(AUDIO_DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(AUDIO_STORE)) req.result.createObjectStore(AUDIO_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

export const audioStore = {
  async put(id, blob) {
    try {
      const d = await db();
      await new Promise((res, rej) => {
        const tx = d.transaction(AUDIO_STORE, 'readwrite');
        tx.objectStore(AUDIO_STORE).put(blob, id);
        tx.oncomplete = res; tx.onerror = () => rej(tx.error);
      });
      return true;
    } catch (err) {
      console.warn('[echo] audio not stored', err);
      return false;
    }
  },
  async get(id) {
    try {
      const d = await db();
      return await new Promise((res, rej) => {
        const tx = d.transaction(AUDIO_STORE, 'readonly');
        const rq = tx.objectStore(AUDIO_STORE).get(id);
        rq.onsuccess = () => res(rq.result || null);
        rq.onerror = () => rej(rq.error);
      });
    } catch { return null; }
  },
  async del(id) {
    try {
      const d = await db();
      const tx = d.transaction(AUDIO_STORE, 'readwrite');
      tx.objectStore(AUDIO_STORE).delete(id);
    } catch { /* ignore */ }
  },
  async keys() {
    try {
      const d = await db();
      return await new Promise((res, rej) => {
        const tx = d.transaction(AUDIO_STORE, 'readonly');
        const rq = tx.objectStore(AUDIO_STORE).getAllKeys();
        rq.onsuccess = () => res(rq.result || []);
        rq.onerror = () => rej(rq.error);
      });
    } catch { return []; }
  }
};

const urlCache = new Map();
export async function audioUrl(sessionId) {
  if (urlCache.has(sessionId)) return urlCache.get(sessionId);
  const blob = await audioStore.get(sessionId);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(sessionId, url);
  return url;
}

export function forgetAudioUrl(sessionId) {
  const u = urlCache.get(sessionId);
  if (u) { URL.revokeObjectURL(u); urlCache.delete(sessionId); }
}

/* ── data import / export ────────────────────────────────────────────────── */
export function exportData() {
  return JSON.stringify(state, null, 2);
}

export async function importData(json) {
  const parsed = JSON.parse(json);
  state = migrate(parsed);
  emit('import');
  saveState(true);
}

export function clearAll() {
  state = baseState();
  localStorage.removeItem(KEY);
  indexedDB?.deleteDatabase?.(AUDIO_DB);
  emit('clear');
  saveState(true);
}
