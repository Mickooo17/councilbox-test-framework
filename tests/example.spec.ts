import * as f from './fixtures';

f.test('Verify user is able to login to the page @smoke @regression', async ({ loginPage, homePage }) => {
  await loginPage.login(f.adminProfessionalUser.username, f.adminProfessionalUser.password);
  await homePage.validateHomePageIsOpened();
});

f.test('Verify user is not able to login with invalid credentials @regression', async ({ loginPage }) => {
  await loginPage.login('', '');
  await loginPage.validateErrorMessage();
});