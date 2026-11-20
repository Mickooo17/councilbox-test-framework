# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/activity/activityTests.spec.ts >> Activity & Dashboard Tests >> Verify user selector in Video appointments and In-person dashboard displays only Admin agent and Agent with video attention roles @OVAC-5050 @regression
- Location: tests/activity/activityTests.spec.ts:342:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('combobox', { name: /Users|Usuarios/i }).or(locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i })).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f5e2]:
  - generic [ref=f5e3]:
    - generic [ref=f5e4]:
      - button "" [ref=f5e5] [cursor=pointer]
      - generic [ref=f5e10]:
        - link [ref=f5e12] [cursor=pointer]:
          - /url: /company/1112/activity/dashboardCouncils
          - button " Activitat" [ref=f5e13]:
            - generic [ref=f5e14]: 
            - generic [ref=f5e16]: Activitat
        - link [ref=f5e18] [cursor=pointer]:
          - /url: /company/1112
          - button " Cites" [ref=f5e19]:
            - generic [ref=f5e20]: 
            - generic [ref=f5e22]: Cites
        - link [ref=f5e24] [cursor=pointer]:
          - /url: /company/1112/managements
          - button " Gestions" [ref=f5e25]:
            - generic [ref=f5e26]: 
            - generic [ref=f5e28]: Gestions
        - link [ref=f5e30] [cursor=pointer]:
          - /url: /company/1112/procedures
          - button " Tràmits" [ref=f5e31]:
            - generic [ref=f5e32]: 
            - generic [ref=f5e34]: Tràmits
        - link [ref=f5e36] [cursor=pointer]:
          - /url: /company/1112/drafts
          - button " Plantilles" [ref=f5e37]:
            - generic [ref=f5e38]: 
            - generic [ref=f5e40]: Plantilles
        - link [ref=f5e42] [cursor=pointer]:
          - /url: /company/1112/documentation
          - button " Documentació" [ref=f5e43]:
            - generic [ref=f5e44]: 
            - generic [ref=f5e46]: Documentació
        - link [ref=f5e48] [cursor=pointer]:
          - /url: /company/1112/companies
          - button " Entitats" [ref=f5e49]:
            - generic [ref=f5e50]: 
            - generic [ref=f5e52]: Entitats
        - link [ref=f5e54] [cursor=pointer]:
          - /url: /company/1112/users
          - button " Usuaris" [ref=f5e55]:
            - generic [ref=f5e56]: 
            - generic [ref=f5e58]: Usuaris
      - generic [ref=f5e60]:
        - img "CBX white Logo" [ref=f5e61]
        - generic [ref=f5e62]: © 2026 v8.7.5
    - generic [ref=f5e64]:
      - banner [ref=f5e65]:
        - button [ref=f5e67] [cursor=pointer]:
          - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e68]
        - generic [ref=f5e69]: Grupo Castelar Servicios Legales y Financieros S.A
        - generic [ref=f5e75]:
          - button [ref=f5e78] [cursor=pointer]:
            - button "Notifications" [ref=f5e79]:
              - generic [ref=f5e80]: 
          - button [ref=f5e82] [cursor=pointer]:
            - button "Button user" [ref=f5e84]:
              - generic [ref=f5e87]:
                - img "Logo Oficina Virtual d'Atenció al Ciutadà" [ref=f5e89]
                - generic [ref=f5e90]: 
      - generic [ref=f5e93]:
        - tablist "Pestañas" [ref=f5e96]:
          - tab "Botón" [selected] [ref=f5e97] [cursor=pointer]:
            - paragraph [ref=f5e99]: Cites
          - tab "Botón" [ref=f5e100] [cursor=pointer]:
            - paragraph [ref=f5e102]: Cites presencials
          - tab "Botón" [ref=f5e103] [cursor=pointer]:
            - paragraph [ref=f5e105]: Gestions
          - tab "Botón" [ref=f5e106] [cursor=pointer]:
            - paragraph [ref=f5e108]: Dades per participant
          - tab "Cercador d'expedients" [ref=f5e109] [cursor=pointer]:
            - paragraph [ref=f5e111]: Cercador d'expedients
        - generic [ref=f5e114]:
          - generic [ref=f5e115]:
            - button "Aplicar" [disabled] [ref=f5e118]
            - generic [ref=f5e121]:
              - generic [ref=f5e125]:
                - generic [ref=f5e126] [cursor=pointer]:
                  - generic [ref=f5e127]: Aquest mes
                  - combobox "Campo de texto": Aquest mes
                - group [aria-hidden]
              - generic [ref=f5e132]:
                - generic [ref=f5e133] [cursor=pointer]:
                  - generic [ref=f5e134]: Totes les entitats
                  - combobox "Entitats": Totes les entitats
                  - generic [ref=f5e135]: Entitats
                - group [aria-hidden]
              - generic [ref=f5e141]:
                - generic [ref=f5e142] [cursor=pointer]:
                  - generic [ref=f5e143]: Tots els tràmits
                  - combobox "Tipus de tràmits": Tots els tràmits
                  - generic [ref=f5e144]: Tipus de tràmits
                - group [aria-hidden]
              - generic [ref=f5e150]:
                - generic [ref=f5e151] [cursor=pointer]:
                  - generic [ref=f5e152]: Tots
                  - combobox "Usuaris": Tots
                  - generic [ref=f5e153]: Usuaris
                - group [aria-hidden]
              - button "Botón" [ref=f5e156] [cursor=pointer]:
                - generic [ref=f5e157]: 
              - button "Ajuda" [ref=f5e158] [cursor=pointer]:
                - generic [ref=f5e159]: 
              - button "Exportar" [ref=f5e161] [cursor=pointer]
            - generic [ref=f5e167]:
              - generic [ref=f5e168]: Novembre, 2026
              - generic [ref=f5e169]:
                - generic [ref=f5e170] [cursor=pointer]: 
                - generic [ref=f5e171]: 
            - generic [ref=f5e173]:
              - generic [ref=f5e178]:
                - generic [ref=f5e179]:
                  - generic [ref=f5e180]: "144"
                  - generic [ref=f5e181]: Cites totals
                - generic "Usuaris atesos" [ref=f5e182]:
                  - button "Botón" [ref=f5e183] [cursor=pointer]:
                    - generic [ref=f5e184]: 
              - generic [ref=f5e189]:
                - generic [ref=f5e190]:
                  - generic [ref=f5e191]: 00:01:03
                  - generic [ref=f5e192]: Mitjana per sessió
                - generic "Temps mitjà per sessió des que s'inicia la cita fins que acaba" [ref=f5e193]:
                  - button "Botón" [ref=f5e194] [cursor=pointer]:
                    - generic [ref=f5e195]: 
              - generic [ref=f5e200] [cursor=pointer]:
                - generic [ref=f5e201]: 12:52:00
                - generic [ref=f5e202]: Mitjana d'avançament
              - generic [ref=f5e208] [cursor=pointer]:
                - generic [ref=f5e209]: "5.00"
                - generic [ref=f5e210]: Satisfacció alta
              - heading "Cites" [level=1] [ref=f5e212]
              - generic [ref=f5e217]:
                - generic [ref=f5e218]: Alertes
                - generic [ref=f5e219]: "252"
                - generic [ref=f5e222]:
                  - generic [ref=f5e223]: ·
                  - generic [ref=f5e224]: Sense assignar
                  - generic [ref=f5e227]: ·
                  - generic [ref=f5e228]: En curs
                  - generic [ref=f5e231]: ·
                  - generic [ref=f5e232]: Sense notificació
                  - generic [ref=f5e235]: ·
                  - generic [ref=f5e236]: Retard
                - button "Detalls" [ref=f5e240] [cursor=pointer]
              - generic [ref=f5e244]:
                - generic [ref=f5e245]:
                  - generic [ref=f5e248]:
                    - generic [ref=f5e249]: Total
                    - generic [ref=f5e250]: Ocupació
                    - generic [ref=f5e251]:
                      - generic [ref=f5e256]:
                        - heading "0%" [level=2] [ref=f5e257]
                        - paragraph [ref=f5e258]: Ocupació
                      - generic [ref=f5e259]:
                        - generic [ref=f5e260]: ·
                        - generic [ref=f5e261]: Cites reprogramades
                        - generic [ref=f5e262]: ·
                        - generic [ref=f5e263]: Buits disponibles
                  - generic [ref=f5e264]: Tràmits més sol·licitats
                  - generic [ref=f5e271]:
                    - generic [ref=f5e272]: Estats
                    - generic [ref=f5e277]:
                      - generic [ref=f5e278]: ·
                      - generic [ref=f5e279]: Confirmat
                      - generic [ref=f5e280]: ·
                      - generic [ref=f5e281]: En curs
                      - generic [ref=f5e282]: ·
                      - generic [ref=f5e283]: Pendent d'informe
                      - generic [ref=f5e284]: ·
                      - generic [ref=f5e285]: Cancel·lat
                - generic [ref=f5e286]:
                  - generic [ref=f5e289]:
                    - generic [ref=f5e290]: Total
                    - generic [ref=f5e291]: Cancel·lades
                    - generic [ref=f5e292]:
                      - generic [ref=f5e297]:
                        - heading "30%" [level=2] [ref=f5e298]
                        - paragraph [ref=f5e299]: Cancel·lació
                      - generic [ref=f5e300]:
                        - generic [ref=f5e301]: ·
                        - generic [ref=f5e302]: Cancel·lades
                        - generic [ref=f5e303]: ·
                        - generic [ref=f5e304]: Programades o realitzades
                  - generic [ref=f5e305]:
                    - generic [ref=f5e306]: Motiu de cancel·lació
                    - button [ref=f5e310] [cursor=pointer]:
                      - paragraph [ref=f5e311]: Detalls
                - generic [ref=f5e312]:
                  - generic [ref=f5e313]:
                    - generic [ref=f5e320]:
                      - generic [ref=f5e321]: 95.83%
                      - generic [ref=f5e322]: Cites en ordinador
                    - generic [ref=f5e327]:
                      - generic [ref=f5e328]: 4.17%
                      - generic [ref=f5e329]: Cites en mòbil
                  - generic [ref=f5e330]: Sistemes Operatius utilitzats
                  - generic [ref=f5e337]: Navegadors més utilitzats
                - generic [ref=f5e346]:
                  - generic [ref=f5e347]: Identificació biomètrica
                  - generic [ref=f5e348]:
                    - generic [ref=f5e353]:
                      - heading [level=2]
                      - paragraph
                    - generic [ref=f5e354]:
                      - generic [ref=f5e355]: ·
                      - generic [ref=f5e356]: Cancel·lat pel participant
                  - button "Detalls" [ref=f5e360] [cursor=pointer]
          - generic [ref=f5e363]:
            - generic [ref=f5e364] [cursor=pointer]: Aviso legal y Términos y condiciones de uso
            - generic [ref=f5e365] [cursor=pointer]: Política de privacidad de Councilbox Technology S.L.
  - generic [ref=f5e366]:
    - generic [ref=f5e370]:
      - generic [ref=f5e371]: Nova versió OVAC 8.7
      - generic [ref=f5e372]:
        - generic [ref=f5e373]: Hem actualitzat l'aplicació a la seva última versió per a oferir-li una millor experiència. Aquesta actualització inclou importants millores, correccions d'errors i optimitzacions que faran més fàcil i agradable el seu ús.
        - generic [ref=f5e374]: Revisar novetats
    - button [ref=f5e380] [cursor=pointer]
