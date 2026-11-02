/* ── Tiny UI kit: icons, toasts, modals, menus, formatting ───────────────── */

const ICONS = {
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7.5v9M20 10v4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2.5" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="7" y="5" width="3.5" height="14" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1.2" fill="currentColor" stroke="none"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/>',
  keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M7 13.5h10"/>',
  folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.2a2 2 0 0 1 1.6.8l1 1.4h7.2A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  upload: '<path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  download: '<path d="M12 4v12m0 0 4.5-4.5M12 16l-4.5-4.5"/><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2.2"/><path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-6A3.5 3.5 0 0 0 3 6.5v6A2.5 2.5 0 0 0 5.5 15"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  trash: '<path d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7M6.5 7l.8 12.2A1.8 1.8 0 0 0 9.1 21h5.8a1.8 1.8 0 0 0 1.8-1.8L17.5 7"/>',
  edit: '<path d="M4 20h4l10.5-10.5a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20Z"/><path d="m14 6 4 4"/>',
  sparkles: '<path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7l-1.6-4.5L6 9.6 10.4 8 12 3.5Z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',
  more: '<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  chevronLeft: '<path d="m14.5 5-7 7 7 7"/>',
  chevronRight: '<path d="m9.5 5 7 7-7 7"/>',
  arrowRight: '<path d="M4 12h15m0 0-6-6m6 6-6 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>',
  monitor: '<rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>',
  fileAudio: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M10 16.5v-4l3 1v3.5"/><circle cx="9" cy="17" r="1.3"/><circle cx="12" cy="17.8" r="1.3"/>',
  headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13.5" width="4.5" height="6.5" rx="2"/><rect x="17" y="13.5" width="4.5" height="6.5" rx="2"/>',
  zap: '<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
  alert: '<path d="M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/><path d="M12 9.5V14M12 17.2h.01"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.2-4.2L3 10"/><path d="M3 4.5V10h5.5"/><path d="M4 13a8 8 0 0 0 14.2 4.2L21 14"/><path d="M21 19.5V14h-5.5"/>',
  wand: '<path d="M4 20 16.5 7.5"/><path d="m14 4.5 1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1 1-2.2Z"/><path d="m19.5 12.5.7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7.7-1.5Z"/>',
  quote: '<path d="M9.5 6C6.5 7.4 5 9.9 5 13v5h5v-6H7.5c0-1.9.8-3.2 2.5-4.2L9.5 6Zm9 0C15.5 7.4 14 9.9 14 13v5h5v-6h-2.5c0-1.9.8-3.2 2.5-4.2L18.5 6Z"/>',
  users: '<circle cx="9" cy="8" r="3.4"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.3a3.4 3.4 0 0 1 0 6.4M18 20a6 6 0 0 0-3-5.2"/>',
  translate: '<path d="M3 5h9M7.5 5v1.5c0 3.5-2 6.5-4.5 8"/><path d="M5 9.5c.9 2.3 2.7 4.3 5 5.5"/><path d="m13.5 20 4-10 4 10M15 16.5h5"/>',
  link: '<path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7l-1 1"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1-1"/>',
  share: '<path d="M12 3v12m0-12 4 4m-4-4L8 7"/><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
  gauge: '<path d="M4 17a9 9 0 0 1 16 0"/><path d="m12 13 3.5-3.5"/><circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none"/>',
  archive: '<rect x="3" y="4" width="18" height="4.5" rx="1.5"/><path d="M5 8.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5M10 12.5h4"/>',
  filter: '<path d="M3 5h18l-7 8.2V20l-4-2v-4.8L3 5Z"/>',
  keyboard2: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M7 13.5h10"/>'
};

export function icon(name, size = 16, stroke = 1.8) {
  const body = ICONS[name] || ICONS.info;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}"
    stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}" aria-hidden="true">${body}</svg>`;
}

export function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(node => {
    if (node.dataset.iconDone) return;
    node.innerHTML = icon(node.dataset.icon, node.dataset.size ? +node.dataset.size : 17);
    node.dataset.iconDone = '1';
  });
}

