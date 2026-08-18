import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { DataGenerator } from '../../utils/DataGenerator';
import { MESSAGES } from '../../utils/Constants';

export class SupportPage extends BasePage {
    readonly supportButton: Locator;
    readonly supportModal: Locator;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;
    readonly validationError: Locator;

    readonly userAccountDropdown: Locator;
    readonly supportMenuItem: Locator;

    constructor(page: Page) {
        super(page);
        
        // Help / Support icon on login page or header
        this.supportButton = page.locator('.ri-customer-service-2-line, .ri-question-line, .ri-help-line')
            .or(page.locator('div').filter({ hasText: /^Help$|^Ayuda$|^Soporte$/i }))
            .or(page.getByRole('button', { name: /support|soporte|help|ayuda/i }))
            .first();

        // User account dropdown in dashboard header
        this.userAccountDropdown = page.locator('#cbx-header-third-dropdown-user')
            .or(page.getByRole('button', { name: 'Actions Button' }))
            .or(page.locator('header button:has(img)'))
            .first();

        // Support option in account dropdown
        this.supportMenuItem = page.locator('#user-settings-contact-support')
            .or(page.getByRole('menuitem', { name: /^Support$|^Soporte$/i }))
            .or(page.locator('.cbx-dropdown-presentation').getByText(/^Support$|^Soporte$/i))
            .first();

        // Contact / Support modal drawer
        this.supportModal = page.locator('div:has(h6:has-text("Contact")), div:has(h6:has-text("Support")), .MuiDrawer-paperAnchorRight, .MuiDrawer-paper, .MuiDialog-paper, [role="dialog"], .cbx-drawerPanel-container')
            .filter({ has: page.getByRole('heading', { name: /Contact|Support|Soporte|Contacto/i }).or(page.getByText(/Support|Soporte|Contact/i)) })
            .first();

        // Input fields in Contact modal (Name = input 0, Surname = input 1, Email = input 2)
        this.nameInput = this.supportModal.locator('input').nth(0)
            .or(page.locator('input[name="name"], input#name'))
            .first();

        this.surnameInput = this.supportModal.locator('input').nth(1)
            .or(page.locator('input[name="surname"], input#surname'))
            .first();

        this.emailInput = this.supportModal.locator('input').nth(2)
            .or(page.locator('input[name="email"], input#email, input[type="email"]'))
            .first();

        this.messageInput = page.locator('#support-contact-message')
            .or(this.supportModal.locator('textarea'))
            .or(page.locator('textarea[name="message"], textarea'))
            .first();

        this.sendButton = this.supportModal.locator('button').filter({ hasText: /Send|Enviar/i })
            .or(page.locator('button').filter({ hasText: /^Send$|^Enviar$/i }))
            .or(page.locator('button[type="submit"]'))
            .first();

        this.validationError = page.getByText(/Required|Obligatorio|This field is required|Este campo es obligatorio/i).first();
    }

