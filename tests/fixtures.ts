import { test as base, expect, Page } from '@playwright/test';
import envConfig from '../global-env';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

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

export { expect };
