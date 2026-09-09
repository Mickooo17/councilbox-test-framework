import * as f from '../fixtures';
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
});

