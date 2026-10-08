# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> Verify comment field in cancel appointment confirmation modal is required @XR-3445 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:152:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.cbx-Modal-content, [class*="Modal-content"]').filter({ hasText: /Cancel the appointment|Cancelar cita/i }).first().locator('input[maxlength="500"], textarea').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.cbx-Modal-content, [class*="Modal-content"]').filter({ hasText: /Cancel the appointment|Cancelar cita/i }).first().locator('input[maxlength="500"], textarea').first() with timeout 10000ms
  - waiting for locator('.cbx-Modal-content, [class*="Modal-content"]').filter({ hasText: /Cancel the appointment|Cancelar cita/i }).first().locator('input[maxlength="500"], textarea').first()

```

```yaml
- dialog "Cancel the appointment":
  - heading "Cancel the appointment" [level=1]
  - button "Cerrar"
  - paragraph: Are you sure want to cancel the requested appointment? In order to request an appointment, you need to restart the process.
  - paragraph: Once canceled, participants need to request a new appointment to complete the procedure and it cannot be recovered.
  - text: Unavailability
  - combobox "Campo de texto": Unavailability
  - paragraph:
    - text: Observations
    - superscript: "*"
  - textbox "Campo de texto":
    - /placeholder: ""
  - paragraph: 0/500
  - alert: Participants will receive a notice of cancellation, including observations.
  - button "Close"
  - button "Accept"
```

# Test source

```ts
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
  250 |       await expect(calendarItem).toBeVisible({ timeout: 15000 });
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
> 291 |       await expect(this.cancelObservationsInput).toBeVisible({ timeout: 10000 });
      |                                                  ^ Error: expect(locator).toBeVisible() failed
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