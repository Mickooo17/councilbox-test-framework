import { Page, Locator } from '@playwright/test';

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
  }

    async validateErrorMessage() {

  const count = await this.loginErrorMessage.count();
  if (count === 0) {
    throw new Error('There are no error messages displayed.');
  }
  for (let i = 0; i < count; i++) {
    await this.loginErrorMessage.nth(i).waitFor({ state: 'visible', timeout: 5000 });
    }
  }
}