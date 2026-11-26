# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/templates/templatesTests.spec.ts >> Templates - Drafts & Search Tests (Xray Execution 77514) >> The user is able to delete already existing template - Templates @OVAC-4870 @regression
- Location: tests/templates/templatesTests.spec.ts:261:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#add-procedure-button, .MuiFab-root, button:has(.ri-add-line)').first()
    - locator resolved to <button tabindex="0" type="button" id="add-procedure-button" textstyle="[object Object]" aria-label="Floating action button" class="MuiButtonBase-root MuiFab-root MuiFab-primary">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="" class="cbx-LoadingSection-container ppow-cbx-LoadingSection-container">…</div> from <div id="cbx-drawerPanel-id-xnj8gsh" class="cbx-drawerPanel-container qicz-cbx-drawerPanel-container">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <iframe width="100%" height="100%" src="https://whatsnew.councilbox.com/es/version-8-8/"></iframe> from <div id="cbx-drawerPanel-id-xnj8gsh" class="cbx-drawerPanel-container qicz-cbx-drawerPanel-container">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <iframe width="100%" height="100%" src="https://whatsnew.councilbox.com/es/version-8-8/"></iframe> from <div id="cbx-drawerPanel-id-xnj8gsh" class="cbx-drawerPanel-container qicz-cbx-drawerPanel-container">…</div> subtree intercepts pointer events
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - button [ref=e5] [cursor=pointer]:
        - generic [ref=e6]: 
      - generic [ref=e10]:
        - link [ref=e12] [cursor=pointer]:
          - /url: /company/1112/activity/dashboardCouncils
          - button [ref=e13]:
            - generic [ref=e14]: 
            - generic [ref=e16]: Activity
        - link [ref=e18] [cursor=pointer]:
          - /url: /company/1112
          - button [ref=e19]:
            - generic [ref=e20]: 
            - generic [ref=e22]: Appointments
        - link [ref=e24] [cursor=pointer]:
          - /url: /company/1112/managements
          - button [ref=e25]:
            - generic [ref=e26]: 
            - generic [ref=e28]: Processes
        - link [ref=e30] [cursor=pointer]:
          - /url: /company/1112/procedures
          - button [ref=e31]:
            - generic [ref=e32]: 
            - generic [ref=e34]: Procedures
        - link [ref=e36] [cursor=pointer]:
          - /url: /company/1112/drafts
          - button [ref=e37]:
            - generic [ref=e38]: 
            - generic [ref=e40]: Templates
        - link [ref=e42] [cursor=pointer]:
          - /url: /company/1112/documentation
          - button [ref=e43]:
            - generic [ref=e44]: 
            - generic [ref=e46]: Documents
        - link [ref=e48] [cursor=pointer]:
          - /url: /company/1112/entities
          - button [ref=e49]:
            - generic [ref=e50]: 
            - generic [ref=e52]: Entities
        - link [ref=e54] [cursor=pointer]:
          - /url: /company/1112/users
          - button [ref=e55]:
            - generic [ref=e56]: 
            - generic [ref=e58]: Users
      - generic [ref=e59]: © 2026 v8.8.0
    - generic [ref=e64]:
      - banner [ref=e65]:
        - button [ref=e67] [cursor=pointer]
        - generic [ref=e69]: Grupo Castelar Servicios Legales y Financieros S.A
        - generic [ref=e75]:
          - button [ref=e78] [cursor=pointer]:
            - button [ref=e79]:
              - generic [ref=e80]: 
          - button [ref=e82] [cursor=pointer]:
            - button [ref=e84]:
              - generic [ref=e85]: 
      - generic [ref=e93]:
        - tablist [ref=e96]:
          - tab [selected] [ref=e97] [cursor=pointer]:
            - paragraph [ref=e99]: Templates
          - tab [ref=e100] [cursor=pointer]:
            - paragraph [ref=e102]: Tags
        - generic [ref=e106]:
          - generic [ref=e107]:
            - generic [ref=e109]:
              - generic [ref=e113]:
                - combobox [ref=e114]: All
                - generic [ref=e115]: Procedure
                - button [ref=e117] [cursor=pointer]
                - group [aria-hidden]
                - button [ref=e118] [cursor=pointer]:
                  - generic [ref=e119]: 
              - generic [ref=e124]:
                - generic [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]: All
                  - combobox: All
                  - generic [ref=e127]: Status
                - group [aria-hidden]
              - generic [ref=e133]:
                - combobox [ref=e134]: All
                - generic [ref=e135]: Categories
                - button [ref=e137] [cursor=pointer]
                - group [aria-hidden]
                - button [ref=e138] [cursor=pointer]:
                  - generic [ref=e139]: 
            - generic [ref=e141]:
              - generic [ref=e145]:
                - button [ref=e147] [cursor=pointer]:
                  - generic [ref=e148]: 
                - textbox [ref=e149]:
                  - /placeholder: Search templates
              - button [ref=e150] [cursor=pointer]:
                - generic [ref=e151]: 
          - generic [ref=e155]:
            - generic [ref=e156]:
              - table [ref=e157]:
                - rowgroup [ref=e158]:
                  - row [ref=e159]:
                    - columnheader [ref=e160]:
                      - generic [ref=e161]: Name
                      - button [ref=e162] [cursor=pointer]:
                        - generic [ref=e163]: Name
                        - generic [ref=e164]: 
                    - columnheader [ref=e166]: Procedure
                    - columnheader [ref=e167]: Categories
                    - columnheader [ref=e168]:
                      - generic [ref=e169]: Status
                      - button [ref=e170] [cursor=pointer]:
                        - generic [ref=e171]: Status
                        - generic [ref=e172]: 
                    - columnheader [ref=e174]:
                      - generic [ref=e175]: Actions
                - rowgroup [ref=e176]:
                  - row [ref=e177] [cursor=pointer]:
                    - cell [ref=e178]:
                      - generic [ref=e179]:
                        - img [ref=e181]:
                          - paragraph [ref=e182]:
                            - generic [ref=e183]: 
                        - generic [ref=e184]: ALL Intro
                    - cell [ref=e186]:
                      - generic [ref=e187]:
                        - generic [ref=e188]: 19 juni rigid
                        - generic [ref=e191]: and 178 more
                    - cell [ref=e193]:
                      - generic [ref=e194]:
                        - generic [ref=e195]: Introduction
                        - generic [ref=e198]: and 1 more
                    - cell [ref=e200]:
                      - generic [ref=e201]:
                        - generic [ref=e202]: 
                        - generic [ref=e203]: Activated
                    - cell [ref=e204]:
                      - button [ref=e205]:
                        - generic [ref=e206]: 
                  - row [ref=e208] [cursor=pointer]:
                    - cell [ref=e209]:
                      - generic [ref=e210]:
                        - img [ref=e212]:
                          - paragraph [ref=e213]:
                            - generic [ref=e214]: 
                        - generic [ref=e215]: ALL Notification
                    - cell [ref=e217]:
                      - generic [ref=e218]: Asesoría Jurídica y Notarial por Videollamada
                    - cell [ref=e222]:
                      - generic [ref=e223]: Notification header
                    - cell [ref=e227]:
                      - generic [ref=e228]:
                        - generic [ref=e229]: 
                        - generic [ref=e230]: Activated
                    - cell [ref=e231]:
                      - button [ref=e232]:
                        - generic [ref=e233]: 
                  - row [ref=e235] [cursor=pointer]:
                    - cell [ref=e236]:
                      - generic [ref=e237]:
                        - img [ref=e239]:
                          - paragraph [ref=e240]:
                            - generic [ref=e241]: 
                        - generic [ref=e242]: Automation Template 016371
                    - cell [ref=e244]:
                      - generic [ref=e245]:
                        - generic [ref=e246]: 15 Jan 26
                        - generic [ref=e249]: and 209 more
                    - cell [ref=e251]:
                      - generic [ref=e252]: Description of the procedure or appointment
                    - cell [ref=e256]:
                      - generic [ref=e257]:
                        - generic [ref=e258]: 
                        - generic [ref=e259]: Activated
                    - cell [ref=e260]:
                      - button [ref=e261]:
                        - generic [ref=e262]: 
                  - row [ref=e264] [cursor=pointer]:
                    - cell [ref=e265]:
                      - generic [ref=e266]:
                        - img [ref=e268]:
                          - paragraph [ref=e269]:
                            - generic [ref=e270]: 
                        - generic [ref=e271]: Automation Template 024737
                    - cell [ref=e273]:
                      - generic [ref=e274]:
                        - generic [ref=e275]: 15 Jan 26
                        - generic [ref=e278]: and 209 more
                    - cell [ref=e280]:
                      - generic [ref=e281]: Notification
                    - cell [ref=e285]:
                      - generic [ref=e286]:
                        - generic [ref=e287]: 
                        - generic [ref=e288]: Activated
                    - cell [ref=e289]:
                      - button [ref=e290]:
                        - generic [ref=e291]: 
                  - row [ref=e293] [cursor=pointer]:
                    - cell [ref=e294]:
                      - generic [ref=e295]:
                        - img [ref=e297]:
                          - paragraph [ref=e298]:
                            - generic [ref=e299]: 
                        - generic [ref=e300]: Automation Template 025349
                    - cell [ref=e302]:
                      - generic [ref=e303]:
                        - generic [ref=e304]: 15 Jan 26
                        - generic [ref=e307]: and 209 more
                    - cell [ref=e309]:
                      - generic [ref=e310]: Consents
                    - cell [ref=e314]:
                      - generic [ref=e315]:
                        - generic [ref=e316]: 
                        - generic [ref=e317]: Activated
                    - cell [ref=e318]:
                      - button [ref=e319]:
                        - generic [ref=e320]: 
                  - row [ref=e322] [cursor=pointer]:
                    - cell [ref=e323]:
                      - generic [ref=e324]:
                        - img [ref=e326]:
                          - paragraph [ref=e327]:
                            - generic [ref=e328]: 
                        - generic [ref=e329]: Automation Template 052908_EDITED
                    - cell [ref=e331]:
                      - generic [ref=e332]:
                        - generic [ref=e333]: 15 Jan 26
                        - generic [ref=e336]: and 209 more
                    - cell [ref=e338]:
                      - generic [ref=e339]: Description of the procedure or appointment
                    - cell [ref=e343]:
                      - generic [ref=e344]:
                        - generic [ref=e345]: 
                        - generic [ref=e346]: Activated
                    - cell [ref=e347]:
                      - button [ref=e348]:
                        - generic [ref=e349]: 
                  - row [ref=e351] [cursor=pointer]:
                    - cell [ref=e352]:
                      - generic [ref=e353]:
                        - img [ref=e355]:
                          - paragraph [ref=e356]:
                            - generic [ref=e357]: 
                        - generic [ref=e358]: Automation Template 110925
                    - cell [ref=e360]:
                      - generic [ref=e361]:
                        - generic [ref=e362]: 15 Jan 26
                        - generic [ref=e365]: and 209 more
                    - cell [ref=e367]:
                      - generic [ref=e368]: Warning
                    - cell [ref=e372]:
                      - generic [ref=e373]:
                        - generic [ref=e374]: 
                        - generic [ref=e375]: Activated
                    - cell [ref=e376]:
                      - button [ref=e377]:
                        - generic [ref=e378]: 
                  - row [ref=e380] [cursor=pointer]:
                    - cell [ref=e381]:
                      - generic [ref=e382]:
                        - img [ref=e384]:
                          - paragraph [ref=e385]:
                            - generic [ref=e386]: 
                        - generic [ref=e387]: Automation Template 193404
                    - cell [ref=e389]:
                      - generic [ref=e390]:
                        - generic [ref=e391]: 15 Jan 26
                        - generic [ref=e394]: and 209 more
                    - cell [ref=e396]:
                      - generic [ref=e397]: Description of the procedure or appointment
                    - cell [ref=e401]:
                      - generic [ref=e402]:
                        - generic [ref=e403]: 
                        - generic [ref=e404]: Activated
                    - cell [ref=e405]:
                      - button [ref=e406]:
                        - generic [ref=e407]: 
                  - row [ref=e409] [cursor=pointer]:
                    - cell [ref=e410]:
                      - generic [ref=e411]:
                        - img [ref=e413]:
                          - paragraph [ref=e414]:
                            - generic [ref=e415]: 
                        - generic [ref=e416]: Automation Template 206154
                    - cell [ref=e418]:
                      - generic [ref=e419]:
                        - generic [ref=e420]: 15 Jan 26
                        - generic [ref=e423]: and 209 more
                    - cell [ref=e425]:
                      - generic [ref=e426]: Conclusion
                    - cell [ref=e430]:
                      - generic [ref=e431]:
                        - generic [ref=e432]: 
                        - generic [ref=e433]: Activated
                    - cell [ref=e434]:
                      - button [ref=e435]:
                        - generic [ref=e436]: 
                  - row [ref=e438] [cursor=pointer]:
                    - cell [ref=e439]:
                      - generic [ref=e440]:
                        - img [ref=e442]:
                          - paragraph [ref=e443]:
                            - generic [ref=e444]: 
                        - generic [ref=e445]: Automation Template 220187
                    - cell [ref=e447]:
                      - generic [ref=e448]:
                        - generic [ref=e449]: 15 Jan 26
                        - generic [ref=e452]: and 209 more
                    - cell [ref=e454]:
                      - generic [ref=e455]: Description of the procedure or appointment
                    - cell [ref=e459]:
                      - generic [ref=e460]:
                        - generic [ref=e461]: 
                        - generic [ref=e462]: Activated
                    - cell [ref=e463]:
                      - button [ref=e464]:
                        - generic [ref=e465]: 
                  - row [ref=e467] [cursor=pointer]:
                    - cell [ref=e468]:
                      - generic [ref=e469]:
                        - img [ref=e471]:
                          - paragraph [ref=e472]:
                            - generic [ref=e473]: 
                        - generic [ref=e474]: Automation Template 225498
                    - cell [ref=e476]:
                      - generic [ref=e477]:
                        - generic [ref=e478]: 15 Jan 26
                        - generic [ref=e481]: and 209 more
                    - cell [ref=e483]:
                      - generic [ref=e484]: Warning
                    - cell [ref=e488]:
                      - generic [ref=e489]:
                        - generic [ref=e490]: 
                        - generic [ref=e491]: Activated
                    - cell [ref=e492]:
                      - button [ref=e493]:
                        - generic [ref=e494]: 
                  - row [ref=e496] [cursor=pointer]:
                    - cell [ref=e497]:
                      - generic [ref=e498]:
                        - img [ref=e500]:
                          - paragraph [ref=e501]:
                            - generic [ref=e502]: 
                        - generic [ref=e503]: Automation Template 250203
                    - cell [ref=e505]:
                      - generic [ref=e506]:
                        - generic [ref=e507]: 15 Jan 26
                        - generic [ref=e510]: and 209 more
                    - cell [ref=e512]:
                      - generic [ref=e513]: Post-appointment instructions
                    - cell [ref=e517]:
                      - generic [ref=e518]:
                        - generic [ref=e519]: 
                        - generic [ref=e520]: Activated
                    - cell [ref=e521]:
                      - button [ref=e522]:
                        - generic [ref=e523]: 
                  - row [ref=e525] [cursor=pointer]:
                    - cell [ref=e526]:
                      - generic [ref=e527]:
                        - img [ref=e529]:
                          - paragraph [ref=e530]:
                            - generic [ref=e531]: 
                        - generic [ref=e532]: Automation Template 274038
                    - cell [ref=e534]:
                      - generic [ref=e535]:
                        - generic [ref=e536]: 15 Jan 26
                        - generic [ref=e539]: and 209 more
                    - cell [ref=e541]:
                      - generic [ref=e542]: Consents
                    - cell [ref=e546]:
                      - generic [ref=e547]:
                        - generic [ref=e548]: 
                        - generic [ref=e549]: Activated
                    - cell [ref=e550]:
                      - button [ref=e551]:
                        - generic [ref=e552]: 
                  - row [ref=e554] [cursor=pointer]:
                    - cell [ref=e555]:
                      - generic [ref=e556]:
                        - img [ref=e558]:
                          - paragraph [ref=e559]:
                            - generic [ref=e560]: 
                        - generic [ref=e561]: Automation Template 315605
                    - cell [ref=e563]:
                      - generic [ref=e564]:
                        - generic [ref=e565]: 15 Jan 26
                        - generic [ref=e568]: and 208 more
                    - cell [ref=e570]:
                      - generic [ref=e571]: Notification
                    - cell [ref=e575]:
                      - generic [ref=e576]:
                        - generic [ref=e577]: 
                        - generic [ref=e578]: Activated
                    - cell [ref=e579]:
                      - button [ref=e580]:
                        - generic [ref=e581]: 
                  - row [ref=e583] [cursor=pointer]:
                    - cell [ref=e584]:
                      - generic [ref=e585]:
                        - img [ref=e587]:
                          - paragraph [ref=e588]:
                            - generic [ref=e589]: 
                        - generic [ref=e590]: Automation Template 338772
                    - cell [ref=e592]:
                      - generic [ref=e593]:
                        - generic [ref=e594]: 15 Jan 26
                        - generic [ref=e597]: and 209 more
                    - cell [ref=e599]:
                      - generic [ref=e600]: Consents
                    - cell [ref=e604]:
                      - generic [ref=e605]:
                        - generic [ref=e606]: 
                        - generic [ref=e607]: Activated
                    - cell [ref=e608]:
                      - button [ref=e609]:
                        - generic [ref=e610]: 
                  - row [ref=e612] [cursor=pointer]:
                    - cell [ref=e613]:
                      - generic [ref=e614]:
                        - img [ref=e616]:
                          - paragraph [ref=e617]:
                            - generic [ref=e618]: 
                        - generic [ref=e619]: Automation Template 411879
                    - cell [ref=e621]:
                      - generic [ref=e622]:
                        - generic [ref=e623]: 15 Jan 26
                        - generic [ref=e626]: and 209 more
                    - cell [ref=e628]:
                      - generic [ref=e629]: Notification
                    - cell [ref=e633]:
                      - generic [ref=e634]:
                        - generic [ref=e635]: 
                        - generic [ref=e636]: Activated
                    - cell [ref=e637]:
                      - button [ref=e638]:
                        - generic [ref=e639]: 
                  - row [ref=e641] [cursor=pointer]:
                    - cell [ref=e642]:
                      - generic [ref=e643]:
                        - img [ref=e645]:
                          - paragraph [ref=e646]:
                            - generic [ref=e647]: 
                        - generic [ref=e648]: Automation Template 544179
                    - cell [ref=e650]:
                      - generic [ref=e651]:
                        - generic [ref=e652]: 15 Jan 26
                        - generic [ref=e655]: and 207 more
                    - cell [ref=e657]:
                      - generic [ref=e658]: Conclusion
                    - cell [ref=e662]:
                      - generic [ref=e663]:
                        - generic [ref=e664]: 
                        - generic [ref=e665]: Activated
                    - cell [ref=e666]:
                      - button [ref=e667]:
                        - generic [ref=e668]: 
                  - row [ref=e670] [cursor=pointer]:
                    - cell [ref=e671]:
                      - generic [ref=e672]:
                        - img [ref=e674]:
                          - paragraph [ref=e675]:
                            - generic [ref=e676]: 
                        - generic [ref=e677]: Automation Template 611126
                    - cell [ref=e679]:
                      - generic [ref=e680]:
                        - generic [ref=e681]: 15 Jan 26
                        - generic [ref=e684]: and 208 more
                    - cell [ref=e686]:
                      - generic [ref=e687]: Notification
                    - cell [ref=e691]:
                      - generic [ref=e692]:
                        - generic [ref=e693]: 
                        - generic [ref=e694]: Activated
                    - cell [ref=e695]:
                      - button [ref=e696]:
                        - generic [ref=e697]: 
                  - row [ref=e699] [cursor=pointer]:
                    - cell [ref=e700]:
                      - generic [ref=e701]:
                        - img [ref=e703]:
                          - paragraph [ref=e704]:
                            - generic [ref=e705]: 
                        - generic [ref=e706]: Automation Template 660462
                    - cell [ref=e708]:
                      - generic [ref=e709]:
                        - generic [ref=e710]: 15 Jan 26
                        - generic [ref=e713]: and 207 more
                    - cell [ref=e715]:
                      - generic [ref=e716]: Post-appointment instructions
                    - cell [ref=e720]:
                      - generic [ref=e721]:
                        - generic [ref=e722]: 
                        - generic [ref=e723]: Activated
                    - cell [ref=e724]:
                      - button [ref=e725]:
                        - generic [ref=e726]: 
                  - row [ref=e728] [cursor=pointer]:
                    - cell [ref=e729]:
                      - generic [ref=e730]:
                        - img [ref=e732]:
                          - paragraph [ref=e733]:
                            - generic [ref=e734]: 
                        - generic [ref=e735]: Automation Template 674827
                    - cell [ref=e737]:
                      - generic [ref=e738]:
                        - generic [ref=e739]: 15 Jan 26
                        - generic [ref=e742]: and 209 more
                    - cell [ref=e744]:
                      - generic [ref=e745]: Post-appointment instructions
                    - cell [ref=e749]:
                      - generic [ref=e750]:
                        - generic [ref=e751]: 
                        - generic [ref=e752]: Activated
                    - cell [ref=e753]:
                      - button [ref=e754]:
                        - generic [ref=e755]: 
                  - row [ref=e757] [cursor=pointer]:
                    - cell [ref=e758]:
                      - generic [ref=e759]:
                        - img [ref=e761]:
                          - paragraph [ref=e762]:
                            - generic [ref=e763]: 
                        - generic [ref=e764]: Automation Template 681720
                    - cell [ref=e766]:
                      - generic [ref=e767]:
                        - generic [ref=e768]: 15 Jan 26
                        - generic [ref=e771]: and 209 more
                    - cell [ref=e773]:
                      - generic [ref=e774]: Notification
                    - cell [ref=e778]:
                      - generic [ref=e779]:
                        - generic [ref=e780]: 
                        - generic [ref=e781]: Activated
                    - cell [ref=e782]:
                      - button [ref=e783]:
                        - generic [ref=e784]: 
                  - row [ref=e786] [cursor=pointer]:
                    - cell [ref=e787]:
                      - generic [ref=e788]:
                        - img [ref=e790]:
                          - paragraph [ref=e791]:
                            - generic [ref=e792]: 
                        - generic [ref=e793]: Automation Template 755886
                    - cell [ref=e795]:
                      - generic [ref=e796]:
                        - generic [ref=e797]: 15 Jan 26
                        - generic [ref=e800]: and 209 more
                    - cell [ref=e802]:
                      - generic [ref=e803]: Description of the procedure or appointment
                    - cell [ref=e807]:
                      - generic [ref=e808]:
                        - generic [ref=e809]: 
                        - generic [ref=e810]: Activated
                    - cell [ref=e811]:
                      - button [ref=e812]:
                        - generic [ref=e813]: 
                  - row [ref=e815] [cursor=pointer]:
                    - cell [ref=e816]:
                      - generic [ref=e817]:
                        - img [ref=e819]:
                          - paragraph [ref=e820]:
                            - generic [ref=e821]: 
                        - generic [ref=e822]: Automation Template 847350
                    - cell [ref=e824]:
                      - generic [ref=e825]:
                        - generic [ref=e826]: 15 Jan 26
                        - generic [ref=e829]: and 209 more
                    - cell [ref=e831]:
                      - generic [ref=e832]: Description of the procedure or appointment
                    - cell [ref=e836]:
                      - generic [ref=e837]:
                        - generic [ref=e838]: 
                        - generic [ref=e839]: Activated
                    - cell [ref=e840]:
                      - button [ref=e841]:
                        - generic [ref=e842]: 
                  - row [ref=e844] [cursor=pointer]:
                    - cell [ref=e845]:
                      - generic [ref=e846]:
                        - img [ref=e848]:
                          - paragraph [ref=e849]:
                            - generic [ref=e850]: 
                        - generic [ref=e851]: Automation Template 872927
                    - cell [ref=e853]:
                      - generic [ref=e854]:
                        - generic [ref=e855]: 15 Jan 26
                        - generic [ref=e858]: and 207 more
                    - cell [ref=e860]:
                      - generic [ref=e861]: Consents
                    - cell [ref=e865]:
                      - generic [ref=e866]:
                        - generic [ref=e867]: 
                        - generic [ref=e868]: Activated
                    - cell [ref=e869]:
                      - button [ref=e870]:
                        - generic [ref=e871]: 
                  - row [ref=e873] [cursor=pointer]:
                    - cell [ref=e874]:
                      - generic [ref=e875]:
                        - img [ref=e877]:
                          - paragraph [ref=e878]:
                            - generic [ref=e879]: 
                        - generic [ref=e880]: Automation Template 909839
                    - cell [ref=e882]:
                      - generic [ref=e883]:
                        - generic [ref=e884]: 15 Jan 26
                        - generic [ref=e887]: and 207 more
                    - cell [ref=e889]:
                      - generic [ref=e890]: Conclusion
                    - cell [ref=e894]:
                      - generic [ref=e895]:
                        - generic [ref=e896]: 
                        - generic [ref=e897]: Activated
                    - cell [ref=e898]:
                      - button [ref=e899]:
                        - generic [ref=e900]: 
              - generic [ref=e902]:
                - generic [ref=e903]: 1 - 25 of 55
                - navigation [ref=e906]:
                  - generic [ref=e907]:
                    - button [ref=e908] [cursor=pointer]: "1"
                    - button [ref=e909] [cursor=pointer]: "2"
                    - button [ref=e910] [cursor=pointer]: "3"
                  - button [ref=e912] [cursor=pointer]:
                    - generic [aria-hidden] [ref=e913]: 
            - button [ref=e915] [cursor=pointer]:
              - generic [ref=e916]: 
        - generic [ref=e919]:
          - generic [ref=e920] [cursor=pointer]: Legal notice and Terms and conditions of use
          - generic [ref=e921] [cursor=pointer]: Privacy policy
  - dialog [ref=e922]:
    - generic [ref=e923]:
      - button "Close panel" [active] [ref=e925] [cursor=pointer]:
        - generic [aria-hidden] [ref=e926]: 
      - heading "What’s new" [level=1] [ref=e928]
    - iframe [ref=e931]:
      - generic [ref=f5e1]:
        - link "Saltar al contenido" [ref=f5e2] [cursor=pointer]:
          - /url: "#wp--skip-link--target"
        - generic [ref=f5e3]:
          - banner [ref=f5e4]:
            - generic [ref=f5e10]:
              - link [ref=f5e12] [cursor=pointer]:
                - /url: https://whatsnew.councilbox.com/es/
                - img "councilbox" [ref=f5e13]
              - heading [level=1] [ref=f5e15]:
                - link "| Novedades de producto" [ref=f5e16] [cursor=pointer]:
                  - /url: https://whatsnew.councilbox.com/es/
          - main [ref=f5e17]:
            - heading "Page Not Found." [level=1] [ref=f5e19]
            - paragraph [ref=f5e20]: The page you are looking for does not exist, or it has been moved. Please try searching using the form below.
            - link "Homepage" [ref=f5e23] [cursor=pointer]:
              - /url: /
          - contentinfo [ref=f5e25]:
            - generic [ref=f5e28]:
              - paragraph
              - paragraph [ref=f5e29]: Buscar
              - search [ref=f5e30]:
                - generic [ref=f5e31]: Search
                - generic [ref=f5e32]:
                  - searchbox "Search" [ref=f5e33]
                  - button "Buscar" [ref=f5e34] [cursor=pointer]
        - navigation "Selector de idiomas" [ref=f5e36]:
          - list [ref=f5e37]:
            - listitem [ref=f5e38]:
              - link "Cambiar a English (Inglés)" [ref=f5e39] [cursor=pointer]:
                - /url: https://whatsnew.councilbox.com/en/
                - text: English
                - generic [ref=f5e40]: (Inglés)
            - listitem [ref=f5e41]:
              - link "Cambiar a Italiano" [ref=f5e42] [cursor=pointer]:
                - /url: https://whatsnew.councilbox.com/it/
                - text: Italiano
            - listitem [ref=f5e43]:
              - link "Cambiar a Español" [ref=f5e44] [cursor=pointer]:
                - /url: https://whatsnew.councilbox.com/es/
                - text: Español
