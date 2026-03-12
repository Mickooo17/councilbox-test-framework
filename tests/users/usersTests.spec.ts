import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

f.test.describe('Users - Add User Tests', () => {
    f.test.beforeEach(async ({ loginPage, homePage, usersPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
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
    f.test.beforeEach(async ({ loginPage, homePage, usersPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
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
    f.test.beforeEach(async ({ loginPage, homePage, usersPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
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
    f.test.beforeEach(async ({ loginPage, homePage, usersPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
        await homePage.validateHomePageIsOpened();
        await usersPage.dismissModal();
        await usersPage.selectQADevCompany();
        await usersPage.page.waitForLoadState('networkidle');
        await usersPage.navigateToUsers();
    });

    f.test('should edit an existing user name and verify the change @regression', async ({ usersPage }) => {
        const userData = DataGenerator.randomUserData();

        // First create a user to edit
        await usersPage.clickAddUser();
        await usersPage.fillUserForm(userData);
        await usersPage.selectLanguage('English');
        await usersPage.submitUserForm();
        await usersPage.verifyUserCreatedAlert();

        // Search for the created user
        await usersPage.searchUser(userData.name);
        const originalFullName = `${userData.name} ${userData.surname}`;
        await usersPage.verifyUserInTable(originalFullName);

        // Edit the user's name
        const newName = `EDITED_${DataGenerator.randomNumber(6)}`;
        await usersPage.editUser({ name: newName });
        await usersPage.verifyUserEditedAlert();
        
        // Close the drawer after the edit is successful, to clear the DOM for search
        await usersPage.cancelUserForm();

        // Verify the edited name appears
        const editedFullName = `${newName} ${userData.surname}`;
        await usersPage.searchUser(newName);
        await usersPage.verifyUserInTable(editedFullName);

        // Cleanup: delete the edited user
        await usersPage.deleteUser();
        await usersPage.verifyUserDeletedAlert();
    });
});
