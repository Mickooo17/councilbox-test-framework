import { Page, Locator, expect, test } from '@playwright/test';

export class HomePage {
  readonly profileIcon: Locator;

  constructor(private page: Page) {
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
      if (!this.page.url().includes('/company')) {
        await expect(this.page).toHaveURL(/\/company\b/i, { timeout: 15000 });
      }
      await this.verifyProfileIconIsAccessible();
    });
  }
}
