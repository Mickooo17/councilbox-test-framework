# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Table Columns & Administration Tests >> On the Institutions page, the administrator can define the minimum advance time for the organization/entity @XR-2697 @regression
- Location: tests/institutions/institutionsTests.spec.ts:107:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.MuiFormControl-root').filter({ hasText: /Minimum notice|Antelación mínima/i }).locator('input').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [aria-hidden] [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - button [ref=e5] [cursor=pointer]:
          - generic [ref=e6]: 
        - generic [ref=e10]:
          - link [ref=e12] [cursor=pointer]:
            - /url: /company/1112/activity/dashboardCouncils
            - button [ref=e13]:
              - generic [ref=e14]: 
              - generic [ref=e16]: Activity
          - link [ref=e18] [cursor=pointer]:
            - /url: /company/1112
            - button [ref=e19]:
              - generic [ref=e20]: 
              - generic [ref=e22]: Appointments
          - link [ref=e24] [cursor=pointer]:
            - /url: /company/1112/managements
            - button [ref=e25]:
              - generic [ref=e26]: 
              - generic [ref=e28]: Processes
          - link [ref=e30] [cursor=pointer]:
            - /url: /company/1112/procedures
            - button [ref=e31]:
              - generic [ref=e32]: 
              - generic [ref=e34]: Procedures
          - link [ref=e36] [cursor=pointer]:
            - /url: /company/1112/drafts
            - button [ref=e37]:
              - generic [ref=e38]: 
              - generic [ref=e40]: Templates
          - link [ref=e42] [cursor=pointer]:
            - /url: /company/1112/documentation
            - button [ref=e43]:
              - generic [ref=e44]: 
              - generic [ref=e46]: Documents
          - link [ref=e48] [cursor=pointer]:
            - /url: /company/1112/companies
            - button [ref=e49]:
              - generic [ref=e50]: 
              - generic [ref=e52]: Entities
          - link [ref=e54] [cursor=pointer]:
            - /url: /company/1112/users
            - button [ref=e55]:
              - generic [ref=e56]: 
              - generic [ref=e58]: Users
        - generic [ref=e59]: © 2026 v8.7.0
      - generic [ref=e64]:
        - banner [ref=e65]:
          - button [ref=e67] [cursor=pointer]
          - generic [ref=e69]: QA DEV
          - generic [ref=e75]:
            - button [ref=e78] [cursor=pointer]:
              - button [ref=e79]:
                - generic [ref=e80]: 
            - button [ref=e82] [cursor=pointer]:
              - button [ref=e84]:
                - generic [ref=e85]: 
        - generic [ref=e93]:
          - generic [ref=e95]:
            - generic [ref=e96]:
              - button [ref=e98] [cursor=pointer]:
                - generic [ref=e99]: 
              - heading [level=1] [ref=e104]: QA DEV
            - generic [ref=e105]:
              - button [ref=e106] [cursor=pointer]:
                - generic [ref=e107]: 
              - paragraph [ref=e112]: Organization
          - generic [ref=e113]:
            - generic [ref=e114]:
              - list [ref=e117]:
                - listitem [ref=e118]:
                  - button [ref=e119] [cursor=pointer]:
                    - generic [ref=e120]: General
                    - generic [ref=e121]: 
                - listitem [ref=e123]:
                  - button [ref=e124] [cursor=pointer]:
                    - generic [ref=e125]: Administration
                    - generic [ref=e126]: 
                - listitem [ref=e128]:
                  - button [ref=e129] [cursor=pointer]:
                    - generic [ref=e130]: Customization
                    - generic [ref=e131]: 
              - generic [ref=e136]:
                - tablist [ref=e140]:
                  - tab [ref=e141] [cursor=pointer]:
                    - paragraph [ref=e143]: Configuration
                  - tab [selected] [ref=e144] [cursor=pointer]:
                    - paragraph [ref=e146]: Agenda
                  - tab [ref=e147] [cursor=pointer]:
                    - paragraph [ref=e149]: Stations
                - generic [ref=e154]:
                  - button [ref=e157] [cursor=pointer]:
                    - button [ref=e158]:
                      - generic [ref=e159]: 
                  - generic [ref=e160]:
                    - button [ref=e161] [cursor=pointer]:
                      - generic [ref=e162]: Check appointments
                    - button [ref=e164] [cursor=pointer]:
                      - generic [ref=e165]: Check users
                    - button [ref=e168] [cursor=pointer]:
                      - generic [ref=e169]: 
                  - table [ref=e180]:
                    - rowgroup [ref=e181]:
                      - row [ref=e182]:
                        - columnheader [ref=e183]:
                          - generic [ref=e184]: Start
                          - button [ref=e185] [cursor=pointer]:
                            - generic [ref=e186]: Start
                            - generic [ref=e187]: 
                        - columnheader [ref=e189]:
                          - generic [ref=e190]: End
                          - button [ref=e191] [cursor=pointer]:
                            - generic [ref=e192]: End
                            - generic [ref=e193]: 
                        - columnheader [ref=e195]: Days
                        - columnheader [ref=e196]: From
                        - columnheader [ref=e197]: To
                        - columnheader [ref=e198]: Duration
                        - columnheader [ref=e199]: Concurrence
                        - columnheader [ref=e200]: Status
                        - columnheader [ref=e201]:
                          - generic [ref=e202]: Actions
                    - rowgroup [ref=e203]:
                      - row [ref=e204]:
                        - cell [ref=e205]:
                          - generic [ref=e206]:
                            - generic [ref=e207]: 
                            - generic [ref=e209]: 03/07/2024
                        - cell [ref=e210]: 31/05/2027
                        - cell [ref=e211]: Sun,Mon,Tue,Wed,Thu,Fri,Sat
                        - cell [ref=e212]: 09:00
                        - cell [ref=e213]: 23:30
                        - cell [ref=e214]: "15"
                        - cell [ref=e215]: "4"
                        - cell [ref=e216]:
                          - generic [ref=e217]:
                            - generic [ref=e218]: 
                            - generic [ref=e219]: Available
                        - cell [ref=e220]:
                          - button [ref=e221] [cursor=pointer]:
                            - generic [ref=e222]: 
                      - row [ref=e224]:
                        - cell [ref=e225]:
                          - generic [ref=e226]:
                            - generic [ref=e227]: 
                            - generic [ref=e229]: 15/01/2026
                        - cell [ref=e230]: "-"
                        - cell [ref=e231]: "-"
                        - cell [ref=e232]: "-"
                        - cell [ref=e233]: "-"
                        - cell [ref=e234]: "-"
                        - cell [ref=e235]: "-"
                        - cell [ref=e236]:
                          - generic [ref=e237]:
                            - generic [ref=e238]: 
                            - generic [ref=e239]: Exception
                        - cell [ref=e240]:
                          - button [ref=e241] [cursor=pointer]:
                            - generic [ref=e242]: 
                      - row [ref=e244]:
                        - cell [ref=e245]:
                          - generic [ref=e246]:
                            - generic [ref=e247]: 
                            - generic [ref=e249]: 12/03/2026
                        - cell [ref=e250]: "-"
                        - cell [ref=e251]: "-"
                        - cell [ref=e252]: "-"
                        - cell [ref=e253]: "-"
                        - cell [ref=e254]: "-"
                        - cell [ref=e255]: "-"
                        - cell [ref=e256]:
                          - generic [ref=e257]:
                            - generic [ref=e258]: 
                            - generic [ref=e259]: Exception
                        - cell [ref=e260]:
                          - button [ref=e261] [cursor=pointer]:
                            - generic [ref=e262]: 
                      - row [ref=e264]:
                        - cell [ref=e265]:
                          - generic [ref=e266]:
                            - generic [ref=e267]: 
                            - generic [ref=e269]: 09/04/2026
                        - cell [ref=e270]: "-"
                        - cell [ref=e271]: "-"
                        - cell [ref=e272]: "-"
                        - cell [ref=e273]: "-"
                        - cell [ref=e274]: "-"
                        - cell [ref=e275]: "-"
                        - cell [ref=e276]:
                          - generic [ref=e277]:
                            - generic [ref=e278]: 
                            - generic [ref=e279]: Exception
                        - cell [ref=e280]:
                          - button [ref=e281] [cursor=pointer]:
                            - generic [ref=e282]: 
            - generic [ref=e285]:
              - generic [ref=e286] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e287] [cursor=pointer]: PRIVACY_POLICY
    - generic [ref=e288]:
      - generic [ref=e292]:
        - generic [ref=e293]: New version OVAC 8.7
        - generic [ref=e294]:
          - generic [ref=e295]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
          - generic [ref=e296]: Review upgrades
      - button [ref=e302] [cursor=pointer]
  - dialog [ref=e306]:
    - generic [ref=e307]:
      - button "Close panel" [active] [ref=e309] [cursor=pointer]:
        - generic [aria-hidden] [ref=e310]: 
      - heading "Edit available period" [level=1] [ref=e312]
      - button "Save" [ref=e314] [cursor=pointer]
    - generic [ref=e318]:
      - generic [ref=e320] [cursor=pointer]:
        - checkbox "Set 24 hour schedule" [ref=e323]
        - generic [ref=e326]: Set 24 hour schedule
      - generic [ref=e329]:
        - generic [ref=e330]: Start date *
        - generic [ref=e331]:
          - textbox "Start date *" [ref=e332]:
            - /placeholder: MM/DD/YYYY
            - text: 07/03/2024
          - button "Choose date, selected date is Jul 3, 2024" [ref=e334] [cursor=pointer]
          - group [aria-hidden]:
            - generic: Start date *
      - generic [ref=e339]:
        - generic [ref=e340]: End date *
        - generic [ref=e341]:
          - textbox "End date *" [ref=e342]:
            - /placeholder: MM/DD/YYYY
            - text: 05/31/2027
          - button "Choose date, selected date is May 31, 2027" [ref=e344] [cursor=pointer]
          - group [aria-hidden]:
            - generic: End date *
      - generic [ref=e350]:
        - generic [ref=e351] [cursor=pointer]:
          - generic [ref=e352]: Sun, Mon, Tue, Wed, Thu, Fri, Sat
          - combobox "Days": Sun, Mon, Tue, Wed, Thu, Fri, Sat
          - generic [ref=e353]: Days
        - group [aria-hidden]
      - generic [ref=e359]:
        - generic [ref=e360]: From
        - generic [ref=e361]:
          - textbox "From" [ref=e362]:
            - /placeholder: hh:mm
            - text: 09:00
          - button "Choose time, selected time is 9:00 AM" [ref=e364] [cursor=pointer]
          - group [aria-hidden]:
            - generic: From
      - generic [ref=e371]:
        - generic [ref=e372]: To
        - generic [ref=e373]:
          - textbox "To" [ref=e374]:
            - /placeholder: hh:mm
            - text: 23:30
          - button "Choose time, selected time is 11:30 PM" [ref=e376] [cursor=pointer]
          - group [aria-hidden]:
            - generic: To
      - generic [ref=e381]:
        - generic [ref=e384]:
          - spinbutton "Duration of each time slot" [ref=e385]: "15"
          - generic [ref=e386]: Duration of each time slot
          - group [aria-hidden]
        - generic [ref=e389]: minutes
      - generic [ref=e392]:
        - generic [ref=e395]:
          - spinbutton "Minimum notice" [ref=e396]: "3"
          - generic [ref=e397]: Minimum notice
          - group [aria-hidden]
        - generic [ref=e400]: hours
      - generic [ref=e403]:
        - generic [ref=e406]:
          - spinbutton "Concurrence" [ref=e407]: "4"
          - generic [ref=e408]: Concurrence
          - group [aria-hidden]
        - generic [ref=e411]: appointments by time band
      - generic [ref=e414]:
        - generic [ref=e417]:
          - spinbutton "Maximum time for receiving reservations." [ref=e418]: "3"
          - generic [ref=e419]: Maximum time for receiving reservations.
          - group [aria-hidden]
        - generic [ref=e422]: weeks
