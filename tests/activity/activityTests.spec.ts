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
});
