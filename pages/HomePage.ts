import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly profileIcon: Locator;

  constructor(private page: Page) {
    this.profileIcon = page.locator('#cbx-header-third-dropdown-user');
  }

  async verifyProfileIconIsVisible() {
    await expect(this.profileIcon).toBeVisible();
  }

  async validateHomePageIsOpened() {
    await expect(this.page).toHaveURL(/\/company\b/i);
    await this.verifyProfileIconIsVisible();
  }
}
