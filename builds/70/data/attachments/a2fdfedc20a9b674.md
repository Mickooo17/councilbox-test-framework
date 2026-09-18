# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/templates/tagsTests.spec.ts >> Templates - Tags Tests >> should create a new tag and verify it appears in the list @smoke @regression
- Location: tests/templates/tagsTests.spec.ts:24:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#add-procedure-button') to be visible

```

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('tbody').locator('tr').filter({ hasText: 'AUTO_TAG_CWYBID' }) to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]: 
      - generic [ref=e11]:
        - link [ref=e13] [cursor=pointer]:
          - /url: /company/1112/professionalActivity
          - button " Activity" [ref=e14]:
            - generic [ref=e15]: 
            - generic [ref=e17]: Activity
        - link [ref=e19] [cursor=pointer]:
          - /url: /company/1112
          - button " Appointments" [ref=e20]:
            - generic [ref=e21]: 
            - generic [ref=e23]: Appointments
        - link [ref=e25] [cursor=pointer]:
          - /url: /company/1112/managements
          - button " Processes" [ref=e26]:
            - generic [ref=e27]: 
            - generic [ref=e29]: Processes
        - link [ref=e31] [cursor=pointer]:
          - /url: /company/1112/procedures
          - button " Procedures" [ref=e32]:
            - generic [ref=e33]: 
            - generic [ref=e35]: Procedures
        - link [ref=e37] [cursor=pointer]:
          - /url: /company/1112/drafts
          - button " Templates" [ref=e38]:
            - generic [ref=e39]: 
            - generic [ref=e41]: Templates
        - link [ref=e43] [cursor=pointer]:
          - /url: /company/1112/documentation
          - button " Documents" [ref=e44]:
            - generic [ref=e45]: 
            - generic [ref=e47]: Documents
      - generic [ref=e49]:
        - img "CBX white Logo" [ref=e50]
        - generic [ref=e51]: © 2026 v8.6.6
    - generic [ref=e53]:
      - banner [ref=e54]:
        - img "logo" [ref=e57] [cursor=pointer]
        - generic [ref=e58]: QA DEV
        - generic [ref=e64]:
          - button "" [ref=e68] [cursor=pointer]
          - button "Actions Button" [ref=e74] [cursor=pointer]:
            - generic [ref=e77]:
              - img "logo" [ref=e79]
              - generic [ref=e80]: 
      - generic [ref=e83]:
        - generic [ref=e86]:
          - button "Icon Button" [ref=e87] [cursor=pointer]:
            - paragraph [ref=e89]: Templates
          - button "Icon Button" [ref=e91] [cursor=pointer]:
            - paragraph [ref=e93]: Tags
        - generic [ref=e98]:
          - generic [ref=e100]:
            - generic [ref=e104]:
              - button "Icon Button" [ref=e106] [cursor=pointer]:
                - generic [ref=e107]: 
              - textbox "Search tags" [active] [ref=e109]: AUTO_TAG_CWYBID
            - button "Icon Button" [ref=e110] [cursor=pointer]:
              - generic [ref=e111]: 
          - generic [ref=e118]:
            - img "logo" [ref=e120]
            - generic [ref=e121]: No content found. Please review your selection and try again.
            - generic "Add procedure" [ref=e122]:
              - button "" [ref=e123] [cursor=pointer]
        - generic [ref=e127]:
          - paragraph [ref=e128] [cursor=pointer]: Legal notice and Terms and conditions of use
          - paragraph [ref=e129] [cursor=pointer]: PRIVACY_POLICY
  - generic [ref=e130]:
    - generic [ref=e134]:
      - generic [ref=e135]: New version OVAC 8.6
      - generic [ref=e136]:
        - generic [ref=e137]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e138]: Review upgrades
    - button [ref=e144] [cursor=pointer]
```

# Test source

