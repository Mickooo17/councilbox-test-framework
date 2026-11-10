import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly profileIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.profileIcon = page.locator('#cbx-header-third-dropdown-user')
      .or(page.getByRole('button', { name: 'Actions Button' }).first())
      .or(page.locator('header button:has(img)'))
      .or(page.locator('[class*="dropdown-user"]'))
      .first();
  }

  async verifyProfileIconIsAccessible() {
    await test.step('Verify profile icon is accessible', async () => {
      await expect(this.profileIcon).toBeVisible({ timeout: 15000 });
      await expect(this.profileIcon).toBeEnabled();
    });
  }

  async validateHomePageIsOpened() {
    await test.step('Validate home page is opened', async () => {
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/company') && !currentUrl.includes('/admin')) {
        await expect(this.page).toHaveURL(/\/company|\/admin/i, { timeout: 15000 });
      }
      await this.verifyProfileIconIsAccessible();
      await this.dismissToastOrModal();
    });
  }

  async verifyHeaderLogoVisible() {
    await test.step('Verify entity/organization logo is visible at the top of the page', async () => {
      const logo = this.page.locator('header img, #cbx-header-third-logo-right, img[alt*="Logo"]').first();
      await expect(logo).toBeVisible({ timeout: 10000 });
    });
  }

  async hoverAccountIcon() {
    await test.step('Hover over Account icon in header', async () => {
      await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
      await this.profileIcon.hover();
    });
  }

  async openAccountMenu() {
    await test.step('Open Account dropdown menu', async () => {
      await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
      await this.profileIcon.click();
      await this.page.waitForTimeout(500);
    });
  }

  async verifyOrganizationConfigOptionVisible(shouldBeVisible: boolean = true) {
    await test.step(`Verify organization/entity configuration option in account menu is ${shouldBeVisible ? 'visible' : 'hidden'}`, async () => {
      const orgOption = this.page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown')
        .getByText(/Grupo Castelar|Organization|Organisation|Entidad|Organización/i)
        .first();

      if (shouldBeVisible) {
        await expect(orgOption).toBeVisible({ timeout: 5000 });
      } else {
        await expect(orgOption).not.toBeVisible({ timeout: 5000 });
      }
    });
  }

  async clickOrganizationConfigOption() {
    await test.step('Click organization configuration option in account menu', async () => {
      const orgOption = this.page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown')
        .getByText(/Grupo Castelar|Organization|Organisation|Entidad|Organización/i)
        .first();
      await expect(orgOption).toBeVisible({ timeout: 5000 });
      await orgOption.click();
      await this.page.waitForURL(/.*\/companies\/edit\/.*/i, { timeout: 15000 });
    });
  }

  async clickSignOff() {
    await test.step('Click Sign off button in account menu', async () => {
      // Intercept Logout mutation to prevent invalidating shared session for parallel test workers
      await this.page.route('**/graphql', async (route) => {
        const postData = route.request().postDataJSON();
        if (postData?.operationName === 'Logout') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: { logout: { success: true, __typename: 'LogoutResponse' } } }),
          });
        } else {
          await route.continue();
        }
      });

      const signOffBtn = this.page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown')
        .getByText(/End session|Cerrar sesión|Sign off|Log out/i)
        .or(this.page.getByRole('menuitem', { name: /End session|Cerrar sesión|Sign off|Log out/i }))
        .first();
      await expect(signOffBtn).toBeVisible({ timeout: 5000 });
      await signOffBtn.click();
      await this.page.waitForURL(/.*(\/login|\/admin)/i, { timeout: 15000 });
      await expect(this.page).toHaveURL(/.*(\/login|\/admin)/i);
      await expect(this.page.getByRole('heading', { name: /Login/i }).or(this.page.getByRole('button', { name: /Access|Acceder/i })).first()).toBeVisible({ timeout: 10000 });
    });
  }

  async verifyRoleDisplayedOnHover(expectedRolePattern: RegExp = /administrator|admin|super administrator|global administrator|professional|calendar manager/i) {
    await test.step('Verify user role is displayed when hovering over Account icon', async () => {
      const tooltip = this.page.locator('.cbx-tooltip-options-container, [class*="cbx-tooltip"]').first();
      await expect(tooltip).toBeVisible({ timeout: 5000 });
      await expect(tooltip).toContainText(expectedRolePattern, { timeout: 5000 });
    });
  }

  /**
   * Simulates a user role (e.g. 'professional' or 'calendarManager') via GraphQL interception (XR-2522).
   */
  async simulateUserRole(role: 'professional' | 'calendarManager' | 'admin' | 'superadmin') {
    await test.step(`Simulate user role as "${role}" via GraphQL interception`, async () => {
      await this.page.route('**/graphql', async route => {
        const postData = route.request().postDataJSON();
        if (postData?.operationName === 'Me') {
          const response = await route.fetch();
          const json = await response.json();
          if (json?.data?.me) {
            json.data.me.roles = role;
          }
          await route.fulfill({ json });
        } else if (postData?.operationName === 'UserCompanies') {
          const response = await route.fetch();
          const json = await response.json();
          if (json?.data?.paginatedUserCompanies?.list) {
            json.data.paginatedUserCompanies.list.forEach((item: any) => {
              item.role = role;
            });
          }
          await route.fulfill({ json });
        } else {
          await route.continue();
        }
      });
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await this.dismissToastOrModal();
    });
  }
}
