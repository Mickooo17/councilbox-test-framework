import { test, expect } from '../fixtures';

test.describe('OVAC User API Creation & UI Verification', () => {
  test('Create Admin Agent user via API and verify in UI @XR-API-USER', async ({ usersPage, page }) => {
    // 1. Create Admin Agent user via API directly from usersPage
    const createdUser = await usersPage.createAdminAgentUserViaApi({
      name: 'AutoAdmin',
      surname: 'AgentTester',
      preferredLanguage: 'en',
    });

    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBeGreaterThan(0);
    expect(createdUser.role).toBe('professionalAdmin');

    console.log(`[API Test] Successfully created Admin Agent User: ID=${createdUser.id}, Email=${createdUser.email}, Name=${createdUser.fullName}`);

    // 2. Navigate to Users page in UI and verify user appears in table
    await usersPage.navigateToUsers();
    await usersPage.searchUser(createdUser.email);
    await usersPage.verifyUserInTable(createdUser.fullName);
  });
});