/* ── formatting ─────────────────────────────────────────────────────────── */
export const uid = (p = 'id') => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export function clock(seconds) {
  const s = Math.max(0, Math.floor(seconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
           : `${m}:${String(sec).padStart(2, '0')}`;
}

export function clockMs(ms) { return clock((ms || 0) / 1000); }

export function srtTime(seconds) {
  const ms = Math.max(0, Math.round((seconds || 0) * 1000));
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const msec = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s},${msec}`;
}

export function humanDuration(ms) {
  const s = Math.round((ms || 0) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export function timeAgo(ts) {
  const d = Date.now() - ts;
  if (d < 60e3) return 'just now';
  if (d < 3.6e6) return `${Math.floor(d / 60e3)}m ago`;
  if (d < 86.4e6) return `${Math.floor(d / 3.6e6)}h ago`;
  if (d < 604.8e6) return `${Math.floor(d / 86.4e6)}d ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function dayLabel(ts) {
  const d = new Date(ts);
  const today = new Date();
  const y = new Date(Date.now() - 864e5);
  const same = (a, b) => a.toDateString() === b.toDateString();
  if (same(d, today)) return 'Today';
  if (same(d, y)) return 'Yesterday';
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export function debounce(fn, ms = 200) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

/* ── toasts ─────────────────────────────────────────────────────────────── */
export function toast(message, { type = 'ok', iconName, duration = 3000 } = {}) {
  const root = document.getElementById('toasts');
  if (!root) return;
  const el = document.createElement('div');
  el.className = `toast ${type === 'error' ? 'error' : ''}`;
  el.innerHTML = `${icon(iconName || (type === 'error' ? 'alert' : 'check'), 15)}<span>${esc(message)}</span>`;
  root.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 220);
  }, duration);
}

/* ── modal ──────────────────────────────────────────────────────────────── */
let activeModal = null;

export function openModal({ title = '', body = '', actions = [], wide = false, onMount, dismissable = true }) {
  closeModal();
  const root = document.getElementById('modalRoot');
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const actionHtml = actions.map(a =>
    `<button class="btn ${a.variant === 'primary' ? 'btn-primary' : a.variant === 'danger' ? 'btn-danger' : a.variant === 'ghost' ? 'btn-ghost' : ''}"
      data-modal-action="${esc(a.value ?? a.label)}">${a.icon ? icon(a.icon, 15) : ''}${esc(a.label)}</button>`
  ).join('');

  backdrop.innerHTML = `
    <div class="modal ${wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
      <div class="modal-head">
        <div class="modal-title">${esc(title)}</div>
        ${dismissable ? `<button class="icon-btn sm" data-modal-close aria-label="Close">${icon('x', 15)}</button>` : ''}
      </div>
      <div class="modal-body">${typeof body === 'string' ? body : ''}</div>
      ${actions.length ? `<div class="modal-foot">${actionHtml}</div>` : ''}
    </div>`;
  root.appendChild(backdrop);

  if (typeof body !== 'string') {
    backdrop.querySelector('.modal-body').appendChild(body);
  }

  let resolver = null;
  const result = new Promise(res => { resolver = res; });
  const close = (value = null) => {
    backdrop.remove();
    document.removeEventListener('keydown', onKey);
    activeModal = null;
    resolver?.(value);
  };
  const onKey = e => {
    if (e.key === 'Escape' && dismissable) { e.preventDefault(); close(null); }
  };
  document.addEventListener('keydown', onKey);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop && dismissable) close(null);
    const act = e.target.closest('[data-modal-action]');
    if (act) close(act.dataset.modalAction);
    if (e.target.closest('[data-modal-close]')) close(null);
  });

  activeModal = { close };
  onMount?.(backdrop, close);
  setTimeout(() => backdrop.querySelector('.input, .textarea, .lang-opt')?.focus(), 40);
  return { close, result, el: backdrop };
}

export function closeModal() { activeModal?.close(null); }

