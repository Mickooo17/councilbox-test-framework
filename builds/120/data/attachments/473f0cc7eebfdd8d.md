# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/procedures/procedureTests.spec.ts >> Procedures - Configuration & Documentation Tab Tests >> The user has the ability to create a new procedure type "Process" @XR-2469 @OVAC-5781 @regression
- Location: tests/procedures/procedureTests.spec.ts:325:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
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
        - button [ref=e82] [cursor=pointer]:
          - button "Button user" [ref=e84]:
            - generic [ref=e87]:
              - img "Logo Virtual Citizen Service Office" [ref=e89]
              - generic [ref=e90]: 
    - generic [ref=e93]:
      - generic [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e98]:
            - generic [ref=e99]: 
            - generic [ref=e101]: 
            - generic [ref=e105]: Automation Procedure 567324
          - generic [ref=e106]:
            - button "Help" [ref=e107] [cursor=pointer]:
              - generic [ref=e108]: 
            - paragraph [ref=e113]: Process
            - generic [ref=e115]:
              - generic [ref=e116]: 
              - generic [ref=e117]: Draft
            - button "button" [ref=e119] [cursor=pointer]:
              - generic [ref=e120]: 
            - button "Previous" [ref=e123] [cursor=pointer]
            - button "Continue " [ref=e126] [cursor=pointer]:
              - generic [ref=e127]:
                - text: Continue
                - generic [ref=e128]: 
        - navigation "Progress" [ref=e130]:
          - list [ref=e131]:
            - listitem [ref=e132] [cursor=pointer]:
              - button "Details (done)" [ref=e133]:
                - generic [aria-hidden] [ref=e134]: 
                - generic [ref=e135]:
                  - paragraph [ref=e136]: Details
                  - generic [ref=e137]: (done)
              - generic [ref=e139]: 
            - listitem [ref=e140] [cursor=pointer]:
              - button "Entities (actual)" [ref=e141]:
                - generic [aria-hidden] [ref=e142]: 
                - generic [ref=e143]:
                  - paragraph [ref=e144]: Entities
                  - generic [ref=e145]: (actual)
              - generic [ref=e147]: 
            - listitem [ref=e148] [cursor=pointer]:
              - button [ref=e149]:
                - generic [aria-hidden] [ref=e150]: 
                - paragraph [ref=e152]: Steps of the procedure
              - generic [ref=e154]: 
            - listitem [ref=e155] [cursor=pointer]:
              - button [ref=e156]:
                - generic [aria-hidden] [ref=e157]: 
                - paragraph [ref=e159]: Documentation
              - generic [ref=e161]: 
            - listitem [ref=e162] [cursor=pointer]:
              - button [ref=e163]:
                - generic [aria-hidden] [ref=e164]: 
                - paragraph [ref=e166]: Configuration
              - generic [ref=e168]: 
            - listitem [ref=e169] [cursor=pointer]:
              - button [ref=e170]:
                - generic [aria-hidden] [ref=e171]: 
                - paragraph [ref=e173]: Review
      - generic [ref=e176]:
        - generic [ref=e178]:
          - generic [ref=e179]:
            - generic [ref=e180]:
              - generic [ref=e183]:
                - generic [ref=e184] [cursor=pointer]:
                  - generic [ref=e185]: All
                  - combobox "All status": All
                - group [aria-hidden]
              - generic [ref=e187]:
                - button "Unassign all" [ref=e188] [cursor=pointer]
                - button "Assign all" [ref=e191] [cursor=pointer]
            - generic [ref=e198]:
              - button "Botón" [ref=e200] [cursor=pointer]:
                - generic [ref=e201]: 
              - textbox "Search by participant or record" [active] [ref=e202]:
                - /placeholder: Search entity...
                - text: Automation Procedure 307206
          - generic [ref=e207]:
            - table [ref=e208]:
              - rowgroup [ref=e209]:
                - row [ref=e210]:
                  - columnheader "Name Name " [ref=e211]:
                    - generic [ref=e212]: Name
                    - button "Name " [ref=e213] [cursor=pointer]:
                      - generic [ref=e214]: Name
                      - generic [ref=e215]: 
                  - columnheader "Id Id " [ref=e217]:
                    - generic [ref=e218]: Id
                    - button "Id " [ref=e219] [cursor=pointer]:
                      - generic [ref=e220]: Id
                      - generic [ref=e221]: 
                  - columnheader "Assignment Assignment " [ref=e223]:
                    - generic [ref=e224]: Assignment
                    - button "Assignment " [ref=e225] [cursor=pointer]:
                      - generic [ref=e226]: Assignment
                      - generic [ref=e227]: 
                  - columnheader "Level Level " [ref=e229]:
                    - generic [ref=e230]: Level
                    - button "Level " [ref=e231] [cursor=pointer]:
                      - generic [ref=e232]: Level
                      - generic [ref=e233]: 
                  - columnheader "Actions toggle" [ref=e235]:
                    - generic [ref=e236]: Actions
                    - generic [ref=e238]:
                      - switch "toggle" [checked]
                      - generic [aria-hidden] [ref=e239] [cursor=pointer]
                      - generic [ref=e240] [cursor=pointer]: toggle
              - rowgroup
            - generic [ref=e241]: 0 - No results were found
        - generic [ref=e245]:
          - generic [ref=e246] [cursor=pointer]: Legal notice and Terms and conditions of use
          - generic [ref=e247] [cursor=pointer]: PRIVACY_POLICY
