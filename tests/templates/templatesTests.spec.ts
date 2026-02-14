import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { TemplateData } from '../../pages/templates/TemplatesPage';

f.test.describe('Templates - Create Template Tests', () => {
    let templateData: TemplateData;

    f.test.beforeEach(async ({ loginPage, homePage, templatesPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
        await homePage.validateHomePageIsOpened();
        await templatesPage.dismissModal();
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
