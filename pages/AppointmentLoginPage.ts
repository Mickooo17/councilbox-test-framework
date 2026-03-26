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

  constructor(private page: Page) {
    this.userButton = page.getByRole('button', { name: 'Button user' });
    this.accessAppointmentHeading = page.getByText('Access to the appointment');
    this.idNumberInput = page.locator('#id-number');
    this.refNumberInput = page.locator('#ref-number');
    this.continueAppointmentButton = page.getByRole('button', { name: 'Continue ' });
    this.appointmentIcon = page.locator('i').nth(2);
    // Setting up locators specific to this page exactly as they appear in the test steps
    this.privacyPolicyLink = page.locator('a').filter({ hasText: 'Privacy policy' });
    this.legalNoticeLink = page.locator('a').filter({ hasText: 'Legal notice and Terms and' });
  }

  async verifyAppointmentAccessElementsVisible() {
    await test.step('Verify appointment access login elements are visible', async () => {
      await expect(this.userButton).toBeVisible();
      await expect(this.accessAppointmentHeading).toBeVisible();
      await expect(this.idNumberInput).toBeVisible();
      await expect(this.refNumberInput).toBeVisible();
      await expect(this.continueAppointmentButton).toBeVisible();
      await expect(this.appointmentIcon).toBeVisible();
      await expect(this.privacyPolicyLink).toBeVisible();
      await expect(this.legalNoticeLink).toBeVisible();
    });
  }
}
