# Trace · Councilbox Playwright dashboard

A local, single-file HTML report, in addition to your existing Allure report. No packages, web server, internet connection, or hosted service required. Double-click `dashboard-report.html` to open it.

The first report was generated from the existing `Councilbox-test-framework/allure-report` snapshot. Its run date comes from that report. It is not a new test run.

## Install in your existing project

In PowerShell:

```powershell
node 'C:\Users\ammar\report\playwright-dashboard\install.mjs' 'C:\Users\ammar\Desktop\Councilbox-test-framework'
```

The installer copies the reporter to `trace-dashboard/`, adds it beside the existing Allure reporter, and adds `npm run report:dashboard`. It preserves the line/JUnit/Allure reporters and existing scripts. Modified configuration and package files get timestamped backups. Running the installer again does not add duplicate reporters. It uses Node directly and does not require PowerShell execution-policy changes.

After installation, your usual `npm test`, `npm run smoke`, and `npm run regression` commands generate both reports' results. The new `dashboard-report.html` is written at the end of each Playwright run. Commands that explicitly override `--reporter` override the configured reporters, including Allure and Trace.

To rebuild the new HTML from an already generated Allure report:

```powershell
npm run report:dashboard
```

This reads the current `allure-report` directory. It does not regenerate Allure or run tests.

## Manual setup

Copy this folder into your project as `trace-dashboard` and add the last entry to your existing `playwright.config.ts` reporter array:

```ts
reporter: [
  ['line'],
  ['junit', { outputFile: 'junit-results/results.xml' }],
  ['allure-playwright'],
  ['./trace-dashboard/reporter.mjs', {
    outputFile: 'dashboard-report.html',
    title: 'Councilbox',
  }],
],
```

No other test or browser configuration needs to change. Allure generation commands stay the same.

## Generate without installing

```powershell
# Existing Allure report (uses its exact run boundaries and current test results)
node scripts/generate.mjs 'C:/Users/ammar/Desktop/Councilbox-test-framework/allure-report' dashboard-report.html

# Playwright JSON report
node scripts/generate.mjs ./test-results.json dashboard-report.html
```

Playwright JSON files should be produced with its JSON reporter. Prefixes from dotenv logging are handled. Do not pass raw `allure-results`: those directories can accumulate multiple runs; use the generated `allure-report` directory instead.

## Features

- Run totals, duration, pass rate, and results by browser/project.
- Search test names, files, tags, suites, and errors. Filter by status and project; sort by name or duration.
- Failure patterns, complete error messages, nested steps, retry attempts, and console output.
- Inline screenshots and videos, downloadable traces and other artifacts.
- Actual execution timeline by worker and project.
- Up to 30 run summaries with the live reporter, persisted next to the HTML as `dashboard-report.html.history.json`.
- JSON import/export, keyboard search (`/` or Ctrl/Cmd+K), accessible details dialog, responsive layout, and print styles.

Screenshots, videos, and traces are embedded up to 5 MB per attachment and 30 MB total by default. Screenshots get priority. Missing or larger artifacts are explicitly labeled unavailable. The reporter accepts `maxAttachmentBytes` and `maxTotalAttachmentBytes` to change these limits. Pass `history: false` to disable history. Keep the history file between test runs; the HTML itself remains fully portable.

The pass rate includes expected outcomes (including expected failures) and tests that passed on retry. Skipped tests remain in the denominator and are shown separately. The failure count includes Allure `broken` results. Allure imports retain the current test attempt, steps, available artifacts, flaky flag, and retry count; full attempt history and run history start with the native reporter. JSON imports can show embedded attachment bodies, but a browser cannot read paths from imported JSON; use the Node generator to embed files from disk. Browser imports are temporary until exported as JSON or regenerated as HTML with the CLI.

Reports include the test data and artifacts supplied by your tests. No report data is sent to any service.

## Validation

```powershell
npm test
```

The tests use Node's built-in test runner; no dependency installation required.
