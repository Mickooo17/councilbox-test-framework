import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

f.test.describe('Account Menu - Support Modal Tests', () => {
    f.test.beforeEach(async ({ homePage }) => {
        await homePage.validateHomePageIsOpened();
    });

    f.test('From the account menu, users have the option to send messages to the support team @XR-3028 @smoke @regression', async ({ supportPage }) => {
        const supportMessage = DataGenerator.randomSupportMessage();

        // 1. Open Support modal from the user account menu in the header
        await supportPage.openSupportModalFromUserMenu();

        // 2. Fill message and click Send
        await supportPage.sendSupportMessage(supportMessage);

        // 3. Verify success alert "The message has been successfully sent."
        await supportPage.verifyMessageSentAlert();
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
