const fs = require('fs');
const os = require('os');
const path = require('path');

const allureResultsDir = path.join(__dirname, 'allure-results');

if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir);
}

// --- Executor ---
// Uses Jenkins env vars when available, falls back to local values
const executor = {
  name: process.env.NODE_NAME || 'Jenkins',
  type: 'jenkins',
  url: process.env.JENKINS_URL || '',
  buildOrder: process.env.BUILD_NUMBER || '',
  buildName: `Build #${process.env.BUILD_NUMBER || 'local'}`,
  buildUrl: process.env.BUILD_URL || '',
  reportName: 'Councilbox Playwright Report',
  reportUrl: process.env.FINAL_REPORT_URL || '',
};
fs.writeFileSync(path.join(allureResultsDir, 'executor.json'), JSON.stringify(executor, null, 2));

// --- Environment ---
const envProps = [
  `Browser=Chromium`,
  `Framework=Playwright`,
  `Node.js=${process.version}`,
  `OS=${os.type()} ${os.release()}`,
  `Build=${process.env.BUILD_NUMBER || 'local'}`,
  `Jenkins.URL=${process.env.JENKINS_URL || 'N/A'}`,
  `Executor=${process.env.NODE_NAME || os.hostname()}`,
  `Branch=${process.env.GIT_BRANCH || 'main'}`,
  `Base.URL=${process.env.BASE_URL || 'https://qa.ovac.councilbox.com/admin'}`,
];
fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), envProps.join('\n'));

console.log('Allure executor.json and environment.properties generated.');
