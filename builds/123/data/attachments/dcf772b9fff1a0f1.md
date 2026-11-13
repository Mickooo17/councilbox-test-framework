# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/procedures/procedureTests.spec.ts >> Procedures - Configuration & Documentation Tab Tests >> Without the consents, new procedures can be created - Procedures @XR-2561 @regression
- Location: tests/procedures/procedureTests.spec.ts:232:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/The procedure does not require any associated consent|El procedimiento no requiere ningún consentimiento asociado/i).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText(/The procedure does not require any associated consent|El procedimiento no requiere ningún consentimiento asociado/i).first() with timeout 10000ms
  - waiting for getByText(/The procedure does not require any associated consent|El procedimiento no requiere ningún consentimiento asociado/i).first()

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
  - /url: /company/1112/companies
  - button " Entidades"
- link " Usuarios":
  - /url: /company/1112/users
  - button " Usuarios"
- img "CBX white Logo"
- text: © 2026 v8.7.5
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
- text:   Automation Procedure 099875
- button "Ayuda": 
- paragraph: Videocita
- text:  Borrador
- button "button": 
- button "Anterior"
- button "Continuar "
- navigation "Progress":
  - list:
    - listitem:
      - button "Detalles (done)":
        - paragraph: Detalles
        - text: (done)
    - listitem:
      - button "Entidades (done)":
        - paragraph: Entidades
        - text: (done)
    - listitem:
      - button "Pasos del trámite (actual)":
        - paragraph: Pasos del trámite
        - text: (actual)
    - listitem:
      - button "Documentación":
        - paragraph: Documentación
    - listitem:
      - button "Configuración":
        - paragraph: Configuración
    - listitem:
      - button "Revisar":
        - paragraph: Revisar
