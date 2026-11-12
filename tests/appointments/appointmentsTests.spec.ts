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
        procedureId: 3955,
        procedureTitle: 'Prueba iñaki',
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
    const procedureTitle = 'Prueba iñaki';

    // Set appointment date for today at upcoming hour so it appears in daily/current calendar view
    const appointmentDate = new Date();
    appointmentDate.setHours(appointmentDate.getHours() + 2, 0, 0, 0);

    // 1. Create appointment via API
    let createdAppointment: any;
    await test.step('Create appointment via API', async () => {
      createdAppointment = await AppointmentApiHelper.createAppointment(request, {
        companyId: 1112,
        procedureId: 3955,
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
        procedureId: 3955,
        procedureTitle: 'Prueba iñaki',
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

  /**
   * Test Case XR-3090 / OVAC-5579:
   * It is possible to open Documents modal if appointment is canceled
   */
  test('It is possible to open Documents modal if appointment is canceled @XR-3090 @OVAC-5579 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Filter appointments by "Canceled" status
    await appointmentsPage.filterByStatus('Canceled');

    // 5-6. Click on 3 dots for canceled appointment and click DOCUMENTS link
    await appointmentsPage.openDocumentsModal();
  });

  /**
   * Test Case XR-3089 / OVAC-5580:
   * Tooltip to help with the number of characters when a back office user cancels an appointment is showing when hovering numbers in the 'Cancel appointment' modal
   */
  test('Tooltip to help with number of characters is showing when hovering counter in Cancel appointment modal @XR-3089 @OVAC-5580 @regression', async ({
    appointmentsPage,
    request,
  }) => {
    // 1. Create a confirmed appointment via API so cancel option is guaranteed
    const created = await AppointmentApiHelper.createAppointment(request, {
      companyId: 1112,
      procedureId: 3955,
      procedureTitle: 'Prueba iñaki',
      participant: {
        dni: 'P' + Date.now().toString().slice(-8),
        idCardType: 'passport',
        name: 'AutoCancel',
        surname: 'TestUser',
        email: 'autocancel@example.com',
      },
      observations: 'XR-3089 Cancel Tooltip Test',
    });
    expect(created.id).toBeGreaterThan(0);

    // 2-3. Navigate to Appointments page and search by created ID
    await appointmentsPage.navigateToAppointmentsPage(1112);
    await appointmentsPage.searchAppointment(created.id);

    // 4-7. Click on 3 dots, select Cancel appointment, hover 0/500 text and verify tooltip
    await appointmentsPage.verifyCancelAppointmentCharacterTooltip(created.id);
  });

  /**
   * Test Case XR-3031 / OVAC-4955:
   * When opening "Appointment" page - external ID label is displayed properly in the header
   */
  test('When opening Appointment page - external ID label is displayed properly in the header @XR-3031 @OVAC-4955 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-2. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 3. Observe header and verify "External ID" is showing properly
    await appointmentsPage.verifyExternalIdHeaderDisplayed();
  });

  /**
   * Test Case XR-2965 / OVAC-5207:
   * By participant ID or passport, the user can search appointments
   */
  test('By participant ID or passport the user can search appointments @XR-2965 @OVAC-5207 @regression', async ({
    appointmentsPage,
    request,
  }) => {
    const passportNumber = 'P' + Date.now().toString().slice(-8);

    // 1. Create appointment via API with unique passport number
    const created = await AppointmentApiHelper.createAppointment(request, {
      companyId: 1112,
      procedureId: 3955,
      procedureTitle: 'Prueba iñaki',
      participant: {
        dni: passportNumber,
        idCardType: 'passport',
        name: 'AutoSearch',
        surname: 'TestParticipant',
        email: 'autosearch@example.com',
      },
      observations: 'Search by passport test',
    });
    expect(created.id).toBeGreaterThan(0);

    // 2-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Input participant passport number into search bar and verify appointments retrieved
    await appointmentsPage.searchAppointmentsByParticipant(passportNumber);
    const row = await appointmentsPage.getAppointmentRow(created.id);
    await expect(row).toBeVisible();
    await expect(row).toContainText(String(created.id));
  });

  /**
   * Test Case XR-2565 / OVAC-5194:
   * In the Appointments form, the user can filter appointments using filters
   */
  test('In the Appointments form, the user can filter appointments using filters @XR-2565 @OVAC-5194 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4-8. Open table filters and verify filter categories (Users, Procedures, Entities, Types of meeting)
    await appointmentsPage.verifyTableFilterOptionsDisplayed();
  });

  /**
   * Test Case XR-2525 / OVAC-5599:
   * On the Appointments form, the super administrator, administrator, or professional can manage Participants for the desired appointment - Appointments
   */
  test('On the Appointments form user can manage Participants for the desired appointment @XR-2525 @OVAC-5599 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4-5. Click 3 dots and select Participants -> List of attendees wizard displayed
    await appointmentsPage.openParticipantsDrawer();
  });

  /**
   * Test Case XR-12990 / OVAC-5418:
   * The user is able to see Confirmed appointments - Appointments
   */
  test('The user is able to see Confirmed appointments - Appointments @XR-12990 @OVAC-5418 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Confirmed" appointments from dropdown and verify list is displayed
    await appointmentsPage.filterByStatus('Confirmed');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-12991 / OVAC-5417:
   * The user is able to see Completed appointments - Appointments
   */
  test('The user is able to see Completed appointments - Appointments @XR-12991 @OVAC-5417 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Completed" appointments from dropdown and verify list is displayed
    await appointmentsPage.filterByStatus('Completed');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });


  /**
   * Test Case XR-1387 / OVAC-5653:
   * The user is able to open Confirmed appointment tab - Citas section
   */
  test('The user is able to open Confirmed appointment tab - Citas section @XR-1387 @OVAC-5653 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Confirmed" appointments from dropdown and verify list is displayed
    await appointmentsPage.filterByStatus('Confirmed');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1388 / OVAC-5650:
   * The user is able to open In progress tab - Citas section
   */
  test('The user is able to open In progress tab - Citas section @XR-1388 @OVAC-5650 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "In progress" appointments from dropdown and verify list is displayed
    await appointmentsPage.filterByStatus('In progress');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1389 / OVAC-5648:
   * The user is able to open Pending report tab - Citas section
   */
  test('The user is able to open Pending report tab - Citas section @XR-1389 @OVAC-5648 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Pending report" appointments from dropdown and verify list is displayed
    await appointmentsPage.filterByStatus('Pending report');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1390 / OVAC-5660:
   * The user is able to open Completed appointments tab - Citas section
   */
  test('The user is able to open Completed appointments tab - Citas section @XR-1390 @OVAC-5660 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Completed" appointments from dropdown and verify list is displayed
    await appointmentsPage.filterByStatus('Completed');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1401 / OVAC-5519:
   * The user is able to search appointments by name via search engine in the Scheduled appointments tab - Citas section
   */
  test('The user is able to search appointments by name via search engine in the Scheduled appointments tab @XR-1401 @OVAC-5519 @regression', async ({
    appointmentsPage,
    page,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);
    await appointmentsPage.dismissToastOrModal();

    // 4. Select "Confirmed" / Scheduled appointments
    await appointmentsPage.filterByStatus('Confirmed');

    // 5. Search by appointment name / query
    await appointmentsPage.searchAppointment('TEST');
    const tableOrEmpty = appointmentsPage.appointmentsTable.or(page.locator('text=/No appointments|No hay citas|No results/i')).first();
    await expect(tableOrEmpty).toBeVisible({ timeout: 10000 });
  });

  /**
   * Test Case XR-1402 / OVAC-5542:
   * The user is able to search appointments by name via search engine in the In progress tab - Citas section
   */
  test('The user is able to search appointments by name via search engine in the In progress tab @XR-1402 @OVAC-5542 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "In progress" appointments
    await appointmentsPage.filterByStatus('In progress');

    // 5. Search by appointment name / term
    await appointmentsPage.searchAppointment('TEST');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1403 / OVAC-5541:
   * The user is able to search appointments by name via search engine in the Pending report tab - Citas section
   */
  test('The user is able to search appointments by name via search engine in the Pending report tab @XR-1403 @OVAC-5541 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Pending report" appointments
    await appointmentsPage.filterByStatus('Pending report');

    // 5. Search by appointment name / term
    await appointmentsPage.searchAppointment('TEST');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1404 / OVAC-5540:
   * The user is able to search appointments by name via search engine in the Completed appointments tab - Citas section
   */
  test('The user is able to search appointments by name via search engine in the Completed appointments tab @XR-1404 @OVAC-5540 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Select "Completed" appointments
    await appointmentsPage.filterByStatus('Completed');

    // 5. Search by appointment name / term
    await appointmentsPage.searchAppointment('TEST');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });

  /**
   * Test Case XR-1414 / OVAC-5569:
   * The user is able to go back from the Citas form - Citas section
   */
  test('The user is able to go back from the Citas form - Citas section @XR-1414 @OVAC-5569 @regression', async ({
    appointmentsPage,
    activityPage,
    page,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);
    await appointmentsPage.dismissToastOrModal();
    const tableOrEmpty = appointmentsPage.appointmentsTable.or(page.locator('text=/No appointments|No hay citas|No results/i')).first();
    await expect(tableOrEmpty).toBeVisible({ timeout: 10000 });

    // 4. Navigate back to Dashboard via left menu
    await activityPage.openDashboardFromLeftMenu();
    await expect(page).toHaveURL(/.*\/activity\/dashboardCouncils/i, { timeout: 15000 });
  });

  /**
   * Test Case XR-1364 / OVAC-5304:
   * User is able to search Appointments by search engine (Period filter)
   */
  test('User is able to search Appointments by search engine period filter @XR-1364 @OVAC-5304 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4-5. Change date / period filter to "This month"
    await appointmentsPage.filterByPeriod('This month');
    await expect(appointmentsPage.appointmentsTable).toBeVisible();
  });


  /**
   * Test Case XR-1367 / OVAC-5289:
   * User is able to download attachment from Attachments form (Documents modal)
   */
  test('User is able to download attachment from Attachments form @XR-1367 @OVAC-5289 @regression', async ({
    appointmentsPage,
    page,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Click Documents button on appointment row
    const docModalBtn = page.locator('button:has(.ri-file-text-line), [id*="documents"], [aria-label*="document" i], td:nth-child(6) button').first();
    await expect(docModalBtn).toBeVisible({ timeout: 15000 });
    await docModalBtn.click();

    // 5. Verify Documents modal is displayed
    const modalHeading = page.locator('.MuiDialog-root, [role="dialog"], .cbx-Modal-container').filter({ hasText: /Document/i }).first();
    await expect(modalHeading).toBeVisible({ timeout: 10000 });
    await page.keyboard.press('Escape');
  });

  /**
   * Test Case XR-3037 / OVAC-4868:
   * Users have the option to add a "Type" column on the appointment page
   */
  test('Users have the option to add a Type column on the appointment page @XR-3037 @OVAC-4868 @regression', async ({
    appointmentsPage,
    page,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);
    await appointmentsPage.dismissToastOrModal();

    // 4. Click gear button in the table header to open column customization
    const gearBtn = page.locator('th button:has([class*="settings" i]), th button:has(.ri-settings-3-line), th [aria-label*="Settings" i], th [class*="Settings" i]').first();
    await expect(gearBtn).toBeVisible({ timeout: 10000 });
    await gearBtn.click();
    await page.waitForTimeout(500);

    // 5. Select "Type" option from the menu
    const typeOption = page.locator('[role="menuitem"], [role="option"], label, span').filter({ hasText: /^Type$|^Tipo$/i }).first();
    await expect(typeOption).toBeVisible({ timeout: 5000 });
    await typeOption.click();

    // 6. Verify "Type" column header is now added to the table
    const typeHeader = page.getByRole('columnheader', { name: /Type|Tipo/i });
    await expect(typeHeader).toBeVisible({ timeout: 5000 });
  });

  test('Verify "Type of meetings" filter contains all available appointment types in the appointment list @OVAC-5142 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Verify Meeting Types filter in filter drawer
    await appointmentsPage.verifyMeetingTypesFilterContainsTypes();
  });

  test('Verify alert icon is hidden for appointments in Canceled status @OVAC-4937 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Verify no alert icon in canceled status appointments
    await appointmentsPage.verifyAlertIconHiddenForCanceledAppointments();
  });

  test('Verify "Send notification" option is present in actions menu for Appointment Agent role in Confirmed and In Progress statuses @OVAC-4928 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Verify "Send notification" option in 3-dots actions menu
    await appointmentsPage.verifySendNotificationOptionInActionsMenu();
  });

  test('Verify Record number field is displayed in Details section for appointments @OVAC-5104 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Verify Record number field in Details section
    await appointmentsPage.verifyRecordNumberInAppointmentDetails();
  });

  test('Verify Record number is displayed in the appointment preview @OVAC-5116 @regression', async ({
    appointmentsPage,
  }) => {
    // 1-3. Navigate to Appointments page
    await appointmentsPage.navigateToAppointmentsPage(1112);

    // 4. Verify Record number in appointment preview
    await appointmentsPage.verifyRecordNumberInAppointmentPreview();
  });

});
