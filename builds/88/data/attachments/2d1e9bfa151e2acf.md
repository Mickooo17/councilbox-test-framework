# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/legalTextsTests.spec.ts >> Institutions - Legal Texts Tests >> Only super administrators should have the ability to change legal texts @XR-2553 @regression
- Location: tests/institutions/legalTextsTests.spec.ts:9:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('#user-settings-edit-company') to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - button "" [ref=e5] [cursor=pointer]
      - generic [ref=e10]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /company/1112/auditorActivity
          - button " Activity" [ref=e13]:
            - generic [ref=e14]: 
            - generic [ref=e16]: Activity
        - link [ref=e18] [cursor=pointer]:
          - /url: /company/1112
          - button " Appointments" [ref=e19]:
            - generic [ref=e20]: 
            - generic [ref=e22]: Appointments
        - link [ref=e24] [cursor=pointer]:
          - /url: /company/1112/managements
          - button " Processes" [ref=e25]:
            - generic [ref=e26]: 
            - generic [ref=e28]: Processes
      - generic [ref=e30]:
        - img "CBX white Logo" [ref=e31]
        - generic [ref=e32]: © 2026 v8.7.0
    - generic [ref=e34]:
      - banner [ref=e35]:
        - button [ref=e37] [cursor=pointer]:
          - img "Logo QA DEV" [ref=e38]
        - generic [ref=e39]: QA DEV
        - generic [ref=e45]:
          - button [ref=e48] [cursor=pointer]:
            - button "Botón" [ref=e49]:
              - generic [ref=e50]: 
          - button [expanded] [ref=e52] [cursor=pointer]:
            - button "Actions Button" [ref=e54]:
              - generic [ref=e57]:
                - img "Logo Virtual Citizen Service Office" [ref=e59]
                - generic [ref=e60]: 
      - generic [ref=e64]:
        - tablist "Tabs" [ref=e68]:
          - tab "Botón" [selected] [ref=e69] [cursor=pointer]:
            - paragraph [ref=e71]: Video-appointments
          - tab "Botón" [ref=e72] [cursor=pointer]:
            - paragraph [ref=e74]: In-person appointments
        - generic [ref=e76]:
          - generic [ref=e78]:
            - generic [ref=e79]:
              - generic [ref=e81]:
                - generic [ref=e84]:
                  - generic [ref=e85] [cursor=pointer]:
                    - generic [ref=e87]:
                      - generic [ref=e88]: 
                      - generic [ref=e89]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=e94]:
                  - generic [ref=e95] [cursor=pointer]:
                    - generic [ref=e96]: This week
                    - combobox "Period": This week
                    - generic [ref=e97]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: 
              - generic [ref=e103]:
                - generic [ref=e104]:
                  - paragraph [ref=e105]: Search by participant or record
                  - generic [ref=e108]:
                    - button "Botón" [ref=e110] [cursor=pointer]:
                      - generic [ref=e111]: 
                    - textbox "Search by participant or record" [ref=e112]:
                      - /placeholder: Search
                - button "Help" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 
            - generic [ref=e122]:
              - table [ref=e123]:
                - rowgroup [ref=e124]:
                  - row [ref=e125]:
                    - columnheader "Date Date " [ref=e126]:
                      - generic [ref=e127]: Date
                      - button "Date " [ref=e128] [cursor=pointer]:
                        - generic [ref=e129]: Date
                        - generic [ref=e130]: 
                    - columnheader "Ref. Ref. " [ref=e132]:
                      - generic [ref=e133]: Ref.
                      - button "Ref. " [ref=e134] [cursor=pointer]:
                        - generic [ref=e135]: Ref.
                        - generic [ref=e136]: 
                    - columnheader "Attendees" [ref=e138]
                    - columnheader "Procedure Procedure " [ref=e139]:
                      - generic [ref=e140]: Procedure
                      - button "Procedure " [ref=e141] [cursor=pointer]:
                        - generic [ref=e142]: Procedure
                        - generic [ref=e143]: 
                    - columnheader "Documents" [ref=e145]
                    - columnheader "Assigned agent" [ref=e146]
                    - columnheader "Entity Entity " [ref=e147]:
                      - generic [ref=e148]: Entity
                      - button "Entity " [ref=e149] [cursor=pointer]:
                        - generic [ref=e150]: Entity
                        - generic [ref=e151]: 
                    - columnheader "Status Status " [ref=e153]:
                      - generic [ref=e154]: Status
                      - button "Status " [ref=e155] [cursor=pointer]:
                        - generic [ref=e156]: Status
                        - generic [ref=e157]: 
                    - columnheader "Actions" [ref=e159]
                    - columnheader "Actions [object Object]" [ref=e160]:
                      - generic [ref=e161]: Actions
                      - generic [ref=e164]:
                        - generic [ref=e165] [cursor=pointer]:
                          - generic [aria-hidden] [ref=e167]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=e169]:
                  - row [ref=e170] [cursor=pointer]:
                    - cell " 06/10/2026 10:00" [ref=e171]:
                      - generic [ref=e172]:
                        - generic [ref=e173]: 
                        - generic [ref=e176]:
                          - generic [ref=e177]: 06/10/2026
                          - generic [ref=e178]: 10:00
                    - cell "67060" [ref=e179]
                    - cell "Ammar Micijevic" [ref=e180]
                    - cell "ALL in ONE" [ref=e185]
                    - cell [ref=e190]:
                      - button "5" [ref=e192]
                    - cell " Not assigned" [ref=e193]:
                      - generic [ref=e194]:
                        - generic [ref=e195]: 
                        - generic [ref=e197]: Not assigned
                    - cell "QA DEV" [ref=e200]
                    - cell "Canceled" [ref=e203]
                    - cell [ref=e211]:
                      - generic [ref=e213]:
                        - button [disabled]
                    - cell [ref=e214]:
                      - button "More" [ref=e217]:
                        - generic [ref=e218]: 
                  - row [ref=e220] [cursor=pointer]:
                    - cell " 05/10/2026 06:00" [ref=e221]:
                      - generic [ref=e222]:
                        - generic [ref=e223]: 
                        - generic [ref=e226]:
                          - generic [ref=e227]: 05/10/2026
                          - generic [ref=e228]: 06:00
                    - cell "67027" [ref=e229]
                    - cell "AMMAR MICIJEVIC" [ref=e230]
                    - cell "ALL in ONE" [ref=e235]
                    - cell [ref=e240]:
                      - button "5" [ref=e242]
                    - cell " Ammar Mičijević" [ref=e243]:
                      - generic [ref=e244]:
                        - generic [ref=e245]: 
                        - generic [ref=e247]: Ammar Mičijević
                    - cell "QA DEV" [ref=e250]
                    - cell "Incomplete" [ref=e253]
                    - cell [ref=e261]:
                      - generic [ref=e263]:
                        - button [disabled]
                    - cell [ref=e264]:
                      - button "More" [ref=e267]:
                        - generic [ref=e268]: 
              - generic [ref=e270]: 1 - 2 of 2
          - generic [ref=e274]:
            - generic [ref=e275] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=e276] [cursor=pointer]: PRIVACY_POLICY
          - generic [ref=e277]:
            - generic [ref=e278]:
              - generic [ref=e279] [cursor=pointer]: 
              - generic [ref=e281]: 0 selected
            - generic [ref=e284] [cursor=pointer]:
              - generic [ref=e286]: 
              - generic [ref=e287]: SELECT ALL
  - menu [ref=e289]:
    - generic [ref=e290]:
      - menuitem " Ammar Mičijević +387-61072094 ammar.micijevic@councilbox.com" [active] [ref=e291] [cursor=pointer]:
        - generic [ref=e292]:
          - paragraph [ref=e294]:
            - generic [ref=e295]:
              - generic [ref=e296]: 
              - generic [ref=e299]:
                - generic [ref=e300]: Ammar Mičijević
                - generic [ref=e302]: +387-61072094
                - generic [ref=e304]: ammar.micijevic@councilbox.com
          - generic [aria-hidden] [ref=e307]: 
      - separator [ref=e308]
      - menuitem "Support" [ref=e309] [cursor=pointer]:
        - generic [ref=e310]:
          - paragraph [ref=e312]:
            - generic [ref=e313]: Support
          - generic [aria-hidden] [ref=e317]: 
      - separator [ref=e318]
      - menuitem "Help" [ref=e319] [cursor=pointer]:
        - generic [ref=e320]:
          - paragraph [ref=e322]:
            - generic [ref=e323]: Help
          - generic [aria-hidden] [ref=e327]: 
      - separator [ref=e328]
      - menuitem "End session" [ref=e329] [cursor=pointer]:
        - generic [ref=e330]:
          - paragraph [ref=e332]:
            - generic [ref=e333]: End session
          - generic [aria-hidden] [ref=e337]: 
      - separator [ref=e338]
      - menuitem [ref=e339]:
        - generic [ref=e340]:
          - img "Logo councilbox" [ref=e342]
          - paragraph [ref=e344]:
            - paragraph [ref=e345]: © 2026 OVAC v8.7.0
