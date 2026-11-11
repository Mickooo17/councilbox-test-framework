import * as f from '../fixtures';
import { expect } from '@playwright/test';
import { DataGenerator } from '../../utils/DataGenerator';
import { InstitutionData } from '../../pages/institutions/InstitutionsPage';

f.test.describe('Institutions - Create Institution Tests', () => {
    let institutionData: InstitutionData;

    f.test.beforeEach(async ({ homePage, institutionsPage }) => {
        await homePage.validateHomePageIsOpened();
        await institutionsPage.dismissModal();
        await institutionsPage.selectQADevCompany();
        await institutionsPage.page.waitForLoadState('networkidle');
        await institutionsPage.navigateToInstitutions();
    });

    f.test.afterEach(async ({ institutionsPage }) => {
        if (institutionData?.name) {
            await institutionsPage.deleteInstitution(institutionData.name);
            await institutionsPage.verifyDeleteSuccessAlert();
        }
    });

    f.test('should create a new institution and verify it appears in the list @smoke @regression', async ({ institutionsPage }) => {
        institutionData = DataGenerator.randomInstitutionData();
        await institutionsPage.createInstitution(institutionData);
        await institutionsPage.verifySuccessAlert();
        await institutionsPage.searchInstitution(institutionData.name);
        await institutionsPage.verifyInstitutionInTable(institutionData.name);
    });
});

f.test.describe('Institutions - Search Tests', () => {
    f.test.beforeEach(async ({ homePage, institutionsPage }) => {
        await homePage.validateHomePageIsOpened();
        await institutionsPage.dismissModal();
        await institutionsPage.selectQADevCompany();
        await institutionsPage.page.waitForLoadState('networkidle');
        await institutionsPage.navigateToInstitutions();
    });

    f.test('should search for a non-existent institution and verify no results @regression', async ({ institutionsPage }) => {
        const nonExistentName = `NONEXISTENT_INST_${DataGenerator.randomNumber(10)}`;
        await institutionsPage.searchInstitution(nonExistentName);
        await institutionsPage.verifyNoSearchResults();
    });
});

f.test.describe('Institutions - Full Lifecycle Tests', () => {
    f.test.beforeEach(async ({ homePage, institutionsPage }) => {
        await homePage.validateHomePageIsOpened();
        await institutionsPage.dismissModal();
        await institutionsPage.selectQADevCompany();
        await institutionsPage.page.waitForLoadState('networkidle');
        await institutionsPage.navigateToInstitutions();
    });

    f.test('should create and delete an institution, then verify it no longer appears @regression', async ({ institutionsPage }) => {
        const institutionData = DataGenerator.randomInstitutionData();

        // Create
        await institutionsPage.createInstitution(institutionData);
        await institutionsPage.verifySuccessAlert();

        // Verify it exists
        await institutionsPage.searchInstitution(institutionData.name);
        await institutionsPage.verifyInstitutionInTable(institutionData.name);

        // Delete
        await institutionsPage.deleteInstitution(institutionData.name);
        await institutionsPage.verifyDeleteSuccessAlert();

        // Verify it no longer exists
        await institutionsPage.searchInstitution(institutionData.name);
        await institutionsPage.verifyInstitutionNotInTable(institutionData.name);
    });
});

