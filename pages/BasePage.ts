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
        this.institutionsButton = page.locator('a[href*="/companies"]').or(page.getByRole('button', { name: /Entities|Institutions|Entidades|Instituciones/i })).first();
        this.templatesButton = page.locator('a[href*="/drafts"]').or(page.getByRole('button', { name: /Templates|Plantillas/i })).first();
        this.documentationButton = page.locator('a[href*="/documentation"]').or(page.locator('#documentation-link')).first();
        this.usersButton = page.locator('a[href*="/users"]').or(page.getByRole('button', { name: /Users|Usuarios/i })).first();
        this.governmentIcon = page.locator('.ri-government-line, [class*="government"]').first();
        this.qaDevMenuItem = page.getByRole('menuitem', { name: /company-logo QA DEV|QA DEV/i }).or(page.getByText(/QA DEV/i)).first();
    }

    async dismissModal() {
        await test.step('Dismiss modal dialog', async () => {
            const modal = this.page.locator('#alert-confirm, .MuiDialog-root, #modal');
            if (await modal.first().isVisible({ timeout: 2000 }).catch(() => false)) {
                const actionBtn = modal.first().locator('button').first();
                if (await actionBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
                    await actionBtn.click();
                } else {
                    await this.page.keyboard.press('Escape');
                }
                await modal.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
            }
        });
    }

    async dismissToastOrModal() {
        await test.step('Dismiss toast or modal banner if present', async () => {
            const closeBtn = this.page.locator(`
                .MuiButtonBase-root.MuiIconButton-root.closeIcon,
                button.closeIcon,
                [class*="toast"] button,
                [class*="snackbar"] button,
                button[aria-label="close" i],
                button[aria-label="Close" i],
                .ri-close-line,
                i.ri-close-line,
                button:has(.ri-close-line),
                button:has(i.ri-close-line)
            `).first();

            if (await closeBtn.isVisible({ timeout: 2500 }).catch(() => false)) {
                await closeBtn.click().catch(() => {});
            }
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
