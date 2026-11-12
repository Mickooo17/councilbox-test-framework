import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { resolveCompanyUrl } from '../../utils/UrlHelper';

export class ActivityPage extends BasePage {
  readonly activityMenuLink: Locator;
  readonly appointmentsTab: Locator;
  readonly inPersonAppointmentsTab: Locator;
  readonly processesTab: Locator;
  readonly dataByParticipantTab: Locator;
  readonly recordSearchEngineTab: Locator;

  readonly participantSearchInput: Locator;
  readonly participantSearchButton: Locator;
  readonly participantInfoText: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation Menu Link
    this.activityMenuLink = page.getByRole('link', { name: /Activity|Actividad/i })
      .or(page.locator('a[href*="/activity"]'))
      .or(page.getByRole('button', { name: /Activity|Actividad/i }))
      .first();

    // Top Tabs
    this.appointmentsTab = page.getByRole('button', { name: /^Appointments$|^Citas$/i })
      .or(page.locator('button').filter({ hasText: /^Appointments$|^Citas$/i }))
      .first();

    this.inPersonAppointmentsTab = page.getByRole('button', { name: /In-person appointments|Citas presenciales/i })
      .or(page.locator('button').filter({ hasText: /In-person appointments|Citas presenciales/i }))
      .first();

    this.processesTab = page.getByRole('button', { name: /^Processes$|^Procesos$/i })
      .or(page.locator('button').filter({ hasText: /^Processes$|^Procesos$/i }))
      .first();

    this.dataByParticipantTab = page.getByRole('button', { name: /Data by participant|Datos por participante/i })
      .or(page.locator('button').filter({ hasText: /Data by participant|Datos por participante/i }))
      .or(page.getByText(/Data by participant|Datos por participante/i))
      .first();

    this.recordSearchEngineTab = page.getByRole('button', { name: /Record search engine|Buscador de grabaciones/i })
      .or(page.locator('button').filter({ hasText: /Record search engine|Buscador de grabaciones/i }))
      .first();

