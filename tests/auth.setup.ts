import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import envConfig from '../global-env';
import { resolveLoginUrl } from '../utils/UrlHelper';
import { ApiAuthHelper } from '../utils/ApiAuthHelper';

const authFile = 'playwright/.auth/user.json';
const tokensFile = 'playwright/.auth/tokens.json';

setup('authenticate', async ({ page, request, context }) => {
  const loginUrl = resolveLoginUrl();
  const user = envConfig.users.adminProfessional || envConfig.users.admin;

  console.log(`[setup] Authenticating via API as ${user.username}...`);

  try {
    // 1. Fetch/get cached tokens via ApiAuthHelper (uses 1-hour cache)
    const tokens = await ApiAuthHelper.getTokensForUser(request, user.username, user.password);

    // 2. Ensure .auth dir exists and save tokens.json
    const authDir = path.dirname(tokensFile);
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }
    fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));

    // 3. Inject into context ONLY when tokens are valid
    await context.addInitScript(({ token, refreshToken }) => {
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('refreshUserToken', refreshToken);
    }, { token: tokens.token, refreshToken: tokens.refreshToken });

    // 4. Navigate to app URL
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 5. Verify user is authenticated
    await expect(page).toHaveURL(/\/company|\/admin\b/i, { timeout: 20000 });

    // 6. Save storage state
    await page.context().storageState({ path: authFile });
    console.log(`[setup] API Authentication successful! Tokens saved to ${tokensFile}`);
  } catch (error) {
    console.warn(`[setup] API login failed (${error}), falling back to UI login...`);

    // Reset cookies and storage for clean UI login fallback
    await context.clearCookies().catch(() => {});
    await page.evaluate(() => {
      window.sessionStorage.clear();
      window.localStorage.clear();
    }).catch(() => {});

    // Navigate to direct login URL
    await page.goto('https://qa.ovac.pre.councilbox.com/login', { waitUntil: 'networkidle', timeout: 30000 });

    const usernameInput = page.locator('#username').or(page.getByPlaceholder(/Username|Email|Usuario/i)).first();
    await usernameInput.waitFor({ state: 'visible', timeout: 15000 });
    await usernameInput.fill(user.username);
    await page.locator('#password').fill(user.password);
    await page.locator('button[id="restore-password-button"]').click();

    await expect(page).toHaveURL(/\/company|\/admin\b/i, { timeout: 20000 });
    await page.context().storageState({ path: authFile });

    // Extract sessionStorage after UI login and save to tokens.json
    const sessionTokens = await page.evaluate(() => ({
      token: window.sessionStorage.getItem('token') || '',
      refreshToken: window.sessionStorage.getItem('refreshUserToken') || '',
    }));
    if (sessionTokens.token) {
      const authDir = path.dirname(tokensFile);
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
      fs.writeFileSync(tokensFile, JSON.stringify(sessionTokens, null, 2));
      console.log(`[setup] UI Authentication successful! Extracted tokens saved to ${tokensFile}`);
    }
  }
});
