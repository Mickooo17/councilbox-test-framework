# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Organization & Company Settings Tests >> The fields for the "Meeting canceled" email notification should have default texts if the notification is not modified @OVAC-5674 @regression
- Location: tests/institutions/institutionsTests.spec.ts:290:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('tr, li, [role="row"]').filter({ has: locator('td:first-child div, td:first-child p, td:first-child span').filter({ hasText: /Meeting canceled|Reunión cancelada|Cita cancelada/i }) }).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f12e3]:
  - generic [ref=f12e4]:
    - button "" [ref=f12e5] [cursor=pointer]
    - generic [ref=f12e10]:
      - link [ref=f12e12] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=f12e13]:
          - generic [ref=f12e14]: 
          - generic [ref=f12e16]: Activity
      - link [ref=f12e18] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=f12e19]:
          - generic [ref=f12e20]: 
          - generic [ref=f12e22]: Appointments
      - link [ref=f12e24] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=f12e25]:
          - generic [ref=f12e26]: 
          - generic [ref=f12e28]: Processes
      - link [ref=f12e30] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=f12e31]:
          - generic [ref=f12e32]: 
          - generic [ref=f12e34]: Procedures
      - link [ref=f12e36] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=f12e37]:
          - generic [ref=f12e38]: 
          - generic [ref=f12e40]: Templates
      - link [ref=f12e42] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=f12e43]:
          - generic [ref=f12e44]: 
          - generic [ref=f12e46]: Documents
      - link [ref=f12e48] [cursor=pointer]:
        - /url: /company/1112/entities
        - button " Entities" [ref=f12e49]:
          - generic [ref=f12e50]: 
          - generic [ref=f12e52]: Entities
      - link [ref=f12e54] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=f12e55]:
          - generic [ref=f12e56]: 
          - generic [ref=f12e58]: Users
    - generic [ref=f12e60]:
      - img "CBX white Logo" [ref=f12e61]
      - generic [ref=f12e62]: © 2026 v8.8.0
  - generic [ref=f12e64]:
    - banner [ref=f12e65]:
      - button [ref=f12e67] [cursor=pointer]:
        - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e68]
      - generic [ref=f12e69]: Grupo Castelar Servicios Legales y Financieros S.A
      - generic [ref=f12e75]:
        - button [ref=f12e78] [cursor=pointer]:
          - button "Notifications" [ref=f12e79]:
            - generic [ref=f12e80]: 
        - button [ref=f12e82] [cursor=pointer]:
          - button "Button user" [ref=f12e84]:
            - generic [ref=f12e87]:
              - img "Logo Virtual Citizen Service Office" [ref=f12e89]
              - generic [ref=f12e90]: 
    - generic [ref=f12e92]:
      - button "Actions" [ref=f12e95] [cursor=pointer]:
        - generic [ref=f12e96]: 
      - generic [ref=f12e98]:
        - tablist "Pestañas" [ref=f12e102]:
          - tab "Video-appointments" [selected] [ref=f12e103] [cursor=pointer]:
            - paragraph [ref=f12e105]: Video-appointments
          - tab "In-person appointments" [ref=f12e106] [cursor=pointer]:
            - paragraph [ref=f12e108]: In-person appointments
        - generic [ref=f12e110]:
          - generic [ref=f12e112]:
            - generic [ref=f12e113]:
              - generic [ref=f12e115]:
                - generic [ref=f12e118]:
                  - generic [ref=f12e119] [cursor=pointer]:
                    - generic [ref=f12e121]:
                      - generic [ref=f12e122]: 
                      - generic [ref=f12e123]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=f12e129]:
                  - generic [ref=f12e130] [cursor=pointer]:
                    - generic [ref=f12e131]: Confirmed, In progress, Pending report, Completed, In pause
                    - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                    - generic [ref=f12e132]: Status
                  - group [aria-hidden]
                - generic [ref=f12e138]:
                  - generic [ref=f12e139] [cursor=pointer]:
                    - generic [ref=f12e140]: This week
                    - combobox "Period": This week
                    - generic [ref=f12e141]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=f12e145] [cursor=pointer]:
                  - generic [ref=f12e146]: 
              - generic [ref=f12e147]:
                - generic [ref=f12e148]:
                  - paragraph [ref=f12e149]: Search by participant or record
                  - generic [ref=f12e152]:
                    - button "Search" [ref=f12e154] [cursor=pointer]:
                      - generic [ref=f12e155]: 
                    - textbox "Search by participant or record" [ref=f12e156]:
                      - /placeholder: Search
                - button "Help" [ref=f12e157] [cursor=pointer]:
                  - generic [ref=f12e158]: 
            - generic [ref=f12e166]:
              - table [ref=f12e167]:
                - rowgroup [ref=f12e168]:
                  - row [ref=f12e169]:
                    - columnheader "Selection" [ref=f12e170]
                    - columnheader "Date Date " [ref=f12e172]:
                      - generic [ref=f12e173]: Date
                      - button "Date " [ref=f12e174] [cursor=pointer]:
                        - generic [ref=f12e175]: Date
                        - generic [ref=f12e176]: 
                    - columnheader "Ref. Ref. " [ref=f12e178]:
                      - generic [ref=f12e179]: Ref.
                      - button "Ref. " [ref=f12e180] [cursor=pointer]:
                        - generic [ref=f12e181]: Ref.
                        - generic [ref=f12e182]: 
                    - columnheader "External ID External ID " [ref=f12e184]:
                      - generic [ref=f12e185]: External ID
                      - button "External ID " [ref=f12e186] [cursor=pointer]:
                        - generic [ref=f12e187]: External ID
                        - generic [ref=f12e188]: 
                    - columnheader "Record Record " [ref=f12e190]:
                      - generic [ref=f12e191]: Record
                      - button "Record " [ref=f12e192] [cursor=pointer]:
                        - generic [ref=f12e193]: Record
                        - generic [ref=f12e194]: 
                    - columnheader "Documents" [ref=f12e196]
                    - columnheader "Entity Entity " [ref=f12e197]:
                      - generic [ref=f12e198]: Entity
                      - button "Entity " [ref=f12e199] [cursor=pointer]:
                        - generic [ref=f12e200]: Entity
                        - generic [ref=f12e201]: 
                    - columnheader "Status Status " [ref=f12e203]:
                      - generic [ref=f12e204]: Status
                      - button "Status " [ref=f12e205] [cursor=pointer]:
                        - generic [ref=f12e206]: Status
                        - generic [ref=f12e207]: 
                    - columnheader "Actions [object Object]" [ref=f12e209]:
                      - generic [ref=f12e210]: Actions
                      - generic [ref=f12e213]:
                        - generic [ref=f12e214] [cursor=pointer]:
                          - generic [aria-hidden] [ref=f12e216]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=f12e218]:
                  - row [ref=f12e219] [cursor=pointer]:
                    - cell [ref=f12e220]:
                      - checkbox "Select" [ref=f12e225]
                    - cell " 28/11/2026 10:00 " [ref=f12e228]:
                      - generic [ref=f12e229]:
                        - generic [ref=f12e230]: 
                        - generic [ref=f12e233]:
                          - generic [ref=f12e234]: 28/11/2026
                          - generic [ref=f12e235]: 10:00
                        - generic [ref=f12e236]: 
                    - cell "68126" [ref=f12e239]
                    - cell [ref=f12e240]
                    - cell "11121112681262026bb30e" [ref=f12e241]
                    - cell [ref=f12e242]:
                      - button "1" [ref=f12e244]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e245]
                    - cell "Confirmed" [ref=f12e248]
                    - cell [ref=f12e256]:
                      - button "More" [ref=f12e259]:
                        - generic [ref=f12e260]: 
                  - row [ref=f12e262] [cursor=pointer]:
                    - cell [ref=f12e263]:
                      - checkbox "Select" [ref=f12e268]
                    - cell " 28/11/2026 10:00 " [ref=f12e271]:
                      - generic [ref=f12e272]:
                        - generic [ref=f12e273]: 
                        - generic [ref=f12e276]:
                          - generic [ref=f12e277]: 28/11/2026
                          - generic [ref=f12e278]: 10:00
                        - generic [ref=f12e279]: 
                    - cell "68125" [ref=f12e282]
                    - cell [ref=f12e283]
                    - cell "111211126812520266ac03" [ref=f12e284]
                    - cell [ref=f12e285]:
                      - button "1" [ref=f12e287]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e288]
                    - cell "Confirmed" [ref=f12e291]
                    - cell [ref=f12e299]:
                      - button "More" [ref=f12e302]:
                        - generic [ref=f12e303]: 
                  - row [ref=f12e305] [cursor=pointer]:
                    - cell [ref=f12e306]:
                      - checkbox "Select" [ref=f12e311]
                    - cell " 28/11/2026 10:00 " [ref=f12e314]:
                      - generic [ref=f12e315]:
                        - generic [ref=f12e316]: 
                        - generic [ref=f12e319]:
                          - generic [ref=f12e320]: 28/11/2026
                          - generic [ref=f12e321]: 10:00
                        - generic [ref=f12e322]: 
                    - cell "68123" [ref=f12e325]
                    - cell [ref=f12e326]
                    - cell "11121112681232026c8f9c" [ref=f12e327]
                    - cell [ref=f12e328]:
                      - button "1" [ref=f12e330]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e331]
                    - cell "Confirmed" [ref=f12e334]
                    - cell [ref=f12e342]:
                      - button "More" [ref=f12e345]:
                        - generic [ref=f12e346]: 
                  - row [ref=f12e348] [cursor=pointer]:
                    - cell [ref=f12e349]:
                      - checkbox "Select" [ref=f12e354]
                    - cell " 28/11/2026 10:00 " [ref=f12e357]:
                      - generic [ref=f12e358]:
                        - generic [ref=f12e359]: 
                        - generic [ref=f12e362]:
                          - generic [ref=f12e363]: 28/11/2026
                          - generic [ref=f12e364]: 10:00
                        - generic [ref=f12e365]: 
                    - cell "68129" [ref=f12e368]
                    - cell [ref=f12e369]
                    - cell "1112111268129202688e36" [ref=f12e370]
                    - cell [ref=f12e371]:
                      - button "1" [ref=f12e373]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e374]
                    - cell "Confirmed" [ref=f12e377]
                    - cell [ref=f12e385]:
                      - button "More" [ref=f12e388]:
                        - generic [ref=f12e389]: 
                  - row [ref=f12e391] [cursor=pointer]:
                    - cell [ref=f12e392]:
                      - checkbox "Select" [ref=f12e397]
                    - cell " 28/11/2026 10:00 " [ref=f12e400]:
                      - generic [ref=f12e401]:
                        - generic [ref=f12e402]: 
                        - generic [ref=f12e405]:
                          - generic [ref=f12e406]: 28/11/2026
                          - generic [ref=f12e407]: 10:00
                        - generic [ref=f12e408]: 
                    - cell "68133" [ref=f12e411]
                    - cell [ref=f12e412]
                    - cell "1112111268133202690581" [ref=f12e413]
                    - cell [ref=f12e414]:
                      - button "1" [ref=f12e416]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e417]
                    - cell "Confirmed" [ref=f12e420]
                    - cell [ref=f12e428]:
                      - button "More" [ref=f12e431]:
                        - generic [ref=f12e432]: 
                  - row [ref=f12e434] [cursor=pointer]:
                    - cell [ref=f12e435]:
                      - checkbox "Select" [ref=f12e440]
                    - cell " 28/11/2026 10:00 " [ref=f12e443]:
                      - generic [ref=f12e444]:
                        - generic [ref=f12e445]: 
                        - generic [ref=f12e448]:
                          - generic [ref=f12e449]: 28/11/2026
                          - generic [ref=f12e450]: 10:00
                        - generic [ref=f12e451]: 
                    - cell "68124" [ref=f12e454]
                    - cell [ref=f12e455]
                    - cell "11121112681242026586aa" [ref=f12e456]
                    - cell [ref=f12e457]:
                      - button "1" [ref=f12e459]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e460]
                    - cell "Confirmed" [ref=f12e463]
                    - cell [ref=f12e471]:
                      - button "More" [ref=f12e474]:
                        - generic [ref=f12e475]: 
                  - row [ref=f12e477] [cursor=pointer]:
                    - cell [ref=f12e478]:
                      - checkbox "Select" [ref=f12e483]
                    - cell " 28/11/2026 10:00 " [ref=f12e486]:
                      - generic [ref=f12e487]:
                        - generic [ref=f12e488]: 
                        - generic [ref=f12e491]:
                          - generic [ref=f12e492]: 28/11/2026
                          - generic [ref=f12e493]: 10:00
                        - generic [ref=f12e494]: 
                    - cell "68130" [ref=f12e497]
                    - cell [ref=f12e498]
                    - cell "11121112681302026e1c13" [ref=f12e499]
                    - cell [ref=f12e500]:
                      - button "1" [ref=f12e502]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e503]
                    - cell "Confirmed" [ref=f12e506]
                    - cell [ref=f12e514]:
                      - button "More" [ref=f12e517]:
                        - generic [ref=f12e518]: 
                  - row [ref=f12e520] [cursor=pointer]:
                    - cell [ref=f12e521]:
                      - checkbox "Select" [ref=f12e526]
                    - cell " 28/11/2026 10:00 " [ref=f12e529]:
                      - generic [ref=f12e530]:
                        - generic [ref=f12e531]: 
                        - generic [ref=f12e534]:
                          - generic [ref=f12e535]: 28/11/2026
                          - generic [ref=f12e536]: 10:00
                        - generic [ref=f12e537]: 
                    - cell "68120" [ref=f12e540]
                    - cell [ref=f12e541]
                    - cell "11121112681202026a99ac" [ref=f12e542]
                    - cell [ref=f12e543]:
                      - button "1" [ref=f12e545]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e546]
                    - cell "Confirmed" [ref=f12e549]
                    - cell [ref=f12e557]:
                      - button "More" [ref=f12e560]:
                        - generic [ref=f12e561]: 
                  - row [ref=f12e563] [cursor=pointer]:
                    - cell [ref=f12e564]:
                      - checkbox "Select" [ref=f12e569]
                    - cell " 28/11/2026 10:00 " [ref=f12e572]:
                      - generic [ref=f12e573]:
                        - generic [ref=f12e574]: 
                        - generic [ref=f12e577]:
                          - generic [ref=f12e578]: 28/11/2026
                          - generic [ref=f12e579]: 10:00
                        - generic [ref=f12e580]: 
                    - cell "68127" [ref=f12e583]
                    - cell [ref=f12e584]
                    - cell "11121112681272026a5c7e" [ref=f12e585]
                    - cell [ref=f12e586]:
                      - button "1" [ref=f12e588]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e589]
                    - cell "Confirmed" [ref=f12e592]
                    - cell [ref=f12e600]:
                      - button "More" [ref=f12e603]:
                        - generic [ref=f12e604]: 
                  - row [ref=f12e606] [cursor=pointer]:
                    - cell [ref=f12e607]:
                      - checkbox "Select" [ref=f12e612]
                    - cell " 28/11/2026 10:00 " [ref=f12e615]:
                      - generic [ref=f12e616]:
                        - generic [ref=f12e617]: 
                        - generic [ref=f12e620]:
                          - generic [ref=f12e621]: 28/11/2026
                          - generic [ref=f12e622]: 10:00
                        - generic [ref=f12e623]: 
                    - cell "68128" [ref=f12e626]
                    - cell [ref=f12e627]
                    - cell "11121112681282026adcc3" [ref=f12e628]
                    - cell [ref=f12e629]:
                      - button "1" [ref=f12e631]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e632]
                    - cell "Confirmed" [ref=f12e635]
                    - cell [ref=f12e643]:
                      - button "More" [ref=f12e646]:
                        - generic [ref=f12e647]: 
                  - row [ref=f12e649] [cursor=pointer]:
                    - cell [ref=f12e650]:
                      - checkbox "Select" [ref=f12e655]
                    - cell " 28/11/2026 10:00 " [ref=f12e658]:
                      - generic [ref=f12e659]:
                        - generic [ref=f12e660]: 
                        - generic [ref=f12e663]:
                          - generic [ref=f12e664]: 28/11/2026
                          - generic [ref=f12e665]: 10:00
                        - generic [ref=f12e666]: 
                    - cell "68131" [ref=f12e669]
                    - cell [ref=f12e670]
                    - cell "1112111268131202696952" [ref=f12e671]
                    - cell [ref=f12e672]:
                      - button "1" [ref=f12e674]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e675]
                    - cell "Confirmed" [ref=f12e678]
                    - cell [ref=f12e686]:
                      - button "More" [ref=f12e689]:
                        - generic [ref=f12e690]: 
                  - row [ref=f12e692] [cursor=pointer]:
                    - cell [ref=f12e693]:
                      - checkbox "Select" [ref=f12e698]
                    - cell " 28/11/2026 10:00 " [ref=f12e701]:
                      - generic [ref=f12e702]:
                        - generic [ref=f12e703]: 
                        - generic [ref=f12e706]:
                          - generic [ref=f12e707]: 28/11/2026
                          - generic [ref=f12e708]: 10:00
                        - generic [ref=f12e709]: 
                    - cell "68132" [ref=f12e712]
                    - cell [ref=f12e713]
                    - cell "111211126813220263916a" [ref=f12e714]
                    - cell [ref=f12e715]:
                      - button "1" [ref=f12e717]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e718]
                    - cell "Confirmed" [ref=f12e721]
                    - cell [ref=f12e729]:
                      - button "More" [ref=f12e732]:
                        - generic [ref=f12e733]: 
                  - row [ref=f12e735] [cursor=pointer]:
                    - cell [ref=f12e736]:
                      - checkbox "Select" [ref=f12e741]
                    - cell " 27/11/2026 18:00  " [ref=f12e744]:
                      - generic [ref=f12e745]:
                        - generic [ref=f12e746]: 
                        - generic [ref=f12e749]:
                          - generic [ref=f12e750]: 27/11/2026
                          - generic [ref=f12e751]: 18:00
                        - generic [ref=f12e752]:
                          - generic [ref=f12e753]: 
                          - generic [ref=f12e755]: 
                    - cell "68121" [ref=f12e757]
                    - cell [ref=f12e758]
                    - cell "111211126812120261b448" [ref=f12e759]
                    - cell [ref=f12e760]:
                      - button "1" [ref=f12e762]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e763]
                    - cell "Confirmed" [ref=f12e766]
                    - cell [ref=f12e774]:
                      - button "More" [ref=f12e777]:
                        - generic [ref=f12e778]: 
                  - row [ref=f12e780] [cursor=pointer]:
                    - cell [ref=f12e781]:
                      - checkbox "Select" [ref=f12e786]
                    - cell " 27/11/2026 10:15 " [ref=f12e789]:
                      - generic [ref=f12e790]:
                        - generic [ref=f12e791]: 
                        - generic [ref=f12e794]:
                          - generic [ref=f12e795]: 27/11/2026
                          - generic [ref=f12e796]: 10:15
                        - generic [ref=f12e797]: 
                    - cell "68013" [ref=f12e800]
                    - cell [ref=f12e801]
                    - cell "11121112680132026e4080" [ref=f12e802]
                    - cell [ref=f12e803]:
                      - button "1" [ref=f12e805]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e807]
                    - cell "Confirmed" [ref=f12e810]
                    - cell [ref=f12e818]:
                      - button "More" [ref=f12e821]:
                        - generic [ref=f12e822]: 
                  - row [ref=f12e824] [cursor=pointer]:
                    - cell [ref=f12e825]:
                      - checkbox "Select" [ref=f12e830]
                    - cell " 27/11/2026 10:15" [ref=f12e833]:
                      - generic [ref=f12e834]:
                        - generic [ref=f12e835]: 
                        - generic [ref=f12e838]:
                          - generic [ref=f12e839]: 27/11/2026
                          - generic [ref=f12e840]: 10:15
                    - cell "68012" [ref=f12e841]
                    - cell [ref=f12e842]
                    - cell "1112111268012202696696" [ref=f12e843]
                    - cell [ref=f12e844]:
                      - button "1" [ref=f12e846]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e848]
                    - cell "Pending report" [ref=f12e851]
                    - cell [ref=f12e859]:
                      - button "More" [ref=f12e862]:
                        - generic [ref=f12e863]: 
                  - row [ref=f12e865] [cursor=pointer]:
                    - cell [ref=f12e866]:
                      - checkbox "Select" [ref=f12e871]
                    - cell " 27/11/2026 10:00  " [ref=f12e874]:
                      - generic [ref=f12e875]:
                        - generic [ref=f12e876]: 
                        - generic [ref=f12e879]:
                          - generic [ref=f12e880]: 27/11/2026
                          - generic [ref=f12e881]: 10:00
                        - generic [ref=f12e882]:
                          - generic [ref=f12e883]: 
                          - generic [ref=f12e885]: 
                    - cell "67960" [ref=f12e887]
                    - cell [ref=f12e888]
                    - cell "1112111267960202641a9a" [ref=f12e889]
                    - cell [ref=f12e890]:
                      - button "1" [ref=f12e892]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e893]
                    - cell "Confirmed" [ref=f12e896]
                    - cell [ref=f12e904]:
                      - button "More" [ref=f12e907]:
                        - generic [ref=f12e908]: 
                  - row [ref=f12e910] [cursor=pointer]:
                    - cell [ref=f12e911]:
                      - checkbox "Select" [ref=f12e916]
                    - cell " 27/11/2026 10:00  " [ref=f12e919]:
                      - generic [ref=f12e920]:
                        - generic [ref=f12e921]: 
                        - generic [ref=f12e924]:
                          - generic [ref=f12e925]: 27/11/2026
                          - generic [ref=f12e926]: 10:00
                        - generic [ref=f12e927]:
                          - generic [ref=f12e928]: 
                          - generic [ref=f12e930]: 
                    - cell "67959" [ref=f12e932]
                    - cell [ref=f12e933]
                    - cell "11121112679592026c04de" [ref=f12e934]
                    - cell [ref=f12e935]:
                      - button "1" [ref=f12e937]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e938]
                    - cell "Confirmed" [ref=f12e941]
                    - cell [ref=f12e949]:
                      - button "More" [ref=f12e952]:
                        - generic [ref=f12e953]: 
                  - row [ref=f12e955] [cursor=pointer]:
                    - cell [ref=f12e956]:
                      - checkbox "Select" [ref=f12e961]
                    - cell " 27/11/2026 10:00  " [ref=f12e964]:
                      - generic [ref=f12e965]:
                        - generic [ref=f12e966]: 
                        - generic [ref=f12e969]:
                          - generic [ref=f12e970]: 27/11/2026
                          - generic [ref=f12e971]: 10:00
                        - generic [ref=f12e972]:
                          - generic [ref=f12e973]: 
                          - generic [ref=f12e975]: 
                    - cell "67961" [ref=f12e977]
                    - cell [ref=f12e978]
                    - cell "111211126796120266b636" [ref=f12e979]
                    - cell [ref=f12e980]:
                      - button "1" [ref=f12e982]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e983]
                    - cell "Confirmed" [ref=f12e986]
                    - cell [ref=f12e994]:
                      - button "More" [ref=f12e997]:
                        - generic [ref=f12e998]: 
                  - row [ref=f12e1000] [cursor=pointer]:
                    - cell [ref=f12e1001]:
                      - checkbox "Select" [ref=f12e1006]
                    - cell " 27/11/2026 10:00  " [ref=f12e1009]:
                      - generic [ref=f12e1010]:
                        - generic [ref=f12e1011]: 
                        - generic [ref=f12e1014]:
                          - generic [ref=f12e1015]: 27/11/2026
                          - generic [ref=f12e1016]: 10:00
                        - generic [ref=f12e1017]:
                          - generic [ref=f12e1018]: 
                          - generic [ref=f12e1020]: 
                    - cell "67957" [ref=f12e1022]
                    - cell [ref=f12e1023]
                    - cell "11121112679572026449db" [ref=f12e1024]
                    - cell [ref=f12e1025]:
                      - button "1" [ref=f12e1027]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e1028]
                    - cell "Confirmed" [ref=f12e1031]
                    - cell [ref=f12e1039]:
                      - button "More" [ref=f12e1042]:
                        - generic [ref=f12e1043]: 
                  - row [ref=f12e1045] [cursor=pointer]:
                    - cell [ref=f12e1046]:
                      - checkbox "Select" [ref=f12e1051]
                    - cell " 27/11/2026 10:00 " [ref=f12e1054]:
                      - generic [ref=f12e1055]:
                        - generic [ref=f12e1056]: 
                        - generic [ref=f12e1059]:
                          - generic [ref=f12e1060]: 27/11/2026
                          - generic [ref=f12e1061]: 10:00
                        - generic [ref=f12e1062]: 
                    - cell "67907" [ref=f12e1065]
                    - cell [ref=f12e1066]
                    - cell "-" [ref=f12e1067]
                    - cell [ref=f12e1068]:
                      - button "0" [ref=f12e1070]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f12e1071]
                    - cell "In progress" [ref=f12e1074]
                    - cell [ref=f12e1082]:
                      - button "More" [ref=f12e1085]:
                        - generic [ref=f12e1086]: 
              - generic [ref=f12e1088]:
                - generic [ref=f12e1089]: 1 - 20 of 154
                - navigation "Paginación de resultados" [ref=f12e1092]:
                  - generic [ref=f12e1093]:
                    - button "Página 1" [ref=f12e1094] [cursor=pointer]: "1"
                    - button "Página 2" [ref=f12e1095] [cursor=pointer]: "2"
                    - button "Página 3" [ref=f12e1096] [cursor=pointer]: "3"
                    - generic [ref=f12e1100]:
                      - generic [ref=f12e1101] [cursor=pointer]:
                        - generic [ref=f12e1102]: ...
                        - combobox "Ir a otra página": ...
                      - group [aria-hidden]
                    - button "Página 6" [ref=f12e1104] [cursor=pointer]: "6"
                    - button "Página 7" [ref=f12e1105] [cursor=pointer]: "7"
                    - button "Página 8" [ref=f12e1106] [cursor=pointer]: "8"
                  - button "Página siguiente" [ref=f12e1108] [cursor=pointer]:
                    - generic [aria-hidden] [ref=f12e1109]: 
          - generic [ref=f12e1111]:
            - generic [ref=f12e1112] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=f12e1113] [cursor=pointer]: Privacy policy
          - generic [ref=f12e1114]:
            - generic [ref=f12e1115]:
              - generic [ref=f12e1116] [cursor=pointer]: 
              - generic [ref=f12e1118]: 0 selected
            - generic [ref=f12e1121] [cursor=pointer]:
              - generic [ref=f12e1123]: 
              - generic [ref=f12e1124]: SELECT ALL
