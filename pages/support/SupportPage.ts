import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SupportPage extends BasePage {
    readonly supportButton: Locator;
    readonly supportModal: Locator;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;
    readonly nameValidationError: Locator;

    constructor(page: Page) {
        super(page);
        
        // Help / Support icon on login page or header
        this.supportButton = page.locator('.ri-customer-service-2-line, .ri-question-line, .ri-help-line')
            .or(page.locator('div').filter({ hasText: /^Help$|^Ayuda$|^Soporte$/i }))
            .or(page.getByRole('button', { name: /support|soporte|help|ayuda/i }))
            .first();

        // Contact / Support modal drawer
        this.supportModal = page.locator('div:has(h6:has-text("Contact")), div:has(h6:has-text("Support")), .MuiDrawer-paperAnchorRight, .MuiDrawer-paper, .MuiDialog-paper, [role="dialog"]')
            .filter({ has: page.getByRole('heading', { name: /Contact|Support|Soporte|Contacto/i }) })
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

        this.messageInput = this.supportModal.locator('textarea')
            .or(page.locator('textarea[name="message"], #support-contact-message'))
            .first();

        this.sendButton = this.supportModal.locator('button').filter({ hasText: /Send|Enviar/i })
            .or(page.locator('button[type="submit"]'))
            .first();

        this.nameValidationError = page.getByText(/Required|Obligatorio|Name is required|El nombre es obligatorio/i).first();
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

    async sendMessageWithoutName(email: string, message: string) {
        await test.step('Attempt to send support message without populating Name field', async () => {
            if (await this.surnameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.surnameInput.fill('TestSurname');
            }

            if (await this.emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.emailInput.fill(email);
            }

            if (await this.messageInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.messageInput.fill(message);
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

            await expect(this.nameValidationError).toBeVisible({ timeout: 5000 });
        });
    }
}
