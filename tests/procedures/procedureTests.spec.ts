import { test, expect } from '../fixtures';
import { DataGenerator } from '../../utils/DataGenerator';

test.describe('Procedures - Configuration & Documentation Tab Tests', () => {
    let procedureData: { name: string; description: string };

    test.beforeEach(async ({ homePage, proceduresPage }) => {
        procedureData = DataGenerator.randomProcedureData();
        console.log('[TEST] Validating home page is opened...');
        await homePage.validateHomePageIsOpened();
        console.log('[TEST] Selecting QA Dev company...');
        await proceduresPage.selectQADevCompany();
        console.log('[TEST] Navigating to Procedures page...');
        await proceduresPage.navigateToProcedures();
        console.log('[TEST] Procedures page loaded');
    });

    test.afterEach(async ({ proceduresPage, request }) => {
        if (procedureData && procedureData.name) {
            console.log('[TEST] Cleaning up procedure via API:', procedureData.name);
            const deleted = await proceduresPage.deleteProcedureByNameViaApi(request, procedureData.name).catch((err) => {
                console.warn('[TEST] API cleanup error:', err);
                return false;
            });
            if (!deleted) {
                console.log('[TEST] Procedure was not deleted via API, trying UI cleanup fallback...');
                await proceduresPage.deleteProcedure(procedureData.name).catch(() => {});
            } else {
                console.log('[TEST] Procedure successfully cleaned up via API:', procedureData.name);
            }
        }
    });

    test('Verify that the name of file is not clickable but downloadable via 3-dots menu - Documentation tab - Video appointment procedure creation @XR-2291 @regression', async ({ proceduresPage }) => {
        test.slow();
        const folderTitle = `Auto Folder ${Math.floor(1000 + Math.random() * 9000)}`;
        console.log('[TEST] Starting procedure creation with name:', procedureData.name);

        // 1. Open create procedure drawer
        console.log('[TEST] Step 1: Opening create procedure drawer...');
        await proceduresPage.openCreateProcedureDrawer();

        // 2. Select Video-appointment procedure type
        console.log('[TEST] Selecting Video-appointment...');
        await proceduresPage.selectVideoAppointmentProcedure();

        // 3. Fill procedure details and continue
        console.log('[TEST] Step 2: Filling procedure details...');
        await proceduresPage.fillProcedureDetails(procedureData);
        console.log('[TEST] Clicking continue...');
        await proceduresPage.clickContinue();

        // 4. Navigate to Documentation tab
        console.log('[TEST] Step 3: Navigating to Documentation tab...');
        await proceduresPage.navigateToDocumentationTab();

        // 5. Create new Documentation folder
        console.log('[TEST] Step 4: Creating new Documentation folder:', folderTitle);
        await proceduresPage.createDocumentationFolder(folderTitle);

        // 6. Open the created folder
        console.log('[TEST] Step 5: Opening folder:', folderTitle);
        await proceduresPage.openFolder(folderTitle);

        // 7. Add document from OVAC storage inside the folder
        console.log('[TEST] Step 6: Adding document from OVAC storage...');
        const attachedDocName = await proceduresPage.addDocumentFromOvacStorageInExpandedFolder('campos-de-castilla2');
        console.log('[TEST] Attached document name:', attachedDocName);

        // 8. Assert that the document name is NOT clickable (per user clarification for XR-2291)
        console.log('[TEST] Step 7: Verifying document is not clickable...');
        await proceduresPage.verifyDocumentNameIsNotClickable(attachedDocName);

        // 9. Download the document via 3-dots menu
        console.log('[TEST] Step 8: Downloading document via 3-dots menu...');
        const download = await proceduresPage.downloadDocumentFromThreeDots(attachedDocName);

        // 10. Assert download is successful
        const downloadedFileName = download.suggestedFilename();
        console.log('[TEST] Step 9: Downloaded file name:', downloadedFileName);
        expect(downloadedFileName).toBeTruthy();
        expect(downloadedFileName.toLowerCase()).toContain(attachedDocName.toLowerCase());
        console.log('[TEST] Test XR-2291 passed successfully!');
    });

    test('Verify that all elements are displayed in Configuration tab - Video appointment procedure creation @XR-2298 @regression', async ({ proceduresPage }) => {
        test.slow();
        console.log('[TEST] Starting procedure creation for XR-2298 with name:', procedureData.name);

        // 1. Open create procedure drawer
        console.log('[TEST] Step 1: Opening create procedure drawer...');
        await proceduresPage.openCreateProcedureDrawer();

        // 2. Select Video-appointment procedure type
        console.log('[TEST] Selecting Video-appointment...');
        await proceduresPage.selectVideoAppointmentProcedure();

        // 3. Fill procedure details and continue
        console.log('[TEST] Step 2: Filling procedure details...');
        await proceduresPage.fillProcedureDetails(procedureData);

        // 4. Navigate to Configuration tab
        console.log('[TEST] Step 3: Navigating to Configuration tab...');
        await proceduresPage.navigateToConfigurationTab();

        // 5. Verify all sections and elements in Configuration tab
        console.log('[TEST] Step 4: Verifying all Configuration elements (General, Appointments, Security)...');
        await proceduresPage.verifyAllConfigurationElements();
        console.log('[TEST] Test XR-2298 passed successfully!');
    });

    test('Using the toggle switch on the procedure, the administrator can make consent as required @XR-2706 @regression', async ({ proceduresPage, request }) => {
        test.slow();
        const consentTitle = `Consent ${Math.floor(1000 + Math.random() * 9000)}`;
        const consentDesc = `Description for ${consentTitle}`;

        // 1. Create procedure via API
        console.log('[TEST] Step 1: Creating procedure via GraphQL API...');
        const createdProcedure = await proceduresPage.createProcedureViaApi(request, {
            title: procedureData.name,
            description: procedureData.description,
            companyId: 1112,
        });
        console.log('[TEST] Procedure created via API with ID:', createdProcedure.id);

        // 2. Open procedure's Consents tab in UI
        console.log('[TEST] Step 2: Navigating to Consents tab for procedure:', createdProcedure.id);
        await proceduresPage.navigateToProcedureConsents(createdProcedure.id, createdProcedure.companyId);

        // 3. Add consent with initial optional status
        console.log('[TEST] Step 3: Adding consent:', consentTitle);
        await proceduresPage.addConsent(consentTitle, consentDesc, false);

        // 4. Verify consent initial state is Optional (switch not checked)
        console.log('[TEST] Step 4: Verifying consent is initially Optional...');
        await proceduresPage.verifyConsentRequiredState(consentTitle, false);

        // 5. Toggle switch to make consent Required
        console.log('[TEST] Step 5: Toggling Required switch ON...');
        await proceduresPage.toggleConsentRequiredOnCard(consentTitle, true);

        // 6. Verify consent is now Required (switch checked)
        console.log('[TEST] Step 6: Verifying consent is now Required...');
        await proceduresPage.verifyConsentRequiredState(consentTitle, true);

        // 7. Toggle switch back to Optional
        console.log('[TEST] Step 7: Toggling Required switch OFF...');
        await proceduresPage.toggleConsentRequiredOnCard(consentTitle, false);
        await proceduresPage.verifyConsentRequiredState(consentTitle, false);

        // 8. Toggle back to Required
        console.log('[TEST] Step 8: Toggling Required switch ON again...');
        await proceduresPage.toggleConsentRequiredOnCard(consentTitle, true);
        await proceduresPage.verifyConsentRequiredState(consentTitle, true);

        console.log('[TEST] Test XR-2706 passed successfully!');
    });

    test('The administrator can create a “Linear" navigation procedure @XR-2705 @regression', async ({ proceduresPage }) => {
        test.slow();
        console.log('[TEST] Starting procedure creation with Linear navigation, name:', procedureData.name);

        // 1. Open create procedure drawer
        console.log('[TEST] Step 1: Opening create procedure drawer...');
        await proceduresPage.openCreateProcedureDrawer();

        // 2. Select Video-appointment procedure type
        console.log('[TEST] Step 2: Selecting Video-appointment procedure...');
        await proceduresPage.selectVideoAppointmentProcedure();

        // 3. Fill procedure details (Details tab)
        console.log('[TEST] Step 3: Filling procedure details...');
        await proceduresPage.fillProcedureDetails(procedureData);

        // 4. Continue from Details to Entities tab
        console.log('[TEST] Step 4: Continuing to Entities tab...');
        await proceduresPage.clickContinue();

        // 5. Continue from Entities to Consents tab
        console.log('[TEST] Step 5: Continuing to Consents tab...');
        await proceduresPage.clickContinue();

        // 6. Select "Linear" navigation type from dropdown
        console.log('[TEST] Step 6: Selecting "Linear" navigation type...');
        await proceduresPage.selectNavigationType('Linear');

        // 7. Verify "Linear" navigation is selected
        console.log('[TEST] Step 7: Verifying "Linear" navigation is selected...');
        await proceduresPage.verifyNavigationType('Linear');

        // 8. Advance through wizard to Review tab
        console.log('[TEST] Step 8: Advancing wizard to Review tab...');
        await proceduresPage.advanceToReviewTab();

        // 9. Publish the procedure and confirm
        console.log('[TEST] Step 9: Publishing the procedure...');
        await proceduresPage.publishProcedure();

        // 10. Open the published procedure from procedures list
        console.log('[TEST] Step 10: Opening published procedure from list:', procedureData.name);
        await proceduresPage.openProcedureFromList(procedureData.name);

        // 11. Click on Consents step/tab
        console.log('[TEST] Step 11: Navigating to Consents tab of published procedure...');
        await proceduresPage.clickConsentsTabInWizardOrEdit();

        // 12. Verify Navigation type is preserved as "Linear"
        console.log('[TEST] Step 12: Verifying navigation type remains "Linear"...');
        await proceduresPage.verifyNavigationType('Linear');

        console.log('[TEST] Test XR-2705 passed successfully!');
    });

    test('The administrator can create a "Free" navigation procedure @XR-2704 @regression', async ({ proceduresPage }) => {
        test.slow();
        console.log('[TEST] Starting procedure creation with Free navigation, name:', procedureData.name);

        // 1. Open create procedure drawer
        console.log('[TEST] Step 1: Opening create procedure drawer...');
        await proceduresPage.openCreateProcedureDrawer();

        // 2. Select Video-appointment procedure type
        console.log('[TEST] Step 2: Selecting Video-appointment procedure...');
        await proceduresPage.selectVideoAppointmentProcedure();

        // 3. Fill procedure details (Details tab)
        console.log('[TEST] Step 3: Filling procedure details...');
        await proceduresPage.fillProcedureDetails(procedureData);

        // 4. Continue from Details to Entities tab
        console.log('[TEST] Step 4: Continuing to Entities tab...');
        await proceduresPage.clickContinue();

        // 5. Continue from Entities to Consents tab
        console.log('[TEST] Step 5: Continuing to Consents tab...');
        await proceduresPage.clickContinue();

        // 6. Select "Free" navigation type from dropdown
        console.log('[TEST] Step 6: Selecting "Free" navigation type...');
        await proceduresPage.selectNavigationType('Free');

        // 7. Verify "Free" navigation is selected
        console.log('[TEST] Step 7: Verifying "Free" navigation is selected...');
        await proceduresPage.verifyNavigationType('Free');

        // 8. Advance through wizard to Review tab
        console.log('[TEST] Step 8: Advancing wizard to Review tab...');
        await proceduresPage.advanceToReviewTab();

        // 9. Publish the procedure and confirm
        console.log('[TEST] Step 9: Publishing the procedure...');
        await proceduresPage.publishProcedure();

        // 10. Open the published procedure from procedures list
        console.log('[TEST] Step 10: Opening published procedure from list:', procedureData.name);
        await proceduresPage.openProcedureFromList(procedureData.name);

        // 11. Click on Consents step/tab
        console.log('[TEST] Step 11: Navigating to Consents tab of published procedure...');
        await proceduresPage.clickConsentsTabInWizardOrEdit();

        // 12. Verify Navigation type is preserved as "Free"
        console.log('[TEST] Step 12: Verifying navigation type remains "Free"...');
        await proceduresPage.verifyNavigationType('Free');

        console.log('[TEST] Test XR-2704 passed successfully!');
    });

    test('The user is able to Delete already existing procedure - Procedures @XR-1612 @regression', async ({ proceduresPage, request }) => {
        test.slow();
        console.log('[TEST] Starting XR-1612 - Delete procedure with name:', procedureData.name);

        // 1. Create procedure via API
        console.log('[TEST] Step 1: Creating procedure via GraphQL API...');
        const createdProcedure = await proceduresPage.createProcedureViaApi(request, {
            title: procedureData.name,
            description: procedureData.description,
            companyId: 1112,
        });
        console.log('[TEST] Procedure created via API with ID:', createdProcedure.id);

        // 2. Navigate to Procedures page and verify procedure in table
        console.log('[TEST] Step 2: Navigating to Procedures page and verifying created procedure exists in list...');
        await proceduresPage.navigateToProcedures();
        await proceduresPage.searchProcedure(procedureData.name);
        await proceduresPage.verifyProcedureInTable(procedureData.name);

        // 3. Scroll horizontally to 3-dots action button
        console.log('[TEST] Step 3: Scrolling horizontally to 3-dots action button...');
        await proceduresPage.scrollToProcedureActions(procedureData.name);

        // 4. Delete procedure via UI
        console.log('[TEST] Step 4: Deleting procedure via UI...');
        await proceduresPage.deleteProcedure(procedureData.name, 'test something');

        // 5. Verify delete success alert
        console.log('[TEST] Step 5: Verifying delete success alert...');
        await proceduresPage.verifyDeleteSuccessAlert();

        // 6. Verify procedure is no longer displayed in the table
        console.log('[TEST] Step 6: Verifying procedure no longer appears in table...');
        await proceduresPage.searchProcedure(procedureData.name);
        await proceduresPage.verifyProcedureNotInTable(procedureData.name);

        // Clean up reference so afterEach does not re-attempt deletion
        procedureData.name = '';
        console.log('[TEST] Test XR-1612 passed successfully!');
    });
});

