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
});
