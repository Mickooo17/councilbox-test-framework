import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';

export interface UserData {
    name: string;
    surname: string;
    phone: string;
    idCard: string;
    email: string;
}

export class UsersPage extends BasePage {
    readonly addUserButton: Locator;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly phoneInput: Locator;
    readonly idCardInput: Locator;
    readonly emailInput: Locator;
    readonly continueButton: Locator;
    readonly addButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page);
        this.addUserButton = page.locator('#add-user-button');
        this.nameInput = page.locator('#user-settings-name');
        this.surnameInput = page.locator('#user-settings-surname');
        this.phoneInput = page.locator('#user-settings-phone');
        this.idCardInput = page.locator('#user-id-card-type');
        this.emailInput = page.locator('#user-form-email');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.searchInput = page.getByRole('textbox', { name: 'Search users' });
    }

    async clickAddUser() {
        await test.step('Click Add User button', async () => {
            // Static wait just for this specific case as requested
            await this.page.waitForTimeout(2000);

            // Wait for the button to be visible and click it
            await this.addUserButton.waitFor({ state: 'visible' });
            await this.addUserButton.click();
            // Wait for the form to actually appear
            await this.nameInput.waitFor({ state: 'visible' });
        });
    }

    async fillUserForm(userData: UserData) {
        await test.step(`Fill user form: ${userData.name} ${userData.surname}`, async () => {
            await this.nameInput.fill(userData.name);
            await this.surnameInput.fill(userData.surname);
            await this.phoneInput.fill(userData.phone);
            await this.idCardInput.fill(userData.idCard);
            await this.emailInput.fill(userData.email);
        });
    }

    async selectLanguage(language: string) {
        await test.step(`Select language: ${language}`, async () => {
            // Click the language dropdown as recorded in codegen
            await this.page.getByText('EspañolLanguage').click();
            await this.page.getByRole('menuitem', { name: language }).click();
        });
    }

    async submitUserForm() {
        await test.step('Submit user form (Continue → Add)', async () => {
            await this.continueButton.click();
            await this.addButton.click();
        });
    }

    async verifyUserCreatedAlert() {
        await test.step('Verify user created success alert', async () => {
            await expect(this.page.getByRole('alert')).toContainText(MESSAGES.USER_CREATED, { timeout: 10000 });
        });
    }

    async searchUser(searchTerm: string) {
        await test.step(`Search for user: ${searchTerm}`, async () => {
            await this.searchInput.fill(searchTerm);
            await this.page.waitForTimeout(1000);
        });
    }

    async verifyUserInTable(fullName: string) {
        await test.step(`Verify user ${fullName} is in the table`, async () => {
            await expect(this.page.locator('tbody')).toContainText(fullName, { timeout: 10000 });
        });
    }

    async deleteUser() {
        await test.step('Delete user', async () => {
            await this.page.getByRole('cell', { name: 'Icon Button' }).getByLabel('Icon Button').click();
            await this.page.getByRole('button', { name: ' Delete' }).click();
            await expect(this.page.locator('#modal')).toContainText(MESSAGES.USER_DELETE_CONFIRMATION);
            await this.page.getByRole('button', { name: 'Delete' }).click();
        });
    }

    async verifyUserDeletedAlert() {
        await test.step('Verify user deleted success alert', async () => {
            await expect(this.page.getByRole('alert')).toContainText(MESSAGES.USER_DELETED, { timeout: 10000 });
        });
    }
}
