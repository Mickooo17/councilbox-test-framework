import * as f from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

f.test.describe('Institutions - Legal Texts Tests', () => {
    f.test.beforeEach(async ({ homePage }) => {
        await homePage.validateHomePageIsOpened();
    });

    f.test('Only super administrators should have the ability to change legal texts @XR-2553 @regression', async ({ legalTextsPage }) => {
        // 1. Click on the "Account" icon -> Click on the company button
        await legalTextsPage.openCompanySettingsFromAccountMenu();

        // 2. Click on "Legal texts" button (Customization -> LEGAL TEXTS)
        await legalTextsPage.navigateToLegalTexts();

        // 3. Open edit form for a legal text (e.g. Terms and conditions)
        await legalTextsPage.openEditLegalText('Terms and conditions');

        // 4. Edit legal texts
        const updatedText = `Updated Terms and Conditions legal text - ${DataGenerator.randomNumber(6)}`;
        await legalTextsPage.editLegalText(updatedText);

        // 5. Click on the "Save" button and verify it saves successfully
        await legalTextsPage.saveLegalText();

        // 6. Navigate back to the legal texts list
        await legalTextsPage.navigateBackToLegalTextsList();
    });
});
