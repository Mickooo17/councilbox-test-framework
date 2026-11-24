# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/templates/templatesTests.spec.ts >> Templates - Text Area Upload Template Tests >> The super administrator/administrator is able to enable/disable template - Templates @OVAC-5518 @regression
- Location: tests/templates/templatesTests.spec.ts:386:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('tbody').locator('tr').filter({ hasText: 'Automation Template 193404' }).first().locator('td').first()
    - locator resolved to <td class="">…</td>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="presentation" class="cbx-dropdown-backdrop krwr-cbx-dropdown-backdrop"></div> from <div role="presentation" class="cbx-dropdown-presentation krwr-cbx-dropdown-presentation">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="presentation" class="cbx-dropdown-backdrop krwr-cbx-dropdown-backdrop"></div> from <div role="presentation" class="cbx-dropdown-presentation krwr-cbx-dropdown-presentation">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    101 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <div role="presentation" class="cbx-dropdown-backdrop krwr-cbx-dropdown-backdrop"></div> from <div role="presentation" class="cbx-dropdown-presentation krwr-cbx-dropdown-presentation">…</div> subtree intercepts pointer events
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
        - generic [ref=e62]: © 2026 v8.7.5
    - generic [ref=e64]:
      - banner [ref=e65]:
        - button [ref=e67] [cursor=pointer]:
          - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=e68]
        - generic [ref=e69]: Grupo Castelar Servicios Legales y Financieros S.A
        - generic [ref=e75]:
          - button [ref=e78] [cursor=pointer]:
            - button "Notifications" [ref=e79]:
              - generic [ref=e80]: 
          - button [expanded] [ref=e82] [cursor=pointer]:
            - button "Button user" [ref=e84]:
              - generic [ref=e87]:
                - img "Logo Virtual Citizen Service Office" [ref=e89]
                - generic [ref=e90]: 
      - generic [ref=e93]:
        - tablist "Pestañas" [ref=e96]:
          - tab "Botón" [selected] [ref=e97] [cursor=pointer]:
            - paragraph [ref=e99]: Templates
          - tab "Botón" [ref=e100] [cursor=pointer]:
            - paragraph [ref=e102]: Tags
        - generic [ref=e106]:
          - generic [ref=e107]:
            - generic [ref=e109]:
              - generic [ref=e113]:
                - combobox "Procedure" [ref=e114]: All
                - generic [ref=e115]: Procedure
                - button "Open options" [ref=e117] [cursor=pointer]
                - group [aria-hidden]
                - button "Botón" [ref=e118] [cursor=pointer]:
                  - generic [ref=e119]: 
              - generic [ref=e124]:
                - generic [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]: All
                  - combobox "Status": All
                  - generic [ref=e127]: Status
                - group [aria-hidden]
              - generic [ref=e133]:
                - combobox "Categories" [ref=e134]: All
                - generic [ref=e135]: Categories
                - button "Open options" [ref=e137] [cursor=pointer]
                - group [aria-hidden]
                - button "Botón" [ref=e138] [cursor=pointer]:
                  - generic [ref=e139]: 
            - generic [ref=e141]:
              - generic [ref=e145]:
                - button "Botón" [ref=e147] [cursor=pointer]:
                  - generic [ref=e148]: 
                - textbox "Search by participant or record" [active] [ref=e149]:
                  - /placeholder: Search templates
                  - text: Automation Template 193404
              - button "Help" [ref=e150] [cursor=pointer]:
                - generic [ref=e151]: 
          - generic [ref=e155]:
            - generic [ref=e156]:
              - table [ref=e157]:
                - rowgroup [ref=e158]:
                  - row [ref=e159]:
                    - columnheader "Name Name " [ref=e160]:
                      - generic [ref=e161]: Name
                      - button "Name " [ref=e162] [cursor=pointer]:
                        - generic [ref=e163]: Name
                        - generic [ref=e164]: 
                    - columnheader "Procedure" [ref=e166]
                    - columnheader "Categories" [ref=e167]
                    - columnheader "Status Status " [ref=e168]:
                      - generic [ref=e169]: Status
                      - button "Status " [ref=e170] [cursor=pointer]:
                        - generic [ref=e171]: Status
                        - generic [ref=e172]: 
                    - columnheader "Actions" [ref=e174]
                - rowgroup [ref=e176]:
                  - row [ref=e177] [cursor=pointer]:
                    - cell "[object Object] Automation Template 193404" [ref=e178]:
                      - generic [ref=e179]:
                        - img "[object Object]" [ref=e181]:
                          - paragraph [ref=e182]:
                            - generic [ref=e183]: 
                        - generic [ref=e184]: Automation Template 193404
                    - cell "15 Jan 26 and 209 more" [ref=e186]:
                      - generic [ref=e187]:
                        - generic [ref=e188]: 15 Jan 26
                        - generic [ref=e191]: and 209 more
                    - cell "Description of the procedure or appointment" [ref=e193]
                    - cell " Activated" [ref=e198]:
                      - generic [ref=e199]:
                        - generic [ref=e200]: 
                        - generic [ref=e201]: Activated
                    - cell [ref=e202]:
                      - button "button" [ref=e203]:
                        - generic [ref=e204]: 
              - generic [ref=e206]: 1 - 1 of 1
            - generic "Add template" [ref=e209]:
              - button "Floating action button" [ref=e210] [cursor=pointer]:
                - generic [ref=e211]: 
        - generic [ref=e214]:
          - generic [ref=e215] [cursor=pointer]: Legal notice and Terms and conditions of use
          - generic [ref=e216] [cursor=pointer]: PRIVACY_POLICY
  - menu [ref=e218]:
    - generic [ref=e219]:
      - menuitem " AmmarEditTestEditEditEdit MičijevićTestTest +387-61072094 ammar.micijevic@councilbox.com" [ref=e220] [cursor=pointer]:
        - generic [ref=e221]:
          - paragraph [ref=e223]:
            - generic [ref=e224]:
              - generic [ref=e225]: 
              - generic [ref=e228]:
                - generic [ref=e229]: AmmarEditTestEditEditEdit MičijevićTestTest
                - generic [ref=e231]: +387-61072094
                - generic [ref=e233]: ammar.micijevic@councilbox.com
          - generic [aria-hidden] [ref=e236]: 
      - separator [ref=e237]
      - menuitem "Grupo Castelar Servicios Legales y Financieros S.A A82345678" [ref=e238] [cursor=pointer]:
        - generic [ref=e239]:
          - paragraph [ref=e241]:
            - generic [ref=e245]:
              - generic [ref=e246]: Grupo Castelar Servicios Legales y Financieros S.A
              - generic [ref=e248]: A82345678
          - generic [aria-hidden] [ref=e251]: 
      - separator [ref=e252]
      - menuitem "Support" [ref=e253] [cursor=pointer]:
        - generic [ref=e254]:
          - paragraph [ref=e256]:
            - generic [ref=e257]: Support
          - generic [aria-hidden] [ref=e261]: 
      - separator [ref=e262]
      - menuitem "Help" [ref=e263] [cursor=pointer]:
        - generic [ref=e264]:
          - paragraph [ref=e266]:
            - generic [ref=e267]: Help
          - generic [aria-hidden] [ref=e271]: 
      - separator [ref=e272]
      - menuitem "End session" [ref=e273] [cursor=pointer]:
        - generic [ref=e274]:
          - paragraph [ref=e276]:
            - generic [ref=e277]: End session
          - generic [aria-hidden] [ref=e281]: 
      - separator [ref=e282]
      - menuitem [ref=e283]:
        - generic [ref=e284]:
          - img "Logo councilbox" [ref=e286]
          - paragraph [ref=e288]:
            - paragraph [ref=e289]: © 2026 OVAC v8.7.5
