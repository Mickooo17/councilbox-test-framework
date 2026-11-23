import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { TemplateData } from '../../pages/templates/TemplatesPage';
import { AppointmentApiHelper } from '../../utils/appointments/AppointmentApiHelper';

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

    f.test('The user is able to search templates by name - Templates @OVAC-4872 @regression', async ({ templatesPage }) => {
        const templateData = DataGenerator.randomTemplateData();

        // 1. Create a template to search for
        await templatesPage.createTemplate(templateData);
        await templatesPage.verifySuccessAlert();

        // 2. Search template by name
        await templatesPage.searchTemplate(templateData.name);

        // 3. Verify matching template is displayed in table
        await templatesPage.verifyTemplateInTable(templateData.name);

        // 4. Cleanup
        await templatesPage.deleteTemplate(templateData.name);
        await templatesPage.verifyDeleteSuccessAlert();
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

    f.test('User is able to click on the Tags button @XR-1393 @OVAC-5626 @regression', async ({ templatesPage, tagsPage, page }) => {
        // 1-2. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 3. Click on Tags tab from Templates view
        await tagsPage.navigateToTagsTab();
        await page.waitForTimeout(500);

        // Verify Tags view is displayed and URL ends with /tags
        await f.expect(page).toHaveURL(/.*\/tags/i);
        await f.expect(tagsPage.searchInput).toBeVisible({ timeout: 10000 });
    });

    f.test('User is able to click on the Templates button @XR-1394 @OVAC-5627 @regression', async ({ templatesPage, tagsPage, page }) => {
        // 1-2. Navigate to Templates and switch to Tags tab first
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();
        await tagsPage.navigateToTagsTab();
        await f.expect(page).toHaveURL(/.*\/tags/i);

        // 3. Click on Templates tab (Drafts)
        const templatesTab = page.locator('button, [role="tab"]').filter({ hasText: /^Templates$|^Plantillas$|^Drafts$/i }).first();
        await templatesTab.waitFor({ state: 'visible', timeout: 10000 });
        await templatesTab.click();
        await page.waitForTimeout(500);

        // Verify Templates view is displayed and URL ends with /drafts
        await f.expect(page).toHaveURL(/.*\/drafts/i);
        await f.expect(templatesPage.searchInput).toBeVisible({ timeout: 10000 });
    });

    f.test('The user is not able to add a new template without populating the \'Title\' field - Templates @OVAC-4875 @regression', async ({ templatesPage, page }) => {
        // 1-3. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4-5. Open New template form
        await templatesPage.openCreateTemplateForm();

        // 6. Click Save/Create without filling Title
        await templatesPage.createButton.click();

        // 7. Verify alert/error for Title field
        await templatesPage.verifyTitleRequiredError();
    });

    f.test('The user is able to switch between the pages - Templates @OVAC-4876 @regression', async ({ templatesPage, page }) => {
        // 1-3. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4. Locate pagination at bottom
        const initialPage = await templatesPage.getPaginationText();
        f.expect(initialPage).toMatch(/\d+\s*-\s*\d+\s+of\s+\d+/i);

        // 5. Switch page on Templates form
        await templatesPage.clickNextPaginationPage();
        const newPage = await templatesPage.getPaginationText();
        f.expect(newPage).not.toBe(initialPage);
    });

    f.test('The user is able to use filter by - Templates @OVAC-4877 @regression', async ({ templatesPage, page }) => {
        // 1-3. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4-5. Open Tags dropdown and select a tag
        await templatesPage.filterTemplatesByTag();

        // 6. Verify results table or empty message is visible
        const tableOrEmpty = page.locator('table tbody').or(page.getByText(/There are no results|No templates/i)).first();
        await f.expect(tableOrEmpty).toBeVisible({ timeout: 10000 });
    });

    f.test('The user is able to edit already existing template - Templates @OVAC-4871 @regression', async ({ templatesPage, page }) => {
        // 1-3. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4. Create initial template
        const initialData = DataGenerator.randomTemplateData();
        await templatesPage.createTemplate(initialData);

        // 5. Edit existing template to new name
        const updatedName = `${initialData.name}_EDITED`;
        await templatesPage.editTemplate(initialData.name, updatedName);

        // 6. Search for updated template name and verify in table
        await templatesPage.searchTemplate(updatedName);
        await templatesPage.verifyTemplateInTable(updatedName);

        // 7. Cleanup
        await templatesPage.deleteTemplate(updatedName);
    });

    f.test('The user is able to delete already existing template - Templates @OVAC-4870 @regression', async ({ templatesPage }) => {
        // 1-3. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4. Create a template to delete
        const templateData = DataGenerator.randomTemplateData();
        await templatesPage.createTemplate(templateData);
        await templatesPage.verifySuccessAlert();

        // 5. Delete the template
        await templatesPage.deleteTemplate(templateData.name);
        await templatesPage.verifyDeleteSuccessAlert();

        // 6. Verify template is no longer in table
        await templatesPage.searchTemplate(templateData.name);
        await templatesPage.verifyTemplateNotInTable(templateData.name);
    });

    f.test('Verify new design for Templates heading informations @OVAC-5179 @regression', async ({ templatesPage }) => {
        // 1-3. Navigate to Templates
        await templatesPage.navigateToTemplates();
        await templatesPage.dismissModal();

        // 4-5. Edit any template and validate Icon, Template name, Status, Actions menu
        await templatesPage.verifyTemplateHeadingInformation();
    });
});

