import { test, expect } from '../fixtures';
import { AppointmentApiHelper } from '../../utils/appointments/AppointmentApiHelper';
import { AppointmentDataStore, CreatedAppointmentData } from '../../utils/appointments/AppointmentDataStore';

test.describe('OVAC Appointment API Creation & UI Verification Suite', () => {
  test.describe.configure({ mode: 'serial' });

  let createdAppointment: CreatedAppointmentData;

  test('1. Create appointment via API and save to DataStore @XR-API-APPOINTMENT-CREATE', async ({ request }) => {
    // Create appointment via API helper (saves directly to AppointmentDataStore)
    createdAppointment = await AppointmentApiHelper.createAppointment(request, {
      procedureId: 3524,
      procedureTitle: 'ALL in ONE',
      participant: {
        dni: 'ammarpass',
        idCardType: 'passport',
        name: 'Ammar',
        surname: 'Micijevic',
      },
      observations: 'Created for suite data sharing verification',
    });

    expect(createdAppointment).toBeDefined();
    expect(createdAppointment.id).toBeGreaterThan(0);
    expect(createdAppointment.caseNumber).toBeTruthy();

    console.log(`[Test 1] Created Appointment ID: ${createdAppointment.id}, Case: ${createdAppointment.caseNumber}`);
  });

  test('2. Retrieve created appointment from DataStore and verify in UI @XR-API-APPOINTMENT-UI', async ({ page }) => {
    // Retrieve the saved appointment from AppointmentDataStore
    const targetAppointment = createdAppointment || AppointmentDataStore.getLatestAppointment();
    expect(targetAppointment).not.toBeNull();

    const appointmentId = targetAppointment!.id.toString();
    console.log(`[Test 2] Verifying Appointment ID ${appointmentId} in UI...`);

    // Safely navigate to Appointments dashboard handling any initial page navigation interruptions
    const targetUrl = 'https://qa.ovac.pre.councilbox.com/company/1112';
    try {
      await page.goto(targetUrl);
    } catch (err: any) {
      if (err?.message?.includes('interrupted') || err?.message?.includes('ABORTED')) {
        await page.goto(targetUrl);
      } else {
        throw err;
      }
    }

    // Search by Appointment ID
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(appointmentId);
    await searchInput.press('Enter');

    // Verify appointment row is visible and displays correct ID and Entity
    const appointmentRow = page.locator('tr').filter({ hasText: appointmentId });
    await expect(appointmentRow).toBeVisible({ timeout: 10000 });
    await expect(appointmentRow).toContainText(appointmentId);
    await expect(appointmentRow).toContainText('QA DEV');
  });

  test('3. Verify all appointments stored in suite @XR-API-APPOINTMENT-STORE', async () => {
    const allStored = AppointmentDataStore.getAllAppointments();
    expect(allStored.length).toBeGreaterThan(0);

    const latest = AppointmentDataStore.getLatestAppointment();
    expect(latest).toBeDefined();
    expect(latest?.id).toBeGreaterThan(0);

    console.log(`[Test 3] Store contains ${allStored.length} appointment(s). Latest ID: ${latest?.id}`);
  });
});
