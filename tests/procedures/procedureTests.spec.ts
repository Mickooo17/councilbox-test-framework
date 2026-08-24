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

    test.afterEach(async ({ proceduresPage }) => {
        if (procedureData && procedureData.name) {
            console.log('[TEST] Cleaning up procedure:', procedureData.name);
            await proceduresPage.deleteProcedure(procedureData.name).catch(() => {});
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
});
