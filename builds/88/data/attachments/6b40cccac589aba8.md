# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> Verify that first and last name is displayed in calendar with procedure name - Calendar View @XR-3139 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:93:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.rbc-event, [class*="event"], [class*="calendar-event"], [class*="appointment-card"], [class*="fc-event"], [role="button"]').filter({ hasText: /Ammar Micijevic.*ALL in ONE|ALL in ONE.*Ammar Micijevic/i }).or(getByText(/Ammar Micijevic.*ALL in ONE|ALL in ONE.*Ammar Micijevic/i)).first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.rbc-event, [class*="event"], [class*="calendar-event"], [class*="appointment-card"], [class*="fc-event"], [role="button"]').filter({ hasText: /Ammar Micijevic.*ALL in ONE|ALL in ONE.*Ammar Micijevic/i }).or(getByText(/Ammar Micijevic.*ALL in ONE|ALL in ONE.*Ammar Micijevic/i)).first() with timeout 15000ms
  - waiting for locator('.rbc-event, [class*="event"], [class*="calendar-event"], [class*="appointment-card"], [class*="fc-event"], [role="button"]').filter({ hasText: /Ammar Micijevic.*ALL in ONE|ALL in ONE.*Ammar Micijevic/i }).or(getByText(/Ammar Micijevic.*ALL in ONE|ALL in ONE.*Ammar Micijevic/i)).first()

```

```yaml
- button ""
- link " Activity":
  - /url: /company/1112/auditorActivity
  - button " Activity"
- link " Appointments":
  - /url: /company/1112
  - button " Appointments"
- link " Processes":
  - /url: /company/1112/managements
  - button " Processes"
- img "CBX white Logo"
- text: © 2026 v8.7.0
- banner:
  - button "Logo QA DEV":
    - img "Logo QA DEV"
  - text: QA DEV
  - button "Botón":
    - button "Botón": 
  - button "Actions Button":
    - button "Actions Button":
      - img "Logo Virtual Citizen Service Office"
      - text: 
- tablist "Tabs":
  - tab "Botón" [selected]:
    - paragraph: Video-appointments
  - tab "Botón":
    - paragraph: In-person appointments
- text:  Calendar view
- combobox "Campo de texto": "[object Object]"
- button "Botón": 
- button "Botón": 
- textbox "Search by participant or record":
  - /placeholder: Search
- button "Help": 
- button "October 2026":
  - text: October 2026
  - img
- radio "Month"
- radio "Week"
- radio "Day" [checked]
- button "Previous page":
  - img
- button "Today"
- button "Next page":
  - img
