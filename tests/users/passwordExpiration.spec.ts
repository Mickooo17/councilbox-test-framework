import * as f from '../fixtures';

f.test.describe('Password Expiration Settings', () => {
    // Run tests in serial mode so they execute sequentially in the same worker
    f.test.describe.configure({ mode: 'serial' });

    f.test.beforeEach(async ({ homePage, userProfilePage }) => {
        await homePage.validateHomePageIsOpened();
        await userProfilePage.dismissModal();
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
