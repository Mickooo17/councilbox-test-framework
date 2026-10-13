# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Table Columns & Administration Tests >> On the Institutions page, the administrator can define the minimum advance time for the organization/entity @XR-2697 @regression
- Location: tests/institutions/institutionsTests.spec.ts:107:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('table tbody tr').filter({ hasText: 'QA DEV' }).first().locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button[aria-label*="Botón" i]').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
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
          - /url: /company/1112/companies
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
        - generic [ref=e62]: © 2026 v8.7.1
    - generic [ref=e64]:
      - banner [ref=e65]:
        - button [ref=e67] [cursor=pointer]:
          - img "Logo QA DEV" [ref=e68]
        - generic [ref=e69]: QA DEV
        - generic [ref=e75]:
          - button [ref=e78] [cursor=pointer]:
            - button "Notifications" [ref=e79]:
              - generic [ref=e80]: 
          - button [ref=e82] [cursor=pointer]:
            - button "Button user" [ref=e84]:
              - generic [ref=e87]:
                - img "Logo Virtual Citizen Service Office" [ref=e89]
                - generic [ref=e90]: 
      - generic [ref=e92]:
        - generic [ref=e95]:
          - generic [ref=e97]:
            - generic [ref=e101]:
              - button "Botón" [ref=e103] [cursor=pointer]:
                - generic [ref=e104]: 
              - textbox "Search by participant or record" [active] [ref=e105]:
                - /placeholder: Search entity...
                - text: QA DEV
            - button "Help" [ref=e106] [cursor=pointer]:
              - generic [ref=e107]: 
          - generic [ref=e110]:
            - generic [ref=e112]:
              - table [ref=e113]:
                - rowgroup [ref=e114]:
                  - row [ref=e115]:
                    - columnheader "Name Name " [ref=e116]:
                      - generic [ref=e117]: Name
                      - button "Name " [ref=e118] [cursor=pointer]:
                        - generic [ref=e119]: Name
                        - generic [ref=e120]: 
                    - columnheader "Id Id " [ref=e122]:
                      - generic [ref=e123]: Id
                      - button "Id " [ref=e124] [cursor=pointer]:
                        - generic [ref=e125]: Id
                        - generic [ref=e126]: 
                    - columnheader "External ID External ID " [ref=e128]:
                      - generic [ref=e129]: External ID
                      - button "External ID " [ref=e130] [cursor=pointer]:
                        - generic [ref=e131]: External ID
                        - generic [ref=e132]: 
                    - columnheader "Level Level " [ref=e134]:
                      - generic [ref=e135]: Level
                      - button "Level " [ref=e136] [cursor=pointer]:
                        - generic [ref=e137]: Level
                        - generic [ref=e138]: 
                    - columnheader "Actions" [ref=e140]
                - rowgroup [ref=e142]:
                  - row [ref=e143]:
                    - cell "QA DEV" [ref=e144]
                    - cell "1112" [ref=e149]
                    - cell "12314" [ref=e151]
                    - cell "Organization" [ref=e153]
                    - cell [ref=e154]
              - generic [ref=e155]: 1 - 1 of 1
            - generic [ref=e159]:
              - generic [ref=e160] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e161] [cursor=pointer]: PRIVACY_POLICY
        - generic [ref=e162]:
          - generic [ref=e163]:
            - generic [ref=e164] [cursor=pointer]: 
            - generic [ref=e166]: 0 selected
          - generic [ref=e169] [cursor=pointer]:
            - generic [ref=e171]: 
            - generic [ref=e172]: SELECT ALL
  - generic [ref=e173]:
    - generic [ref=e177]:
      - generic [ref=e178]: New version OVAC 8.7
      - generic [ref=e179]:
        - generic [ref=e180]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e181]: Review upgrades
    - button [ref=e187] [cursor=pointer]
