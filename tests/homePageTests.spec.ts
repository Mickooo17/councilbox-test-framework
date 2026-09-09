import * as f from './fixtures';
import { expect } from '@playwright/test';

/**
 * Home Page Test Suite
 * Contains all tests related to home page functionality
 */

f.test.describe('HomePage - Navigation Tests', () => {
  f.test.beforeEach(async ({ homePage }) => {
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
  f.test.beforeEach(async ({ homePage }) => {
    await homePage.validateHomePageIsOpened();
  });

  f.test('should have accessible profile dropdown @regression', async ({ homePage }) => {
    // Assert
    const profileIcon = homePage.profileIcon;
    await expect(profileIcon).toBeVisible();
    await expect(profileIcon).toBeEnabled();
  });

  f.test('The user\'s role is displayed when you hover over the "Account" icon @XR-2524 @smoke @regression', async ({ homePage }) => {
    // 1. Hover over the "Account" icon in the header
    await homePage.hoverAccountIcon();

    // 2. Verify the user's role is displayed in the tooltip [Super administrator/Administrator/Professional/Calendar manager]
    await homePage.verifyRoleDisplayedOnHover(/administrator|admin|super administrator|global administrator|professional|calendar manager/i);
  });
});
