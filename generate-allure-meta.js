const fs = require('fs');
const os = require('os');
const path = require('path');

const allureResultsDir = path.join(__dirname, 'allure-results');

if (!fs.existsSync(allureResultsDir)) {
  fs.mkdirSync(allureResultsDir);
}

// Executor
const executor = {
  name: os.userInfo().username,
  type: 'playwright',
  url: '',
  buildName: '',
  buildUrl: '',
  reportName: 'Playwright Test Report',
  reportUrl: '',
  runName: `Run by ${os.userInfo().username} on ${os.hostname()}`,
  runUrl: '',
};
fs.writeFileSync(path.join(allureResultsDir, 'executor.json'), JSON.stringify(executor, null, 2));

// Environment
const envProps = [
  `USER=${os.userInfo().username}`,
  `HOSTNAME=${os.hostname()}`,
  `DATE=${new Date().toISOString()}`,
];
fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), envProps.join('\n'));

console.log('Allure executor.json and environment.properties generated.');
