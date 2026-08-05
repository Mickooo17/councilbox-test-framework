import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SupportPage extends BasePage {
    readonly supportButton: Locator;
    readonly supportModal: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly sendButton: Locator;
    readonly nameValidationError: Locator;

    constructor(page: Page) {
        super(page);
        this.supportButton = page.locator('#cbx-header-third-button-buttonSupport')
            .or(page.locator('button').filter({ hasText: /support|soporte|help|ayuda|contacto/i }))
            .or(page.locator('.ri-question-line, .ri-customer-service-2-line, .ri-help-line'))
            .or(page.getByRole('button', { name: /support|soporte|help|ayuda/i }))
            .first();

        this.supportModal = page.locator('.MuiDialog-root, #modal, [role="dialog"], .MuiDrawer-root').first();
        this.nameInput = page.locator('input[name="name"], input#name, input[placeholder*="Name" i], input[placeholder*="Nombre" i]')
            .or(page.getByLabel(/Name|Nombre/i))
            .first();
        this.emailInput = page.locator('input[name="email"], input#email, input[type="email"], input[placeholder*="Email" i], input[placeholder*="Correo" i]')
            .or(page.getByLabel(/Email|Correo/i))
            .first();
        this.messageInput = page.locator('textarea[name="message"], textarea#message, textarea[placeholder*="Message" i], textarea[placeholder*="Mensaje" i]')
            .or(page.getByLabel(/Message|Mensaje/i))
            .first();
        this.sendButton = page.getByRole('button', { name: /^Send$|^Enviar$/i })
            .or(page.locator('button[type="submit"]'))
            .or(page.locator('button').filter({ hasText: /Send|Enviar/i }))
            .first();
        this.nameValidationError = page.getByText(/Name is required|El nombre es obligatorio|This field is required|Este campo es obligatorio/i).first();
    }

    async openSupportModal() {
        await test.step('Open Support modal', async () => {
            await this.dismissModal();
            await this.supportButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.supportButton.click();
            await this.supportModal.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async sendMessageWithoutName(email: string, message: string) {
        await test.step('Attempt to send support message without populating Name field', async () => {
            if (await this.emailInput.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.emailInput.fill(email);
            }
            if (await this.messageInput.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.messageInput.fill(message);
            }
            if (await this.nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.nameInput.clear();
            }

            if (await this.sendButton.isEnabled({ timeout: 2000 }).catch(() => false)) {
                await this.sendButton.click();
            }
        });
    }

    async verifyCannotSendMessageWithoutName() {
        await test.step('Verify message cannot be sent without Name field', async () => {
            const isModalVisible = await this.supportModal.isVisible();
            expect(isModalVisible, 'Support modal should remain open when Name field is missing').toBe(true);

            const isButtonDisabled = !(await this.sendButton.isEnabled().catch(() => true));
            const isErrorVisible = await this.nameValidationError.isVisible().catch(() => false);
            const isInvalidAttr = await this.nameInput.getAttribute('aria-invalid').catch(() => null) === 'true';

            expect(isButtonDisabled || isErrorVisible || isInvalidAttr, 'Name field validation error or disabled send button expected').toBe(true);
        });
    }
}
