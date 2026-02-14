import { Page, Locator, expect } from '@playwright/test';
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
        this.createButton = page.getByRole('button', { name: ' Create' });
        this.templateNameInput = page.getByRole('textbox', { name: 'Input' });
        this.contentEditor = page.locator('#draft-editor-text div').nth(2);
        this.searchInput = page.getByRole('textbox', { name: 'Search templates' });
        this.tableBody = page.locator('tbody');
        this.alertMessage = page.getByRole('alert');
        this.deleteButton = page.getByRole('button', { name: ' Delete' });
        this.confirmDeleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async openCreateTemplateForm() {
        // Click the floating action button (FAB) at the bottom-right corner
        const fabButton = this.page.locator('#add-procedure-button');
        await fabButton.waitFor({ state: 'visible', timeout: 10000 });
        await fabButton.click();
    }

    async fillTemplateDetails(data: TemplateData) {
        await this.templateNameInput.fill(data.name);
        await this.contentEditor.fill(data.content);

        // Select the random template type
        const typeOption = this.page.getByText(data.type, { exact: true });
        await typeOption.waitFor({ state: 'visible', timeout: 5000 });
        await typeOption.click();
    }

    async submitCreateForm() {
        await this.createButton.click();
    }

    async createTemplate(data: TemplateData) {
        await this.openCreateTemplateForm();
        await this.fillTemplateDetails(data);
        await this.submitCreateForm();
    }

    async verifySuccessAlert() {
        await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_CREATED);
    }

    async searchTemplate(name: string) {
        await this.searchInput.fill(name);
    }

    async verifyTemplateInTable(name: string) {
        await expect(this.tableBody).toContainText(name);
    }

    async deleteTemplate(name: string) {
        await this.searchTemplate(name);
        // Click the 3-dot actions button on the found row
        const row = this.tableBody.locator('tr', { hasText: name });
        await row.waitFor({ state: 'visible', timeout: 5000 });
        await row.locator('button').first().click();
        await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.deleteButton.click();
        await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.confirmDeleteButton.click();
    }

    async verifyDeleteSuccessAlert() {
        await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_DELETED);
    }
}

