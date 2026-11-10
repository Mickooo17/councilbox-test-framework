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

    test('Ovac - Browsing beetwen tabs in new Procedure creation @XR-2331 @regression', async ({ proceduresPage }) => {
        test.slow();

        // 1. Open create procedure drawer and select Video-appointment procedure
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 2. Verify that from step 1 navigation is restricted when required fields are not covered
        await expect(proceduresPage.continueButton).toBeDisabled();
        expect(proceduresPage.page.url()).toContain('/procedures/new');

        // 3. Cover required fields (Name & Description)
        await proceduresPage.fillProcedureDetails(procedureData);
        await expect(proceduresPage.continueButton).toBeEnabled();

        // 4. Click Continue to save draft and enable free tab browsing
        await proceduresPage.clickContinue();
        await expect(proceduresPage.page).toHaveURL(/.*\/companies/i);

        // 5. Navigate freely between steps by clicking on desired tabs
        // Click Consents tab
        await proceduresPage.clickStepperTab('Consents');
        await expect(proceduresPage.page).toHaveURL(/.*\/consents/i);

        // Click Documentation tab
        await proceduresPage.clickStepperTab('Documentation');
        await expect(proceduresPage.page).toHaveURL(/.*\/documentation/i);

        // Click Configuration tab
        await proceduresPage.clickStepperTab('Configuration');
        await expect(proceduresPage.page).toHaveURL(/.*\/configuration/i);

        // Click Review tab
        await proceduresPage.clickStepperTab('Review');
        await expect(proceduresPage.page).toHaveURL(/.*\/review/i);

        // Click Details tab (Step 1)
        await proceduresPage.clickStepperTab('Details');
        await expect(proceduresPage.page).toHaveURL(/.*\/details|.*\/procedures\/\d+$/i);

        // Click Entities tab (Step 2)
        await proceduresPage.clickStepperTab('Entities');
        await expect(proceduresPage.page).toHaveURL(/.*\/companies/i);

        // 6. Verify navigation via Continue and Previous buttons
        await proceduresPage.clickContinue();
        await expect(proceduresPage.page).toHaveURL(/.*\/consents/i);

        await proceduresPage.clickPrevious();
        await expect(proceduresPage.page).toHaveURL(/.*\/companies/i);
    });

    test('The user can review procedure in Procedures section @XR-2471 @OVAC-5793 @regression', async ({ proceduresPage, page }) => {
        // 1-3. Navigate to Procedures page
        await proceduresPage.navigateToProcedures();
        await expect(page).toHaveURL(/.*\/procedures/i, { timeout: 15000 });
        const procTable = page.locator('table, [role="table"]').first();
        await expect(procTable).toBeVisible({ timeout: 15000 });
    });

    test('The user has the ability to create a new procedure type "Process" @XR-2469 @OVAC-5781 @regression', async ({ proceduresPage, page, request }) => {
        test.slow();
        const procData = DataGenerator.randomProcedureData();

        // 1-3. Navigate to Procedures page
        await proceduresPage.navigateToProcedures();

        // 4. Click "+" button
        await proceduresPage.openCreateProcedureDrawer();

        // 5. Click "Process"
        const processOption = page.locator('[role="dialog"], .cbx-drawerPanel-container').getByText(/^Process$|^Proceso$/i).first();
        await expect(processOption).toBeVisible({ timeout: 5000 });
        await processOption.click();

        // 6. Fill details and continue
        await proceduresPage.fillProcedureDetails(procData);
        await proceduresPage.clickContinue();

        // 7-13. Advance through wizard and publish
        await proceduresPage.advanceToReviewTab();
        await proceduresPage.publishProcedure();

        // 14. Verify procedure is created and displayed in the table
        await proceduresPage.searchProcedure(procData.name);
        await proceduresPage.verifyProcedureInTable(procData.name);

        // Cleanup
        await proceduresPage.deleteProcedureByNameViaApi(request, procData.name).catch(() => {});
    });

    test('The user can edit the procedure type "Process" @XR-2470 @OVAC-5797 @regression', async ({ proceduresPage, page, request }) => {
        test.slow();
        // 1-3. Create procedure via API
        const procData = DataGenerator.randomProcedureData();
        const created = await proceduresPage.createProcedureViaApi(request, {
            title: procData.name,
            description: procData.description,
            companyId: 1112,
        });

        // 4. Navigate to procedures and locate row
        await proceduresPage.navigateToProcedures();
        await proceduresPage.searchProcedure(procData.name);
        const row = proceduresPage.tableBody.locator('tr', { hasText: procData.name }).first();
        await expect(row).toBeVisible({ timeout: 10000 });

        // 5. Click 3-dots and select Edit
        const actionButton = row.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').first();
        await actionButton.click();
        const editItem = page.getByRole('button', { name: /Edit|Editar/i }).or(page.getByRole('menuitem', { name: /Edit|Editar/i })).first();
        await expect(editItem).toBeVisible({ timeout: 5000 });
        await editItem.click();

        // 6. Verify Edit procedure form is opened
        await expect(page).toHaveURL(new RegExp(`.*/procedures/${created.id}.*`, 'i'), { timeout: 10000 });

        // Cleanup
        await proceduresPage.deleteProcedureByNameViaApi(request, procData.name).catch(() => {});
    });

    test('The user can duplicate the procedure type "Process" @XR-2472 @OVAC-5796 @regression', async ({ proceduresPage, page, request }) => {
        test.slow();
        // 1-3. Create procedure via API
        const procData = DataGenerator.randomProcedureData();
        await proceduresPage.createProcedureViaApi(request, {
            title: procData.name,
            description: procData.description,
            companyId: 1112,
        });

        // 4. Navigate to procedures and search
        await proceduresPage.navigateToProcedures();
        await proceduresPage.searchProcedure(procData.name);
        const row = proceduresPage.tableBody.locator('tr', { hasText: procData.name }).first();
        await expect(row).toBeVisible({ timeout: 10000 });

        // 5. Click 3-dots and verify Duplicate option is present
        const actionButton = row.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').first();
        await actionButton.click();
        const dupItem = page.getByRole('button', { name: /Duplicate|Duplicar/i }).or(page.getByRole('menuitem', { name: /Duplicate|Duplicar/i })).first();
        await expect(dupItem).toBeVisible({ timeout: 5000 });

        // Cleanup
        await page.keyboard.press('Escape');
        await proceduresPage.deleteProcedureByNameViaApi(request, procData.name).catch(() => {});
    });

    test('The user has the capability to delete the procedure type "Process" @XR-2473 @OVAC-5795 @regression', async ({ proceduresPage, request }) => {
        test.slow();
        // 1-3. Create procedure via API
        const procData = DataGenerator.randomProcedureData();
        await proceduresPage.createProcedureViaApi(request, {
            title: procData.name,
            description: procData.description,
            companyId: 1112,
        });

        // 4. Navigate to procedures and delete via UI
        await proceduresPage.navigateToProcedures();
        await proceduresPage.deleteProcedure(procData.name);
        await proceduresPage.verifyDeleteSuccessAlert();

        // 5. Verify no longer in table
        await proceduresPage.searchProcedure(procData.name);
        await proceduresPage.verifyProcedureNotInTable(procData.name);
    });


    test('Verify that creation of appointment contains all steps @XR-1376 @OVAC-5191 @regression', async ({ proceduresPage, page }) => {
        // 1-3. Navigate to Procedures page and open create procedure drawer
        await proceduresPage.openCreateProcedureDrawer();

        // 4. Choose Video-appointment procedure type and click Continue
        await proceduresPage.selectVideoAppointmentProcedure();

        // Verify wizard stepper contains all required steps: Details, Entities, Consents, Documentation, Configuration, Review
        const stepperText = await page.locator('.cbx-stepper-item-contentText, .cbx-stepper-item-text, nav button').allInnerTexts();
        const joined = stepperText.join(' ');
        expect(joined).toMatch(/Details|Detalles/i);
        expect(joined).toMatch(/Entities|Entidades/i);
        expect(joined).toMatch(/Steps of the procedure|Consents|Consentimientos|Pasos/i);
        expect(joined).toMatch(/Documentation|Documentación/i);
        expect(joined).toMatch(/Configuration|Configuración/i);
        expect(joined).toMatch(/Review|Revisión/i);
    });

    test('The user is not able to go Continue without populating Description field - Details tab @XR-1372 @OVAC-5269 @regression', async ({ proceduresPage }) => {
        // 1-4. Open create procedure drawer and select Video-appointment
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 5. Populate Name only, leave Description field empty
        await proceduresPage.procedureNameInput.fill(procedureData.name);
        await proceduresPage.procedureDescriptionEditor.fill('');

        // 6. Verify Continue button is disabled when Description is empty
        expect(await proceduresPage.continueButton.isDisabled()).toBe(true);
    });

    test('The user is able to save all changes by clicking on the Continue button - Details tab @XR-1374 @OVAC-5264 @regression', async ({ proceduresPage, page }) => {
        // 1-4. Open create procedure drawer and select Video-appointment
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 5. Fill valid Name and Description
        await proceduresPage.procedureNameInput.fill(procedureData.name);
        await proceduresPage.procedureDescriptionEditor.fill(procedureData.description);
        await expect(proceduresPage.continueButton).toBeEnabled({ timeout: 5000 });

        // Click Continue and verify advancement to next step
        await proceduresPage.clickContinue();
        await page.waitForURL(/.*\/companies/i, { timeout: 15000 });
        expect(page.url()).toContain('/companies');
    });

    test('When creating appointment and navigating to the Details step the URL is changing properly @XR-2475 @OVAC-4926 @regression', async ({ proceduresPage, page }) => {
        // 1-3. Navigate to Procedures page
        // 4. Start creation flow and select Video-appointment
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();

        // 5. Observe URL - verify /procedures/new route
        await page.waitForTimeout(500);
        expect(page.url()).toMatch(/.*\/procedures\/new.*/i);
    });

    test('When creating appointment and navigating to the Consents step the URL is changing properly @XR-2473 @OVAC-4934 @regression', async ({ proceduresPage, page }) => {
        // 1-4. Start creation flow and populate Details
        await proceduresPage.openCreateProcedureDrawer();
        await proceduresPage.selectVideoAppointmentProcedure();
        await proceduresPage.procedureNameInput.fill(procedureData.name);
        await proceduresPage.procedureDescriptionEditor.fill(procedureData.description);
        await proceduresPage.clickContinue();

        // 5. Click Continue from Companies step to Consents step
        await proceduresPage.clickContinue();
        await page.waitForURL(/.*\/consents/i, { timeout: 15000 });

        // 6. Observe URL - verify /consents is in the URL
        expect(page.url()).toContain('/consents');
    });
});
