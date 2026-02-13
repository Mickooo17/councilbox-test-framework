import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { InstitutionData } from '../../pages/institutions/InstitutionsPage';

f.test.describe('Institutions - Create Institution Tests', () => {
    let createdInstitutionName: string;

    f.test.beforeEach(async ({ loginPage, homePage, institutionsPage }) => {
        await loginPage.login(f.superadminUser.username, f.superadminUser.password);
        await homePage.validateHomePageIsOpened();
        await institutionsPage.dismissModal();
        await institutionsPage.selectQADevCompany();
        await institutionsPage.page.waitForLoadState('networkidle');
        await institutionsPage.navigateToInstitutions();
    });

    f.test.afterEach(async ({ institutionsPage }) => {
        if (createdInstitutionName) {
            await institutionsPage.deleteInstitution(createdInstitutionName);
            await institutionsPage.verifyDeleteSuccessAlert();
        }
    });

    f.test('should create a new institution and verify it appears in the list @smoke @regression', async ({ institutionsPage }) => {
        const institutionData: InstitutionData = {
            name: DataGenerator.randomInstitutionName(),
            cif: DataGenerator.randomNumber(8),
            address: DataGenerator.randomAddress(),
            zipCode: DataGenerator.randomZipCode(),
            city: DataGenerator.randomCity(),
        };
        createdInstitutionName = institutionData.name;

        await institutionsPage.createInstitution(institutionData);
        await institutionsPage.verifySuccessAlert();
        await institutionsPage.searchInstitution(institutionData.name);
        await institutionsPage.verifyInstitutionInTable(institutionData.name);
    });
});
