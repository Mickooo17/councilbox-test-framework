import {Page, Locator} from '@playwright/test';

export class HomePage {
  readonly profileIcon: Locator;

  constructor(private page: Page) {
    this.profileIcon = page.locator('#cbx-header-third-dropdown-user');
  }

    async verifyProfileIconIsVisible() {
      await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
    }

    async validateHomePageIsOpened() {
        await this.page.url().includes('/company');
        await this.verifyProfileIconIsVisible();
    }
}