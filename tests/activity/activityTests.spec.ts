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
});


