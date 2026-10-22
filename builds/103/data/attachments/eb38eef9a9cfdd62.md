# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Search Tests >> should search for a non-existent institution and verify no results @regression
- Location: tests/institutions/institutionsTests.spec.ts:41:7

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: /company-logo QA DEV|QA DEV/i }).or(getByText(/QA DEV/i)).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e5]:
    - heading "Entities" [level=1] [ref=e6] [cursor=pointer]
    - link [ref=e9] [cursor=pointer]:
      - /url: /company/1112/myCompanies
      - button [ref=e10]:
        - generic [ref=e11]:
          - text: See more entities
          - img "See more entities" [ref=e12]
    - generic [ref=e16]:
      - generic [ref=e17]:
        - menuitem "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e18] [cursor=pointer]
        - separator [ref=e21]
      - generic [ref=e22]:
        - menuitem "Kratos" [ref=e23] [cursor=pointer]
        - separator [ref=e26]
      - generic [ref=e27]:
        - menuitem "FNMT" [ref=e28] [cursor=pointer]
        - separator [ref=e31]
      - generic [ref=e32]:
        - menuitem "Edin Dzeko" [ref=e33] [cursor=pointer]
        - separator [ref=e36]
      - generic [ref=e37]:
        - menuitem "SIPA DODIK" [ref=e38] [cursor=pointer]
        - separator [ref=e41]
      - generic [ref=e42]:
        - menuitem "Patribank Entity" [ref=e43] [cursor=pointer]
        - separator [ref=e46]
      - generic [ref=e47]:
        - menuitem " new company 19 jun" [ref=e48] [cursor=pointer]:
          - generic [ref=e49]: 
          - generic [ref=e51]: new company 19 jun
        - separator [ref=e52]
      - generic [ref=e53]:
        - menuitem " zzzzzzzz" [ref=e54] [cursor=pointer]:
          - generic [ref=e55]: 
          - generic [ref=e57]: zzzzzzzz
        - separator [ref=e58]
      - generic [ref=e59]:
        - menuitem " DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD" [ref=e60] [cursor=pointer]:
          - generic [ref=e61]: 
          - generic [ref=e63]: DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
        - separator [ref=e64]
      - generic [ref=e65]:
        - menuitem " ggggggggggggggggggg" [ref=e66] [cursor=pointer]:
          - generic [ref=e67]: 
          - generic [ref=e69]: ggggggggggggggggggg
        - separator [ref=e70]
  - generic [ref=e71]:
    - button "" [active] [ref=e72] [cursor=pointer]
    - generic [ref=e77]:
      - link [ref=e79] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=e80]:
          - generic [ref=e81]: 
          - generic [ref=e83]: Activity
      - link [ref=e85] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=e86]:
          - generic [ref=e87]: 
          - generic [ref=e89]: Appointments
      - link [ref=e91] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=e92]:
          - generic [ref=e93]: 
          - generic [ref=e95]: Processes
      - link [ref=e97] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=e98]:
          - generic [ref=e99]: 
          - generic [ref=e101]: Procedures
      - link [ref=e103] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=e104]:
          - generic [ref=e105]: 
          - generic [ref=e107]: Templates
      - link [ref=e109] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=e110]:
          - generic [ref=e111]: 
          - generic [ref=e113]: Documents
      - link [ref=e115] [cursor=pointer]:
        - /url: /company/1112/companies
        - button " Entities" [ref=e116]:
          - generic [ref=e117]: 
          - generic [ref=e119]: Entities
      - link [ref=e121] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=e122]:
          - generic [ref=e123]: 
          - generic [ref=e125]: Users
    - generic [ref=e127]:
      - img "CBX white Logo" [ref=e128]
      - generic [ref=e129]: © 2026 v8.7.3
  - generic [ref=e131]:
    - banner [ref=e132]:
      - button [ref=e134] [cursor=pointer]:
        - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=e135]
      - generic [ref=e136]: Grupo Castelar Servicios Legales y Financieros S.A
      - generic [ref=e142]:
        - button [ref=e145] [cursor=pointer]:
          - button "Notifications" [ref=e146]:
            - generic [ref=e147]: 
        - button [ref=e149] [cursor=pointer]:
          - button "Button user" [ref=e151]:
            - generic [ref=e154]:
              - img "Logo Virtual Citizen Service Office" [ref=e156]
              - generic [ref=e157]: 
    - generic [ref=e159]:
      - button "Actions" [ref=e162] [cursor=pointer]:
        - generic [ref=e163]: 
      - generic [ref=e165]:
        - tablist "Pestañas" [ref=e169]:
          - tab "Botón" [selected] [ref=e170] [cursor=pointer]:
            - paragraph [ref=e172]: Video-appointments
          - tab "Botón" [ref=e173] [cursor=pointer]:
            - paragraph [ref=e175]: In-person appointments
        - generic [ref=e177]:
          - generic [ref=e179]:
            - generic [ref=e180]:
              - generic [ref=e182]:
                - generic [ref=e185]:
                  - generic [ref=e186] [cursor=pointer]:
                    - generic [ref=e188]:
                      - generic [ref=e189]: 
                      - generic [ref=e190]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=e196]:
                  - generic [ref=e197] [cursor=pointer]:
                    - generic [ref=e198]: Confirmed, In progress, Pending report, Completed, In pause
                    - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                    - generic [ref=e199]: Status
                  - group [aria-hidden]
                - generic [ref=e205]:
                  - generic [ref=e206] [cursor=pointer]:
                    - generic [ref=e207]: This week
                    - combobox "Period": This week
                    - generic [ref=e208]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=e212] [cursor=pointer]:
                  - generic [ref=e213]: 
              - generic [ref=e214]:
                - generic [ref=e215]:
                  - paragraph [ref=e216]: Search by participant or record
                  - generic [ref=e219]:
                    - button "Botón" [ref=e221] [cursor=pointer]:
                      - generic [ref=e222]: 
                    - textbox "Search by participant or record" [ref=e223]:
                      - /placeholder: Search
                - button "Help" [ref=e224] [cursor=pointer]:
                  - generic [ref=e225]: 
            - generic [ref=e233]:
              - table [ref=e234]:
                - rowgroup [ref=e235]:
                  - row [ref=e236]:
                    - columnheader "Selection" [ref=e237]
                    - columnheader "Date Date " [ref=e239]:
                      - generic [ref=e240]: Date
                      - button "Date " [ref=e241] [cursor=pointer]:
                        - generic [ref=e242]: Date
                        - generic [ref=e243]: 
                    - columnheader "Ref. Ref. " [ref=e245]:
                      - generic [ref=e246]: Ref.
                      - button "Ref. " [ref=e247] [cursor=pointer]:
                        - generic [ref=e248]: Ref.
                        - generic [ref=e249]: 
                    - columnheader "External ID External ID " [ref=e251]:
                      - generic [ref=e252]: External ID
                      - button "External ID " [ref=e253] [cursor=pointer]:
                        - generic [ref=e254]: External ID
                        - generic [ref=e255]: 
                    - columnheader "Record Record " [ref=e257]:
                      - generic [ref=e258]: Record
                      - button "Record " [ref=e259] [cursor=pointer]:
                        - generic [ref=e260]: Record
                        - generic [ref=e261]: 
                    - columnheader "Documents" [ref=e263]
                    - columnheader "Entity Entity " [ref=e264]:
                      - generic [ref=e265]: Entity
                      - button "Entity " [ref=e266] [cursor=pointer]:
                        - generic [ref=e267]: Entity
                        - generic [ref=e268]: 
                    - columnheader "Status Status " [ref=e270]:
                      - generic [ref=e271]: Status
                      - button "Status " [ref=e272] [cursor=pointer]:
                        - generic [ref=e273]: Status
                        - generic [ref=e274]: 
                    - columnheader "Actions [object Object]" [ref=e276]:
                      - generic [ref=e277]: Actions
                      - generic [ref=e280]:
                        - generic [ref=e281] [cursor=pointer]:
                          - generic [aria-hidden] [ref=e283]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=e285]:
                  - row [ref=e286] [cursor=pointer]:
                    - cell [ref=e287]:
                      - checkbox "Select" [ref=e292]
                    - cell " 22/10/2026 11:15" [ref=e295]:
                      - generic [ref=e296]:
                        - generic [ref=e297]: 
                        - generic [ref=e300]:
                          - generic [ref=e301]: 22/10/2026
                          - generic [ref=e302]: 11:15
                    - cell "67345" [ref=e303]
                    - cell [ref=e304]
                    - cell "11121112673452026c717c" [ref=e305]
                    - cell [ref=e306]:
                      - button "1" [ref=e308]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e310]
                    - cell "Confirmed" [ref=e313]
                    - cell [ref=e321]:
                      - button "More" [ref=e324]:
                        - generic [ref=e325]: 
                  - row [ref=e327] [cursor=pointer]:
                    - cell [ref=e328]:
                      - checkbox "Select" [ref=e333]
                    - cell " 22/10/2026 10:00 " [ref=e336]:
                      - generic [ref=e337]:
                        - generic [ref=e338]: 
                        - generic [ref=e341]:
                          - generic [ref=e342]: 22/10/2026
                          - generic [ref=e343]: 10:00
                        - generic [ref=e344]: 
                    - cell "67321" [ref=e347]
                    - cell [ref=e348]
                    - cell "111211126732120265b579" [ref=e349]
                    - cell [ref=e350]:
                      - button "5" [ref=e352]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e353]
                    - cell "Completed" [ref=e356]
                    - cell [ref=e364]:
                      - button "More" [ref=e367]:
                        - generic [ref=e368]: 
                  - row [ref=e370] [cursor=pointer]:
                    - cell [ref=e371]:
                      - checkbox "Select" [ref=e376]
                    - cell " 22/10/2026 07:00" [ref=e379]:
                      - generic [ref=e380]:
                        - generic [ref=e381]: 
                        - generic [ref=e384]:
                          - generic [ref=e385]: 22/10/2026
                          - generic [ref=e386]: 07:00
                    - cell "67275" [ref=e387]
                    - cell [ref=e388]
                    - cell "1112111267275202605025" [ref=e389]
                    - cell [ref=e390]:
                      - button "2" [ref=e392]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e393]
                    - cell "Pending report" [ref=e396]
                    - cell [ref=e404]:
                      - button "More" [ref=e407]:
                        - generic [ref=e408]: 
                  - row [ref=e410] [cursor=pointer]:
                    - cell [ref=e411]:
                      - checkbox "Select" [ref=e416]
                    - cell " 21/10/2026 17:00 " [ref=e419]:
                      - generic [ref=e420]:
                        - generic [ref=e421]: 
                        - generic [ref=e424]:
                          - generic [ref=e425]: 21/10/2026
                          - generic [ref=e426]: 17:00
                        - generic [ref=e427]: 
                    - cell "67329" [ref=e430]
                    - cell [ref=e431]
                    - cell "1112111267329202658a74" [ref=e432]
                    - cell [ref=e433]:
                      - button "0" [ref=e435]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e436]
                    - cell "Confirmed" [ref=e439]
                    - cell [ref=e447]:
                      - button "More" [ref=e450]:
                        - generic [ref=e451]: 
                  - row [ref=e453] [cursor=pointer]:
                    - cell [ref=e454]:
                      - checkbox "Select" [ref=e459]
                    - cell " 21/10/2026 13:00  " [ref=e462]:
                      - generic [ref=e463]:
                        - generic [ref=e464]: 
                        - generic [ref=e467]:
                          - generic [ref=e468]: 21/10/2026
                          - generic [ref=e469]: 13:00
                        - generic [ref=e470]:
                          - generic [ref=e471]: 
                          - generic [ref=e473]: 
                    - cell "67322" [ref=e475]
                    - cell [ref=e476]
                    - cell "1112111267322202602d6d" [ref=e477]
                    - cell [ref=e478]:
                      - button "5" [ref=e480]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e481]
                    - cell "Confirmed" [ref=e484]
                    - cell [ref=e492]:
                      - button "More" [ref=e495]:
                        - generic [ref=e496]: 
                  - row [ref=e498] [cursor=pointer]:
                    - cell [ref=e499]:
                      - checkbox "Select" [ref=e504]
                    - cell " 21/10/2026 11:45 " [ref=e507]:
                      - generic [ref=e508]:
                        - generic [ref=e509]: 
                        - generic [ref=e512]:
                          - generic [ref=e513]: 21/10/2026
                          - generic [ref=e514]: 11:45
                        - generic [ref=e515]: 
                    - cell "67276" [ref=e518]
                    - cell [ref=e519]
                    - cell "1112111267276202609323" [ref=e520]
                    - cell [ref=e521]:
                      - button "6" [ref=e523]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e525]
                    - cell "Confirmed" [ref=e528]
                    - cell [ref=e536]:
                      - button "More" [ref=e539]:
                        - generic [ref=e540]: 
                  - row [ref=e542] [cursor=pointer]:
                    - cell [ref=e543]:
                      - checkbox "Select" [ref=e548]
                    - cell " 21/10/2026 09:00 " [ref=e551]:
                      - generic [ref=e552]:
                        - generic [ref=e553]: 
                        - generic [ref=e556]:
                          - generic [ref=e557]: 21/10/2026
                          - generic [ref=e558]: 09:00
                        - generic [ref=e559]: 
                    - cell "67310" [ref=e562]
                    - cell [ref=e563]
                    - cell "111215456731020265153a" [ref=e564]
                    - cell [ref=e565]:
                      - button "5" [ref=e567]
                    - cell "Edin Dzeko" [ref=e568]
                    - cell "In progress" [ref=e571]
                    - cell [ref=e579]:
                      - button "More" [ref=e582]:
                        - generic [ref=e583]: 
                  - row [ref=e585] [cursor=pointer]:
                    - cell [ref=e586]:
                      - checkbox "Select" [ref=e591]
                    - cell " 21/10/2026 07:15" [ref=e594]:
                      - generic [ref=e595]:
                        - generic [ref=e596]: 
                        - generic [ref=e599]:
                          - generic [ref=e600]: 21/10/2026
                          - generic [ref=e601]: 07:15
                    - cell "67208" [ref=e602]
                    - cell [ref=e603]
                    - cell "111211126720820266dd90" [ref=e604]
                    - cell [ref=e605]:
                      - button "6" [ref=e607]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e609]
                    - cell "Pending report" [ref=e612]
                    - cell [ref=e620]:
                      - button "More" [ref=e623]:
                        - generic [ref=e624]: 
                  - row [ref=e626] [cursor=pointer]:
                    - cell [ref=e627]:
                      - checkbox "Select" [ref=e632]
                    - cell " 19/10/2026 10:15 " [ref=e635]:
                      - generic [ref=e636]:
                        - generic [ref=e637]: 
                        - generic [ref=e640]:
                          - generic [ref=e641]: 19/10/2026
                          - generic [ref=e642]: 10:15
                        - generic [ref=e643]: 
                    - cell "67263" [ref=e646]
                    - cell [ref=e647]
                    - cell "11121112672632026dfaa5" [ref=e648]
                    - cell [ref=e649]:
                      - button "2" [ref=e651]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e652]
                    - cell "In progress" [ref=e655]
                    - cell [ref=e663]:
                      - button "More" [ref=e666]:
                        - generic [ref=e667]: 
                  - row [ref=e669] [cursor=pointer]:
                    - cell [ref=e670]:
                      - checkbox "Select" [ref=e675]
                    - cell " 19/10/2026 06:30 " [ref=e678]:
                      - generic [ref=e679]:
                        - generic [ref=e680]: 
                        - generic [ref=e683]:
                          - generic [ref=e684]: 19/10/2026
                          - generic [ref=e685]: 06:30
                        - generic [ref=e686]: 
                    - cell "67190" [ref=e689]
                    - cell [ref=e690]
                    - cell "111211126719020269c2cf" [ref=e691]
                    - cell [ref=e692]:
                      - button "5" [ref=e694]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e695]
                    - cell "Confirmed" [ref=e698]
                    - cell [ref=e706]:
                      - button "More" [ref=e709]:
                        - generic [ref=e710]: 
              - generic [ref=e712]: 1 - 10 of 10
          - generic [ref=e716]:
            - generic [ref=e717] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=e718] [cursor=pointer]: PRIVACY_POLICY
          - generic [ref=e719]:
            - generic [ref=e720]:
              - generic [ref=e721] [cursor=pointer]: 
              - generic [ref=e723]: 0 selected
            - generic [ref=e726] [cursor=pointer]:
              - generic [ref=e728]: 
              - generic [ref=e729]: SELECT ALL
