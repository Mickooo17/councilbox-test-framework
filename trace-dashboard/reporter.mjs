import path from 'node:path';
import { stripAnsi, normalizeSteps, statusFor } from './src/data.mjs';
import { embedAttachments, writeReport } from './src/build.mjs';

// Add this reporter to the existing reporter array; Allure remains independent.
export default class TraceReporter {
  constructor(options = {}) { this.options = options; this.errors = []; }
  printsToStdio() { return true; }
  onBegin(config, suite) { this.config = config; this.suite = suite; }
  onError(error) { this.errors.push(stripAnsi(error.stack || error.message || error.value || 'Run error')); }
  async onEnd(result) {
    const root = this.config?.rootDir || process.cwd();
    const tests = (this.suite?.allTests() || []).map(test => {
      const project = test.parent.project()?.name || 'default';
      return {
        id: test.id, title: test.title, suite: test.titlePath().slice(2, -1).join(' › '),
        file: path.relative(root, test.location.file).replaceAll('\\', '/'), line: test.location.line,
        project, tags: test.tags || [], annotations: test.annotations || [], expectedStatus: test.expectedStatus,
        status: statusFor(test.results, test.expectedStatus, test.outcome()),
        duration: test.results.reduce((n, r) => n + r.duration, 0),
        attempts: test.results.map(r => ({
          retry: r.retry, status: r.status, duration: r.duration, startTime: r.startTime.toISOString(), worker: r.workerIndex,
          errors: r.errors.map(e => stripAnsi(e.stack || e.message || e.value || 'Unknown error')),
          steps: normalizeSteps(r.steps),
          attachments: r.attachments.map(a => ({ name: a.name, contentType: a.contentType, path: a.path, body: a.body?.toString('base64') })),
          stdout: r.stdout.map(s => stripAnsi(Buffer.isBuffer(s) ? s.toString() : s)).join(''),
          stderr: r.stderr.map(s => stripAnsi(Buffer.isBuffer(s) ? s.toString() : s)).join(''),
        })),
      };
    });
    const report = {
      schemaVersion: 1, title: this.options.title || 'Councilbox', source: 'Playwright',
      startTime: result.startTime.toISOString(), duration: result.duration, workers: this.config?.workers || 0,
      runStatus: result.status, tests, errors: this.errors, history: [],
    };
    await embedAttachments(report, { baseDir: root, maxAttachmentBytes: this.options.maxAttachmentBytes, maxTotalAttachmentBytes: this.options.maxTotalAttachmentBytes });
    const output = path.resolve(process.cwd(), this.options.outputFile || 'dashboard-report.html');
    await writeReport(report, output, { historyFile: this.options.history === false ? undefined : `${output}.history.json` });
    console.log(`\n  Trace dashboard: ${output}\n`);
  }
}
