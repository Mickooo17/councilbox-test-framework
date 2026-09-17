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
        this.createButton = page.getByRole('button', { name: /^Create$|^Crear$/i }).or(page.getByRole('button', { name: ' Create' }));
        this.templateNameInput = page.locator('#draft-editor-title')
            .or(page.getByRole('textbox', { name: 'Input' }))
            .or(page.getByRole('textbox', { name: /Title/i }))
            .first();
        this.contentEditor = page.locator('.ql-editor')
            .or(page.locator('#draft-editor-text div').nth(2))
            .first();
        this.searchInput = page.locator('#drafts-search-input')
            .or(page.getByRole('textbox', { name: /Search templates/i }))
            .or(page.locator('input[placeholder*="Search" i]'))
            .first();
        this.tableBody = page.locator('tbody');
        this.alertMessage = page.getByRole('alert');
        this.deleteButton = page.getByRole('button', { name: /Delete|Eliminar/i });
        this.confirmDeleteButton = page.getByRole('button', { name: /^Delete$|^Eliminar$/i });
    }

    async openCreateTemplateForm() {
        await test.step('Open create template form', async () => {
            const fabButton = this.page.locator('#add-procedure-button')
                .or(this.page.locator('.MuiFab-root'))
                .or(this.page.getByRole('button', { name: /Add|Nuevo|\+/i }))
                .first();
            await fabButton.waitFor({ state: 'visible', timeout: 10000 });
            await fabButton.click();

            const newTemplateOption = this.page.locator('.MuiListItem-button, [role="menuitem"], li, button')
                .filter({ hasText: /New template|Nueva plantilla/i })
                .first();
            if (await newTemplateOption.isVisible({ timeout: 3000 }).catch(() => false)) {
                await newTemplateOption.click();
            }
        });
    }

    async fillTemplateDetails(data: TemplateData) {
        await test.step(`Fill template details: ${data.name}`, async () => {
            await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.templateNameInput.fill(data.name);
            await this.contentEditor.fill(data.content);

            // Select the template type/category
            const typeOption = this.page.locator('p, span, button, [role="button"]')
                .filter({ hasText: new RegExp(`^${data.type}$`, 'i') })
                .first();
            if (await typeOption.isVisible({ timeout: 3000 }).catch(() => false)) {
                await typeOption.click();
            }
        });
    }

    async submitCreateForm() {
        await test.step('Submit create form and wait for redirect', async () => {
            await this.createButton.first().click();
            await this.page.waitForURL(/\/drafts\b/i, { timeout: 15000 }).catch(() => {});
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
            await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.searchInput.fill(name);
            await this.page.waitForTimeout(1000);
        });
    }

    async verifyTemplateInTable(name: string) {
        await test.step(`Verify template "${name}" appears in table`, async () => {
            await expect(this.tableBody).toContainText(name);
        });
    }

    async clickTemplateInTable(name: string) {
        await test.step(`Click template "${name}" in table to edit`, async () => {
            await this.searchTemplate(name);
            const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
            await row.waitFor({ state: 'visible', timeout: 10000 });
            await row.locator('td:first-child').click();
            await this.page.waitForURL(/\/draft\/\d+/i, { timeout: 15000 });
        });
    }

    async editTemplateDetails(updatedName: string, updatedContent?: string) {
        await test.step(`Edit template details (New Name: ${updatedName})`, async () => {
            await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.templateNameInput.fill(updatedName);

            if (updatedContent) {
                await this.contentEditor.fill(updatedContent);
            }
        });
    }

    async submitEditForm() {
        await test.step('Submit edit form and save template', async () => {
            await this.dismissToastOrModal();
            const saveBtn = this.page.getByRole('button', { name: /Save|Guardar/i })
                .or(this.page.locator('button').filter({ hasText: /Save|Guardar/i }))
                .first();
            await saveBtn.waitFor({ state: 'visible', timeout: 10000 });
            await saveBtn.click();
            await this.page.waitForTimeout(1000);
        });
    }

    async deleteTemplateFromEditPage() {
        await test.step('Delete template from edit page', async () => {
            await this.dismissToastOrModal();
            const moreButton = this.page.locator('button:has(i.ri-more-2-fill), button:has-text(""), [aria-label="Icon Button"]:has(i.ri-more-2-fill)').first();
            await moreButton.waitFor({ state: 'visible', timeout: 10000 });
            await moreButton.click();

            const deleteOption = this.page.locator('.cbx-dropdown-options li, [role="menuitem"], li').filter({ hasText: /Delete|Eliminar/i }).first();
            await deleteOption.waitFor({ state: 'visible', timeout: 10000 });
            await deleteOption.click();

            const confirmBtn = this.page.locator('button').filter({ hasText: /^Delete$|^Eliminar$/i }).last();
            await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
            await confirmBtn.click();
            await this.page.waitForURL(/\/drafts\b/i, { timeout: 15000 }).catch(() => {});
        });
    }

    async deleteTemplate(name: string) {
        await test.step(`Delete template: ${name}`, async () => {
            await this.searchTemplate(name);
            const row = this.tableBody.locator('tr', { hasText: name }).first();
            if (await row.isVisible({ timeout: 5000 }).catch(() => false)) {
                await row.locator('button').first().click();
                const menuDelete = this.page.locator('.cbx-dropdown-options li, [role="menuitem"], li').filter({ hasText: /^Delete$|^Eliminar$/i }).first();
                if (await menuDelete.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await menuDelete.click();
                } else if (await this.deleteButton.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await this.deleteButton.click();
                }
                const confirmBtn = this.page.locator('button').filter({ hasText: /^Delete$|^Eliminar$/i }).last();
                await confirmBtn.waitFor({ state: 'visible', timeout: 5000 });
                await confirmBtn.click();
                await this.page.waitForTimeout(1000);
            }
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
            await expect(this.page.getByText(/There are no results for your search|No hay resultados/i)).toBeVisible({ timeout: 5000 });
        });
    }

    async verifyTemplateNotInTable(name: string) {
        await test.step(`Verify template "${name}" is NOT in the table`, async () => {
            await this.page.waitForTimeout(1000);
            const emptyMessage = this.page.getByText(/There are no results for your search|No hay resultados/i);
            const isNoResults = await emptyMessage.isVisible({ timeout: 3000 }).catch(() => false);
            if (!isNoResults) {
                const row = this.tableBody.locator('tr', { hasText: name });
                await expect(row).not.toBeVisible({ timeout: 5000 });
            } else {
                await expect(emptyMessage).toBeVisible({ timeout: 5000 });
            }
        });
    }
}


