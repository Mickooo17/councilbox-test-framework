# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/users/usersTests.spec.ts >> Users - Details Page Tests >> On the user page, the appointments tab with appointments is displayed @XR-2967 @regression
- Location: tests/users/usersTests.spec.ts:526:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('table tbody tr').filter({ hasText: 'Ammar Mičijević' }).first() to be visible

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
    - generic [ref=e93]:
      - generic [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e98]:
            - generic [ref=e99]:
              - generic [ref=e104]:
                - combobox "Entities" [ref=e105]: All entities
                - generic [ref=e106]: Entities
                - button "Open options" [ref=e108] [cursor=pointer]
                - group [aria-hidden]
                - button "Botón" [ref=e109] [cursor=pointer]:
                  - generic [ref=e110]: 
              - generic [ref=e115]:
                - generic [ref=e116] [cursor=pointer]:
                  - generic [ref=e117]: All
                  - combobox "Roles": All
                  - generic [ref=e118]: Roles
                - group [aria-hidden]
              - generic [ref=e124]:
                - generic [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]: All
                  - combobox "Activity": All
                  - generic [ref=e127]: Activity
                - group [aria-hidden]
            - button "Botón" [ref=e130] [cursor=pointer]:
              - generic [ref=e131]: 
            - button "Export" [ref=e133] [cursor=pointer]:
              - generic [ref=e134]:
                - generic [ref=e136]: 
                - generic [ref=e138]: Export
          - generic [ref=e139]:
            - generic [ref=e143]:
              - button "Search" [ref=e145] [cursor=pointer]:
                - generic [ref=e146]: 
              - textbox "Search by participant or record" [active] [ref=e147]:
                - /placeholder: Search users
                - text: Ammar Mičijević
            - button "Calendar view" [ref=e148] [cursor=pointer]:
              - generic [ref=e149]: 
            - button "Help" [ref=e150] [cursor=pointer]:
              - generic [ref=e151]: 
        - generic [ref=e154]:
          - generic [ref=e157]:
            - generic [ref=e159]: There are no results for your search. Please, check your selection and try again.
            - generic "Add user" [ref=e160]:
              - button "Floating action button" [ref=e161] [cursor=pointer]:
                - generic [ref=e162]: 
          - generic [ref=e165]:
            - generic [ref=e166] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=e167] [cursor=pointer]: Privacy policy
      - generic [ref=e168]:
        - generic [ref=e170]: There are currently no users for the selected institution
        - button "Add" [ref=e172] [cursor=pointer]
      - generic [ref=e176]:
        - generic [ref=e177] [cursor=pointer]: Legal notice and Terms and conditions of use
        - generic [ref=e178] [cursor=pointer]: Privacy policy
      - generic [ref=e180]:
        - generic [ref=e181] [cursor=pointer]: 
        - generic [ref=e183]: 0 selected
