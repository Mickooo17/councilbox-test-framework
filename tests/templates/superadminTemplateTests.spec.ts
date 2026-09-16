import * as f from '../fixtures';
import { TemplateData } from '../../pages/templates/TemplatesPage';
import { resolveLoginUrl } from '../../utils/UrlHelper';

f.test.describe('Templates - Superadmin Lifecycle Tests', () => {
    f.test.beforeEach(async ({ page, loginPage, templatesPage }) => {
        // Navigate to login URL and authenticate as SuperAdmin
        await page.goto(resolveLoginUrl());
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
        await templatesPage.dismissToastOrModal();
        await templatesPage.navigateToTemplates();
    });

    f.test('Verify that the Super admin is able to create/edit/delete the template @XR-2289 @regression', async ({ templatesPage }) => {
        const uniqueId = Date.now();
        const initialTitle = `Template XR2289 ${uniqueId}`;
        const editedTitle = `Template XR2289 Edited ${uniqueId}`;
        const templateData: TemplateData = {
            name: initialTitle,
            content: `Initial content for XR-2289 template ${uniqueId}`,
            type: 'Consents',
        };

        // 1. Create template (Steps 3-5: "+" -> "New template" -> populate fields -> Save/Create)
        await templatesPage.createTemplate(templateData);

        // 2. Click on just created template (Step 6)
        await templatesPage.clickTemplateInTable(initialTitle);

        // 3. Change fields (Step 7)
        await templatesPage.editTemplateDetails(editedTitle, `Updated content for XR-2289 template ${uniqueId}`);

        // 4. Click Save button (Step 8)
        await templatesPage.submitEditForm();

        // 5. Click three dots and choose delete option (Steps 9-10)
        await templatesPage.deleteTemplateFromEditPage();

        // 6. Verify template is deleted
        await templatesPage.searchTemplate(editedTitle);
        await templatesPage.verifyTemplateNotInTable(editedTitle);
    });
});
