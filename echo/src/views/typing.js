import { createSession, settings, addUsage } from '../store.js';
import { createLiveRecognition, liveSupported } from '../engines/webSpeech.js';
import { icon, esc, toast, clock, download, copyText, openModal } from '../ui.js';
import { langName, wsTag, canLiveType, isRTL } from '../languages.js';
import { pickLanguage } from './languagePicker.js';

const COMMANDS = [
  [/\s*\b(?:full stop|period)\b/gi, '.'],
  [/\s*\bcomma\b/gi, ','],
  [/\s*\bquestion mark\b/gi, '?'],
  [/\s*\b(?:exclamation mark|exclamation point)\b/gi, '!'],
  [/\s*\bcolon\b/gi, ':'],
  [/\s*\bsemicolon\b/gi, ';'],
  [/\s*\bnew paragraph\b/gi, '\n\n'],
  [/\s*\bnew line\b/gi, '\n']
];

export class TypingView {
  constructor(ctx) {
    this.ctx = ctx;
    this.lang = settings().language === 'auto' ? 'en' : settings().language;
    this.committed = '';
    this.interim = '';
    this.recording = false;
    this.startedAt = 0;
    this.punctuation = true;
    this.recognition = null;
    this.timer = 0;
    this.onKeyBound = this.onKey.bind(this);
  }

