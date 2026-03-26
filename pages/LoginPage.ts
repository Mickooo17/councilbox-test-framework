import { Page, Locator, expect, test } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly loginErrorMessageInvalid: Locator;
  readonly passwordRecoveryLink: Locator;
  readonly passwordToggleButton: Locator;
  readonly privacyPolicyLink: Locator;
  readonly legalNoticeLink: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[id="restore-password-button"]');
    this.loginErrorMessage = page.getByText('This field is required.');
    this.loginErrorMessageInvalid = page.getByText('Username or password incorrect. You have 10 attempts remaining.');
    this.passwordRecoveryLink = page.locator('#restore-password-link');
    this.passwordToggleButton = page.getByLabel('Toggle password visibility');
    this.privacyPolicyLink = page.getByText('Privacy policy');
    this.legalNoticeLink = page.getByText('Legal notice and Terms and conditions of use');
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

  async clickPasswordRecoveryLink() {
    await test.step('Click password recovery link', async () => {
      await this.passwordRecoveryLink.click();
    });
  }

  async verifyPasswordRecoveryPage() {
    await test.step('Verify password recovery page is shown', async () => {
      await expect(this.page).toHaveURL(/forgetPwd/, { timeout: 10000 });
    });
  }

  async togglePasswordVisibility() {
    await test.step('Toggle password visibility', async () => {
      await this.passwordToggleButton.click();
    });
  }

  async verifyPasswordVisible() {
    await test.step('Verify password field is visible (type=text)', async () => {
      await expect(this.passwordInput).toHaveAttribute('type', 'text');
    });
  }

  async verifyPasswordHidden() {
    await test.step('Verify password field is hidden (type=password)', async () => {
      await expect(this.passwordInput).toHaveAttribute('type', 'password');
    });
  }

  async verifyFooterLinks() {
    await test.step('Verify footer links are present', async () => {
      await expect(this.privacyPolicyLink).toBeVisible();
      await expect(this.legalNoticeLink).toBeVisible();
    });
  }
}
