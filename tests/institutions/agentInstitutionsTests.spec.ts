import * as f from '../fixtures';
import { resolveLoginUrl } from '../../utils/UrlHelper';

f.test.describe('Entities / Institutions - Agent with Video Attention Tests', () => {
    f.test.beforeEach(async ({ page, loginPage, institutionsPage }) => {
        // Navigate to login URL and authenticate as Agent with Video Attention
        await page.goto(resolveLoginUrl());
        await loginPage.login(f.agentWithVideoAttentionUser.username, f.agentWithVideoAttentionUser.password);
        await institutionsPage.dismissToastOrModal();
    });

    f.test('Verify that Agent with video attention is not able to see "Institutions" button in the navigation bar @XR-2297 @regression', async ({ institutionsPage }) => {
        // Verify Entities (Institutions) button is not visible in the navigation bar
        await institutionsPage.verifyEntitiesButtonNotVisible();
    });
});