f.test.describe('Institutions - Table Columns & Administration Tests', () => {
    f.test.beforeEach(async ({ homePage, institutionsPage }) => {
        await homePage.validateHomePageIsOpened();
        await institutionsPage.dismissModal();
        await institutionsPage.selectQADevCompany();
        await institutionsPage.page.waitForLoadState('networkidle');
        await institutionsPage.navigateToInstitutions();
    });

    f.test('[Institutions] Verify that "Organization" icon is different from the "Entity" icon @XR-2299 @regression', async ({ institutionsPage }) => {
        await institutionsPage.verifyOrganizationAndEntityIconsDiffer();
    });

    f.test('[Institutions] Verify that "Name" column is sortable @XR-2300 @regression', async ({ institutionsPage }) => {
        await institutionsPage.sortByNameColumn();
    });

    f.test('[Institutions] Verify that there is a "Level" column that is sortable @XR-2301 @regression', async ({ institutionsPage }) => {
        await institutionsPage.sortByLevelColumn();
    });

    f.test('[Institutions] Verify that "Institutions" form contains all fields @XR-2302 @regression', async ({ institutionsPage }) => {
        await institutionsPage.verifyInstitutionsTableFields();
    });

    f.test('[Institutions] Verify that "Level" column display correct value @XR-2303 @regression', async ({ institutionsPage }) => {
        await institutionsPage.verifyLevelColumnValues();
    });

    f.test('On the Institutions page, the administrator can define the minimum advance time for the organization/entity @XR-2697 @regression', async ({ institutionsPage }) => {
        await institutionsPage.openInstitutionDetails('QA DEV');
        await institutionsPage.navigateToAdministrationAgenda();
        await institutionsPage.openEditSchedulePeriod();
        await institutionsPage.setMinimumAdvanceNotice(3);
        await institutionsPage.saveSchedulePeriod();
    });

    f.test('When opening "Institutions" page - external ID label is displayed properly in the header @OVAC-4959 @regression', async ({ institutionsPage }) => {
        await institutionsPage.verifyExternalIdHeaderDisplayed();
    });

    f.test('When logged in to one organization, an admin or superadmin user can view the "Institutions" entry in the left menu @OVAC-5105 @regression', async ({ institutionsPage }) => {
        await expect(institutionsPage.institutionsButton).toBeVisible({ timeout: 10000 });
        await expect(institutionsPage.institutionsButton).toBeEnabled();
    });

    f.test('Verify filter by type and type column in entities table are removed @OVAC-4914 @regression', async ({ page }) => {
        const typeColumn = page.locator('table thead th, .MuiTableHead-root th').filter({ hasText: /^Type$|^Tipo$/i });
        await expect(typeColumn).not.toBeVisible({ timeout: 5000 });
        const filterByType = page.locator('.MuiFormControl-root, .cbx-inputText-container')
            .filter({ hasText: /Filter by type|All type|Filtrar por tipo|Todos los tipos/i });
        await expect(filterByType).not.toBeVisible({ timeout: 5000 });
    });
});

