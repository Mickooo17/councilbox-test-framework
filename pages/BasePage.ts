import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly closeModalButton: Locator;
    readonly institutionsButton: Locator;
    readonly governmentIcon: Locator;
    readonly qaDevMenuItem: Locator;

    constructor(protected page: Page) {
        this.closeModalButton = page.locator('.MuiButtonBase-root.MuiIconButton-root.closeIcon');
        this.institutionsButton = page.getByRole('button', { name: ' Institutions' });
        this.governmentIcon = page.locator('.ri-government-line');
        this.qaDevMenuItem = page.getByRole('menuitem', { name: 'company-logo QA DEV' });
    }

    async dismissModal() {
        await this.closeModalButton.click();
    }

    async selectCompany() {
        await this.governmentIcon.click();
        await this.qaDevMenuItem.click();
    }

    async navigateToInstitutions() {
        await this.institutionsButton.click();
    }
}
