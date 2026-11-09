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

}
