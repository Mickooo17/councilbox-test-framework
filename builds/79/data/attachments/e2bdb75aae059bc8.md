# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/procedures/procedureTests.spec.ts >> Procedures - Configuration & Documentation Tab Tests >> The administrator can create a "Free" navigation procedure @XR-2704 @regression
- Location: tests/procedures/procedureTests.spec.ts:127:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#mui-component-select-Navigation, [aria-labelledby="mui-component-select-Navigation"]').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]: 
    - generic [ref=e11]:
      - link [ref=e13] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
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
      - link [ref=e49] [cursor=pointer]:
        - /url: /company/1112/companies
        - button " Entities" [ref=e50]:
          - generic [ref=e51]: 
          - generic [ref=e53]: Entities
      - link [ref=e55] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=e56]:
          - generic [ref=e57]: 
          - generic [ref=e59]: Users
    - generic [ref=e61]:
      - img "CBX white Logo" [ref=e62]
      - generic [ref=e63]: © 2026 v8.6.6
  - generic [ref=e65]:
    - banner [ref=e66]:
      - img "logo" [ref=e69] [cursor=pointer]
      - generic [ref=e70]: QA DEV
      - generic [ref=e76]:
        - button "" [ref=e80] [cursor=pointer]
        - button "Actions Button" [ref=e86] [cursor=pointer]:
          - generic [ref=e89]:
            - img "logo" [ref=e91]
            - generic [ref=e92]: 
    - generic [ref=e95]:
      - generic [ref=e97]:
        - generic [ref=e98]:
          - generic [ref=e100]:
            - generic [ref=e101]: 
            - generic [ref=e103]: 
            - generic [ref=e107]: Automation Procedure 069941
          - generic [ref=e108]:
            - button "Icon Button" [ref=e109] [cursor=pointer]:
              - generic [ref=e110]: 
            - paragraph [ref=e116]: Video-appointment
            - generic [ref=e118]:
              - generic [ref=e119]: 
              - generic [ref=e120]: Draft
            - button "" [ref=e122] [cursor=pointer]
            - button "Previous" [ref=e126] [cursor=pointer]
            - button "Continue " [ref=e129] [cursor=pointer]:
              - generic [ref=e130]:
                - text: Continue
                - generic [ref=e131]: 
        - generic [ref=e133]:
          - generic [ref=e134] [cursor=pointer]:
            - generic [ref=e135]:
              - generic [ref=e136]: 
              - paragraph [ref=e138]: Details
            - generic [ref=e139]: 
          - generic [ref=e141] [cursor=pointer]:
            - generic [ref=e142]:
              - generic [ref=e143]: 
              - paragraph [ref=e145]: Entities
            - generic [ref=e146]: 
          - generic [ref=e148] [cursor=pointer]:
            - generic [ref=e149]:
              - generic [ref=e150]: 
              - paragraph [ref=e152]: Agents with video attention
            - generic [ref=e153]: 
          - generic [ref=e155] [cursor=pointer]:
            - generic [ref=e156]:
              - generic [ref=e157]: 
              - paragraph [ref=e159]: Consents
            - generic [ref=e160]: 
          - generic [ref=e162] [cursor=pointer]:
            - generic [ref=e163]:
              - generic [ref=e164]: 
              - paragraph [ref=e166]: Documentation
            - generic [ref=e167]: 
          - generic [ref=e169] [cursor=pointer]:
            - generic [ref=e170]:
              - generic [ref=e171]: 
              - paragraph [ref=e173]: Configuration
            - generic [ref=e174]: 
          - generic [ref=e177] [cursor=pointer]:
            - generic [ref=e178]: 
            - paragraph [ref=e180]: Review
      - generic [ref=e183]:
        - generic [ref=e185]:
          - generic [ref=e186]:
            - generic [ref=e187]:
              - generic [ref=e189]:
                - button "All agents" [ref=e190] [cursor=pointer]
                - textbox [aria-hidden]: all
              - generic [ref=e191]:
                - button "Unassign all" [ref=e192] [cursor=pointer]
                - button "Assign all" [ref=e195] [cursor=pointer]
            - generic [ref=e198]:
              - generic [ref=e202]:
                - button "Icon Button" [ref=e204] [cursor=pointer]:
                  - generic [ref=e205]: 
                - textbox "Search professional..." [ref=e207]
              - button "Icon Button" [ref=e208] [cursor=pointer]:
                - generic [ref=e209]: 
          - generic [ref=e215]:
            - table [ref=e216]:
              - rowgroup [ref=e217]:
                - row [ref=e218]:
                  - columnheader "Name " [ref=e219]:
                    - generic [ref=e220] [cursor=pointer]:
                      - generic [ref=e221]: Name
                      - generic [ref=e222]: 
                  - columnheader "Identification " [ref=e224]:
                    - generic [ref=e225] [cursor=pointer]:
                      - generic [ref=e226]: Identification
                      - generic [ref=e227]: 
                  - columnheader "Assignment" [ref=e229]:
                    - generic [ref=e230]:
                      - text: Assignment
                      - generic [ref=e231]:
                        - generic:
                          - paragraph
                        - generic [ref=e232]:
                          - checkbox
                          - generic [ref=e233] [cursor=pointer]
              - rowgroup [ref=e234]:
                - row [ref=e235] [cursor=pointer]:
                  - cell " Adri QA" [ref=e236]:
                    - generic [ref=e237]:
                      - generic [ref=e238]: 
                      - generic [ref=e240]: Adri QA
                  - cell "3380" [ref=e242]
                  - cell "Not assigned" [ref=e244]:
                    - generic [ref=e246]:
                      - paragraph [ref=e248]: Not assigned
                      - generic [ref=e249]:
                        - checkbox
                - row [ref=e251] [cursor=pointer]:
                  - cell " alexis [dev][admin-profesional]" [ref=e252]:
                    - generic [ref=e253]:
                      - generic [ref=e254]: 
                      - generic [ref=e256]: alexis [dev][admin-profesional]
                  - cell "2734" [ref=e258]
                  - cell "Not assigned" [ref=e260]:
                    - generic [ref=e262]:
                      - paragraph [ref=e264]: Not assigned
                      - generic [ref=e265]:
                        - checkbox
                - row [ref=e267] [cursor=pointer]:
                  - cell " Ammar Professional" [ref=e268]:
                    - generic [ref=e269]:
                      - generic [ref=e270]: 
                      - generic [ref=e272]: Ammar Professional
                  - cell "3166" [ref=e274]
                  - cell "Not assigned" [ref=e276]:
                    - generic [ref=e278]:
                      - paragraph [ref=e280]: Not assigned
                      - generic [ref=e281]:
                        - checkbox
                - row [ref=e283] [cursor=pointer]:
                  - cell " AmmarProfi AmmarProfi" [ref=e284]:
                    - generic [ref=e285]:
                      - generic [ref=e286]: 
                      - generic [ref=e288]: AmmarProfi AmmarProfi
                  - cell "3362" [ref=e290]
                  - cell "Not assigned" [ref=e292]:
                    - generic [ref=e294]:
                      - paragraph [ref=e296]: Not assigned
                      - generic [ref=e297]:
                        - checkbox
                - row [ref=e299] [cursor=pointer]:
                  - cell " ApiAdminAgent TestSurname" [ref=e300]:
                    - generic [ref=e301]:
                      - generic [ref=e302]: 
                      - generic [ref=e304]: ApiAdminAgent TestSurname
                  - cell "3822" [ref=e306]
                  - cell "Not assigned" [ref=e308]:
                    - generic [ref=e310]:
                      - paragraph [ref=e312]: Not assigned
                      - generic [ref=e313]:
                        - checkbox
                - row [ref=e315] [cursor=pointer]:
                  - cell " AutoAdmin AgentTester" [ref=e316]:
                    - generic [ref=e317]:
                      - generic [ref=e318]: 
                      - generic [ref=e320]: AutoAdmin AgentTester
                  - cell "4138" [ref=e322]
                  - cell "Not assigned" [ref=e324]:
                    - generic [ref=e326]:
                      - paragraph [ref=e328]: Not assigned
                      - generic [ref=e329]:
                        - checkbox
                - row [ref=e331] [cursor=pointer]:
                  - cell " AutoAdmin AgentTester" [ref=e332]:
                    - generic [ref=e333]:
                      - generic [ref=e334]: 
                      - generic [ref=e336]: AutoAdmin AgentTester
                  - cell "4152" [ref=e338]
                  - cell "Not assigned" [ref=e340]:
                    - generic [ref=e342]:
                      - paragraph [ref=e344]: Not assigned
                      - generic [ref=e345]:
                        - checkbox
                - row [ref=e347] [cursor=pointer]:
                  - cell " AutoAdmin AgentTester" [ref=e348]:
                    - generic [ref=e349]:
                      - generic [ref=e350]: 
                      - generic [ref=e352]: AutoAdmin AgentTester
                  - cell "4124" [ref=e354]
                  - cell "Not assigned" [ref=e356]:
                    - generic [ref=e358]:
                      - paragraph [ref=e360]: Not assigned
                      - generic [ref=e361]:
                        - checkbox
                - row [ref=e363] [cursor=pointer]:
                  - cell " AutoAdmin AgentTester" [ref=e364]:
                    - generic [ref=e365]:
                      - generic [ref=e366]: 
                      - generic [ref=e368]: AutoAdmin AgentTester
                  - cell "4168" [ref=e370]
                  - cell "Not assigned" [ref=e372]:
                    - generic [ref=e374]:
                      - paragraph [ref=e376]: Not assigned
                      - generic [ref=e377]:
                        - checkbox
                - row [ref=e379] [cursor=pointer]:
                  - cell " AutoAdmin AgentTester" [ref=e380]:
                    - generic [ref=e381]:
                      - generic [ref=e382]: 
                      - generic [ref=e384]: AutoAdmin AgentTester
                  - cell "4182" [ref=e386]
                  - cell "Not assigned" [ref=e388]:
                    - generic [ref=e390]:
                      - paragraph [ref=e392]: Not assigned
                      - generic [ref=e393]:
                        - checkbox
            - generic [ref=e395]:
              - generic [ref=e396]: 1 - 10 of 53
              - generic [ref=e399]:
                - generic [ref=e400]:
                  - generic [ref=e401] [cursor=pointer]: "1"
                  - generic [ref=e402] [cursor=pointer]: "2"
                  - generic [ref=e403] [cursor=pointer]: "3"
                  - generic [ref=e404] [cursor=pointer]: "4"
                  - generic [ref=e405] [cursor=pointer]: "5"
                  - generic [ref=e406] [cursor=pointer]: "6"
                - generic [ref=e407]: 
        - generic [ref=e411]:
          - paragraph [ref=e412] [cursor=pointer]: Legal notice and Terms and conditions of use
          - paragraph [ref=e413] [cursor=pointer]: PRIVACY_POLICY
