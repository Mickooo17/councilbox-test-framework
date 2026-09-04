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

  async clickParticipantResult(query: string) {
    await test.step(`Click on participant result: "${query}"`, async () => {
      const tinLocator = this.page.getByText(new RegExp(`^${query}$`, 'i')).first();
      await tinLocator.waitFor({ state: 'visible', timeout: 10000 });
      await tinLocator.click();
      await this.page.waitForURL(/.*\/activity\/participant\/.+/i, { timeout: 15000 });
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
}


