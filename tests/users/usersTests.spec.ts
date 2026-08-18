import * as f from '../fixtures';
import { expect } from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { UserDataStore } from '../../utils/users/UserDataStore';
import { UserApiHelper, CreatedUserData } from '../../utils/users/UserApiHelper';

f.test.describe('Users - Add User Tests', () => {
    f.test.beforeEach(async ({ homePage, usersPage }) => {
        await homePage.validateHomePageIsOpened();
        await usersPage.dismissModal();
        await usersPage.selectQADevCompany();
        await usersPage.page.waitForLoadState('networkidle');
        await usersPage.navigateToUsers();
    });

    f.test('should add a new user with English language and verify it appears in the list @smoke @regression', async ({ usersPage }) => {
        const userData = DataGenerator.randomUserData();

        // Add user
        await usersPage.clickAddUser();
        await usersPage.fillUserForm(userData);
        await usersPage.selectLanguage('English');
        await usersPage.submitUserForm();
        await usersPage.verifyUserCreatedAlert();

        // Verify user in table
        const fullName = `${userData.name} ${userData.surname}`;
        await usersPage.searchUser(userData.name);
        await usersPage.verifyUserInTable(fullName);

        // Cleanup: delete the user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });

    f.test('should add a new user with Spanish language and verify it appears in the list @regression', async ({ usersPage }) => {
        const userData = DataGenerator.randomUserData();

        // Add user — default form language is Español, so no language change needed
        await usersPage.clickAddUser();
        await usersPage.fillUserForm(userData);
        // No selectLanguage call needed: the form already defaults to Español
        await usersPage.submitUserForm();
        await usersPage.verifyUserCreatedAlert();

        // Verify user in table
        const fullName = `${userData.name} ${userData.surname}`;
        await usersPage.searchUser(userData.name);
        await usersPage.verifyUserInTable(fullName);

        // Cleanup: delete the user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });
});

f.test.describe('Users - Search Tests', () => {
    f.test.beforeEach(async ({ homePage, usersPage }) => {
        await homePage.validateHomePageIsOpened();
        await usersPage.dismissModal();
        await usersPage.selectQADevCompany();
        await usersPage.page.waitForLoadState('networkidle');
        await usersPage.navigateToUsers();
    });

    f.test('should search for a non-existent user and verify no results @regression', async ({ usersPage }) => {
        // Search for a user that definitely doesn't exist
        const nonExistentName = `NONEXISTENT_USER_${DataGenerator.randomNumber(10)}`;
        await usersPage.searchUser(nonExistentName);
        await usersPage.verifyNoSearchResults();
    });

    f.test('should create a user, search by name, and verify result @regression', async ({ usersPage }) => {
        const userData = DataGenerator.randomUserData();

        // Create user
        await usersPage.clickAddUser();
        await usersPage.fillUserForm(userData);
        await usersPage.selectLanguage('English');
        await usersPage.submitUserForm();
        await usersPage.verifyUserCreatedAlert();

        // Search by name and verify
        const fullName = `${userData.name} ${userData.surname}`;
        await usersPage.searchUser(userData.email);
        await usersPage.verifyUserInTable(fullName);

        // Cleanup
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });
});

f.test.describe('Users - Validation Tests', () => {
    f.test.beforeEach(async ({ homePage, usersPage }) => {
        await homePage.validateHomePageIsOpened();
        await usersPage.dismissModal();
        await usersPage.selectQADevCompany();
        await usersPage.page.waitForLoadState('networkidle');
        await usersPage.navigateToUsers();
    });

    f.test('should show validation errors when submitting empty user form @regression', async ({ usersPage }) => {
        // Open add user form
        await usersPage.clickAddUser();

        // Try to submit without filling any fields
        await usersPage.verifyUserFormValidation();

        // Cancel the form
        await usersPage.cancelUserForm();
    });
});

f.test.describe('Users - Edit User Tests', () => {
    f.test.beforeEach(async ({ homePage, usersPage }) => {
        await homePage.validateHomePageIsOpened();
        await usersPage.dismissModal();
        await usersPage.selectQADevCompany();
        await usersPage.page.waitForLoadState('networkidle');
        await usersPage.navigateToUsers();
    });

    f.test('The user is able to change the Name - Users settings section @smoke @regression @XR-1630', async ({ usersPage }) => {
        // 1. Create Admin Agent user via API (automatically stored in UserDataStore)
        const user = await usersPage.createAdminAgentUserViaApi();
        expect(user).toBeDefined();
        expect(user.id).toBeGreaterThan(0);

        // 2. Search for the user in UI
        await usersPage.searchUser(user.email);
        await usersPage.verifyUserInTable(user.fullName);

        // 3. Edit user's name
        const newName = `EDITED_${DataGenerator.randomNumber(6)}`;
        await usersPage.editUser({ name: newName });
        await usersPage.verifyUserEditedAlert();

        // 4. Update user object in UserDataStore
        const updatedUser = UserDataStore.updateUser(user.id, { name: newName });
        expect(updatedUser?.fullName).toBe(`${newName} ${user.surname}`);

        // 5. Click back button to return to the users table
        await usersPage.clickBackButton();

        // 6. Search for updated name and verify new name is in the table
        await usersPage.searchUser(newName);
        await usersPage.verifyUserInTable(updatedUser!.fullName);

        // 7. Cleanup: delete the edited user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });

    f.test('The user is able to change the Surname - Users settings section @smoke @regression @XR-1631', async ({ usersPage }) => {
        // 1. Create Admin Agent user via API (automatically stored in UserDataStore)
        const user = await usersPage.createAdminAgentUserViaApi();
        expect(user).toBeDefined();
        expect(user.id).toBeGreaterThan(0);

        // 2. Search for the user in UI
        await usersPage.searchUser(user.email);
        await usersPage.verifyUserInTable(user.fullName);

        // 3. Edit user's surname
        const newSurname = `EDITED_SURNAME_${DataGenerator.randomNumber(6)}`;
        await usersPage.editUser({ surname: newSurname });
        await usersPage.verifyUserEditedAlert();

        // 4. Update user object in UserDataStore
        const updatedUser = UserDataStore.updateUser(user.id, { surname: newSurname });
        expect(updatedUser?.fullName).toBe(`${user.name} ${newSurname}`);

        // 5. Click back button to return to the users table
        await usersPage.clickBackButton();

        // 6. Search for updated surname and verify new surname is in the table
        await usersPage.searchUser(newSurname);
        await usersPage.verifyUserInTable(updatedUser!.fullName);

        // 7. Cleanup: delete the edited user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });

    f.test('The user is able to view Email field is disabled - Users settings section @smoke @regression @XR-1632', async ({ usersPage }) => {
        // 1. Create Admin Agent user via API
        const user = await usersPage.createAdminAgentUserViaApi();
        expect(user).toBeDefined();
        expect(user.id).toBeGreaterThan(0);

        // 2. Search for the user in UI
        await usersPage.searchUser(user.email);
        await usersPage.verifyUserInTable(user.fullName);

        // 3. Open user edit form
        await usersPage.openEditUserForm();

        // 4. Verify email is populated from user object and is disabled/read-only
        await usersPage.verifyEmailIsDisabled(user.email);

        // 5. Click back button
        await usersPage.clickBackButton();

        // 6. Cleanup
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });

    f.test('The user is able to change the Phone - Users settings section @smoke @regression @XR-1633', async ({ usersPage }) => {
        // 1. Create Admin Agent user via API
        const user = await usersPage.createAdminAgentUserViaApi();
        expect(user).toBeDefined();
        expect(user.id).toBeGreaterThan(0);

        // 2. Search for the user in UI
        await usersPage.searchUser(user.email);
        await usersPage.verifyUserInTable(user.fullName);

        // 3. Edit phone number
        const newPhone = `6${DataGenerator.randomNumber(7)}`;
        await usersPage.editUser({ phone: newPhone });
        await usersPage.verifyUserEditedAlert();

        // 4. Update user object in UserDataStore
        const updatedUser = UserDataStore.updateUser(user.id, { phone: newPhone });
        expect(updatedUser?.phone).toBe(newPhone);

        // 5. Verify the updated phone value in the edit form
        await usersPage.verifyPhoneInEditForm(newPhone);

        // 6. Click back button to return to table
        await usersPage.clickBackButton();

        // 7. Cleanup: delete the edited user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });

    f.test('The user is able to change the Language to English - Users settings section @smoke @regression @XR-1634', async ({ usersPage }) => {
        // 1. Create Admin Agent user via API with Spanish as default language ('es')
        const user = await usersPage.createAdminAgentUserViaApi({ preferredLanguage: 'es' });
        expect(user).toBeDefined();
        expect(user.id).toBeGreaterThan(0);

        // 2. Search for the user in UI
        await usersPage.searchUser(user.email);
        await usersPage.verifyUserInTable(user.fullName);

        // 3. Edit language to English
        await usersPage.editUser({ language: 'English' });
        await usersPage.verifyUserEditedAlert();

        // 4. Verify language changed to English in the edit form
        await usersPage.verifyLanguageInEditForm('English');

        // 5. Click back button to return to table
        await usersPage.clickBackButton();

        // 6. Cleanup: delete user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });
});

f.test.describe('Users - Edit Language Tests', () => {
    f.test.describe.configure({ mode: 'serial' });

    let sharedUser: CreatedUserData;

    f.test.beforeAll(async ({ request }) => {
        // Create 1 single Admin Agent user via API for all language tests
        sharedUser = await UserApiHelper.createAdminAgentUser(request, { preferredLanguage: 'en' });
        expect(sharedUser).toBeDefined();
        expect(sharedUser.id).toBeGreaterThan(0);
    });

    f.test.beforeEach(async ({ homePage, usersPage }) => {
        await homePage.validateHomePageIsOpened();
        await usersPage.dismissToastOrModal();
        if (!usersPage.page.url().includes('/users')) {
            await usersPage.navigateToUsers();
        }
        await usersPage.searchUser(sharedUser.email);
        await usersPage.verifyUserInTable(sharedUser.fullName);
    });

    f.test('The user is able to change the Language to Italiano @smoke @regression', async ({ usersPage }) => {
        await usersPage.editUser({ language: 'Italiano' });
        await usersPage.verifyUserEditedAlert();
        await usersPage.verifyLanguageInEditForm('Italiano');
        await usersPage.clickBackButton();
    });

    f.test('The user is able to change the Language to Catala @smoke @regression', async ({ usersPage }) => {
        await usersPage.editUser({ language: 'Catala' });
        await usersPage.verifyUserEditedAlert();
        await usersPage.verifyLanguageInEditForm('Catala');
        await usersPage.clickBackButton();
    });

    f.test('The user is able to change the Language to Euskera @smoke @regression', async ({ usersPage }) => {
        await usersPage.editUser({ language: 'Euskera' });
        await usersPage.verifyUserEditedAlert();
        await usersPage.verifyLanguageInEditForm('Euskera');
        await usersPage.clickBackButton();
    });

    f.test('The user is able to change the Language to Espanol @smoke @regression', async ({ usersPage }) => {
        await usersPage.editUser({ language: 'Español' });
        await usersPage.verifyUserEditedAlert();
        await usersPage.verifyLanguageInEditForm('Español');
        await usersPage.clickBackButton();

        // Cleanup: delete the shared user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });
});
