// Shared with the browser: keep this module free of Node dependencies.
export function stripAnsi(value = '') {
  return String(value).replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, '');
}

export function parseJSON(text) {
  // JSON redirected from a Playwright command can have dotenv output before it.
  const clean = stripAnsi(text).replace(/^\uFEFF/, '').trim();
  try { return JSON.parse(clean); } catch { /* Try a prefixed Playwright report. */ }
  const start = clean.search(/\{\s*"(?:config|stats|suites|schemaVersion)"\s*:/);
  if (start >= 0) return JSON.parse(clean.slice(start));
  throw new Error('This is not a valid Playwright JSON report or exported Trace report.');
}

export function summary(tests) {
  const counts = { total: tests.length, passed: 0, failed: 0, flaky: 0, skipped: 0 };
  for (const test of tests) counts[test.status]++;
  counts.passRate = counts.total ? Math.round((counts.passed + counts.flaky) / counts.total * 1000) / 10 : 0;
  return counts;
}

export function statusFor(results = [], expectedStatus = 'passed', outcome) {
  if (!results.length || results.every(r => r.status === 'skipped')) return 'skipped';
  if (outcome === 'flaky') return 'flaky';
  if (outcome === 'unexpected') return 'failed';
  const last = results.at(-1);
  if (last.status === 'skipped') return 'skipped';
  if (last.status !== expectedStatus) return 'failed';
  return results.slice(0, -1).some(r => r.status !== expectedStatus && r.status !== 'skipped') ? 'flaky' : 'passed';
}

export function normalizeSteps(steps = []) {
  return steps.map(s => ({
    title: s.title || s.name || 'Step',
    duration: Math.max(0, Number(s.duration ?? s.time?.duration ?? ((s.stop || s.start || 0) - (s.start || 0)))),
    status: s.error || s.status === 'broken' || s.status === 'failed' ? 'failed' : s.status === 'skipped' ? 'skipped' : 'passed',
    error: stripAnsi(s.error?.message || s.statusMessage || s.statusDetails?.message || ''),
    steps: normalizeSteps(s.steps || []),
  }));
}

export function fromPlaywright(raw, { title = 'Councilbox', source = 'Playwright JSON' } = {}) {
  if (raw?.schemaVersion === 1 && Array.isArray(raw.tests)) return validateReport(raw);
  if (!raw || !Array.isArray(raw.suites)) throw new Error('Expected a Playwright JSON report with a suites array.');
  const tests = [];
  function walk(suites, ancestors = []) {
    for (const suite of suites) {
      const trail = [...ancestors, suite.title].filter(Boolean);
      for (const spec of suite.specs || []) {
        for (const test of spec.tests || []) {
          const results = test.results || [];
          tests.push({
            id: `${spec.id || `${spec.file}:${spec.line}:${spec.title}`}:${test.projectName || 'default'}:${tests.length}`,
            title: spec.title || 'Untitled test',
            suite: trail.join(' › '),
            file: spec.file || suite.file || '', line: spec.line || 0,
            project: test.projectName || test.projectId || 'default',
            tags: spec.tags || [], annotations: test.annotations || [],
            expectedStatus: test.expectedStatus || 'passed',
            status: statusFor(results, test.expectedStatus || 'passed', test.status),
            duration: results.reduce((n, r) => n + (r.duration || 0), 0),
            attempts: results.map((r, i) => ({
              retry: r.retry ?? i, status: r.status || 'skipped', duration: r.duration || 0,
              startTime: r.startTime || '', worker: r.workerIndex ?? 0,
              errors: (r.errors?.length ? r.errors : r.error ? [r.error] : []).map(e => stripAnsi(e.stack || e.message || e.value || 'Unknown error')),
              steps: normalizeSteps(r.steps),
              attachments: (r.attachments || []).map(a => ({ name: a.name || 'Attachment', contentType: a.contentType || 'application/octet-stream', path: a.path, body: a.body })),
              stdout: (r.stdout || []).map(s => stripAnsi(s.text || '')).join(''),
              stderr: (r.stderr || []).map(s => stripAnsi(s.text || '')).join(''),
            })),
          });
        }
      }
      walk(suite.suites || [], trail);
    }
  }
  walk(raw.suites);
  return {
    schemaVersion: 1, title, source, startTime: raw.stats?.startTime || new Date().toISOString(),
    duration: raw.stats?.duration || 0, workers: raw.config?.metadata?.actualWorkers || raw.config?.workers || 0,
    tests, errors: (raw.errors || []).map(e => stripAnsi(e.stack || e.message || String(e))), history: [],
  };
}

export function validateReport(raw) {
  if (raw?.schemaVersion !== 1 || !Array.isArray(raw.tests)) throw new Error('Unsupported Trace report format.');
  const allowed = new Set(['passed', 'failed', 'flaky', 'skipped']);
  for (const t of raw.tests) {
    if (typeof t.title !== 'string' || !allowed.has(t.status) || !Array.isArray(t.attempts)) throw new Error('The report contains an invalid test result.');
  }
  return raw;
}
