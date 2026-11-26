# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/legalTextsTests.spec.ts >> Institutions - Legal Texts Tests >> Only super administrators should have the ability to change legal texts @XR-2553 @regression
- Location: tests/institutions/legalTextsTests.spec.ts:9:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/companies\/edit/i
Received string:  "https://qa.ovac.pre.councilbox.com/company/1112/entities/edit/1112/general/settings"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    31 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://qa.ovac.pre.councilbox.com/company/1112/entities/edit/1112/general/settings"

```

```yaml
- button ""
- link " Activity":
  - /url: /company/1112/activity/dashboardCouncils
  - button " Activity"
- link " Appointments":
  - /url: /company/1112
  - button " Appointments"
- link " Processes":
  - /url: /company/1112/managements
  - button " Processes"
- link " Procedures":
  - /url: /company/1112/procedures
  - button " Procedures"
- link " Templates":
  - /url: /company/1112/drafts
  - button " Templates"
- link " Documents":
  - /url: /company/1112/documentation
  - button " Documents"
- link " Entities":
  - /url: /company/1112/entities
  - button " Entities"
- link " Users":
  - /url: /company/1112/users
  - button " Users"
- img "CBX white Logo"
- text: © 2026 v8.8.0
- banner:
  - button "Logo Grupo Castelar Servicios Legales y Financieros S.A":
    - img "Logo Grupo Castelar Servicios Legales y Financieros S.A"
  - text: Grupo Castelar Servicios Legales y Financieros S.A
  - button "Notifications":
    - button "Notifications": 
  - button "Button user":
    - button "Button user":
      - img "Logo Virtual Citizen Service Office"
      - text: 
- button "Botón": 
- img "Logo undefined"
- heading "Grupo Castelar Servicios Legales y Financieros S.A" [level=1]
- button "Help": 
- paragraph: Organization
- button "Save"
- list:
  - listitem:
    - button "General "
  - listitem:
    - button "Administration "
  - listitem:
    - button "Customization "
- tablist "Pestañas":
  - tab "Details" [selected]:
    - paragraph: Details
  - tab "Users":
    - paragraph: Users
  - tab "Licenses":
    - paragraph: Licenses
  - tab "Markers":
    - paragraph: Markers
  - tab "Kiosks":
    - paragraph: Kiosks
- button "Help": 
- heading "Consumptions" [level=2]
- text: This month
- combobox "Date": This month
- text: Date SMS 0 Uanataca (Signature) 1 Autofirma 1 Biometry 2
- paragraph: Roles
- paragraph: Admin agent
- text: 1 /1 
- img
- paragraph: Global administrator
- text: 1 /1 
- img
- paragraph: Kiosk
- text: 0 /1
- img
- heading "Configuration" [level=2]
- textbox "Name / Company name":
  - /placeholder: ""
  - text: Grupo Castelar Servicios Legales y Financieros S.A
- text: Name / Company name
- paragraph: Name visible to the participant for notifications and interface
- textbox "TIN":
  - /placeholder: ""
  - text: A82345678
- text: TIN
- textbox "Contact e-mail":
  - /placeholder: ""
  - text: dzenan.dzakmic@councilbox.com
- text: Contact e-mail
- paragraph: Notifications and internal communications
- textbox "Support email":
  - /placeholder: ""
  - text: corporativo@grupocastelar.es
- text: Support email
- paragraph: Contact email available to users
- textbox "External ID":
  - /placeholder: ""
  - text: GRP-CASTELAR-HQ
- text: External ID
- textbox "User alias for video calls":
  - /placeholder: ""
  - text: Grupo Castelar - Corporativo
- text: User alias for video calls
- paragraph: The value of this field will replace the user's name in the video assistance room
- heading "Location" [level=2]
- textbox "Address":
  - /placeholder: ""
  - text: Paseo de la Castellana, 95, Planta 15
- text: Address
- textbox "Zip Code":
  - /placeholder: ""
  - text: "28046"
- text: Zip Code Spain
- combobox "Country": Spain
- text: Country Madrid
- combobox "Province": Madrid
- text: Province
- textbox "Town/City":
  - /placeholder: ""
  - text: Madrid
- text: Town/City
- textbox "Latitude":
  - /placeholder: ""
  - text: "40.4532"
- text: Latitude
- paragraph: Location of in-person appointments
- textbox "Longitude":
  - /placeholder: ""
  - text: "-3.6904"
