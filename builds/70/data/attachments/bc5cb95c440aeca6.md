# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/procedures/procedureTests.spec.ts >> Procedures - Configuration & Documentation Tab Tests >> Verify that the name of file is not clickable but downloadable via 3-dots menu - Documentation tab - Video appointment procedure creation @XR-2291 @regression
- Location: tests/procedures/procedureTests.spec.ts:23:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#add-procedure-button, .MuiFab-root, button[aria-label="Add procedure"]').or(getByRole('button', { name: /Add procedure|Nueva|Nuevo|\+/i })).first() to be visible

```

# Page snapshot

```yaml
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
    - generic [ref=e82]:
      - generic [ref=e85]:
        - generic [ref=e86]:
          - generic [ref=e88]:
            - generic [ref=e92]:
              - generic [ref=e93] [cursor=pointer]:
                - generic [ref=e94]: All status
                - textbox "Input":
                  - /placeholder: ""
                  - text: All status
                - generic [ref=e95]: Status
              - group "Input fieldset":
                - generic: Status
            - generic [ref=e101]:
              - generic [ref=e102] [cursor=pointer]:
                - generic [ref=e103]: All
                - textbox "Input":
                  - /placeholder: ""
                  - text: All
                - generic [ref=e104]: Types
              - group "Input fieldset":
                - generic: Types
            - generic [ref=e110]:
              - generic [ref=e111] [cursor=pointer]:
                - generic [ref=e112]: All
                - textbox "Input":
                  - /placeholder: ""
                  - text: All
                - generic [ref=e113]: Expiration date
              - group "Input fieldset":
                - generic: Expiration date
          - generic [ref=e116]:
            - generic [ref=e120]:
              - button "Icon Button" [ref=e122] [cursor=pointer]:
                - generic [ref=e123]: 
              - textbox "Search for procedures" [active] [ref=e125]: Automation Procedure 360703
            - button "Icon Button" [ref=e126] [cursor=pointer]:
              - generic [ref=e127]: 
        - generic [ref=e131]:
          - generic [ref=e134]:
            - img "logo" [ref=e136]
            - generic [ref=e137]: There are no results for your search. Please, check your selection and try again.
          - generic [ref=e139]:
            - paragraph [ref=e140] [cursor=pointer]: Legal notice and Terms and conditions of use
            - paragraph [ref=e141] [cursor=pointer]: PRIVACY_POLICY
      - generic [ref=e143]:
        - generic [ref=e144] [cursor=pointer]: 
        - generic [ref=e146]: 0 selected
