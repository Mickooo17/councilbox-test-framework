import { Page, Locator, expect, test } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly loginErrorMessageInvalid: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[id="restore-password-button"]');
    this.loginErrorMessage = page.getByText('This field is required.');
    this.loginErrorMessageInvalid = page.getByText('Username or password incorrect. You have 10 attempts remaining.');
  }

  async login(username: string, password: string) {
    await test.step('Login with credentials', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    });
  }

  async validateErrorMessage(expectedMessage = 'This field is required.') {
    await test.step(`Validate error message: "${expectedMessage}"`, async () => {
      const errorCount = await this.loginErrorMessage.count();
      expect(errorCount, 'Expected at least one validation error to be shown').toBeGreaterThan(0);

      for (let i = 0; i < errorCount; i += 1) {
        const errorLocator = this.loginErrorMessage.nth(i);
        await expect(errorLocator).toBeVisible();
        if (expectedMessage) {
          await expect(errorLocator).toContainText(expectedMessage);
        }
      }
    });
  }

  async validateErrorMessageForInvalidCredentials(expectedMessage = 'Username or password incorrect.') {
    await test.step(`Validate invalid credentials error: "${expectedMessage}"`, async () => {
      await expect(this.loginErrorMessageInvalid).toBeVisible();
      await expect(this.loginErrorMessageInvalid).toContainText(expectedMessage);
    });
  }
}