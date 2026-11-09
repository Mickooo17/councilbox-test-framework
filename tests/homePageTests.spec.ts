import * as f from './fixtures';
import { expect } from '@playwright/test';
import { resolveCompanyUrl } from '../utils/UrlHelper';

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

  f.test('Only the Super administrator and Administrator can configure the organization/entity from the "Account" icon @XR-2521 @OVAC-5603 @smoke @regression', async ({ homePage, page }) => {
    // 1. Click on Account icon in header
    await homePage.openAccountMenu();

    // 2. Verify organization/entity configuration option is displayed for administrator
    await homePage.verifyOrganizationConfigOptionVisible(true);

    // 3. Click organization configuration option
    await homePage.clickOrganizationConfigOption();

    // 4. Verify user is redirected to organization configuration page
    await expect(page).toHaveURL(/.*\/companies\/edit\/.*/i, { timeout: 15000 });
  });

  f.test('The Professional and Calendar managers don\'t see the Organization/Entity configuration under the "Account" icon @XR-2522 @OVAC-5600 @regression', async ({ homePage, page }) => {
    // 1. Simulate non-admin role (Professional)
    await homePage.simulateUserRole('professional');

    // 2. Open Account dropdown menu
    await homePage.openAccountMenu();

    // 3. Verify organization/entity configuration option is NOT displayed for Professional
    await homePage.verifyOrganizationConfigOptionVisible(false);

    // 4. Verify common options (Support, End session) are still displayed
    const menu = page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown').first();
    await expect(menu.getByText(/Support|Soporte/i)).toBeVisible();
    await expect(menu.getByText(/End session|Cerrar sesión|Logout/i)).toBeVisible();
  });

  f.test("The organization or entity's logo should to be shown at the top of the all pages @XR-2886 @OVAC-5359 @regression", async ({ homePage, page }) => {
    // 1-2. Verify home page loaded with logo
    await homePage.verifyHeaderLogoVisible();

    // 3-8. Verify logo visible at top across core sections: Dashboard, Activity, Procedures, Templates, Users
    const routes = [
      'activity/dashboardCouncils',
      'activity',
      'procedures',
      'drafts',
      'users'
    ];

    for (const route of routes) {
      await page.goto(resolveCompanyUrl(1112, route), { waitUntil: 'domcontentloaded' });
      await homePage.dismissToastOrModal();
      await homePage.verifyHeaderLogoVisible();
    }
  });
});