```

# Test source

```ts
  468 |     async getCompanyName(): Promise<string> {
  469 |         return await test.step('Get company Name', async () => {
  470 |             const input = this.page.locator('input[name*="name" i], [id*="name" i]').or(
  471 |                 this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /^Name|^Nombre/i }).locator('input')
  472 |             ).first();
  473 |             await input.waitFor({ state: 'visible', timeout: 10000 });
  474 |             return await input.inputValue();
  475 |         });
  476 |     }
  477 | 
  478 |     /**
  479 |      * Updates the company Name input (OVAC-5741 / XR-1630).
  480 |      */
  481 |     async updateCompanyName(name: string) {
  482 |         await test.step(`Update company name to: ${name}`, async () => {
  483 |             const input = this.page.locator('input[name*="name" i], [id*="name" i]').or(
  484 |                 this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /^Name|^Nombre/i }).locator('input')
  485 |             ).first();
  486 |             await input.waitFor({ state: 'visible', timeout: 10000 });
  487 |             await input.fill(name);
  488 |             await input.blur();
  489 |         });
  490 |     }
  491 | 
  492 |     /**
  493 |      * Gets the company VAT NO/CIF input value (OVAC-5746 / XR-1629).
  494 |      */
  495 |     async getCompanyCif(): Promise<string> {
  496 |         return await test.step('Get company VAT NO/CIF', async () => {
  497 |             const input = this.page.locator('input[name*="cif" i], input[name*="vat" i], input[name*="tax" i], [id*="cif" i], [id*="vat" i]').or(
  498 |                 this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /CIF|VAT|TAX/i }).locator('input')
  499 |             ).first();
  500 |             await input.waitFor({ state: 'visible', timeout: 10000 });
  501 |             return await input.inputValue();
  502 |         });
  503 |     }
  504 | 
  505 |     /**
  506 |      * Updates the company VAT NO/CIF input (OVAC-5746 / XR-1629).
  507 |      */
  508 |     async updateCompanyCif(cif: string) {
  509 |         await test.step(`Update company CIF to: ${cif}`, async () => {
  510 |             const input = this.page.locator('input[name*="cif" i], input[name*="vat" i], input[name*="tax" i], [id*="cif" i], [id*="vat" i]').or(
  511 |                 this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /CIF|VAT|TAX/i }).locator('input')
  512 |             ).first();
  513 |             await input.waitFor({ state: 'visible', timeout: 10000 });
  514 |             await input.fill(cif);
  515 |             await input.blur();
  516 |         });
  517 |     }
  518 | 
  519 |     /**
  520 |      * Gets the contact e-mail input value (OVAC-5745 / XR-1628).
  521 |      */
  522 |     async getCompanyContactEmail(): Promise<string> {
  523 |         return await test.step('Get company contact email', async () => {
  524 |             const input = this.page.locator('input[name*="email" i], [id*="email" i], input[type="email"]').or(
  525 |                 this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /email|correo/i }).locator('input')
  526 |             ).first();
  527 |             await input.waitFor({ state: 'visible', timeout: 10000 });
  528 |             return await input.inputValue();
  529 |         });
  530 |     }
  531 | 
  532 |     /**
  533 |      * Updates the contact e-mail input (OVAC-5745 / XR-1628).
  534 |      */
  535 |     async updateCompanyContactEmail(email: string) {
  536 |         await test.step(`Update company contact email to: ${email}`, async () => {
  537 |             const input = this.page.locator('input[name*="email" i], [id*="email" i], input[type="email"]').or(
  538 |                 this.page.locator('.cbx-inputText-container, .MuiFormControl-root').filter({ hasText: /email|correo/i }).locator('input')
  539 |             ).first();
  540 |             await input.waitFor({ state: 'visible', timeout: 10000 });
  541 |             await input.fill(email);
  542 |             await input.blur();
  543 |         });
  544 |     }
  545 | 
  546 |     /**
  547 |      * Navigates to Customization -> Notifications tab (OVAC-5224).
  548 |      */
  549 |     async navigateToCustomizationNotifications(companyId: number = 1112) {
  550 |         await test.step(`Navigate to Customization -> Notifications for company #${companyId}`, async () => {
  551 |             await this.page.goto(resolveCompanyUrl(companyId, `companies/edit/${companyId}/personalization/notifications`));
  552 |             await this.page.waitForLoadState('networkidle');
  553 |             await this.dismissToastOrModal();
  554 |         });
  555 |     }
  556 | 
  557 |     /**
  558 |      * Verifies default notification template text for a given notification type (OVAC-5714, OVAC-5726, OVAC-5678, OVAC-5674, OVAC-5672).
  559 |      */
  560 |     async verifyNotificationDefaultTemplateText(notificationName: RegExp | string, expectedKeywords: (RegExp | string)[]) {
  561 |         await test.step(`Verify default template text for notification: ${notificationName}`, async () => {
  562 |             await this.navigateToCustomizationNotifications(1112);
  563 | 
  564 |             const pattern = typeof notificationName === 'string' ? new RegExp(notificationName, 'i') : notificationName;
  565 |             const notifRow = this.page.locator('tr, li, [role="row"]')
  566 |                 .filter({ has: this.page.locator('td:first-child div, td:first-child p, td:first-child span').filter({ hasText: pattern }) })
  567 |                 .first();
> 568 |             await notifRow.waitFor({ state: 'visible', timeout: 15000 });
      |                            ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  569 | 
  570 |             // Click the title cell link to open the notification edit page
  571 |             const titleLink = notifRow.locator('td').first().locator('div').filter({ hasText: pattern }).first();
  572 |             await titleLink.waitFor({ state: 'visible', timeout: 10000 });
  573 |             await titleLink.click();
  574 |             await this.page.waitForLoadState('networkidle');
  575 |             await this.page.waitForTimeout(1000);
  576 | 
  577 |             // Assert editor loaded with non-empty subject/header and matches expected template tokens
  578 |             const headerInput = this.page.locator('.cbx-inputText-container input, input.cbx-inputText-input, input[id*="cbx-inputText"]').first();
  579 |             await expect(headerInput).toBeVisible({ timeout: 10000 });
  580 |             const headerVal = await headerInput.inputValue();
  581 |             expect(headerVal.length).toBeGreaterThan(0);
  582 | 
  583 |             // Check body / editor content (.ql-editor or contenteditable)
  584 |             const bodyContent = this.page.locator('.ql-editor, [contenteditable="true"]').first();
  585 |             await expect(bodyContent).toBeVisible({ timeout: 10000 });
  586 |             const bodyText = await bodyContent.innerText();
  587 |             expect(bodyText.length).toBeGreaterThan(0);
  588 | 
  589 |             const combined = `${headerVal} ${bodyText}`;
  590 |             for (const kw of expectedKeywords) {
  591 |                 if (typeof kw === 'string') {
  592 |                     expect(combined).toContain(kw);
  593 |                 } else {
  594 |                     expect(combined).toMatch(kw);
  595 |                 }
  596 |             }
  597 |         });
  598 |     }
  599 | 
  600 |     /**
  601 |      * Verifies error message display when attempting to create a schedule without assigned professionals (OVAC-5185).
  602 |      */
  603 |     async verifyScheduleCreationWithoutProfessionalsShowsError(companyId: number = 1112) {
  604 |         await test.step('Verify error message display when attempting to create schedule without assigned professionals', async () => {
  605 |             await this.dismissToastOrModal();
  606 |             await this.page.goto(resolveCompanyUrl(companyId, `companies/edit/${companyId}/administration/schedule`));
  607 |             await this.page.waitForLoadState('networkidle');
  608 |             await this.dismissToastOrModal();
  609 | 
  610 |             // In schedule table, click add available period button
  611 |             const addBtn = this.page.locator('button:has(.ri-add-line), button:has-text("Add"), button:has-text("Añadir")').first();
  612 |             await addBtn.waitFor({ state: 'visible', timeout: 10000 });
  613 |             await addBtn.click();
  614 |             await this.page.waitForTimeout(500);
  615 | 
  616 |             // In dropdown menu, select "Available period"
  617 |             const periodOption = this.page.getByRole('button', { name: /Available period|Período disponible/i })
  618 |                 .or(this.page.locator('[role="menu"] button:has-text("Available period"), [role="menuitem"]:has-text("Available period")'))
  619 |                 .first();
  620 |             if (await periodOption.isVisible({ timeout: 5000 }).catch(() => false)) {
  621 |                 await periodOption.click();
  622 |                 await this.page.waitForTimeout(1000);
  623 |             }
  624 | 
  625 |             // Assert drawer or dialog is opened
  626 |             const drawer = this.page.locator('.MuiDrawer-root:visible, .MuiDialog-root:visible, [role="dialog"]:visible').last();
  627 |             await expect(drawer).toBeVisible({ timeout: 10000 });
  628 | 
  629 |             // Inside drawer, click "Add" / "Save" button without assigning professionals
  630 |             const saveBtn = drawer.getByRole('button', { name: /^Add$|^Añadir$|^Save$|^Guardar$/i })
  631 |                 .or(drawer.locator('button[type="submit"]'))
  632 |                 .last();
  633 |             if (await saveBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
  634 |                 await saveBtn.click();
  635 |                 await this.page.waitForTimeout(1000);
  636 |             }
  637 | 
  638 |             // Assert alert, error message, or required validation is displayed
  639 |             const alertOrError = this.page.locator('.MuiAlert-root, [role="alert"], .cbx-Alert, .Mui-error, [aria-invalid="true"]').first();
  640 |             await expect(alertOrError).toBeVisible({ timeout: 10000 });
  641 | 
  642 |             // Close drawer with Escape
  643 |             await this.page.keyboard.press('Escape');
  644 |             await this.page.waitForTimeout(500);
  645 |         });
  646 |     }
  647 | 
  648 |     /**
  649 |      * Gets the company Main language setting text (OVAC-5768 / XR-1627).
  650 |      */
  651 |     async getCompanyMainLanguage(): Promise<string> {
  652 |         return await test.step('Get company main language', async () => {
  653 |             const langContainer = this.page.locator('.cbx-inputText-container, .MuiFormControl-root')
  654 |                 .filter({ hasText: /Main language|Idioma principal/i })
  655 |                 .first();
  656 |             await langContainer.waitFor({ state: 'visible', timeout: 10000 });
  657 |             return (await langContainer.innerText()).trim();
  658 |         });
  659 |     }
  660 | 
  661 |     /**
  662 |      * Updates the company Main language selector (OVAC-5768 / XR-1627).
  663 |      */
  664 |     async updateCompanyMainLanguage(languageName: string = 'English') {
  665 |         await test.step(`Update company main language to: "${languageName}"`, async () => {
  666 |             const langContainer = this.page.locator('.cbx-inputText-container, .MuiFormControl-root')
  667 |                 .filter({ hasText: /Main language|Idioma principal/i })
  668 |                 .first();
```