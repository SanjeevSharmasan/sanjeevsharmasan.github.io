import { getState, settings, getSession } from '../store.js';
import { translateText } from '../engines/translate.js';
import { toPlainText } from '../export.js';
import { icon, esc, toast, openModal, copyText, download, debounce, clock } from '../ui.js';
import { langName, isRTL, TRANSLATION_TARGETS } from '../languages.js';
import { pickLanguage, langLabel } from './languagePicker.js';

export class TranslatorView {
  constructor(ctx) {
    this.ctx = ctx;
    this.source = 'auto';
    this.target = settings().translateTo || 'es';
    this.text = '';
    this.output = '';
    this.busy = false;
    this.seq = 0;
  }

  mount(container) {
    this.container = container;
    container.innerHTML = `
      <div class="page">
        <header class="page-head">
          <div>
            <h1 class="page-title">Translator</h1>
            <div class="page-sub">Text translation in ${TRANSLATION_TARGETS.length}+ languages</div>
          </div>
          <div class="spacer"></div>
          <button class="btn" data-act="load">${icon('folder', 15)} Load transcript</button>
          <button class="btn btn-primary" data-act="go">${icon('translate', 15)} Translate</button>
        </header>
        <div class="translate-grid">
          <section class="tpane">
            <div class="tpane-head">
              <button class="lang-pick" data-act="src"><span data-ref="srcLabel">${esc(this.source === 'auto' ? 'Auto-detect' : langName(this.source))}</span><span class="caret"></span></button>
              <span class="chip" data-ref="srcBadge" ${this.source === 'auto' ? '' : 'hidden'}>Auto</span>
              <div style="flex:1"></div>
              <button class="icon-btn" data-act="clear" title="Clear">${icon('x', 16)}</button>
            </div>
            <div class="tpane-body">
              <textarea class="textarea" data-ref="input" placeholder="Type, paste, or load a transcript…" spellcheck="false"></textarea>
            </div>
            <div class="tpane-foot">
              <span data-ref="count">0 characters</span>
              <span data-ref="status" style="margin-left:auto"></span>
            </div>
          </section>

          <section class="tpane">
            <div class="tpane-head">
              <button class="lang-pick" data-act="tgt"><span data-ref="tgtLabel">${esc(langName(this.target))}</span><span class="caret"></span></button>
              <div style="flex:1"></div>
              <button class="icon-btn" data-act="copy" title="Copy translation">${icon('copy', 16)}</button>
              <button class="icon-btn" data-act="save" title="Download translation">${icon('download', 16)}</button>
            </div>
            <div class="tpane-body">
              <div class="translate-out" data-ref="out" style="direction:${isRTL(this.target) ? 'rtl' : 'ltr'}"></div>
            </div>
            <div class="tpane-foot">
              <span>${esc(this.providerLabel())}</span>
              <span style="margin-left:auto" data-ref="trstatus"></span>
            </div>
          </section>
        </div>
      </div>`;

    this.el = {
      input: container.querySelector('[data-ref="input"]'),
      out: container.querySelector('[data-ref="out"]'),
      count: container.querySelector('[data-ref="count"]'),
      status: container.querySelector('[data-ref="status"]'),
      trstatus: container.querySelector('[data-ref="trstatus"]')
    };
    this.el.input.value = this.text;
    this.renderOut();

    container.addEventListener('click', this._onClick);
    this.el.input.addEventListener('input', () => {
      this.text = this.el.input.value;
      this.updateCount();
      this.schedule();
    });
    this.el.input.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); this.run(); }
    });
    this._schedule = debounce(() => this.run(true), 900);
  }

  destroy() {}

  providerLabel() {
    const p = settings().translationProvider;
    if (p === 'off') return 'Translation disabled';
    if (p === 'libretranslate') return 'LibreTranslate · self-hosted';
    return 'MyMemory · free tier';
  }

  _onClick = (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;
    if (act === 'src') this.pickSource();
    if (act === 'tgt') this.pickTarget();
    if (act === 'go') this.run();
    if (act === 'clear') { this.text = ''; this.el.input.value = ''; this.output = ''; this.renderOut(); this.updateCount(); }
    if (act === 'copy') copyText(this.output || this.el.out.innerText);
    if (act === 'save') {
      if (!this.output) { toast('Nothing to download yet', { iconName: 'info' }); return; }
      download(`translation-${this.target}.txt`, this.output);
    }
    if (act === 'load') this.loadTranscript();
  };

  updateCount() {
    const n = this.text.length;
    this.el.count.textContent = `${n.toLocaleString()} character${n === 1 ? '' : 's'} · ${this.text.split(/\s+/).filter(Boolean).length} words`;
  }

  schedule() {
    clearTimeout(this._t);
    if (!this.text.trim()) { this.output = ''; this.renderOut(); return; }
    this._t = setTimeout(() => this.run(true), 900);
  }

  async pickSource() {
    const code = await pickLanguage({ title: 'Source language', selected: this.source, allowAuto: true });
    if (!code) return;
    this.source = code;
    const label = this.container.querySelector('[data-ref="srcLabel"]');
    if (label) label.textContent = code === 'auto' ? 'Auto-detect' : langName(code);
    this.container.querySelector('[data-ref="srcBadge"]').hidden = code !== 'auto';
    this.run(true);
  }

  async pickTarget() {
    const code = await pickLanguage({ title: 'Translate to', selected: this.target, allowAuto: false });
    if (!code) return;
    this.target = code;
    settings().translateTo = code;
    const label = this.container.querySelector('[data-ref="tgtLabel"]');
    if (label) label.textContent = langName(code);
    this.el.out.style.direction = isRTL(code) ? 'rtl' : 'ltr';
    this.run(true);
  }

  async run(silent = false) {
    const text = this.text.trim();
    if (!text) { if (!silent) toast('Type something to translate', { iconName: 'info' }); return; }
    if (this.busy) return;

    const st = settings();
    const mySeq = ++this.seq;
    this.busy = true;
    this.el.trstatus.textContent = 'Translating…';
    this.el.trstatus.style.color = 'var(--muted)';

    try {
      const from = this.source === 'auto' ? 'auto' : this.source;
      const chunks = splitForApi(text, 480);
      const parts = [];
      for (const chunk of chunks) {
        if (mySeq !== this.seq) return;
        parts.push(await translateText(chunk, {
          from,
          to: this.target,
          provider: st.translationProvider,
          libretranslateUrl: st.libretranslateUrl
        }));
      }
      this.output = parts.join(chunks.length > 1 ? '\n' : '');
      this.renderOut();
      this.el.trstatus.textContent = `${chunks.length > 1 ? chunks.length + ' parts · ' : ''}${langLabel(this.target)}`;
      this.el.trstatus.style.color = 'var(--ok)';
    } catch (err) {
      this.el.trstatus.textContent = 'Failed';
      this.el.trstatus.style.color = 'var(--rec)';
      this.el.out.innerHTML = `<span style="color:var(--rec);font-size:13px">${esc(err.message)}</span>`;
      if (!silent) toast(err.message, { type: 'error', duration: 5000 });
    } finally {
      this.busy = false;
    }
  }

  renderOut() {
    this.el.out.textContent = this.output || '';
  }

  loadTranscript() {
    const sessions = getState().sessions.filter(s => (s.segments || []).length);
    if (!sessions.length) { toast('No transcripts yet — record something first.', { iconName: 'info' }); return; }
    const body = document.createElement('div');
    body.innerHTML = `<div style="display:grid;gap:3px;max-height:52dvh;overflow:auto">
      ${sessions.slice(0, 40).map(s => `
        <button class="menu-item" data-load="${s.id}" style="padding:9px 10px">
          ${icon('quote', 15)}
          <span style="flex:1;overflow:hidden">
            <span style="display:block;color:var(--text);font-weight:550;white-space:nowrap;text-overflow:ellipsis;overflow:hidden">${esc(s.title)}</span>
            <span style="font-size:10.5px;color:var(--muted)">${clock((s.durationMs || 0) / 1000)} · ${s.segments.length} ${s.segments.length === 1 ? 'line' : 'lines'}</span>
          </span>
          ${icon('chevronRight', 14)}
        </button>`).join('')}
    </div>`;
    const { close } = openModal({ title: 'Load a transcript', body, onMount: el => {
      el.addEventListener('click', e => {
        const b = e.target.closest('[data-load]');
        if (!b) return;
        const s = getSession(b.dataset.load);
        this.text = toPlainText(s, { timestamps: false, speakers: true });
        this.el.input.value = this.text;
        this.source = s.language || 'auto';
        const label = this.container.querySelector('[data-ref="srcLabel"]');
        if (label) label.textContent = s.language === 'auto' ? 'Auto-detect' : langName(s.language);
        this.updateCount();
        close();
        this.run(true);
      });
    } });
  }
}

function splitForApi(text, limit) {
  if (text.length <= limit) return [text];
  const sentences = text.match(/[^.!?\n]+[.!?]?\s*/g) || [text];
  const out = [];
  let cur = '';
  for (const s of sentences) {
    if ((cur + s).length > limit && cur) { out.push(cur.trim()); cur = ''; }
    cur += s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
