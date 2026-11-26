# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/procedures/procedureTests.spec.ts >> Procedures - Configuration & Documentation Tab Tests >> The user can review procedure in Procedures section @XR-2471 @OVAC-5793 @regression
- Location: tests/procedures/procedureTests.spec.ts:317:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table, [role="table"]').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('table, [role="table"]').first() with timeout 15000ms
  - waiting for locator('table, [role="table"]').first()

```

```yaml
- button ""
- link " Actividad":
  - /url: /company/1112/activity/dashboardCouncils
  - button " Actividad"
- link " Citas":
  - /url: /company/1112
  - button " Citas"
- link " Gestiones":
  - /url: /company/1112/managements
  - button " Gestiones"
- link " Trámites":
  - /url: /company/1112/procedures
  - button " Trámites"
- link " Plantillas":
  - /url: /company/1112/drafts
  - button " Plantillas"
- link " Documentación":
  - /url: /company/1112/documentation
  - button " Documentación"
- link " Entidades":
  - /url: /company/1112/entities
  - button " Entidades"
- link " Usuarios":
  - /url: /company/1112/users
  - button " Usuarios"
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
      - img "Logo Oficina Virtual de Atención al Ciudadano"
      - text: 
- progressbar:
  - img
```

# Test source

```ts
  222 |         // 2. Open procedure from list in UI
  223 |         await proceduresPage.openProcedureFromList(procedureData.name);
  224 | 
  225 |         // 3. Navigate to Configuration tab in edit view
  226 |         await proceduresPage.clickConfigurationTabInWizardOrEdit();
  227 | 
  228 |         // 4. Verify all elements in Configuration tab (General, Appointments, Security)
  229 |         await proceduresPage.verifyAllConfigurationElements();
  230 |     });
  231 | 
  232 |     test('Without the consents, new procedures can be created - Procedures @XR-2561 @regression', async ({ proceduresPage }) => {
  233 |         test.slow();
  234 | 
  235 |         // 1. Open create procedure drawer and select Video-appointment procedure
  236 |         await proceduresPage.openCreateProcedureDrawer();
  237 |         await proceduresPage.selectVideoAppointmentProcedure();
  238 | 
  239 |         // 2. Fill procedure details (Name & Description) and continue
  240 |         await proceduresPage.fillProcedureDetails(procedureData);
  241 |         await proceduresPage.clickContinue(); // Advance from Details to Entities
  242 | 
  243 |         // 3. Advance from Entities to Consents tab
  244 |         await proceduresPage.clickContinue(); // Advance to Consents
  245 | 
  246 |         // 4. Verify that Consents step displays message that no consents are required
  247 |         await proceduresPage.verifyNoConsentsAssociatedMessage();
  248 | 
  249 |         // 5. Advance through the rest of the wizard to Review tab without adding any consents
  250 |         await proceduresPage.advanceToReviewTab();
  251 | 
  252 |         // 6. Publish the procedure and confirm in the warning dialog
  253 |         await proceduresPage.publishProcedure();
  254 | 
  255 |         // 7. Verify the procedure is successfully created and displayed in the table
  256 |         await proceduresPage.searchProcedure(procedureData.name);
  257 |         await proceduresPage.verifyProcedureInTable(procedureData.name);
  258 | 
  259 |         // 8. Open the created procedure and verify Consents tab remains empty
  260 |         await proceduresPage.openProcedureFromList(procedureData.name);
  261 |         await proceduresPage.clickConsentsTabInWizardOrEdit();
  262 |         await proceduresPage.verifyNoConsentsAssociatedMessage();
  263 |     });
  264 | 
  265 |     test('Ovac - Browsing beetwen tabs in new Procedure creation @XR-2331 @regression', async ({ proceduresPage }) => {
  266 |         test.slow();
  267 | 
  268 |         // 1. Open create procedure drawer and select Video-appointment procedure
  269 |         await proceduresPage.openCreateProcedureDrawer();
  270 |         await proceduresPage.selectVideoAppointmentProcedure();
  271 | 
  272 |         // 2. Verify that from step 1 navigation is restricted when required fields are not covered
  273 |         await expect(proceduresPage.continueButton).toBeDisabled();
  274 |         expect(proceduresPage.page.url()).toContain('/procedures/new');
  275 | 
  276 |         // 3. Cover required fields (Name & Description)
  277 |         await proceduresPage.fillProcedureDetails(procedureData);
  278 |         await expect(proceduresPage.continueButton).toBeEnabled();
  279 | 
  280 |         // 4. Click Continue to save draft and enable free tab browsing
  281 |         await proceduresPage.clickContinue();
  282 |         await expect(proceduresPage.page).toHaveURL(/.*\/companies/i);
  283 | 
  284 |         // 5. Navigate freely between steps by clicking on desired tabs
  285 |         // Click Consents tab
  286 |         await proceduresPage.clickStepperTab('Consents');
  287 |         await expect(proceduresPage.page).toHaveURL(/.*\/consents/i);
  288 | 
  289 |         // Click Documentation tab
  290 |         await proceduresPage.clickStepperTab('Documentation');
  291 |         await expect(proceduresPage.page).toHaveURL(/.*\/documentation/i);
  292 | 
  293 |         // Click Configuration tab
  294 |         await proceduresPage.clickStepperTab('Configuration');
  295 |         await expect(proceduresPage.page).toHaveURL(/.*\/configuration/i);
  296 | 
  297 |         // Click Review tab
  298 |         await proceduresPage.clickStepperTab('Review');
  299 |         await expect(proceduresPage.page).toHaveURL(/.*\/review/i);
  300 | 
  301 |         // Click Details tab (Step 1)
  302 |         await proceduresPage.clickStepperTab('Details');
  303 |         await expect(proceduresPage.page).toHaveURL(/.*\/details|.*\/procedures\/\d+$/i);
  304 | 
  305 |         // Click Entities tab (Step 2)
  306 |         await proceduresPage.clickStepperTab('Entities');
  307 |         await expect(proceduresPage.page).toHaveURL(/.*\/companies/i);
  308 | 
  309 |         // 6. Verify navigation via Continue and Previous buttons
  310 |         await proceduresPage.clickContinue();
  311 |         await expect(proceduresPage.page).toHaveURL(/.*\/consents/i);
  312 | 
  313 |         await proceduresPage.clickPrevious();
  314 |         await expect(proceduresPage.page).toHaveURL(/.*\/companies/i);
  315 |     });
  316 | 
  317 |     test('The user can review procedure in Procedures section @XR-2471 @OVAC-5793 @regression', async ({ proceduresPage, page }) => {
  318 |         // 1-3. Navigate to Procedures page
  319 |         await proceduresPage.navigateToProcedures();
  320 |         await expect(page).toHaveURL(/.*\/procedures/i, { timeout: 15000 });
  321 |         const procTable = page.locator('table, [role="table"]').first();
> 322 |         await expect(procTable).toBeVisible({ timeout: 15000 });
      |                                 ^ Error: expect(locator).toBeVisible() failed
  323 |     });
  324 | 
  325 |     test('The user has the ability to create a new procedure type "Process" @XR-2469 @OVAC-5781 @regression', async ({ proceduresPage, page, request }) => {
  326 |         test.slow();
  327 |         const procData = DataGenerator.randomProcedureData();
  328 | 
  329 |         // 1-3. Navigate to Procedures page
  330 |         await proceduresPage.navigateToProcedures();
  331 | 
  332 |         // 4. Click "+" button
  333 |         await proceduresPage.openCreateProcedureDrawer();
  334 | 
  335 |         // 5. Click "Process"
  336 |         const processOption = page.locator('[role="dialog"], .cbx-drawerPanel-container').getByText(/^Process$|^Proceso$/i).first();
  337 |         await expect(processOption).toBeVisible({ timeout: 5000 });
  338 |         await processOption.click();
  339 | 
  340 |         // 6. Fill details and continue
  341 |         await proceduresPage.fillProcedureDetails(procData);
  342 |         await proceduresPage.clickContinue();
  343 | 
  344 |         // 7-13. Advance through wizard and publish
  345 |         await proceduresPage.advanceToReviewTab();
  346 |         await proceduresPage.publishProcedure();
  347 | 
  348 |         // 14. Verify procedure is created and displayed in the table
  349 |         await proceduresPage.searchProcedure(procData.name);
  350 |         await proceduresPage.verifyProcedureInTable(procData.name);
  351 | 
  352 |         // Cleanup
  353 |         await proceduresPage.deleteProcedureByNameViaApi(request, procData.name).catch(() => {});
  354 |     });
  355 | 
  356 |     test('The user can edit the procedure type "Process" @XR-2470 @OVAC-5797 @regression', async ({ proceduresPage, page, request }) => {
  357 |         test.slow();
  358 |         // 1-3. Create procedure via API
  359 |         const procData = DataGenerator.randomProcedureData();
  360 |         const created = await proceduresPage.createProcedureViaApi(request, {
  361 |             title: procData.name,
  362 |             description: procData.description,
  363 |             companyId: 1112,
  364 |         });
  365 | 
  366 |         // 4. Navigate to procedures and locate row
  367 |         await proceduresPage.navigateToProcedures();
  368 |         await proceduresPage.searchProcedure(procData.name);
  369 |         const row = proceduresPage.tableBody.locator('tr', { hasText: procData.name }).first();
  370 |         await expect(row).toBeVisible({ timeout: 10000 });
  371 | 
  372 |         // 5. Click 3-dots and select Edit
  373 |         const actionButton = row.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').first();
  374 |         await actionButton.click();
  375 |         const editItem = page.getByRole('button', { name: /Edit|Editar/i }).or(page.getByRole('menuitem', { name: /Edit|Editar/i })).first();
  376 |         await expect(editItem).toBeVisible({ timeout: 5000 });
  377 |         await editItem.click();
  378 | 
  379 |         // 6. Verify Edit procedure form is opened
  380 |         await expect(page).toHaveURL(new RegExp(`.*/procedures/${created.id}.*`, 'i'), { timeout: 10000 });
  381 | 
  382 |         // Cleanup
  383 |         await proceduresPage.deleteProcedureByNameViaApi(request, procData.name).catch(() => {});
  384 |     });
  385 | 
  386 |     test('The user can duplicate the procedure type "Process" @XR-2472 @OVAC-5796 @regression', async ({ proceduresPage, page, request }) => {
  387 |         test.slow();
  388 |         // 1-3. Create procedure via API
  389 |         const procData = DataGenerator.randomProcedureData();
  390 |         await proceduresPage.createProcedureViaApi(request, {
  391 |             title: procData.name,
  392 |             description: procData.description,
  393 |             companyId: 1112,
  394 |         });
  395 | 
  396 |         // 4. Navigate to procedures and search
  397 |         await proceduresPage.navigateToProcedures();
  398 |         await proceduresPage.searchProcedure(procData.name);
  399 |         const row = proceduresPage.tableBody.locator('tr', { hasText: procData.name }).first();
  400 |         await expect(row).toBeVisible({ timeout: 10000 });
  401 | 
  402 |         // 5. Click 3-dots and verify Duplicate option is present
  403 |         const actionButton = row.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').first();
  404 |         await actionButton.click();
  405 |         const dupItem = page.getByRole('button', { name: /Duplicate|Duplicar/i }).or(page.getByRole('menuitem', { name: /Duplicate|Duplicar/i })).first();
  406 |         await expect(dupItem).toBeVisible({ timeout: 5000 });
  407 | 
  408 |         // Cleanup
  409 |         await page.keyboard.press('Escape');
  410 |         await proceduresPage.deleteProcedureByNameViaApi(request, procData.name).catch(() => {});
  411 |     });
  412 | 
  413 |     test('The user has the capability to delete the procedure type "Process" @XR-2473 @OVAC-5795 @regression', async ({ proceduresPage, request }) => {
  414 |         test.slow();
  415 |         // 1-3. Create procedure via API
  416 |         const procData = DataGenerator.randomProcedureData();
  417 |         await proceduresPage.createProcedureViaApi(request, {
  418 |             title: procData.name,
  419 |             description: procData.description,
  420 |             companyId: 1112,
  421 |         });
  422 | 
```