# Echo — speech to text, in every language

A local-first transcription studio that runs entirely in the browser: live dictation, file
transcription, translation, voice typing and projects. No build step, no account, no server-side
code — just a tiny PowerShell static file server and a modern browser.

![Echo](https://img.shields.io/badge/engines-Web%20Speech%20%C2%B7%20Whisper%20%C2%B7%20Soniox-6c5ce7)

---

## Run it

**Windows (easiest)**

Double-click `start.cmd`, or run:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

This serves the folder at **http://localhost:5173** and opens your browser. Options:

```powershell
.\serve.ps1 -Port 8080      # different port
.\serve.ps1 -NoBrowser      # don't open a tab
```

Stop the server with `Ctrl+C`.

> A local server is required because the app uses ES modules and `fetch`, which browsers block on
> `file://`. Any static server works if you prefer one (nginx, `python -m http.server`, etc.).

**Browser support:** best in Chrome/Edge (Web Speech, WebGPU/WASM, IndexedDB). Firefox/Safari work
for file transcription and the UI, but live dictation support varies and Web Speech may be absent.

---

## The five views

| View | What it does |
| --- | --- |
| **Smart Scribe** | Record from the mic or drop an audio/video file. Get timestamped, speaker-labelled lines. Edit, translate, export, move to a project. |
| **Translator** | Translate typed or pasted text between 72 languages. Optional per-line translation inside a transcript. |
| **Voice Typing** | A focused dictation pad with spoken punctuation, word/character counters and a one-click save into Smart Scribe. |
| **Projects** | Group recordings by client, meeting or topic. Unfiled recordings live in the inbox. Rename, recolour, export all, delete. |
| **Settings** | Theme, language, engine, model caching, Soniox key, translation provider, usage, backup/import, clear data. |

---

## Engines

Echo ships with three interchangeable engines. Switch the default in **Settings → Transcription
engine**, or per transcript from **More → Language & engine**.

### 1. Live · browser (default)

- Uses the browser's **Web Speech API** for instant, word-by-word dictation.
- Free, no key, no download. 75 of the 101 listed languages are supported by live dictation.
- Requires an internet connection in Chrome/Edge (the browser vendor's speech service is used) and
  microphone permission.
- Best for quick notes, meetings and low-friction dictation.

### 2. Whisper · on-device

- Runs **OpenAI Whisper** locally through [`@huggingface/transformers`](https://github.com/huggingface/transformers.js)
  (ONNX Runtime, WebGPU when available, WASM otherwise).
- Models are downloaded once from jsDelivr and cached in the browser; after that transcription works
  **offline** and the audio never leaves the machine.
- Sizes: **Tiny ~45 MB** (fastest), **Base ~85 MB** (balanced, default), **Small ~260 MB** (most accurate).
- Covers Whisper's own language set (set the spoken language in the toolbar; Whisper needs to know it
  for best results). If a language code isn't recognised by the model, Echo retries with automatic
  language detection.
- Long files are split into chunks and stitched back into timestamped segments. Speaker labels are
  single-speaker (`DEFAULT`) — use the speaker button on each line to relabel, or use Soniox for
  automatic diarisation.

### 3. Soniox · cloud (optional, bring your own key)

- Adds cloud-grade accuracy and **automatic speaker diarisation**.
- Get a key at [soniox.com](https://soniox.com), then paste it in **Settings → Soniox**. It is stored
  only in this browser's `localStorage` and sent directly to `https://api.soniox.com/v1`.
- The browser uploads the file to Soniox (`/files`), creates an async transcription (`/transcriptions`)
  and polls until the result is ready.
- If your network blocks the API (CORS/proxy), use Whisper instead — no audio leaves the device.
- Model choices: `stt-async-preview` (default) and `stt-async-v4`.

### Accuracy tips

- Pick the right spoken language — especially for Whisper and Soniox.
- Tiny is fast but light on punctuation; Base or Small are noticeably better for accents and noisy audio.
- A close mic beats any model. Echo shows a live level meter while recording.

---

## Languages

- **101 languages** in the picker, including 7 right-to-left scripts (Arabic, Hebrew, Persian, Urdu,
  Pashto, Sindhi, Uyghur) with proper RTL text rendering.
- **75** are available for instant live dictation through the browser engine.
- **72** are available as translation targets.
- Translation providers:
  - **MyMemory** — free, no key, ~5,000 characters/day anonymously. Good for short passages.
  - **LibreTranslate** — point Echo at any compatible endpoint (including a self-hosted instance) in
    Settings. No key required by default.
  - **Off** — disable translation entirely.

---

## Recording, transcripts and audio

- Record with the mic: waveform, timer, pause/resume, live interim text.
- Drop `.mp3`, `.wav`, `.m4a`, `.ogg`, `.webm`, `.mp4` and friends onto Smart Scribe.
- Each segment has a timestamp, a speaker chip and editable text; click a line to seek the audio.
- **Improve with Whisper**: take a live transcript and re-run it through Whisper for better accuracy.
- **Translate all** or translate individual lines; translations can be shown under each line.
- **Move to project**, rename, delete, download the original audio.
- Everything is editable — nothing is locked to an engine.

### Export formats

Text, Markdown, **SRT**, **VTT**, JSON (segments + timestamps + metadata), CSV and a standalone HTML
page. Exports include speaker labels and timestamps where the format supports them.

### Storage and privacy

| Data | Where it lives |
| --- | --- |
| Settings, transcripts, projects, usage | `localStorage` (`echo.state.v1`) |
| Audio recordings and uploads | IndexedDB (`echo-audio`) |
| Soniox API key | `localStorage`, only in this browser |

- Whisper runs on-device after the one-time model download.
- Live dictation uses the browser's speech service (browser vendor).
- Translation sends only the text you translate to MyMemory or your LibreTranslate endpoint.
- Soniox sends audio + text to Soniox, only if you configure a key.
- There is no Echo backend, account or analytics. **Settings → Your data** has JSON export/import and
  a full delete.

---

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Space` | Start / stop recording (Smart Scribe, when not typing) |
| `Ctrl/⌘ + K` | Focus transcript search |
| `Ctrl/⌘ + Space` | Toggle dictation (Voice Typing) |
| `Ctrl/⌘ + Enter` | Translate (Translator) |
| `Esc` | Close a dialog or menu |

The global shortcut only works while the Echo tab is focused. A true system-wide hotkey would need a
desktop wrapper (Electron/Tauri) — this is a browser app by design.

---

## Credits

The sidebar shows a local usage meter (free plan: 300 minutes/month, reset monthly, manual reset in
Settings). It is **informational only** — there is no sign-up, billing or server-side metering. Soniox
usage, if you use it, is billed by Soniox to your own key.

---

## Project layout

```
transcribe-app/
├─ index.html            app shell + sidebar
├─ start.cmd             double-click launcher
├─ serve.ps1             PowerShell static server (HttpListener)
├─ styles/
│  ├─ theme.css          design tokens, light/dark themes
│  └─ app.css            layout and components
└─ src/
   ├─ app.js             boot, hash router, theme
   ├─ store.js           state schema, persistence, IndexedDB audio
   ├─ languages.js       101 languages, RTL helpers
   ├─ export.js          txt/md/srt/vtt/json/csv/html serialisers
   ├─ ui.js              icons, toasts, modals, menus, downloads
   ├─ recorder.js        mic capture + level meter
   ├─ engines/
   │  ├─ webSpeech.js    live browser dictation
   │  ├─ whisper.js      transformers.js on-device pipeline
   │  ├─ soniox.js       async REST client
   │  └─ translate.js    MyMemory / LibreTranslate
   └─ views/
      ├─ scribe.js       Smart Scribe
      ├─ translator.js   Translator
      ├─ typing.js       Voice Typing
      ├─ projects.js     Projects
      └─ settings.js     Settings
```

No dependency installation, bundler or transpiler is involved. Edit a file, refresh the browser
(add `?v=2` if the browser cached an old module).

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Blank page | Open DevTools → Console. Make sure you loaded `http://localhost:5173`, not `file://`. |
| Old code after editing | Hard refresh or add a cache-busting query, e.g. `http://localhost:5173/?v=2`. |
| Mic doesn't work | Allow microphone access for `localhost`; check Windows privacy settings. |
| "Permission denied" toast | Same as above — the browser denied `getUserMedia`. |
| Model download fails | The first Whisper run needs internet. Retry from Settings → **Download**; then it is cached. |
| Translation fails | MyMemory's anonymous quota is ~5,000 chars/day; try shorter text or LibreTranslate. |
| Soniox request fails | Check the key, model and that `api.soniox.com` is reachable; CORS-blocked networks should use Whisper. |
| Port 5173 busy | `.\serve.ps1 -Port 8080` |
| Can't create files with PowerShell in OneDrive | OneDrive Files On-Demand can block new files; this project's files are already present, no writes needed at runtime. |

---

## Known limitations

- **Speaker diarisation** is only automatic with Soniox. Live and Whisper produce a single `DEFAULT`
  speaker; you can relabel lines manually.
- **Live dictation** quality and language coverage are controlled by the browser, and Chrome's speech
  service is online-only.
- **Whisper** processes long audio in chunks; timestamps are chunk-aligned (~10 s windows), so very
  long recordings may show slightly coarse boundaries.
- **Global hotkeys** require the tab to be focused.
- The app is a local tool: opening it in another browser/profile gives you a separate state and cache.
