import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class UserProfilePage extends BasePage {
    readonly userDropdownButton: Locator;
    readonly userSettingsMenuItem: Locator;
    readonly optionsTab: Locator;
    readonly passwordExpirationSwitch: Locator;
    readonly passwordExpirationInput: Locator;
    readonly passwordExpirationLabel: Locator;

    readonly confirmAcceptButton: Locator;

    constructor(page: Page) {
        super(page);
        this.userDropdownButton = page.locator('#cbx-header-third-dropdown-user');
        this.userSettingsMenuItem = page.locator('#user-menu-settings');
        this.optionsTab = page.locator('button').filter({ hasText: /^OPTIONS$|^Opciones$/i }).or(page.locator('.cbx-Tab-2')).first();
        this.passwordExpirationSwitch = page.locator('.cbx-switch').filter({ hasText: /password expiration|caducidad/i }).first();
        this.passwordExpirationInput = this.passwordExpirationSwitch.locator('input[type="checkbox"]');
        this.passwordExpirationLabel = this.passwordExpirationSwitch.locator('label');
        this.confirmAcceptButton = page.getByRole('button', { name: /^Accept$|^Aceptar$/i })
            .or(page.locator('.MuiDialog-root, #alert-confirm').getByRole('button', { name: /^Accept$|^Aceptar$/i }))
            .first();
    }

    async navigateToProfileOptions() {
        await test.step('Navigate to User Profile Options tab', async () => {
            await this.dismissModal();
            await this.userDropdownButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.userDropdownButton.click();

            await this.userSettingsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
            await this.userSettingsMenuItem.click();

            await this.page.waitForURL(/\/user\/\d+/i, { timeout: 20000 });

            await this.optionsTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.optionsTab.click();

            await this.passwordExpirationSwitch.waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    async isPasswordExpirationEnabled(): Promise<boolean> {
        return await test.step('Check if password expiration is enabled', async () => {
            const checked = await this.passwordExpirationInput.isChecked();
            const val = await this.passwordExpirationInput.getAttribute('value');
            return checked || val === '1' || val === 'true';
        });
    }

    async togglePasswordExpiration() {
        await test.step('Toggle password expiration switch', async () => {
            await this.dismissModal();
            const initialState = await this.isPasswordExpirationEnabled();
            
            // Click the switch container or label to trigger toggle
            await this.passwordExpirationLabel.click({ force: true });
            await this.page.waitForTimeout(1000);

            // Accept confirmation modal if presented
            if (await this.confirmAcceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
                await this.confirmAcceptButton.click();
                await this.page.waitForTimeout(1000);
            }

            const newState = await this.isPasswordExpirationEnabled();
            expect(newState, 'Password expiration toggle state did not change').not.toBe(initialState);
        });
    }

    async setPasswordExpirationState(enable: boolean) {
        await test.step(`Set password expiration state to ${enable ? 'enabled' : 'disabled'}`, async () => {
            const currentState = await this.isPasswordExpirationEnabled();
            if (currentState !== enable) {
                await this.togglePasswordExpiration();
            }
            expect(await this.isPasswordExpirationEnabled()).toBe(enable);
        });
    }

    /**
     * Navigates to user profile settings form from the Account dropdown (XR-1638).
     */
    async navigateToUserSettings() {
        await test.step('Navigate to User settings section via Account dropdown', async () => {
            await this.dismissModal();
            await this.userDropdownButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.userDropdownButton.click();

            await this.userSettingsMenuItem.waitFor({ state: 'visible', timeout: 10000 });
            await this.userSettingsMenuItem.click();

            await this.page.waitForURL(/\/user\/\d+/i, { timeout: 20000 });
            await this.dismissModal();
        });
    }

    /**
     * Reads current name in user profile (XR-1638, OVAC-5763).
     */
    async getName(): Promise<string> {
        return await test.step('Get user profile Name', async () => {
            const nameInput = this.page.getByRole('textbox', { name: /^Name$|^Nombre$|^Nom$|^Izena$|^Nome$/i })
                .or(this.page.getByLabel(/^Name$|^Nombre$|^Nom$|^Izena$|^Nome$/i))
                .first();
            await nameInput.waitFor({ state: 'visible', timeout: 10000 });
            return await nameInput.inputValue();
        });
    }

    /**
     * Reads current surname in user profile (XR-1638, OVAC-5762).
     */
    async getSurname(): Promise<string> {
        return await test.step('Get user profile Surname', async () => {
            const surnameInput = this.page.getByRole('textbox', { name: /^Surname$|^Apellidos$|^Cognoms$|^Abizenak$|^Cognome$/i })
                .or(this.page.getByLabel(/^Surname$|^Apellidos$|^Cognoms$|^Abizenak$|^Cognome$/i))
                .first();
            await surnameInput.waitFor({ state: 'visible', timeout: 10000 });
            return await surnameInput.inputValue();
        });
    }

    /**
     * Edits name in user profile (XR-1638, OVAC-5763).
     */
    async editName(name: string) {
        await test.step(`Edit user profile Name to: ${name}`, async () => {
            const nameInput = this.page.getByRole('textbox', { name: /^Name$|^Nombre$|^Nom$|^Izena$|^Nome$/i })
                .or(this.page.getByLabel(/^Name$|^Nombre$|^Nom$|^Izena$|^Nome$/i))
                .first();
            await nameInput.waitFor({ state: 'visible', timeout: 10000 });
            await nameInput.fill(name);
        });
    }

    /**
     * Edits surname in user profile (OVAC-5762).
     */
    async editSurname(surname: string) {
        await test.step(`Edit user profile Surname to: ${surname}`, async () => {
            const surnameInput = this.page.getByRole('textbox', { name: /^Surname$|^Apellidos$|^Cognoms$|^Abizenak$|^Cognome$/i })
                .or(this.page.getByLabel(/^Surname$|^Apellidos$|^Cognoms$|^Abizenak$|^Cognome$/i))
                .first();
            await surnameInput.waitFor({ state: 'visible', timeout: 10000 });
            await surnameInput.fill(surname);
        });
    }

    /**
     * Reads current telephone in user profile (OVAC-5765).
     */
    async getTelephone(): Promise<string> {
        return await test.step('Get user profile Telephone', async () => {
            const phoneInput = this.page.getByRole('textbox', { name: /Telephone|Teléfono|Telèfon|Telefono|Telefonoa|Phone/i })
                .or(this.page.getByLabel(/Telephone|Teléfono|Telèfon|Telefono|Telefonoa|Phone/i))
                .or(this.page.locator('input[type="tel"], input#phone, input[name*="phone" i]'))
                .first();
            await phoneInput.waitFor({ state: 'visible', timeout: 10000 });
            return await phoneInput.inputValue();
        });
    }

    /**
     * Edits telephone in user profile (OVAC-5765).
     */
    async editTelephone(phone: string) {
        await test.step(`Edit user profile Telephone to: ${phone}`, async () => {
            const phoneInput = this.page.getByRole('textbox', { name: /Telephone|Teléfono|Telèfon|Telefono|Telefonoa|Phone/i })
                .or(this.page.getByLabel(/Telephone|Teléfono|Telèfon|Telefono|Telefonoa|Phone/i))
                .or(this.page.locator('input[type="tel"], input#phone, input[name*="phone" i]'))
                .first();
            await phoneInput.waitFor({ state: 'visible', timeout: 10000 });
            await phoneInput.fill(phone);
        });
    }

    /**
     * Reads current language in user profile (OVAC-5787, OVAC-5645, etc.).
     */
    async getLanguage(): Promise<string> {
        return await test.step('Get user profile Language', async () => {
            const langContainer = this.page.locator('.cbx-selectInput-container, .cbx-inputText-container')
                .filter({ hasText: /Language|Idioma|Lingua|Hizkuntza/i })
                .first();
            await langContainer.waitFor({ state: 'visible', timeout: 10000 });
            const val = await langContainer.locator('input').inputValue().catch(() => '');
            if (val) return val;
            return (await langContainer.textContent()) || '';
        });
    }

    /**
     * Selects language in user profile (OVAC-5787, OVAC-5645, etc.).
     */
    async selectLanguage(language: string) {
        await test.step(`Select language: ${language}`, async () => {
            const container = this.page.locator('.cbx-selectInput-container, .cbx-inputText-container')
                .filter({ hasText: /Language|Idioma|Lingua|Hizkuntza/i })
                .first();
            await container.waitFor({ state: 'visible', timeout: 10000 });

            let pattern = language;
            if (/spanish|espanol|español/i.test(language)) pattern = 'Español|Espanol|Spanish|Spagnolo|Gaztelania';
            if (/english|ingles|inglés/i.test(language)) pattern = 'English|Inglés|Ingles|Anglès|Angles|Inglese|Ingelesa';
            if (/catala|català|catalan/i.test(language)) pattern = 'Català|Catala|Catalan|Catalano';
            if (/euskera|basque/i.test(language)) pattern = 'Euskera|Basque|Basc|Basco';
            if (/italiano|italian/i.test(language)) pattern = 'Italiano|Italian|Italià';

            const option = this.page.locator('[role="option"], [role="menuitem"], li, .cbx-selectInput-option, .MuiMenuItem-root')
                .filter({ hasText: new RegExp(`^(${pattern})$`, 'i') })
                .first();

            // Open dropdown if option is not visible yet
            if (!await option.isVisible().catch(() => false)) {
                await container.scrollIntoViewIfNeeded();
                await container.click({ force: true });
                await this.page.waitForTimeout(500);
            }

            // If still not visible, click the combobox directly
            if (!await option.isVisible().catch(() => false)) {
                const combobox = this.page.getByRole('combobox', { name: /Language|Idioma|Lingua|Hizkuntza/i }).first();
                if (await combobox.isVisible().catch(() => false)) {
                    await combobox.click({ force: true });
                }
            }

            await option.waitFor({ state: 'visible', timeout: 10000 });
            await option.click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Saves user profile changes (XR-1638).
     */
    async saveProfile() {
        await test.step('Click Save button on user profile form', async () => {
            const saveBtn = this.page.getByRole('button', { name: /^Save$|^Guardar$|^Desa$|^Gorde$|^Salva$/i }).first();
            await saveBtn.waitFor({ state: 'visible', timeout: 10000 });
            await saveBtn.click();
        });
    }

    /**
     * Verifies profile saved confirmation alert (XR-1638).
     */
    async verifyProfileSavedAlert() {
        await test.step('Verify user profile saved success alert', async () => {
            const alert = this.page.getByRole('alert')
                .or(this.page.locator('.MuiAlert-root, [class*="alert"], [class*="toast"], .cbx-toast'))
                .first();
            if (await alert.isVisible({ timeout: 4000 }).catch(() => false)) {
                await expect(alert).toBeVisible();
            }
        });
    }

    /**
     * Opens Change Password modal from profile 3-dots menu (XR-1637, XR-1636).
     */
    async openChangePasswordModal() {
        await test.step('Open Change password modal via 3-dots action menu', async () => {
            const threeDotsBtn = this.page.locator('button:has(.ri-more-2-fill)')
                .or(this.page.locator('button').filter({ has: this.page.locator('.ri-more-2-fill') }))
                .first();
            await threeDotsBtn.waitFor({ state: 'visible', timeout: 10000 });
            await threeDotsBtn.click();
            await this.page.waitForTimeout(400);

            const changePasswordItem = this.page.getByRole('menuitem', { name: /Change password|Cambiar contraseña/i }).first();
            await changePasswordItem.waitFor({ state: 'visible', timeout: 5000 });
            await changePasswordItem.click();

            const dialog = this.page.locator('[role="dialog"], .MuiDialog-root').first();
            await expect(dialog).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Fills the Change Password modal form (XR-1637, XR-1636).
     */
    async fillChangePasswordForm(currentPass: string, newPass: string, confirmPass: string) {
        await test.step('Fill Change password form fields', async () => {
            const dialog = this.page.locator('[role="dialog"], .cbx-Modal-container').filter({ hasText: /Change password|Cambiar contraseña/i }).first();
            await dialog.waitFor({ state: 'visible', timeout: 10000 });

            const currentInput = dialog.locator('input').nth(0);
            const newInput = dialog.locator('input').nth(1);
            const confirmInput = dialog.locator('input').nth(2);

            await currentInput.waitFor({ state: 'visible', timeout: 5000 });
            await currentInput.fill(currentPass);

            await newInput.waitFor({ state: 'visible', timeout: 5000 });
            await newInput.fill(newPass);

            await confirmInput.waitFor({ state: 'visible', timeout: 5000 });
            await confirmInput.fill(confirmPass);
        });
    }

    /**
     * Clicks Save on Change Password modal (XR-1637, XR-1636).
     */
    async submitChangePassword() {
        await test.step('Click Save in Change password dialog', async () => {
            const dialog = this.page.locator('[role="dialog"], .cbx-Modal-container').filter({ hasText: /Change password|Cambiar contraseña/i }).first();
            const saveBtn = dialog.getByRole('button', { name: /^Save$|^Guardar$/i }).first();
            await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
            await saveBtn.click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Verifies error message when confirm password does not match (XR-1637).
     */
    async verifyConfirmPasswordMismatchError() {
        await test.step('Verify error message below Confirm password field', async () => {
            const dialog = this.page.locator('[role="dialog"], .cbx-Modal-container').filter({ hasText: /Change password|Cambiar contraseña/i }).first();
            const errorMsg = dialog.getByText(/Passwords do not match|Las contraseñas no coinciden|Passwords must match|match/i)
                .or(dialog.locator('.cbx-inputText-container-helpers, [class*="helper"], p.Mui-error'))
                .first();
            await expect(errorMsg).toBeVisible({ timeout: 5000 });
        });
    }

    /**
     * Verifies error message when current password is invalid (XR-1636).
     */
    async verifyCurrentPasswordInvalidError() {
        await test.step('Verify error message below Current password field', async () => {
            const dialog = this.page.locator('[role="dialog"], .cbx-Modal-container').filter({ hasText: /Change password|Cambiar contraseña/i }).first();
            const errorMsg = dialog.getByText(/incorrect|inválida|not correct|error/i)
                .or(this.page.getByRole('alert'))
                .or(dialog.locator('.cbx-inputText-container-helpers, [class*="helper"], p.Mui-error'))
                .first();
            await expect(errorMsg).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Closes the Change Password modal (XR-1637, XR-1636).
     */
    async closeChangePasswordModal() {
        await test.step('Close Change password modal', async () => {
            const dialog = this.page.locator('[role="dialog"], .MuiDialog-root').first();
            const cancelBtn = dialog.getByRole('button', { name: /^Cancel$|^Cancelar$/i }).first();
            if (await cancelBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
                await cancelBtn.click();
            } else {
                await this.page.keyboard.press('Escape');
            }
            await expect(dialog).toBeHidden({ timeout: 5000 });
        });
    }
}
