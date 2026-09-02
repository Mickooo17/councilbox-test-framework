import { test, expect } from '../fixtures';
import { UserApiHelper } from '../../utils/users/UserApiHelper';

test.describe('OVAC User API Deletion & Cleanup Tests', () => {
  test('Create user via API and delete via API by ID @XR-API-USER-DELETE', async ({ request, usersPage }) => {
    // 1. Create a user via API
    const createdUser = await UserApiHelper.createUser(request, {
      name: 'AutoDelete',
      surname: 'UserTest',
      preferredLanguage: 'en',
    });

    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBeGreaterThan(0);
    console.log(`[API Test] Created User for deletion: ID=${createdUser.id}, Email=${createdUser.email}`);

    // 2. Delete user via API
    const deleteResult = await UserApiHelper.deleteUser(request, createdUser.id);
    expect(deleteResult).toBe(true);
    console.log(`[API Test] Successfully deleted User ID=${createdUser.id} via API`);

    // 3. Verify in UI that deleted user is no longer in the list
    await usersPage.navigateToUsers();
    await usersPage.searchUser(createdUser.email);
    const userRow = usersPage.page.locator(`tbody tr:has-text("${createdUser.email}")`);
    await expect(userRow).toHaveCount(0, { timeout: 5000 });
  });

  test('Create user via API and delete via API by Email @XR-API-USER-DELETE', async ({ request, usersPage }) => {
    // 1. Create a user via API
    const createdUser = await UserApiHelper.createUser(request, {
      name: 'AutoEmailDel',
      surname: 'UserTest',
      preferredLanguage: 'es',
    });

    expect(createdUser).toBeDefined();
    console.log(`[API Test] Created User for email deletion: ID=${createdUser.id}, Email=${createdUser.email}`);

    // 2. Delete user via API by Email
    const deleteResult = await UserApiHelper.deleteUserByEmail(request, createdUser.email);
    expect(deleteResult).toBe(true);
    console.log(`[API Test] Successfully deleted User Email=${createdUser.email} via API`);

    // 3. Verify in UI that deleted user is no longer in the list
    await usersPage.navigateToUsers();
    await usersPage.searchUser(createdUser.email);
    const userRow = usersPage.page.locator(`tbody tr:has-text("${createdUser.email}")`);
    await expect(userRow).toHaveCount(0, { timeout: 5000 });
  });
});
