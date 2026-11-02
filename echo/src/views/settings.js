import { getState, settings, emit, exportData, importData, clearAll, saveState, usagePercent } from '../store.js';
import { WHISPER_MODELS, preloadModel } from '../engines/whisper.js';
import { SONIOX_MODELS } from '../engines/soniox.js';
import { liveSupported } from '../engines/webSpeech.js';
import { icon, esc, toast, confirmDialog, download, humanDuration, clock, modKey } from '../ui.js';
import { langName, TRANSLATION_TARGETS } from '../languages.js';
import { pickLanguage } from './languagePicker.js';

export class SettingsView {
  constructor(ctx) { this.ctx = ctx; }

  mount(container) {
    this.container = container;
    this.paint();
    this.container.querySelector('.page')?.addEventListener('click', this.onClick);
    this.container.querySelector('.page')?.addEventListener('change', this.onChange);
    this.loadStorage();
  }

  destroy() {}

  paint() {
    const st = settings();
    const state = getState();
    const usedMin = Math.round(state.usage.seconds / 60);

    this.container.innerHTML = `
      <div class="page">
        <header class="page-head">
          <div><h1 class="page-title">Settings</h1>
          <div class="page-sub">Engines, languages, privacy and data</div></div>
        </header>
        <div class="page-scroll">
          <div class="settings-wrap">

            <div class="settings-section">
              <h3>General</h3>
              <div class="card">
                <div class="row">
                  <div class="row-text"><div class="row-title">Appearance</div>
                    <div class="row-desc">Match your system or pick a theme.</div></div>
                  <select class="select" data-setting="theme">
                    <option value="system" ${st.theme === 'system' ? 'selected' : ''}>System</option>
                    <option value="light" ${st.theme === 'light' ? 'selected' : ''}>Light</option>
                    <option value="dark" ${st.theme === 'dark' ? 'selected' : ''}>Dark</option>
                  </select>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Default language</div>
                    <div class="row-desc">Used for new recordings and dictation.</div></div>
                  <button class="btn" data-act="pick-lang">${icon('globe', 14)} ${esc(langName(st.language))}</button>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Auto-scroll while recording</div>
                    <div class="row-desc">Keep the newest line in view.</div></div>
                  <label class="switch"><input type="checkbox" data-setting="autoScroll" ${st.autoScroll ? 'checked' : ''} />
                    <span class="switch-track"></span></label>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Speaker labels</div>
                    <div class="row-desc">Show speaker chips above each line.</div></div>
                  <label class="switch"><input type="checkbox" data-setting="speakerLabels" ${st.speakerLabels ? 'checked' : ''} />
                    <span class="switch-track"></span></label>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h3>Transcription engine</h3>
              <div class="card">
                <div class="row">
                  <div class="row-text"><div class="row-title">Default engine</div>
                    <div class="row-desc">Live is instant and free. Whisper is more accurate and works offline after the first download. Soniox is a cloud API.</div></div>
                  <select class="select" data-setting="engine">
                    <option value="browser" ${st.engine === 'browser' ? 'selected' : ''}>Live · browser</option>
                    <option value="whisper" ${st.engine === 'whisper' ? 'selected' : ''}>Whisper · on-device</option>
                    <option value="soniox" ${st.engine === 'soniox' ? 'selected' : ''}>Soniox · cloud</option>
                  </select>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Whisper model</div>
                    <div class="row-desc">Bigger models are more accurate but slower to download and run.</div></div>
                  <select class="select" data-setting="model">
                    ${WHISPER_MODELS.map(m => `<option value="${m.id}" ${st.model === m.id ? 'selected' : ''}>${esc(m.label)} · ${m.size}</option>`).join('')}
                  </select>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Pre-download model</div>
                    <div class="row-desc" data-ref="preloadNote">Cache ${esc((WHISPER_MODELS.find(m => m.id === st.model)?.label || '').split(' · ')[0])} for offline use.</div></div>
                  <button class="btn" data-act="preload">${icon('download', 14)} Download</button>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Live dictation support</div>
                    <div class="row-desc">${liveSupported() ? 'Available in this browser.' : 'Not available — use Chrome or Edge.'}</div></div>
                  <span class="chip">${liveSupported() ? '<span class="chip-dot"></span> Ready' : 'Unavailable'}</span>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h3>Soniox (optional)</h3>
              <div class="card">
                <div class="row-col">
                  <div class="row-title">API key</div>
                  <input class="input" type="password" data-setting="sonioxKey" value="${esc(st.sonioxKey)}" placeholder="Paste your Soniox API key" autocomplete="off" />
                  <div class="field-hint">Stored only in this browser. Soniox adds cloud accuracy and speaker diarisation. Get a key at soniox.com.</div>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Model</div>
                    <div class="row-desc">Async REST transcription.</div></div>
                  <select class="select" data-setting="sonioxModel">
                    ${SONIOX_MODELS.map(m => `<option value="${m.id}" ${(st.sonioxModel || SONIOX_MODELS[0].id) === m.id ? 'selected' : ''}>${esc(m.label)}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="field-hint" style="padding:8px 3px">The browser calls Soniox directly. If your network blocks it, use Whisper instead — it never leaves this device.</div>
            </div>

            <div class="settings-section">
              <h3>Translation</h3>
              <div class="card">
                <div class="row">
                  <div class="row-text"><div class="row-title">Provider</div>
                    <div class="row-desc">MyMemory is free and needs no key. LibreTranslate is best self-hosted.</div></div>
                  <select class="select" data-setting="translationProvider">
                    <option value="mymemory" ${st.translationProvider === 'mymemory' ? 'selected' : ''}>MyMemory · free</option>
                    <option value="libretranslate" ${st.translationProvider === 'libretranslate' ? 'selected' : ''}>LibreTranslate</option>
                    <option value="off" ${st.translationProvider === 'off' ? 'selected' : ''}>Off</option>
                  </select>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Translate to</div>
                    <div class="row-desc">Default target language.</div></div>
                  <button class="btn" data-act="pick-target">${icon('translate', 14)} ${esc(langName(st.translateTo))}</button>
                </div>
                <div class="row-col">
                  <div class="row-title">LibreTranslate URL</div>
                  <input class="input" data-setting="libretranslateUrl" value="${esc(st.libretranslateUrl)}" placeholder="https://libretranslate.example.com" />
                  <div class="field-hint">Only used when LibreTranslate is selected.</div>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h3>Usage</h3>
              <div class="card">
                <div class="row">
                  <div class="row-text"><div class="row-title">${usedMin} minutes this month</div>
                    <div class="row-desc">${humanDuration(state.usage.seconds * 1000)} transcribed locally · plan limit ${state.credits.limitMinutes} min</div></div>
                  <span class="chip">${Math.round(usagePercent())}%</span>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Storage used</div>
                    <div class="row-desc" data-ref="storage">Calculating…</div></div>
                  <button class="btn btn-sm" data-act="reset-usage">Reset counter</button>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h3>Your data</h3>
              <div class="card">
                <div class="row">
                  <div class="row-text"><div class="row-title">Export everything</div>
                    <div class="row-desc">All transcripts, projects and settings as JSON.</div></div>
                  <button class="btn" data-act="export-data">${icon('download', 14)} Export</button>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Import a backup</div>
                    <div class="row-desc">Replaces the current workspace.</div></div>
                  <button class="btn" data-act="import-data">${icon('upload', 14)} Import</button>
                </div>
                <div class="row">
                  <div class="row-text"><div class="row-title">Delete everything</div>
                    <div class="row-desc">Removes transcripts, audio, projects and settings from this browser.</div></div>
                  <button class="btn btn-danger" data-act="clear">${icon('trash', 14)} Delete</button>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h3>Keyboard</h3>
              <div class="card">
                ${[
                  ['Start / stop recording', '<span class="kbd">Space</span>'],
                  ['Search transcripts', `<span class="kbd">${modKey}</span>+<span class="kbd">K</span>`],
                  ['Toggle dictation', `<span class="kbd">${modKey}</span>+<span class="kbd">Space</span>`],
                  ['Translate (in Translator)', `<span class="kbd">${modKey}</span>+<span class="kbd">Enter</span>`],
                  ['Close a dialog', '<span class="kbd">Esc</span>']
                ].map(([label, keys]) => `<div class="row"><div class="row-text"><div class="row-title">${label}</div></div>${keys}</div>`).join('')}
              </div>
            </div>

            <div style="text-align:center;color:var(--faint);font-size:11.5px;padding:6px 0 40px">
              Echo · local-first transcription · v1.0<br/>
              Audio stays in your browser unless you explicitly use Soniox.
            </div>
          </div>
        </div>
      </div>`;
  }

  onChange = (e) => {
    const el = e.target.closest('[data-setting]');
    if (!el) return;
    const key = el.dataset.setting;
    const value = el.type === 'checkbox' ? el.checked : el.value;
    settings()[key] = value;
    saveState(true);
    if (key === 'theme') this.ctx.applyTheme?.();
    if (key === 'engine' || key === 'model') this.paint();
    if (key === 'sonioxKey') toast('Soniox key saved');
    this.ctx.refreshShell?.();
  };

  onClick = async (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;

    if (act === 'pick-lang') {
      const code = await pickLanguage({ title: 'Default language', selected: settings().language });
      if (code) { settings().language = code; saveState(true); this.paint(); this.ctx.refreshShell?.(); }
    }
    if (act === 'pick-target') {
      const code = await pickLanguage({ title: 'Default translation target', selected: settings().translateTo, allowAuto: false });
      if (code) { settings().translateTo = code; saveState(true); this.paint(); }
    }
    if (act === 'preload') {
      const btn = e.target.closest('[data-act="preload"]');
      const note = this.container.querySelector('[data-ref="preloadNote"]');
      btn.disabled = true;
      btn.innerHTML = `${icon('refresh', 14)} Downloading…`;
      try {
        await preloadModel(settings().model, p => {
          if (p.status === 'download') {
            note.textContent = `Downloading ${Math.round(p.progress)}%${p.file ? ` · ${p.file.split('/').pop()}` : ''}`;
          } else if (p.status === 'device') {
            note.textContent = p.file === 'webgpu' ? 'WebGPU detected — preparing…' : 'Preparing CPU inference…';
          }
        });
        note.textContent = 'Model cached — Smart Scribe works offline now.';
        toast('Model ready');
      } catch (err) {
        note.textContent = 'Download failed. Check your connection.';
        toast(err.message, { type: 'error' });
      } finally {
        btn.disabled = false;
        btn.innerHTML = `${icon('check', 14)} Cached`;
      }
    }
    if (act === 'reset-usage') {
      getState().usage.seconds = 0;
      emit('usage');
      this.paint();
      this.ctx.refreshShell?.();
      toast('Usage counter reset');
    }
    if (act === 'export-data') {
      download(`echo-backup-${new Date().toISOString().slice(0, 10)}.json`, exportData(), 'application/json');
    }
    if (act === 'import-data') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = async () => {
        const f = input.files?.[0];
        if (!f) return;
        const ok = await confirmDialog({
          title: 'Replace workspace?',
          message: 'Importing a backup replaces every transcript, project and setting in this browser.',
          confirmLabel: 'Replace',
          danger: true
        });
        if (!ok) return;
        try {
          await importData(await f.text());
          toast('Backup restored');
          this.ctx.refreshShell?.();
          this.paint();
          this.ctx.applyTheme?.();
        } catch (err) {
          toast('That file is not a valid Echo backup.', { type: 'error' });
        }
      };
      input.click();
    }
    if (act === 'clear') {
      const ok = await confirmDialog({
        title: 'Delete everything?',
        message: 'All transcripts, stored audio and settings will be permanently removed from this browser.',
        confirmLabel: 'Delete everything',
        danger: true
      });
      if (ok) {
        clearAll();
        toast('Workspace cleared');
        this.ctx.refreshShell?.();
        this.ctx.navigate('#/scribe');
      }
    }
  };

  async loadStorage() {
    const note = this.container.querySelector('[data-ref="storage"]');
    if (!note) return;
    try {
      const est = await navigator.storage?.estimate?.();
      const parts = [];
      if (est?.usage) parts.push(`${(est.usage / 1048576).toFixed(1)} MB used`);
      const ls = new Blob([JSON.stringify(getState())]).size;
      parts.push(`${(ls / 1024).toFixed(0)} KB transcripts`);
      const count = getState().sessions.filter(s => s.hasAudio).length;
      parts.push(`${count} audio clip${count === 1 ? '' : 's'}`);
      note.textContent = parts.join(' · ');
    } catch {
      note.textContent = 'Unavailable in this browser.';
    }
  }
}
