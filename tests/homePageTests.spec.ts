import * as f from './fixtures';
import { expect } from '@playwright/test';

/**
 * Home Page Test Suite
 * Contains all tests related to home page functionality
 */

f.test.describe('HomePage - Navigation Tests', () => {
  f.test.beforeEach(async ({ loginPage, homePage }) => {
    // Login before each test in this suite
    await loginPage.login(f.adminProfessionalUser.username, f.adminProfessionalUser.password);
    await homePage.validateHomePageIsOpened();
  });

  f.test('should load home page after successful login @smoke', async ({ homePage }) => {
    // Assert
    await homePage.validateHomePageIsOpened();
  });

  f.test('should display profile icon on home page @smoke @regression', async ({ homePage }) => {
    // Assert
    await homePage.verifyProfileIconIsAccessible();
  });
});

f.test.describe('HomePage - User Profile Tests', () => {
  f.test.beforeEach(async ({ loginPage, homePage }) => {
    // Login before each test in this suite
    await loginPage.login(f.adminProfessionalUser.username, f.adminProfessionalUser.password);
    await homePage.validateHomePageIsOpened();
  });

  f.test('should have accessible profile dropdown @regression', async ({ homePage }) => {
    // Assert
    const profileIcon = homePage.profileIcon;
    await expect(profileIcon).toBeVisible();
    await expect(profileIcon).toBeEnabled();
  });
});
