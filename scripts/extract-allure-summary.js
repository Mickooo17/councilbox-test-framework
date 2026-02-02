const fs = require('fs');
const path = require('path');

const resultsDir = 'allure-results';
let total = 0, passed = 0, failed = 0, skipped = 0;
const failedTests = [];
let firstFailedTestName = '';
let firstFailedTestSteps = '';
let firstFailedTestErrorMessage = '';
let firstFailedTestFullError = '';
let firstFailedTestFailedStep = '';
let firstFailedTestFailedStepError = '';
let firstFailedTestDuration = 0;

fs.readdirSync(resultsDir).forEach(file => {
  if (file.endsWith('-result.json')) {
    const content = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf8'));
    total++;
    if (content.status === 'passed') passed++;
    else if (content.status === 'failed') {
      failed++;
      failedTests.push(content.name);
      
      // Capture first failed test details
      if (!firstFailedTestName) {
        firstFailedTestName = content.name || 'Unknown';
        firstFailedTestDuration = content.stop - content.start || 0;
        
        // Extract steps from steps array
        if (content.steps && content.steps.length > 0) {
          firstFailedTestSteps = content.steps
            .map(step => `${step.name}${step.status === 'failed' ? ' [FAILED]' : ''}`)
            .join(' -> ');
          
          // Find the failed step
          const failedStep = content.steps.find(s => s.status === 'failed');
          if (failedStep) {
            firstFailedTestFailedStep = failedStep.name;
            if (failedStep.statusDetails && failedStep.statusDetails.message) {
              firstFailedTestFailedStepError = failedStep.statusDetails.message;
            }
          }
        } else {
          firstFailedTestSteps = 'No steps recorded';
        }
        
        // Extract error message from statusDetails
        if (content.statusDetails && content.statusDetails.message) {
          firstFailedTestErrorMessage = content.statusDetails.message;
          firstFailedTestFullError = content.statusDetails.message;
        } else if (content.statusDetails && content.statusDetails.trace) {
          const trace = content.statusDetails.trace;
          firstFailedTestErrorMessage = trace.split('\n')[0];
          firstFailedTestFullError = trace;
        } else {
          firstFailedTestErrorMessage = 'Unknown error';
          firstFailedTestFullError = 'Unknown error';
        }
      }
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

// Write failed test details
fs.writeFileSync('failed-test-name.txt', firstFailedTestName);
fs.writeFileSync('failed-test-steps.txt', firstFailedTestSteps);
fs.writeFileSync('failed-test-error.txt', firstFailedTestErrorMessage);
fs.writeFileSync('failed-test-full-error.txt', firstFailedTestFullError);
fs.writeFileSync('failed-test-failed-step.txt', firstFailedTestFailedStep);
fs.writeFileSync('failed-test-failed-step-error.txt', firstFailedTestFailedStepError);
fs.writeFileSync('failed-test-duration.txt', firstFailedTestDuration.toString());
