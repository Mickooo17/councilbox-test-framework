# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/homePageTests.spec.ts >> HomePage - User Profile Tests >> Admin is able to Log out from the page @XR-1361 @OVAC-5656 @smoke @regression
- Location: tests/homePageTests.spec.ts:96:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Login/i }).or(getByRole('button', { name: /Access|Acceder/i })).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: /Login/i }).or(getByRole('button', { name: /Access|Acceder/i })).first() with timeout 10000ms
  - waiting for getByRole('heading', { name: /Login/i }).or(getByRole('button', { name: /Access|Acceder/i })).first()

```

```yaml
- img "councibox-icon"
- img "councibox-icon"
- heading "Service not available" [level=1]
- paragraph: The content you are trying to access is not available. Please try again, and if the problem persists contact your administrator.
- button "Try again"
- contentinfo:
  - img
```

# Test source

```ts
  5   |   readonly profileIcon: Locator;
  6   | 
  7   |   constructor(page: Page) {
  8   |     super(page);
  9   |     this.profileIcon = page.locator('#cbx-header-third-dropdown-user')
  10  |       .or(page.getByRole('button', { name: 'Actions Button' }).first())
  11  |       .or(page.locator('header button:has(img)'))
  12  |       .or(page.locator('[class*="dropdown-user"]'))
  13  |       .first();
  14  |   }
  15  | 
  16  |   async verifyProfileIconIsAccessible() {
  17  |     await test.step('Verify profile icon is accessible', async () => {
  18  |       await expect(this.profileIcon).toBeVisible({ timeout: 15000 });
  19  |       await expect(this.profileIcon).toBeEnabled();
  20  |     });
  21  |   }
  22  | 
  23  |   async validateHomePageIsOpened() {
  24  |     await test.step('Validate home page is opened', async () => {
  25  |       const currentUrl = this.page.url();
  26  |       if (!currentUrl.includes('/company') && !currentUrl.includes('/admin')) {
  27  |         await expect(this.page).toHaveURL(/\/company|\/admin/i, { timeout: 15000 });
  28  |       }
  29  |       await this.verifyProfileIconIsAccessible();
  30  |       await this.dismissToastOrModal();
  31  |     });
  32  |   }
  33  | 
  34  |   async verifyHeaderLogoVisible() {
  35  |     await test.step('Verify entity/organization logo is visible at the top of the page', async () => {
  36  |       const logo = this.page.locator('header img, #cbx-header-third-logo-right, img[alt*="Logo"]').first();
  37  |       await expect(logo).toBeVisible({ timeout: 10000 });
  38  |     });
  39  |   }
  40  | 
  41  |   async hoverAccountIcon() {
  42  |     await test.step('Hover over Account icon in header', async () => {
  43  |       await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
  44  |       await this.profileIcon.hover();
  45  |     });
  46  |   }
  47  | 
  48  |   async openAccountMenu() {
  49  |     await test.step('Open Account dropdown menu', async () => {
  50  |       await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
  51  |       await this.profileIcon.click();
  52  |       await this.page.waitForTimeout(500);
  53  |     });
  54  |   }
  55  | 
  56  |   async verifyOrganizationConfigOptionVisible(shouldBeVisible: boolean = true) {
  57  |     await test.step(`Verify organization/entity configuration option in account menu is ${shouldBeVisible ? 'visible' : 'hidden'}`, async () => {
  58  |       const orgOption = this.page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown')
  59  |         .getByText(/Grupo Castelar|Organization|Organisation|Entidad|Organización/i)
  60  |         .first();
  61  | 
  62  |       if (shouldBeVisible) {
  63  |         await expect(orgOption).toBeVisible({ timeout: 5000 });
  64  |       } else {
  65  |         await expect(orgOption).not.toBeVisible({ timeout: 5000 });
  66  |       }
  67  |     });
  68  |   }
  69  | 
  70  |   async clickOrganizationConfigOption() {
  71  |     await test.step('Click organization configuration option in account menu', async () => {
  72  |       const orgOption = this.page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown')
  73  |         .getByText(/Grupo Castelar|Organization|Organisation|Entidad|Organización/i)
  74  |         .first();
  75  |       await expect(orgOption).toBeVisible({ timeout: 5000 });
  76  |       await orgOption.click();
  77  |       await this.page.waitForURL(/.*\/companies\/edit\/.*/i, { timeout: 15000 });
  78  |     });
  79  |   }
  80  | 
  81  |   async clickSignOff() {
  82  |     await test.step('Click Sign off button in account menu', async () => {
  83  |       // Intercept Logout mutation to prevent invalidating shared session for parallel test workers
  84  |       await this.page.route('**/graphql', async (route) => {
  85  |         const postData = route.request().postDataJSON();
  86  |         if (postData?.operationName === 'Logout') {
  87  |           await route.fulfill({
  88  |             status: 200,
  89  |             contentType: 'application/json',
  90  |             body: JSON.stringify({ data: { logout: { success: true, __typename: 'LogoutResponse' } } }),
  91  |           });
  92  |         } else {
  93  |           await route.continue();
  94  |         }
  95  |       });
  96  | 
  97  |       const signOffBtn = this.page.locator('.MuiPopover-root, [role="menu"], .cbx-header-dropdown')
  98  |         .getByText(/End session|Cerrar sesión|Sign off|Log out/i)
  99  |         .or(this.page.getByRole('menuitem', { name: /End session|Cerrar sesión|Sign off|Log out/i }))
  100 |         .first();
  101 |       await expect(signOffBtn).toBeVisible({ timeout: 5000 });
  102 |       await signOffBtn.click();
  103 |       await this.page.waitForURL(/.*(\/login|\/admin)/i, { timeout: 15000 });
  104 |       await expect(this.page).toHaveURL(/.*(\/login|\/admin)/i);
> 105 |       await expect(this.page.getByRole('heading', { name: /Login/i }).or(this.page.getByRole('button', { name: /Access|Acceder/i })).first()).toBeVisible({ timeout: 10000 });
      |                                                                                                                                               ^ Error: expect(locator).toBeVisible() failed
  106 |     });
  107 |   }
  108 | 
  109 |   async verifyRoleDisplayedOnHover(expectedRolePattern: RegExp = /administrator|admin|super administrator|global administrator|professional|calendar manager/i) {
  110 |     await test.step('Verify user role is displayed when hovering over Account icon', async () => {
  111 |       const tooltip = this.page.locator('.cbx-tooltip-options-container, [class*="cbx-tooltip"]').first();
  112 |       await expect(tooltip).toBeVisible({ timeout: 5000 });
  113 |       await expect(tooltip).toContainText(expectedRolePattern, { timeout: 5000 });
  114 |     });
  115 |   }
  116 | 
  117 |   /**
  118 |    * Simulates a user role (e.g. 'professional' or 'calendarManager') via GraphQL interception (XR-2522).
  119 |    */
  120 |   async simulateUserRole(role: 'professional' | 'calendarManager' | 'admin' | 'superadmin') {
  121 |     await test.step(`Simulate user role as "${role}" via GraphQL interception`, async () => {
  122 |       await this.page.route('**/graphql', async route => {
  123 |         const postData = route.request().postDataJSON();
  124 |         if (postData?.operationName === 'Me') {
  125 |           const response = await route.fetch();
  126 |           const json = await response.json();
  127 |           if (json?.data?.me) {
  128 |             json.data.me.roles = role;
  129 |           }
  130 |           await route.fulfill({ json });
  131 |         } else if (postData?.operationName === 'UserCompanies') {
  132 |           const response = await route.fetch();
  133 |           const json = await response.json();
  134 |           if (json?.data?.paginatedUserCompanies?.list) {
  135 |             json.data.paginatedUserCompanies.list.forEach((item: any) => {
  136 |               item.role = role;
  137 |             });
  138 |           }
  139 |           await route.fulfill({ json });
  140 |         } else {
  141 |           await route.continue();
  142 |         }
  143 |       });
  144 |       await this.page.reload({ waitUntil: 'domcontentloaded' });
  145 |       await this.dismissToastOrModal();
  146 |     });
  147 |   }
  148 | }
  149 | 
```