```

# Test source

```ts
  229 |             // Click 3-dots actions menu
  230 |             const menuBtn = row.locator('button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), td:last-child button').first();
  231 |             await menuBtn.click();
  232 |             await this.page.waitForTimeout(500);
  233 | 
  234 |             // Click Edit menu item
  235 |             const editBtn = this.page.getByRole('menuitem', { name: /Edit|Editar/i })
  236 |                 .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
  237 |                 .or(this.page.locator('.cbx-menuItem:has-text("Edit"), .cbx-menuItem:has-text("Editar")'))
  238 |                 .first();
  239 |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  240 |             await editBtn.click();
  241 |             await this.page.waitForTimeout(1000);
  242 | 
  243 |             // Update template name
  244 |             await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
  245 |             await this.templateNameInput.fill(newName);
  246 |             await this.page.waitForTimeout(500);
  247 | 
  248 |             // Click Save / Update / Create button
  249 |             const saveBtn = this.page.getByRole('button', { name: /Save|Guardar|Update|Actualizar|Create|Crear/i })
  250 |                 .or(this.page.locator('#panel-confirm-button-accept, #modal-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")'))
  251 |                 .first();
  252 |             await saveBtn.click();
  253 |             await this.page.waitForTimeout(2000);
  254 |             await this.dismissToastOrModal();
  255 |             await this.navigateToTemplates();
  256 |         });
  257 |     }
  258 | 
  259 |     /**
  260 |      * Verifies new design for Templates heading informations: icon, template name, status, actions menu (OVAC-5179).
  261 |      */
  262 |     async verifyTemplateHeadingInformation() {
  263 |         await test.step('Verify Templates heading informations: icon, template name, status, and actions menu', async () => {
  264 |             await this.dismissToastOrModal();
  265 |             const row = this.tableBody.locator('tr').first();
  266 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  267 | 
  268 |             // Open 3-dots actions menu and click Edit
  269 |             const menuBtn = row.locator('button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), td:last-child button').first();
  270 |             await menuBtn.click();
  271 |             await this.page.waitForTimeout(500);
  272 | 
  273 |             const editBtn = this.page.getByRole('menuitem', { name: /Edit|Editar/i })
  274 |                 .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
  275 |                 .or(this.page.locator('.cbx-menuItem:has-text("Edit"), .cbx-menuItem:has-text("Editar")'))
  276 |                 .first();
  277 |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  278 |             await editBtn.click();
  279 |             await this.page.waitForTimeout(1000);
  280 | 
  281 |             // 1. Validate Template name (heading level 1)
  282 |             const templateTitle = this.page.getByRole('heading', { level: 1 }).first();
  283 |             await expect(templateTitle).toBeVisible({ timeout: 10000 });
  284 | 
  285 |             // 2. Validate Icon in header
  286 |             const headerIcon = this.page.locator('.ri-government-line, .ri-draft-line, .cbx-IconButton, i[class*="ri-"]').first();
  287 |             await expect(headerIcon).toBeVisible({ timeout: 5000 });
  288 | 
  289 |             // 3. Validate Status
  290 |             const statusIndicator = this.page.getByText(/Activated|Activado|Draft|Borrador|Published|Publicado/i).first();
  291 |             await expect(statusIndicator).toBeVisible({ timeout: 5000 });
  292 | 
  293 |             // 4. Validate Actions menu / Save button
  294 |             const actionsElement = this.page.locator('button:has-text("Save"), button:has-text("Guardar"), button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has-text("Actions")').first();
  295 |             await expect(actionsElement).toBeVisible({ timeout: 5000 });
  296 | 
  297 |             // Close edit drawer/modal
  298 |             await this.page.keyboard.press('Escape');
  299 |             await this.page.waitForTimeout(500);
  300 |         });
  301 |     }
  302 | 
  303 |     /**
  304 |      * Verifies that the professional role cannot import or upload templates (OVAC-5703).
  305 |      */
  306 |     async verifyProfessionalCannotUploadOrImportTemplates() {
  307 |         await test.step('Verify professional role cannot upload or import templates', async () => {
  308 |             await this.dismissToastOrModal();
  309 |             await this.navigateToTemplates();
  310 | 
  311 |             // Verify Create / Import / Upload buttons are NOT visible for Professional
  312 |             await expect(this.createButton).not.toBeVisible();
  313 |             const uploadOrImportBtn = this.page.getByRole('button', { name: /Upload|Import|Subir|Importar/i });
  314 |             await expect(uploadOrImportBtn).not.toBeVisible();
  315 |         });
  316 |     }
  317 | 
  318 |     /**
  319 |      * Toggles template enable/disable status (OVAC-5518).
  320 |      */
  321 |     async toggleTemplateEnableDisable(templateName: string) {
  322 |         await test.step(`Toggle enable/disable status for template "${templateName}"`, async () => {
  323 |             await this.dismissToastOrModal();
  324 |             await this.searchTemplate(templateName);
  325 |             const row = this.tableBody.locator('tr', { hasText: templateName }).first();
  326 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  327 | 
  328 |             // Click template name to open edit page
> 329 |             await row.locator('td').first().click();
      |                                             ^ Error: locator.click: Test timeout of 60000ms exceeded.
  330 |             await this.page.waitForLoadState('networkidle');
  331 |             await this.page.waitForTimeout(1000);
  332 | 
  333 |             // Click actions button next to status indicator
  334 |             const actionsBtn = this.page.locator('button:has(.ri-more-2-fill), button:has(.ri-more-2-line), button:has(.ri-more-fill)').first();
  335 |             await actionsBtn.waitFor({ state: 'visible', timeout: 10000 });
  336 |             await actionsBtn.click();
  337 |             await this.page.waitForTimeout(500);
  338 | 
  339 |             // Click Disable or Enable option
  340 |             const toggleOption = this.page.locator('[role="menu"] [role="menuitem"], menu menuitem, .cbx-menuItem')
  341 |                 .filter({ hasText: /Disable|Enable|Desactivar|Activar/i })
  342 |                 .first();
  343 |             await toggleOption.waitFor({ state: 'visible', timeout: 5000 });
  344 |             await toggleOption.click();
  345 |             await this.page.waitForTimeout(1000);
  346 | 
  347 |             // Verify status or alert reflects change
  348 |             await this.dismissToastOrModal();
  349 |             await this.navigateToTemplates();
  350 |         });
  351 |     }
  352 | 
  353 |     /**
  354 |      * Verifies that the Agent role can see the Templates navigation button (OVAC-5057).
  355 |      */
  356 |     async verifyTemplatesNavButtonVisible() {
  357 |         await test.step('Verify Templates button is visible in navigation menu', async () => {
  358 |             await this.dismissToastOrModal();
  359 |             const btn = this.templatesButton.or(
  360 |                 this.page.locator('a[href*="/drafts"], #navigation-templates, button:has-text("Templates"), button:has-text("Plantillas")')
  361 |             ).first();
  362 |             await expect(btn).toBeVisible({ timeout: 10000 });
  363 |             await expect(btn).toHaveAttribute('href', /.*drafts.*/i);
  364 |         });
  365 |     }
  366 | }
  367 | 
```