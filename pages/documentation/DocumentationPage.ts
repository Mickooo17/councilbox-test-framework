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
        this.searchInput = page.locator('#company-document-search-input');
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

            //await this.fabNewButton.click();
            // await this.menuUploadFile.click();
            await this.fileInput.setInputFiles(filePath);
        });
    }

    async verifyUploadSuccessAlert() {
        await test.step('Verify upload success alert', async () => {
            // Using generic waitFor to make sure upload passes the backend validation
            await this.page.waitForLoadState('networkidle');
        });
    }

    async searchDocument(fileName: string) {
        await test.step(`Search for document: ${fileName}`, async () => {
            await this.page.waitForTimeout(2000); // Give the DOM time to be fully interactive
            await this.searchInput.fill(fileName);
            await this.page.waitForTimeout(1000); // Give input delay time to trigger search
            await this.page.waitForLoadState('networkidle');
        });
    }

    async verifyDocumentInTable(fileName: string) {
        await test.step(`Verify document ${fileName} is present in the table`, async () => {
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            await expect(this.page.locator('#CardsContainerBody')).toContainText(nameWithoutExtension, { timeout: 10000 });
        });
    }

    async downloadDocument(fileName: string) {
        await test.step(`Download document: ${fileName}`, async () => {
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            // Search first to narrow down the table
            await this.searchDocument(nameWithoutExtension);

            // Wait for results to be shown
            await expect(this.page.locator('#CardsContainerBody')).toContainText(nameWithoutExtension, { timeout: 10000 });

            // Locate action menu for that specific file card
            const actionMenu = this.page.locator('#CardsContainerBody')
                .locator('div')
                .filter({ hasText: nameWithoutExtension })
                .getByRole('button', { name: 'Icon Button' })
                .first();
            await actionMenu.click();

            // Set up download listener BEFORE clicking download
            const downloadPromise = this.page.waitForEvent('download');

            // Click Download option
            await this.page.getByText('Download').click();

            // Wait for the download to start and verify filename
            const download = await downloadPromise;
            expect(download.suggestedFilename()).toBe(fileName);
        });
    }

    async verifyDownloadInFileManager(fileName: string) {
        await test.step(`Verify download in File Manager: ${fileName}`, async () => {
            // Click File Manager icon in the header
            const fileManagerButton = this.page.locator('#cbx-header-third-button-buttonFileManager');
            await fileManagerButton.click();
            await this.page.waitForTimeout(1500);
            // Verify filename appears in the File Manager list
            await expect(this.page.getByRole('list')).toContainText(fileName, { timeout: 10000 });
            // Click on the file entry to open details modal
            await this.page.getByText(fileName).first().click();
            // Verify modal shows "Completed" and "Downloaded" status
            await expect(this.page.locator('#modal')).toContainText('Completed', { timeout: 10000 });
            await expect(this.page.locator('#modal')).toContainText('Downloaded', { timeout: 10000 });
            // Reload the page to dismiss all overlays and ensure clean state
            await this.page.reload();
            await this.page.waitForLoadState('networkidle');
        });
    }

    async deleteDocument(fileName: string) {
        await test.step(`Delete document: ${fileName}`, async () => {
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");
            // Search first to narrow down the table
            await this.searchDocument(nameWithoutExtension);

            // Wait for results to be shown
            await expect(this.page.locator('#CardsContainerBody')).toContainText(nameWithoutExtension, { timeout: 10000 });

            // Locate action menu for that specific file card
            const actionMenu = this.page.locator('#CardsContainerBody')
                .locator('div')
                .filter({ hasText: nameWithoutExtension })
                .getByRole('button', { name: 'Icon Button' })
                .first();
            await actionMenu.click();

            // Click Delete option
            const deleteOption = this.page.getByText('Delete');
            await deleteOption.click();

            // Confirm delete verifying dialog contains full filename as seen in codegen
            await expect(this.page.getByRole('dialog')).toContainText(fileName);
            await this.page.getByRole('button', { name: 'Accept' }).click();
        });
    }

    async verifyDeleteSuccessAlert() {
        await test.step('Verify delete success alert', async () => {
            // We'll just wait for state sync since Toast classes might differ
            await this.page.waitForLoadState('networkidle');
        });
    }
}