```

# Test source

```ts
  1   | import { Page, Locator, expect, test } from '@playwright/test';
  2   | import { BasePage } from '../BasePage';
  3   | 
  4   | export class LegalTextsPage extends BasePage {
  5   |     readonly accountDropdown: Locator;
  6   |     readonly companyMenuItem: Locator;
  7   |     readonly customizationTab: Locator;
  8   |     readonly legalTextsSubtab: Locator;
  9   |     readonly legalTextsTable: Locator;
  10  |     readonly qlEditor: Locator;
  11  |     readonly saveButton: Locator;
  12  |     readonly backButton: Locator;
  13  | 
  14  |     constructor(page: Page) {
  15  |         super(page);
  16  |         this.accountDropdown = page.locator('#cbx-header-third-dropdown-user')
  17  |             .or(page.getByRole('button', { name: 'Actions Button' }).first())
  18  |             .first();
  19  |         this.companyMenuItem = page.locator('#user-settings-edit-company');
  20  |         this.customizationTab = page.getByRole('button', { name: /Customization|Personalización/i })
  21  |             .or(page.locator('button:has-text("Customization")'))
  22  |             .first();
  23  |         this.legalTextsSubtab = page.getByRole('button', { name: /Legal texts|Textos legales/i })
  24  |             .or(page.locator('button:has-text("LEGAL TEXTS")'))
  25  |             .first();
  26  |         this.legalTextsTable = page.locator('table');
  27  |         this.qlEditor = page.locator('.ql-editor');
  28  |         this.saveButton = page.getByRole('button', { name: /^Save$|^Guardar$/i })
  29  |             .or(page.locator('button:has-text("SAVE")'))
  30  |             .first();
  31  |         this.backButton = page.locator('button:has(.ri-arrow-left-line), button:has(i[class*="arrow-left"])').first();
  32  |     }
  33  | 
  34  |     async openCompanySettingsFromAccountMenu() {
  35  |         await test.step('Click Account icon and select Company from popup menu', async () => {
  36  |             await this.accountDropdown.waitFor({ state: 'visible', timeout: 10000 });
  37  |             await this.accountDropdown.click();
> 38  |             await this.companyMenuItem.waitFor({ state: 'visible', timeout: 5000 });
      |                                        ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  39  |             await this.companyMenuItem.click();
  40  |             await this.page.waitForLoadState('networkidle');
  41  |             await expect(this.page).toHaveURL(/\/companies\/edit/i, { timeout: 15000 });
  42  |         });
  43  |     }
  44  | 
  45  |     async navigateToLegalTexts() {
  46  |         await test.step('Navigate to Customization -> Legal texts', async () => {
  47  |             await this.customizationTab.waitFor({ state: 'visible', timeout: 10000 });
  48  |             await this.customizationTab.click();
  49  |             await this.legalTextsSubtab.waitFor({ state: 'visible', timeout: 10000 });
  50  |             await this.legalTextsSubtab.click();
  51  |             await expect(this.page).toHaveURL(/\/personalization\/legalTerms/i, { timeout: 15000 });
  52  |             await this.legalTextsTable.waitFor({ state: 'visible', timeout: 10000 });
  53  |         });
  54  |     }
  55  | 
  56  |     async openEditLegalText(title: string = 'Terms and conditions') {
  57  |         await test.step(`Open edit form for legal text: ${title}`, async () => {
  58  |             const row = this.page.locator(`[id="appointment-row-${title}"]`)
  59  |                 .or(this.legalTextsTable.locator('tbody tr').filter({ hasText: title }))
  60  |                 .first();
  61  |             await row.waitFor({ state: 'visible', timeout: 10000 });
  62  | 
  63  |             // Click the more actions button in the row
  64  |             const menuBtn = row.locator('#appointment-menu, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').first();
  65  |             await menuBtn.click();
  66  | 
  67  |             // Click Edit in popover
  68  |             const editBtn = this.page.locator('.MuiPopover-root [role="button"]').filter({ hasText: /Edit|Editar/i })
  69  |                 .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
  70  |                 .first();
  71  |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  72  |             await editBtn.click();
  73  | 
  74  |             // Verify Documentation edit form appears
  75  |             await expect(this.page).toHaveURL(/\/legalTerms\//i, { timeout: 15000 });
  76  |             await this.qlEditor.waitFor({ state: 'visible', timeout: 10000 });
  77  |         });
  78  |     }
  79  | 
  80  |     async editLegalText(newText: string) {
  81  |         await test.step(`Edit legal text in editor: ${newText}`, async () => {
  82  |             await this.qlEditor.waitFor({ state: 'visible', timeout: 10000 });
  83  |             await this.qlEditor.fill(newText);
  84  |             // Verify Save button becomes enabled
  85  |             await expect(this.saveButton).toBeEnabled({ timeout: 5000 });
  86  |         });
  87  |     }
  88  | 
  89  |     async saveLegalText() {
  90  |         await test.step('Save legal text changes', async () => {
  91  |             await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
  92  |             await expect(this.saveButton).toBeEnabled({ timeout: 5000 });
  93  |             await this.saveButton.click();
  94  |             // Verify Save button becomes disabled after successful save
  95  |             await expect(this.saveButton).toBeDisabled({ timeout: 10000 });
  96  |         });
  97  |     }
  98  | 
  99  |     async navigateBackToLegalTextsList() {
  100 |         await test.step('Navigate back to legal texts list', async () => {
  101 |             await this.backButton.waitFor({ state: 'visible', timeout: 5000 });
  102 |             await this.backButton.click();
  103 |             await expect(this.page).toHaveURL(/\/personalization\/legalTerms$/i, { timeout: 10000 });
  104 |             await this.legalTextsTable.waitFor({ state: 'visible', timeout: 10000 });
  105 |         });
  106 |     }
  107 | }
  108 | 
```