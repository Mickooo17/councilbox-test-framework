# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> In the Appointments form, the user can filter appointments using filters @XR-2565 @OVAC-5194 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:301:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('combobox', { name: /Users|Usuarios/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('combobox', { name: /Users|Usuarios/i }).first() with timeout 5000ms
  - waiting for getByRole('combobox', { name: /Users|Usuarios/i }).first()

```

```yaml
- dialog "Filters":
  - button "Close panel"
  - heading "Filters" [level=1]
  - button "Clear"
  - progressbar "Cargando"
```

# Test source

```ts
  374 |       if (identifier) {
  375 |         targetRow = await this.getAppointmentRow(identifier);
  376 |       } else {
  377 |         targetRow = this.tableRows.first();
  378 |       }
  379 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  380 |       const menuBtn = targetRow.locator('#appointment-menu').or(
  381 |         targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
  382 |       ).first();
  383 |       await menuBtn.click();
  384 |       await this.page.waitForTimeout(500);
  385 | 
  386 |       const docsOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
  387 |         .getByText(/^Documents$|^Documentos$/i).first();
  388 |       await docsOption.waitFor({ state: 'visible', timeout: 5000 });
  389 |       await docsOption.click();
  390 | 
  391 |       const docsModal = this.page.locator('[role="dialog"], .cbx-Modal-container')
  392 |         .filter({ hasText: /Documents|Documentos/i }).first();
  393 |       await expect(docsModal).toBeVisible({ timeout: 15000 });
  394 | 
  395 |       // Close modal
  396 |       const closeBtn = docsModal.locator('button:has(.ri-close-line), button:has-text("Close"), button:has-text("Cerrar")').first();
  397 |       if (await closeBtn.isVisible().catch(() => false)) {
  398 |         await closeBtn.click();
  399 |       } else {
  400 |         await this.page.keyboard.press('Escape');
  401 |       }
  402 |       await this.page.waitForTimeout(500);
  403 |     });
  404 |   }
  405 | 
  406 |   /**
  407 |    * Opens Cancel modal and verifies tooltip on the 0/500 character counter (XR-3089 / OVAC-5580).
  408 |    */
  409 |   async verifyCancelAppointmentCharacterTooltip(identifier: string | number) {
  410 |     await test.step('Hover character counter in Cancel modal and verify tooltip', async () => {
  411 |       await this.openCancelAppointmentModal(identifier);
  412 | 
  413 |       // Find character counter e.g. 0/500
  414 |       const counter = this.cancelModal.locator('text=/\d+\s*\/\s*500/i').or(this.cancelModal.getByText(/\/500/)).first();
  415 |       await expect(counter).toBeVisible({ timeout: 5000 });
  416 | 
  417 |       // Hover over counter
  418 |       await counter.hover();
  419 |       await this.page.waitForTimeout(500);
  420 | 
  421 |       const tooltip = this.page.locator('[role="tooltip"]:visible, .MuiTooltip-tooltip:visible').first();
  422 |       await expect(tooltip).toBeVisible({ timeout: 5000 });
  423 |       await expect(tooltip).toContainText(/maximum number of character|caracteres/i);
  424 | 
  425 |       // Close modal
  426 |       await this.closeCancelModal();
  427 |     });
  428 |   }
  429 | 
  430 |   /**
  431 |    * Verifies External ID column header is visible in appointments table (XR-3031 / OVAC-4955).
  432 |    */
  433 |   async verifyExternalIdHeaderDisplayed() {
  434 |     await test.step('Observe header and verify External ID label is displayed properly', async () => {
  435 |       await this.dismissToastOrModal();
  436 |       const extIdHeader = this.appointmentsTable.locator('th').filter({ hasText: /External ID/i }).first();
  437 |       await expect(extIdHeader).toBeVisible({ timeout: 15000 });
  438 |     });
  439 |   }
  440 | 
  441 |   /**
  442 |    * Searches appointments by participant ID / passport / TIN (XR-2965 / OVAC-5207).
  443 |    */
  444 |   async searchAppointmentsByParticipant(idOrPassport: string) {
  445 |     await test.step(`Search appointments by participant ID/passport: "${idOrPassport}"`, async () => {
  446 |       await this.searchAppointment(idOrPassport);
  447 |       await this.page.waitForTimeout(1000);
  448 |       const rows = this.tableRows;
  449 |       const rowCount = await rows.count();
  450 |       if (rowCount > 0) {
  451 |         await expect(rows.first()).toBeVisible();
  452 |       } else {
  453 |         const noData = this.page.locator('text=/No appointments|No hay citas|No results|No se encontraron/i').first();
  454 |         await expect(noData).toBeVisible({ timeout: 5000 });
  455 |       }
  456 |     });
  457 |   }
  458 | 
  459 |   /**
  460 |    * Opens table filters via the equalizer button and verifies filter options (XR-2565 / OVAC-5194).
  461 |    */
  462 |   async verifyTableFilterOptionsDisplayed() {
  463 |     await test.step('Open table filters via Equalizer button and verify filter categories', async () => {
  464 |       await this.dismissToastOrModal();
  465 |       const eqBtn = this.page.locator('button:has(.ri-equalizer-line)').first();
  466 |       await expect(eqBtn).toBeVisible({ timeout: 10000 });
  467 |       await eqBtn.click();
  468 |       await this.page.waitForTimeout(500);
  469 | 
  470 |       const heading = this.page.getByRole('heading', { name: /Filters|Filtros/i }).first();
  471 |       await expect(heading).toBeVisible({ timeout: 10000 });
  472 | 
  473 |       // Verify filter sections
> 474 |       await expect(this.page.getByRole('combobox', { name: /Users|Usuarios/i }).first()).toBeVisible();
      |                                                                                          ^ Error: expect(locator).toBeVisible() failed
  475 |       await expect(this.page.getByRole('combobox', { name: /procedures|trámites/i }).first()).toBeVisible();
  476 |       await expect(this.page.getByRole('combobox', { name: /Entities|Entidades/i }).first()).toBeVisible();
  477 | 
  478 |       // Close filter panel using Escape key
  479 |       await this.page.keyboard.press('Escape');
  480 |       await this.page.waitForTimeout(500);
  481 |     });
  482 |   }
  483 | 
  484 |   /**
  485 |    * Opens Participants drawer from appointment 3-dots menu (XR-2525 / OVAC-5599).
  486 |    */
  487 |   async openParticipantsDrawer(identifier?: string | number) {
  488 |     await test.step('Open Participants drawer from appointment 3-dots menu', async () => {
  489 |       await this.dismissToastOrModal();
  490 |       let targetRow;
  491 |       if (identifier) {
  492 |         targetRow = await this.getAppointmentRow(identifier);
  493 |       } else {
  494 |         targetRow = this.tableRows.first();
  495 |       }
  496 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  497 |       const menuBtn = targetRow.locator('#appointment-menu').or(
  498 |         targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
  499 |       ).first();
  500 |       await menuBtn.click();
  501 |       await this.page.waitForTimeout(500);
  502 | 
  503 |       const partOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
  504 |         .getByText(/^Participants$|^Participantes$/i).first();
  505 |       await partOption.waitFor({ state: 'visible', timeout: 5000 });
  506 |       await partOption.click();
  507 | 
  508 |       // Verify attendees drawer is open
  509 |       const drawer = this.page.locator('.MuiDrawer-root:visible, [role="dialog"]:visible')
  510 |         .filter({ hasText: /List of attendees|Participantes|Attendees/i }).first();
  511 |       await expect(drawer).toBeVisible({ timeout: 15000 });
  512 | 
  513 |       // Close drawer
  514 |       const closeBtn = drawer.locator('button:has(.ri-close-line), button[aria-label*="close" i]').first();
  515 |       if (await closeBtn.isVisible().catch(() => false)) {
  516 |         await closeBtn.click();
  517 |       } else {
  518 |         await this.page.keyboard.press('Escape');
  519 |       }
  520 |       await this.page.waitForTimeout(500);
  521 |     });
  522 |   }
  523 | 
  524 |   /**
  525 |    * Verifies "Type of meetings" filter contains all available appointment types (OVAC-5142).
  526 |    */
  527 |   async verifyMeetingTypesFilterContainsTypes() {
  528 |     await test.step('Verify "Type of meetings" filter contains all available appointment types in the appointment list', async () => {
  529 |       await this.dismissToastOrModal();
  530 |       await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  531 |       const eqBtn = this.page.locator('button:has(.ri-equalizer-line)').first();
  532 |       await eqBtn.waitFor({ state: 'visible', timeout: 15000 });
  533 |       await eqBtn.click();
  534 |       await this.page.waitForTimeout(500);
  535 | 
  536 |       const filterDialog = this.page.getByRole('dialog').filter({ hasText: /Filters|Filtros/i }).first();
  537 |       await expect(filterDialog).toBeVisible({ timeout: 10000 });
  538 | 
  539 |       // In the filter drawer, find the combobox for Type of meeting
  540 |       const meetingTypeCombo = filterDialog.getByRole('combobox', { name: /Type of meeting|Tipo de cita/i });
  541 |       await meetingTypeCombo.waitFor({ state: 'attached', timeout: 5000 });
  542 |       await meetingTypeCombo.evaluate((el: HTMLElement) => {
  543 |         el.scrollIntoView();
  544 |         el.click();
  545 |       });
  546 |       await this.page.waitForTimeout(500);
  547 | 
  548 |       const listbox = this.page.locator('ul[role="listbox"], [role="listbox"]').last();
  549 |       await expect(listbox).toBeVisible({ timeout: 5000 });
  550 | 
  551 |       const options = listbox.locator('[role="option"], li');
  552 |       const count = await options.count();
  553 |       expect(count).toBeGreaterThan(1);
  554 | 
  555 |       await this.page.keyboard.press('Escape');
  556 |       await this.page.waitForTimeout(300);
  557 |       await this.page.keyboard.press('Escape');
  558 |     });
  559 |   }
  560 | 
  561 |   /**
  562 |    * Verifies alert icon is hidden for appointments in Canceled status (OVAC-4937).
  563 |    */
  564 |   async verifyAlertIconHiddenForCanceledAppointments() {
  565 |     await test.step('Verify alert icon is hidden for appointments in Canceled status', async () => {
  566 |       await this.dismissToastOrModal();
  567 |       await this.filterByStatus('Canceled');
  568 |       await this.page.waitForTimeout(1000);
  569 | 
  570 |       const row = this.tableRows.first();
  571 |       await row.waitFor({ state: 'visible', timeout: 15000 });
  572 | 
  573 |       // Verify alert icon is hidden / not displayed in canceled rows
  574 |       const alertIcon = row.locator('.ri-alert-line, .ri-error-warning-line, svg[data-testid*="Warning"], .cbx-table-alert');
```