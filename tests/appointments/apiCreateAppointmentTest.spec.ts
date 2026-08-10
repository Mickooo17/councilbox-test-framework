import { test, expect } from '../fixtures';
import { AppointmentApiHelper } from '../../utils/appointments/AppointmentApiHelper';

test.describe('OVAC Appointment API Creation & UI Verification', () => {
  test('Create appointment via API and verify in UI by appointment ID @XR-API-APPOINTMENT', async ({ page, request }) => {
    // 1. Create appointment via API (automatically saved to AppointmentDataStore)
    const createdAppointment = await AppointmentApiHelper.createAppointment(request, {
      procedureId: 3524,
      procedureTitle: 'ALL in ONE',
      participant: {
        dni: 'ammarpass',
        idCardType: 'passport',
        name: 'Ammar',
        surname: 'Micijevic',
      },
      observations: 'Created via Automated Playwright API Test',
    });

    expect(createdAppointment).toBeDefined();
    expect(createdAppointment.id).toBeGreaterThan(0);

    const appointmentId = createdAppointment.id.toString();
    console.log(`[API Test] Successfully created Appointment ID: ${appointmentId}, Case: ${createdAppointment.caseNumber}`);

    // 2. Open UI and verify appointment exists in list
    await page.goto('https://qa.ovac.pre.councilbox.com/company/1112');

    // Search by Appointment ID
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(appointmentId);
    await searchInput.press('Enter');

    // Verify appointment row in UI
    const appointmentRow = page.locator('tr').filter({ hasText: appointmentId });
    await expect(appointmentRow).toBeVisible({ timeout: 10000 });
    await expect(appointmentRow).toContainText(appointmentId);
    await expect(appointmentRow).toContainText('QA DEV');
  });
});