```

# Test source

```ts
  442 | 
  443 |     async openFolder(folderTitle: string) {
  444 |         await test.step(`Open folder: ${folderTitle}`, async () => {
  445 |             await this.dismissToastOrModal();
  446 |             const folderItem = this.page.getByText(folderTitle).first();
  447 |             await folderItem.waitFor({ state: 'visible', timeout: 10000 });
  448 |             await folderItem.click();
  449 |             await this.page.waitForTimeout(1500);
  450 |         });
  451 |     }
  452 | 
  453 |     async addDocumentFromOvacStorageInExpandedFolder(docName: string = 'campos-de-castilla2'): Promise<string> {
  454 |         return await test.step(`Add document from OVAC storage: ${docName}`, async () => {
  455 |             await this.dismissToastOrModal();
  456 |             const ovacBtn = this.page.getByRole('button', { name: /OVAC STORAGE/i }).first();
  457 |             await ovacBtn.waitFor({ state: 'visible', timeout: 10000 });
  458 |             await ovacBtn.click();
  459 |             await this.page.waitForTimeout(1500);
  460 | 
  461 |             // Select document from OVAC storage drawer
  462 |             const docElement = this.page.locator(`img[alt="${docName}"], [alt*="${docName}" i]`).or(
  463 |                 this.page.getByText(docName)
  464 |             ).first();
  465 | 
  466 |             let selectedDocName = docName;
  467 |             if (await docElement.isVisible({ timeout: 5000 }).catch(() => false)) {
  468 |                 await docElement.evaluate((el) => (el as HTMLElement).click());
  469 |             } else {
  470 |                 const firstCard = this.page.locator('.cbx-drawerPanel-container').last().locator('.MuiCard-root').filter({ hasNot: this.page.locator('[alt*="logo" i]') }).first();
  471 |                 await firstCard.waitFor({ state: 'visible', timeout: 10000 });
  472 |                 await firstCard.evaluate((el) => (el as HTMLElement).click());
  473 |                 const text = await firstCard.innerText();
  474 |                 selectedDocName = text.split('\n')[0]?.trim() || '';
  475 |             }
  476 | 
  477 |             // Click ADD button in the OVAC storage drawer
  478 |             await this.page.waitForTimeout(500);
  479 |             const addBtn = this.page.locator('button').filter({ hasText: /^ADD$|^Añadir$/i }).last();
  480 |             await addBtn.evaluate((el) => (el as HTMLElement).click());
  481 |             await this.page.waitForTimeout(2000);
  482 |             await this.dismissToastOrModal();
  483 | 
  484 |             return selectedDocName;
  485 |         });
  486 |     }
  487 | 
  488 |     async verifyDocumentNameIsNotClickable(docName: string) {
  489 |         await test.step(`Verify document name "${docName}" is not clickable`, async () => {
  490 |             const docNameElement = this.page.getByText(docName).first();
  491 |             await expect(docNameElement).toBeVisible({ timeout: 10000 });
  492 | 
  493 |             // Verify it is not an anchor tag (<a>) and not a button link
  494 |             const isClickable = await docNameElement.evaluate((el) => {
  495 |                 const computed = window.getComputedStyle(el);
  496 |                 const isLink = el.tagName.toLowerCase() === 'a' || el.closest('a') !== null;
  497 |                 const isPointer = computed.cursor === 'pointer';
  498 |                 const hasClickRole = el.getAttribute('role') === 'button' || el.getAttribute('role') === 'link';
  499 |                 return isLink || (isPointer && hasClickRole);
  500 |             });
  501 | 
  502 |             expect(isClickable).toBeFalsy();
  503 |         });
  504 |     }
  505 | 
  506 |     async downloadDocumentFromThreeDots(docName: string): Promise<Download> {
  507 |         return await test.step(`Download document "${docName}" via 3-dots menu`, async () => {
  508 |             await this.dismissToastOrModal();
  509 | 
  510 |             const docElement = this.page.getByText(docName).first();
  511 |             await docElement.waitFor({ state: 'visible', timeout: 10000 });
  512 | 
  513 |             // Click 3-dots dropdown menu button for the document
  514 |             const docRow = this.page.locator('div[style*="height: 44px"]').filter({ has: docElement }).first();
  515 |             const threeDotsButton = docRow.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button').first();
  516 |             await threeDotsButton.waitFor({ state: 'visible', timeout: 5000 });
  517 |             await threeDotsButton.click({ force: true });
  518 |             await this.page.waitForTimeout(500);
  519 | 
  520 |             // Set up download listener
  521 |             const downloadPromise = this.page.waitForEvent('download');
  522 | 
  523 |             // Click Download option from the cbx dropdown menu
  524 |             const downloadMenuItem = this.page.locator('li[id^="download"], .cbx-menuItem:has-text("Download")').or(
  525 |                 this.page.getByRole('menuitem', { name: /Download|Descargar/i })
  526 |             ).first();
  527 |             if (!await downloadMenuItem.isVisible({ timeout: 3000 }).catch(() => false)) {
  528 |                 await threeDotsButton.click({ force: true });
  529 |                 await this.page.waitForTimeout(500);
  530 |             }
  531 |             await downloadMenuItem.waitFor({ state: 'visible', timeout: 10000 });
  532 |             await downloadMenuItem.click({ force: true });
  533 | 
  534 |             const download = await downloadPromise;
  535 |             return download;
  536 |         });
  537 |     }
  538 | 
  539 |     async selectNavigationType(type: 'Linear' | 'Free') {
  540 |         await test.step(`Select Navigation type: ${type}`, async () => {
  541 |             const select = this.page.locator('#mui-component-select-Navigation, [aria-labelledby="mui-component-select-Navigation"]').first();
> 542 |             await select.waitFor({ state: 'visible', timeout: 10000 });
      |                          ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  543 |             await select.click({ force: true });
  544 |             await this.page.waitForTimeout(500);
  545 | 
  546 |             const option = this.page.locator('li[role="option"], .MuiMenuItem-root').filter({ hasText: new RegExp(`^${type}$`, 'i') }).first();
  547 |             await option.waitFor({ state: 'visible', timeout: 5000 });
  548 |             await option.click({ force: true });
  549 |             await this.page.waitForTimeout(1000);
  550 |         });
  551 |     }
  552 | 
  553 |     async verifyNavigationType(expectedType: 'Linear' | 'Free') {
  554 |         await test.step(`Verify Navigation type is ${expectedType}`, async () => {
  555 |             const select = this.page.locator('#mui-component-select-Navigation, [aria-labelledby="mui-component-select-Navigation"]').first();
  556 |             await select.waitFor({ state: 'visible', timeout: 10000 });
  557 |             await expect(select).toHaveText(new RegExp(expectedType, 'i'));
  558 |         });
  559 |     }
  560 | 
  561 |     async advanceToReviewTab() {
  562 |         await test.step('Advance wizard to Review tab', async () => {
  563 |             for (let i = 0; i < 6; i++) {
  564 |                 if (this.page.url().includes('/review')) break;
  565 |                 const nextBtn = this.page.locator('#procedure-editor-next').or(this.page.getByRole('button', { name: /Continue|Continuar/i })).first();
  566 |                 if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  567 |                     await nextBtn.click({ force: true });
  568 |                     await this.page.waitForTimeout(1000);
  569 |                 }
  570 |             }
  571 |             await this.page.waitForURL(/.*\/review/i, { timeout: 15000 });
  572 |         });
  573 |     }
  574 | 
  575 |     async publishProcedure() {
  576 |         await test.step('Publish procedure from Review tab', async () => {
  577 |             const publishBtn = this.page.getByRole('button', { name: /Publish|Publicar/i })
  578 |                 .or(this.page.locator('#council-editor-publish, button:has-text("PUBLISH"), button:has-text("PUBLICAR")'))
  579 |                 .first();
  580 |             await publishBtn.waitFor({ state: 'visible', timeout: 10000 });
  581 |             await publishBtn.click({ force: true });
  582 |             await this.page.waitForTimeout(1000);
  583 | 
  584 |             // Confirm publish in modal dialog
  585 |             const dialog = this.page.locator('#modal, .MuiDialog-root, [role="dialog"]').first();
  586 |             const acceptBtn = dialog.getByRole('button', { name: /Publish|Publicar|Accept|Aceptar/i })
  587 |                 .or(this.page.locator('#modal-button-accept, #modal button.cbx-primary, #alert-confirm button'))
  588 |                 .first();
  589 |             if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  590 |                 await acceptBtn.click({ force: true });
  591 |             }
  592 | 
  593 |             await this.page.waitForLoadState('networkidle');
  594 |             await this.page.waitForTimeout(2000);
  595 |         });
  596 |     }
  597 | 
  598 |     async verifyNoConsentsAssociatedMessage() {
  599 |         await test.step('Verify message indicating no consents are associated with procedure', async () => {
  600 |             const emptyMessage = this.page.getByText(/The procedure does not require any associated consent|El procedimiento no requiere ningún consentimiento asociado/i).first();
  601 |             await expect(emptyMessage).toBeVisible({ timeout: 10000 });
  602 |         });
  603 |     }
  604 | 
  605 |     async openProcedureFromList(name: string) {
  606 |         await test.step(`Open procedure from list: "${name}"`, async () => {
  607 |             await this.navigateToProcedures();
  608 |             const searchInput = this.page.getByPlaceholder('Search for procedures').or(this.page.locator('input[placeholder*="Search" i]')).first();
  609 |             await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  610 |             await searchInput.fill(name);
  611 |             await this.page.waitForTimeout(1000);
  612 | 
  613 |             const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
  614 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  615 |             await row.click({ force: true });
  616 |             await this.page.waitForLoadState('networkidle');
  617 |             await this.page.waitForTimeout(1500);
  618 |         });
  619 |     }
  620 | 
  621 |     async clickConsentsTabInWizardOrEdit() {
  622 |         await test.step('Click Consents tab/step in wizard or procedure view', async () => {
  623 |             const consentsStep = this.page.locator('.cbx-stepper-item-text').filter({ hasText: /^Consents$|^Consentimientos$/i }).or(
  624 |                 this.page.locator('[role="tab"], .MuiTab-root').filter({ hasText: /^Consents$|^Consentimientos$/i })
  625 |             ).first();
  626 |             await consentsStep.waitFor({ state: 'visible', timeout: 10000 });
  627 |             await consentsStep.click({ force: true });
  628 |             await this.page.waitForTimeout(1000);
  629 |         });
  630 |     }
  631 | 
  632 |     async clickConfigurationTabInWizardOrEdit() {
  633 |         await test.step('Click Configuration tab/step in wizard or procedure view', async () => {
  634 |             const configStep = this.page.locator('.cbx-stepper-item-text').filter({ hasText: /^Configuration$|^Configuración$/i }).or(
  635 |                 this.page.locator('[role="tab"], .MuiTab-root, p, div').filter({ hasText: /^Configuration$|^Configuración$/i })
  636 |             ).first();
  637 |             await configStep.waitFor({ state: 'visible', timeout: 10000 });
  638 |             await configStep.click({ force: true });
  639 |             await this.page.waitForTimeout(1000);
  640 |             await this.generalHeading.waitFor({ state: 'visible', timeout: 15000 });
  641 |         });
  642 |     }
```