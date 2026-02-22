import { Page, Locator, test } from '@playwright/test';

export class BasePage {
    readonly closeModalButton: Locator;
    readonly institutionsButton: Locator;
    readonly templatesButton: Locator;
    readonly documentationButton: Locator;
    readonly usersButton: Locator;
    readonly governmentIcon: Locator;
    readonly qaDevMenuItem: Locator;

    constructor(public page: Page) {
        this.closeModalButton = page.locator('.MuiButtonBase-root.MuiIconButton-root.closeIcon');
        this.institutionsButton = page.getByRole('button', { name: ' Institutions' });
        this.templatesButton = page.getByRole('button', { name: ' Templates' });
        this.documentationButton = page.locator('#documentation-link');
        this.usersButton = page.getByRole('button', { name: ' Users' });
        this.governmentIcon = page.locator('.ri-government-line');
        this.qaDevMenuItem = page.getByRole('menuitem', { name: 'company-logo QA DEV' });
    }

    async dismissModal() {
        await test.step('Dismiss modal dialog', async () => {
            await this.closeModalButton.click();
        });
    }

    async selectQADevCompany() {
        await test.step('Select QA DEV company', async () => {
            await this.governmentIcon.click();
            await this.qaDevMenuItem.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async navigateToInstitutions() {
        await test.step('Navigate to Institutions page', async () => {
            await this.institutionsButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.institutionsButton.click();
        });
    }

    async navigateToTemplates() {
        await test.step('Navigate to Templates page', async () => {
            await this.templatesButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.templatesButton.click();
        });
    }

    async navigateToDocumentation() {
        await test.step('Navigate to Documentation page', async () => {
            await this.documentationButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.documentationButton.click();
        });
    }

    async navigateToUsers() {
        await test.step('Navigate to Users page', async () => {
            await this.usersButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.usersButton.click();
            await this.page.waitForLoadState('networkidle');
        });
    }
}
