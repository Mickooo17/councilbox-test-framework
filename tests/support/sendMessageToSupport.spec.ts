import * as f from '../fixtures';

f.test.describe('XR-3086: Send Message to Support - Validation', () => {
    f.test('Verify user cannot send message to support without populating Name field @XR-3086 @smoke @regression', async ({ supportPage }) => {
        // Open Support / Contact modal on login page
        await supportPage.openSupportModal();

        // Attempt to send message leaving Name empty
        await supportPage.sendMessageWithoutName('test.user@example.com', 'Test support message for XR-3086 validation');

        // Verify message cannot be sent without Name field
        await supportPage.verifyCannotSendMessageWithoutName();
    });
});
