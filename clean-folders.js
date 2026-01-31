const fs = require('fs');
const path = require('path');

const folders = [
  'allure-results',
  'allure-report',
  'playwright-report',
  'test-results',
  'junit-results'
];

folders.forEach(folder => {
  const fullPath = path.join(__dirname, folder);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Deleted: ${folder}`);
  } else {
    console.log(`Not found (skipped): ${folder}`);
  }
});
