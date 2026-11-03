/**
 * Language catalogue.
 * `ws` = BCP-47 tag understood by the browser's SpeechRecognition (Chrome/Edge).
 * No `ws` means live dictation isn't available for that language — use Whisper instead.
 */
export const LANGUAGES = [
  { code: 'auto', name: 'Auto-detect', native: 'Detect language', ws: null },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans', ws: 'af-ZA' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ', ws: 'am-ET' },
  { code: 'ar', name: 'Arabic', native: 'العربية', ws: 'ar-SA', rtl: true },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', ws: 'az-AZ' },
  { code: 'ba', name: 'Bashkir', native: 'Башҡорт' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская' },
  { code: 'bg', name: 'Bulgarian', native: 'Български', ws: 'bg-BG' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', ws: 'bn-IN' },
  { code: 'bo', name: 'Tibetan', native: 'བོད་སྐད' },
  { code: 'br', name: 'Breton', native: 'Brezhoneg' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski', ws: 'bs-BA' },
  { code: 'ca', name: 'Catalan', native: 'Català', ws: 'ca-ES' },
  { code: 'cs', name: 'Czech', native: 'Čeština', ws: 'cs-CZ' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg', ws: 'cy-GB' },
  { code: 'da', name: 'Danish', native: 'Dansk', ws: 'da-DK' },
  { code: 'de', name: 'German', native: 'Deutsch', ws: 'de-DE' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', ws: 'el-GR' },
  { code: 'en', name: 'English', native: 'English', ws: 'en-US', whisper: 'en', soniox: 'en' },
  { code: 'en-IN', name: 'English (India)', native: 'English (India)', ws: 'en-IN', whisper: 'en', soniox: 'en' },
  { code: 'es', name: 'Spanish', native: 'Español', ws: 'es-ES' },
  { code: 'et', name: 'Estonian', native: 'Eesti', ws: 'et-EE' },
  { code: 'eu', name: 'Basque', native: 'Euskara', ws: 'eu-ES' },
  { code: 'fa', name: 'Persian', native: 'فارسی', ws: 'fa-IR', rtl: true },
  { code: 'fi', name: 'Finnish', native: 'Suomi', ws: 'fi-FI' },
  { code: 'fo', name: 'Faroese', native: 'Føroyskt' },
  { code: 'fr', name: 'French', native: 'Français', ws: 'fr-FR' },
  { code: 'gl', name: 'Galician', native: 'Galego', ws: 'gl-ES' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', ws: 'gu-IN' },
  { code: 'ha', name: 'Hausa', native: 'Hausa' },
  { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi' },
  { code: 'he', name: 'Hebrew', native: 'עברית', ws: 'he-IL', rtl: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', ws: 'hi-IN' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski', ws: 'hr-HR' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl ayisyen' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', ws: 'hu-HU' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն', ws: 'hy-AM' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', ws: 'id-ID' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska', ws: 'is-IS' },
  { code: 'it', name: 'Italian', native: 'Italiano', ws: 'it-IT' },
  { code: 'ja', name: 'Japanese', native: '日本語', ws: 'ja-JP' },
  { code: 'jv', name: 'Javanese', native: 'Jawa', ws: 'jv-ID' },
  { code: 'ka', name: 'Georgian', native: 'ქართული', ws: 'ka-GE' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақша', ws: 'kk-KZ' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ', ws: 'km-KH' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', ws: 'kn-IN' },
  { code: 'ko', name: 'Korean', native: '한국어', ws: 'ko-KR' },
  { code: 'la', name: 'Latin', native: 'Latina' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'ln', name: 'Lingala', native: 'Lingála' },
  { code: 'lo', name: 'Lao', native: 'ລາວ', ws: 'lo-LA' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', ws: 'lt-LT' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu', ws: 'lv-LV' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски', ws: 'mk-MK' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', ws: 'ml-IN' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол', ws: 'mn-MN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', ws: 'mr-IN' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', ws: 'ms-MY' },
  { code: 'mt', name: 'Maltese', native: 'Malti', ws: 'mt-MT' },
  { code: 'my', name: 'Burmese', native: 'မြန်မာ', ws: 'my-MM' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', ws: 'ne-NP' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', ws: 'nl-NL' },
  { code: 'nn', name: 'Norwegian Nynorsk', native: 'Nynorsk' },
  { code: 'no', name: 'Norwegian', native: 'Norsk', ws: 'no-NO' },
  { code: 'oc', name: 'Occitan', native: 'Occitan' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', ws: 'pa-IN' },
  { code: 'pl', name: 'Polish', native: 'Polski', ws: 'pl-PL' },
  { code: 'ps', name: 'Pashto', native: 'پښتو', rtl: true },
  { code: 'pt', name: 'Portuguese', native: 'Português', ws: 'pt-BR' },
  { code: 'ro', name: 'Romanian', native: 'Română', ws: 'ro-RO' },
  { code: 'ru', name: 'Russian', native: 'Русский', ws: 'ru-RU' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', rtl: true },
  { code: 'si', name: 'Sinhala', native: 'සිංහල', ws: 'si-LK' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina', ws: 'sk-SK' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina', ws: 'sl-SI' },
  { code: 'sn', name: 'Shona', native: 'chiShona' },
  { code: 'so', name: 'Somali', native: 'Soomaali' },
  { code: 'sq', name: 'Albanian', native: 'Shqip', ws: 'sq-AL' },
  { code: 'sr', name: 'Serbian', native: 'Српски', ws: 'sr-RS' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda', ws: 'su-ID' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', ws: 'sv-SE' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', ws: 'sw-KE' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', ws: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', ws: 'te-IN' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'th', name: 'Thai', native: 'ไทย', ws: 'th-TH' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmen' },
  { code: 'tl', name: 'Tagalog', native: 'Tagalog', ws: 'fil-PH' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', ws: 'tr-TR' },
  { code: 'tt', name: 'Tatar', native: 'Татарча' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', ws: 'uk-UA' },
  { code: 'ur', name: 'Urdu', native: 'اردو', ws: 'ur-PK', rtl: true },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbek', ws: 'uz-UZ' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', ws: 'vi-VN' },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש', rtl: true },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'yue', name: 'Cantonese', native: '廣東話', ws: 'yue-Hant-HK' },
  { code: 'zh', name: 'Chinese', native: '中文', ws: 'zh-CN' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu', ws: 'zu-ZA' }
];

const byCode = new Map(LANGUAGES.map(l => [l.code, l]));
const byName = new Map(LANGUAGES.map(l => [l.name.toLowerCase(), l]));

export function lang(code) {
  return byCode.get(code) || byCode.get('en');
}
export function langName(code) {
  const l = byCode.get(code);
  return l ? l.name : 'Unknown';
}
export function langNative(code) {
  const l = byCode.get(code);
  return l ? l.native : '';
}
export function isRTL(code) {
  return !!lang(code).rtl;
}
export function wsTag(code) {
  return lang(code).ws || null;
}
export function whisperCode(code) {
  if (code === 'auto') return 'auto';
  const l = byCode.get(code);
  return (l && l.whisper) ? l.whisper : code;
}
export function sonioxCode(code) {
  if (code === 'auto') return 'auto';
  const l = byCode.get(code);
  return (l && l.soniox) ? l.soniox : code;
}
export function canLiveType(code) {
  return !!lang(code).ws;
}
export function findLanguage(query) {
  const q = query.trim().toLowerCase();
  if (!q) return LANGUAGES;
  return LANGUAGES.filter(l =>
    l.code.includes(q) ||
    l.name.toLowerCase().includes(q) ||
    l.native.toLowerCase().includes(q) ||
    (byName.get(q) && byName.get(q).code === l.code)
  );
}

/** Languages offered for machine translation (2-letter codes accepted by LibreTranslate/MyMemory). */
export const TRANSLATION_TARGETS = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'bn',
  'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur', 'tr', 'pl', 'nl', 'sv', 'da',
  'fi', 'no', 'cs', 'sk', 'hu', 'ro', 'bg', 'uk', 'el', 'he', 'fa', 'th', 'vi',
  'id', 'ms', 'tl', 'sw', 'af', 'sr', 'hr', 'sl', 'et', 'lv', 'lt', 'eu', 'ca',
  'gl', 'is', 'sq', 'mk', 'ka', 'hy', 'az', 'kk', 'uz', 'ne', 'si', 'km', 'lo',
  'my', 'am', 'yo', 'zu', 'cy', 'mt', 'la'
];