- text: Longitude
- paragraph: Location of in-person appointments
- paragraph: Languages
- heading "Languages available for the institution's procedures." [level=2]
- img "Logo language-label-es"
- paragraph: Español
- checkbox "Español" [checked] [disabled]
- img "Logo language-label-en"
- paragraph: English
- checkbox "English" [checked] [disabled]
- img "Logo language-label-gal"
- paragraph: Galego
- checkbox "Galego" [checked] [disabled]
- img "Logo language-label-vl"
- paragraph: Valencià
- checkbox "Valencià" [checked] [disabled]
- img "Logo language-label-cat"
- paragraph: Català
- checkbox "Català" [checked] [disabled]
- img "Logo language-label-it"
- paragraph: Italiano
- checkbox "Italiano" [checked] [disabled]
- img "Logo language-label-eu"
- paragraph: Euskera
- checkbox "Euskera" [checked] [disabled]
- text: English
- combobox "Main language": English
- text: Main language
- paragraph: Signature
- heading "Signature systems available for the institution’s procedures." [level=2]
- paragraph: Available signatures
- checkbox "Uanataca (Commercial option)" [checked] [disabled]
- paragraph: Uanataca (Commercial option)
- checkbox "AutoFirma" [checked] [disabled]
- paragraph: AutoFirma
- paragraph: Signatures available for the professional
- checkbox "Uanataca (Commercial option)" [disabled]
- paragraph: Uanataca (Commercial option)
- checkbox "AutoFirma" [checked] [disabled]
- paragraph: AutoFirma
- text: Legal notice and Terms and conditions of use Privacy policy
- img
- text: New version OVAC 8.8 We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier. Review upgrades
- button
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
  38  |             await this.companyMenuItem.waitFor({ state: 'visible', timeout: 5000 });
  39  |             await this.companyMenuItem.click();
  40  |             await this.page.waitForLoadState('networkidle');
> 41  |             await expect(this.page).toHaveURL(/\/companies\/edit/i, { timeout: 15000 });
      |                                     ^ Error: expect(page).toHaveURL(expected) failed
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
  58  |             const titlePattern = /Terms and conditions/i.test(title)
  59  |                 ? /Terms and conditions|TÉRMINOS Y CONDICIONES|TERMS_CONDITIONS/i
  60  |                 : new RegExp(title, 'i');
  61  |             const row = this.page.locator(`[id="appointment-row-${title}"]`)
  62  |                 .or(this.legalTextsTable.locator('tbody tr').filter({ hasText: titlePattern }))
  63  |                 .first();
  64  |             await row.waitFor({ state: 'visible', timeout: 10000 });
  65  | 
  66  |             // Click the more actions button in the row
  67  |             const menuBtn = row.locator('#appointment-menu, button:has(.ri-more-2-fill), button:has(.ri-more-fill), button:has-text("Options"), button').last();
  68  |             await menuBtn.click();
  69  | 
  70  |             // Click Edit in popover
  71  |             const editBtn = this.page.locator('.MuiPopover-root [role="button"], .MuiPopover-root [role="menuitem"], .MuiMenu-paper button, .MuiMenu-paper [role="menuitem"]')
  72  |                 .filter({ hasText: /Edit|Editar/i })
  73  |                 .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
  74  |                 .first();
  75  |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  76  |             await editBtn.click();
  77  | 
  78  |             // Verify Documentation edit form appears
  79  |             await expect(this.page).toHaveURL(/\/legalTerms\//i, { timeout: 15000 });
  80  |             await this.qlEditor.waitFor({ state: 'visible', timeout: 10000 });
  81  |         });
  82  |     }
  83  | 
  84  |     async editLegalText(newText: string) {
  85  |         await test.step(`Edit legal text in editor: ${newText}`, async () => {
  86  |             await this.qlEditor.waitFor({ state: 'visible', timeout: 10000 });
  87  |             await this.qlEditor.fill(newText);
  88  |             // Verify Save button becomes enabled
  89  |             await expect(this.saveButton).toBeEnabled({ timeout: 5000 });
  90  |         });
  91  |     }
  92  | 
  93  |     async saveLegalText() {
  94  |         await test.step('Save legal text changes', async () => {
  95  |             await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
  96  |             await expect(this.saveButton).toBeEnabled({ timeout: 5000 });
  97  |             await this.saveButton.click();
  98  |             // Verify Save button becomes disabled after successful save
  99  |             await expect(this.saveButton).toBeDisabled({ timeout: 10000 });
  100 |         });
  101 |     }
  102 | 
  103 |     async navigateBackToLegalTextsList() {
  104 |         await test.step('Navigate back to legal texts list', async () => {
  105 |             await this.backButton.waitFor({ state: 'visible', timeout: 5000 });
  106 |             await this.backButton.click();
  107 |             await expect(this.page).toHaveURL(/\/personalization\/legalTerms$/i, { timeout: 10000 });
  108 |             await this.legalTextsTable.waitFor({ state: 'visible', timeout: 10000 });
  109 |         });
  110 |     }
  111 | }
  112 | 
```