import { loadState, getState, settings, recentSessions, usagePercent, subscribe } from './store.js';
import { renderIcons, icon, esc, timeAgo, clock, toast, debounce } from './ui.js';
import { ScribeView } from './views/scribe.js';
import { TranslatorView } from './views/translator.js';
import { TypingView } from './views/typing.js';
import { ProjectsView } from './views/projects.js';
import { SettingsView } from './views/settings.js';
import { langName } from './languages.js';

loadState();

const ctx = {
  navigate(hash) {
    if (location.hash === hash) render();
    else location.hash = hash;
  },
  refreshShell: () => refreshShell(),
  applyTheme: () => applyTheme()
};

const VIEWS = {
  scribe: ScribeView,
  translate: TranslatorView,
  typing: TypingView,
  projects: ProjectsView,
  settings: SettingsView
};

let current = null;
let currentName = 'scribe';

/* ── theme ───────────────────────────────────────────────────────────────── */
const mql = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme() {
  const pref = settings().theme;
  const dark = pref === 'dark' || (pref === 'system' && mql.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}
mql.addEventListener?.('change', () => { if (settings().theme === 'system') applyTheme(); });
applyTheme();

/* ── router ──────────────────────────────────────────────────────────────── */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [name, ...rest] = raw.split('/').filter(Boolean);
  const view = VIEWS[name] ? name : 'scribe';
  return { name: view, id: rest[0] ? decodeURIComponent(rest[0]) : null };
}

function render() {
  const { name, id } = parseHash();
  currentName = name;

  current?.destroy?.();
  const View = VIEWS[name];
  current = new View(ctx);

  const host = document.getElementById('view');
  host.innerHTML = '';
  host.className = 'view';
  try {
    current.mount(host, { id });
  } catch (err) {
    console.error('[echo] view failed', err);
    host.innerHTML = `<div class="transcript-empty"><h2 class="empty-title">Something went wrong</h2>
      <p class="empty-text">${esc(err.message)}</p>
      <button class="btn" onclick="location.hash='#/scribe';location.reload()">Reload</button></div>`;
  }

  window.scrollTo(0, 0);
  markNav();
  refreshShell();
}

function markNav() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === currentName);
  });
}

/* ── shell (recent, credits) ─────────────────────────────────────────────── */
const refreshShell = debounce(() => {
  const list = document.getElementById('recentList');
  if (!list) return;
  const sessions = recentSessions(7);
  if (!sessions.length) {
    list.innerHTML = `<div class="recent-empty">No recordings yet</div>`;
  } else {
    list.innerHTML = sessions.map(s => `
      <a class="recent-item ${s.id === currentSessionId() ? 'active' : ''}" href="#/scribe/${s.id}">
        <span class="recent-dot"></span>
        <span class="recent-title">${esc(s.title)}</span>
        <span class="recent-time">${s.durationMs ? clock(s.durationMs / 1000) : timeAgo(s.updatedAt)}</span>
      </a>`).join('');
  }

  const st = getState();
  const mins = st.usage.seconds / 60;
  const value = document.getElementById('creditsValue');
  if (value) value.textContent = mins < 1 ? `${Math.round(st.usage.seconds)} sec` : `${mins.toFixed(mins < 10 ? 1 : 0)} min`;
  const bar = document.getElementById('creditsBar');
  if (bar) bar.style.width = `${Math.max(1, usagePercent())}%`;
  const note = document.getElementById('creditsNote');
  if (note) note.textContent = `of ${st.credits.limitMinutes} min free · resets monthly`;
  const wsName = document.getElementById('wsName');
  if (wsName) wsName.textContent = 'Personal';
  markNav();
}, 120);

function currentSessionId() {
  const m = location.hash.match(/^#\/scribe\/(.+)$/);
  return m ? m[1] : null;
}

/* ── boot ────────────────────────────────────────────────────────────────── */
function boot() {
  renderIcons(document);
  if (!location.hash) location.replace('#/scribe');

  document.getElementById('wsSwitcher')?.addEventListener('click', () => {
    toast('Local workspace — everything is stored in this browser.', { iconName: 'lock', duration: 4200 });
  });
  document.getElementById('wsSwitcher')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.target.click(); }
  });
  document.querySelector('[data-action="new-session"]')?.addEventListener('click', () => ctx.navigate('#/scribe'));

  window.addEventListener('hashchange', render);
  subscribe(() => refreshShell());

  render();

  if (!window.isSecureContext) {
    setTimeout(() => toast('Microphone needs http://localhost or https. Open the app through the included server.', {
      type: 'error', duration: 9000
    }), 900);
  }
  console.info('%cEcho', 'font-weight:700', 'ready · engines:', {
    live: !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    webgpu: !!navigator.gpu
  });
}

boot();
