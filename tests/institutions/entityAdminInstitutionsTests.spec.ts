import * as f from '../fixtures';
import { resolveLoginUrl } from '../../utils/UrlHelper';

f.test.describe('Entities - Entity Administrator Tests', () => {
    f.test.beforeEach(async ({ page, loginPage, institutionsPage }) => {
        // Navigate to login URL and authenticate as Entity Administrator
        await page.goto(resolveLoginUrl());
        await loginPage.login(f.entityAdministratorUser.username, f.entityAdministratorUser.password);
        await institutionsPage.dismissToastOrModal();
    });

    f.test('Verify that Entity administrator can see the Entities button in the navigation bar @XR-2296 @regression', async ({ institutionsPage }) => {
        // 1. Verify "Entities" button is visible in navigation bar
        await institutionsPage.verifyEntitiesButtonVisible();

        // 2. Click on "Entities" button and verify the Entities page is displayed
        await institutionsPage.navigateToInstitutions();
        await institutionsPage.verifyEntitiesPageOpened();
    });
});
