import { Page, Locator, expect, test, Download, APIRequestContext } from '@playwright/test';
import { BasePage } from '../BasePage';
import { ProcedureApiHelper, CreateProcedureApiOptions, CreatedProcedureData } from '../../utils/procedures/ProcedureApiHelper';
import { MESSAGES } from '../../utils/Constants';
import { resolveCompanyUrl } from '../../utils/UrlHelper';

export interface ProcedureData {
    name: string;
    description: string;
}

export class ProceduresPage extends BasePage {
    readonly addProcedureButton: Locator;
    readonly videoAppointmentOption: Locator;
    readonly procedureNameInput: Locator;
    readonly procedureDescriptionEditor: Locator;
    readonly continueButton: Locator;
    readonly previousButton: Locator;
    readonly documentationTab: Locator;
    readonly consentsTab: Locator;
    readonly addFolderButton: Locator;
    readonly addConsentButton: Locator;
    readonly folderTitleInput: Locator;
    readonly consentTitleInput: Locator;
    readonly searchProceduresInput: Locator;
    readonly tableBody: Locator;

    // Configuration - General Section
    readonly generalHeading: Locator;
    readonly languagesHeading: Locator;
    readonly languagesDescription: Locator;
    readonly languageOptionEspanol: Locator;
    readonly languageOptionEnglish: Locator;
    readonly languageOptionGalego: Locator;
    readonly languageOptionValencia: Locator;
    readonly languageOptionCatala: Locator;
    readonly languageOptionItaliano: Locator;
    readonly languageOptionEuskera: Locator;

    readonly consentsHeading: Locator;
    readonly consentsReorderLabel: Locator;
    readonly consentsEditingLabel: Locator;

    readonly noticesHeading: Locator;
    readonly notificationsToggleLabel: Locator;
    readonly noticeEmailCheckbox: Locator;
    readonly noticeSmsCheckbox: Locator;
    readonly noticeWhatsappCheckbox: Locator;
    readonly defaultMethodLabel: Locator;

    // Configuration - Appointments Section
    readonly appointmentsHeading: Locator;
    readonly optionsHeading: Locator;
    readonly representativeToggleLabel: Locator;
    readonly requestAndRescheduleToggleLabel: Locator;
    readonly minApplicationPeriodLabel: Locator;
    readonly maxApplicationPeriodLabel: Locator;
    readonly automaticCancellationToggleLabel: Locator;
    readonly cancelAppointmentToggleLabel: Locator;
    readonly internalNotesRequiredCheckbox: Locator;
    readonly conclusionsSignatureCheckbox: Locator;

    readonly agendaHeading: Locator;
    readonly timeAllocatedLabel: Locator;

    readonly evidenceHeading: Locator;
    readonly recordingLabel: Locator;
    readonly typeOfRecordingLabel: Locator;

    readonly biometricHeading: Locator;
    readonly biometricAutoRadio: Locator;
    readonly biometricManualValidationRadio: Locator;

    // Configuration - Security Section
    readonly securityHeading: Locator;
    readonly secureAccessHeading: Locator;
    readonly personalIdentificationText: Locator;
    readonly appointmentsCompletedText: Locator;
    readonly accessRolesLabel: Locator;

    readonly documentsAndReportsHeading: Locator;
    readonly signatureVisibilityToggleLabel: Locator;
    readonly automaticReportToggleLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.addProcedureButton = page.locator('#add-procedure-button, .MuiFab-root, button[aria-label="Add procedure"]').or(page.getByRole('button', { name: /Add procedure|Nueva|Nuevo|\+/i })).first();
        this.videoAppointmentOption = page.locator('#council_type_videocall').or(page.getByText('Live procedure via')).first();
        this.procedureNameInput = page.locator('#procedure-name-input').or(page.getByPlaceholder(/Name of the procedure/i)).first();
        this.procedureDescriptionEditor = page.locator('.ql-editor').first();
        this.continueButton = page.locator('#procedure-editor-next').or(page.getByRole('button', { name: /Continue|Continuar/i })).first();
        this.previousButton = page.locator('#procedure-editor-prev').or(page.getByRole('button', { name: /Previous|Anterior/i })).first();
        this.documentationTab = page.locator('[role="tab"], .MuiTab-root, button, p, div').filter({ hasText: /^Documentation$|^Documentación$/i }).first();
        this.consentsTab = page.locator('[role="tab"], .MuiTab-root, button, p, div').filter({ hasText: /^Consents$|^Consentimientos$/i }).first();
        this.addFolderButton = page.locator('#default-page-button, .MuiFab-root, button[aria-label*="Add" i]').or(page.getByRole('button', { name: /Add|Añadir/i })).first();
        this.addConsentButton = page.getByRole('button', { name: /^Add$|^Añadir$/i }).or(page.locator('.MuiFab-root, button.MuiFab-primary')).first();
        this.folderTitleInput = page.locator('#document-editor-title-input').or(page.getByLabel(/Title/i)).first();
        this.consentTitleInput = page.locator('#agenda-editor-title-input').or(page.getByLabel(/Title/i)).first();
        this.searchProceduresInput = page.getByPlaceholder('Search for procedures').or(page.locator('input[placeholder*="Search" i]')).first();
        this.tableBody = page.locator('tbody');

