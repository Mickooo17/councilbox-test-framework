import { test as base, expect, Page } from '@playwright/test';
import envConfig from '../global-env';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';

export const adminUser = envConfig.users.admin;
export const adminProfessionalUser = envConfig.users.adminProfessional;
export const superadminUser = envConfig.users.superadmin;

export const testUser = adminUser;

// Custom fixture always open the login page before each test
export const test = base.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  page: Page;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  page: async ({ page }, use) => {
    await page.goto(`${envConfig.baseUrl}/admin`, { waitUntil: 'networkidle' });
    await use(page);
  },
});

// Attach screenshot and video for failed tests
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Screenshot
    const screenshot = await page.screenshot();
    testInfo.attachments.push({
      name: 'screenshot',
      contentType: 'image/png',
      body: screenshot,
    });

    // Video (if available)
    const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
    if (videoPath && fs.existsSync(videoPath)) {
      testInfo.attachments.push({
        name: 'video',
        path: videoPath,
        contentType: 'video/webm',
      });
    }
  }
});

export { expect }; 