```

# Test source

```ts
  502 |     }
  503 | 
  504 |     /**
  505 |      * Creates any user with specified role and permissions via GraphQL API.
  506 |      */
  507 |     async createUserViaApi(options: CreateUserApiOptions = {}): Promise<CreatedUserData> {
  508 |         return await test.step(`Create user (${options.role || 'professionalAdmin'}) via API`, async () => {
  509 |             return await UserApiHelper.createUser(this.page.request, options);
  510 |         });
  511 |     }
  512 | 
  513 |     /**
  514 |      * Deletes a user by ID via GraphQL API.
  515 |      */
  516 |     async deleteUserViaApi(userId: number | string): Promise<boolean> {
  517 |         return await test.step(`Delete user #${userId} via API`, async () => {
  518 |             return await UserApiHelper.deleteUser(this.page.request, userId);
  519 |         });
  520 |     }
  521 | 
  522 |     /**
  523 |      * Deletes user(s) by email via GraphQL API.
  524 |      */
  525 |     async deleteUserByEmailViaApi(email: string): Promise<boolean> {
  526 |         return await test.step(`Delete user by email "${email}" via API`, async () => {
  527 |             return await UserApiHelper.deleteUserByEmail(this.page.request, email);
  528 |         });
  529 |     }
  530 | 
  531 |     /**
  532 |      * Verifies that the External ID column header is displayed in the users table (XR-3032).
  533 |      */
  534 |     async verifyExternalIdHeaderDisplayed() {
  535 |         await test.step('Verify External ID header is displayed in the users table', async () => {
  536 |             const externalIdHeader = this.page.locator('table thead th').filter({ hasText: /External ID|ID externo/i }).first();
  537 |             await expect(externalIdHeader).toBeVisible({ timeout: 10000 });
  538 |         });
  539 |     }
  540 | 
  541 |     /**
  542 |      * Verifies that ratings in the users table are shown in the proper colour (XR-3060).
  543 |      */
  544 |     async verifyRatingColorsInTable() {
  545 |         await test.step('Verify ratings are showing in proper colour on the Users page', async () => {
  546 |             let ratingSpan = this.page.locator('table tbody tr span[style*="var(--success)"]').first();
  547 |             if (!await ratingSpan.isVisible({ timeout: 2000 }).catch(() => false)) {
  548 |                 await this.searchUser('Ammar');
  549 |                 ratingSpan = this.page.locator('table tbody tr span[style*="var(--success)"]').first();
  550 |             }
  551 |             await expect(ratingSpan).toBeVisible({ timeout: 10000 });
  552 |             const color = await ratingSpan.evaluate(el => window.getComputedStyle(el).color);
  553 |             expect(color).toBe('rgb(18, 136, 81)');
  554 |         });
  555 |     }
  556 | 
  557 |     /**
  558 |      * Opens the column sort dropdown in the first table header and selects Name or Surname (XR-2989, XR-2988).
  559 |      */
  560 |     async selectColumnSortOption(option: 'Name' | 'Surname') {
  561 |         await test.step(`Select sort option "${option}" from column header dropdown`, async () => {
  562 |             const dropdownIcon = this.page.locator('th .ri-arrow-up-down-line').first();
  563 |             await dropdownIcon.waitFor({ state: 'visible', timeout: 10000 });
  564 |             await dropdownIcon.click();
  565 |             await this.page.waitForTimeout(400);
  566 | 
  567 |             const pattern = option === 'Name' ? /Name|Nombre/i : /Surnames?|Apellidos?/i;
  568 |             const optionItem = this.page.locator('.cbx-dropdown-options li, .MuiMenu-paper li, ul[role="menu"] li').filter({ hasText: pattern }).first();
  569 |             await optionItem.waitFor({ state: 'visible', timeout: 5000 });
  570 |             await optionItem.click();
  571 |             await this.page.waitForTimeout(500);
  572 | 
  573 |             // Verify header text updated
  574 |             const header = this.page.locator('table thead th').first();
  575 |             await expect(header).toContainText(pattern, { timeout: 5000 });
  576 |         });
  577 |     }
  578 | 
  579 |     /**
  580 |      * Clicks the sort arrow in the first column header to sort table rows (XR-2989, XR-2988).
  581 |      */
  582 |     async clickSortArrowInFirstColumn() {
  583 |         await test.step('Click sort arrow in first column header', async () => {
  584 |             const sortArrow = this.page.locator('th:first-child .cbx-table-sort-label-arrow, th:first-child [class*="cbx-table-sort-label-arrow"]').first();
  585 |             await sortArrow.waitFor({ state: 'visible', timeout: 5000 });
  586 |             await sortArrow.click();
  587 |             await this.page.waitForTimeout(800);
  588 |             await expect(this.page.locator('table tbody tr').first()).toBeVisible({ timeout: 5000 });
  589 |         });
  590 |     }
  591 | 
  592 |     /**
  593 |      * Clicks on a user row in the table to open user details (XR-2967, XR-2999, XR-3000, XR-3001).
  594 |      */
  595 |     async clickUserRow(userName: string) {
  596 |         await test.step(`Click on user row: "${userName}"`, async () => {
  597 |             let row = this.page.locator('table tbody tr').filter({ hasText: userName }).first();
  598 |             if (!await row.isVisible({ timeout: 2000 }).catch(() => false)) {
  599 |                 await this.searchUser(userName);
  600 |                 row = this.page.locator('table tbody tr').filter({ hasText: userName }).first();
  601 |             }
> 602 |             await row.waitFor({ state: 'visible', timeout: 10000 });
      |                       ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  603 |             const cell = row.locator('td:first-child');
  604 |             await cell.click();
  605 |             await this.page.waitForURL(/\/users\/\d+\/edit/i, { timeout: 10000 });
  606 |         });
  607 |     }
  608 | 
  609 |     /**
  610 |      * Navigates to Appointments tab on user details page (XR-2967).
  611 |      */
  612 |     async clickAppointmentsTabOnUserDetails() {
  613 |         await test.step('Click Appointments tab on user details', async () => {
  614 |             const appointmentsTab = this.page.getByRole('button', { name: /APPOINTMENTS|CITAS/i }).or(this.page.locator('button').filter({ hasText: /APPOINTMENTS|CITAS/i })).first();
  615 |             await appointmentsTab.waitFor({ state: 'visible', timeout: 10000 });
  616 |             await appointmentsTab.click();
  617 |             await this.page.waitForURL(/\/appointments/i, { timeout: 10000 });
  618 |         });
  619 |     }
  620 | 
  621 |     /**
  622 |      * Verifies that the appointments table is displayed on user details page (XR-2967).
  623 |      */
  624 |     async verifyUserAppointmentsTableDisplayed() {
  625 |         await test.step('Verify user appointments table is displayed with records', async () => {
  626 |             const table = this.page.locator('table').first();
  627 |             await expect(table).toBeVisible({ timeout: 10000 });
  628 |             const headers = this.page.locator('table thead th');
  629 |             await expect(headers.first()).toBeVisible({ timeout: 5000 });
  630 |             const rows = this.page.locator('table tbody tr');
  631 |             await expect(rows.first()).toBeVisible({ timeout: 10000 });
  632 |             const rowCount = await rows.count();
  633 |             expect(rowCount).toBeGreaterThan(0);
  634 |         });
  635 |     }
  636 | 
  637 |     /**
  638 |      * Verifies that the Activity tab is displayed on user details page (XR-2999).
  639 |      */
  640 |     async verifyActivityTabDisplayed() {
  641 |         await test.step('Verify Activity tab is displayed on user details', async () => {
  642 |             const activityTab = this.page.getByRole('button', { name: /ACTIVITY|ACTIVIDAD/i }).or(this.page.locator('button').filter({ hasText: /ACTIVITY|ACTIVIDAD/i })).first();
  643 |             await expect(activityTab).toBeVisible({ timeout: 10000 });
  644 |         });
  645 |     }
  646 | 
  647 |     /**
  648 |      * Clicks the Activity tab on user details page (XR-3000, XR-3001).
  649 |      */
  650 |     async clickActivityTabOnUserDetails() {
  651 |         await test.step('Click Activity tab on user details', async () => {
  652 |             const activityTab = this.page.getByRole('button', { name: /ACTIVITY|ACTIVIDAD/i }).or(this.page.locator('button').filter({ hasText: /ACTIVITY|ACTIVIDAD/i })).first();
  653 |             await activityTab.waitFor({ state: 'visible', timeout: 10000 });
  654 |             await activityTab.click();
  655 |             await this.page.waitForURL(/\/activity/i, { timeout: 10000 });
  656 |         });
  657 |     }
  658 | 
  659 |     /**
  660 |      * Modifies month on Activity tab using < and > buttons (XR-3000).
  661 |      */
  662 |     async modifyMonthOnActivityTab() {
  663 |         await test.step('Modify month on Activity tab using < and > buttons', async () => {
  664 |             const leftArrow = this.page.locator('.ri-arrow-left-s-line').first();
  665 |             const rightArrow = this.page.locator('.ri-arrow-right-s-line').first();
  666 |             await leftArrow.waitFor({ state: 'visible', timeout: 10000 });
  667 |             await rightArrow.waitFor({ state: 'visible', timeout: 10000 });
  668 | 
  669 |             // Read container text that holds the month and year
  670 |             const getMonthText = async () => {
  671 |                 return await this.page.evaluate(() => {
  672 |                     const arrow = document.querySelector('.ri-arrow-left-s-line');
  673 |                     const container = arrow?.closest('div[style*="flex"]')?.parentElement;
  674 |                     return container?.innerText.replace(/\s+/g, ' ').trim() || '';
  675 |                 });
  676 |             };
  677 | 
  678 |             const initialMonth = await getMonthText();
  679 |             expect(initialMonth).toBeTruthy();
  680 | 
  681 |             // Click left arrow (<) to go to previous month
  682 |             await leftArrow.click();
  683 |             await this.page.waitForTimeout(500);
  684 |             const prevMonth = await getMonthText();
  685 |             expect(prevMonth).not.toBe(initialMonth);
  686 | 
  687 |             // Click right arrow (>) to return to original month
  688 |             await rightArrow.click();
  689 |             await this.page.waitForTimeout(500);
  690 |             const returnedMonth = await getMonthText();
  691 |             expect(returnedMonth).toBe(initialMonth);
  692 |         });
  693 |     }
  694 | 
  695 |     /**
  696 |      * Hovers over the charts on the Activity tab (XR-3001).
  697 |      */
  698 |     async hoverOverActivityChart() {
  699 |         await test.step('Hover over charts on Activity tab', async () => {
  700 |             const chart = this.page.locator('svg[viewBox="0 0 583 360"], svg:has(path[fill]), .recharts-surface').first();
  701 |             await chart.waitFor({ state: 'visible', timeout: 10000 });
  702 |             await chart.hover();
```