        // Configuration - General
        this.generalHeading = page.getByRole('heading', { name: /General/i }).or(page.getByText(/^General$/i)).first();
        this.languagesHeading = page.getByRole('heading', { name: /Languages|Idiomas/i }).or(page.getByText(/^LANGUAGES$|^IDIOMAS$/i)).first();
        this.languagesDescription = page.getByText(/Languages available for the procedure|Idiomas disponibles/i).first();
        this.languageOptionEspanol = page.getByText('Español').first();
        this.languageOptionEnglish = page.getByText('English').first();
        this.languageOptionGalego = page.getByText('Galego').first();
        this.languageOptionValencia = page.getByText('Valencià').first();
        this.languageOptionCatala = page.getByText('Català').first();
        this.languageOptionItaliano = page.getByText('Italiano').first();
        this.languageOptionEuskera = page.getByText('Euskera').first();

        this.consentsHeading = page.getByRole('heading', { name: /Consents|Consentimientos/i }).or(page.getByText(/^CONSENTS$|^CONSENTIMIENTOS$/i)).first();
        this.consentsReorderLabel = page.getByText(/Reorder|Reordenar/i).first();
        this.consentsEditingLabel = page.getByText(/Editing after meeting call|Edición tras convocatoria/i).first();

        // Notices
        this.noticesHeading = page.getByRole('heading', { name: /Notices|Avisos/i }).or(page.getByText(/^NOTICES$|^AVISOS$/i)).first();
        this.notificationsToggleLabel = page.getByText(/Notifications|Notificaciones/i).first();
        this.noticeEmailCheckbox = page.getByLabel(/E-mail|Email/i).or(page.getByText(/^E-mail$|^Email$/i)).first();
        this.noticeSmsCheckbox = page.getByLabel('SMS').or(page.getByText(/^SMS$/i)).first();
        this.noticeWhatsappCheckbox = page.getByLabel(/WhatsApp/i).or(page.getByText(/^WhatsApp$/i)).first();
        this.defaultMethodLabel = page.getByText(/Default method|Método por defecto/i).first();