  mount(container) {
    this.container = container;
    container.innerHTML = `
      <div class="page">
        <header class="page-head">
          <div>
            <h1 class="page-title">Voice Typing</h1>
            <div class="page-sub">Dictate into any text field, then copy it anywhere</div>
          </div>
          <div class="spacer"></div>
          <button class="btn" data-act="lang">${icon('globe', 15)} <span data-ref="langLabel">${esc(langName(this.lang))}</span></button>
          <button class="btn" data-act="save">${icon('quote', 15)} Save to Smart Scribe</button>
        </header>

        <div class="page-scroll">
          <div class="typing-wrap">
            ${!liveSupported() ? `<div class="banner" style="margin-bottom:16px">
              ${icon('alert', 15)}
              <div><b>Live dictation isn't available in this browser.</b> Use Chrome or Edge, or open Smart Scribe and transcribe a recording with the on-device Whisper engine.</div>
            </div>` : ''}

            <div class="typing-pad" contenteditable="true" data-ref="pad" spellcheck="false"
                 data-placeholder="Start talking — your words will appear here…"></div>

            <div class="typing-stats">
              <span><b data-ref="words">0</b> words</span>
              <span><b data-ref="chars">0</b> characters</span>
              <span><b data-ref="wpm">0</b> words / min</span>
              <span><b data-ref="elapsed">0:00</b> elapsed</span>
              <span style="margin-left:auto;color:var(--faint)" data-ref="stateLabel">Idle</span>
            </div>

            <div class="typing-controls">
              <button class="mic-fab" data-act="toggle" aria-label="Start dictation" ${!liveSupported() ? 'disabled style="opacity:.4"' : ''}>
                ${icon('mic', 22)}
              </button>
              <div style="display:grid;gap:2px">
                <div style="font-size:13px;font-weight:600" data-ref="cta">Click the mic to start</div>
                <div class="hotkey-hint">
                  <span class="kbd">${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}</span>+<span class="kbd">Space</span> to toggle
                </div>
              </div>
              <div style="flex:1"></div>
              <label class="switch" title="Convert spoken punctuation to symbols">
                <input type="checkbox" data-ref="punct" ${this.punctuation ? 'checked' : ''} />
                <span class="switch-track"></span>
                <span class="switch-label">Spoken punctuation</span>
              </label>
              <button class="btn btn-ghost btn-sm" data-act="copy">${icon('copy', 14)} Copy</button>
              <button class="btn btn-ghost btn-sm" data-act="download">${icon('download', 14)}</button>
              <button class="btn btn-ghost btn-sm" data-act="clear">${icon('trash', 14)}</button>
            </div>

            <div class="banner info" style="margin-top:24px">
              ${icon('lock', 15)}
              <div>Live dictation uses your browser's speech service. Nothing is saved unless you choose
                <b>Save to Smart Scribe</b>. For offline dictation in 100 languages, use Smart Scribe with the Whisper engine.</div>
            </div>
          </div>
        </div>
      </div>`;

    this.el = {
      pad: container.querySelector('[data-ref="pad"]'),
      words: container.querySelector('[data-ref="words"]'),
      chars: container.querySelector('[data-ref="chars"]'),
      wpm: container.querySelector('[data-ref="wpm"]'),
      elapsed: container.querySelector('[data-ref="elapsed"]'),
      stateLabel: container.querySelector('[data-ref="stateLabel"]'),
      cta: container.querySelector('[data-ref="cta"]'),
      punct: container.querySelector('[data-ref="punct"]'),
      langLabel: container.querySelector('[data-ref="langLabel"]'),
      fab: container.querySelector('[data-act="toggle"]')
    };

    this.el.pad.style.direction = isRTL(this.lang) ? 'rtl' : 'ltr';
    this.el.pad.addEventListener('input', () => {
      const text = this.el.pad.innerText || '';
      this.committed = this.interim && text.endsWith(this.interim)
        ? text.slice(0, -this.interim.length)
        : text;
      this.updateStats();
    });
    this.el.punct.addEventListener('change', () => { this.punctuation = this.el.punct.checked; });

    container.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyBound);
    this.render();
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyBound);
    this.stop(false);
    clearInterval(this.timer);
  }

  onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
      e.preventDefault();
      this.toggle();
    }
  }

  onClick = (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;
    if (act === 'toggle') this.toggle();
    if (act === 'copy') copyText(this.committed.trim());
    if (act === 'download') {
      if (!this.committed.trim()) { toast('Nothing to download yet', { iconName: 'info' }); return; }
      download(`voice-typing-${new Date().toISOString().slice(0, 10)}.txt`, this.committed);
    }
    if (act === 'clear') {
      if (this.recording) this.stop();
      this.committed = ''; this.interim = '';
      this.render();
      toast('Cleared');
    }
    if (act === 'lang') this.pickLang();
    if (act === 'save') this.saveToScribe();
  };

  async pickLang() {
    const code = await pickLanguage({ title: 'Dictation language', selected: this.lang, allowAuto: false });
    if (!code) return;
    this.lang = code;
    this.el.langLabel.textContent = langName(code);
    this.el.pad.style.direction = isRTL(code) ? 'rtl' : 'ltr';
    settings().language = code;
    if (this.recording) {
      this.stop(false);
      this.start();
    }
    if (!canLiveType(code)) {
      toast(`Live dictation doesn't support ${langName(code)} here. Try Smart Scribe with Whisper.`, { iconName: 'info', duration: 4800 });
    }
  }

  toggle() {
    this.recording ? this.stop() : this.start();
  }

  start() {
    if (!liveSupported()) { toast('Live dictation needs Chrome or Edge.', { type: 'error' }); return; }
    if (this.recording) return;

    const tag = wsTag(this.lang);
    if (!tag) {
      toast(`No live dictation for ${langName(this.lang)} — use Smart Scribe with Whisper.`, { type: 'error', duration: 4500 });
      return;
    }

    this.recognition = createLiveRecognition({
      lang: tag,
      onResult: r => this.onResult(r),
      onError: err => { toast(err.message, { type: 'error', duration: 5000 }); if (this.recording) this.stop(false); },
      onStart: () => this.setRecordingUI(true)
    });
    if (!this.recognition) return;
    this.recognition.start();

    this.recording = true;
    this.startedAt = performance.now();
    this.el.fab.classList.add('recording');
    this.el.fab.innerHTML = icon('stop', 20);
    this.el.cta.textContent = 'Listening… click to stop';
    this.el.stateLabel.textContent = 'Live';
    this.el.stateLabel.style.color = 'var(--rec)';
    this.timer = setInterval(() => this.updateStats(), 500);
    this.el.pad.focus();
  }

  stop(notify = true) {
    if (!this.recording) return;
    const seconds = (performance.now() - this.startedAt) / 1000;
    this.recording = false;
    this.recognition?.stop();
    this.recognition = null;
    clearInterval(this.timer);
    this.interim = '';
    this.render();
    this.el.fab.classList.remove('recording');
    this.el.fab.innerHTML = icon('mic', 22);
    this.el.cta.textContent = 'Click the mic to start';
    this.el.stateLabel.textContent = 'Idle';
    this.el.stateLabel.style.color = '';
    if (seconds > 2) addUsage(seconds);
    if (notify && seconds > 2) toast(`Dictation saved · ${clock(seconds)}`);
  }

  onResult({ text, final }) {
    if (final) {
      let piece = text.trim();
      if (!piece) return;
      if (this.punctuation) piece = applyCommands(piece);
      this.committed = joinDictation(this.committed, piece);
      this.interim = '';
      this.render();
      this.updateStats();
    } else {
      this.interim = text;
      this.render();
    }
  }

  setRecordingUI() {}

  render() {
    const html = escapeHtml(this.committed).replace(/\n/g, '<br>')
      + (this.interim ? `<span class="interim">${escapeHtml(this.interim)}</span>` : '');
    this.el.pad.innerHTML = html;
    if (document.activeElement === this.el.pad) {
      const range = document.createRange();
      range.selectNodeContents(this.el.pad);
      range.collapse(false);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    this.updateStats();
  }

  updateStats() {
    const text = (this.committed + ' ' + this.interim).trim();
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const mins = this.recording ? Math.max(0.05, (performance.now() - this.startedAt) / 60000) : 0;
    this.el.words.textContent = words.toLocaleString();
    this.el.chars.textContent = text.length.toLocaleString();
    this.el.wpm.textContent = mins ? Math.round(words / mins).toLocaleString() : '0';
    this.el.elapsed.textContent = this.recording ? clock((performance.now() - this.startedAt) / 1000) : '0:00';
  }

  async saveToScribe() {
    const text = this.committed.trim();
    if (!text) { toast('Nothing dictated yet', { iconName: 'info' }); return; }
    if (this.recording) this.stop();

    const seconds = Math.max(2, text.split(/\s+/).length / 2.4);
    const s = createSession({
      title: text.slice(0, 60),
      language: this.lang,
      engine: 'browser',
      source: 'microphone',
      durationMs: seconds * 1000,
      segments: [{
        id: 'sg_typing',
        text: text.replace(/\n+/g, ' '),
        start: 0,
        end: seconds,
        speaker: 'sp1',
        translation: ''
      }],
      speakers: [{ id: 'sp1', name: 'DEFAULT' }]
    });

    const { result } = openModal({
      title: 'Saved to Smart Scribe',
      body: `<p style="margin:0;font-size:13px;color:var(--text-2);line-height:1.6">
        “${esc(s.title)}” is now in your transcripts. You can edit it, translate it, or export subtitles.</p>`,
      actions: [
        { label: 'Keep typing', value: 'stay', variant: 'ghost' },
        { label: 'Open transcript', value: 'open', variant: 'primary' }
      ]
    });
    const res = await result;
    if (res === 'open') this.ctx.navigate(`#/scribe/${s.id}`);
    else this.ctx.refreshShell?.();
  }
}

function applyCommands(text) {
  let out = text;
  for (const [re, rep] of COMMANDS) out = out.replace(re, rep);
  return out.replace(/\s+([,.!?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
}

function joinDictation(base, piece) {
  if (!base) return capitalizeFirst(piece);
  const endsSentence = /[.!?]\s*$/.test(base) || base.endsWith('\n');
  const p = endsSentence ? capitalizeFirst(piece) : piece;
  const needsSpace = !/[ \n]$/.test(base) && !/^[,.;:!?]/.test(p);
  return base + (needsSpace ? ' ' : '') + p;
}

function capitalizeFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
