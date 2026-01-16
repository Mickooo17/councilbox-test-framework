import * as f from './fixtures';

/**
 * Login Page Test Suite
 * Contains all tests related to user login functionality
 */

f.test.describe('LoginPage - Authentication Tests', () => {
  f.test('should successfully login with valid credentials @smoke @regression', async ({ loginPage, homePage }) => {
    // Arrange
    const username = f.adminProfessionalUser.username;
    const password = f.adminProfessionalUser.password;

    // Act
    await loginPage.login(username, password);

    // Assert
    await homePage.validateHomePageIsOpened();
  });

  f.test('should successfully login with admin user @smoke', async ({ loginPage, homePage }) => {
    // Arrange
    const username = f.adminUser.username;
    const password = f.adminUser.password;

    // Act
    await loginPage.login(username, password);

    // Assert
    await homePage.validateHomePageIsOpened();
  });

  f.test('should successfully login with superadmin user @regression', async ({ loginPage, homePage }) => {
    // Arrange
    const username = f.superadminUser.username;
    const password = f.superadminUser.password;

    // Act
    await loginPage.login(username, password);

    // Assert
    await homePage.validateHomePageIsOpened();
  });
});

f.test.describe('LoginPage - Validation Tests', () => {
  f.test('should display error with empty credentials @regression', async ({ loginPage }) => {
    // Arrange - empty credentials
    const username = '';
    const password = '';

    // Act
    await loginPage.login(username, password);

    // Assert
    await loginPage.validateErrorMessage();
  });

  f.test('should display error with empty username @regression', async ({ loginPage }) => {
    // Arrange
    const username = '';
    const password = f.adminUser.password;

    // Act
    await loginPage.login(username, password);

    // Assert
    await loginPage.validateErrorMessage();
  });

  f.test('should display error with empty password @regression', async ({ loginPage }) => {
    // Arrange
    const username = f.adminUser.username;
    const password = '';

    // Act
    await loginPage.login(username, password);

    // Assert
    await loginPage.validateErrorMessage();
  });

  f.test('should display error with invalid credentials @regression', async ({ loginPage }) => {
    // Arrange
    const username = 'invalid.user@example.com';
    const password = 'wrongPassword123';

    // Act
    await loginPage.login(username, password);

    // Assert
    await loginPage.validateErrorMessage();
  });
});

f.test.describe('LoginPage - UI Tests', () => {
  f.test('should have all required login elements visible @smoke', async ({ loginPage }) => {
    // Assert
    const usernameInput = loginPage.usernameInput;
    const passwordInput = loginPage.passwordInput;
    const submitButton = loginPage.submitButton;

    await usernameInput.isVisible();
    await passwordInput.isVisible();
    await submitButton.isVisible();
  });
});
