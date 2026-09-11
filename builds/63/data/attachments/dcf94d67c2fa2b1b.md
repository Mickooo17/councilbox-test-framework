# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/loginTests.spec.ts >> LoginPage - UI Tests >> should verify footer links are present @regression
- Location: tests/loginTests.spec.ts:82:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Privacy policy')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Privacy policy') with timeout 5000ms
  - waiting for getByText('Privacy policy')

```

```yaml
- progressbar:
  - img
```

# Test source

```ts
  16  |   readonly languageDropdownButton: Locator;
  17  |   readonly spanishOption: Locator;
  18  |   readonly catalanOption: Locator;
  19  |   readonly englishOption: Locator;
  20  |   readonly digitalCertificateButton: Locator;
  21  | 
  22  |   constructor(private page: Page) {
  23  |     this.usernameInput = page.locator('#username');
  24  |     this.passwordInput = page.locator('#password');
  25  |     this.submitButton = page.locator('button[id="restore-password-button"]');
  26  |     this.loginErrorMessage = page.getByText('This field is required.');
  27  |     this.loginErrorMessageInvalid = page.getByText(/Username or password incorrect/i);
  28  |     this.passwordRecoveryLink = page.locator('#restore-password-link');
  29  |     this.passwordToggleButton = page.getByLabel('Toggle password visibility');
  30  |     this.privacyPolicyLink = page.getByText('Privacy policy');
  31  |     this.legalNoticeLink = page.getByText('Legal notice and Terms and conditions of use');
  32  |     this.languageDropdownButton = page.locator('i.bi-globe, .bi-globe, [class*="bi-globe"], .language-selector, #language-selector').first();
  33  |     this.spanishOption = page.getByRole('option', { name: /Español|Spanish|ES/i }).or(page.getByText(/Español|Spanish|ES/i)).first();
  34  |     this.catalanOption = page.getByRole('option', { name: /Català|Catalan|CA/i }).or(page.getByText(/Català|Catalan|CA/i)).first();
  35  |     this.englishOption = page.getByRole('option', { name: /English|EN/i }).or(page.getByText(/English|EN/i)).first();
  36  |     this.digitalCertificateButton = page.getByText(/Digital Certificate|Certificado Digital/i).first();
  37  |   }
  38  | 
  39  |   async login(username: string, password: string, expectSuccess = true) {
  40  |     await test.step(`Login as ${username}`, async () => {
  41  |       // Check if username input is visible on screen. If visible, we MUST perform UI login.
  42  |       const isUsernameVisible = await this.usernameInput.isVisible({ timeout: 3000 }).catch(() => false);
  43  |       if (!isUsernameVisible) {
  44  |         const isCompanyDashboard = this.page.url().includes('/company');
  45  |         const hasProfileIcon = await this.page.locator('#cbx-header-third-dropdown-user, [class*="dropdown-user"]').isVisible({ timeout: 2000 }).catch(() => false);
  46  |         if (isCompanyDashboard || hasProfileIcon) {
  47  |           console.log(`[login] Page is already authenticated, skipping UI login form.`);
  48  |           return;
  49  |         }
  50  |       }
  51  | 
  52  |       await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  53  |       await this.usernameInput.fill(username);
  54  |       await this.passwordInput.fill(password);
  55  |       await this.submitButton.click();
  56  |       if (expectSuccess) {
  57  |         await expect(this.page).toHaveURL(/\/company|\/admin/i, { timeout: 20000 });
  58  |       }
  59  |     });
  60  |   }
  61  | 
  62  |   async validateErrorMessage(expectedMessage = 'This field is required.') {
  63  |     await test.step(`Validate error message: "${expectedMessage}"`, async () => {
  64  |       const errorCount = await this.loginErrorMessage.count();
  65  |       expect(errorCount, 'Expected at least one validation error to be shown').toBeGreaterThan(0);
  66  | 
  67  |       for (let i = 0; i < errorCount; i += 1) {
  68  |         const errorLocator = this.loginErrorMessage.nth(i);
  69  |         await expect(errorLocator).toBeVisible();
  70  |         if (expectedMessage) {
  71  |           await expect(errorLocator).toContainText(expectedMessage);
  72  |         }
  73  |       }
  74  |     });
  75  |   }
  76  | 
  77  |   async validateErrorMessageForInvalidCredentials(expectedMessage = 'Username or password incorrect.') {
  78  |     await test.step(`Validate invalid credentials error: "${expectedMessage}"`, async () => {
  79  |       await expect(this.loginErrorMessageInvalid).toBeVisible();
  80  |       await expect(this.loginErrorMessageInvalid).toContainText(expectedMessage);
  81  |     });
  82  |   }
  83  | 
  84  |   async clickPasswordRecoveryLink() {
  85  |     await test.step('Click password recovery link', async () => {
  86  |       await this.passwordRecoveryLink.click();
  87  |     });
  88  |   }
  89  | 
  90  |   async verifyPasswordRecoveryPage() {
  91  |     await test.step('Verify password recovery page is shown', async () => {
  92  |       await expect(this.page).toHaveURL(/forgetPwd/, { timeout: 10000 });
  93  |     });
  94  |   }
  95  | 
  96  |   async togglePasswordVisibility() {
  97  |     await test.step('Toggle password visibility', async () => {
  98  |       await this.passwordToggleButton.click();
  99  |     });
  100 |   }
  101 | 
  102 |   async verifyPasswordVisible() {
  103 |     await test.step('Verify password field is visible (type=text)', async () => {
  104 |       await expect(this.passwordInput).toHaveAttribute('type', 'text');
  105 |     });
  106 |   }
  107 | 
  108 |   async verifyPasswordHidden() {
  109 |     await test.step('Verify password field is hidden (type=password)', async () => {
  110 |       await expect(this.passwordInput).toHaveAttribute('type', 'password');
  111 |     });
  112 |   }
  113 | 
  114 |   async verifyFooterLinks() {
  115 |     await test.step('Verify footer links are present', async () => {
> 116 |       await expect(this.privacyPolicyLink).toBeVisible();
      |                                            ^ Error: expect(locator).toBeVisible() failed
  117 |       await expect(this.legalNoticeLink).toBeVisible();
  118 |     });
  119 |   }
  120 | 
  121 |   async verifyAllLoginFieldsAndButtonsVisible() {
  122 |     await test.step('Verify that "/login" page contains all fields and buttons', async () => {
  123 |       await expect(this.usernameInput, 'Username input field should be visible').toBeVisible();
  124 |       await expect(this.passwordInput, 'Password input field should be visible').toBeVisible();
  125 |       await expect(this.submitButton, 'Access/Submit button should be visible').toBeVisible();
  126 |       await expect(this.passwordRecoveryLink, 'Password recovery link should be visible').toBeVisible();
  127 |       await expect(this.passwordToggleButton, 'Toggle password visibility button should be visible').toBeVisible();
  128 |       await expect(this.privacyPolicyLink, 'Privacy policy link should be visible').toBeVisible();
  129 |       await expect(this.legalNoticeLink, 'Legal notice link should be visible').toBeVisible();
  130 |       await expect(this.digitalCertificateButton, 'Digital Certificate access button should be visible').toBeVisible();
  131 |     });
  132 |   }
  133 | 
  134 |   async selectLanguage(lang: LanguageOption) {
  135 |     await test.step(`Click globe icon in top right and select language "${lang}"`, async () => {
  136 |       if (!this.page.url().endsWith('/login')) {
  137 |         await this.page.goto(resolvePublicLoginUrl(), { waitUntil: 'domcontentloaded' });
  138 |       }
  139 |       const globeIcon = this.page.locator('.ri-global-line, i.ri-global-line, [class*="ri-global"]').first();
  140 |       await globeIcon.waitFor({ state: 'visible', timeout: 10000 });
  141 |       await globeIcon.click();
  142 | 
  143 |       const option = this.page.getByText(lang, { exact: true }).first();
  144 |       await option.waitFor({ state: 'visible', timeout: 5000 });
  145 |       await option.click();
  146 |     });
  147 |   }
  148 | 
  149 |   async verifyLanguageSelected(lang: LanguageOption) {
  150 |     await test.step(`Verify login page content is translated to "${lang}"`, async () => {
  151 |       const expectedTexts: Record<LanguageOption, RegExp> = {
  152 |         Español: /Acceso|CONTINUAR|Política de privacidad|Aviso legal/i,
  153 |         Català: /Accés|CONTINUAR|Política de privacitat|Avís legal/i,
  154 |         Galego: /Acceso|CONTINUAR|Política de privacidade|Aviso legal/i,
  155 |         Euskera: /Sarrera|JARRAITU|Pribatutasun-politika|Lege-oharra/i,
  156 |         English: /Access|CONTINUE|Privacy policy|Legal notice/i,
  157 |         Valencià: /Accés|CONTINUAR|Política de privacitat|Avís legal/i,
  158 |         Italiano: /Accesso|CONTINUA|Informativa sulla privacy|Note legali/i,
  159 |       };
  160 | 
  161 |       const regex = expectedTexts[lang] || /Access|CONTINUE|Privacidad|Privacitat/i;
  162 |       await expect(this.page.locator('body')).toContainText(regex);
  163 |     });
  164 |   }
  165 | 
  166 |   async verifySpanishLanguageContent() {
  167 |     await this.verifyLanguageSelected('Español');
  168 |   }
  169 | 
  170 |   async verifyScrollIsRemoved() {
  171 |     await test.step('Verify vertical scroll is removed from login page', async () => {
  172 |       const scrollInfo = await this.page.evaluate(() => {
  173 |         const doc = document.documentElement;
  174 |         const body = document.body;
  175 |         return {
  176 |           scrollHeight: Math.max(doc.scrollHeight, body.scrollHeight),
  177 |           clientHeight: Math.max(doc.clientHeight, window.innerHeight),
  178 |         };
  179 |       });
  180 | 
  181 |       const hasVerticalScrollbar = scrollInfo.scrollHeight > scrollInfo.clientHeight + 5;
  182 |       expect(hasVerticalScrollbar, `Login page should not have vertical scrollbar (scrollHeight: ${scrollInfo.scrollHeight}, clientHeight: ${scrollInfo.clientHeight})`).toBe(false);
  183 |     });
  184 |   }
  185 | }
  186 | 
```