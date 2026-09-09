import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';
import { UserApiHelper, CreateUserApiOptions, CreatedUserData, UserRole } from '../../utils/users/UserApiHelper';
import { UserDataStore } from '../../utils/users/UserDataStore';

export type { CreateUserApiOptions, CreatedUserData, UserRole };
export { UserDataStore };

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
        this.continueButton = page.locator('.cbx-drawerPanel-container, .MuiDrawer-root, form, .MuiDialog-root').getByRole('button', { name: /Continue|Continuar/i }).or(page.getByRole('button', { name: /Continue|Continuar/i })).first();
        this.addButton = page.locator('.cbx-drawerPanel-container, .MuiDrawer-root, form, .MuiDialog-root').getByRole('button', { name: /^Add$|^Añadir$|^Guardar$/i }).or(page.getByRole('button', { name: /^Add$|^Añadir$|^Guardar$/i })).first();
        this.searchInput = page.locator('#search-users-input').or(page.getByRole('textbox', { name: /Search/i })).or(page.locator('input[placeholder*="Search" i]')).or(page.locator('input[placeholder*="Buscar" i]')).first();
        this.backButton = page.getByRole('button', { name: /Back|Volver|Atrás|Close drawer panel/i })
            .or(page.locator('[aria-label="Close drawer panel"], [aria-label*="close drawer" i], [aria-label*="back" i], [aria-label*="volver" i]'))
            .or(page.locator('button:has(.ri-arrow-left-line), button:has(.ri-arrow-left-s-line), button:has(.ri-close-line), button:has(i[class*="arrow-left"]), .ri-arrow-left-line, i.ri-arrow-left-line'))
            .or(page.locator('#back-button'))
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
            const langContainer = this.languageInput.locator('..')
                .or(this.page.locator('[id*="language"]').locator('..'))
                .or(this.page.locator('.MuiDrawer-root, form, .cbx-drawerPanel-container').getByText(/Language|Idioma/i))
                .first();
            await langContainer.click();
            await this.page.waitForTimeout(400);

            const langIdMap: Record<string, string> = {
                'español': 'language-es',
                'espanol': 'language-es',
                'spanish': 'language-es',
                'català': 'language-cat',
                'catala': 'language-cat',
                'galego': 'language-gal',
                'galician': 'language-gal',
                'euskera': 'language-eu',
                'basque': 'language-eu',
                'english': 'language-en',
                'valencià': 'language-vl',
                'valencia': 'language-vl',
                'valencian': 'language-vl',
                'italiano': 'language-it',
                'italian': 'language-it',
            };

            const targetId = langIdMap[language.toLowerCase()];
            const optionById = targetId ? this.page.locator(`#${targetId}`) : null;

            if (optionById && await optionById.isVisible({ timeout: 1500 }).catch(() => false)) {
                await optionById.click();
            } else {
                let pattern = language;
                if (/catala/i.test(language)) pattern = 'Català|Catala';
                if (/espanol/i.test(language)) pattern = 'Español|Espanol';
                if (/valencia/i.test(language)) pattern = 'Valencià|Valencia';

                const option = this.page.getByRole('menuitem', { name: new RegExp(`^(${pattern})$`, 'i') })
                    .or(this.page.getByRole('option', { name: new RegExp(`^(${pattern})$`, 'i') }))
                    .or(this.page.locator('.MuiMenuItem-root, li').filter({ hasText: new RegExp(`^(${pattern})$`, 'i') }))
                    .first();
                await option.click();
            }

            // Ensure dropdown backdrop or popover is closed before proceeding
            await this.page.locator('.cbx-selectInput-backdrop, .MuiPopover-root, .MuiMenu-root').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
            await this.page.waitForTimeout(300);
        });
    }

    async clickReturnFromAddUser() {
        await test.step('Click Return/Back button in Add user form', async () => {
            const returnBtn = this.page.getByRole('button', { name: /Close drawer panel|Volver|Back/i })
                .or(this.page.locator('[aria-label="Close drawer panel"], [aria-label*="close drawer" i]'))
                .or(this.backButton)
                .first();
            await returnBtn.waitFor({ state: 'visible', timeout: 10000 });
            await returnBtn.click();
            await this.nameInput.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
            await this.addUserButton.waitFor({ state: 'visible', timeout: 10000 });
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

    async clickContinue() {
        await test.step('Click Continue button in Add User form', async () => {
            // Dismiss any open popover backdrop or press Escape
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.page.locator('.MuiPopover-root, .MuiMenu-root').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
            await this.page.waitForTimeout(300);

            await this.continueButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.continueButton.click();
        });
    }

    async verifyFieldError(inputLocator: Locator, expectedErrorText: string | RegExp = /This field is required|requerido/i) {
        await test.step(`Verify field validation error: ${expectedErrorText}`, async () => {
            await expect(inputLocator).toHaveClass(/cbx-inputText-error/, { timeout: 5000 });
            const errorMsg = inputLocator.locator('xpath=ancestor::div[contains(@class, "cbx-inputText-allContainer")]//div[contains(@class, "cbx-inputText-container-helpers")]//p');
            await expect(errorMsg).toBeVisible({ timeout: 5000 });
            await expect(errorMsg).toContainText(expectedErrorText, { timeout: 5000 });
        });
    }

    async verifyNameError(expectedError: string | RegExp = /This field is required|requerido/i) {
        await this.verifyFieldError(this.nameInput, expectedError);
    }

    async verifySurnameError(expectedError: string | RegExp = /This field is required|requerido/i) {
        await this.verifyFieldError(this.surnameInput, expectedError);
    }

    async verifyEmailError(expectedError: string | RegExp = /This field is required|requerido/i) {
        await this.verifyFieldError(this.emailInput, expectedError);
    }

    async verifyPhoneError(expectedError: string | RegExp = /This field is required|requerido/i) {
        await this.verifyFieldError(this.phoneInput, expectedError);
    }

    async selectEntityInStep2(entityName: string) {
        await test.step(`Select entity "${entityName}" in Step 2 of Add User form`, async () => {
            // Wait for step 2 Add button and entities table to appear
            await this.addButton.waitFor({ state: 'visible', timeout: 10000 });

            const entitiesTable = this.page.locator('table').filter({ hasText: /Assignment|Asignación/i });
            await entitiesTable.waitFor({ state: 'visible', timeout: 10000 });

            // Check if entity is already visible in table rows
            const entityRow = entitiesTable.locator('tbody tr').filter({ hasText: entityName }).first();
            if (await entityRow.isVisible({ timeout: 2000 }).catch(() => false)) {
                const checkbox = entityRow.locator('input[type="checkbox"]');
                await checkbox.check({ force: true });
            } else {
                // Search entity
                const searchInput = this.page.locator('input[placeholder*="Search entity" i], input[placeholder*="Buscar" i]').first();
                if (await searchInput.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await searchInput.fill(entityName);
                    await this.page.waitForTimeout(500);
                }
                const searchedRow = entitiesTable.locator('tbody tr').filter({ hasText: entityName }).first();
                await searchedRow.waitFor({ state: 'visible', timeout: 5000 });
                await searchedRow.locator('input[type="checkbox"]').check({ force: true });
            }
        });
    }

    async submitAddUserStep2() {
        await test.step('Click Add button in Step 2 of Add User form', async () => {
            await this.addButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.addButton.click();
        });
    }

    async cancelUserForm() {
        await test.step('Cancel user form', async () => {
            const returnBtn = this.page.locator('[aria-label="Close drawer panel"], [aria-label*="close drawer" i]');
            if (await returnBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                await returnBtn.click();
            } else {
                await this.page.keyboard.press('Escape');
            }
            await this.addUserButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            await this.page.waitForTimeout(500);
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

    /**
     * Deletes a user by ID via GraphQL API.
     */
    async deleteUserViaApi(userId: number | string): Promise<boolean> {
        return await test.step(`Delete user #${userId} via API`, async () => {
            return await UserApiHelper.deleteUser(this.page.request, userId);
        });
    }

    /**
     * Deletes user(s) by email via GraphQL API.
     */
    async deleteUserByEmailViaApi(email: string): Promise<boolean> {
        return await test.step(`Delete user by email "${email}" via API`, async () => {
            return await UserApiHelper.deleteUserByEmail(this.page.request, email);
        });
    }

    /**
     * Verifies that the External ID column header is displayed in the users table (XR-3032).
     */
    async verifyExternalIdHeaderDisplayed() {
        await test.step('Verify External ID header is displayed in the users table', async () => {
            const externalIdHeader = this.page.locator('table thead th').filter({ hasText: /External ID|ID externo/i }).first();
            await expect(externalIdHeader).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Verifies that ratings in the users table are shown in the proper colour (XR-3060).
     */
    async verifyRatingColorsInTable() {
        await test.step('Verify ratings are showing in proper colour on the Users page', async () => {
            let ratingSpan = this.page.locator('table tbody tr span[style*="var(--success)"]').first();
            if (!await ratingSpan.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.searchUser('Ammar');
                ratingSpan = this.page.locator('table tbody tr span[style*="var(--success)"]').first();
            }
            await expect(ratingSpan).toBeVisible({ timeout: 10000 });
            const color = await ratingSpan.evaluate(el => window.getComputedStyle(el).color);
            expect(color).toBe('rgb(18, 136, 81)');
        });
    }

    /**
     * Opens the column sort dropdown in the first table header and selects Name or Surname (XR-2989, XR-2988).
     */
    async selectColumnSortOption(option: 'Name' | 'Surname') {
        await test.step(`Select sort option "${option}" from column header dropdown`, async () => {
            const dropdownIcon = this.page.locator('th .ri-arrow-up-down-line').first();
            await dropdownIcon.waitFor({ state: 'visible', timeout: 10000 });
            await dropdownIcon.click();
            await this.page.waitForTimeout(400);

            const pattern = option === 'Name' ? /^Name$|^Nombre$/i : /^Surnames?$|^Apellidos?$/i;
            const optionItem = this.page.locator('.cbx-dropdown-options li, .MuiMenu-paper li, ul[role="menu"] li').filter({ hasText: pattern }).first();
            await optionItem.waitFor({ state: 'visible', timeout: 5000 });
            await optionItem.click();
            await this.page.waitForTimeout(500);

            // Verify header text updated
            const header = this.page.locator('table thead th').first();
            await expect(header).toContainText(pattern, { timeout: 5000 });
        });
    }

    /**
     * Clicks the sort arrow in the first column header to sort table rows (XR-2989, XR-2988).
     */
    async clickSortArrowInFirstColumn() {
        await test.step('Click sort arrow in first column header', async () => {
            const sortArrow = this.page.locator('th:first-child .cbx-table-sort-label-arrow, th:first-child [class*="cbx-table-sort-label-arrow"]').first();
            await sortArrow.waitFor({ state: 'visible', timeout: 5000 });
            await sortArrow.click();
            await this.page.waitForTimeout(800);
            await expect(this.page.locator('table tbody tr').first()).toBeVisible({ timeout: 5000 });
        });
    }

    /**
     * Clicks on a user row in the table to open user details (XR-2967, XR-2999, XR-3000, XR-3001).
     */
    async clickUserRow(userName: string) {
        await test.step(`Click on user row: "${userName}"`, async () => {
            let row = this.page.locator('table tbody tr').filter({ hasText: userName }).first();
            if (!await row.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.searchUser(userName);
                row = this.page.locator('table tbody tr').filter({ hasText: userName }).first();
            }
            await row.waitFor({ state: 'visible', timeout: 10000 });
            const cell = row.locator('td:first-child');
            await cell.click();
            await this.page.waitForURL(/\/users\/\d+\/edit/i, { timeout: 10000 });
        });
    }

    /**
     * Navigates to Appointments tab on user details page (XR-2967).
     */
    async clickAppointmentsTabOnUserDetails() {
        await test.step('Click Appointments tab on user details', async () => {
            const appointmentsTab = this.page.getByRole('button', { name: /APPOINTMENTS|CITAS/i }).or(this.page.locator('button').filter({ hasText: /APPOINTMENTS|CITAS/i })).first();
            await appointmentsTab.waitFor({ state: 'visible', timeout: 10000 });
            await appointmentsTab.click();
            await this.page.waitForURL(/\/appointments/i, { timeout: 10000 });
        });
    }

    /**
     * Verifies that the appointments table is displayed on user details page (XR-2967).
     */
    async verifyUserAppointmentsTableDisplayed() {
        await test.step('Verify user appointments table is displayed with records', async () => {
            const table = this.page.locator('table').first();
            await expect(table).toBeVisible({ timeout: 10000 });
            const headers = this.page.locator('table thead th');
            await expect(headers.first()).toBeVisible({ timeout: 5000 });
            const rows = this.page.locator('table tbody tr');
            await expect(rows.first()).toBeVisible({ timeout: 10000 });
            const rowCount = await rows.count();
            expect(rowCount).toBeGreaterThan(0);
        });
    }

    /**
     * Verifies that the Activity tab is displayed on user details page (XR-2999).
     */
    async verifyActivityTabDisplayed() {
        await test.step('Verify Activity tab is displayed on user details', async () => {
            const activityTab = this.page.getByRole('button', { name: /ACTIVITY|ACTIVIDAD/i }).or(this.page.locator('button').filter({ hasText: /ACTIVITY|ACTIVIDAD/i })).first();
            await expect(activityTab).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Clicks the Activity tab on user details page (XR-3000, XR-3001).
     */
    async clickActivityTabOnUserDetails() {
        await test.step('Click Activity tab on user details', async () => {
            const activityTab = this.page.getByRole('button', { name: /ACTIVITY|ACTIVIDAD/i }).or(this.page.locator('button').filter({ hasText: /ACTIVITY|ACTIVIDAD/i })).first();
            await activityTab.waitFor({ state: 'visible', timeout: 10000 });
            await activityTab.click();
            await this.page.waitForURL(/\/activity/i, { timeout: 10000 });
        });
    }

    /**
     * Modifies month on Activity tab using < and > buttons (XR-3000).
     */
    async modifyMonthOnActivityTab() {
        await test.step('Modify month on Activity tab using < and > buttons', async () => {
            const leftArrow = this.page.locator('.ri-arrow-left-s-line').first();
            const rightArrow = this.page.locator('.ri-arrow-right-s-line').first();
            await leftArrow.waitFor({ state: 'visible', timeout: 10000 });
            await rightArrow.waitFor({ state: 'visible', timeout: 10000 });

            // Read container text that holds the month and year
            const getMonthText = async () => {
                return await this.page.evaluate(() => {
                    const arrow = document.querySelector('.ri-arrow-left-s-line');
                    const container = arrow?.closest('div[style*="flex"]')?.parentElement;
                    return container?.innerText.replace(/\s+/g, ' ').trim() || '';
                });
            };

            const initialMonth = await getMonthText();
            expect(initialMonth).toBeTruthy();

            // Click left arrow (<) to go to previous month
            await leftArrow.click();
            await this.page.waitForTimeout(500);
            const prevMonth = await getMonthText();
            expect(prevMonth).not.toBe(initialMonth);

            // Click right arrow (>) to return to original month
            await rightArrow.click();
            await this.page.waitForTimeout(500);
            const returnedMonth = await getMonthText();
            expect(returnedMonth).toBe(initialMonth);
        });
    }

    /**
     * Hovers over the charts on the Activity tab (XR-3001).
     */
    async hoverOverActivityChart() {
        await test.step('Hover over charts on Activity tab', async () => {
            const chart = this.page.locator('svg[viewBox="0 0 583 360"], svg:has(path[fill]), .recharts-surface').first();
            await chart.waitFor({ state: 'visible', timeout: 10000 });
            await chart.hover();
            await this.page.waitForTimeout(500);
            await expect(chart).toBeVisible();
        });
    }
}
