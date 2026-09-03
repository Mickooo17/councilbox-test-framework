import { test as base, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import envConfig from '../global-env';
import { BasePage } from '../pages/BasePage';
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
import { ProceduresPage } from '../pages/procedures/ProceduresPage';
import { ActivityPage } from '../pages/activity/ActivityPage';
import { resolveLoginUrl } from '../utils/UrlHelper';

export const adminUser = envConfig.users.admin;
export const adminProfessionalUser = envConfig.users.adminProfessional;
export const superadminUser = envConfig.users.superadmin;

export const testUser = adminUser;

const loginUrl = resolveLoginUrl();
const tokensFile = path.join(process.cwd(), 'playwright/.auth/tokens.json');

// Custom fixture always injects or clears auth tokens/cookies appropriately and opens page
export const test = base.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  institutionsPage: InstitutionsPage;
  templatesPage: TemplatesPage;
  tagsPage: TagsPage;
  documentationPage: DocumentationPage;
  proceduresPage: ProceduresPage;
  usersPage: UsersPage;
  userProfilePage: UserProfilePage;
  supportPage: SupportPage;
  appointmentLoginPage: AppointmentLoginPage;
  activityPage: ActivityPage;
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
  proceduresPage: async ({ page }, use) => {
    await use(new ProceduresPage(page));
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
  activityPage: async ({ page }, use) => {
    await use(new ActivityPage(page));
  },
  page: async ({ page }, use, testInfo) => {
    const fileName = (testInfo.file || '').replace(/\\/g, '/');
    const isUnauthenticatedTest = fileName.includes('auth.setup.ts') || fileName.includes('loginTests.spec.ts') || fileName.includes('sendMessageToSupport.spec.ts') || fileName.includes('appointmentLogin');

    if (isUnauthenticatedTest) {
      // Clear cookies and storage for unauthenticated tests so they stay on login page
      await page.context().clearCookies().catch(() => {});
      const targetUrl = fileName.includes('appointmentLogin') 
        ? loginUrl.replace(/\/admin\/?$/i, '/login') 
        : loginUrl;
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        try {
          window.sessionStorage.clear();
          window.localStorage.clear();
        } catch {}
      }).catch(() => {});
    } else {
      if (fs.existsSync(tokensFile)) {
        // Inject auth tokens into sessionStorage before navigation ONLY for authenticated dashboard tests
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
    }

    // Auto-dismiss any bottom toast/banner or overlay modal for authenticated pages
    if (!isUnauthenticatedTest) {
      await new BasePage(page).dismissToastOrModal();
    }

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
