import * as f from '../fixtures';
import { resolveLoginUrl } from '../../utils/UrlHelper';

f.test.describe('Documentation - Agent with Video Attention Tests', () => {
    f.test.beforeEach(async ({ page, loginPage, documentationPage }) => {
        // Navigate to login URL and authenticate as Agent with Video Attention
        await page.goto(resolveLoginUrl());
        await loginPage.login(f.agentWithVideoAttentionUser.username, f.agentWithVideoAttentionUser.password);
        await documentationPage.dismissToastOrModal();
        await documentationPage.navigateToDocumentation();
    });

    f.test('Verify that the Agent with video attention is not able to delete documents @XR-2285 @regression', async ({ documentationPage }) => {
        // 1. Verify that the Delete option is not available in the document card action menu
        await documentationPage.verifyDeleteOptionNotAvailable();

        // 2. Verify that no Delete button exists on the Documentation page
        await documentationPage.verifyNoDeleteButtonOnPage();
    });

    f.test('Verify that the Agent with video attention is not able to edit documents @XR-2286 @regression', async ({ documentationPage }) => {
        // 1. Verify that the Edit option is not available in the document card action menu
        await documentationPage.verifyEditOptionNotAvailable();

        // 2. Open document preview by clicking on the card and verify it is read-only (no edit controls)
        await documentationPage.verifyDocumentPreviewIsReadOnly();

        // 3. Verify that no Edit button exists on the Documentation page
        await documentationPage.verifyNoEditButtonOnPage();
    });
});
