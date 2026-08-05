import { test as base, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import envConfig from '../global-env';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { InstitutionsPage } from '../pages/institutions/InstitutionsPage';
import { TemplatesPage } from '../pages/templates/TemplatesPage';
import { TagsPage } from '../pages/templates/TagsPage';
import { DocumentationPage } from '../pages/documentation/DocumentationPage';
import { UsersPage } from '../pages/users/UsersPage';
import { UserProfilePage } from '../pages/users/UserProfilePage';
import { SupportPage } from '../pages/support/SupportPage';
import { AppointmentLoginPage } from '../pages/AppointmentLoginPage';
import { resolveLoginUrl } from '../utils/UrlHelper';

export const adminUser = envConfig.users.admin;
export const adminProfessionalUser = envConfig.users.adminProfessional;
export const superadminUser = envConfig.users.superadmin;

export const testUser = adminUser;

const loginUrl = resolveLoginUrl();
const tokensFile = path.join(process.cwd(), 'playwright/.auth/tokens.json');

// Custom fixture always injects auth tokens and opens page
export const test = base.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  institutionsPage: InstitutionsPage;
  templatesPage: TemplatesPage;
  tagsPage: TagsPage;
  documentationPage: DocumentationPage;
  usersPage: UsersPage;
  userProfilePage: UserProfilePage;
  supportPage: SupportPage;
  appointmentLoginPage: AppointmentLoginPage;
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
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
  userProfilePage: async ({ page }, use) => {
    await use(new UserProfilePage(page));
  },
  supportPage: async ({ page }, use) => {
    await use(new SupportPage(page));
  },
  appointmentLoginPage: async ({ page }, use) => {
    await use(new AppointmentLoginPage(page));
  },
  page: async ({ page }, use) => {
    // Inject auth tokens into sessionStorage before navigation if tokensFile exists
    if (fs.existsSync(tokensFile)) {
      try {
        const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8'));
        if (tokens.token && tokens.refreshToken) {
          await page.addInitScript(({ token, refreshToken }) => {
            window.sessionStorage.setItem('token', token);
            window.sessionStorage.setItem('refreshUserToken', refreshToken);
          }, { token: tokens.token, refreshToken: tokens.refreshToken });
        }
      } catch (err) {
        console.warn(`[fixture:page] Could not inject tokens:`, err);
      }
    }

    await page.goto(loginUrl);
    await use(page);
  },
});

// Attach screenshot and video for failed tests
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    // Screenshot
    if (page && !page.isClosed()) {
      try {
        const screenshot = await page.screenshot();
        testInfo.attachments.push({
          name: 'screenshot',
          contentType: 'image/png',
          body: screenshot,
        });
      } catch (err) {
        console.warn(`[afterEach] Could not capture screenshot:`, err);
      }
    }

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