```

# Test source

```ts
  494 | 
  495 |             return selectedDocName;
  496 |         });
  497 |     }
  498 | 
  499 |     async verifyDocumentNameIsNotClickable(docName: string) {
  500 |         await test.step(`Verify document name "${docName}" is not clickable`, async () => {
  501 |             const docNameElement = this.page.getByText(docName).first();
  502 |             await expect(docNameElement).toBeVisible({ timeout: 10000 });
  503 | 
  504 |             // Verify it is not an anchor tag (<a>) and not a button link
  505 |             const isClickable = await docNameElement.evaluate((el) => {
  506 |                 const computed = window.getComputedStyle(el);
  507 |                 const isLink = el.tagName.toLowerCase() === 'a' || el.closest('a') !== null;
  508 |                 const isPointer = computed.cursor === 'pointer';
  509 |                 const hasClickRole = el.getAttribute('role') === 'button' || el.getAttribute('role') === 'link';
  510 |                 return isLink || (isPointer && hasClickRole);
  511 |             });
  512 | 
  513 |             expect(isClickable).toBeFalsy();
  514 |         });
  515 |     }
  516 | 
  517 |     async downloadDocumentFromThreeDots(docName: string): Promise<Download> {
  518 |         return await test.step(`Download document "${docName}" via 3-dots menu`, async () => {
  519 |             await this.dismissToastOrModal();
  520 | 
  521 |             const docElement = this.page.getByText(docName).first();
  522 |             await docElement.waitFor({ state: 'visible', timeout: 10000 });
  523 | 
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
> 594 |             await this.page.waitForURL(/.*\/review/i, { timeout: 15000 });
      |                             ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
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
  616 |             await this.page.waitForLoadState('networkidle');
  617 |             await this.page.waitForTimeout(2000);
  618 |         });
  619 |     }
  620 | 
  621 |     async verifyNoConsentsAssociatedMessage() {
  622 |         await test.step('Verify message indicating no consents are associated with procedure', async () => {
  623 |             const emptyMessage = this.page.getByText(/The procedure does not require any associated consent|El procedimiento no requiere ningún consentimiento asociado/i).first();
  624 |             await expect(emptyMessage).toBeVisible({ timeout: 10000 });
  625 |         });
  626 |     }
  627 | 
  628 |     async openProcedureFromList(name: string) {
  629 |         await test.step(`Open procedure from list: "${name}"`, async () => {
  630 |             await this.navigateToProcedures();
  631 |             const searchInput = this.page.getByPlaceholder('Search for procedures').or(this.page.locator('input[placeholder*="Search" i]')).first();
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
```