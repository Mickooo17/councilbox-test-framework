import * as f from '../fixtures';

f.test.describe('Support Modal - Message Character Limit Validation', () => {
    f.test.beforeEach(async ({ homePage }) => {
        await homePage.validateHomePageIsOpened();
    });

    f.test('It should not be possible to write message with more than 500 characters in the support modal @XR-3085 @smoke @regression', async ({ supportPage }) => {
        // 1. Click user account icon and open Support modal
        await supportPage.openSupportModalFromUserMenu();

        // 2. Attempt to input a message with more than 500 characters (550 characters)
        const longMessage = 'A'.repeat(550);
        await supportPage.fillMessage(longMessage);

        // 3. Verify message is capped at maximum 500 characters and maxlength attribute is 500
        await supportPage.verifyMessageCharacterLimit(500);

        // 4. Verify character counter displays 500/500
        await supportPage.verifyCharacterCounter('500/500');

        // 5. Close modal
        await supportPage.closeSupportModal();
    });
});
