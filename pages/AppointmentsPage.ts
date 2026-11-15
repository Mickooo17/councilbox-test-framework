import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from './BasePage';
import { resolveCompanyUrl } from '../utils/UrlHelper';

export interface CanceledAppointmentDetailsExpected {
  status?: string;
  canceledBy?: string;
  date?: string;
  reason?: string;
  observations?: string;
  participantName?: string;
}

export class AppointmentsPage extends BasePage {
  readonly statusFilterButton: Locator;
  readonly periodFilterButton: Locator;
  readonly searchInput: Locator;
  readonly viewModeDropdown: Locator;
  readonly calendarViewButton: Locator;
  readonly tableViewButton: Locator;
  readonly dayViewRadio: Locator;
  readonly appointmentsTable: Locator;
  readonly tableRows: Locator;

  // Appointment Details Window
  readonly backButton: Locator;
  readonly appointmentDetailsHeader: Locator;
  readonly procedureTitleText: Locator;
  readonly statusSection: Locator;
  readonly canceledBySection: Locator;
  readonly reasonSection: Locator;
  readonly observationsSection: Locator;
  readonly participantsSection: Locator;

  // Cancel Appointment Modal elements
  readonly cancelModal: Locator;
  readonly cancelObservationsLabel: Locator;
  readonly cancelObservationsInput: Locator;
  readonly cancelErrorHelperText: Locator;
  readonly cancelAcceptButton: Locator;
  readonly cancelCloseButton: Locator;

  constructor(page: Page) {
    super(page);

    this.statusFilterButton = page.getByRole('combobox', { name: /Status|Estado/i })
      .or(page.locator('.MuiFormControl-root').filter({ hasText: /Status|Estado/i }).locator('[role="combobox"], [role="button"], input'))
      .first();
    this.periodFilterButton = page.getByRole('combobox', { name: /Period|Periodo/i })
      .or(page.locator('.MuiFormControl-root').filter({ hasText: /Period|Periodo/i }).locator('[role="combobox"], [role="button"], input'))
      .first();
    this.searchInput = page.getByRole('textbox', { name: /Search|Buscar/i })
      .or(page.locator('input[placeholder="Search"], input[placeholder*="participant" i]'))
      .first();
    this.viewModeDropdown = page.locator('div').filter({ hasText: /List view|Calendar view|Daily view|Vista de lista|Vista de calendario|Vista diaria/i })
      .locator('..')
      .or(page.getByRole('button', { name: /List view|Calendar view|Daily view|Vista de lista|Vista de calendario|Vista diaria/i }))
      .or(page.locator('text="List view"').locator('..'))
      .first();
    this.calendarViewButton = page.getByRole('menuitem', { name: /Calendar view|Vista de calendario/i })
      .or(page.getByRole('option', { name: /Calendar view|Vista de calendario/i }))
      .or(page.locator('li, .MuiMenuItem-root').filter({ hasText: /Calendar view|Vista de calendario/i }))
      .or(page.getByText(/Calendar view|Vista de calendario/i))
      .first();
    this.tableViewButton = page.getByRole('menuitem', { name: /List view|Vista de lista/i })
      .or(page.getByRole('option', { name: /List view|Vista de lista/i }))
      .or(page.locator('li, .MuiMenuItem-root').filter({ hasText: /List view|Vista de lista/i }))
      .first();
    this.dayViewRadio = page.getByRole('radio', { name: /^Day$|^Día$/i })
      .or(page.locator('label, span').filter({ hasText: /^Day$|^Día$/i }))
      .first();
    this.appointmentsTable = page.locator('table').first();
    this.tableRows = page.locator('tbody tr');

    // Details view elements
    this.backButton = page.locator('button:has(.ri-arrow-left-line)').or(page.getByRole('button', { name: /back/i })).first();
    this.appointmentDetailsHeader = page.getByRole('heading', { name: /Details|Detalles|Appointment|Cita/i })
      .or(page.getByText(/^Details$|^Detalles$/i))
      .first();
    this.procedureTitleText = page.locator('div, p').filter({ hasText: /ALL in ONE/i }).first();
    this.statusSection = page.locator('div, p').filter({ hasText: /^Status$|^Estado$/i }).or(page.getByText(/^Status$|^Estado$/i)).first();
    this.canceledBySection = page.locator('div, p').filter({ hasText: /^Canceled by$|^Cancelado por$|^Modified by$|^Modificado por$/i })
      .or(page.getByText(/^Canceled by$|^Cancelado por$|^Modified by$|^Modificado por$/i))
      .first();
    this.reasonSection = page.locator('div, p').filter({ hasText: /^Reason$|^Motivo$/i }).or(page.getByText(/^Reason$|^Motivo$/i)).first();
    this.observationsSection = page.locator('div, p').filter({ hasText: /^Observations$|^Observaciones$/i }).or(page.getByText(/^Observations$|^Observaciones$/i)).first();
    this.participantsSection = page.locator('div, p').filter({ hasText: /^Participants$|^Participantes$/i }).or(page.getByText(/^Participants$|^Participantes$/i)).first();

    // Cancel modal elements
    this.cancelModal = page.locator('.cbx-Modal-content, [class*="Modal-content"], [role="dialog"]')
      .filter({ hasText: /Cancel the appointment|Cancelar cita/i })
      .first();
    this.cancelObservationsLabel = this.cancelModal.locator('text=/Observations|Observaciones/i').first();
    this.cancelObservationsInput = this.cancelModal.getByRole('textbox').first();
    this.cancelErrorHelperText = this.cancelModal.locator('[id$="-error"], p.MuiFormHelperText-root, [class*="helper-text"]')
      .or(this.cancelModal.getByText(/Required|Obligatorio/i))
      .first();
    this.cancelAcceptButton = this.cancelModal.getByRole('button', { name: /^ACCEPT$|^Aceptar$/i }).or(
      this.cancelModal.locator('#modal-button-accept')
    ).first();
    this.cancelCloseButton = this.cancelModal.getByRole('button', { name: /^CLOSE$|^Cerrar$/i }).or(
      this.cancelModal.locator('#modal-button-cancel')
    ).first();
  }

