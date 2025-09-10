const fs = require('fs');
const path = require('path');

const resultsDir = 'allure-results';
let total = 0, passed = 0, failed = 0, skipped = 0;
const failedTests = [];

fs.readdirSync(resultsDir).forEach(file => {
  if (file.endsWith('-result.json')) {
    const content = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf8'));
    total++;
    if (content.status === 'passed') passed++;
    else if (content.status === 'failed') {
      failed++;
      failedTests.push(content.name);
    }
    else if (content.status === 'skipped') skipped++;
  }
});

const htmlList = failedTests.length
  ? `<ul style="margin:0; padding-left:20px;">${failedTests.map(t => `<li>${t}</li>`).join('')}</ul>`
  : '<p>No failed tests.</p>';

// Spremi rezultate u fajlove koje Jenkins može pročitati
fs.writeFileSync('total-tests.txt', total.toString());
fs.writeFileSync('passed-tests.txt', passed.toString());
fs.writeFileSync('failed-tests-count.txt', failed.toString());
fs.writeFileSync('skipped-tests.txt', skipped.toString());
fs.writeFileSync('failed-tests.html', htmlList);