- button "Monday, October 5, 2026" [pressed]
- button "Tuesday, October 6, 2026"
- button "Wednesday, October 7, 2026"
- button "Thursday, October 8, 2026"
- button "Friday, October 9, 2026"
- text: Legal notice and Terms and conditions of use PRIVACY_POLICY
```

# Test source

```ts
  150 | 
  151 |   async clickAppointmentStatus(identifier: string | number) {
  152 |     await test.step(`Click on Status section for appointment "${identifier}"`, async () => {
  153 |       const row = await this.getAppointmentRow(identifier);
  154 |       const statusCell = row.locator('td').filter({ hasText: /Cancel/i }).first();
  155 |       await statusCell.waitFor({ state: 'visible', timeout: 10000 });
  156 |       await statusCell.click();
  157 |       await this.page.waitForLoadState('networkidle');
  158 |       await this.page.waitForTimeout(1500);
  159 |       await this.dismissToastOrModal();
  160 |     }, {
  161 |       params: { identifier: String(identifier) },
  162 |       subtitle: 'Locate appointment row and click its status badge/cell',
  163 |     });
  164 |   }
  165 | 
  166 |   async verifyCanceledAppointmentDetailsWindow(expected?: CanceledAppointmentDetailsExpected) {
  167 |     await test.step('Verify Canceled Appointment Details window appears with correct information', async () => {
  168 |       await this.dismissToastOrModal();
  169 | 
  170 |       // Verify Appointment details header / window is visible
  171 |       await expect(this.appointmentDetailsHeader).toBeVisible({ timeout: 15000 });
  172 | 
  173 |       // Verify Canceled by section and label
  174 |       await expect(this.canceledBySection).toBeVisible({ timeout: 10000 });
  175 |       if (expected?.canceledBy) {
  176 |         await expect(this.page.getByText(expected.canceledBy).first()).toBeVisible({ timeout: 10000 });
  177 |       }
  178 | 
  179 |       // Verify Reason section and label
  180 |       await expect(this.reasonSection).toBeVisible({ timeout: 10000 });
  181 |       if (expected?.reason) {
  182 |         const reasonPattern = new RegExp(expected.reason, 'i');
  183 |         await expect(this.page.getByText(reasonPattern).first()).toBeVisible({ timeout: 10000 });
  184 |       }
  185 | 
  186 |       // Verify Observations section and comments if provided
  187 |       if (expected?.observations) {
  188 |         await expect(this.observationsSection).toBeVisible({ timeout: 10000 });
  189 |         await expect(this.page.getByText(expected.observations).first()).toBeVisible({ timeout: 10000 });
  190 |       }
  191 | 
  192 |       // Verify Participant details
  193 |       if (expected?.participantName) {
  194 |         await expect(this.page.getByText(expected.participantName).first()).toBeVisible({ timeout: 10000 });
  195 |       }
  196 |     }, {
  197 |       params: { expected },
  198 |       subtitle: 'Assert Details window heading, status, canceled by, reason, observations, and participants',
  199 |     });
  200 |   }
  201 | 
  202 |   async switchToCalendarView() {
  203 |     await test.step('Switch to Calendar view (Day view)', async () => {
  204 |       await this.dismissToastOrModal();
  205 |       
  206 |       const currentUrl = this.page.url();
  207 |       if (!currentUrl.includes('/appointments/one_on_one') && !currentUrl.includes('/appointments')) {
  208 |         await this.navigateToAppointmentsPage();
  209 |       }
  210 | 
  211 |       // Check if already in calendar view
  212 |       if (!await this.page.locator('.rbc-calendar, [class*="calendar"], [class*="rbc-"]').isVisible({ timeout: 2000 }).catch(() => false)) {
  213 |         // Click on "List view" text/element directly to open dropdown
  214 |         const listViewLabel = this.page.locator('text="List view"').or(this.page.getByText('List view', { exact: true })).first();
  215 |         await listViewLabel.waitFor({ state: 'visible', timeout: 10000 });
  216 |         await listViewLabel.click();
  217 |         await this.page.waitForTimeout(500);
  218 | 
  219 |         // Click Calendar view
  220 |         const calendarItem = this.page.locator('text="Calendar view"').or(this.page.getByRole('menuitem', { name: /Calendar view/i })).first();
  221 |         await calendarItem.waitFor({ state: 'visible', timeout: 5000 });
  222 |         await calendarItem.click();
  223 |         await this.page.waitForLoadState('networkidle');
  224 |         await this.page.waitForTimeout(1000);
  225 |       }
  226 | 
  227 |       // Switch to 'Day' view if available as described in XR-3139
  228 |       if (await this.dayViewRadio.isVisible({ timeout: 3000 }).catch(() => false)) {
  229 |         await this.dayViewRadio.click();
  230 |         await this.page.waitForLoadState('networkidle');
  231 |         await this.page.waitForTimeout(1000);
  232 |       }
  233 | 
  234 |       await this.dismissToastOrModal();
  235 |     }, {
  236 |       subtitle: 'Open view mode dropdown, select Calendar view, and switch to Day view',
  237 |     });
  238 |   }
  239 | 
  240 |   async verifyAppointmentInCalendarView(participantFullName: string, procedureName: string) {
  241 |     await test.step(`Verify appointment with participant "${participantFullName}" and procedure "${procedureName}" is displayed in Calendar view`, async () => {
  242 |       await this.dismissToastOrModal();
  243 |       // Format expected in Day view: "FIRSTNAME LASTNAME - PROCEDURE" or "PROCEDURE - FIRSTNAME LASTNAME"
  244 |       const expectedTextRegex = new RegExp(`${participantFullName}.*${procedureName}|${procedureName}.*${participantFullName}`, 'i');
  245 |       const calendarItem = this.page.locator('.rbc-event, [class*="event"], [class*="calendar-event"], [class*="appointment-card"], [class*="fc-event"], [role="button"]')
  246 |         .filter({ hasText: expectedTextRegex })
  247 |         .or(this.page.getByText(expectedTextRegex))
  248 |         .first();
  249 | 
> 250 |       await expect(calendarItem).toBeVisible({ timeout: 15000 });
      |                                  ^ Error: expect(locator).toBeVisible() failed
  251 |     }, {
  252 |       params: { participantFullName, procedureName },
  253 |       subtitle: 'Check that appointment entry contains both participant full name and procedure name in calendar',
  254 |     });
  255 |   }
  256 | 
  257 |   async openCancelAppointmentModal(identifier: string | number) {
  258 |     await test.step(`Open cancel appointment modal for #${identifier}`, async () => {
  259 |       await this.dismissToastOrModal();
  260 |       const row = await this.getAppointmentRow(identifier);
  261 |       const menuBtn = row.locator('#appointment-menu').or(
  262 |         row.locator('button:has(.ri-more-2-line), button:has-text(""), [id^="appointment-menu"]')
  263 |       ).first();
  264 |       await menuBtn.waitFor({ state: 'visible', timeout: 10000 });
  265 |       await menuBtn.click();
  266 |       await this.page.waitForTimeout(500);
  267 | 
  268 |       const cancelMenuItem = this.page.locator(`#appointment-cancel-action-${identifier}`).or(
  269 |         this.page.getByRole('button', { name: /Cancel the appointment|Cancelar cita/i })
  270 |       ).or(
  271 |         this.page.locator('button, li').filter({ hasText: /Cancel the appointment|Cancelar cita/i })
  272 |       ).first();
  273 |       await cancelMenuItem.waitFor({ state: 'visible', timeout: 10000 });
  274 |       await cancelMenuItem.click();
  275 |       await this.cancelModal.waitFor({ state: 'visible', timeout: 10000 });
  276 |     }, {
  277 |       params: { identifier: String(identifier) },
  278 |       subtitle: 'Click row actions menu and select "Cancel the appointment"',
  279 |     });
  280 |   }
  281 | 
  282 |   async verifyCancelModalObservationsRequired() {
  283 |     await test.step('Verify Observations field in cancel appointment modal is mandatory', async () => {
  284 |       // 1. Verify modal is visible
  285 |       await expect(this.cancelModal).toBeVisible({ timeout: 10000 });
  286 | 
  287 |       // 2. Verify Observations label has asterisk * indicating mandatory field
  288 |       await expect(this.cancelObservationsLabel).toBeVisible({ timeout: 10000 });
  289 | 
  290 |       // 3. Verify Observations input is visible
  291 |       await expect(this.cancelObservationsInput).toBeVisible({ timeout: 10000 });
  292 | 
  293 |       // 4. Click ACCEPT button while observations field is empty
  294 |       await this.cancelAcceptButton.click();
  295 |       await this.page.waitForTimeout(500);
  296 | 
  297 |       // 5. Verify validation error appears (Required / Este campo es obligatorio)
  298 |       await expect(this.cancelErrorHelperText).toBeVisible({ timeout: 5000 });
  299 |       await expect(this.cancelErrorHelperText).toHaveText(/Required|Obligatorio/i);
  300 | 
  301 |       // 6. Verify input has aria-invalid indicating error
  302 |       await expect(this.cancelObservationsInput).toHaveAttribute('aria-invalid', /Required|true/i);
  303 | 
  304 |       // 7. Verify modal is still visible (appointment is not canceled without observations)
  305 |       await expect(this.cancelModal).toBeVisible();
  306 |     }, {
  307 |       subtitle: 'Assert mandatory asterisk label, submit empty form, and verify "Required" validation error',
  308 |     });
  309 |   }
  310 | 
  311 |   async fillCancelObservationsAndConfirm(observationsText: string) {
  312 |     await test.step(`Fill cancel observations and confirm cancellation`, async () => {
  313 |       await this.cancelObservationsInput.fill(observationsText);
  314 |       await this.page.waitForTimeout(500);
  315 |       await this.cancelAcceptButton.click();
  316 |       await expect(this.cancelModal).toBeHidden({ timeout: 15000 });
  317 |     }, {
  318 |       params: { observationsText },
  319 |       subtitle: 'Enter observations text and click ACCEPT button',
  320 |     });
  321 |   }
  322 | 
  323 |   async closeCancelModal() {
  324 |     await test.step('Close cancel appointment modal', async () => {
  325 |       await this.cancelCloseButton.click();
  326 |       await expect(this.cancelModal).toBeHidden({ timeout: 10000 });
  327 |     }, {
  328 |       subtitle: 'Click CLOSE button to dismiss cancellation modal',
  329 |     });
  330 |   }
  331 | }
  332 | 
  333 | 
```