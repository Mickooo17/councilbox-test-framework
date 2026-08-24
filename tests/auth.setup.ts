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

  let tokens: { token: string; refreshToken: string } | null = null;

  try {
    // 1. Fetch fresh tokens via ApiAuthHelper
    tokens = await ApiAuthHelper.getTokensForUser(request, user.username, user.password, true);
  } catch (error) {
    console.warn(`[setup] API login failed (${error}). Checking existing tokens.json...`);
    if (fs.existsSync(tokensFile)) {
      try {
        const saved = JSON.parse(fs.readFileSync(tokensFile, 'utf-8'));
        if (saved.token) {
          console.log('[setup] Found saved tokens.json, attempting to use cached session...');
          tokens = saved;
        }
      } catch {}
    }
  }

  if (tokens && tokens.token) {
    try {
      // Ensure .auth dir exists and save tokens.json
      const authDir = path.dirname(tokensFile);
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }
      fs.writeFileSync(tokensFile, JSON.stringify(tokens, null, 2));

      // Inject into context
      await context.addInitScript(({ token, refreshToken }) => {
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('refreshUserToken', refreshToken);
      }, { token: tokens.token, refreshToken: tokens.refreshToken });

      // Navigate to app URL
      await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Verify user is authenticated
      await expect(page).toHaveURL(/\/company|\/admin/i, { timeout: 20000 });

      // Save storage state
      await page.context().storageState({ path: authFile });
      console.log(`[setup] Authentication successful! Tokens saved to ${tokensFile}`);
      return;
    } catch (e) {
      console.warn('[setup] Cached token validation failed, proceeding to UI login fallback...', e);
    }
  }

  // Fallback to UI Login
  console.log('[setup] Performing UI login fallback...');
  await context.clearCookies().catch(() => {});
  await page.evaluate(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }).catch(() => {});

  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

  const usernameInput = page.locator('#username, input[name="username"], input[type="email"], #email').or(page.getByPlaceholder(/Username|Email|Usuario/i)).first();
  await usernameInput.waitFor({ state: 'visible', timeout: 30000 });
  await usernameInput.fill(user.username);
  await page.locator('#password, input[name="password"], input[type="password"]').first().fill(user.password);
  
  const submitButton = page.locator('#restore-password-button, #btn-login, button[type="submit"]').or(page.getByRole('button', { name: /Log in|Sign in|Acceder|Iniciar/i })).first();
  await submitButton.click();

  await expect(page).toHaveURL(/\/company|\/admin/i, { timeout: 30000 });
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
});
