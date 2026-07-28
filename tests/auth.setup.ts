import { test as setup, expect } from '@playwright/test';
import envConfig from '../global-env';
import { resolveLoginUrl } from '../utils/UrlHelper';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginUrl = resolveLoginUrl();
  const user = envConfig.users.adminProfessional || envConfig.users.admin;

  console.log(`[setup] Logging in as ${user.username}...`);

  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('#username', { state: 'visible', timeout: 15000 });

  await page.fill('#username', user.username);
  await page.fill('#password', user.password);
  await page.click('button[id="restore-password-button"]');

  // Wait for successful login
  await expect(page).toHaveURL(/\/company\b/i, { timeout: 20000 });

  // Save cookies, localStorage, and sessionStorage
  await page.context().storageState({ path: authFile });
  console.log(`[setup] Storage state saved to ${authFile}`);
});
