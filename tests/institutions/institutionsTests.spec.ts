import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { InstitutionData } from '../../pages/institutions/InstitutionsPage';

/**
 * Institutions Test Suite
 * Contains all tests related to institution management
 */

f.test.describe('Institutions - Create Institution Tests', () => {
    f.test.beforeEach(async ({ loginPage, homePage, institutionsPage }) => {
        // Login, select company, and navigate to Institutions
        await loginPage.login(f.adminProfessionalUser.username, f.adminProfessionalUser.password);
        await homePage.validateHomePageIsOpened();
        await institutionsPage.dismissModal();
        await institutionsPage.selectCompany();
        await institutionsPage.navigateToInstitutions();
    });

    f.test('should create a new institution and verify it appears in the list @smoke @regression', async ({ institutionsPage }) => {
        // Arrange
        const institutionData: InstitutionData = {
            name: DataGenerator.randomInstitutionName(),
            cif: DataGenerator.randomNumber(8),
            address: DataGenerator.randomAddress(),
            zipCode: DataGenerator.randomZipCode(),
            city: DataGenerator.randomCity(),
        };

        // Act
        await institutionsPage.createInstitution(institutionData);

        // Assert
        await institutionsPage.verifySuccessAlert();
        await institutionsPage.searchInstitution(institutionData.name);
        await institutionsPage.verifyInstitutionInTable(institutionData.name);
    });
});
