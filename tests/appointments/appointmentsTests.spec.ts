import { test, expect } from '../fixtures';
import { AppointmentApiHelper } from '../../utils/appointments/AppointmentApiHelper';

test.describe('Appointments Management - Status Verification Tests', () => {
  /**
   * Test Case XR-3126:
   * When a user clicks on the "Status" section for a canceled appointment on the Appointments page,
   * the "Details" window appears.
   *
   * Flow:
   * 1. Create a fresh appointment via GraphQL API (`AppointmentApiHelper.createAppointment`).
   * 2. Cancel the appointment via GraphQL API (`AppointmentApiHelper.cancelAppointment`).
   * 3. Navigate to Appointments page (`/company/1112`).
   * 4. Filter or search for the canceled appointment.
   * 5. Click on the "Status" section of the canceled appointment.
   * 6. Verify the "Details" window appears with status, modified by, date, reason, and comments.
   */
  test('When user clicks Status for canceled appointment, Details window appears @XR-3126 @regression', async ({
    appointmentsPage,
    request,
  }) => {
    const cancelReason = 'unavailable';
    const cancelObservations = 'Canceled via automated test for XR-3126 verification';

    // 1. Create appointment via API
    let createdAppointment: any;
    await test.step('Create appointment via API', async () => {
      createdAppointment = await AppointmentApiHelper.createAppointment(request, {
        companyId: 1112,
        procedureId: 3524,
        procedureTitle: 'ALL in ONE',
        participant: {
          dni: 'ammarpass',
          idCardType: 'passport',
          name: 'Ammar',
          surname: 'Micijevic',
          email: 'ammar.micijevic@councilbox.com',
        },
        observations: 'XR-3126 Appointment creation',
      });

      expect(createdAppointment).toBeDefined();
      expect(createdAppointment.id).toBeGreaterThan(0);
    }, {
      subtitle: 'GraphQL createAppointment mutation for company 1112 and procedure 3524',
    });

    const appointmentId = createdAppointment.id;

    // 2. Cancel appointment via API
    await test.step(`Cancel appointment #${appointmentId} via API`, async () => {
      const canceled = await AppointmentApiHelper.cancelAppointment(request, appointmentId, {
        reason: cancelReason,
        message: cancelObservations,
      });
      expect(canceled).toBeTruthy();
    }, {
      params: { appointmentId, reason: cancelReason, message: cancelObservations },
      subtitle: 'GraphQL cancelAppointment mutation with reason and message',
    });

    // 3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Filter appointments by Canceled status to ensure row is visible
    await appointmentsPage.filterByStatus('Canceled');

    // 5. Search for the canceled appointment by its unique ID
    await appointmentsPage.searchAppointment(appointmentId);

    // 6. Click on the "Status" section for that appointment
    await appointmentsPage.clickAppointmentStatus(appointmentId);

    // 7. Verify the "Details" window appears with status, modified by, date, reason, and observations
    await appointmentsPage.verifyCanceledAppointmentDetailsWindow({
      canceledBy: 'Ammar Mičijević',
      reason: 'Unavailability',
      observations: cancelObservations,
      participantName: 'Ammar Micijevic',
    });
  });
});
