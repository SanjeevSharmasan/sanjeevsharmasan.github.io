/**
 * Live dictation via the browser's built-in SpeechRecognition.
 * Available in Chromium browsers (Chrome, Edge, Brave, Arc). No API key, no audio
 * ever leaves the machine except to the browser vendor's speech service.
 */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

export function liveSupported() { return !!SR; }

export function createLiveRecognition({ lang = 'en-US', onResult, onError, onStart, onEnd } = {}) {
  if (!SR) {
    onError?.(new Error('Live dictation is not supported in this browser. Use Record → Whisper instead.'));
    return null;
  }

  const rec = new SR();
  rec.lang = lang;
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  let wanted = false;
  let restartTimer = null;
  let fatal = false;

  rec.onstart = () => onStart?.();

  rec.onresult = event => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const res = event.results[i];
      const text = res[0]?.transcript || '';
      if (res.isFinal) {
        onResult?.({ text: text.trim(), final: true, confidence: res[0]?.confidence ?? null });
      } else {
        interim += text;
      }
    }
    if (interim.trim()) onResult?.({ text: interim.trim(), final: false, confidence: null });
  };

  rec.onerror = event => {
    const map = {
      'not-allowed': 'Microphone permission was blocked. Allow mic access in your browser settings.',
      'service-not-allowed': 'Speech service blocked. Try opening the app on http://localhost.',
      'audio-capture': 'No microphone was found.',
      'network': 'Speech service unreachable. Check your connection, or use Whisper instead.',
      'language-not-supported': 'This language is not supported by live dictation in this browser.',
      'no-speech': null
    };
    const msg = map[event.error];
    if (event.error === 'no-speech') return;
    if (event.error !== 'aborted') fatal = event.error !== 'network';
    if (msg) onError?.(new Error(msg));
    if (fatal) { wanted = false; rec.stop(); }
  };

  rec.onend = () => {
    onEnd?.();
    if (!wanted) return;
    // Chromium ends the session during long silences — restart transparently.
    clearTimeout(restartTimer);
    restartTimer = setTimeout(() => {
      if (!wanted) return;
      try { rec.start(); } catch { /* already starting */ }
    }, 240);
  };

  return {
    start() {
      wanted = true;
      fatal = false;
      try { rec.start(); } catch { /* already started */ }
    },
    stop() {
      wanted = false;
      clearTimeout(restartTimer);
      try { rec.stop(); } catch { /* ignore */ }
    },
    abort() {
      wanted = false;
      fatal = true;
      clearTimeout(restartTimer);
      try { rec.abort(); } catch { /* ignore */ }
    },
    setLang(next) { rec.lang = next; },
    get active() { return wanted; }
  };
}
