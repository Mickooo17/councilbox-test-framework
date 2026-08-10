import { Page, Locator, expect, test } from '@playwright/test';

export class AppointmentLoginPage {
  readonly userButton: Locator;
  readonly accessAppointmentHeading: Locator;
  readonly idNumberInput: Locator;
  readonly refNumberInput: Locator;
  readonly continueAppointmentButton: Locator;
  readonly appointmentIcon: Locator;
  readonly privacyPolicyLink: Locator;
  readonly legalNoticeLink: Locator;
  readonly invalidCredentialsError: Locator;

  constructor(private page: Page) {
    this.userButton = page.getByRole('button', { name: /Button user|user/i }).or(page.locator('button:has(.ri-user-line)'));
    this.accessAppointmentHeading = page.getByText(/Access|Acceso/i, { exact: false });
    this.idNumberInput = page.locator('#id-number');
    this.refNumberInput = page.locator('#ref-number');
    this.continueAppointmentButton = page.getByRole('button', { name: /Continue|Continuar/i });
    this.appointmentIcon = page.locator('i').nth(2);
    // Setting up locators specific to this page exactly as they appear in the test steps
    this.privacyPolicyLink = page.locator('a').filter({ hasText: /Privacy policy|Política de privacidad/i });
    this.legalNoticeLink = page.locator('a').filter({ hasText: /Legal notice|Aviso legal/i });
    this.invalidCredentialsError = page.getByText(/Invalid credentials|Credenciales no válidas/i).or(page.getByRole('alert')).or(page.locator('.MuiAlert-root, [class*="alert"]'));
  }

  async verifyAppointmentAccessElementsVisible() {
    await test.step('Verify appointment access login elements are visible', async () => {
      await expect(this.idNumberInput).toBeVisible({ timeout: 15000 });
      await expect(this.refNumberInput).toBeVisible({ timeout: 15000 });
      await expect(this.continueAppointmentButton).toBeVisible({ timeout: 15000 });
      await expect(this.accessAppointmentHeading.first()).toBeVisible({ timeout: 15000 });
      await expect(this.privacyPolicyLink.first()).toBeVisible({ timeout: 15000 });
      await expect(this.legalNoticeLink.first()).toBeVisible({ timeout: 15000 });
    });
  }

  async fillAppointmentLoginCredentials(idNumber: string, refNumber: string) {
    await test.step(`Fill appointment login credentials (ID: ${idNumber}, Ref: ${refNumber})`, async () => {
      await this.idNumberInput.fill(idNumber);
      await this.refNumberInput.fill(refNumber);
    });
  }

  async clickContinueButton() {
    await test.step('Click Continue button', async () => {
      await this.continueAppointmentButton.click();
    });
  }

  async verifyInvalidCredentialsErrorMessage(expectedText = 'Invalid credentials') {
    await test.step(`Verify invalid credentials error message: "${expectedText}"`, async () => {
      await expect(this.invalidCredentialsError.first()).toBeVisible({ timeout: 10000 });
      if (expectedText) {
        await expect(this.invalidCredentialsError.first()).toContainText(expectedText);
      }
    });
  }
}
