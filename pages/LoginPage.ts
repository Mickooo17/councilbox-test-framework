import { Page, Locator, expect, test } from '@playwright/test';

export type LanguageOption = 'Español' | 'Català' | 'Galego' | 'Euskera' | 'English' | 'Valencià' | 'Italiano';

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
  readonly languageDropdownButton: Locator;
  readonly spanishOption: Locator;
  readonly catalanOption: Locator;
  readonly englishOption: Locator;

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
    this.languageDropdownButton = page.locator('i.bi-globe, .bi-globe, [class*="bi-globe"], .language-selector, #language-selector').first();
    this.spanishOption = page.getByRole('option', { name: /Español|Spanish|ES/i }).or(page.getByText(/Español|Spanish|ES/i)).first();
    this.catalanOption = page.getByRole('option', { name: /Català|Catalan|CA/i }).or(page.getByText(/Català|Catalan|CA/i)).first();
    this.englishOption = page.getByRole('option', { name: /English|EN/i }).or(page.getByText(/English|EN/i)).first();
  }

  async login(username: string, password: string, expectSuccess = true) {
    await test.step(`Login as ${username}`, async () => {
      // Check if already on dashboard / authenticated via API session
      const isAlreadyOnDashboard = await this.page.waitForURL(/\/company|\/admin\b/i, { timeout: 2500 }).then(() => true).catch(() => false);
      if (isAlreadyOnDashboard) {
        console.log(`[login] Page is already authenticated, skipping UI login form.`);
        return;
      }

      const isUsernameVisible = await this.usernameInput.isVisible({ timeout: 2000 }).catch(() => false);
      if (!isUsernameVisible && (this.page.url().includes('/company') || this.page.url().includes('/admin'))) {
        console.log(`[login] Page is already on company/admin dashboard, skipping UI login form.`);
        return;
      }

      await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
      if (expectSuccess) {
        await expect(this.page).toHaveURL(/\/company|\/admin\b/i, { timeout: 20000 });
      }
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

  async selectLanguage(lang: LanguageOption) {
    await test.step(`Click globe icon in top right and select language "${lang}"`, async () => {
      if (!this.page.url().endsWith('/login')) {
        await this.page.goto('https://qa.ovac.pre.councilbox.com/login', { waitUntil: 'domcontentloaded' });
      }
      const globeIcon = this.page.locator('.ri-global-line, i.ri-global-line, [class*="ri-global"]').first();
      await globeIcon.waitFor({ state: 'visible', timeout: 10000 });
      await globeIcon.click();

      const option = this.page.getByText(lang, { exact: true }).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
    });
  }

  async verifyLanguageSelected(lang: LanguageOption) {
    await test.step(`Verify login page content is translated to "${lang}"`, async () => {
      const expectedTexts: Record<LanguageOption, RegExp> = {
        Español: /Acceso|CONTINUAR|Política de privacidad|Aviso legal/i,
        Català: /Accés|CONTINUAR|Política de privacitat|Avís legal/i,
        Galego: /Acceso|CONTINUAR|Política de privacidade|Aviso legal/i,
        Euskera: /Sarrera|JARRAITU|Pribatutasun-politika|Lege-oharra/i,
        English: /Access|CONTINUE|Privacy policy|Legal notice/i,
        Valencià: /Accés|CONTINUAR|Política de privacitat|Avís legal/i,
        Italiano: /Accesso|CONTINUA|Informativa sulla privacy|Note legali/i,
      };

      const regex = expectedTexts[lang] || /Access|CONTINUE|Privacidad|Privacitat/i;
      await expect(this.page.locator('body')).toContainText(regex);
    });
  }

  async verifySpanishLanguageContent() {
    await this.verifyLanguageSelected('Español');
  }

  async verifyScrollIsRemoved() {
    await test.step('Verify vertical scroll is removed from login page', async () => {
      const scrollInfo = await this.page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        return {
          scrollHeight: Math.max(doc.scrollHeight, body.scrollHeight),
          clientHeight: Math.max(doc.clientHeight, window.innerHeight),
        };
      });

      const hasVerticalScrollbar = scrollInfo.scrollHeight > scrollInfo.clientHeight + 5;
      expect(hasVerticalScrollbar, `Login page should not have vertical scrollbar (scrollHeight: ${scrollInfo.scrollHeight}, clientHeight: ${scrollInfo.clientHeight})`).toBe(false);
    });
  }
}
