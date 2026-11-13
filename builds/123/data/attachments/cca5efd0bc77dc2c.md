# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/templates/templatesTests.spec.ts >> Templates - Drafts & Search Tests (Xray Execution 77514) >> User is able to click on the Templates button @XR-1394 @OVAC-5627 @regression
- Location: tests/templates/templatesTests.spec.ts:178:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('button, [role="tab"]').filter({ hasText: /Tags|Etiquetas/i }).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - button "" [ref=e5] [cursor=pointer]
      - generic [ref=e10]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /company/1112/activity/dashboardCouncils
          - button " Activitat" [ref=e13]:
            - generic [ref=e14]: 
            - generic [ref=e16]: Activitat
        - link [ref=e18] [cursor=pointer]:
          - /url: /company/1112
          - button " Cites" [ref=e19]:
            - generic [ref=e20]: 
            - generic [ref=e22]: Cites
        - link [ref=e24] [cursor=pointer]:
          - /url: /company/1112/managements
          - button " Gestions" [ref=e25]:
            - generic [ref=e26]: 
            - generic [ref=e28]: Gestions
        - link [ref=e30] [cursor=pointer]:
          - /url: /company/1112/procedures
          - button " Tràmits" [ref=e31]:
            - generic [ref=e32]: 
            - generic [ref=e34]: Tràmits
        - link [ref=e36] [cursor=pointer]:
          - /url: /company/1112/drafts
          - button " Plantilles" [active] [ref=e37]:
            - generic [ref=e38]: 
            - generic [ref=e40]: Plantilles
        - link [ref=e42] [cursor=pointer]:
          - /url: /company/1112/documentation
          - button " Documentació" [ref=e43]:
            - generic [ref=e44]: 
            - generic [ref=e46]: Documentació
        - link [ref=e48] [cursor=pointer]:
          - /url: /company/1112/companies
          - button " Entitats" [ref=e49]:
            - generic [ref=e50]: 
            - generic [ref=e52]: Entitats
        - link [ref=e54] [cursor=pointer]:
          - /url: /company/1112/users
          - button " Usuaris" [ref=e55]:
            - generic [ref=e56]: 
            - generic [ref=e58]: Usuaris
      - generic [ref=e60]:
        - img "CBX white Logo" [ref=e61]
        - generic [ref=e62]: © 2026 v8.7.5
    - generic [ref=e64]:
      - banner [ref=e65]:
        - button [ref=e67] [cursor=pointer]:
          - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=e68]
        - generic [ref=e69]: Grupo Castelar Servicios Legales y Financieros S.A
        - generic [ref=e75]:
          - button [ref=e78] [cursor=pointer]:
            - button "Notifications" [ref=e79]:
              - generic [ref=e80]: 
          - button [ref=e82] [cursor=pointer]:
            - button "Button user" [ref=e84]:
              - generic [ref=e87]:
                - img "Logo Oficina Virtual d'Atenció al Ciutadà" [ref=e89]
                - generic [ref=e90]: 
      - generic [ref=e93]:
        - tablist "Pestañas" [ref=e96]:
          - tab "Botón" [selected] [ref=e97] [cursor=pointer]:
            - paragraph [ref=e99]: Plantilles
          - tab "Botón" [ref=e100] [cursor=pointer]:
            - paragraph [ref=e102]: Etiquetes
        - generic [ref=e106]:
          - generic [ref=e107]:
            - generic [ref=e109]:
              - generic [ref=e113]:
                - combobox "Tràmit" [ref=e114]: Tots
                - generic [ref=e115]: Tràmit
                - button "Open options" [ref=e117] [cursor=pointer]
                - group [aria-hidden]
                - button "Botón" [ref=e118] [cursor=pointer]:
                  - generic [ref=e119]: 
              - generic [ref=e124]:
                - generic [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]: Tots
                  - combobox "Estat": Tots
                  - generic [ref=e127]: Estat
                - group [aria-hidden]
              - generic [ref=e133]:
                - combobox "Categories" [ref=e134]: Totes
                - generic [ref=e135]: Categories
                - button "Open options" [ref=e137] [cursor=pointer]
                - group [aria-hidden]
                - button "Botón" [ref=e138] [cursor=pointer]:
                  - generic [ref=e139]: 
            - generic [ref=e141]:
              - generic [ref=e145]:
                - button "Botón" [ref=e147] [cursor=pointer]:
                  - generic [ref=e148]: 
                - textbox "Buscar per participant o expedient" [ref=e149]:
                  - /placeholder: Cercar plantilles
              - button "Ajuda" [ref=e150] [cursor=pointer]:
                - generic [ref=e151]: 
          - generic [ref=e155]:
            - generic [ref=e156]:
              - table [ref=e157]:
                - rowgroup [ref=e158]:
                  - row [ref=e159]:
                    - columnheader "Nom Nom " [ref=e160]:
                      - generic [ref=e161]: Nom
                      - button "Nom " [ref=e162] [cursor=pointer]:
                        - generic [ref=e163]: Nom
                        - generic [ref=e164]: 
                    - columnheader "Tràmit" [ref=e166]
                    - columnheader "Categories" [ref=e167]
                    - columnheader "Estat Estat " [ref=e168]:
                      - generic [ref=e169]: Estat
                      - button "Estat " [ref=e170] [cursor=pointer]:
                        - generic [ref=e171]: Estat
                        - generic [ref=e172]: 
                    - columnheader "Actions" [ref=e174]
                - rowgroup [ref=e176]:
                  - row [ref=e177] [cursor=pointer]:
                    - cell "[object Object] 20 Jan 26" [ref=e178]:
                      - generic [ref=e179]:
                        - img "[object Object]" [ref=e181]:
                          - paragraph [ref=e182]:
                            - generic [ref=e183]: 
                        - generic [ref=e184]: 20 Jan 26
                    - cell "15 Jan 26 i 197 més" [ref=e186]:
                      - generic [ref=e187]:
                        - generic [ref=e188]: 15 Jan 26
                        - generic [ref=e191]: i 197 més
                    - cell "Conclusió" [ref=e193]
                    - cell " Activat" [ref=e198]:
                      - generic [ref=e199]:
                        - generic [ref=e200]: 
                        - generic [ref=e201]: Activat
                    - cell [ref=e202]:
                      - button "button" [ref=e203]:
                        - generic [ref=e204]: 
                  - row [ref=e206] [cursor=pointer]:
                    - cell "[object Object] ALL Intro" [ref=e207]:
                      - generic [ref=e208]:
                        - img "[object Object]" [ref=e210]:
                          - paragraph [ref=e211]:
                            - generic [ref=e212]: 
                        - generic [ref=e213]: ALL Intro
                    - cell "19 juni rigid i 178 més" [ref=e215]:
                      - generic [ref=e216]:
                        - generic [ref=e217]: 19 juni rigid
                        - generic [ref=e220]: i 178 més
                    - cell "Introducció i 1 més" [ref=e222]:
                      - generic [ref=e223]:
                        - generic [ref=e224]: Introducció
                        - generic [ref=e227]: i 1 més
                    - cell " Activat" [ref=e229]:
                      - generic [ref=e230]:
                        - generic [ref=e231]: 
                        - generic [ref=e232]: Activat
                    - cell [ref=e233]:
                      - button "button" [ref=e234]:
                        - generic [ref=e235]: 
                  - row [ref=e237] [cursor=pointer]:
                    - cell "[object Object] ALL Notification" [ref=e238]:
                      - generic [ref=e239]:
                        - img "[object Object]" [ref=e241]:
                          - paragraph [ref=e242]:
                            - generic [ref=e243]: 
                        - generic [ref=e244]: ALL Notification
                    - cell "Asesoría Jurídica y Notarial por Videollamada" [ref=e246]
                    - cell "Capçalera de notificació" [ref=e251]
                    - cell " Activat" [ref=e256]:
                      - generic [ref=e257]:
                        - generic [ref=e258]: 
                        - generic [ref=e259]: Activat
                    - cell [ref=e260]:
                      - button "button" [ref=e261]:
                        - generic [ref=e262]: 
                  - row [ref=e264] [cursor=pointer]:
                    - cell "[object Object] Automation Template 016371" [ref=e265]:
                      - generic [ref=e266]:
                        - img "[object Object]" [ref=e268]:
                          - paragraph [ref=e269]:
                            - generic [ref=e270]: 
                        - generic [ref=e271]: Automation Template 016371
                    - cell "15 Jan 26 i 209 més" [ref=e273]:
                      - generic [ref=e274]:
                        - generic [ref=e275]: 15 Jan 26
                        - generic [ref=e278]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e280]
                    - cell " Activat" [ref=e285]:
                      - generic [ref=e286]:
                        - generic [ref=e287]: 
                        - generic [ref=e288]: Activat
                    - cell [ref=e289]:
                      - button "button" [ref=e290]:
                        - generic [ref=e291]: 
                  - row [ref=e293] [cursor=pointer]:
                    - cell "[object Object] Automation Template 052908_EDITED" [ref=e294]:
                      - generic [ref=e295]:
                        - img "[object Object]" [ref=e297]:
                          - paragraph [ref=e298]:
                            - generic [ref=e299]: 
                        - generic [ref=e300]: Automation Template 052908_EDITED
                    - cell "15 Jan 26 i 209 més" [ref=e302]:
                      - generic [ref=e303]:
                        - generic [ref=e304]: 15 Jan 26
                        - generic [ref=e307]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e309]
                    - cell " Activat" [ref=e314]:
                      - generic [ref=e315]:
                        - generic [ref=e316]: 
                        - generic [ref=e317]: Activat
                    - cell [ref=e318]:
                      - button "button" [ref=e319]:
                        - generic [ref=e320]: 
                  - row [ref=e322] [cursor=pointer]:
                    - cell "[object Object] Automation Template 220187" [ref=e323]:
                      - generic [ref=e324]:
                        - img "[object Object]" [ref=e326]:
                          - paragraph [ref=e327]:
                            - generic [ref=e328]: 
                        - generic [ref=e329]: Automation Template 220187
                    - cell "15 Jan 26 i 209 més" [ref=e331]:
                      - generic [ref=e332]:
                        - generic [ref=e333]: 15 Jan 26
                        - generic [ref=e336]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e338]
                    - cell " Activat" [ref=e343]:
                      - generic [ref=e344]:
                        - generic [ref=e345]: 
                        - generic [ref=e346]: Activat
                    - cell [ref=e347]:
                      - button "button" [ref=e348]:
                        - generic [ref=e349]: 
                  - row [ref=e351] [cursor=pointer]:
                    - cell "[object Object] Automation Template 225498" [ref=e352]:
                      - generic [ref=e353]:
                        - img "[object Object]" [ref=e355]:
                          - paragraph [ref=e356]:
                            - generic [ref=e357]: 
                        - generic [ref=e358]: Automation Template 225498
                    - cell "15 Jan 26 i 209 més" [ref=e360]:
                      - generic [ref=e361]:
                        - generic [ref=e362]: 15 Jan 26
                        - generic [ref=e365]: i 209 més
                    - cell "Avís" [ref=e367]
                    - cell " Activat" [ref=e372]:
                      - generic [ref=e373]:
                        - generic [ref=e374]: 
                        - generic [ref=e375]: Activat
                    - cell [ref=e376]:
                      - button "button" [ref=e377]:
                        - generic [ref=e378]: 
                  - row [ref=e380] [cursor=pointer]:
                    - cell "[object Object] Automation Template 315605" [ref=e381]:
                      - generic [ref=e382]:
                        - img "[object Object]" [ref=e384]:
                          - paragraph [ref=e385]:
                            - generic [ref=e386]: 
                        - generic [ref=e387]: Automation Template 315605
                    - cell "15 Jan 26 i 208 més" [ref=e389]:
                      - generic [ref=e390]:
                        - generic [ref=e391]: 15 Jan 26
                        - generic [ref=e394]: i 208 més
                    - cell "Notificació" [ref=e396]
                    - cell " Activat" [ref=e401]:
                      - generic [ref=e402]:
                        - generic [ref=e403]: 
                        - generic [ref=e404]: Activat
                    - cell [ref=e405]:
                      - button "button" [ref=e406]:
                        - generic [ref=e407]: 
                  - row [ref=e409] [cursor=pointer]:
                    - cell "[object Object] Automation Template 544179" [ref=e410]:
                      - generic [ref=e411]:
                        - img "[object Object]" [ref=e413]:
                          - paragraph [ref=e414]:
                            - generic [ref=e415]: 
                        - generic [ref=e416]: Automation Template 544179
                    - cell "15 Jan 26 i 207 més" [ref=e418]:
                      - generic [ref=e419]:
                        - generic [ref=e420]: 15 Jan 26
                        - generic [ref=e423]: i 207 més
                    - cell "Conclusió" [ref=e425]
                    - cell " Activat" [ref=e430]:
                      - generic [ref=e431]:
                        - generic [ref=e432]: 
                        - generic [ref=e433]: Activat
                    - cell [ref=e434]:
                      - button "button" [ref=e435]:
                        - generic [ref=e436]: 
                  - row [ref=e438] [cursor=pointer]:
                    - cell "[object Object] Automation Template 611126" [ref=e439]:
                      - generic [ref=e440]:
                        - img "[object Object]" [ref=e442]:
                          - paragraph [ref=e443]:
                            - generic [ref=e444]: 
                        - generic [ref=e445]: Automation Template 611126
                    - cell "15 Jan 26 i 208 més" [ref=e447]:
                      - generic [ref=e448]:
                        - generic [ref=e449]: 15 Jan 26
                        - generic [ref=e452]: i 208 més
                    - cell "Notificació" [ref=e454]
                    - cell " Activat" [ref=e459]:
                      - generic [ref=e460]:
                        - generic [ref=e461]: 
                        - generic [ref=e462]: Activat
                    - cell [ref=e463]:
                      - button "button" [ref=e464]:
                        - generic [ref=e465]: 
                  - row [ref=e467] [cursor=pointer]:
                    - cell "[object Object] Automation Template 660462" [ref=e468]:
                      - generic [ref=e469]:
                        - img "[object Object]" [ref=e471]:
                          - paragraph [ref=e472]:
                            - generic [ref=e473]: 
                        - generic [ref=e474]: Automation Template 660462
                    - cell "15 Jan 26 i 207 més" [ref=e476]:
                      - generic [ref=e477]:
                        - generic [ref=e478]: 15 Jan 26
                        - generic [ref=e481]: i 207 més
                    - cell "Instruccions post-cita" [ref=e483]
                    - cell " Activat" [ref=e488]:
                      - generic [ref=e489]:
                        - generic [ref=e490]: 
                        - generic [ref=e491]: Activat
                    - cell [ref=e492]:
                      - button "button" [ref=e493]:
                        - generic [ref=e494]: 
                  - row [ref=e496] [cursor=pointer]:
                    - cell "[object Object] Automation Template 674827" [ref=e497]:
                      - generic [ref=e498]:
                        - img "[object Object]" [ref=e500]:
                          - paragraph [ref=e501]:
                            - generic [ref=e502]: 
                        - generic [ref=e503]: Automation Template 674827
                    - cell "15 Jan 26 i 209 més" [ref=e505]:
                      - generic [ref=e506]:
                        - generic [ref=e507]: 15 Jan 26
                        - generic [ref=e510]: i 209 més
                    - cell "Instruccions post-cita" [ref=e512]
                    - cell " Activat" [ref=e517]:
                      - generic [ref=e518]:
                        - generic [ref=e519]: 
                        - generic [ref=e520]: Activat
                    - cell [ref=e521]:
                      - button "button" [ref=e522]:
                        - generic [ref=e523]: 
                  - row [ref=e525] [cursor=pointer]:
                    - cell "[object Object] Automation Template 872927" [ref=e526]:
                      - generic [ref=e527]:
                        - img "[object Object]" [ref=e529]:
                          - paragraph [ref=e530]:
                            - generic [ref=e531]: 
                        - generic [ref=e532]: Automation Template 872927
                    - cell "15 Jan 26 i 207 més" [ref=e534]:
                      - generic [ref=e535]:
                        - generic [ref=e536]: 15 Jan 26
                        - generic [ref=e539]: i 207 més
                    - cell "Consentiments" [ref=e541]
                    - cell " Activat" [ref=e546]:
                      - generic [ref=e547]:
                        - generic [ref=e548]: 
                        - generic [ref=e549]: Activat
                    - cell [ref=e550]:
                      - button "button" [ref=e551]:
                        - generic [ref=e552]: 
                  - row [ref=e554] [cursor=pointer]:
                    - cell "[object Object] Automation Template 909839" [ref=e555]:
                      - generic [ref=e556]:
                        - img "[object Object]" [ref=e558]:
                          - paragraph [ref=e559]:
                            - generic [ref=e560]: 
                        - generic [ref=e561]: Automation Template 909839
                    - cell "15 Jan 26 i 207 més" [ref=e563]:
                      - generic [ref=e564]:
                        - generic [ref=e565]: 15 Jan 26
                        - generic [ref=e568]: i 207 més
                    - cell "Conclusió" [ref=e570]
                    - cell " Activat" [ref=e575]:
                      - generic [ref=e576]:
                        - generic [ref=e577]: 
                        - generic [ref=e578]: Activat
                    - cell [ref=e579]:
                      - button "button" [ref=e580]:
                        - generic [ref=e581]: 
                  - row [ref=e583] [cursor=pointer]:
                    - cell "[object Object] Automation Template 982727" [ref=e584]:
                      - generic [ref=e585]:
                        - img "[object Object]" [ref=e587]:
                          - paragraph [ref=e588]:
                            - generic [ref=e589]: 
                        - generic [ref=e590]: Automation Template 982727
                    - cell "15 Jan 26 i 207 més" [ref=e592]:
                      - generic [ref=e593]:
                        - generic [ref=e594]: 15 Jan 26
                        - generic [ref=e597]: i 207 més
                    - cell "Consentiments" [ref=e599]
                    - cell " Activat" [ref=e604]:
                      - generic [ref=e605]:
                        - generic [ref=e606]: 
                        - generic [ref=e607]: Activat
                    - cell [ref=e608]:
                      - button "button" [ref=e609]:
                        - generic [ref=e610]: 
                  - row [ref=e612] [cursor=pointer]:
                    - cell "[object Object] da" [ref=e613]:
                      - generic [ref=e614]:
                        - img "[object Object]" [ref=e616]:
                          - paragraph [ref=e617]:
                            - generic [ref=e618]: 
                        - generic [ref=e619]: da
                    - cell "15 Jan 26 i 183 més" [ref=e621]:
                      - generic [ref=e622]:
                        - generic [ref=e623]: 15 Jan 26
                        - generic [ref=e626]: i 183 més
                    - cell "-" [ref=e628]
                    - cell " Activat" [ref=e629]:
                      - generic [ref=e630]:
                        - generic [ref=e631]: 
                        - generic [ref=e632]: Activat
                    - cell [ref=e633]:
                      - button "button" [ref=e634]:
                        - generic [ref=e635]: 
                  - row [ref=e637] [cursor=pointer]:
                    - cell "[object Object] dasdas" [ref=e638]:
                      - generic [ref=e639]:
                        - img "[object Object]" [ref=e641]:
                          - paragraph [ref=e642]:
                            - generic [ref=e643]: 
                        - generic [ref=e644]: dasdas
                    - cell "15 Jan 26 i 203 més" [ref=e646]:
                      - generic [ref=e647]:
                        - generic [ref=e648]: 15 Jan 26
                        - generic [ref=e651]: i 203 més
                    - cell "Consentiments i 5 més" [ref=e653]:
                      - generic [ref=e654]:
                        - generic [ref=e655]: Consentiments
                        - generic [ref=e658]: i 5 més
                    - cell " Activat" [ref=e660]:
                      - generic [ref=e661]:
                        - generic [ref=e662]: 
                        - generic [ref=e663]: Activat
                    - cell [ref=e664]:
                      - button "button" [ref=e665]:
                        - generic [ref=e666]: 
                  - row [ref=e668] [cursor=pointer]:
                    - cell "[object Object] drugi maj" [ref=e669]:
                      - generic [ref=e670]:
                        - img "[object Object]" [ref=e672]:
                          - paragraph [ref=e673]:
                            - generic [ref=e674]: 
                        - generic [ref=e675]: drugi maj
                    - cell "1 app dayyaa 1 app dayyaa 21 05 i 145 més" [ref=e677]:
                      - generic [ref=e678]:
                        - generic [ref=e679]: 1 app dayyaa 1 app dayyaa 21 05
                        - generic [ref=e682]: i 145 més
                    - cell "Consentiments" [ref=e684]
                    - cell " Activat" [ref=e689]:
                      - generic [ref=e690]:
                        - generic [ref=e691]: 
                        - generic [ref=e692]: Activat
                    - cell [ref=e693]:
                      - button "button" [ref=e694]:
                        - generic [ref=e695]: 
                  - row [ref=e697] [cursor=pointer]:
                    - cell "[object Object] dzenan 3 feb 2025" [ref=e698]:
                      - generic [ref=e699]:
                        - img "[object Object]" [ref=e701]:
                          - paragraph [ref=e702]:
                            - generic [ref=e703]: 
                        - generic [ref=e704]: dzenan 3 feb 2025
                    - cell "1time 1h 2h i 140 més" [ref=e706]:
                      - generic [ref=e707]:
                        - generic [ref=e708]: 1time 1h 2h
                        - generic [ref=e711]: i 140 més
                    - cell "-" [ref=e713]
                    - cell " Activat" [ref=e714]:
                      - generic [ref=e715]:
                        - generic [ref=e716]: 
                        - generic [ref=e717]: Activat
                    - cell [ref=e718]:
                      - button "button" [ref=e719]:
                        - generic [ref=e720]: 
                  - row [ref=e722] [cursor=pointer]:
                    - cell "[object Object] dzenan test" [ref=e723]:
                      - generic [ref=e724]:
                        - img "[object Object]" [ref=e726]:
                          - paragraph [ref=e727]:
                            - generic [ref=e728]: 
                        - generic [ref=e729]: dzenan test
                    - cell "1 app dayyaa 1 app dayyaa 21 05 i 145 més" [ref=e731]:
                      - generic [ref=e732]:
                        - generic [ref=e733]: 1 app dayyaa 1 app dayyaa 21 05
                        - generic [ref=e736]: i 145 més
                    - cell "-" [ref=e738]
                    - cell " Activat" [ref=e739]:
                      - generic [ref=e740]:
                        - generic [ref=e741]: 
                        - generic [ref=e742]: Activat
                    - cell [ref=e743]:
                      - button "button" [ref=e744]:
                        - generic [ref=e745]: 
                  - row [ref=e747] [cursor=pointer]:
                    - cell "[object Object] kr" [ref=e748]:
                      - generic [ref=e749]:
                        - img "[object Object]" [ref=e751]:
                          - paragraph [ref=e752]:
                            - generic [ref=e753]: 
                        - generic [ref=e754]: kr
                    - cell "19 juni rigid i 170 més" [ref=e756]:
                      - generic [ref=e757]:
                        - generic [ref=e758]: 19 juni rigid
                        - generic [ref=e761]: i 170 més
                    - cell "-" [ref=e763]
                    - cell " Activat" [ref=e764]:
                      - generic [ref=e765]:
                        - generic [ref=e766]: 
                        - generic [ref=e767]: Activat
                    - cell [ref=e768]:
                      - button "button" [ref=e769]:
                        - generic [ref=e770]: 
                  - row [ref=e772] [cursor=pointer]:
                    - cell "[object Object] new template 27.12.2023" [ref=e773]:
                      - generic [ref=e774]:
                        - img "[object Object]" [ref=e776]:
                          - paragraph [ref=e777]:
                            - generic [ref=e778]: 
                        - generic [ref=e779]: new template 27.12.2023
                    - cell "Autoliquidación del impuesto sobre vehículos de tracción mecánica" [ref=e781]
                    - cell "-" [ref=e786]
                    - cell " Activat" [ref=e787]:
                      - generic [ref=e788]:
                        - generic [ref=e789]: 
                        - generic [ref=e790]: Activat
                    - cell [ref=e791]:
                      - button "button" [ref=e792]:
                        - generic [ref=e793]: 
                  - row [ref=e795] [cursor=pointer]:
                    - cell "[object Object] new template qa may 14" [ref=e796]:
                      - generic [ref=e797]:
                        - img "[object Object]" [ref=e799]:
                          - paragraph [ref=e800]:
                            - generic [ref=e801]: 
                        - generic [ref=e802]: new template qa may 14
                    - cell "-" [ref=e804]
                    - cell "-" [ref=e805]
                    - cell " Activat" [ref=e806]:
                      - generic [ref=e807]:
                        - generic [ref=e808]: 
                        - generic [ref=e809]: Activat
                    - cell [ref=e810]:
                      - button "button" [ref=e811]:
                        - generic [ref=e812]: 
                  - row [ref=e814] [cursor=pointer]:
                    - cell "[object Object] new template test something just to test hahaha new template test something just to test hahaha new template test something just to test hahaha new template test something just to test hahaha" [ref=e815]:
                      - generic [ref=e816]:
                        - img "[object Object]" [ref=e818]:
                          - paragraph [ref=e819]:
                            - generic [ref=e820]: 
                        - generic [ref=e821]: new template test something just to test hahaha new template test something just to test hahaha new template test something just to test hahaha new template test something just to test hahaha
                    - cell "-" [ref=e823]
                    - cell "-" [ref=e824]
                    - cell " Activat" [ref=e825]:
                      - generic [ref=e826]:
                        - generic [ref=e827]: 
                        - generic [ref=e828]: Activat
                    - cell [ref=e829]:
                      - button "button" [ref=e830]:
                        - generic [ref=e831]: 
                  - row [ref=e833] [cursor=pointer]:
                    - cell "[object Object] NOT" [ref=e834]:
                      - generic [ref=e835]:
                        - img "[object Object]" [ref=e837]:
                          - paragraph [ref=e838]:
                            - generic [ref=e839]: 
                        - generic [ref=e840]: NOT
                    - cell "Armija Rame Isaka - VIDEO" [ref=e842]
                    - cell "Notificació" [ref=e847]
                    - cell " Activat" [ref=e852]:
                      - generic [ref=e853]:
                        - generic [ref=e854]: 
                        - generic [ref=e855]: Activat
                    - cell [ref=e856]:
                      - button "button" [ref=e857]:
                        - generic [ref=e858]: 
              - generic [ref=e860]:
                - generic [ref=e861]: 1 - 25 of 43
                - navigation "Paginación de resultados" [ref=e864]:
                  - generic [ref=e865]:
                    - button "Página 1" [ref=e866] [cursor=pointer]: "1"
                    - button "Página 2" [ref=e867] [cursor=pointer]: "2"
                  - button "Página siguiente" [ref=e869] [cursor=pointer]:
                    - generic [aria-hidden] [ref=e870]: 
            - generic "Afegir plantilla" [ref=e871]:
              - button "Floating action button" [ref=e872] [cursor=pointer]:
                - generic [ref=e873]: 
        - generic [ref=e876]:
          - generic [ref=e877] [cursor=pointer]: Aviso legal y Términos y condiciones de uso
          - generic [ref=e878] [cursor=pointer]: Política de privacidad de Councilbox Technology S.L.
  - generic [ref=e879]:
    - generic [ref=e883]:
      - generic [ref=e884]: Nova versió OVAC 8.7
      - generic [ref=e885]:
        - generic [ref=e886]: Hem actualitzat l'aplicació a la seva última versió per a oferir-li una millor experiència. Aquesta actualització inclou importants millores, correccions d'errors i optimitzacions que faran més fàcil i agradable el seu ús.
        - generic [ref=e887]: Revisar novetats
    - button [ref=e893] [cursor=pointer]
