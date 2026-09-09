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

  async hoverAccountIcon() {
    await test.step('Hover over Account icon in header', async () => {
      await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
      await this.profileIcon.hover();
    });
  }

  async verifyRoleDisplayedOnHover(expectedRolePattern: RegExp = /administrator|admin|super administrator|global administrator|professional|calendar manager/i) {
    await test.step('Verify user role is displayed when hovering over Account icon', async () => {
      const tooltip = this.page.locator('.cbx-tooltip-options-container, [class*="cbx-tooltip"]').first();
      await expect(tooltip).toBeVisible({ timeout: 5000 });
      await expect(tooltip).toContainText(expectedRolePattern, { timeout: 5000 });
    });
  }
}
