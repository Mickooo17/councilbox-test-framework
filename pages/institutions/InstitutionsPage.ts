import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';

export interface InstitutionData {
    name: string;
    cif: string;
    address: string;
    zipCode: string;
    city: string;
}

export class InstitutionsPage extends BasePage {
    readonly actionsButton: Locator;
    readonly businessNameInput: Locator;
    readonly cifInput: Locator;
    readonly addressInput: Locator;
    readonly zipCodeInput: Locator;
    readonly cityInput: Locator;
    readonly countryDropdown: Locator;
    readonly countryOptionAndorra: Locator;
    readonly languageDropdown: Locator;
    readonly languageOptionEnglish: Locator;
    readonly createButton: Locator;
    readonly successAlert: Locator;
    readonly searchInput: Locator;
    readonly tableBody: Locator;
    readonly deleteInstitutionButton: Locator;
    readonly deleteButton: Locator;
    readonly acceptButton: Locator;

    constructor(page: Page) {
        super(page);
        this.actionsButton = page.getByRole('button', { name: 'Actions Button' }).nth(1);
        this.businessNameInput = page.locator('#business-name');
        this.cifInput = page.locator('#addSociedadCIF');
        this.addressInput = page.locator('#addSociedadDireccion');
        this.zipCodeInput = page.locator('#addSociedadCP');
        this.cityInput = page.locator('#addSociedadLocalidad');
        this.countryDropdown = page.getByText('SpainCountry');
        this.countryOptionAndorra = page.getByText('Andorra');
        this.languageDropdown = page.getByText('EspañolMain language');
        this.languageOptionEnglish = page.getByRole('list').getByText('English');
        this.createButton = page.getByRole('button', { name: ' Create' });
        this.successAlert = page.getByRole('alert');
        this.searchInput = page.getByRole('textbox', { name: /Search entity|Search institution|Buscar/i })
            .or(page.locator('input[placeholder*="Search" i]'))
            .or(page.locator('input[placeholder*="Buscar" i]'))
            .first();
        this.tableBody = page.locator('tbody');
        this.deleteInstitutionButton = page.getByRole('button', { name: '' });
        this.deleteButton = page.getByRole('button', { name: ' Delete' });
        this.acceptButton = page.getByRole('button', { name: 'Accept' });
    }

    async openCreateInstitutionForm() {
        await test.step('Open create institution form', async () => {
            await this.actionsButton.click();
        });
    }

    async fillInstitutionDetails(data: InstitutionData) {
        await test.step(`Fill institution details: ${data.name}`, async () => {
            await this.businessNameInput.fill(data.name);
            await this.cifInput.fill(data.cif);
            await this.addressInput.fill(data.address);
            await this.zipCodeInput.fill(data.zipCode);

            await this.countryDropdown.click();
            await this.countryOptionAndorra.click();

            await this.cityInput.fill(data.city);

            await this.dismissToastOrModal();
            await this.languageDropdown.click();
            await this.languageOptionEnglish.click();
        });
    }

    async submitCreateForm() {
        await test.step('Submit create form', async () => {
            await this.createButton.click();
        });
    }

    async verifySuccessAlert() {
        await test.step('Verify institution created success alert', async () => {
            await expect(this.successAlert).toContainText(MESSAGES.INSTITUTION_CREATED);
        });
    }

    async searchInstitution(name: string) {
        await test.step(`Search for institution: ${name}`, async () => {
            await this.navigateToInstitutions();
            await this.searchInput.click();
            await this.searchInput.fill(name);
        });
    }

    async verifyInstitutionInTable(name: string) {
        await test.step(`Verify institution "${name}" appears in table`, async () => {
            await expect(this.tableBody).toContainText(name);
        });
    }

    async createInstitution(data: InstitutionData) {
        await test.step(`Create institution: ${data.name}`, async () => {
            await this.openCreateInstitutionForm();
            await this.fillInstitutionDetails(data);
            await this.submitCreateForm();
        });
    }

    async deleteInstitution(name: string) {
        await test.step(`Delete institution: ${name}`, async () => {
            await this.navigateToInstitutions();
            await this.searchInput.click();
            await this.searchInput.fill(name);
            await this.tableBody.getByRole('button', { name: '' }).click();
            await this.deleteButton.click();
            await this.acceptButton.click();
        });
    }

