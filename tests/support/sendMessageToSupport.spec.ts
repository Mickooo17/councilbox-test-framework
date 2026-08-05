import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

f.test.describe('Send Message to Support - Validation', () => {
    f.test('Verify user cannot send message to support without populating Name field @XR-3086 @smoke @regression', async ({ supportPage }) => {
        const testUser = DataGenerator.randomUserData();
        const testMessage = DataGenerator.randomSupportMessage();

        // Open Support / Contact modal on login page
        await supportPage.openSupportModal();

        // Attempt to send message leaving Name empty
        await supportPage.sendMessageWithoutName(testUser.email, testMessage, testUser.surname);

        // Verify message cannot be sent without Name field
        await supportPage.verifyCannotSendMessageWithoutName();
    });

    f.test('Verify user cannot send message to support without populating Surname field @XR-3087 @smoke @regression', async ({ supportPage }) => {
        const testUser = DataGenerator.randomUserData();
        const testMessage = DataGenerator.randomSupportMessage();

        // Open Support / Contact modal on login page
        await supportPage.openSupportModal();

        // Attempt to send message leaving Surname empty
        await supportPage.sendMessageWithoutSurname(testUser.name, testUser.email, testMessage);

        // Verify message cannot be sent without Surname field
        await supportPage.verifyCannotSendMessageWithoutSurname();
    });

    f.test('Verify user cannot send message to support without populating Email field @XR-3088 @smoke @regression', async ({ supportPage }) => {
        const testUser = DataGenerator.randomUserData();
        const testMessage = DataGenerator.randomSupportMessage();

        // Open Support / Contact modal on login page
        await supportPage.openSupportModal();

        // Attempt to send message leaving Email empty
        await supportPage.sendMessageWithoutEmail(testUser.name, testUser.surname, testMessage);

        // Verify message cannot be sent without Email field
        await supportPage.verifyCannotSendMessageWithoutEmail();
    });
});
