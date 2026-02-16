import { Page, Locator, expect, test } from '@playwright/test';

export class HomePage {
  readonly profileIcon: Locator;

  constructor(private page: Page) {
    this.profileIcon = page.locator('#cbx-header-third-dropdown-user');
  }

  async verifyProfileIconIsAccessible() {
    await test.step('Verify profile icon is accessible', async () => {
      await expect(this.profileIcon).toBeVisible();
      await expect(this.profileIcon).toBeEnabled();
    });
  }

  async validateHomePageIsOpened() {
    await test.step('Validate home page is opened', async () => {
      await this.verifyProfileIconIsAccessible();
      await expect(this.page).toHaveURL(/\/company\b/i, { timeout: 15000 });
    });
  }
}
