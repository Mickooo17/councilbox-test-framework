# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/users/usersTests.spec.ts >> Users - Table Header & Display Tests >> It is possible to filter users by "Name" on the "Users" page @XR-2989 @regression
- Location: tests/users/usersTests.spec.ts:506:7

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
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e5]:
      - heading "Entities" [level=1] [ref=e6] [cursor=pointer]
      - generic [ref=e10]:
        - generic [ref=e11]:
          - menuitem "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e12] [cursor=pointer]
          - separator [ref=e15]
        - generic [ref=e16]:
          - menuitem "Kratos" [ref=e17] [cursor=pointer]
          - separator [ref=e20]
        - generic [ref=e21]:
          - menuitem "FNMT" [ref=e22] [cursor=pointer]
          - separator [ref=e25]
        - generic [ref=e26]:
          - menuitem "Edin Dzeko" [ref=e27] [cursor=pointer]
          - separator [ref=e30]
        - generic [ref=e31]:
          - menuitem "SIPA DODIK" [ref=e32] [cursor=pointer]
          - separator [ref=e35]
        - generic [ref=e36]:
          - menuitem "Patribank Entity" [ref=e37] [cursor=pointer]
          - separator [ref=e40]
        - generic [ref=e41]:
          - menuitem " Automation Institution 642139" [ref=e42] [cursor=pointer]:
            - generic [ref=e43]: 
            - generic [ref=e45]: Automation Institution 642139
          - separator [ref=e46]
        - generic [ref=e47]:
          - menuitem " Automation Institution 954775" [ref=e48] [cursor=pointer]:
            - generic [ref=e49]: 
            - generic [ref=e51]: Automation Institution 954775
          - separator [ref=e52]
        - generic [ref=e53]:
          - menuitem " Automation Institution 349672" [ref=e54] [cursor=pointer]:
            - generic [ref=e55]: 
            - generic [ref=e57]: Automation Institution 349672
          - separator [ref=e58]
        - generic [ref=e59]:
          - menuitem "Notaría y Servicios Jurídicos Castelar S.L." [ref=e60] [cursor=pointer]
          - separator [ref=e63]
    - generic [ref=e64]:
      - button "" [active] [ref=e65] [cursor=pointer]
      - generic [ref=e70]:
        - link [ref=e72] [cursor=pointer]:
          - /url: /company/1112/activity/dashboardCouncils
          - button " Activity" [ref=e73]:
            - generic [ref=e74]: 
            - generic [ref=e76]: Activity
        - link [ref=e78] [cursor=pointer]:
          - /url: /company/1112
          - button " Appointments" [ref=e79]:
            - generic [ref=e80]: 
            - generic [ref=e82]: Appointments
        - link [ref=e84] [cursor=pointer]:
          - /url: /company/1112/managements
          - button " Processes" [ref=e85]:
            - generic [ref=e86]: 
            - generic [ref=e88]: Processes
        - link [ref=e90] [cursor=pointer]:
          - /url: /company/1112/procedures
          - button " Procedures" [ref=e91]:
            - generic [ref=e92]: 
            - generic [ref=e94]: Procedures
        - link [ref=e96] [cursor=pointer]:
          - /url: /company/1112/drafts
          - button " Templates" [ref=e97]:
            - generic [ref=e98]: 
            - generic [ref=e100]: Templates
        - link [ref=e102] [cursor=pointer]:
          - /url: /company/1112/documentation
          - button " Documents" [ref=e103]:
            - generic [ref=e104]: 
            - generic [ref=e106]: Documents
        - link [ref=e108] [cursor=pointer]:
          - /url: /company/1112/companies
          - button " Entities" [ref=e109]:
            - generic [ref=e110]: 
            - generic [ref=e112]: Entities
        - link [ref=e114] [cursor=pointer]:
          - /url: /company/1112/users
          - button " Users" [ref=e115]:
            - generic [ref=e116]: 
            - generic [ref=e118]: Users
      - generic [ref=e120]:
        - img "CBX white Logo" [ref=e121]
        - generic [ref=e122]: © 2026 v8.7.5
    - generic [ref=e124]:
      - banner [ref=e125]:
        - button [ref=e127] [cursor=pointer]:
          - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=e128]
        - generic [ref=e129]: Grupo Castelar Servicios Legales y Financieros S.A
        - generic [ref=e135]:
          - button [ref=e138] [cursor=pointer]:
            - button "Notifications" [ref=e139]:
              - generic [ref=e140]: 
          - button [ref=e142] [cursor=pointer]:
            - button "Button user" [ref=e144]:
              - generic [ref=e147]:
                - img "Logo Virtual Citizen Service Office" [ref=e149]
                - generic [ref=e150]: 
      - generic [ref=e152]:
        - button "Actions" [ref=e155] [cursor=pointer]:
          - generic [ref=e156]: 
        - generic [ref=e158]:
          - tablist "Pestañas" [ref=e162]:
            - tab "Botón" [selected] [ref=e163] [cursor=pointer]:
              - paragraph [ref=e165]: Video-appointments
            - tab "Botón" [ref=e166] [cursor=pointer]:
              - paragraph [ref=e168]: In-person appointments
          - generic [ref=e170]:
            - generic [ref=e172]:
              - generic [ref=e173]:
                - generic [ref=e175]:
                  - generic [ref=e178]:
                    - generic [ref=e179] [cursor=pointer]:
                      - generic [ref=e181]:
                        - generic [ref=e182]: 
                        - generic [ref=e183]: List view
                      - combobox "Campo de texto": "[object Object]"
                    - group [aria-hidden]
                  - generic [ref=e189]:
                    - generic [ref=e190] [cursor=pointer]:
                      - generic [ref=e191]: Confirmed, In progress, Pending report, Completed, In pause
                      - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                      - generic [ref=e192]: Status
                    - group [aria-hidden]
                  - generic [ref=e198]:
                    - generic [ref=e199] [cursor=pointer]:
                      - generic [ref=e200]: This week
                      - combobox "Period": This week
                      - generic [ref=e201]: Period
                    - group [aria-hidden]
                  - button "Botón" [ref=e205] [cursor=pointer]:
                    - generic [ref=e206]: 
                - generic [ref=e207]:
                  - generic [ref=e208]:
                    - paragraph [ref=e209]: Search by participant or record
                    - generic [ref=e212]:
                      - button "Botón" [ref=e214] [cursor=pointer]:
                        - generic [ref=e215]: 
                      - textbox "Search by participant or record" [ref=e216]:
                        - /placeholder: Search
                  - button "Help" [ref=e217] [cursor=pointer]:
                    - generic [ref=e218]: 
              - generic [ref=e226]:
                - table [ref=e227]:
                  - rowgroup [ref=e228]:
                    - row [ref=e229]:
                      - columnheader "Selection" [ref=e230]
                      - columnheader "Date Date " [ref=e232]:
                        - generic [ref=e233]: Date
                        - button "Date " [ref=e234] [cursor=pointer]:
                          - generic [ref=e235]: Date
                          - generic [ref=e236]: 
                      - columnheader "Ref. Ref. " [ref=e238]:
                        - generic [ref=e239]: Ref.
                        - button "Ref. " [ref=e240] [cursor=pointer]:
                          - generic [ref=e241]: Ref.
                          - generic [ref=e242]: 
                      - columnheader "External ID External ID " [ref=e244]:
                        - generic [ref=e245]: External ID
                        - button "External ID " [ref=e246] [cursor=pointer]:
                          - generic [ref=e247]: External ID
                          - generic [ref=e248]: 
                      - columnheader "Record Record " [ref=e250]:
                        - generic [ref=e251]: Record
                        - button "Record " [ref=e252] [cursor=pointer]:
                          - generic [ref=e253]: Record
                          - generic [ref=e254]: 
                      - columnheader "Documents" [ref=e256]
                      - columnheader "Entity Entity " [ref=e257]:
                        - generic [ref=e258]: Entity
                        - button "Entity " [ref=e259] [cursor=pointer]:
                          - generic [ref=e260]: Entity
                          - generic [ref=e261]: 
                      - columnheader "Status Status " [ref=e263]:
                        - generic [ref=e264]: Status
                        - button "Status " [ref=e265] [cursor=pointer]:
                          - generic [ref=e266]: Status
                          - generic [ref=e267]: 
                      - columnheader "Actions [object Object]" [ref=e269]:
                        - generic [ref=e270]: Actions
                        - generic [ref=e273]:
                          - generic [ref=e274] [cursor=pointer]:
                            - generic [aria-hidden] [ref=e276]: 
                            - combobox "Settings": "[object Object]"
                          - group [aria-hidden]
                  - rowgroup [ref=e278]:
                    - row [ref=e279] [cursor=pointer]:
                      - cell [ref=e280]:
                        - checkbox "Select" [ref=e285]
                      - cell " 30/10/2026 08:00" [ref=e288]:
                        - generic [ref=e289]:
                          - generic [ref=e290]: 
                          - generic [ref=e293]:
                            - generic [ref=e294]: 30/10/2026
                            - generic [ref=e295]: 08:00
                      - cell "67334" [ref=e296]
                      - cell [ref=e297]
                      - cell "moqa" [ref=e298]
                      - cell [ref=e299]:
                        - button "4" [ref=e301]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e303]
                      - cell "Confirmed" [ref=e306]
                      - cell [ref=e314]:
                        - button "More" [ref=e317]:
                          - generic [ref=e318]: 
                    - row [ref=e320] [cursor=pointer]:
                      - cell [ref=e321]:
                        - checkbox "Select" [ref=e326]
                      - cell " 28/10/2026 13:45" [ref=e329]:
                        - generic [ref=e330]:
                          - generic [ref=e331]: 
                          - generic [ref=e334]:
                            - generic [ref=e335]: 28/10/2026
                            - generic [ref=e336]: 13:45
                      - cell "67404" [ref=e337]
                      - cell [ref=e338]
                      - cell "11121112674042026208d3" [ref=e339]
                      - cell [ref=e340]:
                        - button "1" [ref=e342]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e343]
                      - cell "Confirmed" [ref=e346]
                      - cell [ref=e354]:
                        - button "More" [ref=e357]:
                          - generic [ref=e358]: 
                    - row [ref=e360] [cursor=pointer]:
                      - cell [ref=e361]:
                        - checkbox "Select" [ref=e366]
                      - cell " 28/10/2026 12:30" [ref=e369]:
                        - generic [ref=e370]:
                          - generic [ref=e371]: 
                          - generic [ref=e374]:
                            - generic [ref=e375]: 28/10/2026
                            - generic [ref=e376]: 12:30
                      - cell "67403" [ref=e377]
                      - cell [ref=e378]
                      - cell "111211126740320269ba75" [ref=e379]
                      - cell [ref=e380]:
                        - button "1" [ref=e382]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e383]
                      - cell "Confirmed" [ref=e386]
                      - cell [ref=e394]:
                        - button "More" [ref=e397]:
                          - generic [ref=e398]: 
                    - row [ref=e400] [cursor=pointer]:
                      - cell [ref=e401]:
                        - checkbox "Select" [ref=e406]
                      - cell " 28/10/2026 12:30" [ref=e409]:
                        - generic [ref=e410]:
                          - generic [ref=e411]: 
                          - generic [ref=e414]:
                            - generic [ref=e415]: 28/10/2026
                            - generic [ref=e416]: 12:30
                      - cell "67402" [ref=e417]
                      - cell [ref=e418]
                      - cell "11121112674022026d156d" [ref=e419]
                      - cell [ref=e420]:
                        - button "1" [ref=e422]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e423]
                      - cell "Confirmed" [ref=e426]
                      - cell [ref=e434]:
                        - button "More" [ref=e437]:
                          - generic [ref=e438]: 
                    - row [ref=e440] [cursor=pointer]:
                      - cell [ref=e441]:
                        - checkbox "Select" [ref=e446]
                      - cell " 28/10/2026 11:45" [ref=e449]:
                        - generic [ref=e450]:
                          - generic [ref=e451]: 
                          - generic [ref=e454]:
                            - generic [ref=e455]: 28/10/2026
                            - generic [ref=e456]: 11:45
                      - cell "67405" [ref=e457]
                      - cell [ref=e458]
                      - cell "1112111267405202626966" [ref=e459]
                      - cell [ref=e460]:
                        - button "0" [ref=e462]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e463]
                      - cell "In progress" [ref=e466]
                      - cell [ref=e474]:
                        - button "More" [ref=e477]:
                          - generic [ref=e478]: 
                    - row [ref=e480] [cursor=pointer]:
                      - cell [ref=e481]:
                        - checkbox "Select" [ref=e486]
                      - cell " 28/10/2026 08:00 " [ref=e489]:
                        - generic [ref=e490]:
                          - generic [ref=e491]: 
                          - generic [ref=e494]:
                            - generic [ref=e495]: 28/10/2026
                            - generic [ref=e496]: 08:00
                          - generic [ref=e497]: 
                      - cell "67316" [ref=e500]
                      - cell [ref=e501]
                      - cell "111211126731620265cfca" [ref=e502]
                      - cell [ref=e503]:
                        - button "5" [ref=e505]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e506]
                      - cell "Confirmed" [ref=e509]
                      - cell [ref=e517]:
                        - button "More" [ref=e520]:
                          - generic [ref=e521]: 
                    - row [ref=e523] [cursor=pointer]:
                      - cell [ref=e524]:
                        - checkbox "Select" [ref=e529]
                      - cell " 27/10/2026 14:30 " [ref=e532]:
                        - generic [ref=e533]:
                          - generic [ref=e534]: 
                          - generic [ref=e537]:
                            - generic [ref=e538]: 27/10/2026
                            - generic [ref=e539]: 14:30
                          - generic [ref=e540]: 
                      - cell "67393" [ref=e543]
                      - cell [ref=e544]
                      - cell "111211126739320262f004" [ref=e545]
                      - cell [ref=e546]:
                        - button "5" [ref=e548]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e550]
                      - cell "In progress" [ref=e553]
                      - cell [ref=e561]:
                        - button "More" [ref=e564]:
                          - generic [ref=e565]: 
                    - row [ref=e567] [cursor=pointer]:
                      - cell [ref=e568]:
                        - checkbox "Select" [ref=e573]
                      - cell " 27/10/2026 14:00 " [ref=e576]:
                        - generic [ref=e577]:
                          - generic [ref=e578]: 
                          - generic [ref=e581]:
                            - generic [ref=e582]: 27/10/2026
                            - generic [ref=e583]: 14:00
                          - generic [ref=e584]: 
                      - cell "67392" [ref=e587]
                      - cell [ref=e588]
                      - cell "111211126739220265b02d" [ref=e589]
                      - cell [ref=e590]:
                        - button "5" [ref=e592]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e594]
                      - cell "In progress" [ref=e597]
                      - cell [ref=e605]:
                        - button "More" [ref=e608]:
                          - generic [ref=e609]: 
                    - row [ref=e611] [cursor=pointer]:
                      - cell [ref=e612]:
                        - checkbox "Select" [ref=e617]
                      - cell " 27/10/2026 08:00 " [ref=e620]:
                        - generic [ref=e621]:
                          - generic [ref=e622]: 
                          - generic [ref=e625]:
                            - generic [ref=e626]: 27/10/2026
                            - generic [ref=e627]: 08:00
                          - generic [ref=e628]: 
                      - cell "67328" [ref=e631]
                      - cell [ref=e632]
                      - cell "1112111267328202646515" [ref=e633]
                      - cell [ref=e634]:
                        - button "5" [ref=e636]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e637]
                      - cell "Confirmed" [ref=e640]
                      - cell [ref=e648]:
                        - button "More" [ref=e651]:
                          - generic [ref=e652]: 
                    - row [ref=e654] [cursor=pointer]:
                      - cell [ref=e655]:
                        - checkbox "Select" [ref=e660]
                      - cell " 26/10/2026 08:00" [ref=e663]:
                        - generic [ref=e664]:
                          - generic [ref=e665]: 
                          - generic [ref=e668]:
                            - generic [ref=e669]: 26/10/2026
                            - generic [ref=e670]: 08:00
                      - cell "67337" [ref=e671]
                      - cell "hhhhh," [ref=e672]
                      - cell "11122471673372026ec013" [ref=e673]
                      - cell [ref=e674]:
                        - button "4" [ref=e676]
                      - cell "Notaría y Servicios Jurídicos Castelar S.L." [ref=e678]
                      - cell "Pending report" [ref=e681]
                      - cell [ref=e689]:
                        - button "More" [ref=e692]:
                          - generic [ref=e693]: 
                - generic [ref=e695]: 1 - 10 of 10
            - generic [ref=e699]:
              - generic [ref=e700] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e701] [cursor=pointer]: PRIVACY_POLICY
            - generic [ref=e702]:
              - generic [ref=e703]:
                - generic [ref=e704] [cursor=pointer]: 
                - generic [ref=e706]: 0 selected
              - generic [ref=e709] [cursor=pointer]:
                - generic [ref=e711]: 
                - generic [ref=e712]: SELECT ALL
  - generic [ref=e713]:
    - generic [ref=e717]:
      - generic [ref=e718]: New version OVAC 8.7
      - generic [ref=e719]:
        - generic [ref=e720]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e721]: Review upgrades
    - button [ref=e727] [cursor=pointer]
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