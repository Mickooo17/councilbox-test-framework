import * as f from './fixtures';

f.test('Verify user is able to login to the page @smoke @regression', async ({ loginPage, homePage }) => {
  await loginPage.login(f.adminProfessionalUser.username, f.adminProfessionalUser.password);
  await homePage.validateHomePageIsOpened();
});