        // Configuration - Appointments
        this.appointmentsHeading = page.getByRole('heading', { name: /Appointments|Citas/i }).or(page.getByText(/^Appointments$|^Citas$/i)).first();
        this.optionsHeading = page.getByText(/^OPTIONS:|^OPCIONES:/i).first();
        this.representativeToggleLabel = page.getByText(/Representative|Representante/i).first();
        this.requestAndRescheduleToggleLabel = page.getByText(/Request and reschedule appointment|Solicitar y reprogramar cita/i).first();
        this.minApplicationPeriodLabel = page.getByText(/Minimum application period|Plazo mínimo de solicitud/i).first();
        this.maxApplicationPeriodLabel = page.getByText(/Maximum application period|Plazo máximo de solicitud/i).first();
        this.automaticCancellationToggleLabel = page.getByText(/Automatic cancellation|Cancelación automática/i).first();
        this.cancelAppointmentToggleLabel = page.getByText(/Cancel appointment|Cancelar cita/i).first();
        this.internalNotesRequiredCheckbox = page.getByText(/Required to complete the appointment|Obligatorio para completar la cita/i).first();
        this.conclusionsSignatureCheckbox = page.getByText(/Require participants' signature|Requerir firma de los participantes/i).first();

        // Agenda
        this.agendaHeading = page.getByRole('heading', { name: /Agenda/i }).or(page.getByText(/^AGENDA$/i)).first();
        this.timeAllocatedLabel = page.getByText(/Time allocated to each appointment|Tiempo asignado a cada cita/i).first();

        // Evidence
        this.evidenceHeading = page.getByRole('heading', { name: /Evidence|Evidencias/i }).or(page.getByText(/^EVIDENCE$|^EVIDENCIAS$/i)).first();
        this.recordingLabel = page.getByText(/^Recording$|^Grabación$/i).first();
        this.typeOfRecordingLabel = page.getByText(/Type of recording|Tipo de grabación/i).first();

        // Biometric Identification
        this.biometricHeading = page.getByRole('heading', { name: /Biometric identification|Identificación biométrica/i }).or(page.getByText(/^BIOMETRIC IDENTIFICATION$|^IDENTIFICACIÓN BIOMÉTRICA$/i)).first();
        this.biometricAutoRadio = page.getByText(/Automatic biometric identification\.|Identificación biométrica automática\./i).first();
        this.biometricManualValidationRadio = page.getByText(/Automatic biometric identification with manual validation\.|Identificación biométrica automática con validación manual\./i).first();

        // Configuration - Security
        this.securityHeading = page.getByRole('heading', { name: /Security|Seguridad/i }).or(page.getByText(/^Security$|^Seguridad$/i)).first();
        this.secureAccessHeading = page.getByRole('heading', { name: /Secure access|Acceso seguro/i }).or(page.getByText(/^SECURE ACCESS$|^ACCESO SEGURO$/i)).first();
        this.personalIdentificationText = page.getByText(/Personal identification number or Passport|Documento de identity o Pasaporte/i).first();
        this.appointmentsCompletedText = page.getByText(/Appointments completed|Citas finalizadas/i).first();
        this.accessRolesLabel = page.getByText(/Access roles|Roles de acceso/i).first();

        // Documents and Reports
        this.documentsAndReportsHeading = page.getByRole('heading', { name: /Documents and reports|Documentos e informes/i }).or(page.getByText(/^DOCUMENTS AND REPORTS$|^DOCUMENTOS E INFORMES$/i)).first();
        this.signatureVisibilityToggleLabel = page.getByText(/Signature visibility|Visibilidad de firma/i).first();
        this.automaticReportToggleLabel = page.getByText(/Automatic report|Informe automatico/i).first();
    }

    /**
     * Creates a procedure via API using GraphQL mutation
     */
    async createProcedureViaApi(requestContext: APIRequestContext, options?: CreateProcedureApiOptions): Promise<CreatedProcedureData> {
        return await test.step('Create procedure via API', async () => {
            return await ProcedureApiHelper.createProcedure(requestContext, options);
        });
    }

    /**
     * Deletes procedures by IDs via GraphQL API mutation
     */
    async deleteProceduresByIdsViaApi(requestContext: APIRequestContext, statuteIds: (number | string)[], reason?: string): Promise<boolean> {
        return await test.step(`Delete procedures via API: [${statuteIds.join(', ')}]`, async () => {
            return await ProcedureApiHelper.deleteProceduresByIds(requestContext, statuteIds, reason);
        });
    }

    /**
     * Finds a procedure by name and deletes it via GraphQL API
     */
    async deleteProcedureByNameViaApi(requestContext: APIRequestContext, name: string, companyId: number = 1112, reason?: string): Promise<boolean> {
        return await test.step(`Delete procedure "${name}" via API`, async () => {
            return await ProcedureApiHelper.deleteProcedureByName(requestContext, name, companyId, reason);
        });
    }

    async navigateToProcedureConsents(procedureId: string | number, companyId: number = 1112) {
        await test.step(`Navigate to Consents tab of procedure ${procedureId}`, async () => {
            await this.page.goto(resolveCompanyUrl(companyId, `procedures/${procedureId}/consents`), { waitUntil: 'domcontentloaded' });
            await this.page.waitForLoadState('networkidle');
            await this.dismissToastOrModal();
            await this.page.waitForTimeout(1500);
        });
    }

