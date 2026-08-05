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
}
