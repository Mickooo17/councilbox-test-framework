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

  constructor(page: Page) {
    super(page);

    // Filter controls
    this.statusFilterButton = page.locator('div').filter({ hasText: /^Status$/ }).locator('..').locator('[role="button"]').or(page.locator('input[name="Status"]').locator('..')).first();
    this.periodFilterButton = page.locator('div').filter({ hasText: /^Period$/ }).locator('..').locator('[role="button"]').or(page.locator('input[name="Period"]').locator('..')).first();
    this.searchInput = page.locator('input[placeholder="Search"], input[placeholder*="participant" i]').first();
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
    this.appointmentDetailsHeader = page.getByText(/^Appointment$/i).or(page.getByRole('heading', { name: /Appointment/i })).first();
    this.procedureTitleText = page.locator('div, p').filter({ hasText: /ALL in ONE/i }).first();
    this.statusSection = page.locator('div, p').filter({ hasText: /^Status$/i }).or(page.getByText(/^Status$/i)).first();
    this.canceledBySection = page.locator('div, p').filter({ hasText: /^Canceled by$/i }).or(page.getByText(/^Canceled by$/i)).first();
    this.reasonSection = page.locator('div, p').filter({ hasText: /^Reason$/i }).or(page.getByText(/^Reason$/i)).first();
    this.observationsSection = page.locator('div, p').filter({ hasText: /^Observations$/i }).or(page.getByText(/^Observations$/i)).first();
    this.participantsSection = page.locator('div, p').filter({ hasText: /^Participants$/i }).or(page.getByText(/^Participants$/i)).first();
  }

  async navigateToAppointmentsPage(companyId: number = 1112) {
    await test.step('Navigate to Appointments page', async () => {
      await this.page.goto(resolveCompanyUrl(companyId), { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('networkidle');
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
      await this.statusFilterButton.click();
      await this.page.waitForTimeout(500);

      const optionRegex = new RegExp(statusName, 'i');
      const statusOption = this.page.getByRole('option', { name: optionRegex }).or(
        this.page.locator('li').filter({ hasText: optionRegex })
      ).first();
      await statusOption.waitFor({ state: 'visible', timeout: 5000 });
      await statusOption.click();

      // Close dropdown by pressing Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(1000);
      await this.page.waitForLoadState('networkidle');
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
      await this.page.waitForLoadState('networkidle');
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
      await this.page.waitForLoadState('networkidle');
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
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
      }

      // Switch to 'Day' view if available as described in XR-3139
      if (await this.dayViewRadio.isVisible({ timeout: 3000 }).catch(() => false)) {
        await this.dayViewRadio.click();
        await this.page.waitForLoadState('networkidle');
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
}