```

# Test source

```ts
  1   | import { Page, Locator, expect, test } from '@playwright/test';
  2   | import { BasePage } from '../BasePage';
  3   | import { MESSAGES } from '../../utils/Constants';
  4   | 
  5   | export interface TagData {
  6   |     key: string;
  7   |     value: string;
  8   |     description: string;
  9   | }
  10  | 
  11  | export class TagsPage extends BasePage {
  12  |     // Navigation
  13  |     readonly tagsTab: Locator;
  14  | 
  15  |     // Action buttons
  16  |     readonly createTagButton: Locator;
  17  | 
  18  |     // Form fields
  19  |     readonly tagKeyInput: Locator;
  20  |     readonly tagValueInput: Locator;
  21  |     readonly tagDescriptionInput: Locator;
  22  |     readonly saveButton: Locator;
  23  | 
  24  |     // Search & Table
  25  |     readonly searchInput: Locator;
  26  |     readonly tableBody: Locator;
  27  | 
  28  |     // Alerts
  29  |     readonly alertMessage: Locator;
  30  | 
  31  |     // Delete
  32  |     readonly deleteButton: Locator;
  33  |     readonly confirmDeleteButton: Locator;
  34  |     readonly deleteModalHeader: Locator;
  35  | 
  36  |     constructor(page: Page) {
  37  |         super(page);
  38  |         this.tagsTab = page.locator('button, [role="tab"]').filter({ hasText: /Tags|Etiquetas/i }).first();
  39  |         this.createTagButton = page.locator('#add-procedure-button, #add-tag-button, button:has(.ri-add-line), .MuiFab-root').first();
  40  |         this.tagKeyInput = page.locator('#company-tag-key');
  41  |         this.tagValueInput = page.locator('#company-tag-value');
  42  |         this.tagDescriptionInput = page.locator('#company-tag-description');
  43  |         this.saveButton = page.getByRole('button', { name: /Save|Guardar/i })
  44  |             .or(page.locator('#panel-confirm-button-accept, #-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")'))
  45  |             .first();
  46  |         this.searchInput = page.getByRole('textbox', { name: /Search tags|Search by participant or record|Buscar/i })
  47  |             .or(page.getByPlaceholder(/Search tags|Buscar etiquetas|Search|Buscar/i))
  48  |             .or(page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]'))
  49  |             .first();
  50  |         this.tableBody = page.locator('tbody');
  51  |         this.alertMessage = page.getByRole('alert');
  52  |         this.deleteButton = page.getByRole('button', { name: /Delete|Eliminar/i })
  53  |             .or(page.locator('[role="menuitem"]').filter({ hasText: /Delete|Eliminar/i }))
  54  |             .first();
  55  |         this.confirmDeleteButton = page.locator('#panel-confirm-button-accept, #modal-button-accept')
  56  |             .or(page.getByRole('dialog').getByRole('button', { name: /Delete|Eliminar|Accept|Aceptar/i }))
  57  |             .first();
  58  |         this.deleteModalHeader = page.getByRole('paragraph');
  59  |     }
  60  | 
  61  |     async navigateToTagsTab() {
  62  |         await test.step('Navigate to Tags tab', async () => {
> 63  |             await this.tagsTab.waitFor({ state: 'visible', timeout: 10000 });
      |                                ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  64  |             await this.tagsTab.click();
  65  |         });
  66  |     }
  67  | 
  68  |     async openCreateTagForm() {
  69  |         await test.step('Open create tag form', async () => {
  70  |             await this.createTagButton.waitFor({ state: 'visible', timeout: 10000 });
  71  |             await this.createTagButton.click();
  72  |         });
  73  |     }
  74  | 
  75  |     async fillTagDetails(data: TagData) {
  76  |         await test.step(`Fill tag details: key="${data.key}"`, async () => {
  77  |             await this.tagKeyInput.waitFor({ state: 'visible', timeout: 5000 });
  78  |             await this.tagKeyInput.fill(data.key);
  79  |             await this.tagValueInput.fill(data.value);
  80  |             await this.tagDescriptionInput.fill(data.description);
  81  |         });
  82  |     }
  83  | 
  84  |     async submitCreateForm() {
  85  |         await test.step('Submit create tag form', async () => {
  86  |             await this.saveButton.waitFor({ state: 'attached', timeout: 5000 });
  87  |             await this.saveButton.evaluate((el) => (el as HTMLElement).click());
  88  |             await this.page.waitForTimeout(1000);
  89  |         });
  90  |     }
  91  | 
  92  |     async createTag(data: TagData) {
  93  |         await test.step(`Create tag: ${data.key}`, async () => {
  94  |             await this.openCreateTagForm();
  95  |             await this.fillTagDetails(data);
  96  |             await this.submitCreateForm();
  97  |         });
  98  |     }
  99  | 
  100 |     async searchTag(key: string) {
  101 |         await test.step(`Search for tag: ${key}`, async () => {
  102 |             await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
  103 |             await this.searchInput.fill(key);
  104 |         });
  105 |     }
  106 | 
  107 |     async verifyTagInTable(key: string) {
  108 |         await test.step(`Verify tag "${key}" appears in table`, async () => {
  109 |             await expect(this.tableBody).toContainText(key);
  110 |         });
  111 |     }
  112 | 
  113 |     async deleteTag(key: string) {
  114 |         await test.step(`Delete tag: ${key}`, async () => {
  115 |             await this.searchTag(key);
  116 |             const row = this.tableBody.locator('tr', { hasText: key });
  117 |             await row.waitFor({ state: 'visible', timeout: 5000 });
  118 |             await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();
  119 |             await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
  120 |             await this.deleteButton.click();
  121 |             await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
  122 |             await this.confirmDeleteButton.click();
  123 |         });
  124 |     }
  125 | 
  126 |     async verifyDeleteSuccessAlert() {
  127 |         await test.step('Verify tag deleted success alert', async () => {
  128 |             await expect(this.alertMessage).toContainText(MESSAGES.TAG_DELETED);
  129 |         });
  130 |     }
  131 | 
  132 |     async verifyNoSearchResults() {
  133 |         await test.step('Verify no tag search results', async () => {
  134 |             await this.page.waitForTimeout(1000);
  135 |             const emptyMsg = this.page.getByText(/No content found|No se encontró contenido|No hay resultados/i).first();
  136 |             if (await emptyMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
  137 |                 await expect(emptyMsg).toBeVisible();
  138 |             } else {
  139 |                 await expect(this.tableBody).not.toContainText(/NONEXISTENT/i, { timeout: 5000 });
  140 |             }
  141 |         });
  142 |     }
  143 | 
  144 |     async editTag(key: string, newData: Partial<TagData>) {
  145 |         await test.step(`Edit tag: ${key}`, async () => {
  146 |             await this.searchTag(key);
  147 |             const row = this.tableBody.locator('tr', { hasText: key });
  148 |             await row.waitFor({ state: 'visible', timeout: 5000 });
  149 |             await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();
  150 | 
  151 |             // Click Edit option
  152 |             const editButton = this.page.getByRole('button', { name: /Edit|Editar/i }).first();
  153 |             await editButton.waitFor({ state: 'visible', timeout: 5000 });
  154 |             await editButton.click();
  155 | 
  156 |             // Wait for form to appear and fill new data
  157 |             await this.tagKeyInput.waitFor({ state: 'visible', timeout: 5000 });
  158 | 
  159 |             if (newData.value) {
  160 |                 await this.tagValueInput.clear();
  161 |                 await this.tagValueInput.fill(newData.value);
  162 |             }
  163 |             if (newData.description) {
```