import {
  getState, settings, createSession, getSession, updateSession, deleteSession,
  addUsage, audioStore, audioUrl, forgetAudioUrl, ensureSpeaker, recentSessions
} from '../store.js';
import { MicCapture } from '../recorder.js';
import { createLiveRecognition, liveSupported } from '../engines/webSpeech.js';
import { transcribeAudio, WHISPER_MODELS } from '../engines/whisper.js';
import { transcribeWithSoniox } from '../engines/soniox.js';
import { translateText } from '../engines/translate.js';
import { exportSession, toPlainText } from '../export.js';
import {
  icon, esc, clock, clockMs, timeAgo, dayLabel, toast, openMenu, openModal,
  confirmDialog, promptDialog, download, copyText, safeFileName, debounce
} from '../ui.js';
import { langName, wsTag, canLiveType, isRTL } from '../languages.js';
import { pickLanguage, langLabel } from './languagePicker.js';

const SPEAKER_VARS = ['var(--speaker-1)', 'var(--speaker-2)', 'var(--speaker-3)', 'var(--speaker-4)'];
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const lines = n => plural(n, 'line');

export class ScribeView {
  constructor(ctx) {
    this.ctx = ctx;
    this.root = null;
    this.sessionId = null;
    this.capture = null;
    this.recognition = null;
    this.recording = false;
    this.paused = false;
    this.job = null;
    this.interim = '';
    this.utteranceStart = null;
    this.wave = new Array(56).fill(0.08);
    this.audio = null;
    this.audioEl = null;
    this.playing = false;
    this.search = '';
    this.filterSpeaker = null;
    this._jobPaintAt = 0;
    this._onKey = this._onKey.bind(this);
  }

  /* ── lifecycle ────────────────────────────────────────────────────────── */
  mount(container, params = {}) {
    this.container = container;
    const id = params.id;
    if (id && getSession(id)) this.sessionId = id;
    else {
      const latest = recentSessions(1)[0];
      this.sessionId = latest ? latest.id : null;
    }

    container.innerHTML = `
      <div class="page scribe">
        <aside class="sessions">
          <div class="sessions-head">
            <button class="btn btn-primary btn-block" data-act="new">${icon('plus', 15)} New recording</button>
            <input class="input" data-ref="search" placeholder="Search transcripts…" autocomplete="off" />
          </div>
          <div class="session-list" data-ref="list"></div>
        </aside>
        <section class="workspace">
          <header class="ws-head" data-ref="head"></header>
          <div class="audio-dock" data-ref="audioDock" hidden></div>
          <div class="transcript-scroll" data-ref="scroll">
            <div class="transcript-inner" data-ref="transcript"></div>
          </div>
          <div class="rec-bar" data-ref="recbar" hidden></div>
          <input type="file" accept="audio/*,video/*,.mp3,.wav,.m4a,.ogg,.webm,.mp4,.mov,.aac,.flac" hidden data-ref="file" />
        </section>
      </div>`;

    this.root = container.querySelector('.scribe');
    this.el = {
      list: this.root.querySelector('[data-ref="list"]'),
      search: this.root.querySelector('[data-ref="search"]'),
      head: this.root.querySelector('[data-ref="head"]'),
      scroll: this.root.querySelector('[data-ref="scroll"]'),
      transcript: this.root.querySelector('[data-ref="transcript"]'),
      recbar: this.root.querySelector('[data-ref="recbar"]'),
      audioDock: this.root.querySelector('[data-ref="audioDock"]'),
      file: this.root.querySelector('[data-ref="file"]')
    };

    this.el.search.value = this.search;
    this.el.search.addEventListener('input', () => {
      this.search = this.el.search.value;
      this.paintSessions();
    });

    this.root.addEventListener('click', this._onClick);
    this.el.file.addEventListener('change', e => {
      const f = e.target.files?.[0];
      e.target.value = '';
      if (f) this.handleFile(f);
    });
    document.addEventListener('keydown', this._onKey);

    this._bindDropZone();
    this.paint();
    this._paintAudio();
    this._syncHash();
  }

  destroy() {
    document.removeEventListener('keydown', this._onKey);
    if (this.recording) this.abortRecording();
    this._teardownAudio();
  }