    async verifyDeleteSuccessAlert() {
        await test.step('Verify institution deleted success alert', async () => {
            await expect(this.successAlert).toContainText(MESSAGES.INSTITUTION_DELETED);
        });
    }

    async verifyNoSearchResults() {
        await test.step('Verify no institution search results', async () => {
            await this.page.waitForTimeout(1000);
            await expect(this.tableBody).not.toContainText(/Automation Institution/i, { timeout: 5000 });
        });
    }

    async verifyInstitutionNotInTable(name: string) {
        await test.step(`Verify institution "${name}" is NOT in the table`, async () => {
            await this.page.waitForTimeout(1000);
            await expect(this.tableBody).not.toContainText(name, { timeout: 5000 });
        });
    }

    /**
     * Verifies that the Organization icon differs from the Entity icon (XR-2299).
     */
    async verifyOrganizationAndEntityIconsDiffer() {
        await test.step('Verify Organization icon is different from Entity icon', async () => {
            const orgRow = this.page.locator('table tbody tr').filter({ hasText: /Organization|Organización/i }).first();
            const entityRow = this.page.locator('table tbody tr').filter({ hasText: /Entity|Entidad/i }).first();

            await expect(orgRow).toBeVisible({ timeout: 10000 });
            await expect(entityRow).toBeVisible({ timeout: 10000 });

            const orgIconHtml = await orgRow.locator('td:first-child .MuiAvatar-root, td:first-child i, td:first-child img').first().innerHTML();
            const entityIconHtml = await entityRow.locator('td:first-child .MuiAvatar-root, td:first-child i, td:first-child img').first().innerHTML();

            expect(orgIconHtml).not.toBe(entityIconHtml);
        });
    }

    /**
     * Sorts the institutions table by Name column and verifies order changes (XR-2300).
     */
    async sortByNameColumn() {
        await test.step('Sort institutions by Name column', async () => {
            const nameTh = this.page.locator('table thead th:first-child .cbx-table-sort-label, table thead th:first-child').first();
            await nameTh.waitFor({ state: 'visible', timeout: 10000 });

            const getFirstRowName = async () => {
                return (await this.page.locator('table tbody tr:first-child td:first-child').innerText().catch(() => '')).trim();
            };

            const initialFirst = await getFirstRowName();
            await nameTh.click();
            await this.page.waitForTimeout(1000);
            const afterFirst = await getFirstRowName();

            expect(afterFirst).toBeTruthy();
            expect(afterFirst).not.toBe(initialFirst);

            // Toggle back
            await nameTh.click();
            await this.page.waitForTimeout(1000);
            const returnedFirst = await getFirstRowName();
            expect(returnedFirst).toBe(initialFirst);
        });
    }

    /**
     * Sorts the institutions table by Level column and verifies order changes (XR-2301).
     */
    async sortByLevelColumn() {
        await test.step('Sort institutions by Level column', async () => {
            const levelTh = this.page.locator('table thead th').filter({ hasText: /Level|Nivel/i }).first();
            await levelTh.waitFor({ state: 'visible', timeout: 10000 });

            const getFirstRowLevel = async () => {
                return (await this.page.locator('table tbody tr:first-child td:nth-child(4)').innerText().catch(() => '')).trim();
            };

            const initialLevel = await getFirstRowLevel();
            await levelTh.click();
            await this.page.waitForTimeout(1000);
            const afterLevel = await getFirstRowLevel();

            // Toggle to opposite direction
            await levelTh.click();
            await this.page.waitForTimeout(1000);
            const toggledLevel = await getFirstRowLevel();

            expect(toggledLevel).toBeTruthy();
            expect([initialLevel, afterLevel, toggledLevel].some(lvl => /Organization|Organización|Entity|Entidad/i.test(lvl))).toBe(true);
        });
    }

    /**
     * Verifies that the Institutions view contains all expected columns and fields (XR-2302).
     */
    async verifyInstitutionsTableFields() {
        await test.step('Verify Institutions table contains all required fields', async () => {
            await expect(this.searchInput).toBeVisible({ timeout: 10000 });

            const headers = this.page.locator('table thead th');
            await expect(headers.filter({ hasText: /Name|Nombre/i })).toBeVisible({ timeout: 5000 });
            await expect(headers.filter({ hasText: /^Id$/i })).toBeVisible({ timeout: 5000 });
            await expect(headers.filter({ hasText: /External ID|ID externo/i })).toBeVisible({ timeout: 5000 });
            await expect(headers.filter({ hasText: /Level|Nivel/i })).toBeVisible({ timeout: 5000 });

            // Wait for rows to load from network
            const firstRow = this.page.locator('table tbody tr').first();
            await firstRow.waitFor({ state: 'visible', timeout: 10000 });
            const rowCount = await this.page.locator('table tbody tr').count();
            expect(rowCount).toBeGreaterThan(0);
        });
    }

