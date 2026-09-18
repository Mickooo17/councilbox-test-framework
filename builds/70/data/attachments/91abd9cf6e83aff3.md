# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Create Institution Tests >> should create a new institution and verify it appears in the list @smoke @regression
- Location: tests/institutions/institutionsTests.spec.ts:23:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('a[href*="/companies"]').or(getByRole('button', { name: /Entities|Institutions|Entidades|Instituciones/i })).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]: 
    - generic [ref=e11]:
      - link [ref=e13] [cursor=pointer]:
        - /url: /company/1112/professionalActivity
        - button " Activity" [ref=e14]:
          - generic [ref=e15]: 
          - generic [ref=e17]: Activity
      - link [ref=e19] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=e20]:
          - generic [ref=e21]: 
          - generic [ref=e23]: Appointments
      - link [ref=e25] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=e26]:
          - generic [ref=e27]: 
          - generic [ref=e29]: Processes
      - link [ref=e31] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=e32]:
          - generic [ref=e33]: 
          - generic [ref=e35]: Procedures
      - link [ref=e37] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=e38]:
          - generic [ref=e39]: 
          - generic [ref=e41]: Templates
      - link [ref=e43] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=e44]:
          - generic [ref=e45]: 
          - generic [ref=e47]: Documents
    - generic [ref=e49]:
      - img "CBX white Logo" [ref=e50]
      - generic [ref=e51]: © 2026 v8.6.6
  - generic [ref=e53]:
    - banner [ref=e54]:
      - img "logo" [ref=e57] [cursor=pointer]
      - generic [ref=e58]: QA DEV
      - generic [ref=e64]:
        - button "" [ref=e68] [cursor=pointer]
        - button "Actions Button" [ref=e74] [cursor=pointer]:
          - generic [ref=e77]:
            - img "logo" [ref=e79]
            - generic [ref=e80]: 
    - generic [ref=e82]:
      - button "Actions Button" [ref=e85] [cursor=pointer]:
        - generic [ref=e86]: 
      - generic [ref=e89]:
        - generic [ref=e93]:
          - button "Icon Button" [ref=e94] [cursor=pointer]:
            - paragraph [ref=e96]: Video-appointments
          - button "Icon Button" [ref=e98] [cursor=pointer]:
            - paragraph [ref=e100]: In-person appointments
        - generic [ref=e103]:
          - generic [ref=e105]:
            - generic [ref=e106]:
              - generic [ref=e108]:
                - generic [ref=e111]:
                  - generic [ref=e112] [cursor=pointer]:
                    - generic [ref=e114]:
                      - generic [ref=e115]: 
                      - generic [ref=e116]: List view
                    - textbox "Input":
                      - /placeholder: ""
                      - text: "[object Object]"
                  - group "Input fieldset"
                - generic [ref=e120]:
                  - generic [ref=e121]: Status
                  - generic [ref=e122]:
                    - button "Confirmed, In progress, Pending report, Completed, In pause" [ref=e123] [cursor=pointer]
                    - textbox [aria-hidden]: confirmed,room_opened,act_pending,complete,paused
                - generic [ref=e125]:
                  - generic [ref=e126]: Period
                  - generic [ref=e127]:
                    - button "This week" [ref=e128] [cursor=pointer]
                    - textbox [aria-hidden]: week
                - button "Icon Button" [ref=e130] [cursor=pointer]:
                  - generic [ref=e131]: 
              - generic [ref=e133]:
                - generic [ref=e134]:
                  - paragraph [ref=e135]: Search by participant or record
                  - generic [ref=e138]:
                    - button "Icon Button" [ref=e140] [cursor=pointer]:
                      - generic [ref=e141]: 
                    - textbox "Search" [ref=e143]
                - button "Icon Button" [ref=e144] [cursor=pointer]:
                  - generic [ref=e145]: 
            - generic [ref=e148]:
              - generic [ref=e154]:
                - table [ref=e155]:
                  - rowgroup [ref=e156]:
                    - row [ref=e157]:
                      - columnheader "Date " [ref=e158]:
                        - generic [ref=e159] [cursor=pointer]:
                          - generic [ref=e160]: Date
                          - generic [ref=e161]: 
                      - columnheader "Ref. " [ref=e163]:
                        - generic [ref=e164] [cursor=pointer]:
                          - generic [ref=e165]: Ref.
                          - generic [ref=e166]: 
                      - columnheader "Attendees" [ref=e168]
                      - columnheader "Procedure " [ref=e169]:
                        - generic [ref=e170] [cursor=pointer]:
                          - generic [ref=e171]: Procedure
                          - generic [ref=e172]: 
                      - columnheader "Documents" [ref=e174]
                      - columnheader "Assigned agent" [ref=e175]
                      - columnheader "Entity " [ref=e176]:
                        - generic [ref=e177] [cursor=pointer]:
                          - generic [ref=e178]: Entity
                          - generic [ref=e179]: 
                      - columnheader "Status " [ref=e181]:
                        - generic [ref=e182] [cursor=pointer]:
                          - generic [ref=e183]: Status
                          - generic [ref=e184]: 
                      - columnheader "Actions" [ref=e186]
                      - columnheader [ref=e187]:
                        - generic [ref=e189]:
                          - button "" [ref=e190] [cursor=pointer]
                          - textbox [aria-hidden]: date,reference_short,census_type_assistants,procedure,documents,assigned_agent,entity,state,actions
                  - rowgroup [ref=e192]:
                    - row [ref=e193] [cursor=pointer]:
                      - cell " 19/09/2026 10:00 " [ref=e194]:
                        - generic [ref=e195]:
                          - generic [ref=e196]: 
                          - generic [ref=e199]:
                            - generic [ref=e200]: 19/09/2026
                            - generic [ref=e201]: 10:00
                          - generic [ref=e202]: 
                      - cell "66891" [ref=e205]
                      - cell "Ammar Micijevic" [ref=e206]
                      - cell "ALL in ONE" [ref=e211]
                      - cell "5" [ref=e216]
                      - cell " Not assigned" [ref=e219]:
                        - generic [ref=e220]:
                          - generic [ref=e221]: 
                          - generic [ref=e223]: Not assigned
                      - cell "QA DEV" [ref=e226]
                      - cell "Confirmed" [ref=e229]
                      - cell [ref=e237]:
                        - generic [ref=e239]:
                          - button [disabled]
                          - button "Open" [ref=e241]
                      - cell [ref=e244]:
                        - button "" [ref=e247]
                    - row [ref=e250] [cursor=pointer]:
                      - cell " 19/09/2026 10:00 " [ref=e251]:
                        - generic [ref=e252]:
                          - generic [ref=e253]: 
                          - generic [ref=e256]:
                            - generic [ref=e257]: 19/09/2026
                            - generic [ref=e258]: 10:00
                          - generic [ref=e259]: 
                      - cell "66898" [ref=e262]
                      - cell "Ammar Micijevic" [ref=e263]
                      - cell "ALL in ONE" [ref=e268]
                      - cell "5" [ref=e273]
                      - cell " Not assigned" [ref=e276]:
                        - generic [ref=e277]:
                          - generic [ref=e278]: 
                          - generic [ref=e280]: Not assigned
                      - cell "QA DEV" [ref=e283]
                      - cell "Confirmed" [ref=e286]
                      - cell [ref=e294]:
                        - generic [ref=e296]:
                          - button [disabled]
                          - button "Open" [ref=e298]
                      - cell [ref=e301]:
                        - button "" [ref=e304]
                    - row [ref=e307] [cursor=pointer]:
                      - cell " 19/09/2026 10:00 " [ref=e308]:
                        - generic [ref=e309]:
                          - generic [ref=e310]: 
                          - generic [ref=e313]:
                            - generic [ref=e314]: 19/09/2026
                            - generic [ref=e315]: 10:00
                          - generic [ref=e316]: 
                      - cell "66893" [ref=e319]
                      - cell "Ammar Micijevic" [ref=e320]
                      - cell "ALL in ONE" [ref=e325]
                      - cell "5" [ref=e330]
                      - cell " Not assigned" [ref=e333]:
                        - generic [ref=e334]:
                          - generic [ref=e335]: 
                          - generic [ref=e337]: Not assigned
                      - cell "QA DEV" [ref=e340]
                      - cell "Confirmed" [ref=e343]
                      - cell [ref=e351]:
                        - generic [ref=e353]:
                          - button [disabled]
                          - button "Open" [ref=e355]
                      - cell [ref=e358]:
                        - button "" [ref=e361]
                    - row [ref=e364] [cursor=pointer]:
                      - cell " 18/09/2026 12:00  " [ref=e365]:
                        - generic [ref=e366]:
                          - generic [ref=e367]: 
                          - generic [ref=e370]:
                            - generic [ref=e371]: 18/09/2026
                            - generic [ref=e372]: 12:00
                          - generic [ref=e373]:
                            - generic [ref=e374]: 
                            - generic [ref=e376]: 
                      - cell "66892" [ref=e378]
                      - cell "Ammar Micijevic" [ref=e379]
                      - cell "ALL in ONE" [ref=e384]
                      - cell "5" [ref=e389]
                      - cell " Not assigned" [ref=e392]:
                        - generic [ref=e393]:
                          - generic [ref=e394]: 
                          - generic [ref=e396]: Not assigned
                      - cell "QA DEV" [ref=e399]
                      - cell "Confirmed" [ref=e402]
                      - cell [ref=e410]:
                        - generic [ref=e412]:
                          - button [disabled]
                          - button "Open" [ref=e414]
                      - cell [ref=e417]:
                        - button "" [ref=e420]
                    - row [ref=e423] [cursor=pointer]:
                      - cell " 18/09/2026 10:00  " [ref=e424]:
                        - generic [ref=e425]:
                          - generic [ref=e426]: 
                          - generic [ref=e429]:
                            - generic [ref=e430]: 18/09/2026
                            - generic [ref=e431]: 10:00
                          - generic [ref=e432]:
                            - generic [ref=e433]: 
                            - generic [ref=e435]: 
                      - cell "66871" [ref=e437]
                      - cell "Ammar Micijevic" [ref=e438]
                      - cell "ALL in ONE" [ref=e443]
                      - cell "5" [ref=e448]
                      - cell " Not assigned" [ref=e451]:
                        - generic [ref=e452]:
                          - generic [ref=e453]: 
                          - generic [ref=e455]: Not assigned
                      - cell "QA DEV" [ref=e458]
                      - cell "Confirmed" [ref=e461]
                      - cell [ref=e469]:
                        - generic [ref=e471]:
                          - button [disabled]
                          - button "Open" [ref=e473]
                      - cell [ref=e476]:
                        - button "" [ref=e479]
                    - row [ref=e482] [cursor=pointer]:
                      - cell " 18/09/2026 10:00  " [ref=e483]:
                        - generic [ref=e484]:
                          - generic [ref=e485]: 
                          - generic [ref=e488]:
                            - generic [ref=e489]: 18/09/2026
                            - generic [ref=e490]: 10:00
                          - generic [ref=e491]:
                            - generic [ref=e492]: 
                            - generic [ref=e494]: 
                      - cell "66874" [ref=e496]
                      - cell "Ammar Micijevic" [ref=e497]
                      - cell "ALL in ONE" [ref=e502]
                      - cell "5" [ref=e507]
                      - cell " Not assigned" [ref=e510]:
                        - generic [ref=e511]:
                          - generic [ref=e512]: 
                          - generic [ref=e514]: Not assigned
                      - cell "QA DEV" [ref=e517]
                      - cell "Confirmed" [ref=e520]
                      - cell [ref=e528]:
                        - generic [ref=e530]:
                          - button [disabled]
                          - button "Open" [ref=e532]
                      - cell [ref=e535]:
                        - button "" [ref=e538]
                    - row [ref=e541] [cursor=pointer]:
                      - cell " 17/09/2026 13:00  " [ref=e542]:
                        - generic [ref=e543]:
                          - generic [ref=e544]: 
                          - generic [ref=e547]:
                            - generic [ref=e548]: 17/09/2026
                            - generic [ref=e549]: 13:00
                          - generic [ref=e550]:
                            - generic [ref=e551]: 
                            - generic [ref=e553]: 
                      - cell "66873" [ref=e555]
                      - cell "Ammar Micijevic" [ref=e556]
                      - cell "ALL in ONE" [ref=e561]
                      - cell "5" [ref=e566]
                      - cell " Not assigned" [ref=e569]:
                        - generic [ref=e570]:
                          - generic [ref=e571]: 
                          - generic [ref=e573]: Not assigned
                      - cell "QA DEV" [ref=e576]
                      - cell "Confirmed" [ref=e579]
                      - cell [ref=e587]:
                        - generic [ref=e589]:
                          - button [disabled]
                          - button "Open" [ref=e591]
                      - cell [ref=e594]:
                        - button "" [ref=e597]
                    - row [ref=e600] [cursor=pointer]:
                      - cell " 17/09/2026 10:00  " [ref=e601]:
                        - generic [ref=e602]:
                          - generic [ref=e603]: 
                          - generic [ref=e606]:
                            - generic [ref=e607]: 17/09/2026
                            - generic [ref=e608]: 10:00
                          - generic [ref=e609]:
                            - generic [ref=e610]: 
                            - generic [ref=e612]: 
                      - cell "66867" [ref=e614]
                      - cell "Ammar Micijevic" [ref=e615]
                      - cell "ALL in ONE" [ref=e620]
                      - cell "5" [ref=e625]
                      - cell " Not assigned" [ref=e628]:
                        - generic [ref=e629]:
                          - generic [ref=e630]: 
                          - generic [ref=e632]: Not assigned
                      - cell "QA DEV" [ref=e635]
                      - cell "Confirmed" [ref=e638]
                      - cell [ref=e646]:
                        - generic [ref=e648]:
                          - button [disabled]
                          - button "Open" [ref=e650]
                      - cell [ref=e653]:
                        - button "" [ref=e656]
                    - row [ref=e659] [cursor=pointer]:
                      - cell " 17/09/2026 10:00  " [ref=e660]:
                        - generic [ref=e661]:
                          - generic [ref=e662]: 
                          - generic [ref=e665]:
                            - generic [ref=e666]: 17/09/2026
                            - generic [ref=e667]: 10:00
                          - generic [ref=e668]:
                            - generic [ref=e669]: 
                            - generic [ref=e671]: 
                      - cell "66869" [ref=e673]
                      - cell "Ammar Micijevic" [ref=e674]
                      - cell "ALL in ONE" [ref=e679]
                      - cell "5" [ref=e684]
                      - cell " Not assigned" [ref=e687]:
                        - generic [ref=e688]:
                          - generic [ref=e689]: 
                          - generic [ref=e691]: Not assigned
                      - cell "QA DEV" [ref=e694]
                      - cell "Confirmed" [ref=e697]
                      - cell [ref=e705]:
                        - generic [ref=e707]:
                          - button [disabled]
                          - button "Open" [ref=e709]
                      - cell [ref=e712]:
                        - button "" [ref=e715]
                    - row [ref=e718] [cursor=pointer]:
                      - cell " 16/09/2026 13:00  " [ref=e719]:
                        - generic [ref=e720]:
                          - generic [ref=e721]: 
                          - generic [ref=e724]:
                            - generic [ref=e725]: 16/09/2026
                            - generic [ref=e726]: 13:00
                          - generic [ref=e727]:
                            - generic [ref=e728]: 
                            - generic [ref=e730]: 
                      - cell "66868" [ref=e732]
                      - cell "Ammar Micijevic" [ref=e733]
                      - cell "ALL in ONE" [ref=e738]
                      - cell "5" [ref=e743]
                      - cell " Not assigned" [ref=e746]:
                        - generic [ref=e747]:
                          - generic [ref=e748]: 
                          - generic [ref=e750]: Not assigned
                      - cell "QA DEV" [ref=e753]
                      - cell "Confirmed" [ref=e756]
                      - cell [ref=e764]:
                        - generic [ref=e766]:
                          - button [disabled]
                          - button "Open" [ref=e768]
                      - cell [ref=e771]:
                        - button "" [ref=e774]
                    - row [ref=e777] [cursor=pointer]:
                      - cell " 16/09/2026 10:00  " [ref=e778]:
                        - generic [ref=e779]:
                          - generic [ref=e780]: 
                          - generic [ref=e783]:
                            - generic [ref=e784]: 16/09/2026
                            - generic [ref=e785]: 10:00
                          - generic [ref=e786]:
                            - generic [ref=e787]: 
                            - generic [ref=e789]: 
                      - cell "66860" [ref=e791]
                      - cell "Ammar Micijevic" [ref=e792]
                      - cell "ALL in ONE" [ref=e797]
                      - cell "5" [ref=e802]
                      - cell " Not assigned" [ref=e805]:
                        - generic [ref=e806]:
                          - generic [ref=e807]: 
                          - generic [ref=e809]: Not assigned
                      - cell "QA DEV" [ref=e812]
                      - cell "Confirmed" [ref=e815]
                      - cell [ref=e823]:
                        - generic [ref=e825]:
                          - button [disabled]
                          - button "Open" [ref=e827]
                      - cell [ref=e830]:
                        - button "" [ref=e833]
                    - row [ref=e836] [cursor=pointer]:
                      - cell " 16/09/2026 10:00  " [ref=e837]:
                        - generic [ref=e838]:
                          - generic [ref=e839]: 
                          - generic [ref=e842]:
                            - generic [ref=e843]: 16/09/2026
                            - generic [ref=e844]: 10:00
                          - generic [ref=e845]:
                            - generic [ref=e846]: 
                            - generic [ref=e848]: 
                      - cell "66858" [ref=e850]
                      - cell "Ammar Micijevic" [ref=e851]
                      - cell "ALL in ONE" [ref=e856]
                      - cell "5" [ref=e861]
                      - cell " Not assigned" [ref=e864]:
                        - generic [ref=e865]:
                          - generic [ref=e866]: 
                          - generic [ref=e868]: Not assigned
                      - cell "QA DEV" [ref=e871]
                      - cell "Confirmed" [ref=e874]
                      - cell [ref=e882]:
                        - generic [ref=e884]:
                          - button [disabled]
                          - button "Open" [ref=e886]
                      - cell [ref=e889]:
                        - button "" [ref=e892]
                    - row [ref=e895] [cursor=pointer]:
                      - cell " 15/09/2026 13:00  " [ref=e896]:
                        - generic [ref=e897]:
                          - generic [ref=e898]: 
                          - generic [ref=e901]:
                            - generic [ref=e902]: 15/09/2026
                            - generic [ref=e903]: 13:00
                          - generic [ref=e904]:
                            - generic [ref=e905]: 
                            - generic [ref=e907]: 
                      - cell "66859" [ref=e909]
                      - cell "Ammar Micijevic" [ref=e910]
                      - cell "ALL in ONE" [ref=e915]
                      - cell "5" [ref=e920]
                      - cell " Not assigned" [ref=e923]:
                        - generic [ref=e924]:
                          - generic [ref=e925]: 
                          - generic [ref=e927]: Not assigned
                      - cell "QA DEV" [ref=e930]
                      - cell "Confirmed" [ref=e933]
                      - cell [ref=e941]:
                        - generic [ref=e943]:
                          - button [disabled]
                          - button "Open" [ref=e945]
                      - cell [ref=e948]:
                        - button "" [ref=e951]
                    - row [ref=e954] [cursor=pointer]:
                      - cell " 15/09/2026 10:00  " [ref=e955]:
                        - generic [ref=e956]:
                          - generic [ref=e957]: 
                          - generic [ref=e960]:
                            - generic [ref=e961]: 15/09/2026
                            - generic [ref=e962]: 10:00
                          - generic [ref=e963]:
                            - generic [ref=e964]: 
                            - generic [ref=e966]: 
                      - cell "66839" [ref=e968]
                      - cell "Ammar Micijevic" [ref=e969]
                      - cell "ALL in ONE" [ref=e974]
                      - cell "5" [ref=e979]
                      - cell " Not assigned" [ref=e982]:
                        - generic [ref=e983]:
                          - generic [ref=e984]: 
                          - generic [ref=e986]: Not assigned
                      - cell "QA DEV" [ref=e989]
                      - cell "Confirmed" [ref=e992]
                      - cell [ref=e1000]:
                        - generic [ref=e1002]:
                          - button [disabled]
                          - button "Open" [ref=e1004]
                      - cell [ref=e1007]:
                        - button "" [ref=e1010]
                    - row [ref=e1013] [cursor=pointer]:
                      - cell " 15/09/2026 10:00  " [ref=e1014]:
                        - generic [ref=e1015]:
                          - generic [ref=e1016]: 
                          - generic [ref=e1019]:
                            - generic [ref=e1020]: 15/09/2026
                            - generic [ref=e1021]: 10:00
                          - generic [ref=e1022]:
                            - generic [ref=e1023]: 
                            - generic [ref=e1025]: 
                      - cell "66836" [ref=e1027]
                      - cell "Ammar Micijevic" [ref=e1028]
                      - cell "ALL in ONE" [ref=e1033]
                      - cell "5" [ref=e1038]
                      - cell " Not assigned" [ref=e1041]:
                        - generic [ref=e1042]:
                          - generic [ref=e1043]: 
                          - generic [ref=e1045]: Not assigned
                      - cell "QA DEV" [ref=e1048]
                      - cell "Confirmed" [ref=e1051]
                      - cell [ref=e1059]:
                        - generic [ref=e1061]:
                          - button [disabled]
                          - button "Open" [ref=e1063]
                      - cell [ref=e1066]:
                        - button "" [ref=e1069]
                    - row [ref=e1072] [cursor=pointer]:
                      - cell " 15/09/2026 10:00  " [ref=e1073]:
                        - generic [ref=e1074]:
                          - generic [ref=e1075]: 
                          - generic [ref=e1078]:
                            - generic [ref=e1079]: 15/09/2026
                            - generic [ref=e1080]: 10:00
                          - generic [ref=e1081]:
                            - generic [ref=e1082]: 
                            - generic [ref=e1084]: 
                      - cell "66841" [ref=e1086]
                      - cell "Ammar MICIJEVICA" [ref=e1087]
                      - cell "ALL in ONE" [ref=e1092]
                      - cell "5" [ref=e1097]
                      - cell " Not assigned" [ref=e1100]:
                        - generic [ref=e1101]:
                          - generic [ref=e1102]: 
                          - generic [ref=e1104]: Not assigned
                      - cell "QA DEV" [ref=e1107]
                      - cell "Confirmed" [ref=e1110]
                      - cell [ref=e1118]:
                        - generic [ref=e1120]:
                          - button [disabled]
                          - button "Open" [ref=e1122]
                      - cell [ref=e1125]:
                        - button "" [ref=e1128]
                    - row [ref=e1131] [cursor=pointer]:
                      - cell " 14/09/2026 14:00  " [ref=e1132]:
                        - generic [ref=e1133]:
                          - generic [ref=e1134]: 
                          - generic [ref=e1137]:
                            - generic [ref=e1138]: 14/09/2026
                            - generic [ref=e1139]: 14:00
                          - generic [ref=e1140]:
                            - generic [ref=e1141]: 
                            - generic [ref=e1143]: 
                      - cell "66842" [ref=e1145]
                      - cell "Ammar Micijevic" [ref=e1146]
                      - cell "ALL in ONE" [ref=e1151]
                      - cell "5" [ref=e1156]
                      - cell " Not assigned" [ref=e1159]:
                        - generic [ref=e1160]:
                          - generic [ref=e1161]: 
                          - generic [ref=e1163]: Not assigned
                      - cell "QA DEV" [ref=e1166]
                      - cell "Confirmed" [ref=e1169]
                      - cell [ref=e1177]:
                        - generic [ref=e1179]:
                          - button [disabled]
                          - button "Open" [ref=e1181]
                      - cell [ref=e1184]:
                        - button "" [ref=e1187]
                    - row [ref=e1190] [cursor=pointer]:
                      - cell " 14/09/2026 13:00  " [ref=e1191]:
                        - generic [ref=e1192]:
                          - generic [ref=e1193]: 
                          - generic [ref=e1196]:
                            - generic [ref=e1197]: 14/09/2026
                            - generic [ref=e1198]: 13:00
                          - generic [ref=e1199]:
                            - generic [ref=e1200]: 
                            - generic [ref=e1202]: 
                      - cell "66838" [ref=e1204]
                      - cell "Ammar Micijevic" [ref=e1205]
                      - cell "ALL in ONE" [ref=e1210]
                      - cell "5" [ref=e1215]
                      - cell " Not assigned" [ref=e1218]:
                        - generic [ref=e1219]:
                          - generic [ref=e1220]: 
                          - generic [ref=e1222]: Not assigned
                      - cell "QA DEV" [ref=e1225]
                      - cell "Confirmed" [ref=e1228]
                      - cell [ref=e1236]:
                        - generic [ref=e1238]:
                          - button [disabled]
                          - button "Open" [ref=e1240]
                      - cell [ref=e1243]:
                        - button "" [ref=e1246]
                - generic [ref=e1249]: 1 - 18 of 18
              - generic [ref=e1253]:
                - paragraph [ref=e1254] [cursor=pointer]: Legal notice and Terms and conditions of use
                - paragraph [ref=e1255] [cursor=pointer]: PRIVACY_POLICY
          - generic [ref=e1256]:
            - generic [ref=e1257]:
              - generic [ref=e1258] [cursor=pointer]: 
              - generic [ref=e1260]: 0 selected
            - generic [ref=e1263] [cursor=pointer]:
              - generic [ref=e1264]: 
              - generic [ref=e1266]: SELECT ALL
