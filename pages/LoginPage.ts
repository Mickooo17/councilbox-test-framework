import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[id="restore-password-button"]');
    this.loginErrorMessage = page.getByText('This field is required.');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateErrorMessage(expectedMessage = 'This field is required.') {
    const errorCount = await this.loginErrorMessage.count();
    expect(errorCount, 'Expected at least one validation error to be shown').toBeGreaterThan(0);

    for (let i = 0; i < errorCount; i += 1) {
      const errorLocator = this.loginErrorMessage.nth(i);
      await expect(errorLocator).toBeVisible();
      if (expectedMessage) {
        await expect(errorLocator).toContainText(expectedMessage);
      }
    }
  }
} 