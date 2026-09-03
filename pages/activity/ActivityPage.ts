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
      await this.page.waitForLoadState('networkidle').catch(() => {});
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
      await this.page.waitForLoadState('networkidle').catch(() => {});
    });
  }

  async verifyDataByParticipantTabIsDisplayed() {
    await test.step('Verify "Data by Participant" tab view is now displayed', async () => {
      await expect(this.page).toHaveURL(/.*\/activity\/participant/i, { timeout: 10000 });
      await expect(this.participantInfoText).toBeVisible({ timeout: 10000 });
      await expect(this.participantSearchInput).toBeVisible({ timeout: 10000 });
      await expect(this.participantSearchButton).toBeVisible({ timeout: 10000 });
    });
  }
}
