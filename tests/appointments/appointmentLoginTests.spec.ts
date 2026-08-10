import * as f from '../fixtures';

// Force unauthenticated browser context for appointment login tests
f.test.use({ storageState: { cookies: [], origins: [] } });

/**
 * Appointment Access / Login Test Suite
 * Validates error handling for invalid credentials when accessing an appointment via /login
 * Covers Jira issues: XR-2281, XR-2282, and XR-2284
 */

f.test.describe('Appointment Login - Access Validation Tests', () => {
  f.test.beforeEach(async ({ page }) => {
    // Navigate specifically to /login page for appointment access
    await page.goto('https://qa.ovac.pre.councilbox.com/login');
  });

  f.test('Verify user cannot access appointment with invalid ID @XR-2281 @smoke @regression', async ({ appointmentLoginPage }) => {
    // Assert page elements are visible
    await appointmentLoginPage.verifyAppointmentAccessElementsVisible();

    // Act - Fill invalid DNI / ID number with valid ref format
    await appointmentLoginPage.fillAppointmentLoginCredentials('INVALID_ID_999', 'REF123456');
    await appointmentLoginPage.clickContinueButton();

    // Assert - Error message / toast is displayed
    await appointmentLoginPage.verifyInvalidCredentialsErrorMessage();
  });

  f.test('Verify user cannot access appointment with invalid reference number @XR-2282 @smoke @regression', async ({ appointmentLoginPage }) => {
    // Assert page elements are visible
    await appointmentLoginPage.verifyAppointmentAccessElementsVisible();

    // Act - Fill valid DNI / ID format with invalid reference number
    await appointmentLoginPage.fillAppointmentLoginCredentials('12345678Z', 'INVALID_REF_999');
    await appointmentLoginPage.clickContinueButton();

    // Assert - Error message / toast is displayed
    await appointmentLoginPage.verifyInvalidCredentialsErrorMessage();
  });

  f.test('Verify user cannot access appointment with invalid code @XR-2284 @smoke @regression', async ({ appointmentLoginPage }) => {
    // Assert page elements are visible
    await appointmentLoginPage.verifyAppointmentAccessElementsVisible();

    // Act - Fill valid format DNI with invalid verification code
    await appointmentLoginPage.fillAppointmentLoginCredentials('00000000X', '000000');
    await appointmentLoginPage.clickContinueButton();

    // Assert - Error message / toast is displayed
    await appointmentLoginPage.verifyInvalidCredentialsErrorMessage();
  });

  f.test('Verify user cannot access appointment with invalid ID, reference number or code @XR-2281 @XR-2282 @XR-2284 @regression', async ({ appointmentLoginPage }) => {
    // Act & Assert - Combined verification for invalid appointment login credentials
    await appointmentLoginPage.verifyAppointmentAccessElementsVisible();
    await appointmentLoginPage.fillAppointmentLoginCredentials('00000000X', 'INVALID_REF_999');
    await appointmentLoginPage.clickContinueButton();
    await appointmentLoginPage.verifyInvalidCredentialsErrorMessage();
  });
});