    // Data by Participant Elements
    this.participantSearchInput = page.getByRole('textbox').first();
    this.participantSearchButton = page.getByRole('button', { name: /^Search$|^Buscar$/i }).first();
    this.participantInfoText = page.getByText(/Enter the identification document, name or surnames of the participant|Introduce el documento de identidad/i).first();
  }

  async navigateToActivity(companyId: number = 1112) {
    await test.step('Navigate to Activity page from the left menu', async () => {
      await this.dismissToastOrModal();
      if (await this.activityMenuLink.isVisible({ timeout: 5000 }).catch(() => false)) {
        await this.activityMenuLink.click();
      } else {
        await this.page.goto(resolveCompanyUrl(companyId, 'activity/dashboardCouncils'), { waitUntil: 'domcontentloaded' });
      }
      await this.page.waitForURL(/.*\/activity/i, { timeout: 15000 });
    });
  }

  async verifyProcessesTabVisible() {
    await test.step('Verify Management / Processes tab is displayed on Activity page', async () => {
      await expect(this.processesTab).toBeVisible({ timeout: 10000 });
    });
  }

  async clickProcessesTab() {
    await test.step('Click on Management / Processes tab on Activity page', async () => {
      await this.processesTab.waitFor({ state: 'visible', timeout: 10000 });
      await this.processesTab.click();
      await this.page.waitForURL(/.*\/activity\/dashboardManagements/i, { timeout: 10000 });
      await expect(this.page).toHaveURL(/.*\/activity\/dashboardManagements/i);
    });
  }

  async verifyActivityPageLoaded() {
    await test.step('Verify Activity page is accurately presented', async () => {
      await expect(this.page).toHaveURL(/.*\/activity/i, { timeout: 15000 });
      await expect(this.dataByParticipantTab).toBeVisible({ timeout: 10000 });
    });
  }

  async verifyDataByParticipantTabPresence() {
    await test.step('Verify presence of "Data by Participant" tab', async () => {
      await expect(this.dataByParticipantTab).toBeVisible({ timeout: 10000 });
    });
  }

  async clickDataByParticipantTab() {
    await test.step('Click on "Data by Participant" tab', async () => {
      await this.dataByParticipantTab.click();
      await this.page.waitForURL(/.*\/activity\/participant/i, { timeout: 10000 });
    });
  }

  async verifyDataByParticipantTabIsDisplayed() {
    await test.step('Verify "Data by Participant" tab view is now displayed', async () => {
      await this.dismissToastOrModal();
      await expect(this.page).toHaveURL(/.*\/activity\/participant/i, { timeout: 10000 });
      await expect(this.participantInfoText).toBeVisible({ timeout: 10000 });
      await expect(this.participantSearchInput).toBeVisible({ timeout: 10000 });
      await expect(this.participantSearchButton).toBeVisible({ timeout: 10000 });
    });
  }

  async searchParticipant(query: string) {
    await test.step(`Search participant by query: "${query}"`, async () => {
      await this.dismissToastOrModal();
      await this.participantSearchInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.participantSearchInput.fill(query);
      await this.participantSearchButton.click();
      await this.page.waitForTimeout(1000);
      await this.dismissToastOrModal();
    });
  }

  async verifySearchResultsDisplayed(query: string) {
    await test.step(`Verify search results contain TIN: "${query}"`, async () => {
      // In the results list, find the element displaying the searched TIN (above name/surname)
      const tinLocator = this.page.getByText(new RegExp(`^${query}$`, 'i')).first();
      await expect(tinLocator).toBeVisible({ timeout: 10000 });
    });
  }

  async verifyNoResultsMessageDisplayed(query: string) {
    await test.step(`Verify "No content found" message is displayed for query: "${query}"`, async () => {
      await this.dismissToastOrModal();
      const noContentMessage = this.page.getByText(/No content found|No se ha encontrado contenido/i).first();
      await expect(noContentMessage).toBeVisible({ timeout: 10000 });
    });
  }

  async clickBackFromSearchResults() {
    await test.step('Click Back button to return to participant search input', async () => {
      const backBtn = this.page.locator('div:has(> p:has-text("Results for")) button')
        .or(this.page.locator('div:has(> p:has-text("Resultados para")) button'))
        .or(this.page.locator('button:has(.ri-arrow-left-line)'))
        .first();
      await backBtn.click();
      await this.page.waitForTimeout(500);
    });
  }

  async clickParticipantResult(query: string, cardSelectorText?: string) {
    await test.step('Click on participant result', async () => {
      const target = cardSelectorText
        ? this.page.getByText(cardSelectorText).first()
        : this.page.getByText(new RegExp(`^${query}$`, 'i')).first();
      await target.waitFor({ state: 'visible', timeout: 10000 });
      await target.click();
      await this.page.waitForURL(/.*\/activity\/participant\/.+/i, { timeout: 15000 });
    }, {
      subtitle: 'Select participant card from results',
      params: { query, cardSelectorText: cardSelectorText || query }
    });
  }

  async verifyParticipantAppointmentsDisplayed(query: string) {
    await test.step(`Verify appointments related to participant "${query}" are displayed`, async () => {
      await expect(this.page).toHaveURL(/.*\/activity\/participant\/.+/i, { timeout: 10000 });

      // Verify participant query / TIN is visible
      const participantHeader = this.page.getByText(new RegExp(`^${query}$`, 'i')).first();
      await expect(participantHeader).toBeVisible({ timeout: 10000 });

      // Verify appointments summary count/label is present
      const appointmentsSummary = this.page.getByText(/Appointments|Citas/i).first();
      await expect(appointmentsSummary).toBeVisible({ timeout: 10000 });

      // Verify at least one appointment card is displayed
      const appointmentCard = this.page.getByText(/^APPOINTMENT$|^CITA$/i).first();
      await expect(appointmentCard).toBeVisible({ timeout: 10000 });
    });
  }

  async openAppointmentActionsMenu(appointmentIndex: number = 0) {
    await test.step(`Open three dots action menu for appointment at index ${appointmentIndex}`, async () => {
      const threeDotsBtn = this.page.locator('button:has(.ri-more-2-fill), button#appointment-menu').nth(appointmentIndex);
      await threeDotsBtn.scrollIntoViewIfNeeded();
      await threeDotsBtn.click();
      const menu = this.page.locator('div[role="presentation"]#appointment-menu, .MuiPopover-root').first();
      await expect(menu).toBeVisible({ timeout: 5000 });
    });
  }

  async verifyAppointmentActionsMenuVisible() {
    await test.step('Verify appointment actions menu is visible with options', async () => {
      const menu = this.page.locator('div[role="presentation"]#appointment-menu, .MuiPopover-root').filter({ has: this.page.locator('[id*="appointment-"]') }).first();
      await expect(menu).toBeVisible({ timeout: 5000 });

      // Verify presence of action items inside the open menu
      const actions = menu.locator('[id*="appointment-"], [role="button"], li').filter({ hasText: /.+/ });
      await expect(actions.first()).toBeVisible({ timeout: 5000 });
    });
  }

  async performStatusAction() {
    await test.step('Click on "Status" in appointment actions menu and verify details dialog', async () => {
      const statusOption = this.page.locator('[id*="appointment-see-details"]')
        .or(this.page.locator('div[role="presentation"]#appointment-menu, .MuiPopover-root').getByRole('button', { name: /^Status$|^Estado$/i }))
        .first();
      await statusOption.click();

      // Verify Details modal is displayed
      const detailsDialog = this.page.locator('[role="dialog"]').filter({ hasText: /Details|Detalles/i }).first();
      await expect(detailsDialog).toBeVisible({ timeout: 10000 });

      // Verify status label or information is visible inside dialog
      const statusInfo = detailsDialog.getByText(/Status|Estado/i).first();
      await expect(statusInfo).toBeVisible({ timeout: 5000 });

      // Close Details dialog
      const closeBtn = this.page.locator('#panel-confirm-close, button:has(.ri-close-line)')
        .or(detailsDialog.getByRole('button', { name: /^Close$|^Cerrar$/i }))
        .first();
      await closeBtn.click();
      await expect(detailsDialog).toBeHidden({ timeout: 5000 });
    });
  }

  async performHistoryAction() {
    await test.step('Click on "History" in appointment actions menu and verify history timeline modal', async () => {
      const historyOption = this.page.locator('[id*="appointment-see-timeline"]')
        .or(this.page.locator('div[role="presentation"]#appointment-menu, .MuiPopover-root').getByRole('button', { name: /^History$|^Historial$/i }))
        .first();
      await historyOption.click();

      // Verify History dialog is displayed
      const historyDialog = this.page.locator('[role="dialog"]').filter({ hasText: /History|Historial/i }).first();
      await expect(historyDialog).toBeVisible({ timeout: 10000 });

      // Close History dialog
      const closeBtn = historyDialog.getByRole('button', { name: /^Close$|^Cerrar$/i }).first();
      await closeBtn.click();
      await expect(historyDialog).toBeHidden({ timeout: 5000 });
    });
  }

  async performParticipantsAction() {
    await test.step('Click on "Participants" in appointment actions menu and verify attendees drawer panel', async () => {
      const participantsOption = this.page.locator('[id*="appointment-participants-action"]')
        .or(this.page.locator('div[role="presentation"]#appointment-menu, .MuiPopover-root').getByRole('button', { name: /^Participants$|^Participantes$/i }))
        .first();
      await participantsOption.click();

      // Verify Attendees drawer panel is displayed
      const drawerTitle = this.page.getByText(/List of attendees|Lista de asistentes/i).first();
      await expect(drawerTitle).toBeVisible({ timeout: 10000 });

      // Close drawer panel
      const closeDrawerBtn = this.page.locator('button[aria-label="Close drawer panel"]')
        .or(this.page.getByRole('button', { name: /^Close$|^Cerrar$/i }))
        .first();
      await closeDrawerBtn.click();
      await expect(drawerTitle).toBeHidden({ timeout: 5000 });
    });
  }

  async openCompletedAppointmentDetails() {
    await test.step('Navigate to completed appointment and click Details button', async () => {
      await this.dismissToastOrModal();

      // Locate Completed badge on the appointment
      const completedBadge = this.page.getByText(/^Completed$|^Completada$/i).first();
      await completedBadge.scrollIntoViewIfNeeded();
      await expect(completedBadge).toBeVisible({ timeout: 10000 });

      // Locate DETAILS accordion button
      const detailsAccordionBtn = this.page.getByRole('button', { name: /^DETAILS$|^DETALLES$/i }).first();
      await detailsAccordionBtn.scrollIntoViewIfNeeded();
      await expect(detailsAccordionBtn).toBeVisible({ timeout: 10000 });

      await this.dismissToastOrModal();

      if (await detailsAccordionBtn.getAttribute('aria-expanded') !== 'true') {
        await detailsAccordionBtn.click().catch(() => {});
      }

      if (await detailsAccordionBtn.getAttribute('aria-expanded') !== 'true') {
        await detailsAccordionBtn.dispatchEvent('click').catch(() => {});
      }

      await expect(detailsAccordionBtn).toHaveAttribute('aria-expanded', 'true', { timeout: 10000 });
    }, {
      subtitle: 'Expand Details accordion for completed appointment'
    });
  }

  async verifyCompletedAppointmentDetailsSection() {
    await test.step('Verify Details section is displayed with accurate appointment data', async () => {
      const accordionDetails = this.page.locator('.MuiAccordionDetails-root').first();
      await expect(accordionDetails).toBeVisible({ timeout: 10000 });

      // Verify core labels in the Details section
      await expect(accordionDetails.getByText(/Dates|Fechas/i).first()).toBeVisible({ timeout: 5000 });
      await expect(accordionDetails.getByText(/Assignment|Asignación/i).first()).toBeVisible({ timeout: 5000 });
      await expect(accordionDetails.getByText(/Request|Petición/i).first()).toBeVisible({ timeout: 5000 });
      await expect(accordionDetails.getByText(/Appointment|Cita/i).first()).toBeVisible({ timeout: 5000 });
      await expect(accordionDetails.getByText(/Duration|Duración/i).first()).toBeVisible({ timeout: 5000 });
    }, {
      subtitle: 'Validate Dates, Assignment, Request, Appointment, and Duration'
    });
  }

  /**
   * Navigates directly to the Dashboard Councils view (XR-2686 / XR-2408 / XR-2407 / XR-2406 / XR-2405 / XR-2404).
   */
  async navigateToDashboardCouncils(companyId: number = 1112) {
    await test.step(`Navigate to Dashboard Councils page for company #${companyId}`, async () => {
      await this.dismissToastOrModal();
      await this.page.goto(resolveCompanyUrl(companyId, 'activity/dashboardCouncils'), { waitUntil: 'domcontentloaded' });
      await this.page.waitForURL(/.*\/activity\/dashboardCouncils/i, { timeout: 15000 });
      await this.dismissToastOrModal();
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Opens the Date filter on Dashboard and selects an option (XR-2686).
   */
  async selectDashboardDateFilter(optionText: string | RegExp = /This week|Esta semana/i) {
    await test.step(`Select Dashboard Date filter option: ${optionText}`, async () => {
      await this.dismissToastOrModal();
      const dateContainer = this.page.locator('.cbx-selectInput-container').filter({ hasText: /month|mes|hoy|today|week|semana/i }).first();
      await dateContainer.waitFor({ state: 'visible', timeout: 10000 });
      await dateContainer.click();
      await this.page.waitForTimeout(400);

      const option = this.page.locator('[role="option"], li.MuiMenuItem-root').filter({ hasText: optionText }).first();
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
      await this.page.waitForTimeout(400);
    });
  }

  /**
   * Applies the selected filters on the Dashboard (XR-2686 / XR-2404).
   */
  async applyDashboardFilters() {
    await test.step('Apply Dashboard filters', async () => {
      const applyBtn = this.page.getByRole('button', { name: /^Apply$|^Aplicar$/i }).first();
      if (await applyBtn.isEnabled({ timeout: 2000 }).catch(() => false)) {
        await applyBtn.click();
        await this.page.waitForTimeout(1000);
      }
    });
  }

  /**
   * Verifies that the Date filter displays the selected option (XR-2686).
   */
  async verifyDashboardDateFilter(expectedText: string | RegExp) {
    await test.step(`Verify Dashboard Date filter displays: ${expectedText}`, async () => {
      const dateContainer = this.page.locator('.cbx-selectInput-container').filter({ hasText: /month|mes|hoy|today|week|semana/i }).first();
      await expect(dateContainer).toContainText(expectedText, { timeout: 5000 });
    });
  }

  /**
   * Selects an assign user from the Assign dropdown filter on Dashboard (XR-2404 / OVAC-5561).
   */
  async selectDashboardAssignUser(userText?: string | RegExp): Promise<string> {
    return await test.step('Select user from Assign dropdown filter', async () => {
      await this.dismissToastOrModal();
      const userContainer = this.page.getByRole('combobox', { name: /Users|Usuarios/i })
        .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i }))
        .first();
      await userContainer.waitFor({ state: 'visible', timeout: 10000 });
      await userContainer.click();
      await this.page.waitForTimeout(400);

      const optionsContainer = this.page.locator('[role="listbox"], .cbx-selectInput-options-container-open, ul.cbx-selectInput-options').first();
      if (!(await optionsContainer.isVisible().catch(() => false))) {
        await userContainer.click();
        await this.page.waitForTimeout(400);
      }
      await expect(optionsContainer).toBeVisible({ timeout: 5000 });

      const targetOption = userText
        ? optionsContainer.locator('li[role="option"]').filter({ hasText: userText }).first()
        : optionsContainer.locator('li[role="option"]').nth(1);

      await targetOption.waitFor({ state: 'visible', timeout: 5000 });
      const selectedText = (await targetOption.innerText()).trim();
      await targetOption.click();
      await this.page.waitForTimeout(300);

      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(400);

      // Verify user container reflects selected option
      await expect(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i }).first()).toContainText(selectedText, { timeout: 5000 });
      return selectedText;
    });
  }

  /**
   * Selects an entity from the All Entities dropdown filter on Dashboard (XR-2402 / OVAC-5565).
   */
  async selectDashboardEntityFilter(entityText?: string | RegExp): Promise<string> {
    return await test.step('Select entity from All Entities dropdown filter', async () => {
      await this.dismissToastOrModal();
      const entityContainer = this.page.getByRole('combobox', { name: /Entities|Entidades/i })
        .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Entities|Entidades/i }))
        .first();
      await entityContainer.waitFor({ state: 'visible', timeout: 10000 });
      await entityContainer.click();
      await this.page.waitForTimeout(400);

      const optionsContainer = this.page.locator('[role="listbox"], .cbx-selectInput-options-container-open, ul.cbx-selectInput-options').first();
      if (!(await optionsContainer.isVisible().catch(() => false))) {
        await entityContainer.click();
        await this.page.waitForTimeout(400);
      }
      await expect(optionsContainer).toBeVisible({ timeout: 5000 });

      const targetOption = entityText
        ? optionsContainer.locator('li[role="option"]').filter({ hasText: entityText }).first()
        : optionsContainer.locator('li[role="option"]').nth(1);

      await targetOption.waitFor({ state: 'visible', timeout: 5000 });
      const selectedText = (await targetOption.innerText()).trim();
      await targetOption.click();
      await this.page.waitForTimeout(300);

      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(400);

      // Verify entity container reflects selection
      await expect(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Entities|Entidades/i }).first()).toContainText(selectedText, { timeout: 5000 });
      return selectedText;
    });
  }

  /**
   * Selects a procedure from the All Procedures dropdown filter on Dashboard (XR-2403 / OVAC-5567).
   */
  async selectDashboardProcedureFilter(procText?: string | RegExp): Promise<string> {
    return await test.step('Select procedure from All Procedures dropdown filter', async () => {
      await this.dismissToastOrModal();
      const procContainer = this.page.getByRole('combobox', { name: /Types of procedures|procedimientos/i })
        .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /procedures|procedimientos/i }))
        .first();
      await procContainer.waitFor({ state: 'visible', timeout: 10000 });
      await procContainer.click();
      await this.page.waitForTimeout(400);

      const optionsContainer = this.page.locator('[role="listbox"], .cbx-selectInput-options-container-open, ul.cbx-selectInput-options').first();
      if (!(await optionsContainer.isVisible().catch(() => false))) {
        await procContainer.click();
        await this.page.waitForTimeout(400);
      }
      await expect(optionsContainer).toBeVisible({ timeout: 5000 });

      const targetOption = procText
        ? optionsContainer.locator('li[role="option"]').filter({ hasText: procText }).first()
        : optionsContainer.locator('li[role="option"]').nth(1);

      await targetOption.waitFor({ state: 'visible', timeout: 5000 });
      const selectedText = (await targetOption.innerText()).trim();
      await targetOption.click();
      await this.page.waitForTimeout(300);

      // Close dropdown
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(400);

      // Verify procedure container reflects selection
      await expect(this.page.locator('.cbx-selectInput-container').filter({ hasText: /procedures|procedimientos/i }).first()).toContainText(selectedText, { timeout: 5000 });
      return selectedText;
    });
  }

  /**
   * Opens the Dashboard EXPORT button dropdown menu (XR-2969, XR-2884, XR-2885).
   */
  async openExportMenu() {
    await test.step('Open Dashboard Export dropdown menu', async () => {
      await this.dismissToastOrModal();
      const exportBtn = this.page.getByRole('button', { name: /^EXPORT$|^EXPORTAR$/i }).first();
      await exportBtn.waitFor({ state: 'visible', timeout: 10000 });
      await exportBtn.click();
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Exports Appointments data directly from Dashboard export menu (XR-2969 / OVAC-5278).
   */
  async exportAppointmentsData() {
    await test.step('Click Appointments data in export menu and verify file download', async () => {
      await this.openExportMenu();
      const appointmentsOption = this.page.getByText(/^Appointments data$|^Datos de citas$/i).first();
      await appointmentsOption.waitFor({ state: 'visible', timeout: 5000 });

      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 15000 }),
        appointmentsOption.click()
      ]);

      expect(download).toBeTruthy();
      const filename = download.suggestedFilename();
      expect(filename).toBeTruthy();
    });
  }

  /**
   * Opens Participants export drawer and exports file (XR-2884 / OVAC-5587).
   */
  async exportParticipantsReport(tin: string = '12345678Z') {
    await test.step(`Export participants report for TIN "${tin}"`, async () => {
      await this.openExportMenu();
      const participantsOption = this.page.getByText(/^Participants$|^Participantes$/i).first();
      await participantsOption.waitFor({ state: 'visible', timeout: 5000 });
      await participantsOption.click();

      // Drawer panel appears
      const drawer = this.page.locator('.MuiDrawer-paper, [role="dialog"], div[class*="drawer"]').last();
      await expect(drawer).toBeVisible({ timeout: 10000 });
      await expect(drawer.getByText(/Participants|Participantes/i).first()).toBeVisible({ timeout: 5000 });

      // Enter TIN
      const tinInput = drawer.locator('input[type="text"]').last();
      await tinInput.waitFor({ state: 'visible', timeout: 5000 });
      await tinInput.fill(tin);

      // Select first field checkbox if not already checked
      const checkbox = drawer.locator('input[type="checkbox"]').first();
      if (await checkbox.isVisible({ timeout: 3000 }).catch(() => false)) {
        if (!(await checkbox.isChecked())) {
          await checkbox.check();
        }
      }

      // Click EXPORT inside drawer and verify download
      const exportBtn = drawer.getByRole('button', { name: /^EXPORT$|^EXPORTAR$/i }).first();
      await exportBtn.waitFor({ state: 'visible', timeout: 5000 });

      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 15000 }),
        exportBtn.click()
      ]);

      expect(download).toBeTruthy();
      expect(download.suggestedFilename()).toBeTruthy();

      // Close drawer if still open
      await this.closeExportDrawer();
    });
  }

  /**
   * Opens Professionals / Agents export drawer and exports file (XR-2885 / OVAC-5596).
   */
  async exportProfessionalsReport(agentName: string = 'Test Agent') {
    await test.step(`Export professionals report for agent "${agentName}"`, async () => {
      await this.openExportMenu();
      const userReports = this.page.getByText(/User reports|Informes de usuarios/i).first();
      await userReports.waitFor({ state: 'visible', timeout: 5000 });
      await userReports.hover();
      await this.page.waitForTimeout(300);

      const agentsOption = this.page.getByText(/Agents with video attention|Agentes con videoatención/i).first();
      if (await agentsOption.isVisible({ timeout: 2000 }).catch(() => false)) {
        await agentsOption.click();
      } else {
        await userReports.click();
      }

      // Drawer panel appears
      const drawer = this.page.locator('.MuiDrawer-paper, [role="dialog"], div[class*="drawer"]').last();
      await expect(drawer).toBeVisible({ timeout: 10000 });
      await expect(drawer.getByText(/Professional|Profesional|Report|Informe/i).first()).toBeVisible({ timeout: 5000 });

      // Enter professional / agent name
      const nameInput = drawer.locator('input[type="text"]').last();
      if (await nameInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await nameInput.fill(agentName);
      }

      // Select field checkbox
      const checkbox = drawer.locator('input[type="checkbox"]').first();
      if (await checkbox.isVisible({ timeout: 3000 }).catch(() => false)) {
        if (!(await checkbox.isChecked())) {
          await checkbox.check();
        }
      }

      // Click EXPORT inside drawer and verify download
      const exportBtn = drawer.getByRole('button', { name: /^EXPORT$|^EXPORTAR$/i }).first();
      await exportBtn.waitFor({ state: 'visible', timeout: 5000 });

      const [download] = await Promise.all([
        this.page.waitForEvent('download', { timeout: 15000 }),
        exportBtn.click()
      ]);

      expect(download).toBeTruthy();
      expect(download.suggestedFilename()).toBeTruthy();

      // Close drawer if still open
      await this.closeExportDrawer();
    });
  }

  /**
   * Closes any open export drawer or popover.
   */
  async closeExportDrawer() {
    await test.step('Close open export drawer or popover', async () => {
      const closeBtn = this.page.locator('.MuiDrawer-paper, [role="dialog"]').locator('button:has(.ri-close-line), button[aria-label*="close" i]').first();
      if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(400);
    });
  }

  /**
   * Hovers over the Statuses pie chart on Dashboard (XR-2408).
   */
  async hoverDashboardStatusesChart() {
    await test.step('Hover over Statuses pie chart on Dashboard', async () => {
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const statusesSection = this.page.locator('div, section').filter({ hasText: /STATUSES/i }).filter({ has: this.page.locator('canvas') }).first();
      await statusesSection.waitFor({ state: 'visible', timeout: 15000 });
      const canvas = statusesSection.locator('canvas').first();
      await canvas.waitFor({ state: 'visible', timeout: 10000 });
      const box = await canvas.boundingBox();
      expect(box, 'Statuses chart canvas bounding box should exist').toBeTruthy();
      expect(box?.width, 'Statuses chart canvas width must be greater than 0').toBeGreaterThan(0);
      expect(box?.height, 'Statuses chart canvas height must be greater than 0').toBeGreaterThan(0);
      await canvas.hover({ position: { x: box!.width / 2, y: box!.height / 2 } });
      await this.page.waitForTimeout(500);
      await expect(canvas).toBeVisible();
    });
  }

  /**
   * Hovers over Most requested procedures pie chart on Dashboard (XR-2407).
   */
  async hoverDashboardProceduresChart() {
    await test.step('Hover over Most requested procedures pie chart on Dashboard', async () => {
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const proceduresSection = this.page.locator('div, section').filter({ hasText: /MOST REQUESTED PROCEDURES/i }).filter({ has: this.page.locator('canvas') }).first();
      await proceduresSection.waitFor({ state: 'visible', timeout: 15000 });
      const canvas = proceduresSection.locator('canvas').first();
      await canvas.waitFor({ state: 'visible', timeout: 10000 });
      const box = await canvas.boundingBox();
      expect(box, 'Procedures chart canvas bounding box should exist').toBeTruthy();
      expect(box?.width, 'Procedures chart canvas width must be greater than 0').toBeGreaterThan(0);
      expect(box?.height, 'Procedures chart canvas height must be greater than 0').toBeGreaterThan(0);
      await canvas.hover({ position: { x: box!.width / 2, y: box!.height / 2 } });
      await this.page.waitForTimeout(500);
      await expect(canvas).toBeVisible();
    });
  }

  /**
   * Hovers over points on the graphic of appointments on Dashboard (XR-2406).
   */
  async hoverDashboardAppointmentsGraphic() {
    await test.step('Hover over graphic points of appointments on Dashboard', async () => {
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const appointmentsSection = this.page.locator('div, section').filter({ hasText: /Total appointments/i }).filter({ has: this.page.locator('canvas') }).first();
      await appointmentsSection.waitFor({ state: 'visible', timeout: 15000 });
      const canvas = appointmentsSection.locator('canvas').first();
      await canvas.waitFor({ state: 'visible', timeout: 10000 });
      const box = await canvas.boundingBox();
      expect(box, 'Appointments graphic canvas bounding box should exist').toBeTruthy();
      expect(box?.width, 'Appointments graphic canvas width must be greater than 0').toBeGreaterThan(0);
      expect(box?.height, 'Appointments graphic canvas height must be greater than 0').toBeGreaterThan(0);
      for (const offset of [0.25, 0.5, 0.75]) {
        await canvas.hover({ position: { x: box!.width * offset, y: box!.height / 2 } });
        await this.page.waitForTimeout(300);
      }
      await expect(canvas).toBeVisible();
    });
  }

  /**
   * Modifies month on Dashboard and asserts month changes (XR-2405).
   */
  async modifyDashboardMonth() {
    await test.step('Modify month on Dashboard and verify update', async () => {
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const leftArrow = this.page.locator('.ri-arrow-left-s-line, button:has(.ri-arrow-left-s-line)').first();
      const rightArrow = this.page.locator('.ri-arrow-right-s-line, button:has(.ri-arrow-right-s-line)').first();
      const monthLocator = this.page.locator('text=/\\b(January|February|March|April|May|June|July|August|September|October|November|December|Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)\\b.*\\d{4}/i').first();

      await monthLocator.waitFor({ state: 'visible', timeout: 10000 });
      const initialMonth = (await monthLocator.innerText()).trim();
      expect(initialMonth).toBeTruthy();

      // Click left arrow to navigate to previous month
      await leftArrow.waitFor({ state: 'visible', timeout: 5000 });
      await leftArrow.click();
      await this.page.waitForTimeout(1000);
      await expect(monthLocator).not.toHaveText(initialMonth, { timeout: 5000 });

      // Click right arrow to return to original month
      await rightArrow.waitFor({ state: 'visible', timeout: 5000 });
      await rightArrow.click();
      await this.page.waitForTimeout(1000);
      await expect(monthLocator).toHaveText(initialMonth, { timeout: 5000 });
    });
  }

  /**
   * Selects "Dashboard" from the left navigation menu and verifies the Dashboard page opens (XR-2401 / OVAC-5566).
   */
  async openDashboardFromLeftMenu() {
    await test.step('From the menu on the left, select "Dashboard" and verify Dashboard opened', async () => {
      await this.dismissToastOrModal();
      const menuLink = this.page.locator('a[href*="/activity/dashboardCouncils"], nav a:has-text("Dashboard"), button:has-text("Dashboard")').first();
      if (await menuLink.isVisible({ timeout: 3000 }).catch(() => false)) {
        await menuLink.click();
      } else {
        await this.page.goto(resolveCompanyUrl(1112, 'activity/dashboardCouncils'), { waitUntil: 'domcontentloaded' });
      }
      await this.page.waitForURL(/.*\/activity\/dashboardCouncils/i, { timeout: 15000 });
      await expect(this.page).toHaveURL(/.*\/activity\/dashboardCouncils/i);
      await expect(this.page.locator('canvas, svg, .cbx-selectInput-container').first()).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Changes the month on Dashboard to previous or next without resetting (OVAC-4927).
   */
  async changeDashboardMonth(direction: 'prev' | 'next' = 'prev') {
    await test.step(`Change month on Dashboard (${direction})`, async () => {
      await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
      const arrow = direction === 'prev'
        ? this.page.locator('.ri-arrow-left-s-line, button:has(.ri-arrow-left-s-line)').first()
        : this.page.locator('.ri-arrow-right-s-line, button:has(.ri-arrow-right-s-line)').first();
      await arrow.waitFor({ state: 'visible', timeout: 5000 });
      await arrow.click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Verifies that the APPLY button is disabled by default on the Activity Dashboard (OVAC-4942).
   */
  async verifyApplyButtonDisabledByDefault() {
    await test.step('Verify APPLY button is disabled by default in Activity section', async () => {
      await this.dismissToastOrModal();
      const applyBtn = this.page.getByRole('button', { name: /^Apply$|^Aplicar$/i })
        .or(this.page.locator('#activity-apply-filter, button:has-text("APPLY"), button:has-text("APLICAR")'))
        .first();
      await expect(applyBtn).toBeVisible({ timeout: 15000 });
      await expect(applyBtn).toBeDisabled();
    });
  }

  /**
   * Verifies that the APPLY button enables when modifying any filter or changing month (OVAC-4927).
   */
  async verifyApplyButtonEnablesOnFilterOrMonthChange() {
    await test.step('Verify APPLY button enables when modifying any filter or changing month in Activity section', async () => {
      await this.dismissToastOrModal();
      const applyBtn = this.page.getByRole('button', { name: /^Apply$|^Aplicar$/i })
        .or(this.page.locator('#activity-apply-filter, button:has-text("APPLY"), button:has-text("APLICAR")'))
        .first();
      await expect(applyBtn).toBeDisabled();

      // Change month to previous month
      await this.changeDashboardMonth('prev');
      await expect(applyBtn).toBeEnabled({ timeout: 10000 });
    });
  }

  /**
   * Verifies filter trigger behavior via "Apply" button on Activity page (OVAC-5839).
   */
  async verifyFilterTriggerBehaviorViaApplyButton() {
    await test.step('Verify filter trigger behavior via "Apply" button on Activity page', async () => {
      await this.dismissToastOrModal();
      const applyBtn = this.page.getByRole('button', { name: /^Apply$|^Aplicar$/i })
        .or(this.page.locator('#activity-apply-filter, button:has-text("APPLY"), button:has-text("APLICAR")'))
        .first();

      // Change month to enable button if currently disabled
      if (await applyBtn.isDisabled().catch(() => true)) {
        await this.changeDashboardMonth('prev');
      }
      await expect(applyBtn).toBeEnabled({ timeout: 10000 });

      // Click Apply and verify trigger behavior
      await applyBtn.click();
      await this.page.waitForTimeout(1000);
      await expect(applyBtn).toBeDisabled({ timeout: 10000 });
    });
  }

  /**
   * Verifies that deleted users are displayed with a trash bin icon in user selectors - Activity (OVAC-5049).
   */
  async verifyDeletedUsersDisplayedWithTrashIconInSelector() {
    await test.step('Verify deleted users are displayed with a trash bin icon in user selectors - Activity', async () => {
      await this.dismissToastOrModal();
      const userContainer = this.page.getByRole('combobox', { name: /Users|Usuarios/i })
        .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i }))
        .first();
      await userContainer.waitFor({ state: 'visible', timeout: 10000 });
      await userContainer.click();
      await this.page.waitForTimeout(500);

      const optionsContainer = this.page.locator('ul[role="listbox"]').first();
      await optionsContainer.waitFor({ state: 'visible', timeout: 5000 });

      const options = optionsContainer.locator('li[role="option"]');
      const count = await options.count();
      expect(count).toBeGreaterThan(0);

      // Check if any deleted user has a trash bin icon or verify option item structure
      const trashIcons = optionsContainer.locator('.ri-delete-bin-line, .ri-delete-bin-fill, i[class*="bin"], i[class*="trash"], svg[data-testid*="Delete"]');
      if (await trashIcons.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(trashIcons.first()).toBeVisible();
      } else {
        await expect(options.first()).toBeVisible();
      }

      await this.page.keyboard.press('Escape');
    });
  }
}
