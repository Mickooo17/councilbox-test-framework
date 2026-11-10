(() => {
  'use strict';
  let report = validateReport(JSON.parse(document.getElementById('report-data').textContent));
  const state = { view: 'overview', status: 'all', query: '', project: 'all', page: 1, pageSize: 15, sort: 'default', test: null, detailTab: 'overview', attempt: 0 };
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, extra = '') => `<svg class="icon ${extra}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const label = status => ({ passed: 'Passed', failed: 'Failed', flaky: 'Flaky', skipped: 'Skipped' }[status] || status);
  const badge = status => `<span class="badge ${esc(status)}"><span class="dot"></span>${esc(label(status))}</span>`;
  const duration = ms => {
    ms = Math.max(0, Number(ms) || 0);
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.round(ms % 60000 / 1000)}s`;
  };
  const date = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? 'Unknown date' : d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }); };
  const allAttachments = () => report.tests.flatMap((test, testIndex) => test.attempts.flatMap((attempt, attemptIndex) => (attempt.attachments || []).map(a => ({ ...a, test, testIndex, attemptIndex }))));
  const projects = () => [...new Set(report.tests.map(t => t.project || 'default'))];
  const counts = () => summary(report.tests);
  const retries = test => test.retryCount || Math.max(0, test.attempts.length - 1);
  const failureText = test => test.attempts.flatMap(a => a.errors || []).join('\n');
  function safeData(attachment) {
    const data = attachment.data;
    return typeof data === 'string' && /^data:[a-z0-9.+/-]+;base64,[a-z0-9+/=\s]*$/i.test(data) ? data : '';
  }
  const isImage = a => /^image\/(png|jpeg|gif|webp|avif|bmp)$/i.test(a.contentType || '') && safeData(a);
  const downloadLink = (a, text = 'Download') => safeData(a) ? `<a class="button" href="${esc(safeData(a))}" download="${esc(a.name || 'attachment')}">${icon('down')}${text}</a>` : `<small>${esc(a.unavailable || 'Attachment unavailable in this file')}</small>`;
  const views = [
    { id: 'overview', title: 'Run overview', nav: 'Overview', icon: 'grid', description: 'A clear view of your tests. A faster path to the fix.' },
    { id: 'tests', title: 'Test results', nav: 'Test results', icon: 'tests', description: 'Every test, every browser. Find exactly what you need.' },
    { id: 'failures', title: 'Failure analysis', nav: 'Failures', icon: 'fail', description: 'Go from a failing test to the detail that explains it.' },
    { id: 'timeline', title: 'Run timeline', nav: 'Timeline', icon: 'time', description: 'See when tests ran and how work was distributed.' },
    { id: 'attachments', title: 'Artifacts & evidence', nav: 'Attachments', icon: 'file', description: 'Screenshots, recordings, and traces. All in one place.' },
    { id: 'history', title: 'Run history', nav: 'Run history', icon: 'history', description: 'A little perspective on how your test runs are changing.' },
  ];

  function toast(message) {
    $('toast').textContent = message;
    $('toast').classList.add('visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => $('toast').classList.remove('visible'), 4000);
  }

  function navigate(view) {
    state.view = views.some(v => v.id === view) ? view : 'overview';
    state.status = state.view === 'failures' ? 'failed' : 'all';
    state.query = ''; state.project = 'all'; state.page = 1;
    history.replaceState(null, '', `#${state.view}`);
    $('sidebar').classList.remove('open'); $('menu-toggle').setAttribute('aria-expanded', 'false');
    render();
  }

  function render() {
    const c = counts(), current = views.find(v => v.id === state.view), attention = c.failed > 0 || (report.errors || []).length > 0 || ['failed', 'timedout', 'interrupted'].includes(report.runStatus);
    document.title = `${report.title} · ${current.title} · Trace`;
    $('workspace-name').textContent = report.title;
    $('breadcrumb-project').textContent = report.title;
    $('page-title').innerHTML = `${esc(current.title)}<span>.</span>`;
    $('page-description').textContent = current.description;
    $('nav').innerHTML = views.map(v => `<button class="nav-item ${state.view === v.id ? 'active' : ''}" data-nav="${v.id}" ${state.view === v.id ? 'aria-current="page"' : ''}>${icon(v.icon)}<span>${v.nav}</span>${v.id === 'failures' && c.failed ? `<span class="nav-count">${c.failed}</span>` : ''}</button>`).join('');
    $('run-meta').innerHTML = `<span class="run-label">${icon('branch')} Run ${esc(new Date(report.startTime).toISOString().slice(0, 10))}</span><span class="meta-separator"></span><span>${icon('time')}${esc(date(report.startTime))}</span><span class="meta-separator"></span><span>${icon('browser')}${projects().length} project${projects().length === 1 ? '' : 's'}</span><span class="run-state ${attention ? 'failed' : ''}">${attention ? 'Needs attention' : c.total === 0 ? 'No tests' : c.skipped === c.total ? 'All skipped' : 'Completed'}</span>`;
    $('footer-source').textContent = `${report.source} · ${report.tests.length} tests · Works offline`;
    const renders = { overview: renderOverview, tests: () => renderTable(false), failures: renderFailures, timeline: renderTimeline, attachments: renderAttachments, history: renderHistory };
    $('view').innerHTML = renders[state.view]();
  }

  function renderStats() {
    const c = counts();
    return `<div class="stats-grid">
      <button class="stat-card" data-stat="all"><div class="stat-heading">Total tests${icon('tests')}</div><div class="stat-value">${c.total}</div><div class="stat-note">Across ${projects().length} projects</div></button>
      <button class="stat-card" data-stat="passed"><div class="stat-heading">Passed${icon('check')}</div><div class="stat-value">${c.passed}</div><div class="stat-note green">${c.flaky ? `${c.flaky} additional flaky ${c.flaky === 1 ? 'test' : 'tests'}` : 'Consistent results'}</div></button>
      <button class="stat-card failed-card" data-stat="failed"><div class="stat-heading">Failed${icon('fail')}</div><div class="stat-value ${!c.failed ? 'zero-value' : ''}">${c.failed}</div><div class="stat-note ${c.failed ? 'red' : 'green'}">${c.failed ? 'Ready for investigation' : 'No failing tests'}</div></button>
      <div class="stat-card"><div class="stat-heading">Run duration${icon('time')}</div><div class="stat-value">${esc(duration(report.duration))}</div><div class="stat-note">${report.workers ? `${report.workers} parallel workers` : 'Wall-clock duration'}</div></div>
    </div>`;
  }

  function renderHealth() {
    const c = counts(), circumference = 326.73;
    let offset = 0;
    const colors = { passed: '#b8e18d', failed: '#d98d80', flaky: '#e5c477', skipped: '#819781' };
    const segments = ['passed', 'failed', 'flaky', 'skipped'].map(s => {
      const length = c.total ? c[s] / c.total * circumference : 0;
      const html = `<circle cx="62" cy="62" r="52" stroke="${colors[s]}" stroke-dasharray="${Math.max(0, length - (length ? 3 : 0))} ${circumference}" stroke-dashoffset="${-offset}"/>`;
      offset += length; return html;
    }).join('');
    return `<section class="panel health-panel" aria-label="Run health"><div class="panel-heading"><h2>Run health</h2><span>THIS RUN</span></div><div class="health-visual"><div class="donut"><svg viewBox="0 0 124 124" role="img" aria-label="${c.passRate}% pass rate"><circle cx="62" cy="62" r="52" stroke="#48604a"/>${segments}</svg><div class="donut-center"><strong>${c.passRate}<small>%</small></strong><small>PASS RATE</small></div></div><div class="legend">${['passed', 'failed', 'flaky', 'skipped'].map(s => `<div class="legend-row"><span class="dot ${s}"></span>${label(s)}<strong>${c[s]}</strong></div>`).join('')}</div></div><div class="health-caption">${icon(c.failed ? 'fail' : 'check')}${c.total ? `${c.passed + c.flaky} of ${c.total} tests met their expected outcome` : 'No tests recorded in this run'}</div></section>`;
  }

  function renderProjects() {
    return `<section class="panel"><div class="panel-heading"><h2>Results by project</h2><span>${projects().length} TOTAL</span></div><div class="project-list">${projects().map(p => {
      const c = summary(report.tests.filter(t => (t.project || 'default') === p));
      return `<div class="project-item"><div class="project-title"><span>${icon('browser')}${esc(p)}</span><small>${c.passed + c.flaky}/${c.total} passed</small></div><div class="stacked-bar" role="img" aria-label="${esc(p)}: ${c.passed} passed, ${c.failed} failed, ${c.flaky} flaky, ${c.skipped} skipped">${['passed', 'failed', 'flaky', 'skipped'].map(s => `<span class="${s}" style="width:${c[s] / (c.total || 1) * 100}%"></span>`).join('')}</div></div>`;
    }).join('') || '<p class="muted">No projects recorded.</p>'}</div><div class="project-footer">${['passed', 'failed', 'flaky', 'skipped'].map(s => `<span><span class="dot ${s}"></span>${label(s)}</span>`).join('')}</div></section>`;
  }

  function renderSnapshot() {
    const files = new Set(report.tests.map(t => t.file)), attachments = allAttachments();
    return `<section class="panel snapshot-panel"><div class="panel-heading"><h2>Run snapshot</h2>${icon('tests')}</div><div class="snapshot">${[
      ['Framework', 'Playwright'], ['Result source', report.source], ['Test files', files.size], ['Retries', report.tests.reduce((n, t) => n + retries(t), 0)], ['Attachments', attachments.length],
    ].map(([k, v]) => `<div class="snapshot-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div><p class="snapshot-note">This report is a snapshot of a completed run. Allure continues to work alongside it.</p></section>`;
  }

  function renderOverview() {
    const c = counts();
    const errors = report.errors?.length ? `<section class="run-errors"><h2>${report.errors.length} run-level error${report.errors.length === 1 ? '' : 's'}</h2>${report.errors.map(e => `<pre>${esc(e)}</pre>`).join('')}</section>` : '';
    const warning = c.failed ? `<div class="attention"><div class="attention-text">${icon('fail')}<div><strong>${c.failed} test${c.failed === 1 ? '' : 's'} could use a closer look.</strong><p>Open a failed test to inspect the error, steps, and available evidence.</p></div></div><button class="button-link" data-nav="failures">Review failures ${icon('arrow')}</button></div>` : '';
    return `${renderStats()}<div class="dashboard-grid">${renderHealth()}${renderProjects()}${renderSnapshot()}</div>${errors}${warning}<div class="section-header"><div><h2>Test results <span class="list-count">${c.total}</span></h2><p>The details behind this run.</p></div><button class="button-link" data-nav="tests">View all tests ${icon('arrow')}</button></div>${renderTable(true)}`;
  }

  function filteredTests() {
    let tests = report.tests.map((t, index) => ({ ...t, index }));
    if (state.view === 'failures') tests = tests.filter(t => t.status === 'failed');
    if (state.status !== 'all') tests = tests.filter(t => t.status === state.status);
    if (state.project !== 'all') tests = tests.filter(t => (t.project || 'default') === state.project);
    if (state.query.trim()) {
      const q = state.query.toLowerCase().trim();
      tests = tests.filter(t => [t.title, t.file, t.suite, t.project, ...(t.tags || []), failureText(t)].join(' ').toLowerCase().includes(q));
    }
    if (state.sort === 'duration') tests.sort((a, b) => b.duration - a.duration);
    else if (state.sort === 'name') tests.sort((a, b) => a.title.localeCompare(b.title));
    else tests.sort((a, b) => ({ failed: 0, flaky: 1, passed: 2, skipped: 3 }[a.status] - { failed: 0, flaky: 1, passed: 2, skipped: 3 }[b.status]) || a.title.localeCompare(b.title));
    return tests;
  }

  function renderTable(compact) {
    const c = counts(), filtered = filteredTests(), pages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
    state.page = Math.min(state.page, pages);
    const start = (state.page - 1) * state.pageSize, rows = filtered.slice(start, start + state.pageSize);
    const options = state.view === 'failures' ? ['failed'] : ['all', 'passed', 'failed', 'flaky', 'skipped'];
    return `<section class="panel table-panel" aria-label="Test results"><div class="table-toolbar"><div class="filter-tabs" role="group" aria-label="Filter by test status">${options.map(s => `<button class="filter-tab ${state.status === s ? 'active' : ''}" data-status="${s}" aria-pressed="${state.status === s}">${s === 'all' ? 'All tests' : label(s)}<small>${s === 'all' ? c.total : c[s]}</small></button>`).join('')}</div><div class="table-actions"><label class="search-wrap">${icon('search')}<input id="test-search" type="search" placeholder="Search tests…" aria-label="Search tests" value="${esc(state.query)}"><kbd>/</kbd></label><select id="project-filter" aria-label="Filter project"><option value="all">All projects</option>${projects().map(p => `<option value="${esc(p)}" ${state.project === p ? 'selected' : ''}>${esc(p)}</option>`).join('')}</select></div></div>${rows.length ? `<div class="table-scroll"><table><thead><tr><th scope="col"><button class="table-sort" data-sort="name">Test name ${state.sort === 'name' ? '↑' : '↕'}</button></th><th scope="col">Status</th><th scope="col">Project</th><th scope="col"><button class="table-sort" data-sort="duration">Duration ${state.sort === 'duration' ? '↓' : '↕'}</button></th><th scope="col">Retries</th><th scope="col"><span class="muted">Detail</span></th></tr></thead><tbody>${rows.map(t => `<tr><td class="test-cell"><button class="test-title" data-test="${t.index}">${esc(t.title)}</button><div class="test-file">${esc(t.file)}${t.line ? `:${t.line}` : ''}</div></td><td>${badge(t.status)}</td><td><span class="browser-label">${icon('browser')}${esc(t.project || 'default')}</span></td><td class="duration">${esc(duration(t.duration))}</td><td class="retry-cell">${retries(t) || '—'}</td><td><button class="row-open" data-test="${t.index}" aria-label="Open ${esc(t.title)}">${icon('chevron')}</button></td></tr>`).join('')}</tbody></table></div>` : empty('No matching tests', state.query || state.status !== 'all' || state.project !== 'all' ? 'Try a different search or clear the filters.' : 'This run did not record any tests.', 'search')}
      <div class="table-footer"><span>${filtered.length ? `Showing ${start + 1}–${start + rows.length} of ${filtered.length} tests` : '0 tests'}${filtered.length !== report.tests.length ? ` · ${report.tests.length} in this run` : ''}</span><div class="pagination"><button data-page="${state.page - 1}" ${state.page <= 1 ? 'disabled' : ''} aria-label="Previous page">←</button><span>${state.page} / ${pages}</span><button data-page="${state.page + 1}" ${state.page >= pages ? 'disabled' : ''} aria-label="Next page">→</button></div></div></section>`;
  }

  function empty(title, message, image = 'check') {
    return `<div class="empty">${icon(image)}<h3>${esc(title)}</h3><p>${esc(message)}</p></div>`;
  }

  function renderFailures() {
    const failed = report.tests.filter(t => t.status === 'failed');
    if (!failed.length) return `<section class="panel">${empty('A clean run', 'There are no failed tests in this report.')}</section>`;
    const groups = new Map();
    for (const test of failed) {
      const text = failureText(test);
      const reason = text.split('\n').map(s => s.trim()).find(s => s && !/^(Error:|at\s)/.test(s)) || 'No error message recorded';
      groups.set(reason, (groups.get(reason) || 0) + 1);
    }
    return `<div class="section-header"><div><h2>Failure patterns</h2><p>Tests grouped by the first error message.</p></div><span class="muted">${failed.length} failed tests</span></div><div class="failure-groups">${[...groups.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([reason, n]) => `<div class="failure-group"><strong>${n} ${n === 1 ? 'test' : 'tests'}</strong><p>${esc(reason)}</p><small>Open a test below for the complete error</small></div>`).join('')}</div>${renderTable(false)}`;
  }

  function renderTimeline() {
    const items = report.tests.flatMap((t, index) => t.attempts.map(a => ({ test: t, index, ...a, start: new Date(a.startTime).getTime() })));
    const valid = items.filter(a => Number.isFinite(a.start));
    if (!valid.length) return `<section class="panel">${empty('No timing information', 'The source report does not include test start times.', 'time')}</section>`;
    const min = Math.min(...valid.map(a => a.start)), max = Math.max(...valid.map(a => a.start + a.duration)), range = Math.max(1, max - min), lanes = [...new Set(valid.map(a => `${a.test.project || 'default'} · worker ${a.worker ?? 0}`))];
    return `<div class="section-header"><div><h2>Worker activity</h2><p>Hover over a test for timing. Select it to open the details.</p></div><span class="muted">${esc(duration(range))} test span</span></div><section class="panel timeline-panel"><div class="timeline-scale">${[0, .2, .4, .6, .8, 1].map(f => `<span>${esc(duration(range * f))}</span>`).join('')}</div>${lanes.map(lane => `<div class="timeline-row"><div class="timeline-label" title="${esc(lane)}">${esc(lane)}</div><div class="timeline-track">${valid.filter(a => `${a.test.project || 'default'} · worker ${a.worker ?? 0}` === lane).map(a => `<button class="timeline-bar ${a.test.status}" style="left:${(a.start - min) / range * 100}%;width:${Math.max(.2, a.duration / range * 100)}%" data-test="${a.index}" title="${esc(a.test.title)} · ${esc(duration(a.duration))}" aria-label="${esc(a.test.title)} · ${esc(duration(a.duration))}"></button>`).join('')}</div></div>`).join('')}</section>`;
  }

  function renderAttachments() {
    const attachments = allAttachments();
    if (!attachments.length) return `<section class="panel">${empty('No attachments in this run', 'Screenshots, videos, and traces appear here when Playwright records them.', 'file')}</section>`;
    return `<div class="section-header"><h2>Run artifacts <span class="list-count">${attachments.length}</span></h2><span class="muted">${attachments.filter(a => safeData(a)).length} embedded in this file</span></div><div class="attachments-grid">${attachments.map(a => `<article class="attachment-card"><div class="attachment-preview">${isImage(a) ? `<img src="${esc(safeData(a))}" alt="${esc(a.name)}" loading="lazy">` : icon(a.contentType?.startsWith('video/') ? 'browser' : 'file')}</div><div class="attachment-info"><strong>${esc(a.name)}</strong><p title="${esc(a.test.title)}">${esc(a.test.project)} · ${esc(a.test.title)}</p><div class="heading-actions"><button class="button" data-test="${a.testIndex}" data-attachment-attempt="${a.attemptIndex}">Open test ${icon('arrow')}</button>${downloadLink(a)}</div></div></article>`).join('')}</div>`;
  }

  function renderHistory() {
    const entries = report.history || [];
    if (!entries.length) return `<section class="panel">${empty('Your next run starts the story', 'The Playwright reporter keeps up to 30 run summaries locally. This imported report does not include run history.', 'history')}</section>`;
    const max = Math.max(1, ...entries.map(e => e.total));
    return `<div class="section-header"><div><h2>Recent runs</h2><p>History captured when this HTML file was generated.</p></div><span class="muted">${entries.length} saved runs</span></div><section class="panel history-panel"><div class="history-bars">${entries.map((e, i) => `<div class="history-column"><span>${e.passRate}%</span><div class="history-bar ${e.failed || e.errors ? 'has-failures' : ''}" style="height:${e.total / max * 110}px" title="${esc(date(e.startTime))}: ${e.passed} passed, ${e.failed} failed"></div><span>#${i + 1}</span></div>`).join('')}</div><div class="table-scroll"><table><thead><tr><th>Date</th><th>Total</th><th>Passed</th><th>Failed</th><th>Flaky</th><th>Skipped</th><th>Run errors</th><th>Pass rate</th><th>Duration</th></tr></thead><tbody>${[...entries].reverse().map(e => `<tr><td>${esc(date(e.startTime))}</td><td>${e.total}</td><td>${e.passed}</td><td>${e.failed}</td><td>${e.flaky}</td><td>${e.skipped}</td><td>${e.errors || 0}</td><td>${e.passRate}%</td><td class="duration">${esc(duration(e.duration))}</td></tr>`).join('')}</tbody></table></div></section>`;
  }

  function showTest(index, tab = 'overview', attempt) {
    const test = report.tests[index];
    if (!test) return;
    state.test = index; state.detailTab = tab; state.attempt = attempt ?? Math.max(0, test.attempts.length - 1);
    renderDetail();
    if (!$('test-dialog').open) $('test-dialog').showModal();
  }

  function renderSteps(steps) {
    return `<ul class="steps">${steps.map(s => `<li class="step">${s.steps?.length ? `<details ${s.status === 'failed' ? 'open' : ''}><summary class="step-row"><span class="dot ${esc(s.status)}"></span><span class="step-title">${esc(s.title)}</span><span class="duration">${esc(duration(s.duration))}</span></summary>${s.error ? `<pre class="step-error">${esc(s.error)}</pre>` : ''}${renderSteps(s.steps)}</details>` : `<div class="step-row"><span class="dot ${esc(s.status)}"></span><span class="step-title">${esc(s.title)}</span><span class="duration">${esc(duration(s.duration))}</span></div>${s.error ? `<pre class="step-error">${esc(s.error)}</pre>` : ''}`}</li>`).join('')}</ul>`;
  }

  function renderDetail() {
    const test = report.tests[state.test], attempt = test.attempts[state.attempt], attachments = attempt?.attachments || [], errors = attempt?.errors || [];
    const tabs = ['overview', 'steps', 'attachments', 'output'];
    const errorSection = errors.length ? `<section class="detail-section"><h3>Error details<button class="button-link" id="copy-error">${icon('copy')}Copy</button></h3><pre class="code-block">${esc(errors.join('\n\n'))}</pre></section>` : '';
    let content = '';
    if (state.detailTab === 'overview') {
      content = `${errorSection}<section class="detail-section"><h3>Test information</h3><dl class="detail-info">${[['Project', test.project], ['Expected status', test.expectedStatus || 'passed'], ['Suite', test.suite || '—'], ['Total duration', duration(test.duration)], ['Tags', (test.tags || []).join(' ') || '—'], ['Attempts recorded', test.attempts.length]].map(([key, value]) => `<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl></section>${(test.annotations || []).length ? `<section class="detail-section"><h3>Annotations</h3>${test.annotations.map(a => `<p class="import-notice">${esc(a.type)}: ${esc(a.description || '')}</p>`).join('')}</section>` : ''}${isImage(attachments.find(isImage) || {}) ? `<section class="detail-section"><h3>Failure screenshot</h3><img class="detail-screenshot" src="${esc(safeData(attachments.find(isImage)))}" alt="Screenshot from the selected test attempt"></section>` : ''}${!attempt ? '<p class="trace-tip">This test did not execute. It may have been skipped or blocked by a project dependency.</p>' : ''}`;
    } else if (state.detailTab === 'steps') {
      content = attempt?.steps?.length ? `<section class="detail-section"><h3>Execution steps<span class="muted">${attempt.steps.length} top-level steps</span></h3>${renderSteps(attempt.steps)}</section>` : empty('No steps recorded', 'The source report did not include execution steps for this attempt.', 'tests');
    } else if (state.detailTab === 'attachments') {
      content = attachments.length ? attachments.map(a => `<article class="detail-attachment"><div class="detail-attachment-title"><strong>${esc(a.name)}</strong>${downloadLink(a)}</div>${isImage(a) ? `<img class="detail-screenshot" src="${esc(safeData(a))}" alt="${esc(a.name)}">` : safeData(a) && /^video\/(webm|mp4|ogg)$/i.test(a.contentType) ? `<video controls preload="metadata" src="${esc(safeData(a))}"></video>` : ''}${/trace/i.test(a.name) ? '<p class="trace-tip">Download this trace, then open it locally with <code>npx playwright show-trace &lt;downloaded-file&gt;</code>.</p>' : ''}<small>${esc(a.contentType)}${a.size ? ` · ${(a.size / 1024).toFixed(1)} KB` : ''}</small></article>`).join('') : empty('No attachments', 'There are no artifacts for this attempt.', 'file');
    } else {
      content = attempt?.stdout || attempt?.stderr ? `${attempt.stdout ? `<section class="detail-section"><h3>Standard output</h3><pre class="code-block output-block">${esc(attempt.stdout)}</pre></section>` : ''}${attempt.stderr ? `<section class="detail-section"><h3>Standard error</h3><pre class="code-block">${esc(attempt.stderr)}</pre></section>` : ''}` : empty('No console output', 'This attempt did not record stdout or stderr.', 'file');
    }
    $('test-detail').innerHTML = `<header class="detail-header"><div class="detail-top"><span>TEST DETAIL</span><button class="icon-button" id="close-detail" aria-label="Close test details">${icon('close')}</button></div>${badge(test.status)}<h2 id="detail-title">${esc(test.title)}</h2><div class="detail-location">${esc(test.file)}${test.line ? `:${test.line}` : ''}</div><div class="detail-meta"><span class="browser-label">${icon('browser')}${esc(test.project)}</span><span>${esc(duration(test.duration))}</span><span>${retries(test)} retries</span></div><div class="detail-tabs" role="group" aria-label="Test detail sections">${tabs.map(t => `<button class="detail-tab ${state.detailTab === t ? 'active' : ''}" data-detail-tab="${t}" aria-pressed="${state.detailTab === t}">${t[0].toUpperCase() + t.slice(1)}${t === 'attachments' ? ` (${attachments.length})` : ''}</button>`).join('')}</div></header><div class="detail-body">${test.attempts.length > 1 ? `<div class="attempt-controls"><span>Inspect a recorded attempt</span><select id="attempt-select" aria-label="Select attempt">${test.attempts.map((a, i) => `<option value="${i}" ${state.attempt === i ? 'selected' : ''}>Attempt ${i + 1} · ${esc(a.status)} · ${esc(duration(a.duration))}</option>`).join('')}</select></div>` : ''}${content}</div>`;
  }

  function refreshTable() {
    const search = $('test-search'), position = search?.selectionStart, focused = document.activeElement === search;
    render();
    if (focused && $('test-search')) { $('test-search').focus(); try { $('test-search').setSelectionRange(position, position); } catch {} }
  }

  document.addEventListener('click', async event => {
    const el = event.target.closest('button,[data-nav]');
    if (!el || el.disabled) return;
    if (el.dataset.nav) navigate(el.dataset.nav);
    else if (el.dataset.stat) { navigate('tests'); state.status = el.dataset.stat; render(); }
    else if (el.dataset.status) { state.status = el.dataset.status; state.page = 1; refreshTable(); }
    else if (el.dataset.test !== undefined) showTest(Number(el.dataset.test), el.dataset.attachmentAttempt !== undefined ? 'attachments' : 'overview', el.dataset.attachmentAttempt !== undefined ? Number(el.dataset.attachmentAttempt) : undefined);
    else if (el.dataset.detailTab) { state.detailTab = el.dataset.detailTab; renderDetail(); }
    else if (el.dataset.page) { state.page = Number(el.dataset.page); refreshTable(); }
    else if (el.dataset.sort) { state.sort = state.sort === el.dataset.sort ? 'default' : el.dataset.sort; state.page = 1; refreshTable(); }
    else if (el.id === 'close-detail') $('test-dialog').close();
    else if (el.id === 'copy-error') {
      const text = (report.tests[state.test].attempts[state.attempt]?.errors || []).join('\n\n');
      try { await navigator.clipboard.writeText(text); toast('Error details copied'); }
      catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(document.querySelector('.code-block')); selection.removeAllRanges(); selection.addRange(range); toast('Error selected. Press Ctrl+C or ⌘C to copy.'); }
    }
    else if (el.id === 'import-button') $('import-file').click();
    else if (el.id === 'export-button') {
      const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = `trace-results-${report.startTime.slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('Report exported as JSON');
    }
    else if (el.id === 'menu-toggle') { const open = $('sidebar').classList.toggle('open'); el.setAttribute('aria-expanded', String(open)); }
  });
  document.addEventListener('input', event => { if (event.target.id === 'test-search') { state.query = event.target.value; state.page = 1; refreshTable(); } });
  document.addEventListener('change', async event => {
    if (event.target.id === 'project-filter') { state.project = event.target.value; state.page = 1; refreshTable(); }
    else if (event.target.id === 'attempt-select') { state.attempt = Number(event.target.value); renderDetail(); }
    else if (event.target.id === 'import-file') {
      const file = event.target.files[0]; if (!file) return;
      try {
        const raw = parseJSON(await file.text());
        const next = raw.schemaVersion === 1 ? validateReport(raw) : fromPlaywright(raw, { title: report.title });
        if (!Number.isFinite(new Date(next.startTime).getTime())) throw new Error('The report has an invalid start time.');
        report = next; $('test-dialog').close(); navigate('overview');
        toast(`Imported ${report.tests.length} tests. Export JSON to save this imported view.`);
      } catch (error) { toast(error.message || 'Could not read this report'); }
      event.target.value = '';
    }
  });
  document.addEventListener('keydown', event => {
    if ((event.key === '/' || (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey))) && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !$('test-dialog').open) {
      event.preventDefault(); if (!$('test-search')) navigate('tests'); $('test-search')?.focus();
    }
    if (event.key === 'Escape') { $('sidebar').classList.remove('open'); $('menu-toggle').setAttribute('aria-expanded', 'false'); }
  });
  $('test-dialog').addEventListener('click', event => { if (event.target === $('test-dialog')) { const rect = event.target.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close(); } });
  window.addEventListener('hashchange', () => navigate(location.hash.slice(1)));
  navigate(location.hash.slice(1) || 'overview');
})();