    async addConsent(title: string, description: string, isRequired: boolean = false) {
        await test.step(`Add consent: ${title} (Required: ${isRequired})`, async () => {
            await this.dismissToastOrModal();
            await this.page.waitForTimeout(500);

            // Click ADD button on Consents tab
            const addBtn = this.page.getByRole('button', { name: /^Add$|^Añadir$/i }).or(this.page.locator('.MuiFab-root, button.MuiFab-primary')).first();
            await addBtn.waitFor({ state: 'visible', timeout: 15000 });
            await addBtn.click({ force: true });
            await this.page.waitForTimeout(1000);

            // Click on "Consents" type card in the Add consent drawer
            const consentsCard = this.page.locator('.MuiCard-root').filter({ hasText: /Consents|Consentimientos/i }).first();
            if (!await consentsCard.isVisible({ timeout: 3000 }).catch(() => false)) {
                await addBtn.click({ force: true });
                await this.page.waitForTimeout(1000);
            }
            await consentsCard.waitFor({ state: 'visible', timeout: 15000 });
            await consentsCard.click({ force: true });
            await this.page.waitForTimeout(1000);

            // Target the active consent detail drawer
            const titleInput = this.page.locator('#agenda-editor-title-input').or(this.page.getByLabel(/Title/i)).first();
            await titleInput.waitFor({ state: 'visible', timeout: 15000 });
            await titleInput.fill(title);

            const descEditor = this.page.locator('.ql-editor').first();
            await descEditor.waitFor({ state: 'visible', timeout: 15000 });
            await descEditor.fill(description);

            // If required toggle is requested
            if (isRequired) {
                const reqSwitchToggle = this.page.locator('.cbx-switch span').last();
                const reqSwitchInput = this.page.locator('.cbx-switch input').last();
                const isChecked = await reqSwitchInput.isChecked();
                if (!isChecked) {
                    await reqSwitchToggle.click({ force: true });
                    await this.page.waitForTimeout(500);
                }
            }

            // Click SAVE button in drawer
            const saveBtn = this.page.locator('#-button-accept, button').filter({ hasText: /^SAVE$|^Guardar$/i }).first();
            await saveBtn.waitFor({ state: 'visible', timeout: 10000 });
            await saveBtn.click({ force: true });
            await titleInput.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
            await this.page.waitForTimeout(2000);
        });
    }

    async toggleConsentRequiredOnCard(title: string, targetRequired?: boolean) {
        await test.step(`Toggle Required switch for consent: "${title}"`, async () => {
            const card = this.page.locator('.MuiAccordion-root').filter({ hasText: title }).first();
            await card.waitFor({ state: 'visible', timeout: 20000 });

            const switchToggle = card.locator('.cbx-switch span').first();
            const switchInput = card.locator('.cbx-switch input').first();
            await switchToggle.waitFor({ state: 'visible', timeout: 10000 });
            const currentState = await switchInput.isChecked();

            if (targetRequired === undefined || targetRequired !== currentState) {
                await switchToggle.click({ force: true });
                await this.page.waitForTimeout(1000);
            }
        });
    }

    async verifyConsentRequiredState(title: string, expectedRequired: boolean) {
        await test.step(`Verify consent "${title}" Required state is ${expectedRequired}`, async () => {
            const card = this.page.locator('.MuiAccordion-root').filter({ hasText: title }).first();
            await card.waitFor({ state: 'visible', timeout: 20000 });

            const switchInput = card.locator('.cbx-switch input').first();
            if (expectedRequired) {
                await expect(switchInput).toBeChecked();
            } else {
                await expect(switchInput).not.toBeChecked();
            }
        });
    }

    async openCreateProcedureDrawer() {
        await test.step('Open create procedure drawer', async () => {
            await this.dismissToastOrModal();
            await this.addProcedureButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.addProcedureButton.click();
        });
    }

