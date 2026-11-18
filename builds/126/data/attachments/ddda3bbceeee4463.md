# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/templates/templatesTests.spec.ts >> Templates - Drafts & Search Tests (Xray Execution 77514) >> The user is able to switch between the pages - Templates @OVAC-4876 @regression
- Location: tests/templates/templatesTests.spec.ts:211:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /siguiente|next/i }).or(getByRole('button', { name: '2' })).or(locator('nav button:last-child')).first()
    - locator resolved to <button type="button" aria-label="Página 2">2</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div>…</div> from <div class="slide-in">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div>…</div> from <div class="slide-in">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    94 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div>…</div> from <div class="slide-in">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

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
                    - cell "[object Object] Automation Template 024737" [ref=e294]:
                      - generic [ref=e295]:
                        - img "[object Object]" [ref=e297]:
                          - paragraph [ref=e298]:
                            - generic [ref=e299]: 
                        - generic [ref=e300]: Automation Template 024737
                    - cell "15 Jan 26 i 209 més" [ref=e302]:
                      - generic [ref=e303]:
                        - generic [ref=e304]: 15 Jan 26
                        - generic [ref=e307]: i 209 més
                    - cell "Notificació" [ref=e309]
                    - cell " Activat" [ref=e314]:
                      - generic [ref=e315]:
                        - generic [ref=e316]: 
                        - generic [ref=e317]: Activat
                    - cell [ref=e318]:
                      - button "button" [ref=e319]:
                        - generic [ref=e320]: 
                  - row [ref=e322] [cursor=pointer]:
                    - cell "[object Object] Automation Template 025349" [ref=e323]:
                      - generic [ref=e324]:
                        - img "[object Object]" [ref=e326]:
                          - paragraph [ref=e327]:
                            - generic [ref=e328]: 
                        - generic [ref=e329]: Automation Template 025349
                    - cell "15 Jan 26 i 209 més" [ref=e331]:
                      - generic [ref=e332]:
                        - generic [ref=e333]: 15 Jan 26
                        - generic [ref=e336]: i 209 més
                    - cell "Consentiments" [ref=e338]
                    - cell " Activat" [ref=e343]:
                      - generic [ref=e344]:
                        - generic [ref=e345]: 
                        - generic [ref=e346]: Activat
                    - cell [ref=e347]:
                      - button "button" [ref=e348]:
                        - generic [ref=e349]: 
                  - row [ref=e351] [cursor=pointer]:
                    - cell "[object Object] Automation Template 052908_EDITED" [ref=e352]:
                      - generic [ref=e353]:
                        - img "[object Object]" [ref=e355]:
                          - paragraph [ref=e356]:
                            - generic [ref=e357]: 
                        - generic [ref=e358]: Automation Template 052908_EDITED
                    - cell "15 Jan 26 i 209 més" [ref=e360]:
                      - generic [ref=e361]:
                        - generic [ref=e362]: 15 Jan 26
                        - generic [ref=e365]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e367]
                    - cell " Activat" [ref=e372]:
                      - generic [ref=e373]:
                        - generic [ref=e374]: 
                        - generic [ref=e375]: Activat
                    - cell [ref=e376]:
                      - button "button" [ref=e377]:
                        - generic [ref=e378]: 
                  - row [ref=e380] [cursor=pointer]:
                    - cell "[object Object] Automation Template 110925" [ref=e381]:
                      - generic [ref=e382]:
                        - img "[object Object]" [ref=e384]:
                          - paragraph [ref=e385]:
                            - generic [ref=e386]: 
                        - generic [ref=e387]: Automation Template 110925
                    - cell "15 Jan 26 i 209 més" [ref=e389]:
                      - generic [ref=e390]:
                        - generic [ref=e391]: 15 Jan 26
                        - generic [ref=e394]: i 209 més
                    - cell "Avís" [ref=e396]
                    - cell " Activat" [ref=e401]:
                      - generic [ref=e402]:
                        - generic [ref=e403]: 
                        - generic [ref=e404]: Activat
                    - cell [ref=e405]:
                      - button "button" [ref=e406]:
                        - generic [ref=e407]: 
                  - row [ref=e409] [cursor=pointer]:
                    - cell "[object Object] Automation Template 220187" [ref=e410]:
                      - generic [ref=e411]:
                        - img "[object Object]" [ref=e413]:
                          - paragraph [ref=e414]:
                            - generic [ref=e415]: 
                        - generic [ref=e416]: Automation Template 220187
                    - cell "15 Jan 26 i 209 més" [ref=e418]:
                      - generic [ref=e419]:
                        - generic [ref=e420]: 15 Jan 26
                        - generic [ref=e423]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e425]
                    - cell " Activat" [ref=e430]:
                      - generic [ref=e431]:
                        - generic [ref=e432]: 
                        - generic [ref=e433]: Activat
                    - cell [ref=e434]:
                      - button "button" [ref=e435]:
                        - generic [ref=e436]: 
                  - row [ref=e438] [cursor=pointer]:
                    - cell "[object Object] Automation Template 225498" [ref=e439]:
                      - generic [ref=e440]:
                        - img "[object Object]" [ref=e442]:
                          - paragraph [ref=e443]:
                            - generic [ref=e444]: 
                        - generic [ref=e445]: Automation Template 225498
                    - cell "15 Jan 26 i 209 més" [ref=e447]:
                      - generic [ref=e448]:
                        - generic [ref=e449]: 15 Jan 26
                        - generic [ref=e452]: i 209 més
                    - cell "Avís" [ref=e454]
                    - cell " Activat" [ref=e459]:
                      - generic [ref=e460]:
                        - generic [ref=e461]: 
                        - generic [ref=e462]: Activat
                    - cell [ref=e463]:
                      - button "button" [ref=e464]:
                        - generic [ref=e465]: 
                  - row [ref=e467] [cursor=pointer]:
                    - cell "[object Object] Automation Template 315605" [ref=e468]:
                      - generic [ref=e469]:
                        - img "[object Object]" [ref=e471]:
                          - paragraph [ref=e472]:
                            - generic [ref=e473]: 
                        - generic [ref=e474]: Automation Template 315605
                    - cell "15 Jan 26 i 208 més" [ref=e476]:
                      - generic [ref=e477]:
                        - generic [ref=e478]: 15 Jan 26
                        - generic [ref=e481]: i 208 més
                    - cell "Notificació" [ref=e483]
                    - cell " Activat" [ref=e488]:
                      - generic [ref=e489]:
                        - generic [ref=e490]: 
                        - generic [ref=e491]: Activat
                    - cell [ref=e492]:
                      - button "button" [ref=e493]:
                        - generic [ref=e494]: 
                  - row [ref=e496] [cursor=pointer]:
                    - cell "[object Object] Automation Template 338772" [ref=e497]:
                      - generic [ref=e498]:
                        - img "[object Object]" [ref=e500]:
                          - paragraph [ref=e501]:
                            - generic [ref=e502]: 
                        - generic [ref=e503]: Automation Template 338772
                    - cell "15 Jan 26 i 209 més" [ref=e505]:
                      - generic [ref=e506]:
                        - generic [ref=e507]: 15 Jan 26
                        - generic [ref=e510]: i 209 més
                    - cell "Consentiments" [ref=e512]
                    - cell " Activat" [ref=e517]:
                      - generic [ref=e518]:
                        - generic [ref=e519]: 
                        - generic [ref=e520]: Activat
                    - cell [ref=e521]:
                      - button "button" [ref=e522]:
                        - generic [ref=e523]: 
                  - row [ref=e525] [cursor=pointer]:
                    - cell "[object Object] Automation Template 544179" [ref=e526]:
                      - generic [ref=e527]:
                        - img "[object Object]" [ref=e529]:
                          - paragraph [ref=e530]:
                            - generic [ref=e531]: 
                        - generic [ref=e532]: Automation Template 544179
                    - cell "15 Jan 26 i 207 més" [ref=e534]:
                      - generic [ref=e535]:
                        - generic [ref=e536]: 15 Jan 26
                        - generic [ref=e539]: i 207 més
                    - cell "Conclusió" [ref=e541]
                    - cell " Activat" [ref=e546]:
                      - generic [ref=e547]:
                        - generic [ref=e548]: 
                        - generic [ref=e549]: Activat
                    - cell [ref=e550]:
                      - button "button" [ref=e551]:
                        - generic [ref=e552]: 
                  - row [ref=e554] [cursor=pointer]:
                    - cell "[object Object] Automation Template 611126" [ref=e555]:
                      - generic [ref=e556]:
                        - img "[object Object]" [ref=e558]:
                          - paragraph [ref=e559]:
                            - generic [ref=e560]: 
                        - generic [ref=e561]: Automation Template 611126
                    - cell "15 Jan 26 i 208 més" [ref=e563]:
                      - generic [ref=e564]:
                        - generic [ref=e565]: 15 Jan 26
                        - generic [ref=e568]: i 208 més
                    - cell "Notificació" [ref=e570]
                    - cell " Activat" [ref=e575]:
                      - generic [ref=e576]:
                        - generic [ref=e577]: 
                        - generic [ref=e578]: Activat
                    - cell [ref=e579]:
                      - button "button" [ref=e580]:
                        - generic [ref=e581]: 
                  - row [ref=e583] [cursor=pointer]:
                    - cell "[object Object] Automation Template 660462" [ref=e584]:
                      - generic [ref=e585]:
                        - img "[object Object]" [ref=e587]:
                          - paragraph [ref=e588]:
                            - generic [ref=e589]: 
                        - generic [ref=e590]: Automation Template 660462
                    - cell "15 Jan 26 i 207 més" [ref=e592]:
                      - generic [ref=e593]:
                        - generic [ref=e594]: 15 Jan 26
                        - generic [ref=e597]: i 207 més
                    - cell "Instruccions post-cita" [ref=e599]
                    - cell " Activat" [ref=e604]:
                      - generic [ref=e605]:
                        - generic [ref=e606]: 
                        - generic [ref=e607]: Activat
                    - cell [ref=e608]:
                      - button "button" [ref=e609]:
                        - generic [ref=e610]: 
                  - row [ref=e612] [cursor=pointer]:
                    - cell "[object Object] Automation Template 674827" [ref=e613]:
                      - generic [ref=e614]:
                        - img "[object Object]" [ref=e616]:
                          - paragraph [ref=e617]:
                            - generic [ref=e618]: 
                        - generic [ref=e619]: Automation Template 674827
                    - cell "15 Jan 26 i 209 més" [ref=e621]:
                      - generic [ref=e622]:
                        - generic [ref=e623]: 15 Jan 26
                        - generic [ref=e626]: i 209 més
                    - cell "Instruccions post-cita" [ref=e628]
                    - cell " Activat" [ref=e633]:
                      - generic [ref=e634]:
                        - generic [ref=e635]: 
                        - generic [ref=e636]: Activat
                    - cell [ref=e637]:
                      - button "button" [ref=e638]:
                        - generic [ref=e639]: 
                  - row [ref=e641] [cursor=pointer]:
                    - cell "[object Object] Automation Template 755886" [ref=e642]:
                      - generic [ref=e643]:
                        - img "[object Object]" [ref=e645]:
                          - paragraph [ref=e646]:
                            - generic [ref=e647]: 
                        - generic [ref=e648]: Automation Template 755886
                    - cell "15 Jan 26 i 209 més" [ref=e650]:
                      - generic [ref=e651]:
                        - generic [ref=e652]: 15 Jan 26
                        - generic [ref=e655]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e657]
                    - cell " Activat" [ref=e662]:
                      - generic [ref=e663]:
                        - generic [ref=e664]: 
                        - generic [ref=e665]: Activat
                    - cell [ref=e666]:
                      - button "button" [ref=e667]:
                        - generic [ref=e668]: 
                  - row [ref=e670] [cursor=pointer]:
                    - cell "[object Object] Automation Template 847350" [ref=e671]:
                      - generic [ref=e672]:
                        - img "[object Object]" [ref=e674]:
                          - paragraph [ref=e675]:
                            - generic [ref=e676]: 
                        - generic [ref=e677]: Automation Template 847350
                    - cell "15 Jan 26 i 209 més" [ref=e679]:
                      - generic [ref=e680]:
                        - generic [ref=e681]: 15 Jan 26
                        - generic [ref=e684]: i 209 més
                    - cell "Descripció de tràmit o cita" [ref=e686]
                    - cell " Activat" [ref=e691]:
                      - generic [ref=e692]:
                        - generic [ref=e693]: 
                        - generic [ref=e694]: Activat
                    - cell [ref=e695]:
                      - button "button" [ref=e696]:
                        - generic [ref=e697]: 
                  - row [ref=e699] [cursor=pointer]:
                    - cell "[object Object] Automation Template 872927" [ref=e700]:
                      - generic [ref=e701]:
                        - img "[object Object]" [ref=e703]:
                          - paragraph [ref=e704]:
                            - generic [ref=e705]: 
                        - generic [ref=e706]: Automation Template 872927
                    - cell "15 Jan 26 i 207 més" [ref=e708]:
                      - generic [ref=e709]:
                        - generic [ref=e710]: 15 Jan 26
                        - generic [ref=e713]: i 207 més
                    - cell "Consentiments" [ref=e715]
                    - cell " Activat" [ref=e720]:
                      - generic [ref=e721]:
                        - generic [ref=e722]: 
                        - generic [ref=e723]: Activat
                    - cell [ref=e724]:
                      - button "button" [ref=e725]:
                        - generic [ref=e726]: 
                  - row [ref=e728] [cursor=pointer]:
                    - cell "[object Object] Automation Template 909839" [ref=e729]:
                      - generic [ref=e730]:
                        - img "[object Object]" [ref=e732]:
                          - paragraph [ref=e733]:
                            - generic [ref=e734]: 
                        - generic [ref=e735]: Automation Template 909839
                    - cell "15 Jan 26 i 207 més" [ref=e737]:
                      - generic [ref=e738]:
                        - generic [ref=e739]: 15 Jan 26
                        - generic [ref=e742]: i 207 més
                    - cell "Conclusió" [ref=e744]
                    - cell " Activat" [ref=e749]:
                      - generic [ref=e750]:
                        - generic [ref=e751]: 
                        - generic [ref=e752]: Activat
                    - cell [ref=e753]:
                      - button "button" [ref=e754]:
                        - generic [ref=e755]: 
                  - row [ref=e757] [cursor=pointer]:
                    - cell "[object Object] Automation Template 982727" [ref=e758]:
                      - generic [ref=e759]:
                        - img "[object Object]" [ref=e761]:
                          - paragraph [ref=e762]:
                            - generic [ref=e763]: 
                        - generic [ref=e764]: Automation Template 982727
                    - cell "15 Jan 26 i 207 més" [ref=e766]:
                      - generic [ref=e767]:
                        - generic [ref=e768]: 15 Jan 26
                        - generic [ref=e771]: i 207 més
                    - cell "Consentiments" [ref=e773]
                    - cell " Activat" [ref=e778]:
                      - generic [ref=e779]:
                        - generic [ref=e780]: 
                        - generic [ref=e781]: Activat
                    - cell [ref=e782]:
                      - button "button" [ref=e783]:
                        - generic [ref=e784]: 
                  - row [ref=e786] [cursor=pointer]:
                    - cell "[object Object] da" [ref=e787]:
                      - generic [ref=e788]:
                        - img "[object Object]" [ref=e790]:
                          - paragraph [ref=e791]:
                            - generic [ref=e792]: 
                        - generic [ref=e793]: da
                    - cell "15 Jan 26 i 183 més" [ref=e795]:
                      - generic [ref=e796]:
                        - generic [ref=e797]: 15 Jan 26
                        - generic [ref=e800]: i 183 més
                    - cell "-" [ref=e802]
                    - cell " Activat" [ref=e803]:
                      - generic [ref=e804]:
                        - generic [ref=e805]: 
                        - generic [ref=e806]: Activat
                    - cell [ref=e807]:
                      - button "button" [ref=e808]:
                        - generic [ref=e809]: 
                  - row [ref=e811] [cursor=pointer]:
                    - cell "[object Object] dasdas" [ref=e812]:
                      - generic [ref=e813]:
                        - img "[object Object]" [ref=e815]:
                          - paragraph [ref=e816]:
                            - generic [ref=e817]: 
                        - generic [ref=e818]: dasdas
                    - cell "15 Jan 26 i 203 més" [ref=e820]:
                      - generic [ref=e821]:
                        - generic [ref=e822]: 15 Jan 26
                        - generic [ref=e825]: i 203 més
                    - cell "Consentiments i 5 més" [ref=e827]:
                      - generic [ref=e828]:
                        - generic [ref=e829]: Consentiments
                        - generic [ref=e832]: i 5 més
                    - cell " Activat" [ref=e834]:
                      - generic [ref=e835]:
                        - generic [ref=e836]: 
                        - generic [ref=e837]: Activat
                    - cell [ref=e838]:
                      - button "button" [ref=e839]:
                        - generic [ref=e840]: 
                  - row [ref=e842] [cursor=pointer]:
                    - cell "[object Object] drugi maj" [ref=e843]:
                      - generic [ref=e844]:
                        - img "[object Object]" [ref=e846]:
                          - paragraph [ref=e847]:
                            - generic [ref=e848]: 
                        - generic [ref=e849]: drugi maj
                    - cell "1 app dayyaa 1 app dayyaa 21 05 i 145 més" [ref=e851]:
                      - generic [ref=e852]:
                        - generic [ref=e853]: 1 app dayyaa 1 app dayyaa 21 05
                        - generic [ref=e856]: i 145 més
                    - cell "Consentiments" [ref=e858]
                    - cell " Activat" [ref=e863]:
                      - generic [ref=e864]:
                        - generic [ref=e865]: 
                        - generic [ref=e866]: Activat
                    - cell [ref=e867]:
                      - button "button" [ref=e868]:
                        - generic [ref=e869]: 
                  - row [ref=e871] [cursor=pointer]:
                    - cell "[object Object] dzenan 3 feb 2025" [ref=e872]:
                      - generic [ref=e873]:
                        - img "[object Object]" [ref=e875]:
                          - paragraph [ref=e876]:
                            - generic [ref=e877]: 
                        - generic [ref=e878]: dzenan 3 feb 2025
                    - cell "1time 1h 2h i 140 més" [ref=e880]:
                      - generic [ref=e881]:
                        - generic [ref=e882]: 1time 1h 2h
                        - generic [ref=e885]: i 140 més
                    - cell "-" [ref=e887]
                    - cell " Activat" [ref=e888]:
                      - generic [ref=e889]:
                        - generic [ref=e890]: 
                        - generic [ref=e891]: Activat
                    - cell [ref=e892]:
                      - button "button" [ref=e893]:
                        - generic [ref=e894]: 
              - generic [ref=e896]:
                - generic [ref=e897]: 1 - 25 of 49
                - navigation "Paginación de resultados" [ref=e900]:
                  - generic [ref=e901]:
                    - button "Página 1" [ref=e902] [cursor=pointer]: "1"
                    - button "Página 2" [ref=e903] [cursor=pointer]: "2"
                  - button "Página siguiente" [ref=e905] [cursor=pointer]:
                    - generic [aria-hidden] [ref=e906]: 
            - generic "Afegir plantilla" [ref=e907]:
              - button "Floating action button" [ref=e908] [cursor=pointer]:
                - generic [ref=e909]: 
        - generic [ref=e912]:
          - generic [ref=e913] [cursor=pointer]: Aviso legal y Términos y condiciones de uso
          - generic [ref=e914] [cursor=pointer]: Política de privacidad de Councilbox Technology S.L.
  - generic [ref=e915]:
    - generic [ref=e919]:
      - generic [ref=e920]: Nova versió OVAC 8.7
      - generic [ref=e921]:
        - generic [ref=e922]: Hem actualitzat l'aplicació a la seva última versió per a oferir-li una millor experiència. Aquesta actualització inclou importants millores, correccions d'errors i optimitzacions que faran més fàcil i agradable el seu ús.
        - generic [ref=e923]: Revisar novetats
    - button [ref=e929] [cursor=pointer]
