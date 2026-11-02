/**
 * Translation using free, no-key endpoints (MyMemory). Can swap to LibreTranslate or off.
 */
const MYMEMORY = 'https://api.mymemory.translated.net/get';

export async function translateText(text, { from = 'auto', to = 'es', provider = 'mymemory', libretranslateUrl = '' } = {}) {
  if (!text || !text.trim()) return '';
  if (from === to) return text;

  if (provider === 'off') throw new Error('Translation disabled in Settings.');

  if (provider === 'libretranslate') {
    if (!libretranslateUrl) throw new Error('Set a LibreTranslate URL in Settings to use it.');
    const url = libretranslateUrl.replace(/\/$/, '') + '/translate';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source: from === 'auto' ? 'auto' : from, target: to, format: 'text' })
    });
    if (!res.ok) throw new Error(`LibreTranslate error: ${res.status}`);
    const json = await res.json();
    return json.translatedText || '';
  }

  // MyMemory: free tier, rate-limited but works in browser without auth.
  // Note: an invalid `de` parameter makes the API reject the request, so leave it out.
  const q = encodeURIComponent(text);
  const pair = from === 'auto' ? `autodetect|${to}` : `${from}|${to}`;
  const url = `${MYMEMORY}?q=${q}&langpair=${encodeURIComponent(pair)}&mt=1&onlyprivate=0`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Translation request failed: ${res.status}`);
  const json = await res.json();
  const status = Number(json.responseStatus);
  if (status && status !== 200) {
    const detail = String(json.responseDetails || '');
    if (/QUERY LENGTH LIMIT/i.test(detail)) throw new Error('That text is too long for the free translator. Try shorter sections.');
    if (/MYMEMORY WARNING|QUOTA/i.test(detail)) throw new Error('Free translation quota reached. Try again later or use LibreTranslate.');
    if (/INVALID SOURCE LANGUAGE/i.test(detail)) throw new Error('That language pair is not supported by the free translator.');
    throw new Error(detail || `Translation failed (${status})`);
  }
  const out = json.responseData?.translatedText || '';
  if (/^MYMEMORY WARNING/i.test(out)) throw new Error(out);
  return out;
}

export async function translateBatch(items, opts) {
  const results = await Promise.allSettled(items.map(t => translateText(t, opts)));
  return results.map((r, i) => r.status === 'fulfilled' ? r.value : `[error: ${results[i].reason?.message}]`);
}

export function languageCodeForTranslation(code) {
  // Map common variants to 2-letter where useful
  const map = { 'zh-CN': 'zh', 'zh-TW': 'zh', 'pt-BR': 'pt', 'pt-PT': 'pt', 'fil-PH': 'tl' };
  return map[code] || code.split('-')[0];
}