```

# Test source

```ts
  221 |     async verifyInstitutionsTableFields() {
  222 |         await test.step('Verify Institutions table contains all required fields', async () => {
  223 |             await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  224 | 
  225 |             const headers = this.page.locator('table thead th');
  226 |             await expect(headers.filter({ hasText: /Name|Nombre/i })).toBeVisible({ timeout: 5000 });
  227 |             await expect(headers.filter({ hasText: /^Id$/i })).toBeVisible({ timeout: 5000 });
  228 |             await expect(headers.filter({ hasText: /External ID|ID externo/i })).toBeVisible({ timeout: 5000 });
  229 |             await expect(headers.filter({ hasText: /Level|Nivel/i })).toBeVisible({ timeout: 5000 });
  230 | 
  231 |             // Wait for rows to load from network
  232 |             const firstRow = this.page.locator('table tbody tr').first();
  233 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  234 |             const rowCount = await this.page.locator('table tbody tr').count();
  235 |             expect(rowCount).toBeGreaterThan(0);
  236 |         });
  237 |     }
  238 | 
  239 |     /**
  240 |      * Verifies that the Level column displays correct values (Entity / Organization) (XR-2303).
  241 |      */
  242 |     async verifyLevelColumnValues() {
  243 |         await test.step('Verify Level column displays correct values', async () => {
  244 |             // Wait for rows to load from network
  245 |             const firstRow = this.page.locator('table tbody tr').first();
  246 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  247 | 
  248 |             const levelCells = this.page.locator('table tbody tr td:nth-child(4)');
  249 |             const count = await levelCells.count();
  250 |             expect(count).toBeGreaterThan(0);
  251 | 
  252 |             const values: string[] = [];
  253 |             for (let i = 0; i < count; i++) {
  254 |                 const text = (await levelCells.nth(i).innerText()).trim();
  255 |                 values.push(text);
  256 |                 expect(text).toMatch(/^(Entity|Organization|Entidad|Organización)$/i);
  257 |             }
  258 | 
  259 |             expect(values.some(v => /Entity|Entidad/i.test(v))).toBe(true);
  260 |             expect(values.some(v => /Organization|Organización/i.test(v))).toBe(true);
  261 |         });
  262 |     }
  263 | 
  264 |     /**
  265 |      * Opens details/settings for a specific institution (XR-2697).
  266 |      */
  267 |     async openInstitutionDetails(name: string) {
  268 |         await test.step(`Open institution details for "${name}"`, async () => {
  269 |             let row = this.page.locator('table tbody tr').filter({ hasText: name }).first();
  270 |             if (!await row.isVisible({ timeout: 2000 }).catch(() => false)) {
  271 |                 await this.searchInstitution(name);
  272 |                 row = this.page.locator('table tbody tr').filter({ hasText: name }).first();
  273 |             }
  274 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  275 |             await row.locator('td:first-child').click();
  276 |             await this.page.waitForURL(/\/companies\/edit\/\d+/i, { timeout: 10000 });
  277 |         });
  278 |     }
  279 | 
  280 |     /**
  281 |      * Navigates to Administration -> Agenda tab (XR-2697).
  282 |      */
  283 |     async navigateToAdministrationAgenda() {
  284 |         await test.step('Navigate to Administration -> Agenda tab', async () => {
  285 |             const adminTab = this.page.getByRole('button', { name: /Administration|Administración/i }).first();
  286 |             await adminTab.waitFor({ state: 'visible', timeout: 10000 });
  287 |             await adminTab.click();
  288 |             await this.page.waitForTimeout(500);
  289 | 
  290 |             const agendaTab = this.page.locator('button').filter({ hasText: /Agenda/i }).first();
  291 |             await agendaTab.waitFor({ state: 'visible', timeout: 5000 });
  292 |             await agendaTab.click();
  293 |             await this.page.waitForURL(/\/administration\/schedule/i, { timeout: 10000 });
  294 |         });
  295 |     }
  296 | 
  297 |     /**
  298 |      * Opens the edit drawer for the first available schedule period (XR-2697).
  299 |      */
  300 |     async openEditSchedulePeriod() {
  301 |         await test.step('Open edit schedule period drawer', async () => {
  302 |             const firstRow = this.page.locator('table tbody tr').first();
  303 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  304 |             const threeDotsBtn = firstRow.locator('td:last-child button').first();
  305 |             await threeDotsBtn.click();
  306 |             await this.page.waitForTimeout(400);
  307 | 
  308 |             const editOption = this.page.locator('#schedule_edit_button, [role="menuitem"]:has-text("Edit"), [role="button"]:has-text("Edit")').first();
  309 |             await editOption.waitFor({ state: 'visible', timeout: 5000 });
  310 |             await editOption.click();
  311 |             await this.page.waitForTimeout(600);
  312 |         });
  313 |     }
  314 | 
  315 |     /**
  316 |      * Sets the Minimum notice (advance time) in the schedule period edit drawer (XR-2697).
  317 |      */
  318 |     async setMinimumAdvanceNotice(value: string | number) {
  319 |         await test.step(`Set minimum advance notice to ${value}`, async () => {
  320 |             const noticeInput = this.page.locator('.MuiFormControl-root').filter({ hasText: /Minimum notice|Antelación mínima/i }).locator('input').first();
> 321 |             await noticeInput.waitFor({ state: 'visible', timeout: 10000 });
      |                               ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  322 |             await noticeInput.clear();
  323 |             await noticeInput.fill(value.toString());
  324 |         });
  325 |     }
  326 | 
  327 |     /**
  328 |      * Saves the schedule period adjustments (XR-2697).
  329 |      */
  330 |     async saveSchedulePeriod() {
  331 |         await test.step('Save schedule period adjustments', async () => {
  332 |             const saveBtn = this.page.locator('#panel-confirm-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")').first();
  333 |             await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
  334 |             await saveBtn.click();
  335 |             await this.page.waitForTimeout(1000);
  336 |             await this.dismissToastOrModal();
  337 |         });
  338 |     }
  339 | }
  340 | 
  341 | 
```