```

# Test source

```ts
  1   | import { Page, Locator, test } from '@playwright/test';
  2   | 
  3   | export class BasePage {
  4   |     readonly closeModalButton: Locator;
  5   |     readonly institutionsButton: Locator;
  6   |     readonly templatesButton: Locator;
  7   |     readonly proceduresButton: Locator;
  8   |     readonly documentationButton: Locator;
  9   |     readonly usersButton: Locator;
  10  |     readonly appointmentsButton: Locator;
  11  |     readonly governmentIcon: Locator;
  12  |     readonly qaDevMenuItem: Locator;
  13  | 
  14  |     constructor(public page: Page) {
  15  |         this.closeModalButton = page.locator('.MuiButtonBase-root.MuiIconButton-root.closeIcon');
  16  |         this.appointmentsButton = page.locator('a[href*="/company/"][href*="appointments"]').or(page.locator('a[href*="/company/"]')).or(page.getByRole('button', { name: /Appointments|Citas/i })).or(page.locator('.ri-calendar-line, [class*="calendar"]').locator('..')).first();
  17  |         this.institutionsButton = page.locator('a[href*="/companies"]').or(page.getByRole('button', { name: /Entities|Institutions|Entidades|Instituciones/i })).first();
  18  |         this.templatesButton = page.locator('a[href*="/drafts"]').or(page.getByRole('button', { name: /Templates|Plantillas/i })).first();
  19  |         this.proceduresButton = page.locator('a[href*="/procedures"]').or(page.getByRole('button', { name: /Procedures|Procedimientos/i })).first();
  20  |         this.documentationButton = page.locator('a[href*="/documentation"]').or(page.locator('#documentation-link')).first();
  21  |         this.usersButton = page.locator('a[href*="/users"]').or(page.getByRole('button', { name: /Users|Usuarios/i })).first();
  22  |         this.governmentIcon = page.locator('.ri-government-line, [class*="government"]').first();
  23  |         this.qaDevMenuItem = page.getByRole('menuitem', { name: /company-logo QA DEV|QA DEV/i }).or(page.getByText(/QA DEV/i)).first();
  24  |     }
  25  | 
  26  |     async dismissModal() {
  27  |         await test.step('Dismiss modal dialog', async () => {
  28  |             const modal = this.page.locator('#alert-confirm, .MuiDialog-root, #modal');
  29  |             if (await modal.first().isVisible({ timeout: 2000 }).catch(() => false)) {
  30  |                 const actionBtn = modal.first().locator('button').first();
  31  |                 if (await actionBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
  32  |                     await actionBtn.click();
  33  |                 } else {
  34  |                     await this.page.keyboard.press('Escape');
  35  |                 }
  36  |                 await modal.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  37  |             }
  38  |         });
  39  |     }
  40  | 
  41  |     async dismissToastOrModal() {
  42  |         await test.step('Dismiss toast or modal banner if present', async () => {
  43  |             const closeBtn = this.page.locator(`
  44  |                 .slide-in button,
  45  |                 .slide-in [class*="close"],
  46  |                 .slide-in [aria-label*="close" i],
  47  |                 .MuiButtonBase-root.MuiIconButton-root.closeIcon,
  48  |                 button.closeIcon,
  49  |                 [class*="toast"] button,
  50  |                 [class*="snackbar"] button,
  51  |                 button[aria-label="close" i],
  52  |                 button[aria-label="Close" i]
  53  |             `).first();
  54  | 
  55  |             if (await closeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
  56  |                 await closeBtn.click({ timeout: 1000, force: true }).catch(() => {});
  57  |             }
  58  | 
  59  |             await this.page.evaluate(() => {
  60  |                 document.querySelectorAll('.slide-in, .cbx-dropdown-backdrop, .cbx-dropdown-presentation, [class*="Toastify__toast"], #modal.cbx-Modal-container, .cbx-Modal-backdrop').forEach(el => (el as HTMLElement).remove());
  61  |             }).catch(() => {});
  62  |         });
  63  |     }
  64  | 
  65  |     async selectQADevCompany() {
  66  |         await test.step('Select QA DEV company', async () => {
  67  |             await this.governmentIcon.click();
> 68  |             await this.qaDevMenuItem.click();
      |                                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  69  |             await this.page.waitForTimeout(1000);
  70  |         });
  71  |     }
  72  | 
  73  |     async navigateToInstitutions() {
  74  |         await test.step('Navigate to Institutions page', async () => {
  75  |             await this.institutionsButton.waitFor({ state: 'visible', timeout: 10000 });
  76  |             await this.institutionsButton.click();
  77  |         });
  78  |     }
  79  | 
  80  |     async navigateToTemplates() {
  81  |         await test.step('Navigate to Templates page', async () => {
  82  |             await this.templatesButton.waitFor({ state: 'visible', timeout: 10000 });
  83  |             await this.templatesButton.click();
  84  |         });
  85  |     }
  86  | 
  87  |     async navigateToProcedures() {
  88  |         await test.step('Navigate to Procedures page', async () => {
  89  |             await this.proceduresButton.waitFor({ state: 'visible', timeout: 10000 });
  90  |             await this.proceduresButton.click();
  91  |             await this.page.waitForTimeout(1000);
  92  |         });
  93  |     }
  94  | 
  95  |     async navigateToDocumentation() {
  96  |         await test.step('Navigate to Documentation page', async () => {
  97  |             await this.documentationButton.waitFor({ state: 'visible', timeout: 10000 });
  98  |             await this.documentationButton.click();
  99  |         });
  100 |     }
  101 | 
  102 |     async navigateToUsers() {
  103 |         await test.step('Navigate to Users page', async () => {
  104 |             await this.usersButton.waitFor({ state: 'visible', timeout: 10000 });
  105 |             await this.usersButton.click();
  106 |             await this.page.waitForTimeout(1000);
  107 |         });
  108 |     }
  109 | 
  110 |     async navigateToAppointments() {
  111 |         await test.step('Navigate to Appointments page', async () => {
  112 |             await this.appointmentsButton.waitFor({ state: 'visible', timeout: 10000 });
  113 |             await this.appointmentsButton.click();
  114 |             await this.page.waitForTimeout(1000);
  115 |         });
  116 |     }
  117 | }
  118 | 
```