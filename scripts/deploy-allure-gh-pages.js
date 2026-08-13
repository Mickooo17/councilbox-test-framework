const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function run(cmd, opts = {}) {
  console.log(`[deploy] > ${cmd}`);
  return execSync(cmd, { stdio: 'inherit', ...opts });
}

function deployAllure() {
  const buildNumber = process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || '1';
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY || 'Mickooo17/councilbox-test-framework';
  const maxBuilds = 5;

  const tempDir = path.join(process.cwd(), 'gh-pages-temp');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  // 1. Clone gh-pages branch (shallow single branch)
  console.log(`[deploy] Cloning gh-pages branch...`);
  const cloneUrl = token
    ? `https://x-access-token:${token}@github.com/${repo}.git`
    : `https://github.com/${repo}.git`;

  try {
    run(`git clone --depth 10 --branch gh-pages --single-branch "${cloneUrl}" "${tempDir}"`);
  } catch (err) {
    console.log(`[deploy] gh-pages branch might not exist yet or failed to clone. Creating new gh-pages directory...`);
    fs.mkdirSync(tempDir, { recursive: true });
    run(`git init`, { cwd: tempDir });
    run(`git checkout -b gh-pages`, { cwd: tempDir });
  }

  const buildsDir = path.join(tempDir, 'builds');
  if (!fs.existsSync(buildsDir)) {
    fs.mkdirSync(buildsDir, { recursive: true });
  }

  const getSortedBuildsByTime = () => {
    if (!fs.existsSync(buildsDir)) return [];
    return fs.readdirSync(buildsDir)
      .filter(f => /^\d+$/.test(f) && fs.statSync(path.join(buildsDir, f)).isDirectory())
      .sort((a, b) => fs.statSync(path.join(buildsDir, b)).mtimeMs - fs.statSync(path.join(buildsDir, a)).mtimeMs);
  };

  // 2. Trend History logic: copy history from latest existing build to allure-results/history
  const existingBuilds = getSortedBuildsByTime();

  if (existingBuilds.length > 0) {
    const latestBuild = existingBuilds[0];
    const prevHistoryDir = path.join(buildsDir, latestBuild, 'history');
    const allureResultsHistory = path.join(process.cwd(), 'allure-results', 'history');

    if (fs.existsSync(prevHistoryDir)) {
      console.log(`[deploy] Found previous history in build #${latestBuild}. Copying to allure-results/history...`);
      fs.mkdirSync(allureResultsHistory, { recursive: true });
      fs.cpSync(prevHistoryDir, allureResultsHistory, { recursive: true });
    }
  }

  // 3. Generate Allure Report
  console.log(`[deploy] Generating Allure report...`);
  try {
    run(`node generate-allure-meta.js`);
  } catch (e) {
    // ignore
  }
  run(`npx allure generate allure-results --clean -o allure-report`);

  // 4. Copy new report to gh-pages-temp/builds/<BUILD_NUMBER>
  const newBuildDir = path.join(buildsDir, buildNumber.toString());
  if (fs.existsSync(newBuildDir)) {
    fs.rmSync(newBuildDir, { recursive: true, force: true });
  }
  fs.mkdirSync(newBuildDir, { recursive: true });
  fs.cpSync(path.join(process.cwd(), 'allure-report'), newBuildDir, { recursive: true });

  // 5. Cleanup old builds (keep only last `maxBuilds` by modification time)
  const allBuilds = getSortedBuildsByTime();

  if (allBuilds.length > maxBuilds) {
    const buildsToRemove = allBuilds.slice(maxBuilds);
    console.log(`[deploy] Cleaning up old builds. Keeping last ${maxBuilds}. Removing: ${buildsToRemove.join(', ')}`);
    buildsToRemove.forEach(b => {
      fs.rmSync(path.join(buildsDir, b), { recursive: true, force: true });
    });
  } else {
    console.log(`[deploy] Total builds: ${allBuilds.length}. Within limit of ${maxBuilds}.`);
  }

  // 6. Create root index.html pointing to the latest available build
  const remainingBuilds = getSortedBuildsByTime();
  const latestBuildNum = remainingBuilds.length > 0 ? remainingBuilds[0] : buildNumber;

  const rootIndex = path.join(tempDir, 'index.html');
  fs.writeFileSync(rootIndex, `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=builds/${latestBuildNum}/">
  <script>window.location.replace("builds/${latestBuildNum}/");</script>
  <title>Allure Report</title>
</head>
<body>
  Redirecting to <a href="builds/${latestBuildNum}/">build #${latestBuildNum}</a>...
</body>
</html>`);

  // Create .nojekyll file so GitHub Pages does not ignore underscore files in Allure reports
  const noJekyll = path.join(tempDir, '.nojekyll');
  fs.writeFileSync(noJekyll, '');

  // 6. Commit and Push to gh-pages
  console.log(`[deploy] Committing and pushing to gh-pages...`);
  run(`git config user.name "GitHub Actions Automation"`, { cwd: tempDir });
  run(`git config user.email "actions@github.com"`, { cwd: tempDir });
  run(`git add -A --force`, { cwd: tempDir });

  try {
    run(`git commit -m "Add Allure report for build #${buildNumber} and keep last ${maxBuilds} builds"`, { cwd: tempDir });
    run(`git push "${cloneUrl}" gh-pages`, { cwd: tempDir });
    console.log(`[deploy] ✅ Allure report successfully deployed and cleaned up!`);
  } catch (err) {
    console.log(`[deploy] No changes to commit or push failed: ${err.message}`);
  }
}

deployAllure();
