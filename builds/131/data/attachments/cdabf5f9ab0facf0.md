# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> Verify "Type of meetings" filter contains all available appointment types in the appointment list @OVAC-5142 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:577:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for getByRole('dialog').filter({ hasText: /Filters|Filtros/i }).first().getByRole('combobox', { name: /Type of meeting|Tipo de cita/i })

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - generic [aria-hidden] [ref=f2e2]:
    - generic [ref=f2e3]:
      - generic [ref=f2e4]:
        - button [ref=f2e5] [cursor=pointer]:
          - generic [ref=f2e6]: 
        - generic [ref=f2e10]:
          - link [ref=f2e12] [cursor=pointer]:
            - /url: /company/1112/activity/dashboardCouncils
            - button [ref=f2e13]:
              - generic [ref=f2e14]: 
              - generic [ref=f2e16]: Activity
          - link [ref=f2e18] [cursor=pointer]:
            - /url: /company/1112
            - button [ref=f2e19]:
              - generic [ref=f2e20]: 
              - generic [ref=f2e22]: Appointments
          - link [ref=f2e24] [cursor=pointer]:
            - /url: /company/1112/managements
            - button [ref=f2e25]:
              - generic [ref=f2e26]: 
              - generic [ref=f2e28]: Processes
          - link [ref=f2e30] [cursor=pointer]:
            - /url: /company/1112/procedures
            - button [ref=f2e31]:
              - generic [ref=f2e32]: 
              - generic [ref=f2e34]: Procedures
          - link [ref=f2e36] [cursor=pointer]:
            - /url: /company/1112/drafts
            - button [ref=f2e37]:
              - generic [ref=f2e38]: 
              - generic [ref=f2e40]: Templates
          - link [ref=f2e42] [cursor=pointer]:
            - /url: /company/1112/documentation
            - button [ref=f2e43]:
              - generic [ref=f2e44]: 
              - generic [ref=f2e46]: Documents
          - link [ref=f2e48] [cursor=pointer]:
            - /url: /company/1112/entities
            - button [ref=f2e49]:
              - generic [ref=f2e50]: 
              - generic [ref=f2e52]: Entities
          - link [ref=f2e54] [cursor=pointer]:
            - /url: /company/1112/users
            - button [ref=f2e55]:
              - generic [ref=f2e56]: 
              - generic [ref=f2e58]: Users
        - generic [ref=f2e59]: © 2026 v8.8.0
      - generic [ref=f2e64]:
        - banner [ref=f2e65]:
          - button [ref=f2e67] [cursor=pointer]
          - generic [ref=f2e69]: Grupo Castelar Servicios Legales y Financieros S.A
          - generic [ref=f2e75]:
            - button [ref=f2e78] [cursor=pointer]:
              - button [ref=f2e79]:
                - generic [ref=f2e80]: 
            - button [ref=f2e82] [cursor=pointer]:
              - button [ref=f2e84]:
                - generic [ref=f2e85]: 
        - generic [ref=f2e92]:
          - button [ref=f2e95] [cursor=pointer]:
            - generic [ref=f2e96]: 
          - generic [ref=f2e98]:
            - tablist [ref=f2e102]:
              - tab [selected] [ref=f2e103] [cursor=pointer]:
                - paragraph [ref=f2e105]: Video-appointments
              - tab [ref=f2e106] [cursor=pointer]:
                - paragraph [ref=f2e108]: In-person appointments
            - generic [ref=f2e110]:
              - generic [ref=f2e112]:
                - generic [ref=f2e113]:
                  - generic [ref=f2e115]:
                    - generic [ref=f2e118]:
                      - generic [ref=f2e119] [cursor=pointer]:
                        - generic [ref=f2e121]:
                          - generic [ref=f2e122]: 
                          - generic [ref=f2e123]: List view
                        - combobox: "[object Object]"
                      - group [aria-hidden]
                    - generic [ref=f2e129]:
                      - generic [ref=f2e130] [cursor=pointer]:
                        - generic [ref=f2e131]: Confirmed, In progress, Pending report, Completed, In pause
                        - combobox: Confirmed, In progress, Pending report, Completed, In pause
                        - generic [ref=f2e132]: Status
                      - group [aria-hidden]
                    - generic [ref=f2e138]:
                      - generic [ref=f2e139] [cursor=pointer]:
                        - generic [ref=f2e140]: This week
                        - combobox: This week
                        - generic [ref=f2e141]: Period
                      - group [aria-hidden]
                    - button [ref=f2e145] [cursor=pointer]:
                      - generic [ref=f2e146]: 
                  - generic [ref=f2e147]:
                    - generic [ref=f2e148]:
                      - paragraph [ref=f2e149]: Search by participant or record
                      - generic [ref=f2e152]:
                        - button [ref=f2e154] [cursor=pointer]:
                          - generic [ref=f2e155]: 
                        - textbox [ref=f2e156]:
                          - /placeholder: Search
                    - button [ref=f2e157] [cursor=pointer]:
                      - generic [ref=f2e158]: 
                - generic [ref=f2e166]:
                  - table [ref=f2e167]:
                    - rowgroup [ref=f2e168]:
                      - row [ref=f2e169]:
                        - columnheader [ref=f2e170]:
                          - generic [ref=f2e171]: Selection
                        - columnheader [ref=f2e172]:
                          - generic [ref=f2e173]: Date
                          - button [ref=f2e174] [cursor=pointer]:
                            - generic [ref=f2e175]: Date
                            - generic [ref=f2e176]: 
                        - columnheader [ref=f2e178]:
                          - generic [ref=f2e179]: Ref.
                          - button [ref=f2e180] [cursor=pointer]:
                            - generic [ref=f2e181]: Ref.
                            - generic [ref=f2e182]: 
                        - columnheader [ref=f2e184]:
                          - generic [ref=f2e185]: External ID
                          - button [ref=f2e186] [cursor=pointer]:
                            - generic [ref=f2e187]: External ID
                            - generic [ref=f2e188]: 
                        - columnheader [ref=f2e190]:
                          - generic [ref=f2e191]: Record
                          - button [ref=f2e192] [cursor=pointer]:
                            - generic [ref=f2e193]: Record
                            - generic [ref=f2e194]: 
                        - columnheader [ref=f2e196]: Documents
                        - columnheader [ref=f2e197]:
                          - generic [ref=f2e198]: Entity
                          - button [ref=f2e199] [cursor=pointer]:
                            - generic [ref=f2e200]: Entity
                            - generic [ref=f2e201]: 
                        - columnheader [ref=f2e203]:
                          - generic [ref=f2e204]: Status
                          - button [ref=f2e205] [cursor=pointer]:
                            - generic [ref=f2e206]: Status
                            - generic [ref=f2e207]: 
                        - columnheader [ref=f2e209]:
                          - generic [ref=f2e210]: Actions
                          - generic [ref=f2e213]:
                            - generic [ref=f2e214] [cursor=pointer]:
                              - generic [aria-hidden] [ref=f2e216]: 
                              - combobox: "[object Object]"
                            - group [aria-hidden]
                    - rowgroup [ref=f2e218]:
                      - row [ref=f2e219] [cursor=pointer]:
                        - cell [ref=f2e220]:
                          - checkbox [ref=f2e225]
                        - cell [ref=f2e228]:
                          - generic [ref=f2e229]:
                            - generic [ref=f2e230]: 
                            - generic [ref=f2e233]:
                              - generic [ref=f2e234]: 27/11/2026
                              - generic [ref=f2e235]: 10:00
                        - cell [ref=f2e236]: "67907"
                        - cell [ref=f2e237]
                        - cell [ref=f2e238]: "1112111267907202694083"
                        - cell [ref=f2e239]:
                          - button [ref=f2e241]: "0"
                        - cell [ref=f2e242]:
                          - generic [ref=f2e243]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e245]:
                          - generic [ref=f2e246]: Confirmed
                        - cell [ref=f2e253]:
                          - button [ref=f2e256]:
                            - generic [ref=f2e257]: 
                      - row [ref=f2e259] [cursor=pointer]:
                        - cell [ref=f2e260]:
                          - checkbox [ref=f2e265]
                        - cell [ref=f2e268]:
                          - generic [ref=f2e269]:
                            - generic [ref=f2e270]: 
                            - generic [ref=f2e273]:
                              - generic [ref=f2e274]: 27/11/2026
                              - generic [ref=f2e275]: 09:00
                        - cell [ref=f2e276]: "67811"
                        - cell [ref=f2e277]
                        - cell [ref=f2e278]: 111211126781120269bcf2
                        - cell [ref=f2e279]:
                          - button [ref=f2e281]: "3"
                        - cell [ref=f2e282]:
                          - generic [ref=f2e283]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e285]:
                          - generic [ref=f2e286]: Confirmed
                        - cell [ref=f2e293]:
                          - button [ref=f2e296]:
                            - generic [ref=f2e297]: 
                      - row [ref=f2e299] [cursor=pointer]:
                        - cell [ref=f2e300]:
                          - checkbox [ref=f2e305]
                        - cell [ref=f2e308]:
                          - generic [ref=f2e309]:
                            - generic [ref=f2e310]: 
                            - generic [ref=f2e313]:
                              - generic [ref=f2e314]: 26/11/2026
                              - generic [ref=f2e315]: 10:00
                            - generic [ref=f2e316]: 
                        - cell [ref=f2e319]: "67915"
                        - cell [ref=f2e320]
                        - cell [ref=f2e321]: 11121112679152026a147a
                        - cell [ref=f2e322]:
                          - button [ref=f2e324]: "1"
                        - cell [ref=f2e325]:
                          - generic [ref=f2e326]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e328]:
                          - generic [ref=f2e329]: Confirmed
                        - cell [ref=f2e336]:
                          - button [ref=f2e339]:
                            - generic [ref=f2e340]: 
                      - row [ref=f2e342] [cursor=pointer]:
                        - cell [ref=f2e343]:
                          - checkbox [ref=f2e348]
                        - cell [ref=f2e351]:
                          - generic [ref=f2e352]:
                            - generic [ref=f2e353]: 
                            - generic [ref=f2e356]:
                              - generic [ref=f2e357]: 26/11/2026
                              - generic [ref=f2e358]: 10:00
                            - generic [ref=f2e359]: 
                        - cell [ref=f2e362]: "67919"
                        - cell [ref=f2e363]
                        - cell [ref=f2e364]: "1112111267919202659e67"
                        - cell [ref=f2e365]:
                          - button [ref=f2e367]: "1"
                        - cell [ref=f2e368]:
                          - generic [ref=f2e369]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e371]:
                          - generic [ref=f2e372]: Confirmed
                        - cell [ref=f2e379]:
                          - button [ref=f2e382]:
                            - generic [ref=f2e383]: 
                      - row [ref=f2e385] [cursor=pointer]:
                        - cell [ref=f2e386]:
                          - checkbox [ref=f2e391]
                        - cell [ref=f2e394]:
                          - generic [ref=f2e395]:
                            - generic [ref=f2e396]: 
                            - generic [ref=f2e399]:
                              - generic [ref=f2e400]: 26/11/2026
                              - generic [ref=f2e401]: 10:00
                            - generic [ref=f2e402]: 
                        - cell [ref=f2e405]: "67920"
                        - cell [ref=f2e406]
                        - cell [ref=f2e407]: 1112111267920202647e1b
                        - cell [ref=f2e408]:
                          - button [ref=f2e410]: "1"
                        - cell [ref=f2e411]:
                          - generic [ref=f2e412]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e414]:
                          - generic [ref=f2e415]: Confirmed
                        - cell [ref=f2e422]:
                          - button [ref=f2e425]:
                            - generic [ref=f2e426]: 
                      - row [ref=f2e428] [cursor=pointer]:
                        - cell [ref=f2e429]:
                          - checkbox [ref=f2e434]
                        - cell [ref=f2e437]:
                          - generic [ref=f2e438]:
                            - generic [ref=f2e439]: 
                            - generic [ref=f2e442]:
                              - generic [ref=f2e443]: 25/11/2026
                              - generic [ref=f2e444]: 18:00
                            - generic [ref=f2e445]:
                              - generic [ref=f2e446]: 
                              - generic [ref=f2e448]: 
                        - cell [ref=f2e450]: "67917"
                        - cell [ref=f2e451]
                        - cell [ref=f2e452]: 11121112679172026c72ec
                        - cell [ref=f2e453]:
                          - button [ref=f2e455]: "1"
                        - cell [ref=f2e456]:
                          - generic [ref=f2e457]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e459]:
                          - generic [ref=f2e460]: Confirmed
                        - cell [ref=f2e467]:
                          - button [ref=f2e470]:
                            - generic [ref=f2e471]: 
                      - row [ref=f2e473] [cursor=pointer]:
                        - cell [ref=f2e474]:
                          - checkbox [ref=f2e479]
                        - cell [ref=f2e482]:
                          - generic [ref=f2e483]:
                            - generic [ref=f2e484]: 
                            - generic [ref=f2e487]:
                              - generic [ref=f2e488]: 25/11/2026
                              - generic [ref=f2e489]: 13:15
                            - generic [ref=f2e490]: 
                        - cell [ref=f2e493]: "67906"
                        - cell [ref=f2e494]
                        - cell [ref=f2e495]: 11121112679062026d9a31
                        - cell [ref=f2e496]:
                          - button [ref=f2e498]: "1"
                        - cell [ref=f2e500]:
                          - generic [ref=f2e501]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e503]:
                          - generic [ref=f2e504]: Confirmed
                        - cell [ref=f2e511]:
                          - button [ref=f2e514]:
                            - generic [ref=f2e515]: 
                      - row [ref=f2e517] [cursor=pointer]:
                        - cell [ref=f2e518]:
                          - checkbox [ref=f2e523]
                        - cell [ref=f2e526]:
                          - generic [ref=f2e527]:
                            - generic [ref=f2e528]: 
                            - generic [ref=f2e531]:
                              - generic [ref=f2e532]: 25/11/2026
                              - generic [ref=f2e533]: 10:00
                            - generic [ref=f2e534]:
                              - generic [ref=f2e535]: 
                              - generic [ref=f2e537]: 
                        - cell [ref=f2e539]: "67895"
                        - cell [ref=f2e540]
                        - cell [ref=f2e541]: "1112111267895202600714"
                        - cell [ref=f2e542]:
                          - button [ref=f2e544]: "1"
                        - cell [ref=f2e545]:
                          - generic [ref=f2e546]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e548]:
                          - generic [ref=f2e549]: Confirmed
                        - cell [ref=f2e556]:
                          - button [ref=f2e559]:
                            - generic [ref=f2e560]: 
                      - row [ref=f2e562] [cursor=pointer]:
                        - cell [ref=f2e563]:
                          - checkbox [ref=f2e568]
                        - cell [ref=f2e571]:
                          - generic [ref=f2e572]:
                            - generic [ref=f2e573]: 
                            - generic [ref=f2e576]:
                              - generic [ref=f2e577]: 25/11/2026
                              - generic [ref=f2e578]: 10:00
                            - generic [ref=f2e579]:
                              - generic [ref=f2e580]: 
                              - generic [ref=f2e582]: 
                        - cell [ref=f2e584]: "67891"
                        - cell [ref=f2e585]
                        - cell [ref=f2e586]: 11121112678912026c3ff6
                        - cell [ref=f2e587]:
                          - button [ref=f2e589]: "1"
                        - cell [ref=f2e590]:
                          - generic [ref=f2e591]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e593]:
                          - generic [ref=f2e594]: Confirmed
                        - cell [ref=f2e601]:
                          - button [ref=f2e604]:
                            - generic [ref=f2e605]: 
                      - row [ref=f2e607] [cursor=pointer]:
                        - cell [ref=f2e608]:
                          - checkbox [ref=f2e613]
                        - cell [ref=f2e616]:
                          - generic [ref=f2e617]:
                            - generic [ref=f2e618]: 
                            - generic [ref=f2e621]:
                              - generic [ref=f2e622]: 25/11/2026
                              - generic [ref=f2e623]: 10:00
                            - generic [ref=f2e624]:
                              - generic [ref=f2e625]: 
                              - generic [ref=f2e627]: 
                        - cell [ref=f2e629]: "67896"
                        - cell [ref=f2e630]
                        - cell [ref=f2e631]: 11121112678962026c480a
                        - cell [ref=f2e632]:
                          - button [ref=f2e634]: "1"
                        - cell [ref=f2e635]:
                          - generic [ref=f2e636]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e638]:
                          - generic [ref=f2e639]: Confirmed
                        - cell [ref=f2e646]:
                          - button [ref=f2e649]:
                            - generic [ref=f2e650]: 
                      - row [ref=f2e652] [cursor=pointer]:
                        - cell [ref=f2e653]:
                          - checkbox [ref=f2e658]
                        - cell [ref=f2e661]:
                          - generic [ref=f2e662]:
                            - generic [ref=f2e663]: 
                            - generic [ref=f2e666]:
                              - generic [ref=f2e667]: 25/11/2026
                              - generic [ref=f2e668]: 10:00
                            - generic [ref=f2e669]:
                              - generic [ref=f2e670]: 
                              - generic [ref=f2e672]: 
                        - cell [ref=f2e674]: "67889"
                        - cell [ref=f2e675]
                        - cell [ref=f2e676]: "1112111267889202628109"
                        - cell [ref=f2e677]:
                          - button [ref=f2e679]: "1"
                        - cell [ref=f2e680]:
                          - generic [ref=f2e681]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e683]:
                          - generic [ref=f2e684]: Confirmed
                        - cell [ref=f2e691]:
                          - button [ref=f2e694]:
                            - generic [ref=f2e695]: 
                      - row [ref=f2e697] [cursor=pointer]:
                        - cell [ref=f2e698]:
                          - checkbox [ref=f2e703]
                        - cell [ref=f2e706]:
                          - generic [ref=f2e707]:
                            - generic [ref=f2e708]: 
                            - generic [ref=f2e711]:
                              - generic [ref=f2e712]: 25/11/2026
                              - generic [ref=f2e713]: 10:00
                            - generic [ref=f2e714]:
                              - generic [ref=f2e715]: 
                              - generic [ref=f2e717]: 
                        - cell [ref=f2e719]: "67890"
                        - cell [ref=f2e720]
                        - cell [ref=f2e721]: 11121112678902026125a0
                        - cell [ref=f2e722]:
                          - button [ref=f2e724]: "1"
                        - cell [ref=f2e725]:
                          - generic [ref=f2e726]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e728]:
                          - generic [ref=f2e729]: Confirmed
                        - cell [ref=f2e736]:
                          - button [ref=f2e739]:
                            - generic [ref=f2e740]: 
                      - row [ref=f2e742] [cursor=pointer]:
                        - cell [ref=f2e743]:
                          - checkbox [ref=f2e748]
                        - cell [ref=f2e751]:
                          - generic [ref=f2e752]:
                            - generic [ref=f2e753]: 
                            - generic [ref=f2e756]:
                              - generic [ref=f2e757]: 25/11/2026
                              - generic [ref=f2e758]: 10:00
                            - generic [ref=f2e759]:
                              - generic [ref=f2e760]: 
                              - generic [ref=f2e762]: 
                        - cell [ref=f2e764]: "67893"
                        - cell [ref=f2e765]
                        - cell [ref=f2e766]: 11121112678932026bd872
                        - cell [ref=f2e767]:
                          - button [ref=f2e769]: "1"
                        - cell [ref=f2e770]:
                          - generic [ref=f2e771]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e773]:
                          - generic [ref=f2e774]: Confirmed
                        - cell [ref=f2e781]:
                          - button [ref=f2e784]:
                            - generic [ref=f2e785]: 
                      - row [ref=f2e787] [cursor=pointer]:
                        - cell [ref=f2e788]:
                          - checkbox [ref=f2e793]
                        - cell [ref=f2e796]:
                          - generic [ref=f2e797]:
                            - generic [ref=f2e798]: 
                            - generic [ref=f2e801]:
                              - generic [ref=f2e802]: 25/11/2026
                              - generic [ref=f2e803]: 10:00
                            - generic [ref=f2e804]:
                              - generic [ref=f2e805]: 
                              - generic [ref=f2e807]: 
                        - cell [ref=f2e809]: "67894"
                        - cell [ref=f2e810]
                        - cell [ref=f2e811]: 11121112678942026b1daa
                        - cell [ref=f2e812]:
                          - button [ref=f2e814]: "1"
                        - cell [ref=f2e815]:
                          - generic [ref=f2e816]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e818]:
                          - generic [ref=f2e819]: Confirmed
                        - cell [ref=f2e826]:
                          - button [ref=f2e829]:
                            - generic [ref=f2e830]: 
                      - row [ref=f2e832] [cursor=pointer]:
                        - cell [ref=f2e833]:
                          - checkbox [ref=f2e838]
                        - cell [ref=f2e841]:
                          - generic [ref=f2e842]:
                            - generic [ref=f2e843]: 
                            - generic [ref=f2e846]:
                              - generic [ref=f2e847]: 25/11/2026
                              - generic [ref=f2e848]: 10:00
                            - generic [ref=f2e849]:
                              - generic [ref=f2e850]: 
                              - generic [ref=f2e852]: 
                        - cell [ref=f2e854]: "67886"
                        - cell [ref=f2e855]
                        - cell [ref=f2e856]: 11121112678862026592f2
                        - cell [ref=f2e857]:
                          - button [ref=f2e859]: "1"
                        - cell [ref=f2e860]:
                          - generic [ref=f2e861]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e863]:
                          - generic [ref=f2e864]: Confirmed
                        - cell [ref=f2e871]:
                          - button [ref=f2e874]:
                            - generic [ref=f2e875]: 
                      - row [ref=f2e877] [cursor=pointer]:
                        - cell [ref=f2e878]:
                          - checkbox [ref=f2e883]
                        - cell [ref=f2e886]:
                          - generic [ref=f2e887]:
                            - generic [ref=f2e888]: 
                            - generic [ref=f2e891]:
                              - generic [ref=f2e892]: 25/11/2026
                              - generic [ref=f2e893]: 10:00
                            - generic [ref=f2e894]:
                              - generic [ref=f2e895]: 
                              - generic [ref=f2e897]: 
                        - cell [ref=f2e899]: "67885"
                        - cell [ref=f2e900]
                        - cell [ref=f2e901]: 11121112678852026f8476
                        - cell [ref=f2e902]:
                          - button [ref=f2e904]: "1"
                        - cell [ref=f2e905]:
                          - generic [ref=f2e906]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e908]:
                          - generic [ref=f2e909]: Confirmed
                        - cell [ref=f2e916]:
                          - button [ref=f2e919]:
                            - generic [ref=f2e920]: 
                      - row [ref=f2e922] [cursor=pointer]:
                        - cell [ref=f2e923]:
                          - checkbox [ref=f2e928]
                        - cell [ref=f2e931]:
                          - generic [ref=f2e932]:
                            - generic [ref=f2e933]: 
                            - generic [ref=f2e936]:
                              - generic [ref=f2e937]: 25/11/2026
                              - generic [ref=f2e938]: 10:00
                            - generic [ref=f2e939]:
                              - generic [ref=f2e940]: 
                              - generic [ref=f2e942]: 
                        - cell [ref=f2e944]: "67887"
                        - cell [ref=f2e945]
                        - cell [ref=f2e946]: 111211126788720269872c
                        - cell [ref=f2e947]:
                          - button [ref=f2e949]: "1"
                        - cell [ref=f2e950]:
                          - generic [ref=f2e951]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e953]:
                          - generic [ref=f2e954]: Confirmed
                        - cell [ref=f2e961]:
                          - button [ref=f2e964]:
                            - generic [ref=f2e965]: 
                      - row [ref=f2e967] [cursor=pointer]:
                        - cell [ref=f2e968]:
                          - checkbox [ref=f2e973]
                        - cell [ref=f2e976]:
                          - generic [ref=f2e977]:
                            - generic [ref=f2e978]: 
                            - generic [ref=f2e981]:
                              - generic [ref=f2e982]: 25/11/2026
                              - generic [ref=f2e983]: 10:00
                            - generic [ref=f2e984]:
                              - generic [ref=f2e985]: 
                              - generic [ref=f2e987]: 
                        - cell [ref=f2e989]: "67881"
                        - cell [ref=f2e990]
                        - cell [ref=f2e991]: "1112111267881202666177"
                        - cell [ref=f2e992]:
                          - button [ref=f2e994]: "1"
                        - cell [ref=f2e995]:
                          - generic [ref=f2e996]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e998]:
                          - generic [ref=f2e999]: Confirmed
                        - cell [ref=f2e1006]:
                          - button [ref=f2e1009]:
                            - generic [ref=f2e1010]: 
                      - row [ref=f2e1012] [cursor=pointer]:
                        - cell [ref=f2e1013]:
                          - checkbox [ref=f2e1018]
                        - cell [ref=f2e1021]:
                          - generic [ref=f2e1022]:
                            - generic [ref=f2e1023]: 
                            - generic [ref=f2e1026]:
                              - generic [ref=f2e1027]: 25/11/2026
                              - generic [ref=f2e1028]: 10:00
                            - generic [ref=f2e1029]:
                              - generic [ref=f2e1030]: 
                              - generic [ref=f2e1032]: 
                        - cell [ref=f2e1034]: "67884"
                        - cell [ref=f2e1035]
                        - cell [ref=f2e1036]: 1112111267884202664c60
                        - cell [ref=f2e1037]:
                          - button [ref=f2e1039]: "1"
                        - cell [ref=f2e1040]:
                          - generic [ref=f2e1041]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e1043]:
                          - generic [ref=f2e1044]: Confirmed
                        - cell [ref=f2e1051]:
                          - button [ref=f2e1054]:
                            - generic [ref=f2e1055]: 
                      - row [ref=f2e1057] [cursor=pointer]:
                        - cell [ref=f2e1058]:
                          - checkbox [ref=f2e1063]
                        - cell [ref=f2e1066]:
                          - generic [ref=f2e1067]:
                            - generic [ref=f2e1068]: 
                            - generic [ref=f2e1071]:
                              - generic [ref=f2e1072]: 25/11/2026
                              - generic [ref=f2e1073]: 10:00
                            - generic [ref=f2e1074]:
                              - generic [ref=f2e1075]: 
                              - generic [ref=f2e1077]: 
                        - cell [ref=f2e1079]: "67880"
                        - cell [ref=f2e1080]
                        - cell [ref=f2e1081]: 1112111267880202672d19
                        - cell [ref=f2e1082]:
                          - button [ref=f2e1084]: "1"
                        - cell [ref=f2e1085]:
                          - generic [ref=f2e1086]: Grupo Castelar Servicios Legales y Financieros S.A
                        - cell [ref=f2e1088]:
                          - generic [ref=f2e1089]: Confirmed
                        - cell [ref=f2e1096]:
                          - button [ref=f2e1099]:
                            - generic [ref=f2e1100]: 
                  - generic [ref=f2e1102]:
                    - generic [ref=f2e1103]: 1 - 20 of 80
                    - navigation [ref=f2e1106]:
                      - generic [ref=f2e1107]:
                        - button [ref=f2e1108] [cursor=pointer]: "1"
                        - button [ref=f2e1109] [cursor=pointer]: "2"
                        - button [ref=f2e1110] [cursor=pointer]: "3"
                        - button [ref=f2e1111] [cursor=pointer]: "4"
                      - button [ref=f2e1113] [cursor=pointer]:
                        - generic [aria-hidden] [ref=f2e1114]: 
              - generic [ref=f2e1116]:
                - generic [ref=f2e1117] [cursor=pointer]: Legal notice and Terms and conditions of use
                - generic [ref=f2e1118] [cursor=pointer]: Privacy policy
              - generic [ref=f2e1119]:
                - generic [ref=f2e1120]:
                  - generic [ref=f2e1121] [cursor=pointer]: 
                  - generic [ref=f2e1123]: 0 selected
                - generic [ref=f2e1126] [cursor=pointer]:
                  - generic [ref=f2e1128]: 
                  - generic [ref=f2e1129]: SELECT ALL
    - generic [ref=f2e1130]:
      - generic [ref=f2e1134]:
        - generic [ref=f2e1135]: New version OVAC 8.8
        - generic [ref=f2e1136]:
          - generic [ref=f2e1137]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
          - generic [ref=f2e1138]: Review upgrades
      - button [ref=f2e1144] [cursor=pointer]
  - dialog [ref=f2e1148]:
    - generic [ref=f2e1149]:
      - button "Close panel" [active] [ref=f2e1151] [cursor=pointer]:
        - generic [aria-hidden] [ref=f2e1152]: 
      - heading "Filters" [level=1] [ref=f2e1154]
      - button "Clear" [ref=f2e1156] [cursor=pointer]
    - progressbar "Cargando" [ref=f2e1161]
