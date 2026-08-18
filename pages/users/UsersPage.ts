import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';
import { UserApiHelper, CreateUserApiOptions, CreatedUserData, UserRole } from '../../utils/users/UserApiHelper';
import { UserDataStore } from '../../utils/users/UserDataStore';

export { CreateUserApiOptions, CreatedUserData, UserRole, UserDataStore };

export interface UserData {
    name: string;
    surname: string;
    phone: string;
    idCard: string;
    email: string;
    language?: string;
}

export class UsersPage extends BasePage {
    readonly addUserButton: Locator;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly phoneInput: Locator;
    readonly idCardInput: Locator;
    readonly emailInput: Locator;
    readonly languageInput: Locator;
    readonly continueButton: Locator;
    readonly addButton: Locator;
    readonly searchInput: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addUserButton = page.locator('#add-user-button');
        this.nameInput = page.locator('#user-settings-name');
        this.surnameInput = page.locator('#user-settings-surname');
        this.phoneInput = page.locator('#user-settings-phone');
        this.idCardInput = page.locator('#user-id-card-type');
        this.emailInput = page.locator('#user-form-email');
        this.languageInput = page.locator('#user-settings-language');
        this.continueButton = page.locator('.MuiDrawer-root, form, .MuiDialog-root').getByRole('button', { name: /Continue|Continuar/i }).or(page.getByRole('button', { name: /Continue|Continuar/i })).first();
        this.addButton = page.locator('.MuiDrawer-root, form, .MuiDialog-root').getByRole('button', { name: /^Add$|^Añadir$|^Guardar$/i }).or(page.getByRole('button', { name: /Add|Añadir|Guardar/i })).first();
        this.searchInput = page.locator('#search-users-input').or(page.getByRole('textbox', { name: /Search/i })).or(page.locator('input[placeholder*="Search" i]')).or(page.locator('input[placeholder*="Buscar" i]')).first();
        this.backButton = page.getByRole('button', { name: /Back|Volver|Atrás/i })
            .or(page.locator('button:has(.ri-arrow-left-line), button:has(.ri-arrow-left-s-line), button:has(i[class*="arrow-left"]), .ri-arrow-left-line, i.ri-arrow-left-line'))
            .or(page.locator('#back-button, [aria-label*="back" i], [aria-label*="volver" i]'))
            .first();
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
            // Defocus to trigger any latent validation
            await this.emailInput.blur();
        });
    }

    async selectLanguage(language: string) {
        await test.step(`Select language: ${language}`, async () => {
            const dropdown = this.page.locator('.MuiDrawer-root, form').getByText(/Language|Idioma/i)
                .or(this.page.getByText('EspañolLanguage'))
                .or(this.page.getByText('EnglishLanguage'))
                .or(this.page.locator('[id*="language"]'))
                .first();
            if (await dropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
                await dropdown.click();
                const option = this.page.getByRole('menuitem', { name: language })
                    .or(this.page.getByRole('option', { name: language }))
                    .or(this.page.getByText(language, { exact: true }))
                    .first();
                await option.click();
                // Ensure dropdown menu popover and backdrop are closed before proceeding
                await this.page.locator('.MuiPopover-root, .MuiMenu-root').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
                await this.page.waitForTimeout(300);
            }
        });
    }

    async submitUserForm() {
        await test.step('Submit user form (Continue → Add)', async () => {
            // Dismiss any open popover backdrop or press Escape
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.page.locator('.MuiPopover-root, .MuiMenu-root').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
            await this.page.waitForTimeout(300);

            await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.continueButton.click();

            // Wait for step 2 to appear
            await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
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

    async openEditUserForm() {
        await test.step('Open user edit form', async () => {
            await this.page.getByRole('cell', { name: 'Icon Button' }).getByLabel('Icon Button').first().click();
            await this.page.getByRole('button', { name: /Edit|Editar/i }).click();
            await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async selectLanguageInEditForm(language: string) {
        await test.step(`Select language in edit form: ${language}`, async () => {
            const langContainer = this.languageInput.locator('..');
            await langContainer.click();
            await this.page.waitForTimeout(400);

            let pattern = language;
            if (/catala/i.test(language)) pattern = 'Català|Catala';
            if (/espanol/i.test(language)) pattern = 'Español|Espanol';
            if (/valencia/i.test(language)) pattern = 'Valencià|Valencia';

            const option = this.page.getByRole('menuitem', { name: new RegExp(`^(${pattern})$`, 'i') })
                .or(this.page.getByRole('option', { name: new RegExp(`^(${pattern})$`, 'i') }))
                .or(this.page.locator('.MuiMenuItem-root').filter({ hasText: new RegExp(`^(${pattern})$`, 'i') }))
                .first();
            await option.click();
            await this.page.waitForTimeout(300);
        });
    }

    async saveUserEditForm() {
        await test.step('Save user edit form', async () => {
            await this.page.waitForTimeout(400);
            const saveButton = this.page.getByRole('button', { name: /Save|Guardar/i });
            await saveButton.click();
        });
    }

    async verifyEmailIsDisabled(expectedEmail?: string) {
        await test.step('Verify email input is disabled/read-only in edit form', async () => {
            await expect(this.emailInput).toBeDisabled({ timeout: 5000 });
            if (expectedEmail) {
                await expect(this.emailInput).toHaveValue(expectedEmail);
            }
        });
    }

    async verifyLanguageInEditForm(expectedLanguage: string) {
        await test.step(`Verify language in edit form is: ${expectedLanguage}`, async () => {
            let pattern = expectedLanguage;
            if (/catala/i.test(expectedLanguage)) pattern = 'Català|Catala';
            if (/espanol/i.test(expectedLanguage)) pattern = 'Español|Espanol';
            if (/valencia/i.test(expectedLanguage)) pattern = 'Valencià|Valencia';

            await expect(this.languageInput).toHaveValue(new RegExp(`^(${pattern})$`, 'i'), { timeout: 5000 });
        });
    }

    async verifyPhoneInEditForm(expectedPhone: string) {
        await test.step(`Verify phone in edit form contains: ${expectedPhone}`, async () => {
            await expect(this.phoneInput).toHaveValue(expectedPhone, { timeout: 5000 });
        });
    }

    async editUser(newData: Partial<UserData>) {
        await test.step(`Edit user with new data`, async () => {
            // Click the actions menu (Icon Button) on the first user row
            await this.openEditUserForm();

            // Fill only the fields that are provided
            if (newData.name) {
                await this.nameInput.clear();
                await this.nameInput.fill(newData.name);
            }
            if (newData.surname) {
                await this.surnameInput.clear();
                await this.surnameInput.fill(newData.surname);
            }
            if (newData.phone) {
                await this.phoneInput.clear();
                await this.phoneInput.fill(newData.phone);
                await this.phoneInput.blur();
            } else if (newData.surname) {
                await this.surnameInput.blur();
            } else if (newData.name) {
                await this.nameInput.blur();
            }

            if (newData.language) {
                await this.selectLanguageInEditForm(newData.language);
            }

            // Save form
            await this.saveUserEditForm();
        });
    }

    async verifyUserEditedAlert() {
        await test.step('Verify user edited success alert', async () => {
            await expect(this.page.getByRole('alert')).toContainText(MESSAGES.USER_EDITED, { timeout: 10000 });
        });
    }

    async verifyUserFormValidation() {
        await test.step('Verify user form validation errors', async () => {
            // Try to submit without filling required fields
            await this.continueButton.click();

            // Verify validation error messages appear
            const errorMessages = this.page.locator('text=This field is required');
            await expect(errorMessages.first()).toBeVisible({ timeout: 5000 });
            const errorCount = await errorMessages.count();
            expect(errorCount, 'Expected at least one validation error').toBeGreaterThan(0);
        });
    }

    async verifyNoSearchResults() {
        await test.step('Verify no search results found', async () => {
            await this.page.waitForTimeout(1000);
            // Check for the empty state message shown when search has no results
            await expect(this.page.getByText('There are no results for your search. Please, check your selection and try again.')).toBeVisible({ timeout: 5000 });
        });
    }

    async verifyUserNotInTable(fullName: string) {
        await test.step(`Verify user "${fullName}" is NOT in the table`, async () => {
            await this.page.waitForTimeout(1000);
            await expect(this.page.locator('tbody')).not.toContainText(fullName, { timeout: 5000 });
        });
    }

    async cancelUserForm() {
        await test.step('Cancel user form', async () => {
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(800);
        });
    }

    async clickBackButton() {
        await test.step('Click back button', async () => {
            if (await this.backButton.isVisible({ timeout: 3000 }).catch(() => false)) {
                await this.backButton.click();
            } else {
                await this.page.keyboard.press('Escape');
            }
            await this.page.waitForTimeout(500);
            await this.dismissToastOrModal();
        });
    }

    /**
     * Creates an Admin Agent user ('professionalAdmin') via GraphQL API.
     * Can be called directly on usersPage fixture in any test.
     */
    async createAdminAgentUserViaApi(options: Omit<CreateUserApiOptions, 'role'> = {}): Promise<CreatedUserData> {
        return await test.step('Create Admin Agent user via API', async () => {
            return await UserApiHelper.createAdminAgentUser(this.page.request, options);
        });
    }

    /**
     * Creates any user with specified role and permissions via GraphQL API.
     */
    async createUserViaApi(options: CreateUserApiOptions = {}): Promise<CreatedUserData> {
        return await test.step(`Create user (${options.role || 'professionalAdmin'}) via API`, async () => {
            return await UserApiHelper.createUser(this.page.request, options);
        });
    }
}
