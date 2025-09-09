import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[id="restore-password-button"]');
  }

  async goto() {
    await this.page.goto('https://qa.ovac.dev.councilbox.com/admin', { waitUntil: 'networkidle' });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}