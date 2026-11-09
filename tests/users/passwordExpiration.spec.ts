import * as f from '../fixtures';
import { expect } from '@playwright/test';

f.test.describe('User Profile & Password Expiration Settings', () => {
    // Run tests in serial mode so they execute sequentially in the same worker
    f.test.describe.configure({ mode: 'serial' });

    f.test.beforeEach(async ({ homePage, userProfilePage }) => {
        await homePage.validateHomePageIsOpened();
        await userProfilePage.dismissModal();
    });

    f.test('The user is able to save all changes by clicking on the \'Save\' button - User settings section @XR-1638 @OVAC-5788 @smoke @regression', async ({ userProfilePage }) => {
        // 1. Click Account icon and click Edit / User settings
        await userProfilePage.navigateToUserSettings();

        // 2. Read current name and surname
        const originalName = await userProfilePage.getName();
        const originalSurname = await userProfilePage.getSurname();
        expect(originalName).toBeTruthy();
        expect(originalSurname).toBeTruthy();

        // 3. Edit name and click Save
        const updatedName = `${originalName}Edit`;
        await userProfilePage.editName(updatedName);
        await userProfilePage.saveProfile();

        // 4. Verify success alert confirms changes are saved
        await userProfilePage.verifyProfileSavedAlert();

        // 5. Cleanup: restore original name and save
        await userProfilePage.editName(originalName);
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
    });

    f.test('Verify user is able to deactivate password expiration @XR-3054 @smoke @regression', async ({ userProfilePage }) => {
        await userProfilePage.navigateToProfileOptions();

        // Ensure state is enabled before testing deactivation
        await userProfilePage.setPasswordExpirationState(true);

        // Deactivate and verify
        await userProfilePage.togglePasswordExpiration();
        f.expect(await userProfilePage.isPasswordExpirationEnabled()).toBe(false);
    });

    f.test('Verify user is able to activate password expiration @XR-3055 @smoke @regression', async ({ userProfilePage }) => {
        await userProfilePage.navigateToProfileOptions();

        // Ensure state is disabled before testing activation
        await userProfilePage.setPasswordExpirationState(false);

        // Activate and verify
        await userProfilePage.togglePasswordExpiration();
        f.expect(await userProfilePage.isPasswordExpirationEnabled()).toBe(true);
    });
});