```

# Test source

```ts
  441 |   /**
  442 |    * Searches appointments by participant ID / passport / TIN (XR-2965 / OVAC-5207).
  443 |    */
  444 |   async searchAppointmentsByParticipant(idOrPassport: string) {
  445 |     await test.step(`Search appointments by participant ID/passport: "${idOrPassport}"`, async () => {
  446 |       await this.searchAppointment(idOrPassport);
  447 |       await this.page.waitForTimeout(1000);
  448 |       const rows = this.tableRows;
  449 |       const rowCount = await rows.count();
  450 |       if (rowCount > 0) {
  451 |         await expect(rows.first()).toBeVisible();
  452 |       } else {
  453 |         const noData = this.page.locator('text=/No appointments|No hay citas|No results|No se encontraron/i').first();
  454 |         await expect(noData).toBeVisible({ timeout: 5000 });
  455 |       }
  456 |     });
  457 |   }
  458 | 
  459 |   /**
  460 |    * Opens table filters via the equalizer button and verifies filter options (XR-2565 / OVAC-5194).
  461 |    */
  462 |   async verifyTableFilterOptionsDisplayed() {
  463 |     await test.step('Open table filters via Equalizer button and verify filter categories', async () => {
  464 |       await this.dismissToastOrModal();
  465 |       const eqBtn = this.page.locator('button:has(.ri-equalizer-line)').first();
  466 |       await expect(eqBtn).toBeVisible({ timeout: 10000 });
  467 |       await eqBtn.click();
  468 |       await this.page.waitForTimeout(500);
  469 | 
  470 |       const heading = this.page.getByRole('heading', { name: /Filters|Filtros/i }).first();
  471 |       await expect(heading).toBeVisible({ timeout: 10000 });
  472 | 
  473 |       // Verify filter sections
  474 |       await expect(this.page.getByRole('combobox', { name: /Users|Usuarios/i }).first()).toBeVisible();
  475 |       await expect(this.page.getByRole('combobox', { name: /procedures|trámites/i }).first()).toBeVisible();
  476 |       await expect(this.page.getByRole('combobox', { name: /Entities|Entidades/i }).first()).toBeVisible();
  477 | 
  478 |       // Close filter panel using Escape key
  479 |       await this.page.keyboard.press('Escape');
  480 |       await this.page.waitForTimeout(500);
  481 |     });
  482 |   }
  483 | 
  484 |   /**
  485 |    * Opens Participants drawer from appointment 3-dots menu (XR-2525 / OVAC-5599).
  486 |    */
  487 |   async openParticipantsDrawer(identifier?: string | number) {
  488 |     await test.step('Open Participants drawer from appointment 3-dots menu', async () => {
  489 |       await this.dismissToastOrModal();
  490 |       let targetRow;
  491 |       if (identifier) {
  492 |         targetRow = await this.getAppointmentRow(identifier);
  493 |       } else {
  494 |         targetRow = this.tableRows.first();
  495 |       }
  496 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  497 |       const menuBtn = targetRow.locator('#appointment-menu').or(
  498 |         targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
  499 |       ).first();
  500 |       await menuBtn.click();
  501 |       await this.page.waitForTimeout(500);
  502 | 
  503 |       const partOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
  504 |         .getByText(/^Participants$|^Participantes$/i).first();
  505 |       await partOption.waitFor({ state: 'visible', timeout: 5000 });
  506 |       await partOption.click();
  507 | 
  508 |       // Verify attendees drawer is open
  509 |       const drawer = this.page.locator('.MuiDrawer-root:visible, [role="dialog"]:visible')
  510 |         .filter({ hasText: /List of attendees|Participantes|Attendees/i }).first();
  511 |       await expect(drawer).toBeVisible({ timeout: 15000 });
  512 | 
  513 |       // Close drawer
  514 |       const closeBtn = drawer.locator('button:has(.ri-close-line), button[aria-label*="close" i]').first();
  515 |       if (await closeBtn.isVisible().catch(() => false)) {
  516 |         await closeBtn.click();
  517 |       } else {
  518 |         await this.page.keyboard.press('Escape');
  519 |       }
  520 |       await this.page.waitForTimeout(500);
  521 |     });
  522 |   }
  523 | 
  524 |   /**
  525 |    * Verifies "Type of meetings" filter contains all available appointment types (OVAC-5142).
  526 |    */
  527 |   async verifyMeetingTypesFilterContainsTypes() {
  528 |     await test.step('Verify "Type of meetings" filter contains all available appointment types in the appointment list', async () => {
  529 |       await this.dismissToastOrModal();
  530 |       await this.page.locator('.MuiCircularProgress-root').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  531 |       const eqBtn = this.page.locator('button:has(.ri-equalizer-line)').first();
  532 |       await eqBtn.waitFor({ state: 'visible', timeout: 15000 });
  533 |       await eqBtn.click();
  534 |       await this.page.waitForTimeout(500);
  535 | 
  536 |       const filterDialog = this.page.getByRole('dialog').filter({ hasText: /Filters|Filtros/i }).first();
  537 |       await expect(filterDialog).toBeVisible({ timeout: 10000 });
  538 | 
  539 |       // In the filter drawer, find the combobox for Type of meeting
  540 |       const meetingTypeCombo = filterDialog.getByRole('combobox', { name: /Type of meeting|Tipo de cita/i });
> 541 |       await meetingTypeCombo.waitFor({ state: 'attached', timeout: 5000 });
      |                              ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  542 |       await meetingTypeCombo.evaluate((el: HTMLElement) => {
  543 |         el.scrollIntoView();
  544 |         el.click();
  545 |       });
  546 |       await this.page.waitForTimeout(500);
  547 | 
  548 |       const listbox = this.page.locator('ul[role="listbox"], [role="listbox"]').last();
  549 |       await expect(listbox).toBeVisible({ timeout: 5000 });
  550 | 
  551 |       const options = listbox.locator('[role="option"], li');
  552 |       const count = await options.count();
  553 |       expect(count).toBeGreaterThan(1);
  554 | 
  555 |       await this.page.keyboard.press('Escape');
  556 |       await this.page.waitForTimeout(300);
  557 |       await this.page.keyboard.press('Escape');
  558 |     });
  559 |   }
  560 | 
  561 |   /**
  562 |    * Verifies alert icon is hidden for appointments in Canceled status (OVAC-4937).
  563 |    */
  564 |   async verifyAlertIconHiddenForCanceledAppointments() {
  565 |     await test.step('Verify alert icon is hidden for appointments in Canceled status', async () => {
  566 |       await this.dismissToastOrModal();
  567 |       await this.filterByStatus('Canceled');
  568 |       await this.page.waitForTimeout(1000);
  569 | 
  570 |       const row = this.tableRows.first();
  571 |       await row.waitFor({ state: 'visible', timeout: 15000 });
  572 | 
  573 |       // Verify alert icon is hidden / not displayed in canceled rows
  574 |       const alertIcon = row.locator('.ri-alert-line, .ri-error-warning-line, svg[data-testid*="Warning"], .cbx-table-alert');
  575 |       const count = await alertIcon.count();
  576 |       expect(count).toBe(0);
  577 |     });
  578 |   }
  579 | 
  580 |   /**
  581 |    * Verifies "Send notification" option is present in actions menu in Confirmed status (OVAC-4928).
  582 |    */
  583 |   async verifySendNotificationOptionInActionsMenu(identifier?: string | number) {
  584 |     await test.step('Verify "Send notification" option is present in actions menu in Confirmed status', async () => {
  585 |       await this.dismissToastOrModal();
  586 |       let targetRow;
  587 |       if (identifier) {
  588 |         targetRow = await this.getAppointmentRow(identifier);
  589 |       } else {
  590 |         targetRow = this.tableRows.first();
  591 |       }
  592 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  593 |       const menuBtn = targetRow.locator('#appointment-menu').or(
  594 |         targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
  595 |       ).first();
  596 |       await menuBtn.click();
  597 |       await this.page.waitForTimeout(500);
  598 | 
  599 |       const sendNotifOption = this.page.getByText(/^Send notification$|^Enviar notificación$/i).or(
  600 |         this.page.locator('li, [role="menuitem"], button').filter({ hasText: /Send notification|Enviar notificación/i })
  601 |       ).first();
  602 |       await expect(sendNotifOption).toBeVisible({ timeout: 5000 });
  603 | 
  604 |       await this.page.keyboard.press('Escape');
  605 |     });
  606 |   }
  607 | 
  608 |   /**
  609 |    * Sends an appointment reminder / notification to participant (OVAC-5774).
  610 |    */
  611 |   async sendAppointmentNotification(identifier: string | number, title: string, message: string) {
  612 |     await test.step(`Send appointment notification: "${title}"`, async () => {
  613 |       await this.dismissToastOrModal();
  614 |       const targetRow = await this.getAppointmentRow(identifier);
  615 |       await targetRow.waitFor({ state: 'visible', timeout: 15000 });
  616 | 
  617 |       const menuBtn = targetRow.locator('#appointment-menu').or(
  618 |         targetRow.locator('button:has(.ri-more-2-line), button:has(.ri-more-2-fill), [id^="appointment-menu"]')
  619 |       ).first();
  620 |       await menuBtn.click();
  621 |       await this.page.waitForTimeout(500);
  622 | 
  623 |       const sendNotifOption = this.page.locator('.MuiPopover-root:visible, [role="menu"]:visible')
  624 |         .getByText(/^Send notification$|^Enviar notificación$/i).first();
  625 |       await sendNotifOption.waitFor({ state: 'visible', timeout: 5000 });
  626 |       await sendNotifOption.click();
  627 |       await this.page.waitForTimeout(1000);
  628 | 
  629 |       const modal = this.page.locator('.MuiDialog-root:visible, [role="dialog"]:visible').first();
  630 |       await expect(modal).toBeVisible({ timeout: 10000 });
  631 | 
  632 |       // Fill Title
  633 |       const titleInput = modal.locator('input[type="text"]').or(modal.getByRole('textbox', { name: /Title|Título/i })).first();
  634 |       if (await titleInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  635 |         await titleInput.fill(title);
  636 |       }
  637 | 
  638 |       // Fill Message
  639 |       const messageInput = modal.locator('textarea, [contenteditable="true"]').or(modal.getByRole('textbox', { name: /Message|Mensaje/i })).first();
  640 |       await messageInput.waitFor({ state: 'visible', timeout: 5000 });
  641 |       await messageInput.fill(message);
```