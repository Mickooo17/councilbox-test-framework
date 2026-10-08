import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';

export interface TemplateData {
    name: string;
    content: string;
    type: string;
}

export class TemplatesPage extends BasePage {
    // Action buttons
    readonly createButton: Locator;

    // Form fields
    readonly templateNameInput: Locator;
    readonly contentEditor: Locator;

    // Search & Table
    readonly searchInput: Locator;
    readonly tableBody: Locator;

    // Alerts
    readonly alertMessage: Locator;

    // Delete
    readonly deleteButton: Locator;
    readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.createButton = page.getByRole('button', { name: /Create|Crear/i })
            .or(page.locator('#panel-confirm-button-accept, #modal-button-accept, button:has-text("CREATE"), button:has-text("CREAR")'))
            .first();
        this.templateNameInput = page.getByRole('textbox', { name: /Title|Título/i })
            .or(page.locator('#draft-name, input[name="name"], input[name="title"]'))
            .first();
        this.contentEditor = page.locator('#draft-editor-text div, [contenteditable="true"], .ql-editor, .ProseMirror, #draft-editor-text').first();
        this.searchInput = page.getByRole('textbox', { name: /Search templates|Search by participant or record|Buscar/i })
            .or(page.getByPlaceholder(/Search templates|Buscar plantillas|Search|Buscar/i))
            .or(page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]'))
            .first();
        this.tableBody = page.locator('tbody');
        this.alertMessage = page.getByRole('alert');
        this.deleteButton = page.getByRole('button', { name: /Delete|Eliminar/i })
            .or(page.locator('[role="menuitem"]').filter({ hasText: /Delete|Eliminar/i }))
            .first();
        this.confirmDeleteButton = page.locator('#panel-confirm-button-accept, #modal-button-accept')
            .or(page.getByRole('dialog').getByRole('button', { name: /Delete|Eliminar|Accept|Aceptar/i }))
            .first();
    }

    async openCreateTemplateForm() {
        await test.step('Open create template form', async () => {
            const fabButton = this.page.locator('#add-procedure-button, .MuiFab-root, button:has(.ri-add-line)').first();
            await fabButton.waitFor({ state: 'visible', timeout: 10000 });
            await fabButton.click();
        });
    }

    async fillTemplateDetails(data: TemplateData) {
        await test.step(`Fill template details: ${data.name}`, async () => {
            await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.templateNameInput.fill(data.name);

            if (await this.contentEditor.isVisible({ timeout: 2000 }).catch(() => false)) {
                await this.contentEditor.click();
                await this.page.keyboard.type(data.content);
            }

            // Select template category/type
            const typeOption = this.page.locator('button, [role="button"]').filter({ hasText: new RegExp(data.type, 'i') }).first();
            if (await typeOption.isVisible({ timeout: 3000 }).catch(() => false)) {
                await typeOption.click();
            }
        });
    }

    async submitCreateForm() {
        await test.step('Submit create form and wait for drawer to close', async () => {
            await this.createButton.click();
            await this.page.waitForURL(/\/drafts$/i, { timeout: 10000 }).catch(() => {});
            await this.dismissToastOrModal();
        });
    }

    async createTemplate(data: TemplateData) {
        await test.step(`Create template: ${data.name}`, async () => {
            await this.openCreateTemplateForm();
            await this.fillTemplateDetails(data);
            await this.submitCreateForm();
        });
    }

    async verifySuccessAlert() {
        await test.step('Verify template created success alert', async () => {
            await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_CREATED);
        });
    }

    async searchTemplate(name: string) {
        await test.step(`Search for template: ${name}`, async () => {
            await this.searchInput.fill(name);
        });
    }

    async verifyTemplateInTable(name: string) {
        await test.step(`Verify template "${name}" appears in table`, async () => {
            await expect(this.tableBody).toContainText(name);
        });
    }

    async deleteTemplate(name: string) {
        await test.step(`Delete template: ${name}`, async () => {
            await this.searchTemplate(name);
            // Click the 3-dot actions button on the found row
            const row = this.tableBody.locator('tr', { hasText: name });
            await row.waitFor({ state: 'visible', timeout: 5000 });
            await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();
            await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.deleteButton.click();
            await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.confirmDeleteButton.click();
        });
    }

    async verifyDeleteSuccessAlert() {
        await test.step('Verify template deleted success alert', async () => {
            await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_DELETED);
        });
    }

    async verifyNoSearchResults() {
        await test.step('Verify no template search results', async () => {
            await this.page.waitForTimeout(1000);
            const emptyMsg = this.page.getByText(/There are no results for your search|No hay resultados para su búsqueda|No hay resultados/i).first();
            if (await emptyMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
                await expect(emptyMsg).toBeVisible();
            } else {
                await expect(this.tableBody).not.toContainText(/NONEXISTENT/i, { timeout: 5000 });
            }
        });
    }

    async verifyTemplateNotInTable(name: string) {
        await test.step(`Verify template "${name}" is NOT in the table`, async () => {
            await this.page.waitForTimeout(1000);
            // After deletion + search, page may show empty state (no tbody) OR a table without the name
            const tbodyCount = await this.tableBody.count();
            if (tbodyCount > 0) {
                await expect(this.tableBody).not.toContainText(name, { timeout: 5000 });
            } else {
                // No tbody means the page is in empty state — template is gone
                await expect(this.page.getByText('There are no results for your search. Please, check your selection and try again.')).toBeVisible({ timeout: 5000 });
            }
        });
    }
}


