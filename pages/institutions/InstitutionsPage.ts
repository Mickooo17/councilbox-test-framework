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
        this.searchInput = page.getByRole('textbox', { name: 'Search institution...' });
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
}