- text: Libre
- combobox "Navegación": Libre
- text: Navegación
- button "Ayuda": 
- text: La gestión no dispone de ningún consentimiento asociado.
- button "Añadir"
- text: Aviso legal y Términos y condiciones de uso Política de privacidad de Councilbox Technology S.L.  0 seleccionados
```

# Test source

```ts
  524 |             // Click 3-dots dropdown menu button for the document
  525 |             const threeDotsButton = docElement.locator('..').locator('button, [role="button"]')
  526 |                 .or(this.page.locator('div[style*="height: 44px"]').filter({ has: docElement }).locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button'))
  527 |                 .first();
  528 |             await threeDotsButton.waitFor({ state: 'visible', timeout: 5000 });
  529 |             await threeDotsButton.click({ force: true });
  530 |             await this.page.waitForTimeout(500);
  531 | 
  532 |             // Set up download listener
  533 |             const downloadPromise = this.page.waitForEvent('download');
  534 | 
  535 |             // Click Download option from the cbx dropdown menu
  536 |             const downloadMenuItem = this.page.locator('li[id^="download"], .cbx-menuItem:has-text("Download")')
  537 |                 .or(this.page.getByRole('menuitem', { name: /Download|Descargar/i }))
  538 |                 .or(this.page.getByRole('button', { name: /Download|Descargar/i }))
  539 |                 .first();
  540 |             if (!await downloadMenuItem.isVisible({ timeout: 3000 }).catch(() => false)) {
  541 |                 await threeDotsButton.click({ force: true });
  542 |                 await this.page.waitForTimeout(500);
  543 |             }
  544 |             await downloadMenuItem.waitFor({ state: 'visible', timeout: 10000 });
  545 |             await downloadMenuItem.click({ force: true });
  546 | 
  547 |             const download = await downloadPromise;
  548 |             return download;
  549 |         });
  550 |     }
  551 | 
  552 |     async selectNavigationType(type: 'Linear' | 'Free') {
  553 |         await test.step(`Select Navigation type: ${type}`, async () => {
  554 |             const select = this.page.getByRole('combobox', { name: /Navigation|Navegación/i })
  555 |                 .or(this.page.locator('#mui-component-select-Navigation, #mui-component-select-Navegación, [aria-labelledby*="select-Navig" i], [aria-labelledby*="select-Naveg" i]'))
  556 |                 .first();
  557 |             await select.waitFor({ state: 'visible', timeout: 10000 });
  558 |             await select.click({ force: true });
  559 |             await this.page.waitForTimeout(500);
  560 | 
  561 |             const typeRegex = new RegExp(`^${type}$|^${type === 'Linear' ? 'Lineal' : 'Libre'}$`, 'i');
  562 |             const option = this.page.locator('li[role="option"], .MuiMenuItem-root, [role="option"]').filter({ hasText: typeRegex }).first();
  563 |             await option.waitFor({ state: 'visible', timeout: 5000 });
  564 |             await option.click({ force: true });
  565 |             await this.page.waitForTimeout(1000);
  566 |         });
  567 |     }
  568 | 
  569 |     async verifyNavigationType(expectedType: 'Linear' | 'Free') {
  570 |         await test.step(`Verify Navigation type is ${expectedType}`, async () => {
  571 |             const select = this.page.getByRole('combobox', { name: /Navigation|Navegación/i })
  572 |                 .or(this.page.locator('#mui-component-select-Navigation, #mui-component-select-Navegación, [aria-labelledby*="select-Navig" i], [aria-labelledby*="select-Naveg" i]'))
  573 |                 .first();
  574 |             await select.waitFor({ state: 'visible', timeout: 10000 });
  575 |             const expectedRegex = new RegExp(`${expectedType}|${expectedType === 'Linear' ? 'Lineal' : 'Libre'}`, 'i');
  576 |             try {
  577 |                 await expect(select).toHaveValue(expectedRegex, { timeout: 3000 });
  578 |             } catch {
  579 |                 await expect(select).toHaveText(expectedRegex);
  580 |             }
  581 |         });
  582 |     }
  583 | 
  584 |     async advanceToReviewTab() {
  585 |         await test.step('Advance wizard to Review tab', async () => {
  586 |             for (let i = 0; i < 6; i++) {
  587 |                 if (this.page.url().includes('/review')) break;
  588 |                 const nextBtn = this.page.locator('#procedure-editor-next').or(this.page.getByRole('button', { name: /Continue|Continuar/i })).first();
  589 |                 if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  590 |                     await nextBtn.click({ force: true });
  591 |                     await this.page.waitForTimeout(1000);
  592 |                 }
  593 |             }
  594 |             await this.page.waitForURL(/.*\/review/i, { timeout: 15000 });
  595 |         });
  596 |     }
  597 | 
  598 |     async publishProcedure() {
  599 |         await test.step('Publish procedure from Review tab', async () => {
  600 |             const publishBtn = this.page.getByRole('button', { name: /Publish|Publicar/i })
  601 |                 .or(this.page.locator('#council-editor-publish, button:has-text("PUBLISH"), button:has-text("PUBLICAR")'))
  602 |                 .first();
  603 |             await publishBtn.waitFor({ state: 'visible', timeout: 10000 });
  604 |             await publishBtn.click({ force: true });
  605 |             await this.page.waitForTimeout(1000);
  606 | 
  607 |             // Confirm publish in modal dialog
  608 |             const dialog = this.page.locator('#modal, .MuiDialog-root, [role="dialog"]').first();
  609 |             const acceptBtn = dialog.getByRole('button', { name: /Publish|Publicar|Accept|Aceptar/i })
  610 |                 .or(this.page.locator('#modal-button-accept, #modal button.cbx-primary, #alert-confirm button'))
  611 |                 .first();
  612 |             if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  613 |                 await acceptBtn.click({ force: true });
  614 |             }
  615 | 
  616 |             await this.page.waitForLoadState('domcontentloaded');
  617 |             await this.page.waitForTimeout(2000);
  618 |         });
  619 |     }
  620 | 
  621 |     async verifyNoConsentsAssociatedMessage() {
  622 |         await test.step('Verify message indicating no consents are associated with procedure', async () => {
  623 |             const emptyMessage = this.page.getByText(/The procedure does not require any associated consent|El procedimiento no requiere ningún consentimiento asociado/i).first();
> 624 |             await expect(emptyMessage).toBeVisible({ timeout: 10000 });
      |                                        ^ Error: expect(locator).toBeVisible() failed
  625 |         });
  626 |     }
  627 | 
  628 |     async openProcedureFromList(name: string) {
  629 |         await test.step(`Open procedure from list: "${name}"`, async () => {
  630 |             await this.navigateToProcedures();
  631 |             const searchInput = this.page.getByPlaceholder(/Search for procedures|Buscar trámites|Buscar/i).or(this.page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]')).first();
  632 |             await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  633 |             await searchInput.fill(name);
  634 |             await this.page.waitForTimeout(1000);
  635 | 
  636 |             const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
  637 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  638 |             await row.click({ force: true });
  639 |             await this.page.waitForLoadState('networkidle');
  640 |             await this.page.waitForTimeout(1500);
  641 |         });
  642 |     }
  643 | 
  644 |     async clickConsentsTabInWizardOrEdit() {
  645 |         await test.step('Click Consents tab/step in wizard or procedure view', async () => {
  646 |             const consentsStep = this.page.locator('.cbx-stepper-item-text, [role="tab"], .MuiTab-root, nav button')
  647 |                 .filter({ hasText: /Steps of the procedure|Pasos del procedimiento|Consents|Consentimientos/i })
  648 |                 .first();
  649 |             await consentsStep.waitFor({ state: 'visible', timeout: 10000 });
  650 |             await consentsStep.click({ force: true });
  651 |             await this.page.waitForTimeout(1000);
  652 |         });
  653 |     }
  654 | 
  655 |     async clickConfigurationTabInWizardOrEdit() {
  656 |         await test.step('Click Configuration tab/step in wizard or procedure view', async () => {
  657 |             const configStep = this.page.locator('.cbx-stepper-item-text').filter({ hasText: /^Configuration$|^Configuración$/i }).or(
  658 |                 this.page.locator('[role="tab"], .MuiTab-root, p, div').filter({ hasText: /^Configuration$|^Configuración$/i })
  659 |             ).first();
  660 |             await configStep.waitFor({ state: 'visible', timeout: 10000 });
  661 |             await configStep.click({ force: true });
  662 |             await this.page.waitForTimeout(1000);
  663 |             await this.generalHeading.waitFor({ state: 'visible', timeout: 15000 });
  664 |         });
  665 |     }
  666 | 
  667 |     async clickStepperTab(tabName: 'Details' | 'Entities' | 'Consents' | 'Documentation' | 'Configuration' | 'Review') {
  668 |         await test.step(`Click stepper tab: ${tabName}`, async () => {
  669 |             const patterns: Record<string, RegExp> = {
  670 |                 Details: /Details|Detalles/i,
  671 |                 Entities: /Entities|Entidades/i,
  672 |                 Consents: /Consents|Consentimientos|Steps of the procedure|Pasos del procedimiento/i,
  673 |                 Documentation: /Documentation|Documentación/i,
  674 |                 Configuration: /Configuration|Configuración/i,
  675 |                 Review: /Review|Revisión/i,
  676 |             };
  677 |             const pattern = patterns[tabName] || new RegExp(tabName, 'i');
  678 |             const stepTab = this.page.locator('nav button, .cbx-stepper-item-contentText, .cbx-stepper-item-text, [role="tab"]')
  679 |                 .filter({ hasText: pattern })
  680 |                 .first();
  681 |             await stepTab.waitFor({ state: 'visible', timeout: 10000 });
  682 |             await stepTab.click();
  683 |             await this.page.waitForTimeout(1000);
  684 |         });
  685 |     }
  686 | 
  687 |     async clickPrevious() {
  688 |         await test.step('Click Previous button', async () => {
  689 |             const prevBtn = this.page.getByRole('button', { name: /Previous|Anterior/i })
  690 |                 .or(this.page.locator('#procedure-editor-prev'))
  691 |                 .first();
  692 |             await prevBtn.waitFor({ state: 'visible', timeout: 10000 });
  693 |             await prevBtn.click({ force: true });
  694 |             await this.page.waitForTimeout(1000);
  695 |         });
  696 |     }
  697 | 
  698 |     async searchProcedure(name: string) {
  699 |         await test.step(`Search procedure: "${name}"`, async () => {
  700 |             const searchInput = this.page.getByPlaceholder(/Search for procedures|Buscar trámites|Buscar/i).or(this.page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]')).first();
  701 |             await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  702 |             await searchInput.fill(name);
  703 |             await this.page.waitForTimeout(1000);
  704 |         });
  705 |     }
  706 | 
  707 |     async verifyProcedureInTable(name: string) {
  708 |         await test.step(`Verify procedure "${name}" is displayed in table`, async () => {
  709 |             const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
  710 |             await expect(row).toBeVisible({ timeout: 10000 });
  711 |         });
  712 |     }
  713 | 
  714 |     async verifyProcedureNotInTable(name: string) {
  715 |         await test.step(`Verify procedure "${name}" is NOT displayed in table`, async () => {
  716 |             await this.page.waitForTimeout(1000);
  717 |             const row = this.tableBody.locator('tr').filter({ hasText: name });
  718 |             await expect(row).toHaveCount(0, { timeout: 5000 });
  719 |         });
  720 |     }
  721 | 
  722 |     async scrollToProcedureActions(name: string) {
  723 |         await test.step(`Scroll horizontally to 3-dots action button for procedure: "${name}"`, async () => {
  724 |             const row = this.page.getByRole('row', { name: new RegExp(name, 'i') }).or(
```