```

# Test source

```ts
  1   | import { Page, Locator, test } from '@playwright/test';
  2   | 
  3   | export class BasePage {
  4   |     readonly closeModalButton: Locator;
  5   |     readonly institutionsButton: Locator;
  6   |     readonly templatesButton: Locator;
  7   |     readonly proceduresButton: Locator;
  8   |     readonly documentationButton: Locator;
  9   |     readonly usersButton: Locator;
  10  |     readonly appointmentsButton: Locator;
  11  |     readonly governmentIcon: Locator;
  12  |     readonly qaDevMenuItem: Locator;
  13  | 
  14  |     constructor(public page: Page) {
  15  |         this.closeModalButton = page.locator('.MuiButtonBase-root.MuiIconButton-root.closeIcon');
  16  |         this.appointmentsButton = page.locator('a[href*="/company/"][href*="appointments"]').or(page.locator('a[href*="/company/"]')).or(page.getByRole('button', { name: /Appointments|Citas/i })).or(page.locator('.ri-calendar-line, [class*="calendar"]').locator('..')).first();
  17  |         this.institutionsButton = page.locator('a[href*="/companies"]').or(page.getByRole('button', { name: /Entities|Institutions|Entidades|Instituciones/i })).first();
  18  |         this.templatesButton = page.locator('a[href*="/drafts"]').or(page.getByRole('button', { name: /Templates|Plantillas/i })).first();
  19  |         this.proceduresButton = page.locator('a[href*="/procedures"]').or(page.getByRole('button', { name: /Procedures|Procedimientos/i })).first();
  20  |         this.documentationButton = page.locator('a[href*="/documentation"]').or(page.locator('#documentation-link')).first();
  21  |         this.usersButton = page.locator('a[href*="/users"]').or(page.getByRole('button', { name: /Users|Usuarios/i })).first();
  22  |         this.governmentIcon = page.locator('.ri-government-line, [class*="government"]').first();
  23  |         this.qaDevMenuItem = page.getByRole('menuitem', { name: /company-logo QA DEV|QA DEV/i }).or(page.getByText(/QA DEV/i)).first();
  24  |     }
  25  | 
  26  |     async dismissModal() {
  27  |         await test.step('Dismiss modal dialog', async () => {
  28  |             const modal = this.page.locator('#alert-confirm, .MuiDialog-root, #modal');
  29  |             if (await modal.first().isVisible({ timeout: 2000 }).catch(() => false)) {
  30  |                 const actionBtn = modal.first().locator('button').first();
  31  |                 if (await actionBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
  32  |                     await actionBtn.click();
  33  |                 } else {
  34  |                     await this.page.keyboard.press('Escape');
  35  |                 }
  36  |                 await modal.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  37  |             }
  38  |         });
  39  |     }
  40  | 
  41  |     async dismissToastOrModal() {
  42  |         await test.step('Dismiss toast or modal banner if present', async () => {
  43  |             const closeBtn = this.page.locator(`
  44  |                 .slide-in button,
  45  |                 .slide-in [class*="close"],
  46  |                 .slide-in [aria-label*="close" i],
  47  |                 .MuiButtonBase-root.MuiIconButton-root.closeIcon,
  48  |                 button.closeIcon,
  49  |                 [class*="toast"] button,
  50  |                 [class*="snackbar"] button,
  51  |                 button[aria-label="close" i],
  52  |                 button[aria-label="Close" i]
  53  |             `).first();
  54  | 
  55  |             if (await closeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
  56  |                 await closeBtn.click({ timeout: 1000, force: true }).catch(() => {});
  57  |             }
  58  | 
  59  |             await this.page.evaluate(() => {
  60  |                 document.querySelectorAll('.slide-in, .cbx-dropdown-backdrop, .cbx-dropdown-presentation, [class*="Toastify__toast"], #modal.cbx-Modal-container, .cbx-Modal-backdrop').forEach(el => (el as HTMLElement).remove());
  61  |             }).catch(() => {});
  62  |         });
  63  |     }
  64  | 
  65  |     async selectQADevCompany() {
  66  |         await test.step('Select QA DEV company', async () => {
  67  |             await this.governmentIcon.click();
  68  |             await this.qaDevMenuItem.click();
  69  |             await this.page.waitForTimeout(1000);
  70  |         });
  71  |     }
  72  | 
  73  |     async navigateToInstitutions() {
  74  |         await test.step('Navigate to Institutions page', async () => {
> 75  |             await this.institutionsButton.waitFor({ state: 'visible', timeout: 10000 });
      |                                           ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  76  |             await this.institutionsButton.click();
  77  |         });
  78  |     }
  79  | 
  80  |     async navigateToTemplates() {
  81  |         await test.step('Navigate to Templates page', async () => {
  82  |             await this.templatesButton.waitFor({ state: 'visible', timeout: 10000 });
  83  |             await this.templatesButton.click();
  84  |         });
  85  |     }
  86  | 
  87  |     async navigateToProcedures() {
  88  |         await test.step('Navigate to Procedures page', async () => {
  89  |             await this.proceduresButton.waitFor({ state: 'visible', timeout: 10000 });
  90  |             await this.proceduresButton.click();
  91  |             await this.page.waitForTimeout(1000);
  92  |         });
  93  |     }
  94  | 
  95  |     async navigateToDocumentation() {
  96  |         await test.step('Navigate to Documentation page', async () => {
  97  |             await this.documentationButton.waitFor({ state: 'visible', timeout: 10000 });
  98  |             await this.documentationButton.click();
  99  |         });
  100 |     }
  101 | 
  102 |     async navigateToUsers() {
  103 |         await test.step('Navigate to Users page', async () => {
  104 |             await this.usersButton.waitFor({ state: 'visible', timeout: 10000 });
  105 |             await this.usersButton.click();
  106 |             await this.page.waitForTimeout(1000);
  107 |         });
  108 |     }
  109 | 
  110 |     async navigateToAppointments() {
  111 |         await test.step('Navigate to Appointments page', async () => {
  112 |             await this.appointmentsButton.waitFor({ state: 'visible', timeout: 10000 });
  113 |             await this.appointmentsButton.click();
  114 |             await this.page.waitForTimeout(1000);
  115 |         });
  116 |     }
  117 | }
  118 | 
```