import { test, expect } from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

test.describe('Procedures - Configuration & Documentation Tab Tests', () => {
    let procedureData: { name: string; description: string };

    test.beforeEach(async ({ homePage, proceduresPage }) => {
        procedureData = DataGenerator.randomProcedureData();
        await homePage.validateHomePageIsOpened();
        await proceduresPage.selectQADevCompany();
        await proceduresPage.navigateToProcedures();
    });

    test.afterEach(async ({ proceduresPage, request }) => {
        if (procedureData && procedureData.name) {
            const deleted = await proceduresPage.deleteProcedureByNameViaApi(request, procedureData.name).catch(() => false);
            if (!deleted) {
                await proceduresPage.deleteProcedure(procedureData.name).catch(() => {});
            }
        }
    });

    test('Verify that the name of file is not clickable but downloadable via 3-dots menu - Documentation tab - Video appointment procedure creation @XR-2291 @regression', async ({ proceduresPage }) => {
        test.slow();
        const folderTitle = `Auto Folder ${Math.floor(1000 + Math.random() * 9000)}`;

        // 1. Open create procedure drawer and select Video-appointment
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 2. Fill procedure details and continue
        await proceduresPage.fillProcedureDetails(procedureData);
        await proceduresPage.clickContinue();

        // 3. Navigate to Documentation tab and create folder
        await proceduresPage.navigateToDocumentationTab();
        await proceduresPage.createDocumentationFolder(folderTitle);

        // 4. Open folder and attach document from OVAC storage
        await proceduresPage.openFolder(folderTitle);
        const attachedDocName = await proceduresPage.addDocumentFromOvacStorageInExpandedFolder('campos-de-castilla2');

        // 5. Verify document name is NOT clickable (per XR-2291)
        await proceduresPage.verifyDocumentNameIsNotClickable(attachedDocName);

        // 6. Download document via 3-dots menu
        const download = await proceduresPage.downloadDocumentFromThreeDots(attachedDocName);
        const downloadedFileName = download.suggestedFilename();
        expect(downloadedFileName).toBeTruthy();
        expect(downloadedFileName.toLowerCase()).toContain(attachedDocName.toLowerCase());
    });

    test('Verify that all elements are displayed in Configuration tab - Video appointment procedure creation @XR-2298 @regression', async ({ proceduresPage }) => {
        test.slow();

        // 1. Open create procedure drawer and select Video-appointment
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 2. Fill procedure details and continue
        await proceduresPage.fillProcedureDetails(procedureData);

        // 3. Navigate to Configuration tab and verify all elements
        await proceduresPage.navigateToConfigurationTab();
        await proceduresPage.verifyAllConfigurationElements();
    });

    test('Using the toggle switch on the procedure, the administrator can make consent as required @XR-2706 @regression', async ({ proceduresPage, request }) => {
        test.slow();
        const consentTitle = `Consent ${Math.floor(1000 + Math.random() * 9000)}`;
        const consentDesc = `Description for ${consentTitle}`;

        // 1. Create procedure via API
        const createdProcedure = await proceduresPage.createProcedureViaApi(request, {
            title: procedureData.name,
            description: procedureData.description,
            companyId: 1112,
        });
        console.log(`[API Test] Successfully created Procedure ID: ${createdProcedure.id}, Title: "${procedureData.name}"`);

        // 2. Open procedure's Consents tab in UI
        await proceduresPage.navigateToProcedureConsents(createdProcedure.id, createdProcedure.companyId);

        // 3. Add consent with initial optional status
        await proceduresPage.addConsent(consentTitle, consentDesc, false);

        // 4. Verify consent initial state is Optional
        await proceduresPage.verifyConsentRequiredState(consentTitle, false);

        // 5. Toggle switch to make consent Required and verify
        await proceduresPage.toggleConsentRequiredOnCard(consentTitle, true);
        await proceduresPage.verifyConsentRequiredState(consentTitle, true);

        // 6. Toggle switch back to Optional and verify
        await proceduresPage.toggleConsentRequiredOnCard(consentTitle, false);
        await proceduresPage.verifyConsentRequiredState(consentTitle, false);

        // 7. Toggle back to Required and verify
        await proceduresPage.toggleConsentRequiredOnCard(consentTitle, true);
        await proceduresPage.verifyConsentRequiredState(consentTitle, true);
    });

    test('The administrator can create a “Linear" navigation procedure @XR-2705 @regression', async ({ proceduresPage }) => {
        test.slow();

        // 1. Create procedure with Linear navigation
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();
        await proceduresPage.fillProcedureDetails(procedureData);
        await proceduresPage.clickContinue();
        await proceduresPage.clickContinue();

        // 2. Select and verify "Linear" navigation type
        await proceduresPage.selectNavigationType('Linear');
        await proceduresPage.verifyNavigationType('Linear');

        // 3. Publish the procedure
        await proceduresPage.advanceToReviewTab();
        await proceduresPage.publishProcedure();

        // 4. Open published procedure and verify navigation type is preserved
        await proceduresPage.openProcedureFromList(procedureData.name);
        await proceduresPage.clickConsentsTabInWizardOrEdit();
        await proceduresPage.verifyNavigationType('Linear');
    });

    test('The administrator can create a "Free" navigation procedure @XR-2704 @regression', async ({ proceduresPage }) => {
        test.slow();

        // 1. Create procedure with Free navigation
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();
        await proceduresPage.fillProcedureDetails(procedureData);
        await proceduresPage.clickContinue();
        await proceduresPage.clickContinue();

        // 2. Select and verify "Free" navigation type
        await proceduresPage.selectNavigationType('Free');
        await proceduresPage.verifyNavigationType('Free');

        // 3. Publish the procedure
        await proceduresPage.advanceToReviewTab();
        await proceduresPage.publishProcedure();

        // 4. Open published procedure and verify navigation type is preserved
        await proceduresPage.openProcedureFromList(procedureData.name);
        await proceduresPage.clickConsentsTabInWizardOrEdit();
        await proceduresPage.verifyNavigationType('Free');
    });

    test('The user is able to Delete already existing procedure - Procedures @XR-1612 @regression', async ({ proceduresPage, request }) => {
        test.slow();

        // 1. Create procedure via API
        const createdProcedure = await proceduresPage.createProcedureViaApi(request, {
            title: procedureData.name,
            description: procedureData.description,
            companyId: 1112,
        });
        console.log(`[API Test] Successfully created Procedure ID: ${createdProcedure.id}, Title: "${procedureData.name}"`);

        // 2. Navigate to Procedures page and verify in table
        await proceduresPage.navigateToProcedures();
        await proceduresPage.searchProcedure(procedureData.name);
        await proceduresPage.verifyProcedureInTable(procedureData.name);

        // 3. Delete procedure via UI
        await proceduresPage.scrollToProcedureActions(procedureData.name);
        await proceduresPage.deleteProcedure(procedureData.name, 'test cleanup');

        // 4. Verify delete success alert and verify row no longer in table
        await proceduresPage.verifyDeleteSuccessAlert();
        await proceduresPage.searchProcedure(procedureData.name);
        await proceduresPage.verifyProcedureNotInTable(procedureData.name);

        // Clean up reference so afterEach does not re-attempt deletion
        procedureData.name = '';
    });

    test('The user is able to Edit already existing procedure - Procedures @XR-1611 @regression', async ({ proceduresPage, request }) => {
        test.slow();
        const editedName = `Edited ${procedureData.name}`;
        const editedDescription = `Updated description for ${editedName}`;

        // 1. Create procedure via API
        const createdProcedure = await proceduresPage.createProcedureViaApi(request, {
            title: procedureData.name,
            description: procedureData.description,
            companyId: 1112,
        });
        console.log(`[API Test] Successfully created Procedure ID: ${createdProcedure.id}, Title: "${procedureData.name}"`);

        // 2. Open procedure from list in UI
        await proceduresPage.openProcedureFromList(procedureData.name);

        // 3. Edit procedure name and description
        await proceduresPage.editProcedureDetails({
            name: editedName,
            description: editedDescription,
        });

        // 4. Update tracking variable so afterEach cleans up the edited name
        procedureData.name = editedName;

        // 5. Navigate back to Procedures page and verify updated procedure is displayed
        await proceduresPage.navigateToProcedures();
        await proceduresPage.searchProcedure(editedName);
        await proceduresPage.verifyProcedureInTable(editedName);
    });

    test('Verify that all elements are displayed in Configuration tab - Video appointment procedure edit @regression', async ({ proceduresPage, request }) => {
        test.slow();

        // 1. Create procedure via API
        const createdProcedure = await proceduresPage.createProcedureViaApi(request, {
            title: procedureData.name,
            description: procedureData.description,
            companyId: 1112,
        });
        console.log(`[API Test] Successfully created Procedure ID: ${createdProcedure.id}, Title: "${procedureData.name}"`);

        // 2. Open procedure from list in UI
        await proceduresPage.openProcedureFromList(procedureData.name);

        // 3. Navigate to Configuration tab in edit view
        await proceduresPage.clickConfigurationTabInWizardOrEdit();

        // 4. Verify all elements in Configuration tab (General, Appointments, Security)
        await proceduresPage.verifyAllConfigurationElements();
    });

    test('Without the consents, new procedures can be created - Procedures @XR-2561 @regression', async ({ proceduresPage }) => {
        test.slow();

        // 1. Open create procedure drawer and select Video-appointment procedure
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 2. Fill procedure details (Name & Description) and continue
        await proceduresPage.fillProcedureDetails(procedureData);
        await proceduresPage.clickContinue(); // Advance from Details to Entities

        // 3. Advance from Entities to Consents tab
        await proceduresPage.clickContinue(); // Advance to Consents

        // 4. Verify that Consents step displays message that no consents are required
        await proceduresPage.verifyNoConsentsAssociatedMessage();

        // 5. Advance through the rest of the wizard to Review tab without adding any consents
        await proceduresPage.advanceToReviewTab();

        // 6. Publish the procedure and confirm in the warning dialog
        await proceduresPage.publishProcedure();

        // 7. Verify the procedure is successfully created and displayed in the table
        await proceduresPage.searchProcedure(procedureData.name);
        await proceduresPage.verifyProcedureInTable(procedureData.name);

        // 8. Open the created procedure and verify Consents tab remains empty
        await proceduresPage.openProcedureFromList(procedureData.name);
        await proceduresPage.clickConsentsTabInWizardOrEdit();
        await proceduresPage.verifyNoConsentsAssociatedMessage();
    });
});