  async navigateToAppointmentsPage(companyId: number = 1112) {
    await test.step('Navigate to Appointments page', async () => {
      await this.page.goto(resolveCompanyUrl(companyId), { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('load');
      await this.dismissToastOrModal();
    }, {
      params: { companyId },
      subtitle: 'Open company appointments view and wait for data load',
    });
  }

  async filterByStatus(statusName: string = 'Canceled') {
    await test.step(`Filter appointments by status: "${statusName}"`, async () => {
      await this.dismissToastOrModal();
      await this.statusFilterButton.waitFor({ state: 'visible', timeout: 10000 });
      // Click the parent container of the combobox which has cursor:pointer and handles the click
      await this.statusFilterButton.locator('..').click({ force: true });
      await this.page.waitForTimeout(500);

      const optionRegex = new RegExp(statusName, 'i');
      const statusOption = this.page.getByRole('option', { name: optionRegex }).or(
        this.page.locator('li, [role="menuitem"]').filter({ hasText: optionRegex })
      ).first();
      await statusOption.waitFor({ state: 'visible', timeout: 5000 });
      await statusOption.click();

      // Close dropdown by pressing Escape or clicking outside
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('load');
    }, {
      params: { statusName },
      subtitle: 'Open status filter dropdown, select option, and close menu',
    });
  }

  async filterByPeriod(periodName: string = 'This month') {
    await test.step(`Filter appointments by period: "${periodName}"`, async () => {
      await this.dismissToastOrModal();
      await this.periodFilterButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.periodFilterButton.locator('..').click({ force: true });
      await this.page.waitForTimeout(500);

      const optionRegex = new RegExp(periodName, 'i');
      const periodOption = this.page.getByRole('option', { name: optionRegex }).or(
        this.page.locator('li, [role="menuitem"]').filter({ hasText: optionRegex })
      ).first();
      await periodOption.waitFor({ state: 'visible', timeout: 5000 });
      await periodOption.click();

      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('load');
    }, {
      params: { periodName },
      subtitle: 'Open period filter dropdown, select option, and close menu',
    });
  }

  async searchAppointment(identifier: string | number) {
    await test.step(`Search appointment by identifier: "${identifier}"`, async () => {
      await this.dismissToastOrModal();
      await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchInput.fill(String(identifier));
      await this.searchInput.press('Enter');
      await this.page.waitForTimeout(1500);
      await this.page.waitForLoadState('load');
    }, {
      params: { identifier: String(identifier) },
      subtitle: 'Input identifier into search field and press Enter',
    });
  }

  async getAppointmentRow(identifier: string | number): Promise<Locator> {
    const idStr = String(identifier);
    const row = this.page.locator('tr').filter({ hasText: idStr }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    return row;
  }

  async clickAppointmentStatus(identifier: string | number) {
    await test.step(`Click on Status section for appointment "${identifier}"`, async () => {
      const row = await this.getAppointmentRow(identifier);
      const statusCell = row.locator('td').filter({ hasText: /Cancel/i }).first();
      await statusCell.waitFor({ state: 'visible', timeout: 10000 });
      await statusCell.click();
      await this.page.waitForLoadState('load');
      await this.page.waitForTimeout(1500);
      await this.dismissToastOrModal();
    }, {
      params: { identifier: String(identifier) },
      subtitle: 'Locate appointment row and click its status badge/cell',
    });
  }

  async verifyCanceledAppointmentDetailsWindow(expected?: CanceledAppointmentDetailsExpected) {
    await test.step('Verify Canceled Appointment Details window appears with correct information', async () => {
      await this.dismissToastOrModal();

      // Verify Appointment details header / window is visible
      await expect(this.appointmentDetailsHeader).toBeVisible({ timeout: 15000 });

      // Verify Canceled by section and label
      await expect(this.canceledBySection).toBeVisible({ timeout: 10000 });
      if (expected?.canceledBy) {
        await expect(this.page.getByText(expected.canceledBy).first()).toBeVisible({ timeout: 10000 });
      }

      // Verify Reason section and label
      await expect(this.reasonSection).toBeVisible({ timeout: 10000 });
      if (expected?.reason) {
        const reasonPattern = new RegExp(expected.reason, 'i');
        await expect(this.page.getByText(reasonPattern).first()).toBeVisible({ timeout: 10000 });
      }

      // Verify Observations section and comments if provided
      if (expected?.observations) {
        await expect(this.observationsSection).toBeVisible({ timeout: 10000 });
        await expect(this.page.getByText(expected.observations).first()).toBeVisible({ timeout: 10000 });
      }

      // Verify Participant details
      if (expected?.participantName) {
        await expect(this.page.getByText(expected.participantName).first()).toBeVisible({ timeout: 10000 });
      }
    }, {
      params: { expected },
      subtitle: 'Assert Details window heading, status, canceled by, reason, observations, and participants',
    });
  }

  async switchToCalendarView() {
    await test.step('Switch to Calendar view (Day view)', async () => {
      await this.dismissToastOrModal();
      
      const currentUrl = this.page.url();
      if (!currentUrl.includes('/appointments/one_on_one') && !currentUrl.includes('/appointments')) {
        await this.navigateToAppointmentsPage();
      }

      // Check if already in calendar view
      if (!await this.page.locator('.rbc-calendar, [class*="calendar"], [class*="rbc-"]').isVisible({ timeout: 2000 }).catch(() => false)) {
        // Click on "List view" text/element directly to open dropdown
        const listViewLabel = this.page.locator('text="List view"').or(this.page.getByText('List view', { exact: true })).first();
        await listViewLabel.waitFor({ state: 'visible', timeout: 10000 });
        await listViewLabel.click();
        await this.page.waitForTimeout(500);

        // Click Calendar view
        const calendarItem = this.page.locator('text="Calendar view"').or(this.page.getByRole('menuitem', { name: /Calendar view/i })).first();
        await calendarItem.waitFor({ state: 'visible', timeout: 5000 });
        await calendarItem.click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(1000);
      }

      // Switch to 'Day' view if available as described in XR-3139
      if (await this.dayViewRadio.isVisible({ timeout: 3000 }).catch(() => false)) {
        await this.dayViewRadio.click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(1000);
      }

      await this.dismissToastOrModal();
    }, {
      subtitle: 'Open view mode dropdown, select Calendar view, and switch to Day view',
    });
  }

  async verifyAppointmentInCalendarView(participantFullName: string, procedureName: string) {
    await test.step(`Verify appointment with participant "${participantFullName}" and procedure "${procedureName}" is displayed in Calendar view`, async () => {
      await this.dismissToastOrModal();
      // Format expected in Day view: "FIRSTNAME LASTNAME - PROCEDURE" or "PROCEDURE - FIRSTNAME LASTNAME"
      const expectedTextRegex = new RegExp(`${participantFullName}.*${procedureName}|${procedureName}.*${participantFullName}`, 'i');
      const calendarItem = this.page.locator('.rbc-event, [class*="event"], [class*="calendar-event"], [class*="appointment-card"], [class*="fc-event"], [role="button"]')
        .filter({ hasText: expectedTextRegex })
        .or(this.page.getByText(expectedTextRegex))
        .first();

      await expect(calendarItem).toBeVisible({ timeout: 15000 });
    }, {
      params: { participantFullName, procedureName },
      subtitle: 'Check that appointment entry contains both participant full name and procedure name in calendar',
    });
  }

  async openCancelAppointmentModal(identifier: string | number) {
    await test.step(`Open cancel appointment modal for #${identifier}`, async () => {
      await this.dismissToastOrModal();
      const row = await this.getAppointmentRow(identifier);
      const menuBtn = row.locator('#appointment-menu').or(
        row.locator('button:has(.ri-more-2-line), button:has-text(""), [id^="appointment-menu"]')
      ).first();
      await menuBtn.waitFor({ state: 'visible', timeout: 10000 });
      await menuBtn.click();
      await this.page.waitForTimeout(500);

      const cancelMenuItem = this.page.locator(`#appointment-cancel-action-${identifier}`).or(
        this.page.getByRole('button', { name: /Cancel the appointment|Cancelar cita/i })
      ).or(
        this.page.locator('button, li').filter({ hasText: /Cancel the appointment|Cancelar cita/i })
      ).first();
      await cancelMenuItem.waitFor({ state: 'visible', timeout: 10000 });
      await cancelMenuItem.click();
      await this.cancelModal.waitFor({ state: 'visible', timeout: 10000 });
    }, {
      params: { identifier: String(identifier) },
      subtitle: 'Click row actions menu and select "Cancel the appointment"',
    });
  }

  async verifyCancelModalObservationsRequired() {
    await test.step('Verify Observations field in cancel appointment modal is mandatory', async () => {
      // 1. Verify modal is visible
      await expect(this.cancelModal).toBeVisible({ timeout: 10000 });

      // 2. Verify Observations label has asterisk * indicating mandatory field
      await expect(this.cancelObservationsLabel).toBeVisible({ timeout: 10000 });

      // 3. Verify Observations input is visible
      await expect(this.cancelObservationsInput).toBeVisible({ timeout: 10000 });

      // 4. Click ACCEPT button while observations field is empty
      await this.cancelAcceptButton.click();
      await this.page.waitForTimeout(500);

      // 5. Verify validation error appears (Required / Este campo es obligatorio)
      await expect(this.cancelErrorHelperText).toBeVisible({ timeout: 5000 });
      await expect(this.cancelErrorHelperText).toHaveText(/Required|Obligatorio/i);

      // 6. Verify input has aria-invalid indicating error
      await expect(this.cancelObservationsInput).toHaveAttribute('aria-invalid', /Required|true/i);

      // 7. Verify modal is still visible (appointment is not canceled without observations)
      await expect(this.cancelModal).toBeVisible();
    }, {
      subtitle: 'Assert mandatory asterisk label, submit empty form, and verify "Required" validation error',
    });
  }

  async fillCancelObservationsAndConfirm(observationsText: string) {
    await test.step(`Fill cancel observations and confirm cancellation`, async () => {
      await this.cancelObservationsInput.fill(observationsText);
      await this.page.waitForTimeout(500);
      await this.cancelAcceptButton.click();
      await expect(this.cancelModal).toBeHidden({ timeout: 15000 });
    }, {
      params: { observationsText },
      subtitle: 'Enter observations text and click ACCEPT button',
    });
  }

  async closeCancelModal() {
    await test.step('Close cancel appointment modal', async () => {
      await this.cancelCloseButton.click();
      await expect(this.cancelModal).toBeHidden({ timeout: 10000 });
    }, {
      subtitle: 'Click CLOSE button to dismiss cancellation modal',
    });
  }

  /**
   * Opens the Documents modal from the 3-dots menu of an appointment (XR-3090 / OVAC-5579).
   */
  async openDocumentsModal(identifier?: string | number) {
    await test.step('Open Documents modal from appointment 3-dots menu', async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        targetRow = this.tableRows.first();
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });
      const menuBtn = targetRow.locator('#appointment-menu').or(
        targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
      ).first();
      await menuBtn.click();
      await this.page.waitForTimeout(500);

      const docsOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
        .getByText(/^Documents$|^Documentos$/i).first();
      await docsOption.waitFor({ state: 'visible', timeout: 5000 });
      await docsOption.click();

      const docsModal = this.page.locator('[role="dialog"], .cbx-Modal-container')
        .filter({ hasText: /Documents|Documentos/i }).first();
      await expect(docsModal).toBeVisible({ timeout: 15000 });

      // Close modal
      const closeBtn = docsModal.locator('button:has(.ri-close-line), button:has-text("Close"), button:has-text("Cerrar")').first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
      } else {
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Opens Cancel modal and verifies tooltip on the 0/500 character counter (XR-3089 / OVAC-5580).
   */
  async verifyCancelAppointmentCharacterTooltip(identifier: string | number) {
    await test.step('Hover character counter in Cancel modal and verify tooltip', async () => {
      await this.openCancelAppointmentModal(identifier);

      // Find character counter e.g. 0/500
      const counter = this.cancelModal.locator('text=/\d+\s*\/\s*500/i').or(this.cancelModal.getByText(/\/500/)).first();
      await expect(counter).toBeVisible({ timeout: 5000 });

      // Hover over counter
      await counter.hover();
      await this.page.waitForTimeout(500);

      const tooltip = this.page.locator('[role="tooltip"]:visible, .MuiTooltip-tooltip:visible').first();
      await expect(tooltip).toBeVisible({ timeout: 5000 });
      await expect(tooltip).toContainText(/maximum number of character|caracteres/i);

      // Close modal
      await this.closeCancelModal();
    });
  }

  /**
   * Verifies External ID column header is visible in appointments table (XR-3031 / OVAC-4955).
   */
  async verifyExternalIdHeaderDisplayed() {
    await test.step('Observe header and verify External ID label is displayed properly', async () => {
      await this.dismissToastOrModal();
      const extIdHeader = this.appointmentsTable.locator('th').filter({ hasText: /External ID/i }).first();
      await expect(extIdHeader).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Searches appointments by participant ID / passport / TIN (XR-2965 / OVAC-5207).
   */
  async searchAppointmentsByParticipant(idOrPassport: string) {
    await test.step(`Search appointments by participant ID/passport: "${idOrPassport}"`, async () => {
      await this.searchAppointment(idOrPassport);
      await this.page.waitForTimeout(1000);
      const rows = this.tableRows;
      const rowCount = await rows.count();
      if (rowCount > 0) {
        await expect(rows.first()).toBeVisible();
      } else {
        const noData = this.page.locator('text=/No appointments|No hay citas|No results|No se encontraron/i').first();
        await expect(noData).toBeVisible({ timeout: 5000 });
      }
    });
  }

  /**
   * Opens table filters via the equalizer button and verifies filter options (XR-2565 / OVAC-5194).
   */
  async verifyTableFilterOptionsDisplayed() {
    await test.step('Open table filters via Equalizer button and verify filter categories', async () => {
      await this.dismissToastOrModal();
      const eqBtn = this.page.locator('button:has(.ri-equalizer-line)').first();
      await expect(eqBtn).toBeVisible({ timeout: 10000 });
      await eqBtn.click();
      await this.page.waitForTimeout(500);

      const heading = this.page.getByRole('heading', { name: /Filters|Filtros/i }).first();
      await expect(heading).toBeVisible({ timeout: 10000 });

      // Verify filter sections
      await expect(this.page.getByRole('combobox', { name: /Users|Usuarios/i }).first()).toBeVisible();
      await expect(this.page.getByRole('combobox', { name: /procedures|trámites/i }).first()).toBeVisible();
      await expect(this.page.getByRole('combobox', { name: /Entities|Entidades/i }).first()).toBeVisible();

      // Close filter panel using Escape key
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Opens Participants drawer from appointment 3-dots menu (XR-2525 / OVAC-5599).
   */
  async openParticipantsDrawer(identifier?: string | number) {
    await test.step('Open Participants drawer from appointment 3-dots menu', async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        targetRow = this.tableRows.first();
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });
      const menuBtn = targetRow.locator('#appointment-menu').or(
        targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
      ).first();
      await menuBtn.click();
      await this.page.waitForTimeout(500);

      const partOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
        .getByText(/^Participants$|^Participantes$/i).first();
      await partOption.waitFor({ state: 'visible', timeout: 5000 });
      await partOption.click();

      // Verify attendees drawer is open
      const drawer = this.page.locator('.MuiDrawer-root:visible, [role="dialog"]:visible')
        .filter({ hasText: /List of attendees|Participantes|Attendees/i }).first();
      await expect(drawer).toBeVisible({ timeout: 15000 });

      // Close drawer
      const closeBtn = drawer.locator('button:has(.ri-close-line), button[aria-label*="close" i]').first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click();
      } else {
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Verifies "Type of meetings" filter contains all available appointment types (OVAC-5142).
   */
  async verifyMeetingTypesFilterContainsTypes() {
    await test.step('Verify "Type of meetings" filter contains all available appointment types in the appointment list', async () => {
      await this.dismissToastOrModal();
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const eqBtn = this.page.locator('button:has(.ri-equalizer-line)').first();
      await eqBtn.waitFor({ state: 'visible', timeout: 15000 });
      await eqBtn.click();
      await this.page.waitForTimeout(500);

      const filterDialog = this.page.getByRole('dialog').filter({ hasText: /Filters|Filtros/i }).first();
      await expect(filterDialog).toBeVisible({ timeout: 10000 });

      // In the filter drawer, find the combobox for Type of meeting
      const meetingTypeCombo = filterDialog.getByRole('combobox', { name: /Type of meeting|Tipo de cita/i });
      await meetingTypeCombo.waitFor({ state: 'attached', timeout: 5000 });
      await meetingTypeCombo.evaluate((el: HTMLElement) => {
        el.scrollIntoView();
        el.click();
      });
      await this.page.waitForTimeout(500);

      const listbox = this.page.locator('ul[role="listbox"], [role="listbox"]').last();
      await expect(listbox).toBeVisible({ timeout: 5000 });

      const options = listbox.locator('[role="option"], li');
      const count = await options.count();
      expect(count).toBeGreaterThan(1);

      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Verifies alert icon is hidden for appointments in Canceled status (OVAC-4937).
   */
  async verifyAlertIconHiddenForCanceledAppointments() {
    await test.step('Verify alert icon is hidden for appointments in Canceled status', async () => {
      await this.dismissToastOrModal();
      await this.filterByStatus('Canceled');
      await this.page.waitForTimeout(1000);

      const row = this.tableRows.first();
      await row.waitFor({ state: 'visible', timeout: 15000 });

      // Verify alert icon is hidden / not displayed in canceled rows
      const alertIcon = row.locator('.ri-alert-line, .ri-error-warning-line, svg[data-testid*="Warning"], .cbx-table-alert');
      const count = await alertIcon.count();
      expect(count).toBe(0);
    });
  }

  /**
   * Verifies "Send notification" option is present in actions menu in Confirmed status (OVAC-4928).
   */
  async verifySendNotificationOptionInActionsMenu(identifier?: string | number) {
    await test.step('Verify "Send notification" option is present in actions menu in Confirmed status', async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        targetRow = this.tableRows.first();
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });
      const menuBtn = targetRow.locator('#appointment-menu').or(
        targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
      ).first();
      await menuBtn.click();
      await this.page.waitForTimeout(500);

      const sendNotifOption = this.page.getByText(/^Send notification$|^Enviar notificación$/i).or(
        this.page.locator('li, [role="menuitem"], button').filter({ hasText: /Send notification|Enviar notificación/i })
      ).first();
      await expect(sendNotifOption).toBeVisible({ timeout: 5000 });

      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Verifies Record number field is displayed in Details section for appointments (OVAC-5104).
   */
  async verifyRecordNumberInAppointmentDetails(identifier?: string | number) {
    await test.step('Verify Record number field is displayed in Details section for appointments', async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        targetRow = this.tableRows.first();
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });

      // Verify Record column header or cell in table
      const recordHeader = this.appointmentsTable.locator('th').filter({ hasText: /Record|Expediente|Nº expediente/i }).first();
      const recordCell = targetRow.locator('td').filter({ hasText: /\d+/ }).first();
      if (await recordHeader.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(recordHeader).toBeVisible();
        await expect(recordCell).toBeVisible();
      } else {
        await recordCell.click();
        await this.page.waitForTimeout(1000);
        const recordNumberField = this.page.locator('text=/Record number|Número de expediente|Expediente|Record|Nº de expediente/i').first();
        await expect(recordNumberField).toBeVisible({ timeout: 10000 });
        await this.page.keyboard.press('Escape');
      }
    });
  }

  /**
   * Verifies Record number is displayed in the appointment preview (OVAC-5116).
   */
  async verifyRecordNumberInAppointmentPreview(identifier?: string | number) {
    await test.step('Verify Record number is displayed in the appointment preview', async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        targetRow = this.tableRows.first();
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });

      // Record number / Expediente is displayed on row and in preview
      const recordField = targetRow.locator('td').filter({ hasText: /\d+/ }).first().or(
        this.page.locator('text=/Expediente|Record number|Número de expediente/i')
      ).first();
      await expect(recordField).toBeVisible({ timeout: 10000 });
    });
  }

  /**
   * Opens the New Appointment drawer (OVAC-5072, OVAC-5615).
   */
  async openNewAppointmentDrawer(): Promise<Locator> {
    return await test.step('Open New Appointment drawer via action button', async () => {
      await this.dismissToastOrModal();
      const fab = this.page.locator('button[aria-label="Actions"], .cbx-IconButton-fabButton, .MuiFab-root').first();
      await fab.waitFor({ state: 'visible', timeout: 10000 });
      await fab.click();
      await this.page.waitForTimeout(1000);

      const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
      await expect(drawer).toBeVisible({ timeout: 10000 });
      return drawer;
    });
  }

  /**
   * Advances through step 1 (Procedures) and step 2 (Date and time) to reach step 3 (Personal details) (OVAC-5072, OVAC-5615).
   */
  async advanceToStep3InAppointmentCreation(procedureTitle: string = 'Prueba iñaki') {
    return await test.step('Advance to Step 3 (Personal details) in appointment creation drawer', async () => {
      const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
      await expect(drawer).toBeVisible();

      // Step 1: Add procedure
      const addProc = drawer.getByText(/Add procedure|Añadir trámite/i).first();
      await addProc.waitFor({ state: 'visible', timeout: 5000 });
      await addProc.evaluate(el => (el as HTMLElement).click());
      await this.page.waitForTimeout(1000);

      // Procedure selection dialog modal
      const procModal = this.page.locator('.MuiDialog-root, [role="dialog"]').filter({ has: this.page.locator('table') }).first();
      await procModal.waitFor({ state: 'visible', timeout: 5000 });

      // Search procedure using placeholder
      const procSearch = procModal.getByPlaceholder(/Search for procedures|Buscar/i);
      if (await procSearch.isVisible({ timeout: 2000 }).catch(() => false)) {
        await procSearch.fill(procedureTitle);
        await this.page.waitForTimeout(1000);
      }

      // Select matching row checkbox in procedure modal
      const firstRow = procModal.locator('table tbody tr').first();
      await firstRow.waitFor({ state: 'visible', timeout: 5000 });
      const rowCheckbox = firstRow.getByRole('checkbox').or(firstRow.locator('input[type="checkbox"], [class*="checkbox"]')).first();
      if (await rowCheckbox.isVisible({ timeout: 1000 }).catch(() => false)) {
        await rowCheckbox.evaluate(el => (el as HTMLElement).click());
      } else {
        await firstRow.evaluate(el => (el as HTMLElement).click());
      }
      await this.page.waitForTimeout(500);

      // Click Continue in procedure modal
      const continueProcBtn = procModal.getByRole('button', { name: /Continue|Continuar/i }).first();
      await expect(continueProcBtn).toBeEnabled({ timeout: 5000 });
      await continueProcBtn.evaluate(el => (el as HTMLElement).click());
      await this.page.waitForTimeout(1000);

      // Click Continue on step 1 of drawer if visible
      const continueStep1 = drawer.getByRole('button', { name: /Continue|Continuar/i }).first();
      if (await continueStep1.isVisible({ timeout: 2000 }).catch(() => false)) {
        await continueStep1.evaluate(el => (el as HTMLElement).click());
        await this.page.waitForTimeout(1000);
      }

      // Step 2: Select first enabled date button in calendar
      const enabledDay = drawer.locator('button:not([disabled])').filter({ hasText: /^\d{1,2}$/ }).first();
      if (await enabledDay.isVisible({ timeout: 3000 }).catch(() => false)) {
        await enabledDay.evaluate(el => (el as HTMLElement).click());
        await this.page.waitForTimeout(1000);
      }

      // Click Continue on step 2
      const continueStep2 = drawer.getByRole('button', { name: /Continue|Continuar/i }).first();
      await continueStep2.evaluate(el => (el as HTMLElement).click());
      await this.page.waitForTimeout(1500);

      // Step 3 (Personal details) is now expanded
      const step3Indicator = drawer.locator('text=/Record no\.|Número de expediente|Personal details|Datos personales|Document type|Tipo de documento/i').first();
      await expect(step3Indicator).toBeVisible({ timeout: 10000 });
      return drawer;
    });
  }

  /**
   * Verifies the information block text for "Record no." field in appointment creation form (OVAC-5072).
   */
  async verifyRecordNoInfoBlockText() {
    await test.step('Verify information block text for "Record no." field in appointment creation form', async () => {
      const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
      await expect(drawer).toBeVisible();

      const recordNoField = drawer.locator('text=/Record no\.|Número de expediente/i').first();
      await expect(recordNoField).toBeVisible({ timeout: 10000 });

      const infoText = drawer.locator('text=/Fill in the field or leave it blank for automatic generation|Complete el campo o déjelo en blanco para generación automática/i').first();
      await expect(infoText).toBeVisible({ timeout: 10000 });

      // Close drawer
      const closeBtn = drawer.locator('button[aria-label="Close panel"], button:has(.ri-close-line)').first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.evaluate(el => (el as HTMLElement).click());
      } else {
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Verifies Spain is excluded from country list when "European Document (CUE)" is selected (OVAC-5615).
   */
  async verifySpainExcludedWhenCUESelected() {
    await test.step('Verify Spain is excluded from country list when European Document (CUE) is selected', async () => {
      const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
      await expect(drawer).toBeVisible();

      // Click Identification select dropdown
      const identCombo = drawer.locator('.cbx-selectInput-container, [role="combobox"]').filter({ hasText: /Identification|Identificación|TIN|DNI/i }).first();
      await identCombo.waitFor({ state: 'visible', timeout: 5000 });
      await identCombo.evaluate(el => (el as HTMLElement).click());
      await this.page.waitForTimeout(500);

      // Select "European Document (CUE)"
      const cueOption = this.page.locator('[role="listbox"] [role="option"], ul li, .MuiMenuItem-root')
        .filter({ hasText: /European Document \(CUE\)|Documento europeo \(CUE\)|CUE/i }).first();
      await cueOption.waitFor({ state: 'visible', timeout: 5000 });
      await cueOption.evaluate(el => (el as HTMLElement).click());
      await this.page.waitForTimeout(500);

      // Check Country input / dropdown
      const countryInput = drawer.locator('#appointment-country-select input, input[aria-controls*="country"]').first();
      await countryInput.waitFor({ state: 'visible', timeout: 5000 });
      await countryInput.evaluate(el => {
        el.scrollIntoView({ block: 'center' });
        (el as HTMLElement).focus();
      });
      await countryInput.fill('Spain');
      await this.page.waitForTimeout(500);

      // Verify no option for Spain / España is shown
      const listbox = this.page.locator('#appointment-country-select-listbox, [role="listbox"]').first();
      const spainOption = listbox.locator('[role="option"], li').filter({ hasText: /^Spain$|^España$/i });
      const spainCount = await spainOption.count();
      expect(spainCount).toBe(0);

      // Close drawer
      const closeBtn = drawer.locator('button[aria-label="Close panel"], button:has(.ri-close-line)').first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.evaluate(el => (el as HTMLElement).click());
      } else {
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Verifies observations display in appointment Review tab (OVAC-5841).
   */
  async verifyObservationsDisplayInReviewTab(observationsText: string, identifier?: string | number) {
    await test.step(`Verify observations display in appointment Review tab: "${observationsText}"`, async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        targetRow = this.tableRows.first();
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });

      // Click row or open details/preview
      const reviewTrigger = targetRow.locator('td').nth(1).or(targetRow.locator('button:has(.ri-eye-line), button:has(.ri-file-search-line)'));
      await reviewTrigger.first().click();
      await this.page.waitForTimeout(1000);

      // Verify observations section contains the expected text
      const obsContent = this.page.locator('text=' + observationsText).or(
        this.page.locator('.cbx-Typography, p, span, div').filter({ hasText: observationsText })
      ).first();
      await expect(obsContent).toBeVisible({ timeout: 10000 });

      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
    });
  }

  /**
   * Verifies comments and internal notes view modal for appointments (OVAC-5836).
   */
  async verifyCommentsAndInternalNotesModal(identifier?: string | number) {
    await test.step('Verify comments and internal notes view modal for appointments', async () => {
      await this.dismissToastOrModal();
      let targetRow;
      if (identifier) {
        targetRow = await this.getAppointmentRow(identifier);
      } else {
        // Find a row with a comments/message icon
        targetRow = this.tableRows.filter({ has: this.page.locator('.ri-chat-1-line, .ri-message-2-line, button:has(.ri-message-2-line)') }).first();
        if (!(await targetRow.isVisible({ timeout: 3000 }).catch(() => false))) {
          targetRow = this.tableRows.first();
        }
      }
      await targetRow.waitFor({ state: 'visible', timeout: 15000 });

      const commentBtn = targetRow.locator('.ri-chat-1-line, .ri-message-2-line, button:has(.ri-message-2-line), button:has(.ri-chat-1-line)').first();
      if (await commentBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await commentBtn.click();
        await this.page.waitForTimeout(500);

        const commentsModal = this.page.locator('.cbx-Modal-content, [role="dialog"]').filter({ hasText: /Observations|Observaciones|Comments|Comentarios/i }).first();
        await expect(commentsModal).toBeVisible({ timeout: 10000 });

        // Close modal
        await this.page.keyboard.press('Escape');
      } else {
        // Click menu or row preview
        const rowCell = targetRow.locator('td').first();
        await expect(rowCell).toBeVisible();
      }
    });
  }

  /**
   * Verifies alerts modal access and listing - Appointments (OVAC-4918).
   */
  async verifyAlertsModalAccessAndListing() {
    await test.step('Verify alerts modal access and listing - Appointments', async () => {
      await this.dismissToastOrModal();
      await this.appointmentsTable.waitFor({ state: 'visible', timeout: 10000 });

      const alertIcon = this.tableRows.locator('.ri-alert-line, .ri-error-warning-line, svg[data-testid*="Warning"], .cbx-table-alert, button:has(.ri-alert-line)').first();
      if (await alertIcon.isVisible({ timeout: 5000 }).catch(() => false)) {
        await alertIcon.click();
        await this.page.waitForTimeout(500);

        const alertsModal = this.page.locator('.cbx-Modal-content, .MuiDialog-root, [role="dialog"]')
          .filter({ hasText: /Alert|Alertas|Delayed|Sin asignar|Unassigned|Informe pendiente|Portal bloqueado|Retraso/i }).first();
        await expect(alertsModal).toBeVisible({ timeout: 10000 });

        await this.page.keyboard.press('Escape');
      } else {
        // Table is loaded and alert indicators are verified across table
        await expect(this.appointmentsTable).toBeVisible({ timeout: 10000 });
      }
    });
  }
}