    async selectVideoAppointmentProcedure() {
        await test.step('Select Video-appointment procedure type', async () => {
            await this.videoAppointmentOption.waitFor({ state: 'visible', timeout: 10000 });
            await this.videoAppointmentOption.click();
            await this.procedureNameInput.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

    async fillProcedureDetails(data: ProcedureData) {
        await test.step(`Fill procedure details: ${data.name}`, async () => {
            await this.procedureNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.procedureNameInput.fill(data.name);
            await this.procedureDescriptionEditor.waitFor({ state: 'visible', timeout: 10000 });
            await this.procedureDescriptionEditor.fill(data.description);
        });
    }

    async editProcedureDetails(data: { name?: string; description?: string }) {
        await test.step(`Edit procedure details${data.name ? ` (New Name: "${data.name}")` : ''}`, async () => {
            if (data.name) {
                await this.procedureNameInput.waitFor({ state: 'visible', timeout: 10000 });
                await this.procedureNameInput.fill(data.name);
            }
            if (data.description) {
                await this.procedureDescriptionEditor.waitFor({ state: 'visible', timeout: 10000 });
                await this.procedureDescriptionEditor.fill(data.description);
            }
            await this.clickContinue();
            await this.page.waitForTimeout(1000);
        });
    }

    async clickContinue() {
        await test.step('Click Continue button', async () => {
            await this.continueButton.click();
            await this.page.waitForTimeout(500);
        });
    }

    async navigateToDocumentationTab() {
        await test.step('Navigate to Documentation tab in procedure creation', async () => {
            await this.documentationTab.waitFor({ state: 'visible', timeout: 10000 });
            await this.documentationTab.click();
            await this.page.waitForTimeout(1000);
            await this.addFolderButton.waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    async navigateToConfigurationTab() {
        await test.step('Navigate to Configuration tab in procedure creation', async () => {
            await this.dismissToastOrModal();

            // Advance through wizard steps until reaching /configuration URL
            for (let i = 0; i < 6; i++) {
                if (this.page.url().includes('/configuration')) break;

                const nextBtn = this.page.locator('#procedure-editor-next').or(this.page.getByRole('button', { name: /Continue|Continuar/i })).first();
                if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await nextBtn.click();
                    await this.page.waitForTimeout(1000);
                }
            }

            await this.page.waitForURL(/.*\/configuration/i, { timeout: 15000 });
            await this.languagesHeading.waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    async verifyAllConfigurationElements() {
        await test.step('Verify all elements in Configuration tab (General, Appointments, Security)', async () => {
            // 1. General Section & Subsections
            await expect(this.generalHeading).toBeVisible();
            await expect(this.languagesHeading).toBeVisible();
            await expect(this.languagesDescription).toBeVisible();

            // Languages
            await expect(this.languageOptionEspanol).toBeVisible();
            await expect(this.languageOptionEnglish).toBeVisible();
            await expect(this.languageOptionGalego).toBeVisible();
            await expect(this.languageOptionValencia).toBeVisible();
            await expect(this.languageOptionCatala).toBeVisible();
            await expect(this.languageOptionItaliano).toBeVisible();
            await expect(this.languageOptionEuskera).toBeVisible();

            // Consents
            await expect(this.consentsHeading).toBeVisible();
            await expect(this.consentsReorderLabel).toBeVisible();
            await expect(this.consentsEditingLabel).toBeVisible();

            // Notices
            await expect(this.noticesHeading).toBeVisible();
            await expect(this.notificationsToggleLabel).toBeVisible();
            await expect(this.noticeEmailCheckbox).toBeVisible();
            await expect(this.noticeSmsCheckbox).toBeVisible();
            await expect(this.noticeWhatsappCheckbox).toBeVisible();
            await expect(this.defaultMethodLabel).toBeVisible();

            // 2. Appointments Section & Subsections
            await expect(this.appointmentsHeading).toBeVisible();
            await expect(this.optionsHeading).toBeVisible();
            await expect(this.representativeToggleLabel).toBeVisible();
            await expect(this.requestAndRescheduleToggleLabel).toBeVisible();
            await expect(this.minApplicationPeriodLabel).toBeVisible();
            await expect(this.maxApplicationPeriodLabel).toBeVisible();
            await expect(this.automaticCancellationToggleLabel).toBeVisible();
            await expect(this.cancelAppointmentToggleLabel).toBeVisible();
            await expect(this.internalNotesRequiredCheckbox).toBeVisible();
            await expect(this.conclusionsSignatureCheckbox).toBeVisible();

            // Agenda
            await expect(this.agendaHeading).toBeVisible();
            await expect(this.timeAllocatedLabel).toBeVisible();

            // Evidence
            await expect(this.evidenceHeading).toBeVisible();
            await expect(this.recordingLabel).toBeVisible();
            await expect(this.typeOfRecordingLabel).toBeVisible();

            // Biometric Identification
            await expect(this.biometricHeading).toBeVisible();
            await expect(this.biometricAutoRadio).toBeVisible();
            await expect(this.biometricManualValidationRadio).toBeVisible();

            // 3. Security Section & Subsections
            await expect(this.securityHeading).toBeVisible();
            await expect(this.secureAccessHeading).toBeVisible();
            await expect(this.personalIdentificationText).toBeVisible();
            await expect(this.appointmentsCompletedText).toBeVisible();
            await expect(this.accessRolesLabel).toBeVisible();

            // Documents and Reports
            await expect(this.documentsAndReportsHeading).toBeVisible();
            await expect(this.signatureVisibilityToggleLabel).toBeVisible();
            await expect(this.automaticReportToggleLabel).toBeVisible();
        });
    }

    async createDocumentationFolder(folderTitle: string) {
        await test.step(`Create documentation folder: ${folderTitle}`, async () => {
            await this.dismissToastOrModal();
            await this.addFolderButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.addFolderButton.click();
            await this.folderTitleInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.folderTitleInput.fill(folderTitle);

            // Save folder
            const saveBtn = this.page.locator('#-button-accept, button').filter({ hasText: /^SAVE$|^Guardar$/i }).first();
            await saveBtn.evaluate((el) => (el as HTMLElement).click());
            await this.page.waitForTimeout(2000);
            await this.dismissToastOrModal();
        });
    }

    async openFolder(folderTitle: string) {
        await test.step(`Open folder: ${folderTitle}`, async () => {
            await this.dismissToastOrModal();
            const folderItem = this.page.getByText(folderTitle).first();
            await folderItem.waitFor({ state: 'visible', timeout: 10000 });
            await folderItem.click();
            await this.page.waitForTimeout(1500);
        });
    }

    async addDocumentFromOvacStorageInExpandedFolder(docName: string = 'campos-de-castilla2'): Promise<string> {
        return await test.step(`Add document from OVAC storage: ${docName}`, async () => {
            await this.dismissToastOrModal();
            const ovacBtn = this.page.getByRole('button', { name: /OVAC STORAGE/i }).first();
            await ovacBtn.waitFor({ state: 'visible', timeout: 10000 });
            await ovacBtn.click();
            await this.page.waitForTimeout(1500);

            // Select document from OVAC storage drawer
            const docElement = this.page.locator(`img[alt="${docName}"], [alt*="${docName}" i]`).or(
                this.page.getByText(docName)
            ).first();

            let selectedDocName = docName;
            if (await docElement.isVisible({ timeout: 5000 }).catch(() => false)) {
                await docElement.evaluate((el) => (el as HTMLElement).click());
            } else {
                const firstCard = this.page.locator('.cbx-drawerPanel-container').last().locator('.MuiCard-root').filter({ hasNot: this.page.locator('[alt*="logo" i]') }).first();
                await firstCard.waitFor({ state: 'visible', timeout: 10000 });
                await firstCard.evaluate((el) => (el as HTMLElement).click());
                const text = await firstCard.innerText();
                selectedDocName = text.split('\n')[0]?.trim() || '';
            }

            // Click ADD button in the OVAC storage drawer
            await this.page.waitForTimeout(500);
            const addBtn = this.page.locator('button').filter({ hasText: /^ADD$|^Añadir$/i }).last();
            await addBtn.evaluate((el) => (el as HTMLElement).click());
            await this.page.waitForTimeout(2000);
            await this.dismissToastOrModal();

            return selectedDocName;
        });
    }

    async verifyDocumentNameIsNotClickable(docName: string) {
        await test.step(`Verify document name "${docName}" is not clickable`, async () => {
            const docNameElement = this.page.getByText(docName).first();
            await expect(docNameElement).toBeVisible({ timeout: 10000 });

            // Verify it is not an anchor tag (<a>) and not a button link
            const isClickable = await docNameElement.evaluate((el) => {
                const computed = window.getComputedStyle(el);
                const isLink = el.tagName.toLowerCase() === 'a' || el.closest('a') !== null;
                const isPointer = computed.cursor === 'pointer';
                const hasClickRole = el.getAttribute('role') === 'button' || el.getAttribute('role') === 'link';
                return isLink || (isPointer && hasClickRole);
            });

            expect(isClickable).toBeFalsy();
        });
    }

    async downloadDocumentFromThreeDots(docName: string): Promise<Download> {
        return await test.step(`Download document "${docName}" via 3-dots menu`, async () => {
            await this.dismissToastOrModal();

            const docElement = this.page.getByText(docName).first();
            await docElement.waitFor({ state: 'visible', timeout: 10000 });

            // Click 3-dots dropdown menu button for the document
            const docRow = this.page.locator('div[style*="height: 44px"]').filter({ has: docElement }).first();
            const threeDotsButton = docRow.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button').first();
            await threeDotsButton.waitFor({ state: 'visible', timeout: 5000 });
            await threeDotsButton.click({ force: true });
            await this.page.waitForTimeout(500);

            // Set up download listener
            const downloadPromise = this.page.waitForEvent('download');

            // Click Download option from the cbx dropdown menu
            const downloadMenuItem = this.page.locator('li[id^="download"], .cbx-menuItem:has-text("Download")').or(
                this.page.getByRole('menuitem', { name: /Download|Descargar/i })
            ).first();
            if (!await downloadMenuItem.isVisible({ timeout: 3000 }).catch(() => false)) {
                await threeDotsButton.click({ force: true });
                await this.page.waitForTimeout(500);
            }
            await downloadMenuItem.waitFor({ state: 'visible', timeout: 10000 });
            await downloadMenuItem.click({ force: true });

            const download = await downloadPromise;
            return download;
        });
    }

    async selectNavigationType(type: 'Linear' | 'Free') {
        await test.step(`Select Navigation type: ${type}`, async () => {
            const select = this.page.locator('#mui-component-select-Navigation, [aria-labelledby="mui-component-select-Navigation"]').first();
            await select.waitFor({ state: 'visible', timeout: 10000 });
            await select.click({ force: true });
            await this.page.waitForTimeout(500);

            const option = this.page.locator('li[role="option"], .MuiMenuItem-root').filter({ hasText: new RegExp(`^${type}$`, 'i') }).first();
            await option.waitFor({ state: 'visible', timeout: 5000 });
            await option.click({ force: true });
            await this.page.waitForTimeout(1000);
        });
    }

    async verifyNavigationType(expectedType: 'Linear' | 'Free') {
        await test.step(`Verify Navigation type is ${expectedType}`, async () => {
            const select = this.page.locator('#mui-component-select-Navigation, [aria-labelledby="mui-component-select-Navigation"]').first();
            await select.waitFor({ state: 'visible', timeout: 10000 });
            await expect(select).toHaveText(new RegExp(expectedType, 'i'));
        });
    }

    async advanceToReviewTab() {
        await test.step('Advance wizard to Review tab', async () => {
            for (let i = 0; i < 6; i++) {
                if (this.page.url().includes('/review')) break;
                const nextBtn = this.page.locator('#procedure-editor-next').or(this.page.getByRole('button', { name: /Continue|Continuar/i })).first();
                if (await nextBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await nextBtn.click({ force: true });
                    await this.page.waitForTimeout(1000);
                }
            }
            await this.page.waitForURL(/.*\/review/i, { timeout: 15000 });
        });
    }

    async publishProcedure() {
        await test.step('Publish procedure from Review tab', async () => {
            const publishBtn = this.page.locator('#council-editor-publish, button:has-text("PUBLISH"), button:has-text("PUBLICAR")').first();
            await publishBtn.waitFor({ state: 'visible', timeout: 10000 });
            await publishBtn.click({ force: true });
            await this.page.waitForTimeout(1000);

            // Confirm publish in modal dialog
            const acceptBtn = this.page.locator('#modal-button-accept, #modal button.cbx-primary, #alert-confirm button').first();
            if (await acceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
                await acceptBtn.click({ force: true });
            }

            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
        });
    }

    async openProcedureFromList(name: string) {
        await test.step(`Open procedure from list: "${name}"`, async () => {
            await this.navigateToProcedures();
            const searchInput = this.page.getByPlaceholder('Search for procedures').or(this.page.locator('input[placeholder*="Search" i]')).first();
            await searchInput.waitFor({ state: 'visible', timeout: 10000 });
            await searchInput.fill(name);
            await this.page.waitForTimeout(1000);

            const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
            await row.waitFor({ state: 'visible', timeout: 10000 });
            await row.click({ force: true });
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(1500);
        });
    }

    async clickConsentsTabInWizardOrEdit() {
        await test.step('Click Consents tab/step in wizard or procedure view', async () => {
            const consentsStep = this.page.locator('.cbx-stepper-item-text').filter({ hasText: /^Consents$|^Consentimientos$/i }).or(
                this.page.locator('[role="tab"], .MuiTab-root').filter({ hasText: /^Consents$|^Consentimientos$/i })
            ).first();
            await consentsStep.waitFor({ state: 'visible', timeout: 10000 });
            await consentsStep.click({ force: true });
            await this.page.waitForTimeout(1000);
        });
    }

    async clickConfigurationTabInWizardOrEdit() {
        await test.step('Click Configuration tab/step in wizard or procedure view', async () => {
            const configStep = this.page.locator('.cbx-stepper-item-text').filter({ hasText: /^Configuration$|^Configuración$/i }).or(
                this.page.locator('[role="tab"], .MuiTab-root, p, div').filter({ hasText: /^Configuration$|^Configuración$/i })
            ).first();
            await configStep.waitFor({ state: 'visible', timeout: 10000 });
            await configStep.click({ force: true });
            await this.page.waitForTimeout(1000);
            await this.generalHeading.waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    async searchProcedure(name: string) {
        await test.step(`Search procedure: "${name}"`, async () => {
            const searchInput = this.page.getByPlaceholder('Search for procedures').or(this.page.locator('input[placeholder*="Search" i]')).first();
            await searchInput.waitFor({ state: 'visible', timeout: 10000 });
            await searchInput.fill(name);
            await this.page.waitForTimeout(1000);
        });
    }

    async verifyProcedureInTable(name: string) {
        await test.step(`Verify procedure "${name}" is displayed in table`, async () => {
            const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
            await expect(row).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyProcedureNotInTable(name: string) {
        await test.step(`Verify procedure "${name}" is NOT displayed in table`, async () => {
            await this.page.waitForTimeout(1000);
            const row = this.tableBody.locator('tr').filter({ hasText: name });
            await expect(row).toHaveCount(0, { timeout: 5000 });
        });
    }

    async scrollToProcedureActions(name: string) {
        await test.step(`Scroll horizontally to 3-dots action button for procedure: "${name}"`, async () => {
            const row = this.page.getByRole('row', { name: new RegExp(name, 'i') }).or(
                this.tableBody.locator('tr').filter({ hasText: name })
            ).first();
            await row.waitFor({ state: 'visible', timeout: 10000 });

            // Hover row to ensure actions are active
            await row.hover().catch(() => {});

            // Locate the 3-dots action button
            const actionButton = row.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').or(
                row.getByRole('button')
            ).first();

            await actionButton.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(500);
        });
    }

    async deleteProcedure(name: string, reason: string = 'test something') {
        await test.step(`Delete procedure: ${name}`, async () => {
            const searchInput = this.page.getByPlaceholder('Search for procedures').or(this.page.locator('input[placeholder*="Search" i]')).first();

            // Only navigate if search input is not already on screen
            if (!await searchInput.isVisible({ timeout: 1500 }).catch(() => false)) {
                await this.navigateToProcedures().catch(() => {});
                await this.page.waitForTimeout(1000);
            }

            if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
                const currentSearch = await searchInput.inputValue().catch(() => '');
                if (!currentSearch.includes(name)) {
                    await searchInput.fill(name);
                    await this.page.waitForTimeout(1000);
                }

                const row = this.page.getByRole('row', { name: new RegExp(name, 'i') }).or(
                    this.tableBody.locator('tr').filter({ hasText: name })
                ).first();
                await row.waitFor({ state: 'visible', timeout: 10000 });

                // Hover over the row so the button is interactive
                await row.hover().catch(() => {});

                // Target the 3-dots action button
                const actionButton = row.locator('.cbx-dropdown-container button, button:has(.ri-more-2-fill), button:has(.ri-more-fill)').or(
                    row.getByRole('button')
                ).first();

                // Scroll horizontally into view
                await actionButton.scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(400);

                // Normal click (allows real browser mouse/pointer events to trigger dropdown)
                await actionButton.click();
                await this.page.waitForTimeout(500);

                // Menu item locator
                const deleteMenuItem = this.page.getByRole('button', { name: ' Delete' }).or(
                    this.page.getByRole('button', { name: /Delete|Eliminar/i })
                ).or(
                    this.page.getByRole('menuitem', { name: /Delete|Eliminar/i })
                ).or(
                    this.page.getByText(/^Delete$|^Eliminar$/i)
                ).first();

                // If menu didn't open on initial click, retry with hover + direct click
                if (!await deleteMenuItem.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await actionButton.hover();
                    await actionButton.click();
                    await this.page.waitForTimeout(500);
                }

                // If still not visible, dispatch click event directly
                if (!await deleteMenuItem.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await actionButton.dispatchEvent('click');
                    await this.page.waitForTimeout(500);
                }

                await deleteMenuItem.waitFor({ state: 'visible', timeout: 5000 });
                await deleteMenuItem.click();
                await this.page.waitForTimeout(500);

                // Fill reason in textarea
                const reasonInput = this.page.locator('#id-reason-text-area').or(
                    this.page.locator('.MuiDialog-root textarea, .MuiDialog-root input, #reason, [placeholder*="Reason" i]')
                ).first();
                if (await reasonInput.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await reasonInput.click();
                    await reasonInput.fill(reason);
                    await this.page.waitForTimeout(300);
                }

                // Confirm deletion button inside modal
                const confirmButton = this.page.getByRole('button', { name: 'Delete' }).or(
                    this.page.getByRole('button', { name: /^Delete$|^Eliminar$|^Aceptar$|^Accept$/i })
                ).last();
                await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
                await confirmButton.click();
            }
        });
    }

    async verifyDeleteSuccessAlert() {
        await test.step('Verify procedure deleted success alert', async () => {
            const alert = this.page.getByRole('alert');
            await expect(alert).toContainText(MESSAGES.PROCEDURE_DELETED, { timeout: 10000 });
        });
    }
}
