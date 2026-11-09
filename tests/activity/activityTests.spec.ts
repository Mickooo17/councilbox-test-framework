import { test } from '../fixtures';

test.describe('Activity & Dashboard Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.validateHomePageIsOpened();
  });

  test("On the 'Activity/Dashboard' page, verify the presence of the 'Data by Participant' tab @XR-3111 @smoke @regression", async ({ activityPage }) => {
    // 1. From the menu on the left, select "Activity"
    await activityPage.navigateToActivity();

    // 2. Verify the Activity page is accurately presented
    await activityPage.verifyActivityPageLoaded();

    // 3. Verify presence of "Data by Participant" tab at the top
    await activityPage.verifyDataByParticipantTabPresence();

    // 4. Click on "Data by Participant" tab and verify it is displayed
    await activityPage.clickDataByParticipantTab();
    await activityPage.verifyDataByParticipantTabIsDisplayed();
  });

  test("Search functionality on 'Data by Participant' tab with results and empty state @XR-3112 @regression", async ({ activityPage }) => {
    test.slow();

    // 1. Navigate to Activity from left menu
    await activityPage.navigateToActivity();
    await activityPage.verifyActivityPageLoaded();

    // 2. Click on "Data by Participant" tab
    await activityPage.clickDataByParticipantTab();
    await activityPage.verifyDataByParticipantTabIsDisplayed();

    // 3. Positive search: Search with existing TIN (12345678z) and verify results are displayed
    const existingTin = '12345678z';
    await activityPage.searchParticipant(existingTin);
    await activityPage.verifySearchResultsDisplayed(existingTin);

    // 4. Navigate back to search input
    await activityPage.clickBackFromSearchResults();
    await activityPage.verifyDataByParticipantTabIsDisplayed();

    // 5. Negative search: Search with random non-existent TIN and verify empty state message
    const randomNonExistentTin = `NON_EXISTENT_${Date.now()}`;
    await activityPage.searchParticipant(randomNonExistentTin);
    await activityPage.verifyNoResultsMessageDisplayed(randomNonExistentTin);
  });

  test("View related appointments for a specific participant on 'Data by Participant' tab @XR-3113 @regression", async ({ activityPage }) => {
    test.slow();

    // 1. From the menu on the left, select "Activity"
    await activityPage.navigateToActivity();

    // 2. The web application accurately presents the Activity page
    await activityPage.verifyActivityPageLoaded();

    // 3. At the top of the page, click on "Data by Participant"
    await activityPage.clickDataByParticipantTab();
    await activityPage.verifyDataByParticipantTabIsDisplayed();

    // 4. Enter the name, TIN, or surname into the input field, and then click on the "Search" button
    const participantTin = '12345678z';
    await activityPage.searchParticipant(participantTin);
    await activityPage.verifySearchResultsDisplayed(participantTin);

    // 5. Click on the desired participant and verify related appointments are displayed
    await activityPage.clickParticipantResult(participantTin);
    await activityPage.verifyParticipantAppointmentsDisplayed(participantTin);
  });

  test("Perform actions on participant appointments using the three dots button on 'Data by Participant' tab @XR-3114 @regression", async ({ activityPage }) => {
    test.slow();

    // 1. From the menu on the left, select "Activity"
    await activityPage.navigateToActivity();

    // 2. The web application accurately presents the Activity page
    await activityPage.verifyActivityPageLoaded();

    // 3. At the top of the page, click on "Data by Participant"
    await activityPage.clickDataByParticipantTab();
    await activityPage.verifyDataByParticipantTabIsDisplayed();

    // 4. Enter the name, TIN, or surname into the input field, and then click on the "Search" button
    const participantTin = '12345678z';
    await activityPage.searchParticipant(participantTin);
    await activityPage.verifySearchResultsDisplayed(participantTin);

    // 5. Click on the desired participant and verify related appointments are displayed
    await activityPage.clickParticipantResult(participantTin);
    await activityPage.verifyParticipantAppointmentsDisplayed(participantTin);

    // 6. Click on the three dots button on the appointment and verify actions menu
    await activityPage.openAppointmentActionsMenu(0);
    await activityPage.verifyAppointmentActionsMenuVisible();

    // 7. Perform Status action (opens Details dialog with status info) and close it
    await activityPage.performStatusAction();

    // 8. Re-open three dots menu and perform History action (opens History timeline dialog) and close it
    await activityPage.openAppointmentActionsMenu(0);
    await activityPage.performHistoryAction();

    // 9. Re-open three dots menu and perform Participants action (opens Attendees drawer panel) and close it
    await activityPage.openAppointmentActionsMenu(0);
    await activityPage.performParticipantsAction();
  });

  test("On the 'Data by Participant' tab, within the specific participant page, the 'Details' section is displayed for 'Completed' appointments @XR-3115 @regression", async ({ activityPage }) => {
    test.slow();

    // 1. From the menu on the left, select "Activity"
    await activityPage.navigateToActivity();

    // 2. The web application accurately presents the Activity page
    await activityPage.verifyActivityPageLoaded();

    // 3. At the top of the page, click on "Data by Participant"
    await activityPage.clickDataByParticipantTab();
    await activityPage.verifyDataByParticipantTabIsDisplayed();

    // 4. Enter the name, TIN, or surname into the input field, and then click on the "Search" button
    const participantTin = '12345678z';
    await activityPage.searchParticipant(participantTin);
    await activityPage.verifySearchResultsDisplayed(participantTin);

    // 5. Click on the desired participant who has completed appointments
    await activityPage.clickParticipantResult(participantTin, 'muhamed.adzamija@councilbox.com');

    // 6. Navigate to the completed appointment and click on the "Details" button
    await activityPage.openCompletedAppointmentDetails();

    // 7. Verify the "Details" section is displayed with accurate and correct data
    await activityPage.verifyCompletedAppointmentDetailsSection();
  });

  test('On the Dashboard page, the user can use the "Date" filter @XR-2686 @OVAC-5388 @smoke @regression', async ({ activityPage }) => {
    // 1. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 2. Select Date filter option (This week)
    await activityPage.selectDashboardDateFilter(/This week|Esta semana/i);

    // 3. Apply filter
    await activityPage.applyDashboardFilters();

    // 4. Verify selected date filter value
    await activityPage.verifyDashboardDateFilter(/This week|Esta semana/i);
  });

  test('The user can hover over the pie chart "Statuses” @XR-2408 @OVAC-5557 @regression', async ({ activityPage }) => {
    // 1. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 2. Hover mouse over Statuses pie chart
    await activityPage.hoverDashboardStatusesChart();
  });

  test('The user can hover over the pie chart "Most requested procedures” @XR-2407 @OVAC-5563 @regression', async ({ activityPage }) => {
    // 1. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 2. Hover mouse over Most requested procedures pie chart
    await activityPage.hoverDashboardProceduresChart();
  });

  test('The user can hover over points on the graphic of appointments @XR-2406 @OVAC-5564 @regression', async ({ activityPage }) => {
    // 1. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 2. Hover mouse over points on appointments graphic
    await activityPage.hoverDashboardAppointmentsGraphic();
  });

  test('The user has the ability to change the month on the "Dashboard" @XR-2405 @OVAC-5559 @regression', async ({ activityPage }) => {
    // 1. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 2. Change the displayed month/period
    await activityPage.modifyDashboardMonth();
  });

  test('From the dashboard page, the user can export appointments data @XR-2969 @OVAC-5278 @regression', async ({ activityPage }) => {
    // 1-3. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 4. Click EXPORT and select Appointments data, verify file download
    await activityPage.exportAppointmentsData();
  });

  test('On the dashboard page, the user can export a file with professionals for a specific time period @XR-2885 @OVAC-5596 @regression', async ({ activityPage }) => {
    // 1-3. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 4-10. Open Professionals export drawer, configure fields, and export file
    await activityPage.exportProfessionalsReport('Test Agent');
  });

  test('On the dashboard page, the user can export a file with participants for a specific time period @XR-2884 @OVAC-5587 @regression', async ({ activityPage }) => {
    // 1-3. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 4-8. Open Participants export drawer, enter TIN, select fields, and export file
    await activityPage.exportParticipantsReport('12345678Z');
  });

  test('The user can select the desired user from an "Assign" drop-down list @XR-2404 @OVAC-5561 @regression', async ({ activityPage }) => {
    // 1-5. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 6-7. Open Assign dropdown, select user, and apply filter
    await activityPage.selectDashboardAssignUser();
    await activityPage.applyDashboardFilters();
  });

  test('The user can filter the "Dashboard" using the drop-down list "All procedures" @XR-2403 @OVAC-5567 @regression', async ({ activityPage }) => {
    // 1-5. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 6-7. Open All procedures dropdown, select procedure, and apply filter
    await activityPage.selectDashboardProcedureFilter();
    await activityPage.applyDashboardFilters();
  });

  test('The user can filter the "Dashboard" using the drop-down list "All entities" @XR-2402 @OVAC-5565 @regression', async ({ activityPage }) => {
    // 1-5. Navigate to Dashboard
    await activityPage.navigateToDashboardCouncils();

    // 6-7. Open All entities dropdown, select entity, and apply filter
    await activityPage.selectDashboardEntityFilter();
    await activityPage.applyDashboardFilters();
  });
});



