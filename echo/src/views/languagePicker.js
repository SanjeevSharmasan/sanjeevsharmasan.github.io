import { LANGUAGES, findLanguage, lang } from '../languages.js';
import { openModal, esc, icon } from '../ui.js';

/**
 * Language picker modal.
 * @returns {Promise<string|null>} language code
 */
export function pickLanguage({ title = 'Choose a language', selected = 'en', allowAuto = true, liveOnly = false } = {}) {
  const list = LANGUAGES.filter(l => (allowAuto || l.code !== 'auto') && (!liveOnly || l.ws));

  const body = document.createElement('div');
  body.innerHTML = `
    <div class="lang-search">
      <input class="input" data-lang-search placeholder="Search 100 languages…" autocomplete="off" />
    </div>
    <div class="lang-list" data-lang-list></div>
    <div class="field-hint" style="padding-top:4px">
      ${icon('zap', 12)} Live dictation available for languages marked LIVE. Others work with local Whisper.
    </div>`;

  const listEl = body.querySelector('[data-lang-list]');
  const search = body.querySelector('[data-lang-search]');

  const paint = (q = '') => {
    const items = findLanguage(q).filter(l => (allowAuto || l.code !== 'auto') && (!liveOnly || l.ws));
    listEl.innerHTML = items.length ? items.map(l => `
      <button class="lang-opt ${l.code === selected ? 'sel' : ''}" data-code="${l.code}">
        <span>${esc(l.name)}</span>
        <span class="lang-native">${esc(l.native)}</span>
        ${l.ws ? '<span class="lang-badge">LIVE</span>' : ''}
        <span class="lang-code">${esc(l.code)}</span>
      </button>`).join('') : '<div class="field-hint" style="padding:14px">No language matches that search.</div>';
  };
  paint();

  search.addEventListener('input', () => paint(search.value));

  const { result } = openModal({
    title,
    body,
    wide: false,
    onMount: (modal, close) => {
      modal.addEventListener('click', e => {
        const opt = e.target.closest('[data-code]');
        if (opt) close(opt.dataset.code);
      });
    }
  });

  return result.then(code => {
    if (typeof code === 'string' && code !== 'cancel') return code;
    return null;
  });
}

export function langLabel(code) {
  if (!code || code === 'auto') return 'Auto';
  const l = lang(code);
  return l.code.toUpperCase();
}
