import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';

export interface TagData {
    key: string;
    value: string;
    description: string;
}

export class TagsPage extends BasePage {
    // Navigation
    readonly tagsTab: Locator;

    // Action buttons
    readonly createTagButton: Locator;

    // Form fields
    readonly tagKeyInput: Locator;
    readonly tagValueInput: Locator;
    readonly tagDescriptionInput: Locator;
    readonly saveButton: Locator;

    // Search & Table
    readonly searchInput: Locator;
    readonly tableBody: Locator;

    // Alerts
    readonly alertMessage: Locator;

    // Delete
    readonly deleteButton: Locator;
    readonly confirmDeleteButton: Locator;
    readonly deleteModalHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.tagsTab = page.locator('button, [role="tab"]').filter({ hasText: /Tags|Etiquetas/i }).first();
        this.createTagButton = page.locator('#add-procedure-button, #add-tag-button, button:has(.ri-add-line), .MuiFab-root').first();
        this.tagKeyInput = page.locator('#company-tag-key');
        this.tagValueInput = page.locator('#company-tag-value');
        this.tagDescriptionInput = page.locator('#company-tag-description');
        this.saveButton = page.getByRole('button', { name: /Save|Guardar/i })
            .or(page.locator('#panel-confirm-button-accept, #-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")'))
            .first();
        this.searchInput = page.getByRole('textbox', { name: /Search tags|Search by participant or record|Buscar/i })
            .or(page.getByPlaceholder(/Search tags|Buscar etiquetas|Search|Buscar/i))
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
        this.deleteModalHeader = page.getByRole('paragraph');
    }

    async navigateToTagsTab() {
        await test.step('Navigate to Tags tab', async () => {
            await this.tagsTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.tagsTab.click();
        });
    }

    async openCreateTagForm() {
        await test.step('Open create tag form', async () => {
            await this.createTagButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.createTagButton.click();
        });
    }

    async fillTagDetails(data: TagData) {
        await test.step(`Fill tag details: key="${data.key}"`, async () => {
            await this.tagKeyInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.tagKeyInput.fill(data.key);
            await this.tagValueInput.fill(data.value);
            await this.tagDescriptionInput.fill(data.description);
        });
    }

    async submitCreateForm() {
        await test.step('Submit create tag form', async () => {
            await this.saveButton.waitFor({ state: 'attached', timeout: 5000 });
            await this.saveButton.evaluate((el) => (el as HTMLElement).click());
            await this.page.waitForTimeout(1000);
        });
    }

    async createTag(data: TagData) {
        await test.step(`Create tag: ${data.key}`, async () => {
            await this.openCreateTagForm();
            await this.fillTagDetails(data);
            await this.submitCreateForm();
        });
    }

    async searchTag(key: string) {
        await test.step(`Search for tag: ${key}`, async () => {
            await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
            await this.searchInput.fill(key);
        });
    }

    async verifyTagInTable(key: string) {
        await test.step(`Verify tag "${key}" appears in table`, async () => {
            await expect(this.tableBody).toContainText(key);
        });
    }

    async deleteTag(key: string) {
        await test.step(`Delete tag: ${key}`, async () => {
            await this.searchTag(key);
            const row = this.tableBody.locator('tr', { hasText: key });
            await row.waitFor({ state: 'visible', timeout: 5000 });
            await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();
            await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.deleteButton.click();
            await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.confirmDeleteButton.click();
        });
    }

    async verifyDeleteSuccessAlert() {
        await test.step('Verify tag deleted success alert', async () => {
            await expect(this.alertMessage).toContainText(MESSAGES.TAG_DELETED);
        });
    }

    async verifyNoSearchResults() {
        await test.step('Verify no tag search results', async () => {
            await this.page.waitForTimeout(1000);
            const emptyMsg = this.page.getByText(/No content found|No se encontró contenido|No hay resultados/i).first();
            if (await emptyMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
                await expect(emptyMsg).toBeVisible();
            } else {
                await expect(this.tableBody).not.toContainText(/NONEXISTENT/i, { timeout: 5000 });
            }
        });
    }

    async editTag(key: string, newData: Partial<TagData>) {
        await test.step(`Edit tag: ${key}`, async () => {
            await this.searchTag(key);
            const row = this.tableBody.locator('tr', { hasText: key });
            await row.waitFor({ state: 'visible', timeout: 5000 });
            await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();

            // Click Edit option
            const editButton = this.page.getByRole('button', { name: /Edit|Editar/i }).first();
            await editButton.waitFor({ state: 'visible', timeout: 5000 });
            await editButton.click();

            // Wait for form to appear and fill new data
            await this.tagKeyInput.waitFor({ state: 'visible', timeout: 5000 });

            if (newData.value) {
                await this.tagValueInput.clear();
                await this.tagValueInput.fill(newData.value);
            }
            if (newData.description) {
                await this.tagDescriptionInput.clear();
                await this.tagDescriptionInput.fill(newData.description);
            }

            await this.saveButton.waitFor({ state: 'attached', timeout: 5000 });
            await this.saveButton.evaluate((el) => (el as HTMLElement).click());
            await this.page.waitForTimeout(1000);
        });
    }

    async verifyTagNotInTable(key: string) {
        await test.step(`Verify tag "${key}" is NOT in the table`, async () => {
            await this.page.waitForTimeout(1000);
            const tbodyCount = await this.tableBody.count();
            if (tbodyCount > 0) {
                await expect(this.tableBody).not.toContainText(key, { timeout: 5000 });
            } else {
                await expect(this.page.getByText('No content found. Please review your selection and try again.')).toBeVisible({ timeout: 5000 });
            }
        });
    }

    async verifyCreateTagFormVisible() {
        await test.step('Verify create tag form dialog is visible', async () => {
            await expect(this.page.getByRole('dialog')).toBeVisible();
        });
    }

    async verifyFieldRequiredError() {
        await test.step('Verify required field validation error is visible', async () => {
            await expect(this.page.getByText(/required|obligatorio/i).first()).toBeVisible({ timeout: 5000 });
        });
    }
}
