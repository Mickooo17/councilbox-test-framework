import * as f from './fixtures';

// Force unauthenticated browser context for login tests
f.test.use({ storageState: { cookies: [], origins: [] } });

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
});

f.test.describe('LoginPage - Validation Tests', () => {
  f.test('should display error with empty credentials @regression', async ({ loginPage }) => {
    // Arrange - empty credentials
    const username = '';
    const password = '';

    // Act
    await loginPage.login(username, password, false);

    // Assert
    await loginPage.validateErrorMessage();
  });

  f.test('should display error with empty username @regression', async ({ loginPage }) => {
    // Arrange
    const username = '';
    const password = f.adminUser.password;

    // Act
    await loginPage.login(username, password, false);

    // Assert
    await loginPage.validateErrorMessage();
  });

  f.test('should display error with empty password @regression', async ({ loginPage }) => {
    // Arrange
    const username = f.adminUser.username;
    const password = '';

    // Act
    await loginPage.login(username, password, false);

    // Assert
    await loginPage.validateErrorMessage();
  });

  f.test('should display error with invalid credentials @regression', async ({ loginPage }) => {
    // Arrange
    const username = `invalid.user+${Date.now()}@example.com`;
    const password = 'wrongPassword123';

    // Act
    await loginPage.login(username, password, false);

    // Assert
    await loginPage.validateErrorMessageForInvalidCredentials();
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

  f.test('should verify footer links are present @regression', async ({ loginPage }) => {
    // Assert - Privacy policy and Legal notice links should be visible
    await loginPage.verifyFooterLinks();
  });

  f.test('should have all required appointment access elements visible @smoke', async ({ page, appointmentLoginPage }) => {
    // Act - Fixture opens /admin, so we need to navigate specifically to /login
    await page.goto('https://qa.ovac.pre.councilbox.com/login');

    // Assert
    await appointmentLoginPage.verifyAppointmentAccessElementsVisible();
  });
});

f.test.describe('LoginPage - Password Recovery Tests', () => {
  f.test('should navigate to password recovery page @regression', async ({ loginPage }) => {
    // Act
    await loginPage.clickPasswordRecoveryLink();

    // Assert
    await loginPage.verifyPasswordRecoveryPage();
  });
});

f.test.describe('LoginPage - Password Visibility Tests', () => {
  f.test('should toggle password visibility @regression', async ({ loginPage }) => {
    // Arrange - type something in the password field first
    await loginPage.passwordInput.fill('testPassword123');

    // Assert - password is hidden by default
    await loginPage.verifyPasswordHidden();

    // Act - toggle visibility
    await loginPage.togglePasswordVisibility();

    // Assert - password is now visible
    await loginPage.verifyPasswordVisible();

    // Act - toggle back
    await loginPage.togglePasswordVisibility();

    // Assert - password is hidden again
    await loginPage.verifyPasswordHidden();
  });
});

f.test.describe('LoginPage - Language Selection Tests', () => {
  const languages = [
    { name: 'Español', code: 'ES', tag: '@XR-3038' },
    { name: 'Català', code: 'CA', tag: '@regression' },
    { name: 'Galego', code: 'GL', tag: '@regression' },
    { name: 'Euskera', code: 'EU', tag: '@regression' },
    { name: 'English', code: 'EN', tag: '@regression' },
    { name: 'Valencià', code: 'VA', tag: '@regression' },
    { name: 'Italiano', code: 'IT', tag: '@regression' },
  ] as const;

  for (const lang of languages) {
    f.test(`should select ${lang.name} language on the /login screen and display content properly ${lang.tag}`, async ({ page, loginPage }) => {
      // Act - Navigate to the /login screen
      await page.goto('https://qa.ovac.pre.councilbox.com/login');

      // Act - Click globe icon and select language
      await loginPage.selectLanguage(lang.name);

      // Assert - Verify page content is translated into selected language
      await loginPage.verifyLanguageSelected(lang.name);
    });
  }
});

f.test.describe('LoginPage - Scroll Tests', () => {
  f.test('Verify scroll is removed from login page @XR-3083 @smoke @regression', async ({ loginPage }) => {
    // Assert - Verify login page does not have unnecessary vertical scrollbar
    await loginPage.verifyScrollIsRemoved();
  });
});