export function confirmDialog({ title, message, confirmLabel = 'Confirm', danger = false }) {
  const { result } = openModal({
    title,
    body: `<p style="margin:0;font-size:13.5px;line-height:1.6;color:var(--text-2)">${esc(message)}</p>`,
    actions: [
      { label: 'Cancel', value: 'cancel', variant: 'ghost' },
      { label: confirmLabel, value: 'ok', variant: danger ? 'danger' : 'primary' }
    ]
  });
  return result.then(v => v === 'ok');
}

export function promptDialog({ title, label, value = '', placeholder = '', confirmLabel = 'Save' }) {
  let inputEl = null;
  const { result } = openModal({
    title,
    body: `<label class="field"><span class="field-label">${esc(label)}</span>
      <input class="input input-lg" data-prompt-input value="${esc(value)}" placeholder="${esc(placeholder)}" /></label>`,
    actions: [
      { label: 'Cancel', value: 'cancel', variant: 'ghost' },
      { label: confirmLabel, value: 'ok', variant: 'primary' }
    ],
    onMount: (el, close) => {
      const input = el.querySelector('[data-prompt-input]');
      inputEl = input;
      input.select();
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); close(input.value.trim() || null); }
      });
    }
  });
  return result.then(v => {
    if (v === 'ok') return inputEl?.value.trim() || null;
    if (v && v !== 'cancel') return String(v).trim() || null;
    return null;
  });
}

/* ── popover menu ───────────────────────────────────────────────────────── */
let activeMenu = null;

export function openMenu(anchor, items, { align = 'right' } = {}) {
  closeMenu();
  const menu = document.createElement('div');
  menu.className = 'menu';
  menu.innerHTML = items.map(it => {
    if (it.sep) return '<div class="menu-sep"></div>';
    if (it.heading) return `<div class="menu-label">${esc(it.heading)}</div>`;
    return `<button class="menu-item ${it.danger ? 'danger' : ''}" data-menu-id="${esc(it.id ?? it.label)}">
      ${it.icon ? icon(it.icon, 15) : ''}<span>${esc(it.label)}</span>
      ${it.hint ? `<span style="margin-left:auto;font-size:10.5px;color:var(--faint)">${esc(it.hint)}</span>` : ''}
    </button>`;
  }).join('');
  document.body.appendChild(menu);

  const r = anchor.getBoundingClientRect();
  const mw = menu.offsetWidth, mh = menu.offsetHeight;
  let left = align === 'right' ? r.right - mw : r.left;
  left = Math.max(8, Math.min(left, innerWidth - mw - 8));
  let top = r.bottom + 6;
  if (top + mh > innerHeight - 8) top = Math.max(8, r.top - mh - 6);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  const pick = target => {
    const hit = target.closest?.('.menu-item');
    if (!hit || !menu.contains(hit)) return false;
    const item = items.filter(i => !i.sep && !i.heading)
      .find(i => String(i.id ?? i.label) === hit.dataset.menuId);
    closeMenu();
    item?.onClick?.();
    return true;
  };

  menu.addEventListener('click', e => { pick(e.target); });
  const onDoc = e => {
    if (!menu.contains(e.target)) closeMenu();
  };
  setTimeout(() => document.addEventListener('mousedown', onDoc), 0);
  const onKey = e => { if (e.key === 'Escape') closeMenu(); };
  document.addEventListener('keydown', onKey);
  menu._cleanup = () => {
    document.removeEventListener('mousedown', onDoc);
    document.removeEventListener('keydown', onKey);
  };
  activeMenu = menu;
  return menu;
}

export function closeMenu() {
  if (!activeMenu) return;
  activeMenu._cleanup?.();
  activeMenu.remove();
  activeMenu = null;
}

/* ── misc ───────────────────────────────────────────────────────────────── */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied to clipboard');
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    toast(ok ? 'Copied to clipboard' : 'Could not copy', { type: ok ? 'ok' : 'error' });
    return ok;
  }
}

export function download(filename, content, mime = 'text/plain;charset=utf-8') {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadBlob(filename, blob) { download(filename, blob, blob.type); }

export function safeFileName(name, ext) {
  const base = (name || 'transcript').replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim();
  return `${base || 'transcript'}.${ext}`;
}

export const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
export const modKey = isMac ? '⌘' : 'Ctrl';
