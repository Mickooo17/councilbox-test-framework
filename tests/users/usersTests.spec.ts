import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

f.test.describe('Users - Add User Tests', () => {
    f.test.beforeEach(async ({ loginPage, homePage, usersPage }) => {
        await loginPage.login(f.adminProfessionalUser.username, f.adminProfessionalUser.password);
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
});
