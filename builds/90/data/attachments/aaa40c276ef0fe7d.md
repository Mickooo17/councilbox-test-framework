# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/users/usersTests.spec.ts >> Users - Validation Tests >> The admin is not able to create a user with invalid Telephone number field - Add user form @XR-1617 @regression
- Location: tests/users/usersTests.spec.ts:259:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://qa.ovac.pre.councilbox.com/admin", waiting until "load"

```

# Test source

```ts
  23  | export const adminProfessionalUser = envConfig.users.adminProfessional;
  24  | export const superadminUser = envConfig.users.superadmin;
  25  | 
  26  | export const testUser = adminUser;
  27  | 
  28  | const loginUrl = resolveLoginUrl();
  29  | const tokensFile = path.join(process.cwd(), 'playwright/.auth/tokens.json');
  30  | 
  31  | // Custom fixture always injects or clears auth tokens/cookies appropriately and opens page
  32  | export const test = base.extend<{
  33  |   loginPage: LoginPage;
  34  |   homePage: HomePage;
  35  |   institutionsPage: InstitutionsPage;
  36  |   templatesPage: TemplatesPage;
  37  |   tagsPage: TagsPage;
  38  |   documentationPage: DocumentationPage;
  39  |   proceduresPage: ProceduresPage;
  40  |   usersPage: UsersPage;
  41  |   userProfilePage: UserProfilePage;
  42  |   supportPage: SupportPage;
  43  |   appointmentLoginPage: AppointmentLoginPage;
  44  |   appointmentsPage: AppointmentsPage;
  45  |   activityPage: ActivityPage;
  46  |   legalTextsPage: LegalTextsPage;
  47  |   page: Page;
  48  | }>({
  49  |   loginPage: async ({ page }, use) => {
  50  |     await use(new LoginPage(page));
  51  |   },
  52  |   homePage: async ({ page }, use) => {
  53  |     await use(new HomePage(page));
  54  |   },
  55  |   institutionsPage: async ({ page }, use) => {
  56  |     await use(new InstitutionsPage(page));
  57  |   },
  58  |   templatesPage: async ({ page }, use) => {
  59  |     await use(new TemplatesPage(page));
  60  |   },
  61  |   tagsPage: async ({ page }, use) => {
  62  |     await use(new TagsPage(page));
  63  |   },
  64  |   documentationPage: async ({ page }, use) => {
  65  |     await use(new DocumentationPage(page));
  66  |   },
  67  |   proceduresPage: async ({ page }, use) => {
  68  |     await use(new ProceduresPage(page));
  69  |   },
  70  |   usersPage: async ({ page }, use) => {
  71  |     await use(new UsersPage(page));
  72  |   },
  73  |   userProfilePage: async ({ page }, use) => {
  74  |     await use(new UserProfilePage(page));
  75  |   },
  76  |   supportPage: async ({ page }, use) => {
  77  |     await use(new SupportPage(page));
  78  |   },
  79  |   appointmentLoginPage: async ({ page }, use) => {
  80  |     await use(new AppointmentLoginPage(page));
  81  |   },
  82  |   appointmentsPage: async ({ page }, use) => {
  83  |     await use(new AppointmentsPage(page));
  84  |   },
  85  |   activityPage: async ({ page }, use) => {
  86  |     await use(new ActivityPage(page));
  87  |   },
  88  |   legalTextsPage: async ({ page }, use) => {
  89  |     await use(new LegalTextsPage(page));
  90  |   },
  91  |   page: async ({ page }, use, testInfo) => {
  92  |     const fileName = (testInfo.file || '').replace(/\\/g, '/');
  93  |     const isUnauthenticatedTest = fileName.includes('auth.setup.ts') || fileName.includes('loginTests.spec.ts') || fileName.includes('sendMessageToSupport.spec.ts') || fileName.includes('appointmentLogin');
  94  | 
  95  |     if (isUnauthenticatedTest) {
  96  |       // Clear cookies and storage for unauthenticated tests so they stay on login page
  97  |       await page.context().clearCookies().catch(() => {});
  98  |       const targetUrl = fileName.includes('appointmentLogin') 
  99  |         ? loginUrl.replace(/\/admin\/?$/i, '/login') 
  100 |         : loginUrl;
  101 |       await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  102 |       await page.evaluate(() => {
  103 |         try {
  104 |           window.sessionStorage.clear();
  105 |           window.localStorage.clear();
  106 |         } catch {}
  107 |       }).catch(() => {});
  108 |     } else {
  109 |       if (fs.existsSync(tokensFile)) {
  110 |         // Inject auth tokens into sessionStorage before navigation ONLY for authenticated dashboard tests
  111 |         try {
  112 |           const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf-8'));
  113 |           if (tokens.token && tokens.refreshToken) {
  114 |             await page.addInitScript(({ token, refreshToken }) => {
  115 |               window.sessionStorage.setItem('token', token);
  116 |               window.sessionStorage.setItem('refreshUserToken', refreshToken);
  117 |             }, { token: tokens.token, refreshToken: tokens.refreshToken });
  118 |           }
  119 |         } catch (err) {
  120 |           console.warn(`[fixture:page] Could not inject tokens:`, err);
  121 |         }
  122 |       }
> 123 |       await page.goto(loginUrl);
      |                  ^ Error: page.goto: Test timeout of 30000ms exceeded.
  124 |     }
  125 | 
  126 |     // Auto-dismiss any bottom toast/banner or overlay modal for authenticated pages
  127 |     if (!isUnauthenticatedTest) {
  128 |       await new BasePage(page).dismissToastOrModal();
  129 |     }
  130 | 
  131 |     await use(page);
  132 |   },
  133 | });
  134 | 
  135 | // Attach screenshot and video for failed tests
  136 | test.afterEach(async ({ page }, testInfo) => {
  137 |   if (testInfo.status !== testInfo.expectedStatus) {
  138 |     // Screenshot
  139 |     if (page && !page.isClosed()) {
  140 |       try {
  141 |         const screenshot = await page.screenshot();
  142 |         testInfo.attachments.push({
  143 |           name: 'screenshot',
  144 |           contentType: 'image/png',
  145 |           body: screenshot,
  146 |         });
  147 |       } catch (err) {
  148 |         console.warn(`[afterEach] Could not capture screenshot:`, err);
  149 |       }
  150 |     }
  151 | 
  152 |     // Video (if available)
  153 |     const videoPath = testInfo.attachments.find(a => a.name === 'video')?.path;
  154 |     if (videoPath && fs.existsSync(videoPath)) {
  155 |       testInfo.attachments.push({
  156 |         name: 'video',
  157 |         path: videoPath,
  158 |         contentType: 'video/webm',
  159 |       });
  160 |     }
  161 |   }
  162 | });
  163 | 
  164 | export { expect };
  165 | 
```