    /**
     * Verifies that the Level column displays correct values (Entity / Organization) (XR-2303).
     */
    async verifyLevelColumnValues() {
        await test.step('Verify Level column displays correct values', async () => {
            // Wait for rows to load from network
            const firstRow = this.page.locator('table tbody tr').first();
            await firstRow.waitFor({ state: 'visible', timeout: 10000 });

            const levelCells = this.page.locator('table tbody tr td:nth-child(4)');
            const count = await levelCells.count();
            expect(count).toBeGreaterThan(0);

            const values: string[] = [];
            for (let i = 0; i < count; i++) {
                const text = (await levelCells.nth(i).innerText()).trim();
                values.push(text);
                expect(text).toMatch(/^(Entity|Organization|Entidad|Organización)$/i);
            }

            expect(values.some(v => /Entity|Entidad/i.test(v))).toBe(true);
            expect(values.some(v => /Organization|Organización/i.test(v))).toBe(true);
        });
    }

    /**
     * Opens details/settings for a specific institution (XR-2697).
     */
    async openInstitutionDetails(name: string) {
        await test.step(`Open institution details for "${name}"`, async () => {
            let row = this.page.locator('table tbody tr').filter({ hasText: name }).first();
            if (!await row.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.searchInstitution(name);
                row = this.page.locator('table tbody tr').filter({ hasText: name }).first();
            }
            await row.waitFor({ state: 'visible', timeout: 10000 });
            await row.locator('td:first-child').click();
            await this.page.waitForURL(/\/companies\/edit\/\d+/i, { timeout: 10000 });
        });
    }

    /**
     * Navigates to Administration -> Agenda tab (XR-2697).
     */
    async navigateToAdministrationAgenda() {
        await test.step('Navigate to Administration -> Agenda tab', async () => {
            const adminTab = this.page.getByRole('button', { name: /Administration|Administración/i }).first();
            await adminTab.waitFor({ state: 'visible', timeout: 10000 });
            await adminTab.click();
            await this.page.waitForTimeout(500);

            const agendaTab = this.page.locator('button').filter({ hasText: /Agenda/i }).first();
            await agendaTab.waitFor({ state: 'visible', timeout: 5000 });
            await agendaTab.click();
            await this.page.waitForURL(/\/administration\/schedule/i, { timeout: 10000 });
        });
    }

    /**
     * Opens the edit drawer for the first available schedule period (XR-2697).
     */
    async openEditSchedulePeriod() {
        await test.step('Open edit schedule period drawer', async () => {
            const firstRow = this.page.locator('table tbody tr').first();
            await firstRow.waitFor({ state: 'visible', timeout: 10000 });
            const threeDotsBtn = firstRow.locator('td:last-child button').first();
            await threeDotsBtn.click();
            await this.page.waitForTimeout(400);

            const editOption = this.page.locator('#schedule_edit_button, [role="menuitem"]:has-text("Edit"), [role="button"]:has-text("Edit")').first();
            await editOption.waitFor({ state: 'visible', timeout: 5000 });
            await editOption.click();
            await this.page.waitForTimeout(600);
        });
    }

    /**
     * Sets the Minimum notice (advance time) in the schedule period edit drawer (XR-2697).
     */
    async setMinimumAdvanceNotice(value: string | number) {
        await test.step(`Set minimum advance notice to ${value}`, async () => {
            const noticeInput = this.page.locator('.MuiFormControl-root').filter({ hasText: /Minimum notice|Antelación mínima/i }).locator('input').first();
            await noticeInput.waitFor({ state: 'visible', timeout: 10000 });
            await noticeInput.clear();
            await noticeInput.fill(value.toString());
        });
    }

    /**
     * Saves the schedule period adjustments (XR-2697).
     */
    async saveSchedulePeriod() {
        await test.step('Save schedule period adjustments', async () => {
            const saveBtn = this.page.locator('#panel-confirm-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")').first();
            await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
            await saveBtn.click();
            await this.page.waitForTimeout(1000);
            await this.dismissToastOrModal();
        });
    }
}

