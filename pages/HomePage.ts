import { Page, Locator, expect, test } from '@playwright/test';

export class HomePage {
  readonly profileIcon: Locator;

  constructor(private page: Page) {
    this.profileIcon = page.locator('#cbx-header-third-dropdown-user')
      .or(page.getByRole('button', { name: 'Actions Button' }).first())
      .or(page.locator('header button:has(img)'))
      .or(page.locator('[class*="dropdown-user"]'))
      .or(page.locator('.ri-user-line, i[class*="user"], [class*="user-icon"]'))
      .or(page.locator('header [class*="avatar"], header [class*="user"], header [class*="profile"]'))
      .or(page.locator('.ri-government-line, [class*="government"]'))
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

      // Dismiss any toast or modal if visible
      const closeBtn = this.page.locator(`
        .MuiButtonBase-root.MuiIconButton-root.closeIcon,
        button.closeIcon,
        [class*="toast"] button,
        [class*="snackbar"] button,
        button[aria-label="close" i],
        button[aria-label="Close" i],
        .ri-close-line,
        i.ri-close-line,
        button:has(.ri-close-line),
        button:has(i.ri-close-line)
      `).first();
      if (await closeBtn.isVisible({ timeout: 2500 }).catch(() => false)) {
        await closeBtn.click().catch(() => {});
      }
    });
  }
}
