import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LegalTextsPage extends BasePage {
    readonly accountDropdown: Locator;
    readonly companyMenuItem: Locator;
    readonly customizationTab: Locator;
    readonly legalTextsSubtab: Locator;
    readonly legalTextsTable: Locator;
    readonly qlEditor: Locator;
    readonly saveButton: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountDropdown = page.locator('#cbx-header-third-dropdown-user')
            .or(page.getByRole('button', { name: 'Actions Button' }).first())
            .first();
        this.companyMenuItem = page.locator('#user-settings-edit-company');
        this.customizationTab = page.getByRole('button', { name: /Customization|Personalización/i })
            .or(page.locator('button:has-text("Customization")'))
            .first();
        this.legalTextsSubtab = page.getByRole('button', { name: /Legal texts|Textos legales/i })
            .or(page.locator('button:has-text("LEGAL TEXTS")'))
            .first();
        this.legalTextsTable = page.locator('table');
        this.qlEditor = page.locator('.ql-editor');
        this.saveButton = page.getByRole('button', { name: /^Save$|^Guardar$/i })
            .or(page.locator('button:has-text("SAVE")'))
            .first();
        this.backButton = page.locator('button:has(.ri-arrow-left-line), button:has(i[class*="arrow-left"])').first();
    }

    async openCompanySettingsFromAccountMenu() {
        await test.step('Click Account icon and select Company from popup menu', async () => {
            await this.accountDropdown.waitFor({ state: 'visible', timeout: 10000 });
            await this.accountDropdown.click();
            await this.companyMenuItem.waitFor({ state: 'visible', timeout: 5000 });
            await this.companyMenuItem.click();
            await this.page.waitForLoadState('networkidle');
            await expect(this.page).toHaveURL(/\/companies\/edit/i, { timeout: 15000 });
        });
    }

    async navigateToLegalTexts() {
        await test.step('Navigate to Customization -> Legal texts', async () => {
            await this.customizationTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.customizationTab.click();
            await this.legalTextsSubtab.waitFor({ state: 'visible', timeout: 10000 });
            await this.legalTextsSubtab.click();
            await expect(this.page).toHaveURL(/\/personalization\/legalTerms/i, { timeout: 15000 });
            await this.legalTextsTable.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async openEditLegalText(title: string = 'Terms and conditions') {
        await test.step(`Open edit form for legal text: ${title}`, async () => {
            const row = this.page.locator(`[id="appointment-row-${title}"]`)
                .or(this.legalTextsTable.locator('tbody tr').filter({ hasText: title }))
                .first();
            await row.waitFor({ state: 'visible', timeout: 10000 });

            // Click the more actions button in the row
            const menuBtn = row.locator('#appointment-menu, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').first();
            await menuBtn.click();

            // Click Edit in popover
            const editBtn = this.page.locator('.MuiPopover-root [role="button"]').filter({ hasText: /Edit|Editar/i })
                .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
                .first();
            await editBtn.waitFor({ state: 'visible', timeout: 5000 });
            await editBtn.click();

            // Verify Documentation edit form appears
            await expect(this.page).toHaveURL(/\/legalTerms\//i, { timeout: 15000 });
            await this.qlEditor.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async editLegalText(newText: string) {
        await test.step(`Edit legal text in editor: ${newText}`, async () => {
            await this.qlEditor.waitFor({ state: 'visible', timeout: 10000 });
            await this.qlEditor.fill(newText);
            // Verify Save button becomes enabled
            await expect(this.saveButton).toBeEnabled({ timeout: 5000 });
        });
    }

    async saveLegalText() {
        await test.step('Save legal text changes', async () => {
            await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
            await expect(this.saveButton).toBeEnabled({ timeout: 5000 });
            await this.saveButton.click();
            // Verify Save button becomes disabled after successful save
            await expect(this.saveButton).toBeDisabled({ timeout: 10000 });
        });
    }

    async navigateBackToLegalTextsList() {
        await test.step('Navigate back to legal texts list', async () => {
            await this.backButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.backButton.click();
            await expect(this.page).toHaveURL(/\/personalization\/legalTerms$/i, { timeout: 10000 });
            await this.legalTextsTable.waitFor({ state: 'visible', timeout: 10000 });
        });
    }
}
