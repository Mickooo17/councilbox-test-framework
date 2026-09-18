import * as f from '../fixtures';
import { resolveLoginUrl } from '../../utils/UrlHelper';

f.test.describe('Templates - Agent with Video Attention Tests', () => {
    f.test.beforeEach(async ({ page, loginPage, templatesPage }) => {
        // Navigate to login URL and authenticate as Agent with Video Attention
        await page.goto(resolveLoginUrl());
        await loginPage.login(f.agentWithVideoAttentionUser.username, f.agentWithVideoAttentionUser.password);
        await templatesPage.dismissToastOrModal();
    });

    f.test('Verify that the Agent with video attention user is able to see the Templates @XR-2287 @regression', async ({ templatesPage }) => {
        // 1. Validate Templates button is visible
        await templatesPage.verifyTemplatesButtonVisible();

        // 2. Click on the Templates button and verify the Templates page is displayed
        await templatesPage.navigateToTemplates();
        await templatesPage.verifyTemplatesPageOpened();
    });
});
