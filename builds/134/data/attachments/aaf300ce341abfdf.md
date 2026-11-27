# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> Verify appointment creation without email - Admin side @OVAC-5828 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:747:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog', { name: /New appointment|Nueva cita/i })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('dialog', { name: /New appointment|Nueva cita/i }) with timeout 10000ms
  - waiting for getByRole('dialog', { name: /New appointment|Nueva cita/i })

```

```yaml
- dialog "Cita nova":
  - button "Close panel"
  - heading "Cita nova" [level=1]
  - heading "Afegir cita" [level=1]
  - text: 1 Tràmits
  - button "Ajuda": 
  - button "Continuar "
  - text: Afegir tràmit English
  - combobox "Idioma": English
  - text: Idioma 2 Data i hora 3 Dades personals
```

# Test source

```ts
  707 |   /**
  708 |    * Opens Upload Template UI from text area in notification modal (OVAC-5794, OVAC-5792).
  709 |    */
  710 |   async openUploadTemplateUIFromNotification(identifier: string | number) {
  711 |     await test.step('Open Upload Template UI from text area in notification modal', async () => {
  712 |       await this.dismissToastOrModal();
  713 |       const targetRow = await this.getAppointmentRow(identifier);
  714 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  715 | 
  716 |       const menuBtn = targetRow.locator('#appointment-menu').or(
  717 |         targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
  718 |       ).first();
  719 |       await menuBtn.click();
  720 |       await this.page.waitForTimeout(500);
  721 | 
  722 |       const sendNotifOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
  723 |         .getByText(/^Send notification$|^Enviar notificación$/i).first();
  724 |       await sendNotifOption.waitFor({ state: 'visible', timeout: 5000 });
  725 |       await sendNotifOption.click();
  726 |       await this.page.waitForTimeout(1000);
  727 | 
  728 |       const modal = this.page.locator('.MuiDialog-root:visible, [role="dialog"]:visible').first();
  729 |       await expect(modal).toBeVisible({ timeout: 10000 });
  730 | 
  731 |       // Click "UPLOAD TEMPLATE" button
  732 |       const uploadTemplateBtn = modal.getByRole('button', { name: /Upload template|Subir plantilla|Cargar plantilla/i }).first();
  733 |       await uploadTemplateBtn.waitFor({ state: 'visible', timeout: 5000 });
  734 |       await uploadTemplateBtn.click();
  735 |       await this.page.waitForTimeout(1000);
  736 | 
  737 |       // Verify template dialog is presented
  738 |       const templateModal = this.page.locator('.MuiDialog-root:visible, .MuiDrawer-root:visible, [role="dialog"]:visible').last();
  739 |       await expect(templateModal).toBeVisible({ timeout: 10000 });
  740 |     });
  741 |   }
  742 | 
  743 |   /**
  744 |    * Verifies Record number field is displayed in Details section for appointments (OVAC-5104).
  745 |    */
  746 |   async verifyRecordNumberInAppointmentDetails(identifier?: string | number) {
  747 |     await test.step('Verify Record number field is displayed in Details section for appointments', async () => {
  748 |       await this.dismissToastOrModal();
  749 |       let targetRow;
  750 |       if (identifier) {
  751 |         targetRow = await this.getAppointmentRow(identifier);
  752 |       } else {
  753 |         targetRow = this.tableRows.first();
  754 |       }
  755 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  756 | 
  757 |       // Verify Record column header or cell in table
  758 |       const recordHeader = this.appointmentsTable.locator('th').filter({ hasText: /Record|Expediente|Nº expediente/i }).first();
  759 |       const recordCell = targetRow.locator('td').filter({ hasText: /\d+/ }).first();
  760 |       if (await recordHeader.isVisible({ timeout: 2000 }).catch(() => false)) {
  761 |         await expect(recordHeader).toBeVisible();
  762 |         await expect(recordCell).toBeVisible();
  763 |       } else {
  764 |         await recordCell.click();
  765 |         await this.page.waitForTimeout(1000);
  766 |         const recordNumberField = this.page.locator('text=/Record number|Número de expediente|Expediente|Record|Nº de expediente/i').first();
  767 |         await expect(recordNumberField).toBeVisible({ timeout: 10000 });
  768 |         await this.page.keyboard.press('Escape');
  769 |       }
  770 |     });
  771 |   }
  772 | 
  773 |   /**
  774 |    * Verifies Record number is displayed in the appointment preview (OVAC-5116).
  775 |    */
  776 |   async verifyRecordNumberInAppointmentPreview(identifier?: string | number) {
  777 |     await test.step('Verify Record number is displayed in the appointment preview', async () => {
  778 |       await this.dismissToastOrModal();
  779 |       let targetRow;
  780 |       if (identifier) {
  781 |         targetRow = await this.getAppointmentRow(identifier);
  782 |       } else {
  783 |         targetRow = this.tableRows.first();
  784 |       }
  785 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  786 | 
  787 |       // Record number / Expediente is displayed on row and in preview
  788 |       const recordField = targetRow.locator('td').filter({ hasText: /\d+/ }).first().or(
  789 |         this.page.locator('text=/Expediente|Record number|Número de expediente/i')
  790 |       ).first();
  791 |       await expect(recordField).toBeVisible({ timeout: 10000 });
  792 |     });
  793 |   }
  794 | 
  795 |   /**
  796 |    * Opens the New Appointment drawer (OVAC-5072, OVAC-5615).
  797 |    */
  798 |   async openNewAppointmentDrawer(): Promise<Locator> {
  799 |     return await test.step('Open New Appointment drawer via action button', async () => {
  800 |       await this.dismissToastOrModal();
  801 |       const fab = this.page.locator('button[aria-label="Actions"], .cbx-IconButton-fabButton, .MuiFab-root').first();
  802 |       await fab.waitFor({ state: 'visible', timeout: 10000 });
  803 |       await fab.click();
  804 |       await this.page.waitForTimeout(1000);
  805 | 
  806 |       const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
> 807 |       await expect(drawer).toBeVisible({ timeout: 10000 });
      |                            ^ Error: expect(locator).toBeVisible() failed
  808 |       return drawer;
  809 |     });
  810 |   }
  811 | 
  812 |   /**
  813 |    * Advances through step 1 (Procedures) and step 2 (Date and time) to reach step 3 (Personal details) (OVAC-5072, OVAC-5615).
  814 |    */
  815 |   async advanceToStep3InAppointmentCreation(procedureTitle: string = 'Prueba iñaki') {
  816 |     return await test.step('Advance to Step 3 (Personal details) in appointment creation drawer', async () => {
  817 |       const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
  818 |       await expect(drawer).toBeVisible();
  819 | 
  820 |       // Step 1: Add procedure
  821 |       const addProc = drawer.getByText(/Add procedure|Añadir trámite/i).first();
  822 |       await addProc.waitFor({ state: 'visible', timeout: 5000 });
  823 |       await addProc.evaluate(el => (el as HTMLElement).click());
  824 |       await this.page.waitForTimeout(1000);
  825 | 
  826 |       // Procedure selection dialog modal
  827 |       const procModal = this.page.locator('.MuiDialog-root, [role="dialog"]').filter({ has: this.page.locator('table') }).first();
  828 |       await procModal.waitFor({ state: 'visible', timeout: 5000 });
  829 | 
  830 |       // Search procedure using placeholder
  831 |       const procSearch = procModal.getByPlaceholder(/Search for procedures|Buscar/i);
  832 |       if (await procSearch.isVisible({ timeout: 2000 }).catch(() => false)) {
  833 |         await procSearch.fill(procedureTitle);
  834 |         await this.page.waitForTimeout(1000);
  835 |       }
  836 | 
  837 |       // Select matching row checkbox in procedure modal
  838 |       const firstRow = procModal.locator('table tbody tr').first();
  839 |       await firstRow.waitFor({ state: 'visible', timeout: 5000 });
  840 |       const rowCheckbox = firstRow.getByRole('checkbox').or(firstRow.locator('input[type="checkbox"], [class*="checkbox"]')).first();
  841 |       if (await rowCheckbox.isVisible({ timeout: 1000 }).catch(() => false)) {
  842 |         await rowCheckbox.evaluate(el => (el as HTMLElement).click());
  843 |       } else {
  844 |         await firstRow.evaluate(el => (el as HTMLElement).click());
  845 |       }
  846 |       await this.page.waitForTimeout(500);
  847 | 
  848 |       // Click Continue in procedure modal
  849 |       const continueProcBtn = procModal.getByRole('button', { name: /Continue|Continuar/i }).first();
  850 |       await expect(continueProcBtn).toBeEnabled({ timeout: 5000 });
  851 |       await continueProcBtn.evaluate(el => (el as HTMLElement).click());
  852 |       await this.page.waitForTimeout(1000);
  853 | 
  854 |       // Click Continue on step 1 of drawer if visible
  855 |       const continueStep1 = drawer.getByRole('button', { name: /Continue|Continuar/i }).first();
  856 |       if (await continueStep1.isVisible({ timeout: 2000 }).catch(() => false)) {
  857 |         await continueStep1.evaluate(el => (el as HTMLElement).click());
  858 |         await this.page.waitForTimeout(1000);
  859 |       }
  860 | 
  861 |       // Step 2: Select first enabled date button in calendar
  862 |       const enabledDay = drawer.locator('button:not([disabled])').filter({ hasText: /^\d{1,2}$/ }).first();
  863 |       if (await enabledDay.isVisible({ timeout: 3000 }).catch(() => false)) {
  864 |         await enabledDay.evaluate(el => (el as HTMLElement).click());
  865 |         await this.page.waitForTimeout(1000);
  866 |       }
  867 | 
  868 |       // Click Continue on step 2
  869 |       const continueStep2 = drawer.getByRole('button', { name: /Continue|Continuar/i }).first();
  870 |       await continueStep2.evaluate(el => (el as HTMLElement).click());
  871 |       await this.page.waitForTimeout(1500);
  872 | 
  873 |       // Step 3 (Personal details) is now expanded
  874 |       const step3Indicator = drawer.locator('text=/Record no\.|Número de expediente|Personal details|Datos personales|Document type|Tipo de documento/i').first();
  875 |       await expect(step3Indicator).toBeVisible({ timeout: 10000 });
  876 |       return drawer;
  877 |     });
  878 |   }
  879 | 
  880 |   /**
  881 |    * Verifies the information block text for "Record no." field in appointment creation form (OVAC-5072).
  882 |    */
  883 |   async verifyRecordNoInfoBlockText() {
  884 |     await test.step('Verify information block text for "Record no." field in appointment creation form', async () => {
  885 |       const drawer = this.page.getByRole('dialog', { name: /New appointment|Nueva cita/i });
  886 |       await expect(drawer).toBeVisible();
  887 | 
  888 |       const recordNoField = drawer.locator('text=/Record no\.|Número de expediente/i').first();
  889 |       await expect(recordNoField).toBeVisible({ timeout: 10000 });
  890 | 
  891 |       const infoText = drawer.locator('text=/Fill in the field or leave it blank for automatic generation|Complete el campo o déjelo en blanco para generación automática/i').first();
  892 |       await expect(infoText).toBeVisible({ timeout: 10000 });
  893 | 
  894 |       // Close drawer
  895 |       const closeBtn = drawer.locator('button[aria-label="Close panel"], button:has(.ri-close-line)').first();
  896 |       if (await closeBtn.isVisible().catch(() => false)) {
  897 |         await closeBtn.evaluate(el => (el as HTMLElement).click());
  898 |       } else {
  899 |         await this.page.keyboard.press('Escape');
  900 |       }
  901 |       await this.page.waitForTimeout(500);
  902 |     });
  903 |   }
  904 | 
  905 |   /**
  906 |    * Verifies Spain is excluded from country list when "European Document (CUE)" is selected (OVAC-5615).
  907 |    */
```