    async openSupportModalFromUserMenu() {
        await test.step('Open Support modal from user account menu', async () => {
            await this.dismissToastOrModal();
            await this.userAccountDropdown.waitFor({ state: 'visible', timeout: 15000 });
            await this.userAccountDropdown.click();
            await this.supportMenuItem.waitFor({ state: 'visible', timeout: 10000 });
            await this.supportMenuItem.click();
            await this.messageInput.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async fillMessage(message: string) {
        await test.step(`Fill message in support modal (length: ${message.length})`, async () => {
            await this.messageInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.messageInput.fill(message);
        });
    }

    async verifyMessageCharacterLimit(maxAllowedLength: number = 500) {
        await test.step(`Verify message input does not exceed ${maxAllowedLength} characters`, async () => {
            const value = await this.messageInput.inputValue();
            expect(value.length, `Message length (${value.length}) exceeded allowed maximum (${maxAllowedLength})`).toBeLessThanOrEqual(maxAllowedLength);

            const maxLengthAttr = await this.messageInput.getAttribute('maxlength');
            if (maxLengthAttr) {
                expect(Number(maxLengthAttr)).toBe(maxAllowedLength);
            }
        });
    }

    async verifyCharacterCounter(expectedCounter: string = '500/500') {
        await test.step(`Verify character counter displays "${expectedCounter}"`, async () => {
            const counterRegex = new RegExp(expectedCounter.replace('/', '\\s*\\/\\s*'));
            const counter = this.page.getByText(counterRegex).first();
            await expect(counter).toBeVisible({ timeout: 5000 });
        });
    }

    async clickSendButton() {
        await test.step('Click Send button in support modal', async () => {
            await this.sendButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.sendButton.click();
        });
    }

    async verifyMessageSentAlert() {
        await test.step('Verify support message sent success alert', async () => {
            await expect(this.page.getByRole('alert')).toContainText(MESSAGES.SUPPORT_MESSAGE_SENT, { timeout: 10000 });
        });
    }

    async sendSupportMessage(message: string) {
        await test.step(`Send support message: "${message}"`, async () => {
            await this.fillMessage(message);
            await this.clickSendButton();
        });
    }

    async closeSupportModal() {
        await test.step('Close Support modal', async () => {
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
        });
    }

    async openSupportModal() {
        await test.step('Open Support modal', async () => {
            await this.dismissModal();
            const isOpened = await this.supportModal.isVisible({ timeout: 2000 }).catch(() => false);
            if (!isOpened) {
                await this.supportButton.waitFor({ state: 'visible', timeout: 15000 });
                await this.supportButton.click();
            }
            await this.supportModal.waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    async sendMessageWithoutName(email?: string, message?: string, surname?: string) {
        await test.step('Attempt to send support message without populating Name field', async () => {
            const user = DataGenerator.randomUserData();
            const surnameVal = surname || user.surname;
            const emailVal = email || user.email;
            const messageVal = message || DataGenerator.randomSupportMessage();

            if (await this.surnameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.surnameInput.fill(surnameVal);
            }

            if (await this.emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.emailInput.fill(emailVal);
            }

            if (await this.messageInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.messageInput.fill(messageVal);
            }

            if (await this.nameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.nameInput.clear();
            }

            await this.sendButton.click();
        });
    }

    async verifyCannotSendMessageWithoutName() {
        await test.step('Verify message cannot be sent without Name field', async () => {
            const isModalVisible = await this.supportModal.isVisible().catch(() => false);
            expect(isModalVisible, 'Support modal should remain open when Name field is empty').toBe(true);

            await expect(this.validationError).toBeVisible({ timeout: 5000 });
        });
    }

    async sendMessageWithoutSurname(name?: string, email?: string, message?: string) {
        await test.step('Attempt to send support message without populating Surname field', async () => {
            const user = DataGenerator.randomUserData();
            const nameVal = name || user.name;
            const emailVal = email || user.email;
            const messageVal = message || DataGenerator.randomSupportMessage();

            if (await this.nameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.nameInput.fill(nameVal);
            }

            if (await this.emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.emailInput.fill(emailVal);
            }

            if (await this.messageInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.messageInput.fill(messageVal);
            }

            if (await this.surnameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.surnameInput.clear();
            }

            await this.sendButton.click();
        });
    }

    async verifyCannotSendMessageWithoutSurname() {
        await test.step('Verify message cannot be sent without Surname field', async () => {
            const isModalVisible = await this.supportModal.isVisible().catch(() => false);
            expect(isModalVisible, 'Support modal should remain open when Surname field is empty').toBe(true);

            await expect(this.validationError).toBeVisible({ timeout: 5000 });
        });
    }

    async sendMessageWithoutEmail(name?: string, surname?: string, message?: string) {
        await test.step('Attempt to send support message without populating Email field', async () => {
            const user = DataGenerator.randomUserData();
            const nameVal = name || user.name;
            const surnameVal = surname || user.surname;
            const messageVal = message || DataGenerator.randomSupportMessage();

            if (await this.nameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.nameInput.fill(nameVal);
            }

            if (await this.surnameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.surnameInput.fill(surnameVal);
            }

            if (await this.messageInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.messageInput.fill(messageVal);
            }

            if (await this.emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.emailInput.clear();
            }

            await this.sendButton.click();
        });
    }

    async verifyCannotSendMessageWithoutEmail() {
        await test.step('Verify message cannot be sent without Email field', async () => {
            const isModalVisible = await this.supportModal.isVisible().catch(() => false);
            expect(isModalVisible, 'Support modal should remain open when Email field is empty').toBe(true);

            await expect(this.validationError).toBeVisible({ timeout: 5000 });
        });
    }
}
