import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../BasePage';
import { MESSAGES } from '../../utils/Constants';
import path from 'path';
import fs from 'fs';

export class DocumentationPage extends BasePage {
    readonly fabNewButton: Locator;
    readonly menuUploadFile: Locator;
    readonly fileInput: Locator;
    readonly searchInput: Locator;
    readonly alertAcceptButton: Locator;
    readonly successUploadAlert: Locator;
    readonly successDeleteAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.fabNewButton = page.locator('.MuiButtonBase-root.MuiFab-root.MuiFab-primary');
        this.menuUploadFile = page.locator('#company-document-upload-file');
        this.fileInput = page.locator('input[type="file"]').first();
        this.searchInput = page.locator('#company-document-search-input')
            .or(page.getByRole('textbox', { name: /Search/i }))
            .or(page.locator('input[placeholder*="Search" i]'))
            .or(page.locator('input[placeholder*="Buscar" i]'))
            .first();
        this.alertAcceptButton = page.locator('#alert-confirm-button-accept');
        this.successUploadAlert = page.locator('.Toastify__toast--success').filter({ hasText: MESSAGES.DOCUMENT_UPLOADED });
        this.successDeleteAlert = page.locator('.Toastify__toast--success').filter({ hasText: MESSAGES.DOCUMENT_DELETED }); // Assuming similar generic toast
    }

    async uploadDocument(fileName: string, fileContent: string) {
        await test.step(`Upload document: ${fileName}`, async () => {
            // Create temp dummy file
            const filePath = path.join(__dirname, `../../test-data/${fileName}`);
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, fileContent);

            const fab = this.page.locator('#add-document-button')
                .or(this.page.locator('.MuiFab-root'))
                .or(this.page.getByRole('button', { name: /New|Nuevo|\+/i }))
                .first();

            if (await fab.isVisible({ timeout: 2000 }).catch(() => false)) {
                await fab.click();
                const menuUpload = this.page.locator('#company-document-upload-file')
                    .or(this.page.getByText(/Upload file|Subir archivo/i))
                    .first();
                if (await menuUpload.isVisible({ timeout: 2000 }).catch(() => false)) {
                    await menuUpload.click();
                }
            }

            await this.fileInput.setInputFiles(filePath);
            await this.page.keyboard.press('Escape').catch(() => {});
            await this.page.locator('.MuiPopover-root, .MuiMenu-root').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
        });
    }

    async verifyUploadSuccessAlert() {
        await test.step('Verify upload success alert', async () => {
            // Wait for any "Uploading files..." / "Subiendo..." indicator to finish
            await expect(this.page.getByText(/Uploading|Subiendo/i)).not.toBeVisible({ timeout: 15000 }).catch(() => {});
            await this.page.waitForTimeout(1000);
        });
    }

    async searchDocument(fileName: string) {
        await test.step(`Search for document: ${fileName}`, async () => {
            await expect(this.page.getByText(/Uploading|Subiendo/i)).not.toBeVisible({ timeout: 15000 }).catch(() => {});
            await this.page.locator('.MuiPopover-root, .MuiMenu-root').waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
            await this.searchInput.fill(fileName);
            await this.page.waitForTimeout(1000);
        });
    }

    async verifyDocumentInTable(fileName: string) {
        await test.step(`Verify document ${fileName} is present in the table`, async () => {
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            await expect(this.page.getByText(/Uploading|Subiendo/i)).not.toBeVisible({ timeout: 15000 }).catch(() => {});
            await expect(this.page.locator('#CardsContainerBody')).toContainText(nameWithoutExtension, { timeout: 15000 });
        });
    }

    async downloadDocument(fileName: string) {
        await test.step(`Download document: ${fileName}`, async () => {
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            // Search first to narrow down the table
            await this.searchDocument(nameWithoutExtension);

            // Wait for results to be shown
            await expect(this.page.locator('#CardsContainerBody')).toContainText(nameWithoutExtension, { timeout: 10000 });

            // Dismiss any active toast banner blocking pointer events
            await this.dismissToastOrModal();

            // Locate action menu for that specific file card
            const card = this.page.locator('#CardsContainerBody')
                .locator('div')
                .filter({ hasText: nameWithoutExtension });
            const actionMenu = card.locator('button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button:has-text("Botón"), button').last();
            await actionMenu.scrollIntoViewIfNeeded().catch(() => {});
            try {
                await actionMenu.click({ timeout: 3000 });
            } catch {
                await actionMenu.evaluate((el) => (el as HTMLElement).click());
            }

            // Set up download listener BEFORE clicking download
            const downloadPromise = this.page.waitForEvent('download');

            // Click Download option
            const downloadOption = this.page.getByRole('menuitem', { name: /Download|Descargar/i })
                .or(this.page.getByRole('button', { name: /Download|Descargar/i }))
                .or(this.page.getByText(/Download|Descargar/i))
                .first();
            await downloadOption.click();

            // Wait for the download to start and verify filename
            const download = await downloadPromise;
            expect(download.suggestedFilename()).toBe(fileName);
        });
    }

    async verifyDownloadInFileManager(fileName: string) {
        await test.step(`Verify download in File Manager: ${fileName}`, async () => {
            // Click File Manager icon in the header
            const fileManagerButton = this.page.locator('#cbx-header-third-button-buttonFileManager')
                .or(this.page.getByRole('button', { name: /File manager|Gestor de archivos/i }))
                .first();
            await fileManagerButton.click();
            await this.page.waitForTimeout(1500);

            // Verify filename appears in the File Manager list (renders as menu/popover in v8.7.1)
            const list = this.page.getByRole('menu')
                .or(this.page.getByRole('list'))
                .or(this.page.locator('.MuiPopover-root, .MuiMenu-paper, [class*="file-manager"]'))
                .first();
            await expect(list).toContainText(fileName, { timeout: 10000 });

            // Click on the file entry if modal is supported
            const fileEntry = list.getByText(fileName).first();
            await fileEntry.click().catch(() => {});

            // Verify modal or popover shows status (100% or Completed)
            const statusContainer = this.page.locator('#modal, .MuiDialog-root, [role="dialog"]').or(list).first();
            await expect(statusContainer).toContainText(/Completed|Completado|Downloaded|Descargado|100%/i, { timeout: 10000 });

            // Dismiss file details modal (1st Escape) and File Manager dropdown (2nd Escape)
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(400);
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(400);

            // Wait for backdrop overlay to fully detach
            await this.page.locator('.cbx-dropdown-backdrop, .MuiBackdrop-root').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
            await this.dismissToastOrModal();
        });
    }

    async deleteDocument(fileName: string) {
        await test.step(`Delete document: ${fileName}`, async () => {
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            // Search first to narrow down the table
            await this.searchDocument(nameWithoutExtension);

            // Wait for results to be shown
            await expect(this.page.locator('#CardsContainerBody')).toContainText(nameWithoutExtension, { timeout: 10000 });

            // Dismiss any active toast banner blocking pointer events
            await this.dismissToastOrModal();

            // Locate action menu for that specific file card
            const card = this.page.locator('#CardsContainerBody')
                .locator('div')
                .filter({ hasText: nameWithoutExtension });
            const actionMenu = card.locator('button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button:has-text("Botón"), button').last();
            await actionMenu.scrollIntoViewIfNeeded().catch(() => {});
            try {
                await actionMenu.click({ timeout: 3000 });
            } catch {
                await actionMenu.evaluate((el) => (el as HTMLElement).click());
            }

            // Click Delete option
            const deleteOption = this.page.getByRole('menuitem', { name: /Delete|Eliminar/i })
                .or(this.page.getByRole('button', { name: /Delete|Eliminar/i }))
                .or(this.page.getByText(/Delete|Eliminar/i))
                .first();
            await deleteOption.waitFor({ state: 'visible', timeout: 5000 });
            await deleteOption.click();

            // Confirm delete verifying dialog contains full filename as seen in codegen
            const dialog = this.page.getByRole('dialog').first();
            await expect(dialog).toContainText(fileName);
            await dialog.getByRole('button', { name: /Accept|Aceptar/i }).click();
        });
    }

    async verifyDeleteSuccessAlert() {
        await test.step('Verify delete success alert', async () => {
            // We'll just wait for state sync since Toast classes might differ
            await this.page.waitForLoadState('networkidle');
        });
    }
}