  _onKey(e) {
    if (e.defaultPrevented) return;
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.el?.search?.focus();
    } else if (e.code === 'Space' && !typing && this.sessionId && !document.querySelector('.modal-backdrop')) {
      e.preventDefault();
      this.recording ? this.stopRecording() : this.startRecording();
    }
  }

  session() { return getSession(this.sessionId); }

  _syncHash() {
    const target = this.sessionId ? `#/scribe/${this.sessionId}` : '#/scribe';
    if (location.hash !== target) history.replaceState(null, '', target);
  }

  /* ── painting ─────────────────────────────────────────────────────────── */
  paint() {
    this.paintSessions();
    this.paintHead();
    this.paintTranscript();
    this.paintRecBar();
  }

  paintSessions() {
    const all = [...getState().sessions].sort((a, b) => b.updatedAt - a.updatedAt);
    const q = this.search.trim().toLowerCase();
    const rows = all.filter(s => {
      if (!q) return true;
      if (s.title.toLowerCase().includes(q)) return true;
      return (s.segments || []).some(seg => (seg.text || '').toLowerCase().includes(q));
    });

    if (!rows.length) {
      this.el.list.innerHTML = `<div class="recent-empty" style="padding:14px 10px;text-align:center">
        ${q ? 'No matches.' : 'No recordings yet.<br>Your sessions will appear here.'}</div>`;
      return;
    }

    this.el.list.innerHTML = rows.map(s => {
      const snippet = (s.segments?.[0]?.text || (s.source === 'file' ? s.sourceName : 'Ready to record')).slice(0, 70);
      const isLive = this.recording && s.id === this.sessionId;
      return `<button class="session-card ${s.id === this.sessionId ? 'active' : ''}" data-sid="${s.id}">
        <div class="session-card-top">
          ${isLive ? '<span class="live-dot"></span>' : ''}
          <span class="session-card-title">${esc(s.title)}</span>
          <span class="session-dur" style="font-size:10.5px;color:var(--faint)">${s.durationMs ? clockMs(s.durationMs) : ''}</span>
        </div>
        <div class="session-card-meta">
          <span>${timeAgo(s.updatedAt)}</span><span>·</span><span>${langLabel(s.language)}</span>
          <span>·</span><span>${lines((s.segments || []).length)}</span>
        </div>
        <div class="session-card-snippet">${esc(snippet)}</div>
      </button>`;
    }).join('');
  }

  paintHead() {
    const s = this.session();
    if (!s) {
      this.el.head.innerHTML = `
        <div class="grow"><h1 class="page-title">Smart Scribe</h1>
        <div class="page-sub">Live transcription & file transcription in 100+ languages</div></div>`;
      return;
    }
    const engine = this.recording ? (this.recEngine || s.engine) : s.engine;
    const engineName = { browser: 'Live · browser', whisper: 'Whisper · local', soniox: 'Soniox · cloud' }[engine] || engine;
    const count = s.segments?.length || 0;
    const words = (s.segments || []).reduce((n, x) => n + (x.text || '').split(/\s+/).filter(Boolean).length, 0);

    this.el.head.innerHTML = `
      <div class="grow">
        <div class="ws-title-wrap">
          <input class="ws-title" data-ref="title" value="${esc(s.title)}" aria-label="Session title" spellcheck="false" />
          <button class="icon-btn sm" data-act="rename" title="Rename">${icon('edit', 13)}</button>
        </div>
        <div class="ws-subline">
          <button class="chip chip-lang" data-act="language" title="Change language">
            ${icon('globe', 12)} ${esc(langName(s.language))}
          </button>
          <span>${s.durationMs ? clockMs(s.durationMs) : '0:00'}</span>
          <span>·</span>
          <span>${lines(count)}</span>
          <span>·</span>
          <span>${plural(words, 'word')}</span>
          <span class="chip" title="Transcription engine">${esc(engineName)}</span>
          ${s.translatedTo ? `<span class="chip chip-lang">${icon('translate', 12)} ${esc(langName(s.translatedTo))}</span>` : ''}
        </div>
      </div>
      <div class="ws-actions">
        <button class="icon-btn" data-act="search-seg" title="Search in transcript">${icon('search', 17)}</button>
        <button class="btn" data-act="translate">${icon('translate', 15)}<span>Translate</span></button>
        <button class="btn" data-act="upload">${icon('upload', 15)}<span>Upload</span></button>
        <button class="btn btn-primary" data-act="${this.recording ? 'stop' : 'record'}">
          ${this.recording ? icon('stop', 14) : icon('mic', 15)}<span>${this.recording ? 'Stop' : 'Record'}</span>
        </button>
        <button class="icon-btn" data-act="more" title="More">${icon('more', 18)}</button>
      </div>`;

    const title = this.el.head.querySelector('[data-ref="title"]');
    title.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); title.blur(); }
      if (e.key === 'Escape') { title.value = this.session()?.title || ''; title.blur(); }
    });
    title.addEventListener('change', () => {
      const s2 = this.session();
      if (!s2 || !title.value.trim()) { title.value = s2?.title || ''; return; }
      updateSession(s2.id, x => { x.title = title.value.trim(); });
      this.paintSessions();
    });
  }

  paintTranscript() {
    const s = this.session();
    if (!s) {
      this.el.transcript.innerHTML = this._emptyWorkspace();
      return;
    }

    const segs = s.segments || [];
    if (!segs.length && !this.recording && !this.job) {
      this.el.transcript.innerHTML = this._emptySession(s);
      return;
    }

    const parts = [];
    if (this.job) parts.push(this._jobHtml());
    if (this.enhanceOffer(s)) parts.push(this._enhanceBanner());

    if (segs.length) {
      let lastDay = '';
      for (const seg of segs) {
        const sp = s.speakers?.find(x => x.id === seg.speaker);
        const spIndex = Math.max(0, (s.speakers || []).findIndex(x => x.id === seg.speaker));
        const color = SPEAKER_VARS[spIndex % SPEAKER_VARS.length];
        const initial = (sp?.name || 'S').trim().charAt(0).toUpperCase();
        parts.push(`
          <div class="seg" data-seg="${seg.id}">
            <div class="seg-gutter">
              <button class="seg-time" data-act="seek" data-start="${seg.start || 0}" title="Play from here">${clock(seg.start || 0)}</button>
            </div>
            <div class="seg-body">
              <div class="seg-meta">
                <button class="speaker" data-act="speaker" data-seg="${seg.id}">
                  <span class="speaker-avatar" style="background:${color}">${esc(initial)}</span>
                  ${esc(sp?.name || 'Speaker')}
                </button>
                ${seg.confidence != null && seg.confidence > 0 && seg.confidence < 0.55 ? '<span class="seg-note">low confidence</span>' : ''}
              </div>
              <div class="seg-text" contenteditable="true" spellcheck="false"
                   data-seg-text="${seg.id}" style="direction:${isRTL(s.language) ? 'rtl' : 'ltr'}">${esc(seg.text)}</div>
              ${seg.translation ? `<div class="seg-translation" style="direction:${isRTL(s.translatedTo) ? 'rtl' : 'ltr'}">${esc(seg.translation)}</div>` : ''}
            </div>
            <div class="seg-controls">
              <button class="icon-btn" data-act="seg-play" data-seg="${seg.id}" title="Play">${icon('play', 12)}</button>
              <button class="icon-btn" data-act="seg-translate" data-seg="${seg.id}" title="Translate line">${icon('sparkles', 12)}</button>
              <button class="icon-btn" data-act="seg-delete" data-seg="${seg.id}" title="Delete line">${icon('trash', 12)}</button>
            </div>
          </div>`);
      }
    }

    if (this.interim) {
      parts.push(`
        <div class="seg interim" data-interim="1">
          <div class="seg-gutter"><span class="seg-time">${clock(this._elapsedSec() - 1)}</span></div>
          <div class="seg-body">
            <div class="seg-meta"><span class="speaker"><span class="speaker-avatar" style="background:${SPEAKER_VARS[0]}">${esc((s.speakers?.[0]?.name || 'D')[0])}</span>${esc(s.speakers?.[0]?.name || 'DEFAULT')}</span></div>
            <div class="seg-text">${esc(this.interim)}</div>
          </div>
        </div>`);
    }

    if (this.recording && !segs.length && !this.interim) {
      parts.push(`<div class="seg"><div class="seg-gutter"></div><div class="seg-body">
        <div class="field-hint" style="padding:12px 0">Listening… start speaking.</div></div></div>`);
    }

    this.el.transcript.innerHTML = parts.join('');
    this._bindSegments();
    if (settings().autoScroll && this.recording) {
      this.el.scroll.scrollTop = this.el.scroll.scrollHeight;
    }
  }

  _emptyWorkspace() {
    return `
      <div class="transcript-empty">
        <div class="empty-art">${icon('wave', 34)}</div>
        <h2 class="empty-title">Speech to text, in any language</h2>
        <p class="empty-text">Record live from your microphone or drop an audio/video file. Everything is
          transcribed, timestamped and ready to translate or export.</p>
        <div class="empty-actions">
          <button class="btn btn-primary btn-lg" data-act="record">${icon('mic', 16)} Start recording</button>
          <button class="btn btn-lg" data-act="upload">${icon('upload', 16)} Upload a file</button>
        </div>
        <div class="empty-features">
          <span class="empty-feature">${icon('check', 13)} 100+ languages</span>
          <span class="empty-feature">${icon('check', 13)} Runs on your device</span>
          <span class="empty-feature">${icon('check', 13)} Speaker labels</span>
          <span class="empty-feature">${icon('check', 13)} SRT / VTT export</span>
        </div>
        <button class="btn btn-ghost btn-sm" data-act="sample" style="margin-top:22px">See a sample transcript</button>
        <div class="empty-hint">Press <span class="kbd">Space</span> to start · <span class="kbd">${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}</span>+<span class="kbd">K</span> to search</div>
      </div>`;
  }

  _emptySession(s) {
    const canMic = liveSupported() && canLiveType(s.language);
    return `
      <div class="transcript-empty" style="margin-top:6vh">
        <div class="empty-art">${icon('mic', 32)}</div>
        <h2 class="empty-title">${s.source === 'file' ? 'Ready to transcribe' : 'Ready when you are'}</h2>
        <p class="empty-text">${s.source === 'file'
          ? `"${esc(s.sourceName || s.title)}" is loaded. Choose an engine and start the transcription.`
          : 'Hit record and speak naturally. You can switch the language at any time, and export the result as text, SRT or JSON.'}</p>
        <div class="empty-actions">
          <button class="btn btn-primary btn-lg" data-act="record">${icon('mic', 16)} Start recording</button>
          <button class="btn btn-lg" data-act="upload">${icon('upload', 16)} Upload audio</button>
        </div>
        ${!canMic && liveSupported() ? `<div class="banner" style="margin-top:22px;text-align:left;max-width:420px;margin-left:auto;margin-right:auto">
          ${icon('info', 15)}<div>Live dictation isn't available for <b>${esc(langName(s.language))}</b> in this browser.
          Recording will use local Whisper instead.</div></div>` : ''}
        <div class="empty-hint">Everything stays on this device.</div>
      </div>`;
  }

  enhanceOffer(s) {
    return !this.recording && !this.job && s.hasAudio && s.engine === 'browser' && (s.segments || []).length > 0;
  }

  _enhanceBanner() {
    return `<div class="banner info" style="margin-bottom:16px">
      ${icon('sparkles', 15)}
      <div style="flex:1">Live capture is fast. Improve accuracy with Whisper on the saved audio — same transcript, better punctuation.</div>
      <button class="btn btn-sm" data-act="improve" style="flex:none">${icon('sparkles', 13)} Improve</button>
    </div>`;
  }

  _jobHtml() {
    const j = this.job;
    const pct = Math.max(2, Math.min(100, j.progress || 0));
    return `<div class="card" style="margin-bottom:18px;padding:14px 15px;border-color:var(--accent-line);background:var(--accent-soft)">
      <div style="display:flex;align-items:center;gap:9px;margin-bottom:9px">
        <span style="color:var(--accent);display:grid;place-items:center">${icon(j.error ? 'alert' : 'sparkles', 15)}</span>
        <div style="flex:1;font-size:12.5px;font-weight:600">${esc(j.label)}</div>
        <div style="font:500 11px var(--mono);color:var(--muted)">${j.error ? '' : Math.round(pct) + '%'}</div>
        ${j.error || j.done ? `<button class="icon-btn sm" data-act="dismiss-job">${icon('x', 13)}</button>` : ''}
      </div>
      ${j.error
        ? `<div class="field-hint" style="color:var(--rec)">${esc(j.error)}</div>`
        : `<div class="progress"><span style="width:${pct}%"></span></div>`}
      <div class="field-hint" style="margin-top:7px">${esc(j.status || 'Working…')}</div>
    </div>`;
  }

  paintRecBar() {
    if (!this.recording) { this.el.recbar.hidden = true; this.el.recbar.innerHTML = ''; return; }
    this.el.recbar.hidden = false;
    this.el.recbar.innerHTML = `
      <span class="rec-dot ${this.paused ? 'paused' : ''}"></span>
      <div class="rec-wave" data-ref="wave">${this.wave.map(h => `<i style="height:${Math.round(h * 26)}px"></i>`).join('')}</div>
      <span class="rec-timer" data-ref="timer">0:00</span>
      <span class="rec-status">${this.paused ? 'Paused' : (this.recEngine === 'browser' ? 'Listening…' : 'Recording…')}</span>
      <div class="rec-actions">
        <button class="rec-btn" data-act="pause" title="${this.paused ? 'Resume' : 'Pause'}">${icon(this.paused ? 'play' : 'pause', 16)}</button>
        <button class="rec-btn stop" data-act="stop" title="Stop and save">${icon('stop', 14)}</button>
      </div>`;
    this._waveEls = [...this.el.recbar.querySelectorAll('.rec-wave i')];
  }

  /* ── events ───────────────────────────────────────────────────────────── */
  _onClick = (e) => {
    const sidCard = e.target.closest('[data-sid]');
    if (sidCard) { this.openSession(sidCard.dataset.sid); return; }

    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;

    switch (act) {
      case 'new': this.newSession(); break;
      case 'record': this.startRecording(); break;
      case 'stop': this.stopRecording(); break;
      case 'pause': this.togglePause(); break;
      case 'upload': this.el.file.click(); break;
      case 'language': this.changeLanguage(); break;
      case 'rename': this.renameSession(); break;
      case 'translate': this.translateSession(); break;
      case 'more': this.moreMenu(btn); break;
      case 'seek': this.seek(+btn.dataset.start || 0); break;
      case 'speaker': this.speakerMenu(btn, btn.dataset.seg); break;
      case 'seg-play': this.playSegment(btn.dataset.seg); break;
      case 'seg-translate': this.translateSegment(btn.dataset.seg); break;
      case 'seg-delete': this.deleteSegment(btn.dataset.seg); break;
      case 'improve': this.improveWithWhisper(); break;
      case 'dismiss-job': this.job = null; this.paintTranscript(); break;
      case 'sample': this.insertSample(); break;
      case 'search-seg': this.searchSegments(); break;
      default: break;
    }
  };

  _bindSegments() {
    this.el.transcript.querySelectorAll('[data-seg-text]').forEach(node => {
      node.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); node.blur(); }
      });
      node.addEventListener('paste', e => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text/plain');
        document.execCommand('insertText', false, text);
      });
      node.addEventListener('blur', () => {
        const s = this.session();
        const seg = s?.segments?.find(x => x.id === node.dataset.segText);
        if (!seg) return;
        const text = node.innerText.replace(/\n+/g, ' ').trim();
        if (text === seg.text) return;
        updateSession(s.id, x => {
          const t = x.segments.find(y => y.id === node.dataset.segText);
          if (t) t.text = text;
        });
        this.paintSessions();
      });
    });
  }

  _bindDropZone() {
    const zone = this.el.scroll;
    const over = e => { e.preventDefault(); zone.style.outline = '2px dashed var(--accent)'; zone.style.outlineOffset = '-8px'; };
    const out = e => { if (e.target === zone) { zone.style.outline = ''; zone.style.outlineOffset = ''; } };
    zone.addEventListener('dragover', over);
    zone.addEventListener('dragleave', out);
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.style.outline = ''; zone.style.outlineOffset = '';
      const f = e.dataTransfer?.files?.[0];
      if (f) this.handleFile(f);
    });
  }

  /* ── sessions ─────────────────────────────────────────────────────────── */
  openSession(id) {
    if (this.recording) {
      toast('Stop the recording before switching transcripts.', { iconName: 'info' });
      return;
    }
    this.sessionId = id;
    this.interim = '';
    this.job = null;
    this._syncHash();
    this.paint();
    this._paintAudio();
  }

  newSession() {
    if (this.recording) this.stopRecording();
    const s = createSession({
      title: 'Untitled recording',
      language: settings().language,
      engine: settings().engine
    });
    this.sessionId = s.id;
    this._syncHash();
    this.paint();
    this.paintSessions();
    setTimeout(() => this.startRecording(), 80);
  }

  ensureSession() {
    let s = this.session();
    if (!s) {
      s = createSession({ language: settings().language, engine: settings().engine });
      this.sessionId = s.id;
      this._syncHash();
    }
    return s;
  }

  async renameSession() {
    const s = this.session();
    if (!s) return;
    const name = await promptDialog({ title: 'Rename transcript', label: 'Title', value: s.title });
    if (!name) return;
    updateSession(s.id, x => { x.title = name; });
    this.paintHead(); this.paintSessions();
  }

  async changeLanguage() {
    const s = this.session();
    if (!s) return;
    const code = await pickLanguage({ title: 'Transcription language', selected: s.language });
    if (!code) return;
    updateSession(s.id, x => { x.language = code; });
    settings().language = code;
    if (this.recognition) this.recognition.setLang(wsTag(code) || 'en-US');
    this.paintHead();
    this.paintTranscript();
  }

  /* ── recording ────────────────────────────────────────────────────────── */
  async startRecording() {
    if (this.recording) return;
    const st = settings();
    const s = this.ensureSession();

    if (s.language === 'auto') {
      const code = await pickLanguage({ title: 'Which language will you speak?', selected: 'en', allowAuto: false });
      if (!code) return;
      updateSession(s.id, x => { x.language = code; });
      this.paintHead();
    }

    let engine = st.engine;
    if (engine === 'browser' && !canLiveType(s.language)) {
      if (!liveSupported()) {
        engine = 'whisper';
      } else {
        engine = 'whisper';
        toast(`Live dictation doesn't support ${langName(s.language)} — recording with local Whisper.`, { iconName: 'info', duration: 4200 });
      }
    }
    if (engine === 'soniox' && !st.sonioxKey) {
      toast('Add a Soniox API key in Settings, or switch to a local engine.', { type: 'error', duration: 4200 });
      engine = 'whisper';
    }

    this.recEngine = engine;
    this.recSessionId = s.id;

    try {
      this.capture = new MicCapture({
        onLevel: level => this._onLevel(level),
        onTick: ms => this._onTick(ms)
      });
      await this.capture.start();
    } catch (err) {
      this.capture = null;
      toast(err.message || 'Could not access the microphone.', { type: 'error', duration: 5000 });
      return;
    }

    this.recording = true;
    this.paused = false;
    this.interim = '';
    this.utteranceStart = null;
    this.wave = new Array(56).fill(0.06);
    this.paintRecBar();
    this.paintHead();
    this.paintSessions();
    this.paintTranscript();

    if (engine === 'browser') {
      const tag = wsTag(s.language) || 'en-US';
      this.recognition = createLiveRecognition({
        lang: tag,
        onResult: r => this._onSpeech(r),
        onError: err => {
          toast(err.message, { type: 'error', duration: 5200 });
          if (this.recording) this.stopRecording();
        },
        onEnd: () => {}
      });
      this.recognition?.start();
    }

    updateSession(s.id, x => {
      x.engine = engine;
      x.source = x.source || 'microphone';
      if (x.title === 'Untitled recording') {
        const d = new Date();
        x.title = `Recording · ${d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
      }
    });
    this.paintHead();
    this.paintSessions();
  }

  _onSpeech({ text, final, confidence }) {
    if (!text) return;
    const sec = this._elapsedSec();

    if (!final) {
      if (this.utteranceStart == null) this.utteranceStart = Math.max(0, sec - Math.min(6, text.split(/\s+/).length / 2.4));
      this.interim = text;
      this.paintTranscript();
      return;
    }

    const words = text.split(/\s+/).filter(Boolean).length;
    const start = this.utteranceStart ?? Math.max(0, sec - words / 2.4);
    this.utteranceStart = null;
    this.interim = '';

    const s = this.session();
    if (!s) return;
    updateSession(s.id, x => {
      x.segments.push({
        id: `sg_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 4)}`,
        text,
        start: +start.toFixed(2),
        end: +sec.toFixed(2),
        speaker: x.speakers[0]?.id || 'sp1',
        translation: '',
        confidence
      });
      x.durationMs = sec * 1000;
      if (x.title.startsWith('Recording ·') || x.title === 'Untitled recording') {
        x.title = text.slice(0, 60) || x.title;
      }
    }, { touch: true });
    this.paintTranscript();
    this.paintHead();
    this.paintSessions();
  }

  _elapsedSec() {
    if (this.capture) return this.capture.elapsedMs() / 1000;
    return 0;
  }

  _onTick(ms) {
    const t = this.el.recbar?.querySelector('[data-ref="timer"]');
    if (t) t.textContent = clock(ms / 1000);
  }

  _onLevel(level) {
    this.wave.shift();
    this.wave.push(Math.max(0.05, level));
    if (!this._waveEls) return;
    for (let i = 0; i < this._waveEls.length; i++) {
      this._waveEls[i].style.height = `${Math.round(this.wave[i] * 26)}px`;
      this._waveEls[i].style.opacity = `${0.35 + Math.min(0.65, this.wave[i])}`;
    }
  }

  togglePause() {
    if (!this.capture) return;
    if (this.paused) {
      this.capture.resume();
      this.recognition?.start?.();
      this.paused = false;
    } else {
      this.capture.pause();
      this.recognition?.stop?.();
      this.paused = true;
    }
    this.paintRecBar();
  }

  async stopRecording() {
    if (!this.recording) return;
    this.recording = false;
    this.paused = false;
    const engine = this.recEngine;
    const sessionId = this.recSessionId || this.sessionId;
    const capture = this.capture;

    this.recognition?.stop();
    this.recognition = null;
    this.capture = null;
    this.interim = '';

    this.paintRecBar();
    this.paintHead();

    let blob = null, elapsed = 0;
    if (capture) {
      try {
        const res = await capture.stop();
        blob = res.blob; elapsed = res.elapsedMs;
      } catch (err) { console.warn(err); }
    }

    const s = getSession(sessionId);
    if (!s) { this.paint(); return; }

    if (elapsed > 400) {
      updateSession(s.id, x => {
        x.durationMs = Math.max(x.durationMs || 0, elapsed);
        x.hasAudio = !!blob;
      });
      addUsage(elapsed / 1000);
    }

    if (blob) {
      const ok = await audioStore.put(s.id, blob);
      if (ok) {
        forgetAudioUrl(s.id);
        updateSession(s.id, x => { x.hasAudio = true; });
      }
      if (engine === 'whisper' || (engine === 'browser' && !canLiveType(s.language))) {
        await this.runWhisperJob(s, blob, { replace: true });
      } else if (engine === 'soniox') {
        await this.runSonioxJob(s, blob);
      }
    } else if (engine === 'whisper' || engine === 'soniox') {
      toast('No audio was captured — nothing to transcribe.', { type: 'error' });
    }

    this.paint();
    this._paintAudio();
    this.paintSessions();
  }

  abortRecording() {
    this.recording = false;
    this.recognition?.abort?.();
    this.recognition = null;
    this.capture?.stop?.()?.catch?.(() => {});
    this.capture = null;
  }

  /* ── file handling ────────────────────────────────────────────────────── */
  async handleFile(file) {
    if (this.recording) this.stopRecording();

    const okType = /^(audio|video)\//.test(file.type) || /\.(mp3|wav|m4a|ogg|webm|mp4|mov|aac|flac|opus)$/i.test(file.name);
    if (!okType) { toast('That file type is not supported.', { type: 'error' }); return; }
    if (file.size > 260 * 1024 * 1024) { toast('File is larger than 260 MB. Trim it first.', { type: 'error' }); return; }

    const title = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').slice(0, 90) || 'Uploaded audio';
    const s = createSession({
      title,
      language: settings().language,
      engine: settings().engine === 'browser' ? 'whisper' : settings().engine,
      source: 'file',
      sourceName: file.name
    });
    this.sessionId = s.id;
    this.job = null;
    this._syncHash();
    this.paint();
    this.paintSessions();

    await audioStore.put(s.id, file);
    updateSession(s.id, x => { x.hasAudio = true; });
    this._paintAudio();

    const engine = settings().engine === 'soniox' && settings().sonioxKey ? 'soniox' : 'whisper';
    if (engine === 'soniox') await this.runSonioxJob(s, file);
    else await this.runWhisperJob(s, file, { replace: true });
  }

  /* ── jobs ─────────────────────────────────────────────────────────────── */
  async runWhisperJob(s, blob, { replace = false } = {}) {
    const st = settings();
    const model = st.model;
    const modelLabel = WHISPER_MODELS.find(m => m.id === model)?.label || model;
    this.job = { label: `Transcribing · ${modelLabel.split(' · ')[0]}`, progress: 1, status: 'Preparing model…' };
    this.paintTranscript();

    const paintJob = () => {
      const now = performance.now();
      if (now - this._jobPaintAt < 120) return;
      this._jobPaintAt = now;
      this.paintTranscript();
    };

    try {
      const result = await transcribeAudio(blob, {
        model,
        language: s.language,
        onProgress: p => {
          if (!this.job) return;
          if (p.status === 'download') {
            this.job.progress = Math.min(60, p.progress * 0.6);
            this.job.status = `Downloading model ${Math.round(p.progress)}%${p.file ? ` · ${p.file.split('/').pop()}` : ''}`;
          } else if (p.status === 'ready') {
            this.job.progress = Math.max(this.job.progress, 62);
            this.job.status = 'Model ready';
          } else if (p.status === 'device') {
            this.job.status = p.file === 'webgpu' ? 'Using WebGPU acceleration…' : 'Using CPU (WASM)…';
          }
          paintJob();
        },
        onStatus: status => {
          if (!this.job) return;
          this.job.status = status;
          if (status.startsWith('Transcribing')) this.job.progress = Math.max(this.job.progress, 68);
          paintJob();
        }
      });

      this.job.progress = 96;
      this.job.status = `Saving ${lines(result.segments.length)}…`;
      this.paintTranscript();

      const segs = result.segments.map((seg, i) => ({
        id: `sg_${Date.now().toString(36)}${i}${Math.random().toString(36).slice(2, 4)}`,
        text: seg.text,
        start: seg.start,
        end: seg.end,
        speaker: 'sp1',
        translation: ''
      }));

      updateSession(s.id, x => {
        if (replace || !x.segments.length) x.segments = segs;
        else x.segments.push(...segs);
        x.durationMs = Math.round((result.duration || 0) * 1000);
        x.engine = 'whisper';
        if (!x.speakers?.length) x.speakers = [{ id: 'sp1', name: 'DEFAULT' }];
        if (x.title === 'Untitled recording') x.title = (segs[0]?.text || x.title).slice(0, 60);
      });
      if (result.duration) addUsage(result.duration);

      this.job = { label: 'Transcript ready', progress: 100, status: `${lines(segs.length)} · ${clock(result.duration || 0)}`, done: true };
      this.paint();
      this._paintAudio();
      this.paintSessions();
      toast('Transcription complete');
      setTimeout(() => {
        if (this.job?.done) { this.job = null; this.paintTranscript(); }
      }, 3600);
    } catch (err) {
      console.error(err);
      this.job = {
        label: 'Transcription failed',
        progress: 0,
        error: /fetch|network|import/i.test(err.message)
          ? 'Could not load the speech model. Check your internet connection (the model is downloaded once, then cached).'
          : err.message
      };
      this.paintTranscript();
      toast('Whisper could not finish', { type: 'error' });
    }
  }

  async runSonioxJob(s, blob) {
    const st = settings();
    this.job = { label: 'Soniox transcription', progress: 8, status: 'Uploading…' };
    this.paintTranscript();
    try {
      const result = await transcribeWithSoniox(blob, {
        apiKey: st.sonioxKey,
        filename: s.sourceName || `${s.title}.webm`,
        language: s.language,
        diarize: true,
        onStatus: status => {
          this.job = { ...this.job, status, progress: Math.min(92, (this.job?.progress || 8) + 9) };
          this.paintTranscript();
        }
      });

      const speakers = result.speakers?.length ? result.speakers : [{ id: 'sp1', name: 'DEFAULT' }];
      updateSession(s.id, x => {
        x.segments = result.segments.map((seg, i) => ({
          id: `sg_${Date.now().toString(36)}${i}`,
          text: seg.text,
          start: seg.start,
          end: seg.end,
          speaker: seg.speaker || 'sp1',
          translation: ''
        }));
        x.speakers = speakers;
        x.engine = 'soniox';
        x.hasAudio = true;
        if (x.title === 'Untitled recording') x.title = (result.text || x.title).slice(0, 60);
      });
      this.job = { label: 'Transcript ready', progress: 100, status: lines(result.segments.length), done: true };
      this.paint();
      this._paintAudio();
      this.paintSessions();
      toast('Soniox transcription complete');
    } catch (err) {
      this.job = { label: 'Soniox failed', progress: 0, error: err.message };
      this.paintTranscript();
      toast(err.message, { type: 'error', duration: 6000 });
    }
  }

  async improveWithWhisper() {
    const s = this.session();
    if (!s?.hasAudio) { toast('No saved audio for this session.', { type: 'error' }); return; }
    const blob = await audioStore.get(s.id);
    if (!blob) { toast('Audio for this session is no longer stored.', { type: 'error' }); return; }
    await this.runWhisperJob(s, blob, { replace: true });
  }

  /* ── audio playback ───────────────────────────────────────────────────── */
  async _paintAudio() {
    const s = this.session();
    const dock = this.el.audioDock;
    if (!s || !s.hasAudio) { dock.hidden = true; dock.innerHTML = ''; return; }
    const url = await audioUrl(s.id);
    if (!url) { dock.hidden = true; return; }

    dock.hidden = false;
    if (this.audioEl && this.audioEl.src === url) return;

    dock.innerHTML = `
      <button class="icon-btn" data-act="audiotoggle" title="Play / pause">${icon('play', 15)}</button>
      <audio preload="metadata" src="${url}"></audio>
      <span class="label" data-ref="audiotime">0:00</span>
      <input type="range" min="0" max="1000" value="0" data-ref="audioseek" style="flex:1;accent-color:var(--accent)" />
      <span class="label" data-ref="audiodur">0:00</span>`;

    const audio = dock.querySelector('audio');
    this.audioEl = audio;
    this.audioDockEl = dock;

    const seek = dock.querySelector('[data-ref="audioseek"]');
    const time = dock.querySelector('[data-ref="audiotime"]');
    const dur = dock.querySelector('[data-ref="audiodur"]');
    const toggle = dock.querySelector('[data-act="audiotoggle"]');

    audio.addEventListener('loadedmetadata', () => { dur.textContent = clock(audio.duration); });
    audio.addEventListener('timeupdate', () => {
      time.textContent = clock(audio.currentTime);
      if (audio.duration) seek.value = String((audio.currentTime / audio.duration) * 1000);
      this._highlightAt(audio.currentTime);
    });
    audio.addEventListener('play', () => { toggle.innerHTML = icon('pause', 15); });
    audio.addEventListener('pause', () => { toggle.innerHTML = icon('play', 15); });
    audio.addEventListener('ended', () => { toggle.innerHTML = icon('play', 15); });
    toggle.addEventListener('click', () => { audio.paused ? audio.play() : audio.pause(); });
    seek.addEventListener('input', () => {
      if (audio.duration) audio.currentTime = (seek.value / 1000) * audio.duration;
    });
  }

  _teardownAudio() {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.src = '';
      this.audioEl = null;
    }
  }

  seek(sec) {
    if (!this.audioEl) { toast('No audio attached to this transcript.', { iconName: 'info' }); return; }
    this.audioEl.currentTime = Math.max(0, sec);
    this.audioEl.play().catch(() => {});
  }

  playSegment(segId) {
    const s = this.session();
    const seg = s?.segments?.find(x => x.id === segId);
    if (seg) this.seek(seg.start || 0);
  }

  _highlightAt(t) {
    const s = this.session();
    if (!s) return;
    const segs = s.segments || [];
    let active = null;
    for (const seg of segs) {
      if (t >= (seg.start || 0) - 0.15 && t <= (seg.end || seg.start + 1) + 0.25) { active = seg.id; break; }
    }
    this.el.transcript.querySelectorAll('.seg.active').forEach(n => {
      if (n.dataset.seg !== active) n.classList.remove('active');
    });
    if (active) {
      const node = this.el.transcript.querySelector(`.seg[data-seg="${active}"]`);
      if (node && !node.classList.contains('active')) {
        node.classList.add('active');
        const rect = node.getBoundingClientRect();
        const box = this.el.scroll.getBoundingClientRect();
        if (rect.top < box.top + 40 || rect.bottom > box.bottom - 40) {
          node.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }
  }

  /* ── segments ─────────────────────────────────────────────────────────── */
  deleteSegment(segId) {
    const s = this.session();
    if (!s) return;
    updateSession(s.id, x => { x.segments = x.segments.filter(y => y.id !== segId); });
    this.paintTranscript();
    this.paintHead();
    this.paintSessions();
  }

  speakerMenu(anchor, segId) {
    const s = this.session();
    if (!s) return;
    const seg = s.segments.find(x => x.id === segId);
    const items = (s.speakers || []).map(sp => ({
      id: `sp:${sp.id}`,
      label: sp.name,
      icon: seg?.speaker === sp.id ? 'check' : 'users',
      onClick: () => {
        updateSession(s.id, x => {
          const t = x.segments.find(y => y.id === segId);
          if (t) t.speaker = sp.id;
        });
        this.paintTranscript();
      }
    }));
    if (s.speakers.length < 4) items.push({ sep: true });
    if (s.speakers.length < 4) items.push({
      id: 'add',
      label: 'Add a speaker',
      icon: 'plus',
      onClick: () => {
        updateSession(s.id, x => {
          const sp = ensureSpeaker(x, `Speaker ${x.speakers.length + 1}`);
          const t = x.segments.find(y => y.id === segId);
          if (t) t.speaker = sp.id;
        });
        this.paintTranscript();
      }
    });
    items.push({ sep: true }, {
      id: 'rename',
      label: 'Rename this speaker…',
      icon: 'edit',
      onClick: async () => {
        const current = s.speakers.find(x => x.id === seg?.speaker);
        const name = await promptDialog({ title: 'Rename speaker', label: 'Name', value: current?.name || '' });
        if (!name) return;
        updateSession(s.id, x => {
          const sp = x.speakers.find(y => y.id === seg?.speaker);
          if (sp) sp.name = name;
        });
        this.paintTranscript();
      }
    });
    openMenu(anchor, items);
  }

  async translateSegment(segId) {
    const s = this.session();
    const seg = s?.segments?.find(x => x.id === segId);
    if (!seg || !seg.text) return;
    const target = await pickLanguage({
      title: 'Translate line to',
      selected: s.translatedTo || settings().translateTo || 'es',
      allowAuto: false
    });
    if (!target) return;
    const st = settings();
    try {
      const out = await translateText(seg.text, {
        from: s.language === 'auto' ? 'auto' : s.language,
        to: target,
        provider: st.translationProvider,
        libretranslateUrl: st.libretranslateUrl
      });
      updateSession(s.id, x => {
        const t = x.segments.find(y => y.id === segId);
        if (t) t.translation = out;
        x.translatedTo = target;
      });
      this.paintTranscript();
      this.paintHead();
    } catch (err) {
      toast(err.message, { type: 'error', duration: 5000 });
    }
  }

  async translateSession() {
    const s = this.session();
    if (!s || !(s.segments || []).length) { toast('Record something first.', { iconName: 'info' }); return; }
    const target = await pickLanguage({
      title: 'Translate transcript to',
      selected: s.translatedTo || settings().translateTo || 'es',
      allowAuto: false
    });
    if (!target) return;

    if (s.translatedTo === target && s.segments.every(x => x.translation)) {
      const hide = await confirmDialog({
        title: 'Translation already complete',
        message: 'Hide the translation and keep the original transcript?',
        confirmLabel: 'Hide translation'
      });
      if (hide) {
        updateSession(s.id, x => { x.translatedTo = ''; x.segments.forEach(y => { y.translation = ''; }); });
        this.paintHead(); this.paintTranscript();
      }
      return;
    }

    const st = settings();
    settings().translateTo = target;
    const segs = s.segments.filter(x => x.text?.trim());
    this.job = { label: `Translating to ${langName(target)}`, progress: 2, status: `0 of ${lines(segs.length)}` };
    this.paintTranscript();

    const provider = st.translationProvider;
    let done = 0, failed = 0;
    for (const seg of segs) {
      try {
        const out = await translateText(seg.text, {
          from: s.language === 'auto' ? 'auto' : s.language,
          to: target,
          provider,
          libretranslateUrl: st.libretranslateUrl
        });
        updateSession(s.id, x => {
          const t = x.segments.find(y => y.id === seg.id);
          if (t) t.translation = out;
          x.translatedTo = target;
        }, { touch: false });
      } catch (err) {
        failed++;
      }
      done++;
      this.job.progress = Math.round((done / segs.length) * 100);
      this.job.status = `${done} of ${lines(segs.length)}${failed ? ` · ${failed} failed` : ''}`;
      this.paintTranscript();
    }

    updateSession(s.id, x => { x.translatedTo = target; });
    this.job = failed === segs.length
      ? { label: 'Translation failed', progress: 0, error: 'The translation service could not be reached. Try LibreTranslate in Settings.' }
      : { label: 'Translation ready', progress: 100, status: `${done - failed} of ${lines(segs.length)} translated`, done: true };

    this.paintTranscript();
    this.paintHead();
    if (failed === segs.length) toast('Translation failed', { type: 'error' });
    else toast(`Translated to ${langName(target)}`);
    setTimeout(() => { if (this.job?.done) { this.job = null; this.paintTranscript(); } }, 3500);
  }

  searchSegments() {
    const s = this.session();
    if (!s) return;
    const body = document.createElement('div');
    body.innerHTML = `<input class="input" data-q placeholder="Find in transcript…" />
      <div style="display:grid;gap:2px;margin-top:10px;max-height:40dvh;overflow:auto" data-results>
        <div class="field-hint">Type to search ${lines(s.segments.length)}.</div></div>`;
    const input = body.querySelector('[data-q]');
    const results = body.querySelector('[data-results]');
    const run = () => {
      const q = input.value.trim().toLowerCase();
      const hits = s.segments.filter(x => q && x.text.toLowerCase().includes(q)).slice(0, 40);
      results.innerHTML = hits.length ? hits.map(h => `
        <button class="menu-item" data-jump="${h.id}">
          <span style="font:500 10px var(--mono);color:var(--faint)">${clock(h.start)}</span>
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(h.text.slice(0, 90))}</span>
        </button>`).join('') : `<div class="field-hint">${q ? 'No matches.' : ''}</div>`;
    };
    input.addEventListener('input', run);
    const { close } = openModal({ title: 'Search transcript', body, onMount: el => {
      el.addEventListener('click', e => {
        const hit = e.target.closest('[data-jump]');
        if (!hit) return;
        const seg = this.el.transcript.querySelector(`.seg[data-seg="${hit.dataset.jump}"]`);
        close();
        if (seg) {
          seg.scrollIntoView({ block: 'center', behavior: 'smooth' });
          seg.style.transition = 'background .2s';
          seg.style.background = 'var(--accent-soft)';
          setTimeout(() => { seg.style.background = ''; }, 1400);
        }
      });
    } });
    setTimeout(() => input.focus(), 50);
  }

  /* ── more menu / export ───────────────────────────────────────────────── */
  moreMenu(anchor) {
    const s = this.session();
    if (!s) return;
    const items = [
      { heading: 'Transcript' },
      { id: 'copy', label: 'Copy all text', icon: 'copy', onClick: () => copyText(toPlainText(s, { speakers: true })) },
      { id: 'export', label: 'Export…', icon: 'download', onClick: () => this.exportDialog(s) },
      { id: 'project', label: 'Move to project…', icon: 'folder', onClick: () => this.moveToProject(s) },
      { sep: true },
      { id: 'lang', label: 'Language & engine', icon: 'globe', onClick: () => this.engineDialog(s) },
      { id: 'audio', label: 'Download audio', icon: 'headphones', onClick: () => this.downloadAudio(s), hint: s.hasAudio ? '' : 'none' },
      { sep: true },
      { id: 'del', label: 'Delete transcript', icon: 'trash', danger: true, onClick: async () => {
        if (await confirmDialog({ title: 'Delete transcript?', message: `“${s.title}” will be removed from this device.`, confirmLabel: 'Delete', danger: true })) {
          deleteSession(s.id);
          this.sessionId = recentSessions(1)[0]?.id || null;
          this._syncHash();
          this.paint();
          this._paintAudio();
        }
      } }
    ];
    openMenu(anchor, items);
  }

  exportDialog(s) {
    const formats = [
      ['txt', 'Plain text', 'Speaker-labelled, timestamped'],
      ['md', 'Markdown', 'Great for notes & docs'],
      ['srt', 'Subtitles · SRT', 'For video editors'],
      ['vtt', 'Subtitles · VTT', 'For the web'],
      ['json', 'JSON', 'Segments + timestamps'],
      ['csv', 'CSV', 'For spreadsheets'],
      ['html', 'HTML page', 'Shareable, printable']
    ];
    const body = document.createElement('div');
    body.style.display = 'grid';
    body.style.gap = '4px';
    body.innerHTML = formats.map(([key, label, desc]) => `
      <button class="menu-item" data-fmt="${key}" style="padding:9px 10px">
        ${icon('download', 15)}
        <span style="flex:1"><span style="display:block;color:var(--text);font-weight:550">${label}</span>
        <span style="font-size:11px;color:var(--muted)">${desc}</span></span>
        <span class="lang-code">.${key}</span>
      </button>`).join('');
    const { close } = openModal({ title: 'Export transcript', body, onMount: el => {
      el.addEventListener('click', e => {
        const b = e.target.closest('[data-fmt]');
        if (!b) return;
        const { name, content, mime } = exportSession(s, b.dataset.fmt);
        download(safeFileName(name.replace(/\.[^.]+$/, ''), name.split('.').pop()), content, `${mime};charset=utf-8`);
        close();
        toast('Download started');
      });
    } });
  }

  async moveToProject(s) {
    const st = getState();
    const body = document.createElement('div');
    body.innerHTML = `<label class="field"><span class="field-label">Project</span>
      <select class="select" data-project style="width:100%">
        <option value="">No project</option>
        ${st.projects.map(p => `<option value="${p.id}" ${s.projectId === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
      </select></label>
      <div class="field-hint">Create projects from the Projects page.</div>`;
    const { result } = openModal({
      title: 'Move transcript',
      body,
      actions: [{ label: 'Cancel', value: 'cancel', variant: 'ghost' }, { label: 'Move', value: 'ok', variant: 'primary' }]
    });
    const chosen = await result;
    if (chosen !== 'ok') return;
    const value = body.querySelector('[data-project]').value || null;
    updateSession(s.id, x => { x.projectId = value; });
    toast('Transcript moved');
    this.ctx.refreshShell?.();
  }

  async engineDialog(s) {
    const st = settings();
    const body = document.createElement('div');
    body.innerHTML = `
      <label class="field"><span class="field-label">Language</span>
        <button class="btn" data-pick style="justify-content:space-between">${esc(langName(s.language))} ${icon('chevronRight', 14)}</button>
      </label>
      <label class="field"><span class="field-label">Transcription engine</span>
        <select class="select" data-engine style="width:100%">
          <option value="browser" ${st.engine === 'browser' ? 'selected' : ''}>Live · browser (instant, free)</option>
          <option value="whisper" ${st.engine === 'whisper' ? 'selected' : ''}>Whisper · on-device (accurate)</option>
          <option value="soniox" ${st.engine === 'soniox' ? 'selected' : ''}>Soniox · cloud (needs API key)</option>
        </select>
      </label>
      <div class="field-hint">Applies to new recordings. Live mode covers ${document.querySelectorAll('.lang-badge').length || 'many'} languages; Whisper covers 100+ with automatic fallback.</div>`;
    const pick = body.querySelector('[data-pick]');
    pick.addEventListener('click', async () => {
      const code = await pickLanguage({ title: 'Language', selected: s.language });
      if (!code) return;
      updateSession(s.id, x => { x.language = code; });
      pick.firstChild.textContent = langName(code) + ' ';
      this.paintHead();
    });
    const { result } = openModal({
      title: 'Language & engine',
      body,
      actions: [{ label: 'Done', value: 'ok', variant: 'primary' }]
    });
    await result;
    const engine = body.querySelector('[data-engine]').value;
    st.engine = engine;
    updateSession(s.id, x => { x.engine = engine; });
    this.paintHead();
    toast('Preferences saved');
  }

  async downloadAudio(s) {
    const blob = await audioStore.get(s.id);
    if (!blob) { toast('Audio is not stored for this transcript.', { type: 'error' }); return; }
    const ext = (blob.type.split('/')[1] || 'webm').split(';')[0];
    download(safeFileName(s.title, ext), blob, blob.type);
  }

  insertSample() {
    const s = createSession({
      title: 'Sample · first conversation',
      language: 'en',
      engine: 'browser',
      durationMs: 8200,
      source: 'microphone',
      segments: [
        { id: 'sg_s1', text: "Hey, how are you doing?", start: 0.4, end: 2.1, speaker: 'sp1', translation: '' },
        { id: 'sg_s2', text: "Okay, I'm doing fine. I've been testing the new transcription app all morning.", start: 3.2, end: 7.9, speaker: 'sp1', translation: '' }
      ],
      speakers: [{ id: 'sp1', name: 'DEFAULT' }]
    });
    this.sessionId = s.id;
    this._syncHash();
    this.paint();
  }

  /* ── misc ─────────────────────────────────────────────────────────────── */
  _emptyTranscriptHint() {}
}
