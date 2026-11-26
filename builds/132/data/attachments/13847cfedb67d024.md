# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/templates/templatesTests.spec.ts >> Templates - Drafts & Search Tests (Xray Execution 77514) >> The user is able to edit already existing template - Templates @OVAC-4871 @regression
- Location: tests/templates/templatesTests.spec.ts:240:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: /Title|Título/i }).or(locator('#draft-name, input[name="name"], input[name="title"]')).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - button "" [ref=e5] [cursor=pointer]
    - generic [ref=e10]:
      - link [ref=e12] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
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
      - link [ref=e30] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=e31]:
          - generic [ref=e32]: 
          - generic [ref=e34]: Procedures
      - link [ref=e36] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=e37]:
          - generic [ref=e38]: 
          - generic [ref=e40]: Templates
      - link [ref=e42] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=e43]:
          - generic [ref=e44]: 
          - generic [ref=e46]: Documents
      - link [ref=e48] [cursor=pointer]:
        - /url: /company/1112/entities
        - button " Entities" [ref=e49]:
          - generic [ref=e50]: 
          - generic [ref=e52]: Entities
      - link [ref=e54] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=e55]:
          - generic [ref=e56]: 
          - generic [ref=e58]: Users
    - generic [ref=e60]:
      - img "CBX white Logo" [ref=e61]
      - generic [ref=e62]: © 2026 v8.8.0
  - generic [ref=e64]:
    - banner [ref=e65]:
      - button [ref=e67] [cursor=pointer]:
        - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=e68]
      - generic [ref=e69]: Grupo Castelar Servicios Legales y Financieros S.A
      - generic [ref=e75]:
        - button [ref=e78] [cursor=pointer]:
          - button "Notifications" [ref=e79]:
            - generic [ref=e80]: 
        - button [ref=e82] [cursor=pointer]:
          - button "Button user" [ref=e84]:
            - generic [ref=e87]:
              - img "Logo Virtual Citizen Service Office" [ref=e89]
              - generic [ref=e90]: 
    - progressbar "Cargando" [ref=e94]
