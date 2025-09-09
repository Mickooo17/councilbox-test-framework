import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from './fixtures';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
});

test('Verify user is able to login to the page @smoke @regression', async ({ page }) => {
  await loginPage.goto();
  await loginPage.login(loginData.adminProfessional.username, loginData.adminProfessional.password);
  await homePage.validateHomePageIsOpened();
});