```

# Test source

```ts
  1   | import { Page, Locator, expect, test } from '@playwright/test';
  2   | import { BasePage } from '../BasePage';
  3   | import { MESSAGES } from '../../utils/Constants';
  4   | 
  5   | export interface TemplateData {
  6   |     name: string;
  7   |     content: string;
  8   |     type: string;
  9   | }
  10  | 
  11  | export class TemplatesPage extends BasePage {
  12  |     // Action buttons
  13  |     readonly createButton: Locator;
  14  | 
  15  |     // Form fields
  16  |     readonly templateNameInput: Locator;
  17  |     readonly contentEditor: Locator;
  18  | 
  19  |     // Search & Table
  20  |     readonly searchInput: Locator;
  21  |     readonly tableBody: Locator;
  22  | 
  23  |     // Alerts
  24  |     readonly alertMessage: Locator;
  25  | 
  26  |     // Delete
  27  |     readonly deleteButton: Locator;
  28  |     readonly confirmDeleteButton: Locator;
  29  | 
  30  |     constructor(page: Page) {
  31  |         super(page);
  32  |         this.createButton = page.getByRole('button', { name: /Create|Crear/i })
  33  |             .or(page.locator('#panel-confirm-button-accept, #modal-button-accept, button:has-text("CREATE"), button:has-text("CREAR")'))
  34  |             .first();
  35  |         this.templateNameInput = page.getByRole('textbox', { name: /Title|Título/i })
  36  |             .or(page.locator('#draft-name, input[name="name"], input[name="title"]'))
  37  |             .first();
  38  |         this.contentEditor = page.locator('#draft-editor-text div, [contenteditable="true"], .ql-editor, .ProseMirror, #draft-editor-text').first();
  39  |         this.searchInput = page.getByRole('textbox', { name: /Search templates|Search by participant or record|Buscar/i })
  40  |             .or(page.getByPlaceholder(/Search templates|Buscar plantillas|Search|Buscar/i))
  41  |             .or(page.locator('input[placeholder*="Search" i], input[placeholder*="Buscar" i]'))
  42  |             .first();
  43  |         this.tableBody = page.locator('tbody');
  44  |         this.alertMessage = page.getByRole('alert');
  45  |         this.deleteButton = page.getByRole('button', { name: /Delete|Eliminar/i })
  46  |             .or(page.locator('[role="menuitem"]').filter({ hasText: /Delete|Eliminar/i }))
  47  |             .first();
  48  |         this.confirmDeleteButton = page.locator('#panel-confirm-button-accept, #modal-button-accept')
  49  |             .or(page.getByRole('dialog').getByRole('button', { name: /Delete|Eliminar|Accept|Aceptar/i }))
  50  |             .first();
  51  |     }
  52  | 
  53  |     async openCreateTemplateForm() {
  54  |         await test.step('Open create template form', async () => {
  55  |             await this.dismissToastOrModal();
  56  |             const fabButton = this.page.locator('#add-procedure-button, .MuiFab-root, button:has(.ri-add-line)').first();
  57  |             await fabButton.waitFor({ state: 'visible', timeout: 10000 });
> 58  |             await fabButton.click();
      |                             ^ Error: locator.click: Test timeout of 60000ms exceeded.
  59  |         });
  60  |     }
  61  | 
  62  |     async fillTemplateDetails(data: TemplateData) {
  63  |         await test.step(`Fill template details: ${data.name}`, async () => {
  64  |             await this.dismissToastOrModal();
  65  |             await this.templateNameInput.waitFor({ state: 'visible', timeout: 10000 });
  66  |             await this.templateNameInput.fill(data.name);
  67  | 
  68  |             if (await this.contentEditor.isVisible({ timeout: 2000 }).catch(() => false)) {
  69  |                 await this.contentEditor.click();
  70  |                 await this.page.keyboard.type(data.content);
  71  |             }
  72  | 
  73  |             // Select template category/type
  74  |             const typeOption = this.page.locator('button, [role="button"]').filter({ hasText: new RegExp(data.type, 'i') }).first();
  75  |             if (await typeOption.isVisible({ timeout: 3000 }).catch(() => false)) {
  76  |                 await typeOption.click({ force: true });
  77  |             }
  78  |         });
  79  |     }
  80  | 
  81  |     async submitCreateForm() {
  82  |         await test.step('Submit create form and wait for drawer to close', async () => {
  83  |             await this.createButton.click();
  84  |             await this.page.waitForURL(/\/drafts$/i, { timeout: 10000 }).catch(() => {});
  85  |             await this.dismissToastOrModal();
  86  |         });
  87  |     }
  88  | 
  89  |     async createTemplate(data: TemplateData) {
  90  |         await test.step(`Create template: ${data.name}`, async () => {
  91  |             await this.openCreateTemplateForm();
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
```