```

# Test source

```ts
  185 |      */
  186 |     async deleteProcedureByNameViaApi(requestContext: APIRequestContext, name: string, companyId: number = 1112, reason?: string): Promise<boolean> {
  187 |         return await test.step(`Delete procedure "${name}" via API`, async () => {
  188 |             return await ProcedureApiHelper.deleteProcedureByName(requestContext, name, companyId, reason);
  189 |         });
  190 |     }
  191 | 
  192 |     async navigateToProcedureConsents(procedureId: string | number, companyId: number = 1112) {
  193 |         await test.step(`Navigate to Consents tab of procedure ${procedureId}`, async () => {
  194 |             await this.page.goto(resolveCompanyUrl(companyId, `procedures/${procedureId}/consents`), { waitUntil: 'domcontentloaded' });
  195 |             await this.page.waitForLoadState('networkidle');
  196 |             await this.dismissToastOrModal();
  197 |             await this.page.waitForTimeout(1500);
  198 |         });
  199 |     }
  200 | 
  201 |     async addConsent(title: string, description: string, isRequired: boolean = false) {
  202 |         await test.step(`Add consent: ${title} (Required: ${isRequired})`, async () => {
  203 |             await this.dismissToastOrModal();
  204 |             await this.page.waitForTimeout(500);
  205 | 
  206 |             // Click ADD button on Consents tab
  207 |             const addBtn = this.page.getByRole('button', { name: /^Add$|^Añadir$/i }).or(this.page.locator('.MuiFab-root, button.MuiFab-primary')).first();
  208 |             await addBtn.waitFor({ state: 'visible', timeout: 15000 });
  209 |             await addBtn.click({ force: true });
  210 |             await this.page.waitForTimeout(1000);
  211 | 
  212 |             // Click on "Consents" type card in the Add consent drawer
  213 |             const consentsCard = this.page.locator('.MuiCard-root').filter({ hasText: /Consents|Consentimientos/i }).first();
  214 |             if (!await consentsCard.isVisible({ timeout: 3000 }).catch(() => false)) {
  215 |                 await addBtn.click({ force: true });
  216 |                 await this.page.waitForTimeout(1000);
  217 |             }
  218 |             await consentsCard.waitFor({ state: 'visible', timeout: 15000 });
  219 |             await consentsCard.click({ force: true });
  220 |             await this.page.waitForTimeout(1000);
  221 | 
  222 |             // Target the active consent detail drawer
  223 |             const titleInput = this.page.locator('#agenda-editor-title-input').or(this.page.getByLabel(/Title/i)).first();
  224 |             await titleInput.waitFor({ state: 'visible', timeout: 15000 });
  225 |             await titleInput.fill(title);
  226 | 
  227 |             const descEditor = this.page.locator('.ql-editor').first();
  228 |             await descEditor.waitFor({ state: 'visible', timeout: 15000 });
  229 |             await descEditor.fill(description);
  230 | 
  231 |             // If required toggle is requested
  232 |             if (isRequired) {
  233 |                 const reqSwitchToggle = this.page.locator('.cbx-switch span').last();
  234 |                 const reqSwitchInput = this.page.locator('.cbx-switch input').last();
  235 |                 const isChecked = await reqSwitchInput.isChecked();
  236 |                 if (!isChecked) {
  237 |                     await reqSwitchToggle.click({ force: true });
  238 |                     await this.page.waitForTimeout(500);
  239 |                 }
  240 |             }
  241 | 
  242 |             // Click SAVE button in drawer
  243 |             const saveBtn = this.page.locator('#-button-accept, button').filter({ hasText: /^SAVE$|^Guardar$/i }).first();
  244 |             await saveBtn.waitFor({ state: 'visible', timeout: 10000 });
  245 |             await saveBtn.click({ force: true });
  246 |             await titleInput.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  247 |             await this.page.waitForTimeout(2000);
  248 |         });
  249 |     }
  250 | 
  251 |     async toggleConsentRequiredOnCard(title: string, targetRequired?: boolean) {
  252 |         await test.step(`Toggle Required switch for consent: "${title}"`, async () => {
  253 |             const card = this.page.locator('.MuiAccordion-root').filter({ hasText: title }).first();
  254 |             await card.waitFor({ state: 'visible', timeout: 20000 });
  255 | 
  256 |             const switchToggle = card.locator('.cbx-switch span').first();
  257 |             const switchInput = card.locator('.cbx-switch input').first();
  258 |             await switchToggle.waitFor({ state: 'visible', timeout: 10000 });
  259 |             const currentState = await switchInput.isChecked();
  260 | 
  261 |             if (targetRequired === undefined || targetRequired !== currentState) {
  262 |                 await switchToggle.click({ force: true });
  263 |                 await this.page.waitForTimeout(1000);
  264 |             }
  265 |         });
  266 |     }
  267 | 
  268 |     async verifyConsentRequiredState(title: string, expectedRequired: boolean) {
  269 |         await test.step(`Verify consent "${title}" Required state is ${expectedRequired}`, async () => {
  270 |             const card = this.page.locator('.MuiAccordion-root').filter({ hasText: title }).first();
  271 |             await card.waitFor({ state: 'visible', timeout: 20000 });
  272 | 
  273 |             const switchInput = card.locator('.cbx-switch input').first();
  274 |             if (expectedRequired) {
  275 |                 await expect(switchInput).toBeChecked();
  276 |             } else {
  277 |                 await expect(switchInput).not.toBeChecked();
  278 |             }
  279 |         });
  280 |     }
  281 | 
  282 |     async openCreateProcedureDrawer() {
  283 |         await test.step('Open create procedure drawer', async () => {
  284 |             await this.dismissToastOrModal();
> 285 |             await this.addProcedureButton.waitFor({ state: 'visible', timeout: 10000 });
      |                                           ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  286 |             await this.addProcedureButton.click();
  287 |         });
  288 |     }
  289 | 
  290 |     async selectVideoAppointmentProcedure() {
  291 |         await test.step('Select Video-appointment procedure type', async () => {
  292 |             await this.videoAppointmentOption.waitFor({ state: 'visible', timeout: 10000 });
  293 |             await this.videoAppointmentOption.click();
  294 |             await this.procedureNameInput.waitFor({ state: 'visible', timeout: 10000 });
  295 |         });
  296 |     }
  297 | 
  298 |     async fillProcedureDetails(data: ProcedureData) {
  299 |         await test.step(`Fill procedure details: ${data.name}`, async () => {
  300 |             await this.procedureNameInput.waitFor({ state: 'visible', timeout: 10000 });
  301 |             await this.procedureNameInput.fill(data.name);
  302 |             await this.procedureDescriptionEditor.waitFor({ state: 'visible', timeout: 10000 });
  303 |             await this.procedureDescriptionEditor.fill(data.description);
  304 |         });
  305 |     }
  306 | 
  307 |     async editProcedureDetails(data: { name?: string; description?: string }) {
  308 |         await test.step(`Edit procedure details${data.name ? ` (New Name: "${data.name}")` : ''}`, async () => {
  309 |             if (data.name) {
  310 |                 await this.procedureNameInput.waitFor({ state: 'visible', timeout: 10000 });
  311 |                 await this.procedureNameInput.fill(data.name);
  312 |             }
  313 |             if (data.description) {
  314 |                 await this.procedureDescriptionEditor.waitFor({ state: 'visible', timeout: 10000 });
  315 |                 await this.procedureDescriptionEditor.fill(data.description);
  316 |             }
  317 |             await this.clickContinue();
  318 |             await this.page.waitForTimeout(1000);
  319 |         });
  320 |     }
  321 | 
  322 |     async clickContinue() {
  323 |         await test.step('Click Continue button', async () => {
  324 |             await this.continueButton.click();
  325 |             await this.page.waitForTimeout(500);
  326 |         });
  327 |     }
  328 | 
  329 |     async navigateToDocumentationTab() {
  330 |         await test.step('Navigate to Documentation tab in procedure creation', async () => {
  331 |             await this.documentationTab.waitFor({ state: 'visible', timeout: 10000 });
  332 |             await this.documentationTab.click();
  333 |             await this.page.waitForTimeout(1000);
  334 |             await this.addFolderButton.waitFor({ state: 'visible', timeout: 15000 });
  335 |         });
  336 |     }
  337 | 
  338 |     async navigateToConfigurationTab() {
  339 |         await test.step('Navigate to Configuration tab in procedure creation', async () => {
  340 |             await this.dismissToastOrModal();
  341 | 
  342 |             // Advance through wizard steps until reaching /configuration URL
  343 |             for (let i = 0; i < 6; i++) {
  344 |                 if (this.page.url().includes('/configuration')) break;
  345 | 
  346 |                 const nextBtn = this.page.locator('#procedure-editor-next').or(this.page.getByRole('button', { name: /Continue|Continuar/i })).first();
  347 |                 if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  348 |                     await nextBtn.click();
  349 |                     await this.page.waitForTimeout(1000);
  350 |                 }
  351 |             }
  352 | 
  353 |             await this.page.waitForURL(/.*\/configuration/i, { timeout: 15000 });
  354 |             await this.languagesHeading.waitFor({ state: 'visible', timeout: 15000 });
  355 |         });
  356 |     }
  357 | 
  358 |     async verifyAllConfigurationElements() {
  359 |         await test.step('Verify all elements in Configuration tab (General, Appointments, Security)', async () => {
  360 |             // 1. General Section & Subsections
  361 |             await expect(this.generalHeading).toBeVisible();
  362 |             await expect(this.languagesHeading).toBeVisible();
  363 |             await expect(this.languagesDescription).toBeVisible();
  364 | 
  365 |             // Languages
  366 |             await expect(this.languageOptionEspanol).toBeVisible();
  367 |             await expect(this.languageOptionEnglish).toBeVisible();
  368 |             await expect(this.languageOptionGalego).toBeVisible();
  369 |             await expect(this.languageOptionValencia).toBeVisible();
  370 |             await expect(this.languageOptionCatala).toBeVisible();
  371 |             await expect(this.languageOptionItaliano).toBeVisible();
  372 |             await expect(this.languageOptionEuskera).toBeVisible();
  373 | 
  374 |             // Consents
  375 |             await expect(this.consentsHeading).toBeVisible();
  376 |             await expect(this.consentsReorderLabel).toBeVisible();
  377 |             await expect(this.consentsEditingLabel).toBeVisible();
  378 | 
  379 |             // Notices
  380 |             await expect(this.noticesHeading).toBeVisible();
  381 |             await expect(this.notificationsToggleLabel).toBeVisible();
  382 |             await expect(this.noticeEmailCheckbox).toBeVisible();
  383 |             await expect(this.noticeSmsCheckbox).toBeVisible();
  384 |             await expect(this.noticeWhatsappCheckbox).toBeVisible();
  385 |             await expect(this.defaultMethodLabel).toBeVisible();
```