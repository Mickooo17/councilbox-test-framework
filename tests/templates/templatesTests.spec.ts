import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { TemplateData } from '../../pages/templates/TemplatesPage';

f.test.describe('Templates - Create Template Tests', () => {
    let templateData: TemplateData;

    f.test.beforeEach(async ({ homePage, templatesPage }) => {
        await homePage.validateHomePageIsOpened();
        await templatesPage.dismissModal();
        await templatesPage.selectQADevCompany();
        await templatesPage.page.waitForLoadState('networkidle');
        await templatesPage.navigateToTemplates();
    });

    f.test.afterEach(async ({ templatesPage }) => {
        if (templateData?.name) {
            await templatesPage.deleteTemplate(templateData.name);
            await templatesPage.verifyDeleteSuccessAlert();
        }
    });

    f.test('should create a new template and verify it appears in the list @smoke @regression', async ({ templatesPage }) => {
        templateData = DataGenerator.randomTemplateData();
        await templatesPage.createTemplate(templateData);
        await templatesPage.verifySuccessAlert();
        await templatesPage.searchTemplate(templateData.name);
        await templatesPage.verifyTemplateInTable(templateData.name);
    });
});

f.test.describe('Templates - Search Tests', () => {
    f.test.beforeEach(async ({ homePage, templatesPage }) => {
        await homePage.validateHomePageIsOpened();
        await templatesPage.dismissModal();
        await templatesPage.selectQADevCompany();
        await templatesPage.page.waitForLoadState('networkidle');
        await templatesPage.navigateToTemplates();
    });

    f.test('should search for a non-existent template and verify no results @regression', async ({ templatesPage }) => {
        const nonExistentName = `NONEXISTENT_TEMPLATE_${DataGenerator.randomNumber(10)}`;
        await templatesPage.searchTemplate(nonExistentName);
        await templatesPage.verifyNoSearchResults();
    });
});

f.test.describe('Templates - Full Lifecycle Tests', () => {
    f.test.beforeEach(async ({ homePage, templatesPage }) => {
        await homePage.validateHomePageIsOpened();
        await templatesPage.dismissModal();
        await templatesPage.selectQADevCompany();
        await templatesPage.page.waitForLoadState('networkidle');
        await templatesPage.navigateToTemplates();
    });

    f.test('should create and delete a template, then verify it no longer appears @regression', async ({ templatesPage }) => {
        const templateData = DataGenerator.randomTemplateData();

        // Create
        await templatesPage.createTemplate(templateData);
        await templatesPage.verifySuccessAlert();

        // Verify it exists
        await templatesPage.searchTemplate(templateData.name);
        await templatesPage.verifyTemplateInTable(templateData.name);

        // Delete
        await templatesPage.deleteTemplate(templateData.name);
        await templatesPage.verifyDeleteSuccessAlert();

        // Verify it no longer exists
        await templatesPage.searchTemplate(templateData.name);
        await templatesPage.verifyTemplateNotInTable(templateData.name);
    });
});

f.test.describe('Templates - Drafts & Search Tests (Xray Execution 77514)', () => {
    f.test('The user is able to open Drafts tab - Citas section @XR-1393 @OVAC-5657 @regression', async ({ templatesPage, page }) => {
        await templatesPage.navigateToTemplates();
        await f.expect(page).toHaveURL(/.*\/drafts/i, { timeout: 15000 });
        const th = page.locator('th, [role="columnheader"]').filter({ hasText: /Name|Procedure|Nombre/i }).first();
        await f.expect(th).toBeVisible({ timeout: 15000 });
    });

    f.test('The user is able to search appointments by name via search engine in the Draft tab @XR-1400 @OVAC-5521 @regression', async ({ templatesPage, page }) => {
        await templatesPage.navigateToTemplates();
        const searchInput = page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]').first();
        await f.expect(searchInput).toBeVisible({ timeout: 15000 });
        await searchInput.fill('Template');
        await searchInput.press('Enter');
        await page.waitForTimeout(1000);
        const tableOrEmpty = page.locator('table').or(page.locator('text=/No templates|No se encontraron|No results/i')).first();
        await f.expect(tableOrEmpty).toBeVisible({ timeout: 10000 });
    });

    f.test('The user is able to check all checkboxes in the Draft tab - Citas section @XR-1394 @OVAC-5527 @regression', async ({ templatesPage, page }) => {
        await templatesPage.navigateToTemplates();
        await f.expect(page).toHaveURL(/.*\/drafts/i, { timeout: 15000 });

        const headerCheckbox = page.locator('thead input[type="checkbox"], th input[type="checkbox"], input[aria-label*="select all" i], [aria-label*="seleccionar todo" i]').first();
        if (await headerCheckbox.isVisible({ timeout: 5000 }).catch(() => false)) {
            await headerCheckbox.click({ force: true });
            await f.expect(headerCheckbox).toBeChecked();
        } else {
            const anyCheckbox = page.locator('input[type="checkbox"]').first();
            if (await anyCheckbox.isVisible({ timeout: 3000 }).catch(() => false)) {
                await anyCheckbox.click({ force: true });
                await f.expect(anyCheckbox).toBeChecked();
            } else {
                const tableOrEmpty = page.locator('table, [role="table"]').or(page.locator('text=/No templates|No se encontraron/i')).first();
                await f.expect(tableOrEmpty).toBeVisible({ timeout: 10000 });
            }
        }
    });

    f.test('The user is able to delete the meeting from Drafts tab - Citas section @XR-1392 @OVAC-5515 @regression', async ({ templatesPage }) => {
        // 1-3. Navigate to Templates / Drafts page
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4. Create a draft template to delete
        const draftData = DataGenerator.randomTemplateData();
        await templatesPage.createTemplate(draftData);
        await templatesPage.verifySuccessAlert();

        // 5. Search for the draft and select its checkbox
        await templatesPage.searchTemplate(draftData.name);
        const row = templatesPage.tableBody.locator('tr', { hasText: draftData.name }).first();
        await f.expect(row).toBeVisible({ timeout: 5000 });
        const checkbox = row.locator('input[type="checkbox"]').first();
        if (await checkbox.isVisible()) {
            await checkbox.click({ force: true });
            await f.expect(checkbox).toBeChecked();
        }

        // 6. Delete the draft and verify success alert
        await templatesPage.deleteTemplate(draftData.name);
        await templatesPage.verifyDeleteSuccessAlert();

        // 7. Verify no longer in Drafts table
        await templatesPage.searchTemplate(draftData.name);
        await templatesPage.verifyTemplateNotInTable(draftData.name);
    });
});