```

# Test source

```ts
  1   | import { Page, Locator, expect, test } from '@playwright/test';
  2   | import { BasePage } from '../BasePage';
  3   | import { MESSAGES } from '../../utils/Constants';
  4   | 
  5   | export interface TemplateData {
  6   |     name: string;
  7   |     content: string;
  8   |     type: string;
  9   | }
  10  | 
  11  | export class TemplatesPage extends BasePage {
  12  |     // Action buttons
  13  |     readonly createButton: Locator;
  14  | 
  15  |     // Form fields
  16  |     readonly templateNameInput: Locator;
  17  |     readonly contentEditor: Locator;
  18  | 
  19  |     // Search & Table
  20  |     readonly searchInput: Locator;
  21  |     readonly tableBody: Locator;
  22  | 
  23  |     // Alerts
  24  |     readonly alertMessage: Locator;
  25  | 
  26  |     // Delete
  27  |     readonly deleteButton: Locator;
  28  |     readonly confirmDeleteButton: Locator;
  29  | 
  30  |     constructor(page: Page) {
  31  |         super(page);
  32  |         this.createButton = page.getByRole('button', { name: /Create|Crear/i })
  33  |             .or(page.locator('#panel-confirm-button-accept, #modal-button-accept, button:has-text("CREATE"), button:has-text("CREAR")'))
  34  |             .first();
  35  |         this.templateNameInput = page.getByRole('textbox', { name: /Title|Título/i })
  36  |             .or(page.locator('#draft-name, input[name="name"], input[name="title"]'))
  37  |             .first();
  38  |         this.contentEditor = page.locator('#draft-editor-text div, [contenteditable="true"], .ql-editor, .ProseMirror, #draft-editor-text').first();
  39  |         this.searchInput = page.getByRole('textbox', { name: /Search templates|Search by participant or record|Buscar/i })
  40  |             .or(page.getByPlaceholder(/Search templates|Buscar plantillas|Search|Buscar/i))
  41  |             .or(page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]'))
  42  |             .first();
  43  |         this.tableBody = page.locator('tbody');
  44  |         this.alertMessage = page.getByRole('alert');
  45  |         this.deleteButton = page.getByRole('button', { name: /Delete|Eliminar/i })
  46  |             .or(page.locator('[role="menuitem"]').filter({ hasText: /Delete|Eliminar/i }))
  47  |             .first();
  48  |         this.confirmDeleteButton = page.locator('#panel-confirm-button-accept, #modal-button-accept')
  49  |             .or(page.getByRole('dialog').getByRole('button', { name: /Delete|Eliminar|Accept|Aceptar/i }))
  50  |             .first();
  51  |     }
  52  | 
  53  |     async openCreateTemplateForm() {
  54  |         await test.step('Open create template form', async () => {
  55  |             await this.dismissToastOrModal();
  56  |             const fabButton = this.page.locator('#add-procedure-button, .MuiFab-root, button:has(.ri-add-line)').first();
  57  |             await fabButton.waitFor({ state: 'visible', timeout: 10000 });
  58  |             await fabButton.click();
  59  |         });
  60  |     }
  61  | 
  62  |     async fillTemplateDetails(data: TemplateData) {
  63  |         await test.step(`Fill template details: ${data.name}`, async () => {
  64  |             await this.dismissToastOrModal();
> 65  |             await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
      |                                          ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  66  |             await this.templateNameInput.fill(data.name);
  67  | 
  68  |             if (await this.contentEditor.isVisible({ timeout: 2000 }).catch(() => false)) {
  69  |                 await this.contentEditor.click();
  70  |                 await this.page.keyboard.type(data.content);
  71  |             }
  72  | 
  73  |             // Select template category/type
  74  |             const typeOption = this.page.locator('button, [role="button"]').filter({ hasText: new RegExp(data.type, 'i') }).first();
  75  |             if (await typeOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  76  |                 await typeOption.click({ force: true });
  77  |             }
  78  |         });
  79  |     }
  80  | 
  81  |     async submitCreateForm() {
  82  |         await test.step('Submit create form and wait for drawer to close', async () => {
  83  |             await this.createButton.click();
  84  |             await this.page.waitForURL(/\/drafts$/i, { timeout: 10000 }).catch(() => {});
  85  |             await this.dismissToastOrModal();
  86  |         });
  87  |     }
  88  | 
  89  |     async createTemplate(data: TemplateData) {
  90  |         await test.step(`Create template: ${data.name}`, async () => {
  91  |             await this.openCreateTemplateForm();
  92  |             await this.fillTemplateDetails(data);
  93  |             await this.submitCreateForm();
  94  |         });
  95  |     }
  96  | 
  97  |     async verifySuccessAlert() {
  98  |         await test.step('Verify template created success alert', async () => {
  99  |             await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_CREATED);
  100 |         });
  101 |     }
  102 | 
  103 |     async searchTemplate(name: string) {
  104 |         await test.step(`Search for template: ${name}`, async () => {
  105 |             await this.searchInput.fill(name);
  106 |         });
  107 |     }
  108 | 
  109 |     async verifyTemplateInTable(name: string) {
  110 |         await test.step(`Verify template "${name}" appears in table`, async () => {
  111 |             await expect(this.tableBody).toContainText(name);
  112 |         });
  113 |     }
  114 | 
  115 |     async deleteTemplate(name: string) {
  116 |         await test.step(`Delete template: ${name}`, async () => {
  117 |             await this.searchTemplate(name);
  118 |             // Click the 3-dot actions button on the found row
  119 |             const row = this.tableBody.locator('tr', { hasText: name });
  120 |             await row.waitFor({ state: 'visible', timeout: 5000 });
  121 |             await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();
  122 |             await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
  123 |             await this.deleteButton.click();
  124 |             await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
  125 |             await this.confirmDeleteButton.click();
  126 |         });
  127 |     }
  128 | 
  129 |     async verifyDeleteSuccessAlert() {
  130 |         await test.step('Verify template deleted success alert', async () => {
  131 |             await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_DELETED);
  132 |         });
  133 |     }
  134 | 
  135 |     async verifyNoSearchResults() {
  136 |         await test.step('Verify no template search results', async () => {
  137 |             await this.page.waitForTimeout(1000);
  138 |             const emptyMsg = this.page.getByText(/There are no results for your search|No hay resultados para su búsqueda|No hay resultados/i).first();
  139 |             if (await emptyMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
  140 |                 await expect(emptyMsg).toBeVisible();
  141 |             } else {
  142 |                 await expect(this.tableBody).not.toContainText(/NONEXISTENT/i, { timeout: 5000 });
  143 |             }
  144 |         });
  145 |     }
  146 | 
  147 |     async verifyTemplateNotInTable(name: string) {
  148 |         await test.step(`Verify template "${name}" is NOT in the table`, async () => {
  149 |             await this.page.waitForTimeout(1000);
  150 |             // After deletion + search, page may show empty state (no tbody) OR a table without the name
  151 |             const tbodyCount = await this.tableBody.count();
  152 |             if (tbodyCount > 0) {
  153 |                 await expect(this.tableBody).not.toContainText(name, { timeout: 5000 });
  154 |             } else {
  155 |                 // No tbody means the page is in empty state — template is gone
  156 |                 await expect(this.page.getByText('There are no results for your search. Please, check your selection and try again.')).toBeVisible({ timeout: 5000 });
  157 |             }
  158 |         });
  159 |     }
  160 | 
  161 |     /**
  162 |      * Verifies that title field required error is displayed when trying to save empty template (OVAC-4875).
  163 |      */
  164 |     async verifyTitleRequiredError() {
  165 |         await test.step('Verify title required error is displayed', async () => {
```