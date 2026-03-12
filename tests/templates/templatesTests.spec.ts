import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { TemplateData } from '../../pages/templates/TemplatesPage';

f.test.describe('Templates - Create Template Tests', () => {
    let templateData: TemplateData;

    f.test.beforeEach(async ({ loginPage, homePage, templatesPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
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
    f.test.beforeEach(async ({ loginPage, homePage, templatesPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
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
    f.test.beforeEach(async ({ loginPage, homePage, templatesPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
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
