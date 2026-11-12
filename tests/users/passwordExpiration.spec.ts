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

    f.test('The user is able to change the Name - Users settings section @OVAC-5763 @regression', async ({ userProfilePage }) => {
        await userProfilePage.navigateToUserSettings();
        const originalName = await userProfilePage.getName();
        expect(originalName).toBeTruthy();

        const testName = `${originalName}Test`;
        await userProfilePage.editName(testName);
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();

        expect(await userProfilePage.getName()).toBe(testName);

        // Restore original name
        await userProfilePage.editName(originalName);
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
    });

    f.test('The user is able to change the Surname - Users settings section @OVAC-5762 @regression', async ({ userProfilePage }) => {
        await userProfilePage.navigateToUserSettings();
        const originalSurname = await userProfilePage.getSurname();
        expect(originalSurname).toBeTruthy();

        const testSurname = `${originalSurname}Test`;
        await userProfilePage.editSurname(testSurname);
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();

        expect(await userProfilePage.getSurname()).toBe(testSurname);

        // Restore original surname
        await userProfilePage.editSurname(originalSurname);
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
    });

    f.test('The user is able to change the Telephone number - Users settings section @OVAC-5765 @regression', async ({ userProfilePage }) => {
        await userProfilePage.navigateToUserSettings();
        const originalPhone = await userProfilePage.getTelephone();

        const testPhone = `6${Math.floor(10000000 + Math.random() * 90000000)}`;
        await userProfilePage.editTelephone(testPhone);
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();

        expect(await userProfilePage.getTelephone()).toContain(testPhone);

        // Restore original phone
        if (originalPhone) {
            await userProfilePage.editTelephone(originalPhone);
            await userProfilePage.saveProfile();
            await userProfilePage.verifyProfileSavedAlert();
        }
    });

    f.test('The user is able to change the Language to Español - Users settings section @OVAC-5645 @regression', async ({ userProfilePage, page }) => {
        await userProfilePage.navigateToUserSettings();
        await userProfilePage.selectLanguage('Español');
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
        expect(await userProfilePage.getLanguage()).toMatch(/Español|Spanish/i);
    });

    f.test('The user is able to change the Language to English - Users settings section @OVAC-5787 @regression', async ({ userProfilePage, page }) => {
        await userProfilePage.navigateToUserSettings();
        await userProfilePage.selectLanguage('English');
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
        expect(await userProfilePage.getLanguage()).toMatch(/English|Inglés|Ingles/i);
    });

    f.test('The user is able to change the Language to Catalá - Users settings section @OVAC-5646 @regression', async ({ userProfilePage, page }) => {
        await userProfilePage.navigateToUserSettings();
        await userProfilePage.selectLanguage('Català');
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
        expect(await userProfilePage.getLanguage()).toMatch(/Català|Catala/i);
    });

    f.test('The user is able to change the Language to Euskera - Users settings section @OVAC-5647 @regression', async ({ userProfilePage, page }) => {
        await userProfilePage.navigateToUserSettings();
        await userProfilePage.selectLanguage('Euskera');
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
        expect(await userProfilePage.getLanguage()).toMatch(/Euskera|Basque/i);
    });

    f.test('The user is able to change the Language to Italiano - Users settings section @OVAC-5651 @regression', async ({ userProfilePage, page }) => {
        await userProfilePage.navigateToUserSettings();
        await userProfilePage.selectLanguage('Italiano');
        await userProfilePage.saveProfile();
        await userProfilePage.verifyProfileSavedAlert();
        expect(await userProfilePage.getLanguage()).toMatch(/Italiano|Italian/i);

        // Restore back to English
        await userProfilePage.selectLanguage('English');
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

    f.test('Password expiration can be disabled or enabled by the user @XR-2959 @OVAC-5219 @smoke @regression', async ({ userProfilePage }) => {
        // 1-4. Navigate to User settings -> Options tab
        await userProfilePage.navigateToProfileOptions();

        // 5. Toggle password expiration switch and accept dialog if shown
        const initialState = await userProfilePage.isPasswordExpirationEnabled();
        await userProfilePage.togglePasswordExpiration();
        const toggledState = await userProfilePage.isPasswordExpirationEnabled();
        expect(toggledState).toBe(!initialState);

        // 6. Cleanup: Toggle back to maintain original state
        await userProfilePage.togglePasswordExpiration();
        expect(await userProfilePage.isPasswordExpirationEnabled()).toBe(initialState);
    });

    f.test('The user is not able to change password with invalid input in the Confirmed field - User settings section @XR-1637 @OVAC-5789 @regression', async ({ userProfilePage }) => {
        // 1-4. Navigate to User profile settings
        await userProfilePage.navigateToUserSettings();

        // 5. Open Change password modal from 3-dots action menu
        await userProfilePage.openChangePasswordModal();

        // 6-8. Enter valid Current password, valid New password, and mismatching/invalid Confirm password
        await userProfilePage.fillChangePasswordForm('ValidPass123!', 'NewPass123!', 'MismatchingPass123!');

        // 9. Click Save and verify validation error below Confirm label
        await userProfilePage.submitChangePassword();
        await userProfilePage.verifyConfirmPasswordMismatchError();

        // Cleanup: Close modal
        await userProfilePage.closeChangePasswordModal();
    });

    f.test('The user is not able to change password with invalid input in the Current password field - User settings section @XR-1636 @OVAC-5790 @regression', async ({ userProfilePage }) => {
        // 1-4. Navigate to User profile settings
        await userProfilePage.navigateToUserSettings();

        // 5. Open Change password modal from 3-dots action menu
        await userProfilePage.openChangePasswordModal();

        // 6-8. Enter invalid Current password, and matching new passwords
        await userProfilePage.fillChangePasswordForm('WrongCurrentPassword123!', 'NewPass123!', 'NewPass123!');

        // 9. Click Save and verify validation error below Current password label
        await userProfilePage.submitChangePassword();
        await userProfilePage.verifyCurrentPasswordInvalidError();

        // Cleanup: Close modal
        await userProfilePage.closeChangePasswordModal();
    });
});