f.test.describe('Institutions - Organization & Company Settings Tests', () => {
    f.test.beforeEach(async ({ homePage }) => {
        await homePage.validateHomePageIsOpened();
    });

    f.test('The user can add or edit support email for organization @XR-2605 @OVAC-5387 @smoke @regression', async ({ institutionsPage }) => {
        // 1. Navigate to company configuration settings
        await institutionsPage.navigateToCompanySettings();

        // 2. Read existing support email
        const originalEmail = await institutionsPage.getSupportEmail();

        // 3. Update support email and save
        const newSupportEmail = `support_${DataGenerator.randomNumber(4)}@grupocastelar.es`;
        await institutionsPage.updateSupportEmail(newSupportEmail);
        await institutionsPage.saveCompanySettings();
        await institutionsPage.verifyCompanySettingsSavedAlert();

        // 4. Restore original support email to avoid side effects
        await institutionsPage.updateSupportEmail(originalEmail);
        await institutionsPage.saveCompanySettings();
        await institutionsPage.verifyCompanySettingsSavedAlert();
    });

    f.test('The user is able to save all changes by clicking on the \'Save\' button - Company settings section @XR-1626 @OVAC-5767 @regression', async ({ institutionsPage }) => {
        // 1. Navigate to company settings
        await institutionsPage.navigateToCompanySettings();

        // 2. Read original support email
        const originalEmail = await institutionsPage.getSupportEmail();

        // 3. Edit field with updated value
        const updatedEmail = `edit_${DataGenerator.randomNumber(4)}@grupocastelar.es`;
        await institutionsPage.updateSupportEmail(updatedEmail);

        // 4. Click Save and verify confirmation alert
        await institutionsPage.saveCompanySettings();
        await institutionsPage.verifyCompanySettingsSavedAlert();

        // 5. Verify the updated value persisted
        const savedEmail = await institutionsPage.getSupportEmail();
        expect(savedEmail).toBe(updatedEmail);

        // 6. Cleanup: restore original email and save
        await institutionsPage.updateSupportEmail(originalEmail);
        await institutionsPage.saveCompanySettings();
        await institutionsPage.verifyCompanySettingsSavedAlert();
    });

    f.test('Verify there is Process Created notification option @XR-3277 @OVAC-5224 @regression', async ({ institutionsPage, page }) => {
        // 1-3. Navigate to Company settings -> Customization -> Notifications
        await institutionsPage.navigateToCustomizationNotifications(1112);

        // 4. Verify Process Created notification option is displayed
        const processCreatedOption = page.locator('text=/Process created|Proceso creado/i').first();
        await expect(processCreatedOption).toBeVisible({ timeout: 10000 });
    });

    f.test('The user is able to change the Name of the company - Company settings section @XR-1630 @OVAC-5741 @regression', async ({ institutionsPage }) => {
        // 1-3. Navigate to Company settings
        await institutionsPage.navigateToCompanySettings(1112);

        // 4. Get current name and verify it can be updated
        const originalName = await institutionsPage.getCompanyName();
        expect(originalName).toBeTruthy();

        const testName = `${originalName} Test`;
        await institutionsPage.updateCompanyName(testName);
        const updatedName = await institutionsPage.getCompanyName();
        expect(updatedName).toBe(testName);

        // Restore original name
        await institutionsPage.updateCompanyName(originalName);
    });

    f.test('The user is able to change the VAT NO/CIF - Company settings section @XR-1629 @OVAC-5746 @regression', async ({ institutionsPage }) => {
        // 1-3. Navigate to Company settings
        await institutionsPage.navigateToCompanySettings(1112);

        // 4. Get current CIF and verify it can be edited
        const originalCif = await institutionsPage.getCompanyCif();
        expect(originalCif).toBeTruthy();

        const testCif = 'B12345678';
        await institutionsPage.updateCompanyCif(testCif);
        const updatedCif = await institutionsPage.getCompanyCif();
        expect(updatedCif).toBe(testCif);

        // Restore original CIF
        await institutionsPage.updateCompanyCif(originalCif);
    });

    f.test('The user is able to change the contact e-mail - Company settings section @XR-1628 @OVAC-5745 @regression', async ({ institutionsPage }) => {
        // 1-3. Navigate to Company settings
        await institutionsPage.navigateToCompanySettings(1112);

        // 4. Get current contact email and verify it can be edited
        const originalContactEmail = await institutionsPage.getCompanyContactEmail();
        expect(originalContactEmail).toBeTruthy();

        const testEmail = `contact_${DataGenerator.randomNumber(4)}@grupocastelar.es`;
        await institutionsPage.updateCompanyContactEmail(testEmail);
        const updatedEmail = await institutionsPage.getCompanyContactEmail();
        expect(updatedEmail).toBe(testEmail);

        // Restore original email
        await institutionsPage.updateCompanyContactEmail(originalContactEmail);
    });

    f.test('The user is able to change the language to English - Company settings section @XR-1627 @OVAC-5768 @regression', async ({ institutionsPage }) => {
        // 1-4. Navigate to Company Settings
        await institutionsPage.navigateToCompanySettings(1112);

        // 5. Modify Main language field to English and save
        await institutionsPage.updateCompanyMainLanguage('English');
        await institutionsPage.saveCompanySettings();
        await institutionsPage.verifyCompanySettingsSavedAlert();

        // Verify the Main language reflects English
        const currentLang = await institutionsPage.getCompanyMainLanguage();
        expect(currentLang).toContain('English');
    });

    f.test('The user is able to change the Organization logo - Company settings section @XR-1632 @OVAC-5769 @regression', async ({ institutionsPage, page }) => {
        // 1-4. Navigate to Customization -> Appearance
        await institutionsPage.navigateToCustomizationAppearance(1112);

        // 5-7. Upload organization logo and save
        await institutionsPage.uploadOrganizationLogo('test-data/test-logo.png');
        await institutionsPage.saveCompanySettings();
        await institutionsPage.verifyCompanySettingsSavedAlert();
    });
});