```

# Test source

```ts
  802 |       await this.page.waitForTimeout(1000);
  803 |       await expect(applyBtn).toBeDisabled({ timeout: 10000 });
  804 |     });
  805 |   }
  806 | 
  807 |   /**
  808 |    * Verifies that deleted users are displayed with a trash bin icon in user selectors - Activity (OVAC-5049).
  809 |    */
  810 |   async verifyDeletedUsersDisplayedWithTrashIconInSelector() {
  811 |     await test.step('Verify deleted users are displayed with a trash bin icon in user selectors - Activity', async () => {
  812 |       await this.dismissToastOrModal();
  813 |       const userContainer = this.page.getByRole('combobox', { name: /Users|Usuarios/i })
  814 |         .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i }))
  815 |         .first();
  816 |       await userContainer.waitFor({ state: 'visible', timeout: 10000 });
  817 |       await userContainer.click();
  818 |       await this.page.waitForTimeout(500);
  819 | 
  820 |       const optionsContainer = this.page.locator('ul[role="listbox"]').first();
  821 |       await optionsContainer.waitFor({ state: 'visible', timeout: 5000 });
  822 | 
  823 |       const options = optionsContainer.locator('li[role="option"]');
  824 |       const count = await options.count();
  825 |       expect(count).toBeGreaterThan(0);
  826 | 
  827 |       // Check if any deleted user has a trash bin icon or verify option item structure
  828 |       const trashIcons = optionsContainer.locator('.ri-delete-bin-line, .ri-delete-bin-fill, i[class*="bin"], i[class*="trash"], svg[data-testid*="Delete"]');
  829 |       if (await trashIcons.first().isVisible({ timeout: 2000 }).catch(() => false)) {
  830 |         await expect(trashIcons.first()).toBeVisible();
  831 |       } else {
  832 |         await expect(options.first()).toBeVisible();
  833 |       }
  834 | 
  835 |       await this.page.keyboard.press('Escape');
  836 |     });
  837 |   }
  838 | 
  839 |   /**
  840 |    * Verifies "Record" column presence and position before "Identifier" in downloaded CSV from Dashboard (OVAC-5075, OVAC-5077, OVAC-5079).
  841 |    */
  842 |   async verifyRecordColumnInExportedCsv(tabName?: 'appointments' | 'processes' | 'inPerson') {
  843 |     await test.step(`Verify "Record" column in exported CSV from ${tabName || 'current'} tab`, async () => {
  844 |       await this.dismissToastOrModal();
  845 |       if (tabName === 'processes') {
  846 |         await this.clickProcessesTab();
  847 |         await this.page.waitForTimeout(1000);
  848 |       } else if (tabName === 'inPerson') {
  849 |         await this.inPersonAppointmentsTab.click();
  850 |         await this.page.waitForTimeout(1000);
  851 |       } else if (tabName === 'appointments') {
  852 |         if (await this.appointmentsTab.isVisible({ timeout: 2000 }).catch(() => false)) {
  853 |           await this.appointmentsTab.click();
  854 |           await this.page.waitForTimeout(1000);
  855 |         }
  856 |       }
  857 | 
  858 |       const downloadPromise = this.page.waitForEvent('download', { timeout: 15000 });
  859 |       await this.openExportMenu();
  860 | 
  861 |       const exportOption = this.page.getByRole('button', { name: /Appointments data|Appointment data|Process data|Datos de citas|Datos de gestiones|Datos de citas presenciales/i })
  862 |         .or(this.page.locator('button, [role="menuitem"], li, [role="button"]').filter({ hasText: /Appointments data|Appointment data|Process data|Datos de citas|Datos de gestiones|Datos de citas presenciales/i }))
  863 |         .first();
  864 | 
  865 |       if (await exportOption.isVisible({ timeout: 2000 }).catch(() => false)) {
  866 |         await exportOption.click();
  867 |       }
  868 | 
  869 |       const download = await downloadPromise;
  870 | 
  871 |       expect(download).toBeTruthy();
  872 |       const filePath = await download.path();
  873 |       expect(filePath).toBeTruthy();
  874 | 
  875 |       const content = fs.readFileSync(filePath!, 'utf-8');
  876 |       const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  877 |       expect(lines.length).toBeGreaterThan(0);
  878 | 
  879 |       const headerLine = lines[0];
  880 |       const delimiter = headerLine.includes(';') ? ';' : headerLine.includes('\t') ? '\t' : ',';
  881 |       const headers = headerLine.split(delimiter).map(h => h.replace(/^["']|["']$/g, '').trim());
  882 | 
  883 |       const recordColIndex = headers.findIndex(h => /Record|Expediente|Nº expediente/i.test(h));
  884 |       const identifierColIndex = headers.findIndex(h => /Identifier|Identificador|ID/i.test(h));
  885 | 
  886 |       expect(recordColIndex).toBeGreaterThanOrEqual(0);
  887 |       if (identifierColIndex >= 0) {
  888 |         expect(recordColIndex).toBeLessThan(identifierColIndex);
  889 |       }
  890 |     });
  891 |   }
  892 | 
  893 |   /**
  894 |    * Verifies user selector displays only Admin agent and Agent with video attention roles (OVAC-5050).
  895 |    */
  896 |   async verifyUserSelectorDisplaysEligibleRoles() {
  897 |     await test.step('Verify user selector displays only Admin agent and Agent with video attention roles', async () => {
  898 |       await this.dismissToastOrModal();
  899 |       const userContainer = this.page.getByRole('combobox', { name: /Users|Usuarios/i })
  900 |         .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i }))
  901 |         .first();
> 902 |       await userContainer.waitFor({ state: 'visible', timeout: 10000 });
      |                           ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  903 |       await userContainer.click();
  904 |       await this.page.waitForTimeout(500);
  905 | 
  906 |       const optionsContainer = this.page.locator('ul[role="listbox"]').first();
  907 |       await optionsContainer.waitFor({ state: 'visible', timeout: 5000 });
  908 | 
  909 |       const options = optionsContainer.locator('li[role="option"]');
  910 |       const count = await options.count();
  911 |       expect(count).toBeGreaterThan(0);
  912 | 
  913 |       for (let i = 0; i < Math.min(count, 5); i++) {
  914 |         await expect(options.nth(i)).toBeVisible();
  915 |       }
  916 | 
  917 |       await this.page.keyboard.press('Escape');
  918 |     });
  919 |   }
  920 | 
  921 |   /**
  922 |    * Verifies dropdown select options are sorted in alphabetical order (OVAC-5070).
  923 |    */
  924 |   async verifyDropdownOptionsSortedAlphabetically() {
  925 |     await test.step('Verify dropdown select options are sorted in alphabetical order', async () => {
  926 |       await this.dismissToastOrModal();
  927 |       const userContainer = this.page.getByRole('combobox', { name: /Users|Usuarios/i })
  928 |         .or(this.page.locator('.cbx-selectInput-container').filter({ hasText: /Users|Usuarios/i }))
  929 |         .first();
  930 |       await userContainer.waitFor({ state: 'visible', timeout: 10000 });
  931 |       await userContainer.click();
  932 |       await this.page.waitForTimeout(500);
  933 | 
  934 |       const optionsContainer = this.page.locator('ul[role="listbox"]').first();
  935 |       await optionsContainer.waitFor({ state: 'visible', timeout: 5000 });
  936 | 
  937 |       const options = optionsContainer.locator('li[role="option"]');
  938 |       const texts = (await options.allInnerTexts()).map(t => t.trim()).filter(Boolean);
  939 |       expect(texts.length).toBeGreaterThan(0);
  940 | 
  941 |       // Verify that options are sorted alphabetically by first name/word
  942 |       const firstWords = texts.map(t => t.split(/\s+/)[0].toLowerCase());
  943 |       for (let i = 0; i < firstWords.length - 1; i++) {
  944 |         expect(firstWords[i].localeCompare(firstWords[i + 1]) <= 0).toBeTruthy();
  945 |       }
  946 | 
  947 |       await this.page.keyboard.press('Escape');
  948 |     });
  949 |   }
  950 | 
  951 | }
  952 | 
```