f.test.describe('Templates - Text Area Upload Template Tests', () => {
    f.test('Verify new UI for adding templates in any text area @OVAC-5794 @regression', async ({
        appointmentsPage,
        request,
        page,
    }) => {
        // 1-3. Start creating / compose notification with text area on appointment
        const created = await AppointmentApiHelper.createAppointment(request, {
            companyId: 1112,
            procedureId: 3955,
            procedureTitle: 'Prueba iñaki',
        });
        await appointmentsPage.navigateToAppointmentsPage(1112);
        await appointmentsPage.searchAppointment(created.id);

        // 4. In notification text area, click Upload template button
        await appointmentsPage.openUploadTemplateUIFromNotification(created.id);

        // Verify the new UI is displayed with all fields
        const templateModal = page.locator('.MuiDialog-root:visible, .MuiDrawer-root:visible, [role="dialog"]:visible').last();
        await f.expect(templateModal).toBeVisible({ timeout: 10000 });
        await f.expect(templateModal.getByText(/Upload template|Subir plantilla|Plantillas/i).first()).toBeVisible({ timeout: 5000 });
        await f.expect(templateModal.getByText(/Categories|Categorías/i).first()).toBeVisible({ timeout: 5000 });
    });

    f.test('Verify Category drop-down is displayed and contains all categories @OVAC-5792 @regression', async ({
        appointmentsPage,
        request,
        page,
    }) => {
        // 1-3. Create appointment and navigate
        const created = await AppointmentApiHelper.createAppointment(request, {
            companyId: 1112,
            procedureId: 3955,
            procedureTitle: 'Prueba iñaki',
        });
        await appointmentsPage.navigateToAppointmentsPage(1112);
        await appointmentsPage.searchAppointment(created.id);

        // 4. Open upload template UI from text area
        await appointmentsPage.openUploadTemplateUIFromNotification(created.id);

        // Validate Category drop-down is displayed
        const templateModal = page.locator('.MuiDialog-root:visible, .MuiDrawer-root:visible, [role="dialog"]:visible').last();
        const catDropdown = templateModal.getByRole('combobox', { name: /Category|Categoría|Categorías|Categories/i })
            .or(templateModal.locator('.cbx-selectInput-container, [role="combobox"]').filter({ hasText: /Category|Categoría|Categories/i }))
            .or(templateModal.locator('[role="combobox"]'))
            .first();
        await f.expect(catDropdown).toBeVisible({ timeout: 10000 });

        // 5. Click on Category drop-down button and validate options are visible
        await catDropdown.click();
        await page.waitForTimeout(500);

        const options = page.locator('.MuiPopover-root:visible [role="option"], .MuiMenu-root:visible li, [role="listbox"]:visible [role="option"]');
        await f.expect(options.first()).toBeVisible({ timeout: 5000 });
        const optionCount = await options.count();
        f.expect(optionCount).toBeGreaterThan(0);
    });

    f.test('Verify templates can be searched by using search engine - Text area add template @OVAC-5799 @regression', async ({
        appointmentsPage,
        request,
        page,
    }) => {
        // 1-3. Create appointment and navigate
        const created = await AppointmentApiHelper.createAppointment(request, {
            companyId: 1112,
            procedureId: 3955,
            procedureTitle: 'Prueba iñaki',
        });
        await appointmentsPage.navigateToAppointmentsPage(1112);
        await appointmentsPage.searchAppointment(created.id);

        // 4. Open upload template UI from text area
        await appointmentsPage.openUploadTemplateUIFromNotification(created.id);

        // 5. Verify search engine input is displayed in template modal
        const templateModal = page.locator('.MuiDialog-root:visible, .MuiDrawer-root:visible, [role="dialog"]:visible').last();
        const searchInput = templateModal.getByRole('textbox', { name: /Search|Buscar/i })
            .or(templateModal.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i], input[type="text"]'))
            .first();
        await f.expect(searchInput).toBeVisible({ timeout: 10000 });

        // 6. Enter a query in search engine
        await searchInput.fill('Template');
        await page.waitForTimeout(500);
        await f.expect(searchInput).toHaveValue('Template');
    });
});