```

# Test source

```ts
  195 |             const afterFirst = await getFirstRowName();
  196 | 
  197 |             expect(afterFirst).toBeTruthy();
  198 |             expect(afterFirst).not.toBe(initialFirst);
  199 | 
  200 |             // Toggle back
  201 |             await nameTh.click();
  202 |             await this.page.waitForTimeout(1000);
  203 |             const returnedFirst = await getFirstRowName();
  204 |             expect(returnedFirst).toBe(initialFirst);
  205 |         });
  206 |     }
  207 | 
  208 |     /**
  209 |      * Sorts the institutions table by Level column and verifies order changes (XR-2301).
  210 |      */
  211 |     async sortByLevelColumn() {
  212 |         await test.step('Sort institutions by Level column', async () => {
  213 |             const levelTh = this.page.locator('table thead th').filter({ hasText: /Level|Nivel/i }).first();
  214 |             await levelTh.waitFor({ state: 'visible', timeout: 10000 });
  215 | 
  216 |             const getFirstRowLevel = async () => {
  217 |                 return (await this.page.locator('table tbody tr:first-child td:nth-child(4)').innerText().catch(() => '')).trim();
  218 |             };
  219 | 
  220 |             const initialLevel = await getFirstRowLevel();
  221 |             await levelTh.click();
  222 |             await this.page.waitForTimeout(1000);
  223 |             const afterLevel = await getFirstRowLevel();
  224 | 
  225 |             // Toggle to opposite direction
  226 |             await levelTh.click();
  227 |             await this.page.waitForTimeout(1000);
  228 |             const toggledLevel = await getFirstRowLevel();
  229 | 
  230 |             expect(toggledLevel).toBeTruthy();
  231 |             expect([initialLevel, afterLevel, toggledLevel].some(lvl => /Organization|Organización|Entity|Entidad/i.test(lvl))).toBe(true);
  232 |         });
  233 |     }
  234 | 
  235 |     /**
  236 |      * Verifies that the Institutions view contains all expected columns and fields (XR-2302).
  237 |      */
  238 |     async verifyInstitutionsTableFields() {
  239 |         await test.step('Verify Institutions table contains all required fields', async () => {
  240 |             await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  241 | 
  242 |             const headers = this.page.locator('table thead th');
  243 |             await expect(headers.filter({ hasText: /Name|Nombre/i })).toBeVisible({ timeout: 5000 });
  244 |             await expect(headers.filter({ hasText: /\bId\b/i })).toBeVisible({ timeout: 5000 });
  245 |             await expect(headers.filter({ hasText: /External ID|ID externo/i })).toBeVisible({ timeout: 5000 });
  246 |             await expect(headers.filter({ hasText: /Level|Nivel/i })).toBeVisible({ timeout: 5000 });
  247 | 
  248 |             // Wait for rows to load from network
  249 |             const firstRow = this.page.locator('table tbody tr').first();
  250 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  251 |             const rowCount = await this.page.locator('table tbody tr').count();
  252 |             expect(rowCount).toBeGreaterThan(0);
  253 |         });
  254 |     }
  255 | 
  256 |     /**
  257 |      * Verifies that the Level column displays correct values (Entity / Organization) (XR-2303).
  258 |      */
  259 |     async verifyLevelColumnValues() {
  260 |         await test.step('Verify Level column displays correct values', async () => {
  261 |             // Wait for rows to load from network
  262 |             const firstRow = this.page.locator('table tbody tr').first();
  263 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  264 | 
  265 |             const levelCells = this.page.locator('table tbody tr td:nth-child(4)');
  266 |             const count = await levelCells.count();
  267 |             expect(count).toBeGreaterThan(0);
  268 | 
  269 |             const values: string[] = [];
  270 |             for (let i = 0; i < count; i++) {
  271 |                 const text = (await levelCells.nth(i).innerText()).trim();
  272 |                 values.push(text);
  273 |                 expect(text).toMatch(/^(Entity|Organization|Entidad|Organización)$/i);
  274 |             }
  275 | 
  276 |             expect(values.some(v => /Entity|Entidad/i.test(v))).toBe(true);
  277 |             expect(values.some(v => /Organization|Organización/i.test(v))).toBe(true);
  278 |         });
  279 |     }
  280 | 
  281 |     /**
  282 |      * Opens details/settings for a specific institution (XR-2697).
  283 |      */
  284 |     async openInstitutionDetails(name: string) {
  285 |         await test.step(`Open institution details for "${name}"`, async () => {
  286 |             let row = this.page.locator('table tbody tr').filter({ hasText: name }).first();
  287 |             if (!await row.isVisible({ timeout: 2000 }).catch(() => false)) {
  288 |                 await this.searchInstitution(name);
  289 |                 row = this.page.locator('table tbody tr').filter({ hasText: name }).first();
  290 |             }
  291 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  292 | 
  293 |             // Click 3-dots menu button on row to access Edit option
  294 |             const threeDotsBtn = row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button[aria-label*="Botón" i]').first();
> 295 |             await threeDotsBtn.waitFor({ state: 'visible', timeout: 5000 });
      |                                ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  296 |             await threeDotsBtn.click();
  297 |             await this.page.waitForTimeout(400);
  298 | 
  299 |             // Click Edit button in row dropdown menu
  300 |             const editBtn = this.page.getByRole('button', { name: /Edit|Editar/i })
  301 |                 .or(this.page.locator('[role="menuitem"]:has-text("Edit"), button:has-text("Edit")'))
  302 |                 .first();
  303 |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  304 |             await editBtn.click();
  305 | 
  306 |             await this.page.waitForURL(/\/companies\/edit\/\d+/i, { timeout: 10000 });
  307 |         });
  308 |     }
  309 | 
  310 |     /**
  311 |      * Navigates to Administration -> Agenda tab (XR-2697).
  312 |      */
  313 |     async navigateToAdministrationAgenda() {
  314 |         await test.step('Navigate to Administration -> Agenda tab', async () => {
  315 |             const adminTab = this.page.getByRole('button', { name: /Administration|Administración/i }).first();
  316 |             await adminTab.waitFor({ state: 'visible', timeout: 10000 });
  317 |             await adminTab.click();
  318 |             await this.page.waitForTimeout(1000);
  319 | 
  320 |             if (!this.page.url().includes('/administration/schedule')) {
  321 |                 const agendaTab = this.page.locator('button[role="tab"]:has-text("Agenda"), [role="tab"]:has-text("Agenda"), button:has-text("Agenda")').first();
  322 |                 await agendaTab.waitFor({ state: 'visible', timeout: 10000 });
  323 |                 await agendaTab.click();
  324 |             }
  325 |             await this.page.waitForURL(/\/administration\/schedule/i, { timeout: 10000 });
  326 |             await this.page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 10000 });
  327 |         });
  328 |     }
  329 | 
  330 |     /**
  331 |      * Opens the edit drawer for the first available schedule period (XR-2697).
  332 |      */
  333 |     async openEditSchedulePeriod() {
  334 |         await test.step('Open edit schedule period drawer', async () => {
  335 |             const firstRow = this.page.locator('table tbody tr').first();
  336 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  337 |             const threeDotsBtn = firstRow.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button[aria-label*="Botón" i]').first();
  338 |             await threeDotsBtn.click();
  339 |             await this.page.waitForTimeout(400);
  340 | 
  341 |             const editOption = this.page.getByRole('button', { name: /Edit|Editar/i })
  342 |                 .or(this.page.locator('#schedule_edit_button, button:has-text("Edit"), [role="menuitem"]:has-text("Edit"), [role="button"]:has-text("Edit")'))
  343 |                 .first();
  344 |             await editOption.waitFor({ state: 'visible', timeout: 5000 });
  345 |             await editOption.click();
  346 |             await this.page.waitForTimeout(600);
  347 |         });
  348 |     }
  349 | 
  350 |     /**
  351 |      * Sets the Minimum notice (advance time) in the schedule period edit drawer (XR-2697).
  352 |      */
  353 |     async setMinimumAdvanceNotice(value: string | number) {
  354 |         await test.step(`Set minimum advance notice to ${value}`, async () => {
  355 |             const noticeInput = this.page.getByRole('spinbutton', { name: /Minimum notice|Antelación mínima/i })
  356 |                 .or(this.page.locator('input[name*="notice" i]'))
  357 |                 .or(this.page.locator('.MuiFormControl-root').filter({ hasText: /Minimum notice|Antelación mínima/i }).locator('input'))
  358 |                 .first();
  359 |             await noticeInput.waitFor({ state: 'visible', timeout: 10000 });
  360 |             await noticeInput.clear();
  361 |             await noticeInput.fill(value.toString());
  362 |         });
  363 |     }
  364 | 
  365 |     /**
  366 |      * Saves the schedule period adjustments (XR-2697).
  367 |      */
  368 |     async saveSchedulePeriod() {
  369 |         await test.step('Save schedule period adjustments', async () => {
  370 |             const saveBtn = this.page.getByRole('button', { name: /Save|Guardar/i })
  371 |                 .or(this.page.locator('#panel-confirm-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")'))
  372 |                 .first();
  373 |             await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
  374 |             await saveBtn.click();
  375 |             await this.page.waitForTimeout(1000);
  376 |             await this.dismissToastOrModal();
  377 |         });
  378 |     }
  379 | }
  380 | 
  381 | 
```