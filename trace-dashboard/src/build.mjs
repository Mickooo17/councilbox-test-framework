import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { summary } from './data.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

export function serializeForHTML(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

export async function embedAttachments(report, { baseDir = process.cwd(), maxAttachmentBytes = 5 * 1024 * 1024, maxTotalAttachmentBytes = 30 * 1024 * 1024 } = {}) {
  let embedded = 0, unavailable = 0, embeddedBytes = 0;
  // Preserve screenshots before filling the budget with recordings or traces.
  const attachments = report.tests.flatMap(t => t.attempts.flatMap(a => a.attachments || []));
  const priority = a => /^image\//.test(a.contentType) ? 0 : /^text\//.test(a.contentType) ? 1 : /^video\//.test(a.contentType) ? 3 : 2;
  attachments.sort((a, b) => priority(a) - priority(b));
  for (const attachment of attachments) {
    if (attachment.data) {
      const size = Buffer.byteLength(attachment.data.split(',')[1] || '', 'base64');
      if (size <= maxAttachmentBytes && embeddedBytes + size <= maxTotalAttachmentBytes) {
        embedded++; embeddedBytes += size; attachment.size = size; continue;
      }
      delete attachment.data;
      attachment.unavailable = 'Exceeds the attachment size limit or report budget'; unavailable++; continue;
    }
    let body;
    try {
      if (attachment.body) {
        body = Buffer.from(attachment.body, 'base64');
      } else if (attachment.path) {
        const file = path.resolve(baseDir, attachment.path);
        const info = await stat(file);
        if (info.size > maxAttachmentBytes) { attachment.unavailable = 'Exceeds the attachment size limit'; unavailable++; continue; }
        if (embeddedBytes + info.size > maxTotalAttachmentBytes) { attachment.unavailable = 'Exceeds the report attachment budget'; unavailable++; continue; }
        body = await readFile(file);
      }
      if (body && body.length <= maxAttachmentBytes && embeddedBytes + body.length <= maxTotalAttachmentBytes) {
        attachment.data = `data:${attachment.contentType || 'application/octet-stream'};base64,${body.toString('base64')}`;
        attachment.size = body.length;
        embeddedBytes += body.length;
        embedded++;
      } else { attachment.unavailable = body ? 'Exceeds the attachment size limit or report budget' : 'Attachment was not included in the source report'; unavailable++; }
    } catch { attachment.unavailable = 'Original attachment file is no longer available'; unavailable++; }
    delete attachment.body;
  }
  report.attachments = { embedded, unavailable, embeddedBytes };
  return report;
}

export async function writeReport(report, outputFile, { historyFile, historyLimit = 30 } = {}) {
  const output = path.resolve(outputFile);
  await mkdir(path.dirname(output), { recursive: true });
  if (historyFile) {
    let history = [];
    try { const previous = JSON.parse(await readFile(historyFile, 'utf8')); if (Array.isArray(previous)) history = previous; } catch { /* First run. */ }
    const entry = { startTime: report.startTime, duration: report.duration, ...summary(report.tests), errors: report.errors?.length || 0 };
    report.history = [...history.filter(h => h.startTime !== entry.startTime), entry].slice(-historyLimit);
  }
  const [template, css, app, data, theme] = await Promise.all(['template.html', 'styles.css', 'app.js', 'data.mjs', 'theme.js'].map(file => readFile(path.join(here, file), 'utf8')));
  const html = template.replace('/* INLINE_STYLES */', () => css)
    .replace('/* INLINE_THEME */', () => theme)
    .replace('/* INLINE_APP */', () => `${data.replace(/^export /gm, '')}\n${app}`)
    .replace('/* INLINE_DATA */', () => serializeForHTML(report));
  await writeFile(output, html, 'utf8');
  if (historyFile) {
    await mkdir(path.dirname(path.resolve(historyFile)), { recursive: true });
    await writeFile(historyFile, JSON.stringify(report.history, null, 2), 'utf8');
  }
  return output;
}