```ts
  6   |     key: string;
  7   |     value: string;
  8   |     description: string;
  9   | }
  10  | 
  11  | export class TagsPage extends BasePage {
  12  |     // Navigation
  13  |     readonly tagsTab: Locator;
  14  | 
  15  |     // Action buttons
  16  |     readonly createTagButton: Locator;
  17  | 
  18  |     // Form fields
  19  |     readonly tagKeyInput: Locator;
  20  |     readonly tagValueInput: Locator;
  21  |     readonly tagDescriptionInput: Locator;
  22  |     readonly saveButton: Locator;
  23  | 
  24  |     // Search & Table
  25  |     readonly searchInput: Locator;
  26  |     readonly tableBody: Locator;
  27  | 
  28  |     // Alerts
  29  |     readonly alertMessage: Locator;
  30  | 
  31  |     // Delete
  32  |     readonly deleteButton: Locator;
  33  |     readonly confirmDeleteButton: Locator;
  34  |     readonly deleteModalHeader: Locator;
  35  | 
  36  |     constructor(page: Page) {
  37  |         super(page);
  38  |         this.tagsTab = page.locator('button').filter({ hasText: 'Tags' });
  39  |         this.createTagButton = page.locator('#add-procedure-button');
  40  |         this.tagKeyInput = page.locator('#company-tag-key');
  41  |         this.tagValueInput = page.locator('#company-tag-value');
  42  |         this.tagDescriptionInput = page.locator('#company-tag-description');
  43  |         this.saveButton = page.getByRole('button', { name: 'Save' });
  44  |         this.searchInput = page.getByRole('textbox', { name: 'Search tags' });
  45  |         this.tableBody = page.locator('tbody');
  46  |         this.alertMessage = page.getByRole('alert');
  47  |         this.deleteButton = page.getByRole('button', { name: ' Delete' });
  48  |         this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });
  49  |         this.deleteModalHeader = page.getByRole('paragraph');
  50  |     }
  51  | 
  52  |     async navigateToTagsTab() {
  53  |         await test.step('Navigate to Tags tab', async () => {
  54  |             await this.tagsTab.waitFor({ state: 'visible', timeout: 10000 });
  55  |             await this.tagsTab.click();
  56  |         });
  57  |     }
  58  | 
  59  |     async openCreateTagForm() {
  60  |         await test.step('Open create tag form', async () => {
  61  |             await this.createTagButton.waitFor({ state: 'visible', timeout: 10000 });
  62  |             await this.createTagButton.click();
  63  |         });
  64  |     }
  65  | 
  66  |     async fillTagDetails(data: TagData) {
  67  |         await test.step(`Fill tag details: key="${data.key}"`, async () => {
  68  |             await this.tagKeyInput.waitFor({ state: 'visible', timeout: 5000 });
  69  |             await this.tagKeyInput.fill(data.key);
  70  |             await this.tagValueInput.fill(data.value);
  71  |             await this.tagDescriptionInput.fill(data.description);
  72  |         });
  73  |     }
  74  | 
  75  |     async submitCreateForm() {
  76  |         await test.step('Submit create tag form', async () => {
  77  |             await this.saveButton.click();
  78  |         });
  79  |     }
  80  | 
  81  |     async createTag(data: TagData) {
  82  |         await test.step(`Create tag: ${data.key}`, async () => {
  83  |             await this.openCreateTagForm();
  84  |             await this.fillTagDetails(data);
  85  |             await this.submitCreateForm();
  86  |         });
  87  |     }
  88  | 
  89  |     async searchTag(key: string) {
  90  |         await test.step(`Search for tag: ${key}`, async () => {
  91  |             await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
  92  |             await this.searchInput.fill(key);
  93  |         });
  94  |     }
  95  | 
  96  |     async verifyTagInTable(key: string) {
  97  |         await test.step(`Verify tag "${key}" appears in table`, async () => {
  98  |             await expect(this.tableBody).toContainText(key);
  99  |         });
  100 |     }
  101 | 
  102 |     async deleteTag(key: string) {
  103 |         await test.step(`Delete tag: ${key}`, async () => {
  104 |             await this.searchTag(key);
  105 |             const row = this.tableBody.locator('tr', { hasText: key });
> 106 |             await row.waitFor({ state: 'visible', timeout: 5000 });
      |                       ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  107 |             await row.locator('button').first().click();
  108 |             await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
  109 |             await this.deleteButton.click();
  110 |             await expect(this.deleteModalHeader).toContainText(MESSAGES.TAG_DELETE_MODAL_HEADER);
  111 |             await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
  112 |             await this.confirmDeleteButton.click();
  113 |         });
  114 |     }
  115 | 
  116 |     async verifyDeleteSuccessAlert() {
  117 |         await test.step('Verify tag deleted success alert', async () => {
  118 |             await expect(this.alertMessage).toContainText(MESSAGES.TAG_DELETED);
  119 |         });
  120 |     }
  121 | 
  122 |     async verifyNoSearchResults() {
  123 |         await test.step('Verify no tag search results', async () => {
  124 |             await this.page.waitForTimeout(1000);
  125 |             // Tags page shows a different empty state message than Templates
  126 |             await expect(this.page.getByText('No content found. Please review your selection and try again.')).toBeVisible({ timeout: 5000 });
  127 |         });
  128 |     }
  129 | 
  130 |     async editTag(key: string, newData: Partial<TagData>) {
  131 |         await test.step(`Edit tag: ${key}`, async () => {
  132 |             await this.searchTag(key);
  133 |             const row = this.tableBody.locator('tr', { hasText: key });
  134 |             await row.waitFor({ state: 'visible', timeout: 5000 });
  135 |             await row.locator('button').first().click();
  136 | 
  137 |             // Click Edit option
  138 |             const editButton = this.page.getByRole('button', { name: ' Edit' });
  139 |             await editButton.waitFor({ state: 'visible', timeout: 5000 });
  140 |             await editButton.click();
  141 | 
  142 |             // Wait for form to appear and fill new data
  143 |             await this.tagKeyInput.waitFor({ state: 'visible', timeout: 5000 });
  144 | 
  145 |             if (newData.value) {
  146 |                 await this.tagValueInput.clear();
  147 |                 await this.tagValueInput.fill(newData.value);
  148 |             }
  149 |             if (newData.description) {
  150 |                 await this.tagDescriptionInput.clear();
  151 |                 await this.tagDescriptionInput.fill(newData.description);
  152 |             }
  153 | 
  154 |             await this.saveButton.click();
  155 |         });
  156 |     }
  157 | 
  158 |     async verifyTagNotInTable(key: string) {
  159 |         await test.step(`Verify tag "${key}" is NOT in the table`, async () => {
  160 |             await this.page.waitForTimeout(1000);
  161 |             const tbodyCount = await this.tableBody.count();
  162 |             if (tbodyCount > 0) {
  163 |                 await expect(this.tableBody).not.toContainText(key, { timeout: 5000 });
  164 |             } else {
  165 |                 await expect(this.page.getByText('No content found. Please review your selection and try again.')).toBeVisible({ timeout: 5000 });
  166 |             }
  167 |         });
  168 |     }
  169 | 
  170 |     async verifyCreateTagFormVisible() {
  171 |         await test.step('Verify create tag form dialog is visible', async () => {
  172 |             await expect(this.page.getByRole('dialog')).toBeVisible();
  173 |         });
  174 |     }
  175 | 
  176 |     async verifyFieldRequiredError() {
  177 |         await test.step('Verify required field validation error is visible', async () => {
  178 |             await expect(this.page.getByText(/required|obligatorio/i).first()).toBeVisible({ timeout: 5000 });
  179 |         });
  180 |     }
  181 | }
  182 | 
```