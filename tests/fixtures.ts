import { test as base, expect, Page } from '@playwright/test';
import fs from 'fs';
import envConfig from '../global-env';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { InstitutionsPage } from '../pages/institutions/InstitutionsPage';
import { TemplatesPage } from '../pages/templates/TemplatesPage';
import { TagsPage } from '../pages/templates/TagsPage';
import { DocumentationPage } from '../pages/documentation/DocumentationPage';

export const adminUser = envConfig.users.admin;
export const adminProfessionalUser = envConfig.users.adminProfessional;
export const superadminUser = envConfig.users.superadmin;

export const testUser = adminUser;

import { resolveLoginUrl } from '../utils/UrlHelper';

const loginUrl = resolveLoginUrl();

// Custom fixture always open the login page before each test
export const test = base.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  institutionsPage: InstitutionsPage;
  templatesPage: TemplatesPage;
  tagsPage: TagsPage;
  documentationPage: DocumentationPage;
  page: Page;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  institutionsPage: async ({ page }, use) => {
    await use(new InstitutionsPage(page));
  },
  templatesPage: async ({ page }, use) => {
    await use(new TemplatesPage(page));
  },
  tagsPage: async ({ page }, use) => {
    await use(new TagsPage(page));
  },
  documentationPage: async ({ page }, use) => {
    await use(new DocumentationPage(page));
  },
  page: async ({ page }, use) => {
    await page.goto(loginUrl, { waitUntil: 'networkidle' });
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