```

# Test source

```ts
  92  |             await this.fillTemplateDetails(data);
  93  |             await this.submitCreateForm();
  94  |         });
  95  |     }
  96  | 
  97  |     async verifySuccessAlert() {
  98  |         await test.step('Verify template created success alert', async () => {
  99  |             await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_CREATED);
  100 |         });
  101 |     }
  102 | 
  103 |     async searchTemplate(name: string) {
  104 |         await test.step(`Search for template: ${name}`, async () => {
  105 |             await this.searchInput.fill(name);
  106 |         });
  107 |     }
  108 | 
  109 |     async verifyTemplateInTable(name: string) {
  110 |         await test.step(`Verify template "${name}" appears in table`, async () => {
  111 |             await expect(this.tableBody).toContainText(name);
  112 |         });
  113 |     }
  114 | 
  115 |     async deleteTemplate(name: string) {
  116 |         await test.step(`Delete template: ${name}`, async () => {
  117 |             await this.searchTemplate(name);
  118 |             // Click the 3-dot actions button on the found row
  119 |             const row = this.tableBody.locator('tr', { hasText: name });
  120 |             await row.waitFor({ state: 'visible', timeout: 5000 });
  121 |             await row.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button').first().click();
  122 |             await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
  123 |             await this.deleteButton.click();
  124 |             await this.confirmDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
  125 |             await this.confirmDeleteButton.click();
  126 |         });
  127 |     }
  128 | 
  129 |     async verifyDeleteSuccessAlert() {
  130 |         await test.step('Verify template deleted success alert', async () => {
  131 |             await expect(this.alertMessage).toContainText(MESSAGES.TEMPLATE_DELETED);
  132 |         });
  133 |     }
  134 | 
  135 |     async verifyNoSearchResults() {
  136 |         await test.step('Verify no template search results', async () => {
  137 |             await this.page.waitForTimeout(1000);
  138 |             const emptyMsg = this.page.getByText(/There are no results for your search|No hay resultados para su búsqueda|No hay resultados/i).first();
  139 |             if (await emptyMsg.isVisible({ timeout: 3000 }).catch(() => false)) {
  140 |                 await expect(emptyMsg).toBeVisible();
  141 |             } else {
  142 |                 await expect(this.tableBody).not.toContainText(/NONEXISTENT/i, { timeout: 5000 });
  143 |             }
  144 |         });
  145 |     }
  146 | 
  147 |     async verifyTemplateNotInTable(name: string) {
  148 |         await test.step(`Verify template "${name}" is NOT in the table`, async () => {
  149 |             await this.page.waitForTimeout(1000);
  150 |             // After deletion + search, page may show empty state (no tbody) OR a table without the name
  151 |             const tbodyCount = await this.tableBody.count();
  152 |             if (tbodyCount > 0) {
  153 |                 await expect(this.tableBody).not.toContainText(name, { timeout: 5000 });
  154 |             } else {
  155 |                 // No tbody means the page is in empty state — template is gone
  156 |                 await expect(this.page.getByText('There are no results for your search. Please, check your selection and try again.')).toBeVisible({ timeout: 5000 });
  157 |             }
  158 |         });
  159 |     }
  160 | 
  161 |     /**
  162 |      * Verifies that title field required error is displayed when trying to save empty template (OVAC-4875).
  163 |      */
  164 |     async verifyTitleRequiredError() {
  165 |         await test.step('Verify title required error is displayed', async () => {
  166 |             const errorHelper = this.page.locator('#draft-name-helper-text, .Mui-error, [role="alert"]').filter({ hasText: /Required field|Campo requerido|form has errors/i }).first();
  167 |             await expect(errorHelper).toBeVisible({ timeout: 10000 });
  168 |         });
  169 |     }
  170 | 
  171 |     /**
  172 |      * Gets pagination text from the templates table (OVAC-4876).
  173 |      */
  174 |     async getPaginationText(): Promise<string> {
  175 |         return await test.step('Get pagination range text', async () => {
  176 |             const paginationEl = this.page.getByText(/\d+\s*-\s*\d+\s+of\s+\d+|\d+\s*-\s*\d+\s+de\s+\d+/i).first();
  177 |             await paginationEl.waitFor({ state: 'visible', timeout: 10000 });
  178 |             return (await paginationEl.innerText()).trim();
  179 |         });
  180 |     }
  181 | 
  182 |     /**
  183 |      * Switches to next pagination page (OVAC-4876).
  184 |      */
  185 |     async clickNextPaginationPage() {
  186 |         await test.step('Click next pagination page', async () => {
  187 |             const nextButton = this.page.getByRole('button', { name: /siguiente|next/i })
  188 |                 .or(this.page.getByRole('button', { name: '2' }))
  189 |                 .or(this.page.locator('nav button:last-child'))
  190 |                 .first();
  191 |             await nextButton.waitFor({ state: 'visible', timeout: 10000 });
> 192 |             await nextButton.click();
      |                              ^ Error: locator.click: Test timeout of 60000ms exceeded.
  193 |             await this.page.waitForTimeout(1000);
  194 |         });
  195 |     }
  196 | 
  197 |     /**
  198 |      * Filters templates by selecting a category/tag from the dropdown (OVAC-4877).
  199 |      */
  200 |     async filterTemplatesByTag() {
  201 |         await test.step('Filter templates by selecting category/tag', async () => {
  202 |             const filterCombo = this.page.getByRole('combobox', { name: /Categories|Categorías|Tags|Etiquetas|Status|Estado/i })
  203 |                 .or(this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /Categories|Categorías|Tags|Status/i }).locator('[role="combobox"], [role="button"], input'))
  204 |                 .first();
  205 |             await filterCombo.waitFor({ state: 'visible', timeout: 10000 });
  206 |             await filterCombo.click({ force: true });
  207 |             await this.page.waitForTimeout(500);
  208 | 
  209 |             const option = this.page.locator('[role="option"], [role="menuitem"], li.MuiMenuItem-root').filter({ hasText: /Consents|Activated|Activado|Activo/i }).first();
  210 |             if (await option.isVisible({ timeout: 3000 }).catch(() => false)) {
  211 |                 await option.click();
  212 |             } else {
  213 |                 await this.page.keyboard.press('Escape');
  214 |             }
  215 |             await this.page.waitForTimeout(500);
  216 |         });
  217 |     }
  218 | 
  219 |     /**
  220 |      * Opens edit drawer for an existing template and updates its name (OVAC-4871).
  221 |      */
  222 |     async editTemplate(oldName: string, newName: string) {
  223 |         await test.step(`Edit template "${oldName}" to "${newName}"`, async () => {
  224 |             await this.searchTemplate(oldName);
  225 |             await this.page.waitForTimeout(1000);
  226 |             const row = this.tableBody.locator('tr', { hasText: oldName }).first();
  227 |             await row.waitFor({ state: 'visible', timeout: 5000 });
  228 | 
  229 |             // Click 3-dots actions menu
  230 |             const menuBtn = row.locator('button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), td:last-child button').first();
  231 |             await menuBtn.click();
  232 |             await this.page.waitForTimeout(500);
  233 | 
  234 |             // Click Edit menu item
  235 |             const editBtn = this.page.getByRole('menuitem', { name: /Edit|Editar/i })
  236 |                 .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
  237 |                 .or(this.page.locator('.cbx-menuItem:has-text("Edit"), .cbx-menuItem:has-text("Editar")'))
  238 |                 .first();
  239 |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  240 |             await editBtn.click();
  241 |             await this.page.waitForTimeout(1000);
  242 | 
  243 |             // Update template name
  244 |             await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
  245 |             await this.templateNameInput.fill(newName);
  246 |             await this.page.waitForTimeout(500);
  247 | 
  248 |             // Click Save / Update / Create button
  249 |             const saveBtn = this.page.getByRole('button', { name: /Save|Guardar|Update|Actualizar|Create|Crear/i })
  250 |                 .or(this.page.locator('#panel-confirm-button-accept, #modal-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")'))
  251 |                 .first();
  252 |             await saveBtn.click();
  253 |             await this.page.waitForTimeout(2000);
  254 |             await this.dismissToastOrModal();
  255 |             await this.navigateToTemplates();
  256 |         });
  257 |     }
  258 | 
  259 |     /**
  260 |      * Verifies new design for Templates heading informations: icon, template name, status, actions menu (OVAC-5179).
  261 |      */
  262 |     async verifyTemplateHeadingInformation() {
  263 |         await test.step('Verify Templates heading informations: icon, template name, status, and actions menu', async () => {
  264 |             await this.dismissToastOrModal();
  265 |             const row = this.tableBody.locator('tr').first();
  266 |             await row.waitFor({ state: 'visible', timeout: 10000 });
  267 | 
  268 |             // Open 3-dots actions menu and click Edit
  269 |             const menuBtn = row.locator('button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), td:last-child button').first();
  270 |             await menuBtn.click();
  271 |             await this.page.waitForTimeout(500);
  272 | 
  273 |             const editBtn = this.page.getByRole('menuitem', { name: /Edit|Editar/i })
  274 |                 .or(this.page.getByRole('button', { name: /Edit|Editar/i }))
  275 |                 .or(this.page.locator('.cbx-menuItem:has-text("Edit"), .cbx-menuItem:has-text("Editar")'))
  276 |                 .first();
  277 |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  278 |             await editBtn.click();
  279 |             await this.page.waitForTimeout(1000);
  280 | 
  281 |             // 1. Validate Template name (heading level 1)
  282 |             const templateTitle = this.page.getByRole('heading', { level: 1 }).first();
  283 |             await expect(templateTitle).toBeVisible({ timeout: 10000 });
  284 | 
  285 |             // 2. Validate Icon in header
  286 |             const headerIcon = this.page.locator('.ri-government-line, .ri-draft-line, .cbx-IconButton, i[class*="ri-"]').first();
  287 |             await expect(headerIcon).toBeVisible({ timeout: 5000 });
  288 | 
  289 |             // 3. Validate Status
  290 |             const statusIndicator = this.page.getByText(/Activated|Activado|Draft|Borrador|Published|Publicado/i).first();
  291 |             await expect(statusIndicator).toBeVisible({ timeout: 5000 });
  292 | 
```