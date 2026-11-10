import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { fromPlaywright, normalizeSteps, parseJSON, stripAnsi, validateReport } from '../src/data.mjs';
import { embedAttachments, writeReport } from '../src/build.mjs';

export async function fromAllure(directory, { title = 'Councilbox' } = {}) {
  // Use a generated Allure report to preserve its run boundaries and retry grouping.
  const summary = JSON.parse(await readFile(path.join(directory, 'widgets/summary.json'), 'utf8'));
  const cases = path.join(directory, 'data/test-cases');
  const files = (await readdir(cases)).filter(f => f.endsWith('.json'));
  const results = await Promise.all(files.map(async file => JSON.parse(await readFile(path.join(cases, file), 'utf8'))));
  const tests = results.filter(r => !r.hidden && !r.retry).map(r => {
    const label = name => (r.labels || []).find(l => l.name === name)?.value;
    const attachmentList = [];
    function collect(stage) {
      if (!stage) return;
      attachmentList.push(...(stage.attachments || []));
      for (const s of stage.steps || []) collect(s);
    }
    const stages = [...(r.beforeStages || []), r.testStage, ...(r.afterStages || [])].filter(Boolean);
    stages.forEach(collect);
    const location = (r.fullName || '').match(/^(.*):(\d+):(\d+)$/);
    const status = r.status === 'passed' ? (r.flaky ? 'flaky' : 'passed') : r.status === 'skipped' || r.status === 'unknown' ? 'skipped' : 'failed';
    const errors = [r.statusMessage, r.statusTrace].filter(Boolean).map(stripAnsi);
    return {
      id: r.uid, title: r.name, suite: label('subSuite') || label('suite') || '',
      file: location?.[1] || label('suite') || r.fullName || '', line: Number(location?.[2] || 0),
      project: r.parameters?.find(p => p.name === 'Project')?.value || label('parentSuite') || 'default',
      tags: (r.labels || []).filter(l => l.name === 'tag').map(l => `@${l.value}`),
      annotations: [], status, expectedStatus: 'passed', duration: r.time?.duration || 0,
      retryCount: r.retriesCount || 0,
      attempts: [{
        retry: r.retriesCount || 0, status: r.status, duration: r.time?.duration || 0,
        startTime: new Date(r.time?.start || summary.time.start).toISOString(), worker: label('thread') || 0,
        errors, steps: normalizeSteps(stages), stdout: '', stderr: '',
        attachments: attachmentList.map(a => ({ name: a.name || 'Attachment', contentType: a.type || 'application/octet-stream', path: path.join(directory, 'data/attachments', a.source || '') })),
      }],
    };
  });
  return {
    schemaVersion: 1, title, source: 'Allure report', startTime: new Date(summary.time.start).toISOString(),
    duration: summary.time.duration || 0, workers: 0, tests, errors: [], history: [],
  };
}

export async function generate(input, output, options = {}) {
  const source = path.resolve(input);
  const info = await stat(source);
  const report = info.isDirectory() ? await fromAllure(source, options) : null;
  let data = report;
  if (!data) {
    const raw = parseJSON(await readFile(source, 'utf8'));
    data = raw.schemaVersion === 1 ? validateReport(raw) : fromPlaywright(raw, options);
  }
  await embedAttachments(data, { baseDir: options.baseDir || path.dirname(source) });
  return writeReport(data, output, { historyFile: options.historyFile });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [input, output = 'dashboard-report.html', title = 'Councilbox'] = process.argv.slice(2);
  if (!input) {
    console.log('Usage: node scripts/generate.mjs <allure-report-directory | playwright.json> [output.html] [title]');
    process.exitCode = 1;
  } else {
    try { console.log(`Trace dashboard: ${await generate(input, output, { title })}`); }
    catch (error) { console.error(`Could not generate dashboard: ${error.message}`); process.exitCode = 1; }
  }
}
