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

  /**
   * Test Case XR-3139:
   * Verify that first and last name is displayed in the calendar with the name of Procedure - Calendar View
   *
   * Flow:
   * 1. Create a fresh appointment for today/upcoming via API with specific participant and procedure.
   * 2. Navigate to Appointments module (`/company/1112`).
   * 3. Click on the "Calendar view" icon.
   * 4. Verify that the procedure in calendar shows: First Name + Last Name (or Name Surname) + Procedure Name.
   */
  test('Verify that first and last name is displayed in calendar with procedure name - Calendar View @XR-3139 @regression', async ({
    appointmentsPage,
    request,
  }) => {
    const participant = {
      name: 'Ammar',
      surname: 'Micijevic',
      email: 'ammar.micijevic@councilbox.com',
      dni: 'ammarpass',
      idCardType: 'passport',
    };
    const procedureTitle = 'ALL in ONE';

    // Set appointment date for today at upcoming hour so it appears in daily/current calendar view
    const appointmentDate = new Date();
    appointmentDate.setHours(appointmentDate.getHours() + 2, 0, 0, 0);

    // 1. Create appointment via API
    let createdAppointment: any;
    await test.step('Create appointment via API', async () => {
      createdAppointment = await AppointmentApiHelper.createAppointment(request, {
        companyId: 1112,
        procedureId: 3524,
        procedureTitle: procedureTitle,
        dateStart: appointmentDate,
        participant: participant,
        observations: 'XR-3139 Calendar View Verification',
      });

      expect(createdAppointment).toBeDefined();
      expect(createdAppointment.id).toBeGreaterThan(0);
    }, {
      subtitle: `Create appointment for today at ${appointmentDate.toLocaleTimeString()} with ${participant.name} ${participant.surname}`,
    });

    // 2. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 3. Switch to Calendar View
    await appointmentsPage.switchToCalendarView();

    // 4. Verify appointment in Calendar View contains first/last name and procedure name
    const participantFullName = `${participant.name} ${participant.surname}`;
    await appointmentsPage.verifyAppointmentInCalendarView(participantFullName, procedureTitle);
  });

  /**
   * Test Case XR-3445:
   * Verify comment field in cancel appointment confirmation modal is required
   *
   * Flow:
   * 1. Create a fresh appointment via GraphQL API (`AppointmentApiHelper.createAppointment`).
   * 2. Navigate to Appointments page (`/company/1112`).
   * 3. Search for the appointment by unique ID.
   * 4. Open cancel appointment modal from row action menu.
   * 5. Verify Observations field has mandatory asterisk label (`Observations*`).
   * 6. Attempt to submit with empty Observations field and assert validation error appears ("Required") and modal stays open.
   * 7. Fill Observations field with cancellation comment and confirm cancellation.
   */
  test('Verify comment field in cancel appointment confirmation modal is required @XR-3445 @regression', async ({
    appointmentsPage,
    request,
  }) => {
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
        observations: 'XR-3445 Cancel Modal Validation Test',
      });

      expect(createdAppointment).toBeDefined();
      expect(createdAppointment.id).toBeGreaterThan(0);
    }, {
      subtitle: 'GraphQL createAppointment mutation for company 1112 and procedure 3524',
    });

    const appointmentId = createdAppointment.id;

    // 2. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 3. Search for appointment by ID
    await appointmentsPage.searchAppointment(appointmentId);

    // 4. Open cancel appointment modal from row action menu
    await appointmentsPage.openCancelAppointmentModal(appointmentId);

    // 5. Verify Observations field is required and displays error on empty submission
    await appointmentsPage.verifyCancelModalObservationsRequired();

    // 6. Fill cancel observations and confirm cancellation
    await appointmentsPage.fillCancelObservationsAndConfirm('Canceled via automated test for XR-3445 verification');
  });
});

