/* ── Transcript serialisation / export ─────────────────────────────────── */
import { srtTime, clock, esc } from './ui.js';
import { langName } from './languages.js';

function normalise(session) {
  const segs = (session.segments || []).map((s, i, arr) => {
    const start = Number.isFinite(s.start) ? s.start : 0;
    let end = Number.isFinite(s.end) ? s.end : null;
    if (end == null || end <= start) {
      const next = arr[i + 1];
      end = next && Number.isFinite(next.start) && next.start > start ? next.start : start + 2;
    }
    return { ...s, start, end };
  });
  return segs;
}

function speakerName(session, id) {
  return session.speakers?.find(s => s.id === id)?.name || 'Speaker';
}

export function toPlainText(session, { timestamps = false, speakers = false, translations = false } = {}) {
  const segs = normalise(session);
  return segs.map(s => {
    const parts = [];
    if (timestamps) parts.push(`[${clock(s.start)}]`);
    if (speakers) parts.push(`${speakerName(session, s.speaker)}:`);
    parts.push(s.text);
    let line = parts.join(' ');
    if (translations && s.translation) line += `\n    → ${s.translation}`;
    return line;
  }).join('\n');
}

export function toSRT(session) {
  return normalise(session).map((s, i) => {
    const text = `${speakerName(session, s.speaker)}: ${s.text}${s.translation ? `\n${s.translation}` : ''}`;
    return `${i + 1}\n${srtTime(s.start)} --> ${srtTime(s.end)}\n${text}\n`;
  }).join('\n');
}

export function toVTT(session) {
  const body = normalise(session).map(s => {
    const text = `${speakerName(session, s.speaker)}: ${s.text}${s.translation ? `\n${s.translation}` : ''}`;
    return `${srtTime(s.start).replace(',', '.')} --> ${srtTime(s.end).replace(',', '.')}\n${text}\n`;
  }).join('\n');
  return `WEBVTT\n\n${body}`;
}

export function toMarkdown(session) {
  const head = [
    `# ${session.title}`,
    '',
    `- **Date:** ${new Date(session.createdAt).toLocaleString()}`,
    `- **Language:** ${langName(session.language)}${session.translatedTo ? ` → ${langName(session.translatedTo)}` : ''}`,
    `- **Duration:** ${clock((session.durationMs || 0) / 1000)}`,
    `- **Source:** ${session.source === 'file' ? session.sourceName || 'file' : 'microphone'}`
  ].join('\n');

  const body = normalise(session).map(s => {
    const t = `**${speakerName(session, s.speaker)}** · \`${clock(s.start)}\``;
    return `${t}\n\n${s.text}${s.translation ? `\n\n> ${s.translation}` : ''}`;
  }).join('\n\n');

  return `${head}\n\n---\n\n${body}\n`;
}

export function toJSON(session) {
  return JSON.stringify({
    id: session.id,
    title: session.title,
    createdAt: new Date(session.createdAt).toISOString(),
    language: session.language,
    translatedTo: session.translatedTo || null,
    durationSeconds: Math.round((session.durationMs || 0) / 1000),
    source: session.source,
    speakers: session.speakers,
    segments: normalise(session).map(s => ({
      start: +s.start.toFixed(3),
      end: +s.end.toFixed(3),
      speaker: speakerName(session, s.speaker),
      text: s.text,
      translation: s.translation || undefined
    })),
    text: normalise(session).map(s => s.text).join(' ')
  }, null, 2);
}

export function toCSV(session) {
  const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [['start', 'end', 'speaker', 'text', 'translation'].map(q).join(',')];
  normalise(session).forEach(s => {
    rows.push([s.start.toFixed(2), s.end.toFixed(2), speakerName(session, s.speaker), s.text, s.translation || ''].map(q).join(','));
  });
  return '\uFEFF' + rows.join('\n');
}

export function toHTML(session) {
  const segs = normalise(session).map(s => `
    <div class="seg">
      <div class="time">${clock(s.start)}</div>
      <div class="who">${esc(speakerName(session, s.speaker))}</div>
      <div class="what">${esc(s.text)}${s.translation ? `<div class="tr">${esc(s.translation)}</div>` : ''}</div>
    </div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(session.title)}</title>
  <style>
    body{font:15px/1.6 -apple-system,Segoe UI,sans-serif;max-width:760px;margin:60px auto;padding:0 20px;color:#16160f}
    h1{font-size:24px;letter-spacing:-.02em;margin-bottom:4px}
    .meta{color:#8b8b82;font-size:12px;margin-bottom:32px}
    .seg{display:grid;grid-template-columns:52px 90px 1fr;gap:12px;padding:7px 0;border-top:1px solid #eee}
    .time{font:11px ui-monospace,monospace;color:#b3b3a9;padding-top:3px}
    .who{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#8b8b82;padding-top:3px}
    .tr{color:#56564f;font-size:13px;border-left:2px solid #cdd3fd;padding-left:8px;margin-top:4px}
    @media print{.seg{break-inside:avoid}}
  </style></head><body>
  <h1>${esc(session.title)}</h1>
  <div class="meta">${new Date(session.createdAt).toLocaleString()} · ${langName(session.language)} · ${clock((session.durationMs || 0) / 1000)}</div>
  ${segs}</body></html>`;
}

export function exportSession(session, format) {
  const base = session.title || 'transcript';
  switch (format) {
    case 'txt': return { name: `${base}.txt`, content: toPlainText(session, { timestamps: true, speakers: true }), mime: 'text/plain' };
    case 'md': return { name: `${base}.md`, content: toMarkdown(session), mime: 'text/markdown' };
    case 'srt': return { name: `${base}.srt`, content: toSRT(session), mime: 'application/x-subrip' };
    case 'vtt': return { name: `${base}.vtt`, content: toVTT(session), mime: 'text/vtt' };
    case 'json': return { name: `${base}.json`, content: toJSON(session), mime: 'application/json' };
    case 'csv': return { name: `${base}.csv`, content: toCSV(session), mime: 'text/csv' };
    case 'html': return { name: `${base}.html`, content: toHTML(session), mime: 'text/html' };
    default: return { name: `${base}.txt`, content: toPlainText(session), mime: 'text/plain' };
  }
}
