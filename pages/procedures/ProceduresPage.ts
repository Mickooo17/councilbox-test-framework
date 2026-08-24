import { Page, Locator, expect, test, Download } from '@playwright/test';
import { BasePage } from '../BasePage';

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
    readonly documentationTab: Locator;
    readonly addFolderButton: Locator;
    readonly folderTitleInput: Locator;
    readonly searchProceduresInput: Locator;
    readonly tableBody: Locator;

    constructor(page: Page) {
        super(page);
        this.addProcedureButton = page.locator('#add-procedure-button, .MuiFab-root, button[aria-label="Add procedure"]').or(page.getByRole('button', { name: /Add procedure|Nueva|Nuevo|\+/i })).first();
        this.videoAppointmentOption = page.locator('#council_type_videocall').or(page.getByText('Live procedure via')).first();
        this.procedureNameInput = page.locator('#procedure-name-input').or(page.getByPlaceholder(/Name of the procedure/i)).first();
        this.procedureDescriptionEditor = page.locator('.ql-editor').first();
        this.continueButton = page.locator('#procedure-editor-next').or(page.getByRole('button', { name: /Continue|Continuar/i })).first();
        this.documentationTab = page.locator('[role="tab"], .MuiTab-root, button, p, div').filter({ hasText: /^Documentation$|^Documentación$/i }).first();
        this.addFolderButton = page.locator('#default-page-button, .MuiFab-root, button[aria-label*="Add" i]').or(page.getByRole('button', { name: /Add|Añadir/i })).first();
        this.folderTitleInput = page.locator('#document-editor-title-input').or(page.getByLabel(/Title/i)).first();
        this.searchProceduresInput = page.getByPlaceholder('Search for procedures').or(page.locator('input[placeholder*="Search" i]')).first();
        this.tableBody = page.locator('tbody');
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
                selectedDocName = text.split('\n')[0].trim();
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
            await threeDotsButton.click();

            // Set up download listener
            const downloadPromise = this.page.waitForEvent('download');

            // Click Download option from the cbx dropdown menu
            const downloadMenuItem = this.page.locator('li[id^="download"], .cbx-menuItem:has-text("Download")').or(
                this.page.getByRole('menuitem', { name: /Download|Descargar/i })
            ).first();
            await downloadMenuItem.waitFor({ state: 'visible', timeout: 5000 });
            await downloadMenuItem.click();

            const download = await downloadPromise;
            return download;
        });
    }

    async deleteProcedure(name: string) {
        await test.step(`Delete procedure: ${name}`, async () => {
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.dismissToastOrModal();

            await this.page.evaluate(() => {
                document.querySelectorAll('.cbx-drawerPanel-container, .cbx-drawerPanel-backdrop, .MuiDialog-root, .MuiBackdrop-root').forEach(el => el.remove());
            }).catch(() => {});

            await this.navigateToProcedures().catch(() => {});
            await this.page.waitForTimeout(1000);

            const searchInput = this.page.getByPlaceholder('Search for procedures').or(this.page.locator('input[placeholder*="Search" i]')).first();
            if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
                await searchInput.fill(name);
                await this.page.waitForTimeout(1000);

                const row = this.tableBody.locator('tr').filter({ hasText: name }).first();
                if (await row.isVisible({ timeout: 5000 }).catch(() => false)) {
                    const actionButton = row.locator('button').last();
                    await actionButton.click({ force: true });
                    await this.page.waitForTimeout(500);

                    const deleteMenuItem = this.page.getByRole('menuitem', { name: /Delete|Eliminar/i }).or(
                        this.page.getByText(/Delete|Eliminar/i)
                    ).first();
                    await deleteMenuItem.click({ force: true });
                    await this.page.waitForTimeout(500);

                    const reasonInput = this.page.locator('.MuiDialog-root input, .MuiDialog-root textarea, #reason, [placeholder*="Reason" i]').first();
                    if (await reasonInput.isVisible({ timeout: 2000 }).catch(() => false)) {
                        await reasonInput.fill('Automated test cleanup');
                        await this.page.waitForTimeout(300);
                    }

                    const confirmButton = this.page.getByRole('button', { name: /Accept|Delete|Confirm|Yes|Aceptar/i }).last();
                    await confirmButton.click({ force: true });
                    await this.page.waitForTimeout(1000);
                }
            }
        });
    }
}
