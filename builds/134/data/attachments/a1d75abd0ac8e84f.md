# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Organization & Company Settings Tests >> The user is able to save all changes by clicking on the 'Save' button - Company settings section @XR-1626 @OVAC-5767 @regression
- Location: tests/institutions/institutionsTests.spec.ts:158:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.cbx-inputText-container').filter({ hasText: /Support email|Email de soporte/i }).locator('input').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f5e3]:
  - generic [ref=f5e4]:
    - button "" [ref=f5e5] [cursor=pointer]
    - generic [ref=f5e10]:
      - link [ref=f5e12] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=f5e13]:
          - generic [ref=f5e14]: 
          - generic [ref=f5e16]: Activity
      - link [ref=f5e18] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=f5e19]:
          - generic [ref=f5e20]: 
          - generic [ref=f5e22]: Appointments
      - link [ref=f5e24] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=f5e25]:
          - generic [ref=f5e26]: 
          - generic [ref=f5e28]: Processes
      - link [ref=f5e30] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=f5e31]:
          - generic [ref=f5e32]: 
          - generic [ref=f5e34]: Procedures
      - link [ref=f5e36] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=f5e37]:
          - generic [ref=f5e38]: 
          - generic [ref=f5e40]: Templates
      - link [ref=f5e42] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=f5e43]:
          - generic [ref=f5e44]: 
          - generic [ref=f5e46]: Documents
      - link [ref=f5e48] [cursor=pointer]:
        - /url: /company/1112/entities
        - button " Entities" [ref=f5e49]:
          - generic [ref=f5e50]: 
          - generic [ref=f5e52]: Entities
      - link [ref=f5e54] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=f5e55]:
          - generic [ref=f5e56]: 
          - generic [ref=f5e58]: Users
    - generic [ref=f5e60]:
      - img "CBX white Logo" [ref=f5e61]
      - generic [ref=f5e62]: © 2026 v8.8.0
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
              - img "Logo Virtual Citizen Service Office" [ref=f5e89]
              - generic [ref=f5e90]: 
    - generic [ref=f5e92]:
      - button "Actions" [ref=f5e95] [cursor=pointer]:
        - generic [ref=f5e96]: 
      - generic [ref=f5e98]:
        - tablist "Pestañas" [ref=f5e102]:
          - tab "Video-appointments" [selected] [ref=f5e103] [cursor=pointer]:
            - paragraph [ref=f5e105]: Video-appointments
          - tab "In-person appointments" [ref=f5e106] [cursor=pointer]:
            - paragraph [ref=f5e108]: In-person appointments
        - generic [ref=f5e110]:
          - generic [ref=f5e112]:
            - generic [ref=f5e113]:
              - generic [ref=f5e115]:
                - generic [ref=f5e118]:
                  - generic [ref=f5e119] [cursor=pointer]:
                    - generic [ref=f5e121]:
                      - generic [ref=f5e122]: 
                      - generic [ref=f5e123]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=f5e129]:
                  - generic [ref=f5e130] [cursor=pointer]:
                    - generic [ref=f5e131]: Confirmed, In progress, Pending report, Completed, In pause
                    - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                    - generic [ref=f5e132]: Status
                  - group [aria-hidden]
                - generic [ref=f5e138]:
                  - generic [ref=f5e139] [cursor=pointer]:
                    - generic [ref=f5e140]: This week
                    - combobox "Period": This week
                    - generic [ref=f5e141]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=f5e145] [cursor=pointer]:
                  - generic [ref=f5e146]: 
              - generic [ref=f5e147]:
                - generic [ref=f5e148]:
                  - paragraph [ref=f5e149]: Search by participant or record
                  - generic [ref=f5e152]:
                    - button "Search" [ref=f5e154] [cursor=pointer]:
                      - generic [ref=f5e155]: 
                    - textbox "Search by participant or record" [ref=f5e156]:
                      - /placeholder: Search
                - button "Help" [ref=f5e157] [cursor=pointer]:
                  - generic [ref=f5e158]: 
            - generic [ref=f5e166]:
              - table [ref=f5e167]:
                - rowgroup [ref=f5e168]:
                  - row [ref=f5e169]:
                    - columnheader "Selection" [ref=f5e170]
                    - columnheader "Date Date " [ref=f5e172]:
                      - generic [ref=f5e173]: Date
                      - button "Date " [ref=f5e174] [cursor=pointer]:
                        - generic [ref=f5e175]: Date
                        - generic [ref=f5e176]: 
                    - columnheader "Ref. Ref. " [ref=f5e178]:
                      - generic [ref=f5e179]: Ref.
                      - button "Ref. " [ref=f5e180] [cursor=pointer]:
                        - generic [ref=f5e181]: Ref.
                        - generic [ref=f5e182]: 
                    - columnheader "External ID External ID " [ref=f5e184]:
                      - generic [ref=f5e185]: External ID
                      - button "External ID " [ref=f5e186] [cursor=pointer]:
                        - generic [ref=f5e187]: External ID
                        - generic [ref=f5e188]: 
                    - columnheader "Record Record " [ref=f5e190]:
                      - generic [ref=f5e191]: Record
                      - button "Record " [ref=f5e192] [cursor=pointer]:
                        - generic [ref=f5e193]: Record
                        - generic [ref=f5e194]: 
                    - columnheader "Documents" [ref=f5e196]
                    - columnheader "Entity Entity " [ref=f5e197]:
                      - generic [ref=f5e198]: Entity
                      - button "Entity " [ref=f5e199] [cursor=pointer]:
                        - generic [ref=f5e200]: Entity
                        - generic [ref=f5e201]: 
                    - columnheader "Status Status " [ref=f5e203]:
                      - generic [ref=f5e204]: Status
                      - button "Status " [ref=f5e205] [cursor=pointer]:
                        - generic [ref=f5e206]: Status
                        - generic [ref=f5e207]: 
                    - columnheader "Actions [object Object]" [ref=f5e209]:
                      - generic [ref=f5e210]: Actions
                      - generic [ref=f5e213]:
                        - generic [ref=f5e214] [cursor=pointer]:
                          - generic [aria-hidden] [ref=f5e216]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=f5e218]:
                  - row [ref=f5e219] [cursor=pointer]:
                    - cell [ref=f5e220]:
                      - checkbox "Select" [ref=f5e225]
                    - cell " 28/11/2026 10:00 " [ref=f5e228]:
                      - generic [ref=f5e229]:
                        - generic [ref=f5e230]: 
                        - generic [ref=f5e233]:
                          - generic [ref=f5e234]: 28/11/2026
                          - generic [ref=f5e235]: 10:00
                        - generic [ref=f5e236]: 
                    - cell "68124" [ref=f5e239]
                    - cell [ref=f5e240]
                    - cell "11121112681242026586aa" [ref=f5e241]
                    - cell [ref=f5e242]:
                      - button "1" [ref=f5e244]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e245]
                    - cell "Confirmed" [ref=f5e248]
                    - cell [ref=f5e256]:
                      - button "More" [ref=f5e259]:
                        - generic [ref=f5e260]: 
                  - row [ref=f5e262] [cursor=pointer]:
                    - cell [ref=f5e263]:
                      - checkbox "Select" [ref=f5e268]
                    - cell " 28/11/2026 10:00 " [ref=f5e271]:
                      - generic [ref=f5e272]:
                        - generic [ref=f5e273]: 
                        - generic [ref=f5e276]:
                          - generic [ref=f5e277]: 28/11/2026
                          - generic [ref=f5e278]: 10:00
                        - generic [ref=f5e279]: 
                    - cell "68120" [ref=f5e282]
                    - cell [ref=f5e283]
                    - cell "11121112681202026a99ac" [ref=f5e284]
                    - cell [ref=f5e285]:
                      - button "1" [ref=f5e287]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e288]
                    - cell "Confirmed" [ref=f5e291]
                    - cell [ref=f5e299]:
                      - button "More" [ref=f5e302]:
                        - generic [ref=f5e303]: 
                  - row [ref=f5e305] [cursor=pointer]:
                    - cell [ref=f5e306]:
                      - checkbox "Select" [ref=f5e311]
                    - cell " 28/11/2026 10:00 " [ref=f5e314]:
                      - generic [ref=f5e315]:
                        - generic [ref=f5e316]: 
                        - generic [ref=f5e319]:
                          - generic [ref=f5e320]: 28/11/2026
                          - generic [ref=f5e321]: 10:00
                        - generic [ref=f5e322]: 
                    - cell "68123" [ref=f5e325]
                    - cell [ref=f5e326]
                    - cell "11121112681232026c8f9c" [ref=f5e327]
                    - cell [ref=f5e328]:
                      - button "1" [ref=f5e330]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e331]
                    - cell "Confirmed" [ref=f5e334]
                    - cell [ref=f5e342]:
                      - button "More" [ref=f5e345]:
                        - generic [ref=f5e346]: 
                  - row [ref=f5e348] [cursor=pointer]:
                    - cell [ref=f5e349]:
                      - checkbox "Select" [ref=f5e354]
                    - cell " 27/11/2026 18:00  " [ref=f5e357]:
                      - generic [ref=f5e358]:
                        - generic [ref=f5e359]: 
                        - generic [ref=f5e362]:
                          - generic [ref=f5e363]: 27/11/2026
                          - generic [ref=f5e364]: 18:00
                        - generic [ref=f5e365]:
                          - generic [ref=f5e366]: 
                          - generic [ref=f5e368]: 
                    - cell "68121" [ref=f5e370]
                    - cell [ref=f5e371]
                    - cell "111211126812120261b448" [ref=f5e372]
                    - cell [ref=f5e373]:
                      - button "1" [ref=f5e375]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e376]
                    - cell "Confirmed" [ref=f5e379]
                    - cell [ref=f5e387]:
                      - button "More" [ref=f5e390]:
                        - generic [ref=f5e391]: 
                  - row [ref=f5e393] [cursor=pointer]:
                    - cell [ref=f5e394]:
                      - checkbox "Select" [ref=f5e399]
                    - cell " 27/11/2026 10:15 " [ref=f5e402]:
                      - generic [ref=f5e403]:
                        - generic [ref=f5e404]: 
                        - generic [ref=f5e407]:
                          - generic [ref=f5e408]: 27/11/2026
                          - generic [ref=f5e409]: 10:15
                        - generic [ref=f5e410]: 
                    - cell "68013" [ref=f5e413]
                    - cell [ref=f5e414]
                    - cell "11121112680132026e4080" [ref=f5e415]
                    - cell [ref=f5e416]:
                      - button "1" [ref=f5e418]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e420]
                    - cell "Confirmed" [ref=f5e423]
                    - cell [ref=f5e431]:
                      - button "More" [ref=f5e434]:
                        - generic [ref=f5e435]: 
                  - row [ref=f5e437] [cursor=pointer]:
                    - cell [ref=f5e438]:
                      - checkbox "Select" [ref=f5e443]
                    - cell " 27/11/2026 10:15" [ref=f5e446]:
                      - generic [ref=f5e447]:
                        - generic [ref=f5e448]: 
                        - generic [ref=f5e451]:
                          - generic [ref=f5e452]: 27/11/2026
                          - generic [ref=f5e453]: 10:15
                    - cell "68012" [ref=f5e454]
                    - cell [ref=f5e455]
                    - cell "1112111268012202696696" [ref=f5e456]
                    - cell [ref=f5e457]:
                      - button "1" [ref=f5e459]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e461]
                    - cell "Pending report" [ref=f5e464]
                    - cell [ref=f5e472]:
                      - button "More" [ref=f5e475]:
                        - generic [ref=f5e476]: 
                  - row [ref=f5e478] [cursor=pointer]:
                    - cell [ref=f5e479]:
                      - checkbox "Select" [ref=f5e484]
                    - cell " 27/11/2026 10:00  " [ref=f5e487]:
                      - generic [ref=f5e488]:
                        - generic [ref=f5e489]: 
                        - generic [ref=f5e492]:
                          - generic [ref=f5e493]: 27/11/2026
                          - generic [ref=f5e494]: 10:00
                        - generic [ref=f5e495]:
                          - generic [ref=f5e496]: 
                          - generic [ref=f5e498]: 
                    - cell "67961" [ref=f5e500]
                    - cell [ref=f5e501]
                    - cell "111211126796120266b636" [ref=f5e502]
                    - cell [ref=f5e503]:
                      - button "1" [ref=f5e505]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e506]
                    - cell "Confirmed" [ref=f5e509]
                    - cell [ref=f5e517]:
                      - button "More" [ref=f5e520]:
                        - generic [ref=f5e521]: 
                  - row [ref=f5e523] [cursor=pointer]:
                    - cell [ref=f5e524]:
                      - checkbox "Select" [ref=f5e529]
                    - cell " 27/11/2026 10:00  " [ref=f5e532]:
                      - generic [ref=f5e533]:
                        - generic [ref=f5e534]: 
                        - generic [ref=f5e537]:
                          - generic [ref=f5e538]: 27/11/2026
                          - generic [ref=f5e539]: 10:00
                        - generic [ref=f5e540]:
                          - generic [ref=f5e541]: 
                          - generic [ref=f5e543]: 
                    - cell "67958" [ref=f5e545]
                    - cell [ref=f5e546]
                    - cell "111211126795820263f7f0" [ref=f5e547]
                    - cell [ref=f5e548]:
                      - button "1" [ref=f5e550]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e551]
                    - cell "Confirmed" [ref=f5e554]
                    - cell [ref=f5e562]:
                      - button "More" [ref=f5e565]:
                        - generic [ref=f5e566]: 
                  - row [ref=f5e568] [cursor=pointer]:
                    - cell [ref=f5e569]:
                      - checkbox "Select" [ref=f5e574]
                    - cell " 27/11/2026 10:00  " [ref=f5e577]:
                      - generic [ref=f5e578]:
                        - generic [ref=f5e579]: 
                        - generic [ref=f5e582]:
                          - generic [ref=f5e583]: 27/11/2026
                          - generic [ref=f5e584]: 10:00
                        - generic [ref=f5e585]:
                          - generic [ref=f5e586]: 
                          - generic [ref=f5e588]: 
                    - cell "67963" [ref=f5e590]
                    - cell [ref=f5e591]
                    - cell "11121112679632026e7a66" [ref=f5e592]
                    - cell [ref=f5e593]:
                      - button "1" [ref=f5e595]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e596]
                    - cell "Confirmed" [ref=f5e599]
                    - cell [ref=f5e607]:
                      - button "More" [ref=f5e610]:
                        - generic [ref=f5e611]: 
                  - row [ref=f5e613] [cursor=pointer]:
                    - cell [ref=f5e614]:
                      - checkbox "Select" [ref=f5e619]
                    - cell " 27/11/2026 10:00  " [ref=f5e622]:
                      - generic [ref=f5e623]:
                        - generic [ref=f5e624]: 
                        - generic [ref=f5e627]:
                          - generic [ref=f5e628]: 27/11/2026
                          - generic [ref=f5e629]: 10:00
                        - generic [ref=f5e630]:
                          - generic [ref=f5e631]: 
                          - generic [ref=f5e633]: 
                    - cell "67954" [ref=f5e635]
                    - cell [ref=f5e636]
                    - cell "11121112679542026ce655" [ref=f5e637]
                    - cell [ref=f5e638]:
                      - button "1" [ref=f5e640]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e641]
                    - cell "Confirmed" [ref=f5e644]
                    - cell [ref=f5e652]:
                      - button "More" [ref=f5e655]:
                        - generic [ref=f5e656]: 
                  - row [ref=f5e658] [cursor=pointer]:
                    - cell [ref=f5e659]:
                      - checkbox "Select" [ref=f5e664]
                    - cell " 27/11/2026 10:00 " [ref=f5e667]:
                      - generic [ref=f5e668]:
                        - generic [ref=f5e669]: 
                        - generic [ref=f5e672]:
                          - generic [ref=f5e673]: 27/11/2026
                          - generic [ref=f5e674]: 10:00
                        - generic [ref=f5e675]: 
                    - cell "67907" [ref=f5e678]
                    - cell [ref=f5e679]
                    - cell "-" [ref=f5e680]
                    - cell [ref=f5e681]:
                      - button "0" [ref=f5e683]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e684]
                    - cell "In progress" [ref=f5e687]
                    - cell [ref=f5e695]:
                      - button "More" [ref=f5e698]:
                        - generic [ref=f5e699]: 
                  - row [ref=f5e701] [cursor=pointer]:
                    - cell [ref=f5e702]:
                      - checkbox "Select" [ref=f5e707]
                    - cell " 27/11/2026 10:00  " [ref=f5e710]:
                      - generic [ref=f5e711]:
                        - generic [ref=f5e712]: 
                        - generic [ref=f5e715]:
                          - generic [ref=f5e716]: 27/11/2026
                          - generic [ref=f5e717]: 10:00
                        - generic [ref=f5e718]:
                          - generic [ref=f5e719]: 
                          - generic [ref=f5e721]: 
                    - cell "67957" [ref=f5e723]
                    - cell [ref=f5e724]
                    - cell "11121112679572026449db" [ref=f5e725]
                    - cell [ref=f5e726]:
                      - button "1" [ref=f5e728]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e729]
                    - cell "Confirmed" [ref=f5e732]
                    - cell [ref=f5e740]:
                      - button "More" [ref=f5e743]:
                        - generic [ref=f5e744]: 
                  - row [ref=f5e746] [cursor=pointer]:
                    - cell [ref=f5e747]:
                      - checkbox "Select" [ref=f5e752]
                    - cell " 27/11/2026 10:00  " [ref=f5e755]:
                      - generic [ref=f5e756]:
                        - generic [ref=f5e757]: 
                        - generic [ref=f5e760]:
                          - generic [ref=f5e761]: 27/11/2026
                          - generic [ref=f5e762]: 10:00
                        - generic [ref=f5e763]:
                          - generic [ref=f5e764]: 
                          - generic [ref=f5e766]: 
                    - cell "67959" [ref=f5e768]
                    - cell [ref=f5e769]
                    - cell "11121112679592026c04de" [ref=f5e770]
                    - cell [ref=f5e771]:
                      - button "1" [ref=f5e773]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e774]
                    - cell "Confirmed" [ref=f5e777]
                    - cell [ref=f5e785]:
                      - button "More" [ref=f5e788]:
                        - generic [ref=f5e789]: 
                  - row [ref=f5e791] [cursor=pointer]:
                    - cell [ref=f5e792]:
                      - checkbox "Select" [ref=f5e797]
                    - cell " 27/11/2026 10:00  " [ref=f5e800]:
                      - generic [ref=f5e801]:
                        - generic [ref=f5e802]: 
                        - generic [ref=f5e805]:
                          - generic [ref=f5e806]: 27/11/2026
                          - generic [ref=f5e807]: 10:00
                        - generic [ref=f5e808]:
                          - generic [ref=f5e809]: 
                          - generic [ref=f5e811]: 
                    - cell "67960" [ref=f5e813]
                    - cell [ref=f5e814]
                    - cell "1112111267960202641a9a" [ref=f5e815]
                    - cell [ref=f5e816]:
                      - button "1" [ref=f5e818]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e819]
                    - cell "Confirmed" [ref=f5e822]
                    - cell [ref=f5e830]:
                      - button "More" [ref=f5e833]:
                        - generic [ref=f5e834]: 
                  - row [ref=f5e836] [cursor=pointer]:
                    - cell [ref=f5e837]:
                      - checkbox "Select" [ref=f5e842]
                    - cell " 27/11/2026 10:00  " [ref=f5e845]:
                      - generic [ref=f5e846]:
                        - generic [ref=f5e847]: 
                        - generic [ref=f5e850]:
                          - generic [ref=f5e851]: 27/11/2026
                          - generic [ref=f5e852]: 10:00
                        - generic [ref=f5e853]:
                          - generic [ref=f5e854]: 
                          - generic [ref=f5e856]: 
                    - cell "67955" [ref=f5e858]
                    - cell [ref=f5e859]
                    - cell "111211126795520268efd6" [ref=f5e860]
                    - cell [ref=f5e861]:
                      - button "1" [ref=f5e863]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e864]
                    - cell "Confirmed" [ref=f5e867]
                    - cell [ref=f5e875]:
                      - button "More" [ref=f5e878]:
                        - generic [ref=f5e879]: 
                  - row [ref=f5e881] [cursor=pointer]:
                    - cell [ref=f5e882]:
                      - checkbox "Select" [ref=f5e887]
                    - cell " 27/11/2026 10:00  " [ref=f5e890]:
                      - generic [ref=f5e891]:
                        - generic [ref=f5e892]: 
                        - generic [ref=f5e895]:
                          - generic [ref=f5e896]: 27/11/2026
                          - generic [ref=f5e897]: 10:00
                        - generic [ref=f5e898]:
                          - generic [ref=f5e899]: 
                          - generic [ref=f5e901]: 
                    - cell "67965" [ref=f5e903]
                    - cell [ref=f5e904]
                    - cell "11121112679652026bc1e3" [ref=f5e905]
                    - cell [ref=f5e906]:
                      - button "1" [ref=f5e908]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e909]
                    - cell "Confirmed" [ref=f5e912]
                    - cell [ref=f5e920]:
                      - button "More" [ref=f5e923]:
                        - generic [ref=f5e924]: 
                  - row [ref=f5e926] [cursor=pointer]:
                    - cell [ref=f5e927]:
                      - checkbox "Select" [ref=f5e932]
                    - cell " 27/11/2026 10:00  " [ref=f5e935]:
                      - generic [ref=f5e936]:
                        - generic [ref=f5e937]: 
                        - generic [ref=f5e940]:
                          - generic [ref=f5e941]: 27/11/2026
                          - generic [ref=f5e942]: 10:00
                        - generic [ref=f5e943]:
                          - generic [ref=f5e944]: 
                          - generic [ref=f5e946]: 
                    - cell "67950" [ref=f5e948]
                    - cell [ref=f5e949]
                    - cell "11121112679502026f2f3b" [ref=f5e950]
                    - cell [ref=f5e951]:
                      - button "1" [ref=f5e953]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e954]
                    - cell "Confirmed" [ref=f5e957]
                    - cell [ref=f5e965]:
                      - button "More" [ref=f5e968]:
                        - generic [ref=f5e969]: 
                  - row [ref=f5e971] [cursor=pointer]:
                    - cell [ref=f5e972]:
                      - checkbox "Select" [ref=f5e977]
                    - cell " 27/11/2026 10:00  " [ref=f5e980]:
                      - generic [ref=f5e981]:
                        - generic [ref=f5e982]: 
                        - generic [ref=f5e985]:
                          - generic [ref=f5e986]: 27/11/2026
                          - generic [ref=f5e987]: 10:00
                        - generic [ref=f5e988]:
                          - generic [ref=f5e989]: 
                          - generic [ref=f5e991]: 
                    - cell "67949" [ref=f5e993]
                    - cell [ref=f5e994]
                    - cell "11121112679492026eebad" [ref=f5e995]
                    - cell [ref=f5e996]:
                      - button "1" [ref=f5e998]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e999]
                    - cell "Confirmed" [ref=f5e1002]
                    - cell [ref=f5e1010]:
                      - button "More" [ref=f5e1013]:
                        - generic [ref=f5e1014]: 
                  - row [ref=f5e1016] [cursor=pointer]:
                    - cell [ref=f5e1017]:
                      - checkbox "Select" [ref=f5e1022]
                    - cell " 27/11/2026 10:00  " [ref=f5e1025]:
                      - generic [ref=f5e1026]:
                        - generic [ref=f5e1027]: 
                        - generic [ref=f5e1030]:
                          - generic [ref=f5e1031]: 27/11/2026
                          - generic [ref=f5e1032]: 10:00
                        - generic [ref=f5e1033]:
                          - generic [ref=f5e1034]: 
                          - generic [ref=f5e1036]: 
                    - cell "67953" [ref=f5e1038]
                    - cell [ref=f5e1039]
                    - cell "11121112679532026b5a31" [ref=f5e1040]
                    - cell [ref=f5e1041]:
                      - button "1" [ref=f5e1043]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e1044]
                    - cell "Confirmed" [ref=f5e1047]
                    - cell [ref=f5e1055]:
                      - button "More" [ref=f5e1058]:
                        - generic [ref=f5e1059]: 
                  - row [ref=f5e1061] [cursor=pointer]:
                    - cell [ref=f5e1062]:
                      - checkbox "Select" [ref=f5e1067]
                    - cell " 27/11/2026 10:00  " [ref=f5e1070]:
                      - generic [ref=f5e1071]:
                        - generic [ref=f5e1072]: 
                        - generic [ref=f5e1075]:
                          - generic [ref=f5e1076]: 27/11/2026
                          - generic [ref=f5e1077]: 10:00
                        - generic [ref=f5e1078]:
                          - generic [ref=f5e1079]: 
                          - generic [ref=f5e1081]: 
                    - cell "67951" [ref=f5e1083]
                    - cell [ref=f5e1084]
                    - cell "111211126795120262b714" [ref=f5e1085]
                    - cell [ref=f5e1086]:
                      - button "1" [ref=f5e1088]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f5e1089]
                    - cell "Confirmed" [ref=f5e1092]
                    - cell [ref=f5e1100]:
                      - button "More" [ref=f5e1103]:
                        - generic [ref=f5e1104]: 
              - generic [ref=f5e1106]:
                - generic [ref=f5e1107]: 1 - 20 of 145
                - navigation "Paginación de resultados" [ref=f5e1110]:
                  - generic [ref=f5e1111]:
                    - button "Página 1" [ref=f5e1112] [cursor=pointer]: "1"
                    - button "Página 2" [ref=f5e1113] [cursor=pointer]: "2"
                    - button "Página 3" [ref=f5e1114] [cursor=pointer]: "3"
                    - generic [ref=f5e1118]:
                      - generic [ref=f5e1119] [cursor=pointer]:
                        - generic [ref=f5e1120]: ...
                        - combobox "Ir a otra página": ...
                      - group [aria-hidden]
                    - button "Página 6" [ref=f5e1122] [cursor=pointer]: "6"
                    - button "Página 7" [ref=f5e1123] [cursor=pointer]: "7"
                    - button "Página 8" [ref=f5e1124] [cursor=pointer]: "8"
                  - button "Página siguiente" [ref=f5e1126] [cursor=pointer]:
                    - generic [aria-hidden] [ref=f5e1127]: 
          - generic [ref=f5e1129]:
            - generic [ref=f5e1130] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=f5e1131] [cursor=pointer]: Privacy policy
          - generic [ref=f5e1132]:
            - generic [ref=f5e1133]:
              - generic [ref=f5e1134] [cursor=pointer]: 
              - generic [ref=f5e1136]: 0 selected
            - generic [ref=f5e1139] [cursor=pointer]:
              - generic [ref=f5e1141]: 
              - generic [ref=f5e1142]: SELECT ALL
```

# Test source

```ts
  320 |             const editBtn = this.page.getByRole('button', { name: /Edit|Editar/i })
  321 |                 .or(this.page.locator('[role="menuitem"]:has-text("Edit"), button:has-text("Edit")'))
  322 |                 .first();
  323 |             await editBtn.waitFor({ state: 'visible', timeout: 5000 });
  324 |             await editBtn.click();
  325 | 
  326 |             await this.page.waitForURL(/\/companies\/edit\/\d+/i, { timeout: 10000 });
  327 |         });
  328 |     }
  329 | 
  330 |     /**
  331 |      * Navigates to Administration -> Agenda tab (XR-2697).
  332 |      */
  333 |     async navigateToAdministrationAgenda() {
  334 |         await test.step('Navigate to Administration -> Agenda tab', async () => {
  335 |             const adminTab = this.page.getByRole('button', { name: /Administration|Administración/i }).first();
  336 |             await adminTab.waitFor({ state: 'visible', timeout: 10000 });
  337 |             await adminTab.click();
  338 |             await this.page.waitForTimeout(1000);
  339 | 
  340 |             if (!this.page.url().includes('/administration/schedule')) {
  341 |                 const agendaTab = this.page.locator('button[role="tab"]:has-text("Agenda"), [role="tab"]:has-text("Agenda"), button:has-text("Agenda")').first();
  342 |                 await agendaTab.waitFor({ state: 'visible', timeout: 10000 });
  343 |                 await agendaTab.click();
  344 |             }
  345 |             await this.page.waitForURL(/\/administration\/schedule/i, { timeout: 10000 });
  346 |             await this.page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 10000 });
  347 |         });
  348 |     }
  349 | 
  350 |     /**
  351 |      * Opens the edit drawer for the first available schedule period (XR-2697).
  352 |      */
  353 |     async openEditSchedulePeriod() {
  354 |         await test.step('Open edit schedule period drawer', async () => {
  355 |             const firstRow = this.page.locator('table tbody tr').first();
  356 |             await firstRow.waitFor({ state: 'visible', timeout: 10000 });
  357 |             const threeDotsBtn = firstRow.locator('td:last-child button, button:has(.ri-more-2-line), button:has(.ri-more-fill), button:has(.ri-more-2-fill), button[aria-label*="Botón" i]').first();
  358 |             await threeDotsBtn.click();
  359 |             await this.page.waitForTimeout(400);
  360 | 
  361 |             const editOption = this.page.getByRole('button', { name: /Edit|Editar/i })
  362 |                 .or(this.page.locator('#schedule_edit_button, button:has-text("Edit"), [role="menuitem"]:has-text("Edit"), [role="button"]:has-text("Edit")'))
  363 |                 .first();
  364 |             await editOption.waitFor({ state: 'visible', timeout: 5000 });
  365 |             await editOption.click();
  366 |             await this.page.waitForTimeout(600);
  367 |         });
  368 |     }
  369 | 
  370 |     /**
  371 |      * Sets the Minimum notice (advance time) in the schedule period edit drawer (XR-2697).
  372 |      */
  373 |     async setMinimumAdvanceNotice(value: string | number) {
  374 |         await test.step(`Set minimum advance notice to ${value}`, async () => {
  375 |             const noticeInput = this.page.getByRole('spinbutton', { name: /Minimum notice|Antelación mínima/i })
  376 |                 .or(this.page.locator('input[name*="notice" i]'))
  377 |                 .or(this.page.locator('.MuiFormControl-root').filter({ hasText: /Minimum notice|Antelación mínima/i }).locator('input'))
  378 |                 .first();
  379 |             await noticeInput.waitFor({ state: 'visible', timeout: 10000 });
  380 |             await noticeInput.clear();
  381 |             await noticeInput.fill(value.toString());
  382 |         });
  383 |     }
  384 | 
  385 |     /**
  386 |      * Saves the schedule period adjustments (XR-2697).
  387 |      */
  388 |     async saveSchedulePeriod() {
  389 |         await test.step('Save schedule period adjustments', async () => {
  390 |             const saveBtn = this.page.getByRole('button', { name: /Save|Guardar/i })
  391 |                 .or(this.page.locator('#panel-confirm-button-accept, button:has-text("SAVE"), button:has-text("GUARDAR")'))
  392 |                 .first();
  393 |             await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
  394 |             await saveBtn.click();
  395 |             await this.page.waitForTimeout(1000);
  396 |             await this.dismissToastOrModal();
  397 |         });
  398 |     }
  399 | 
  400 |     /**
  401 |      * Navigates to the company settings page (XR-2605 / XR-1626).
  402 |      */
  403 |     async navigateToCompanySettings(companyId: number = 1112) {
  404 |         await test.step(`Navigate to company #${companyId} settings page`, async () => {
  405 |             await this.page.goto(`https://qa.ovac.pre.councilbox.com/company/${companyId}/companies/edit/${companyId}/general/settings`);
  406 |             await this.page.waitForLoadState('networkidle');
  407 |             await this.dismissToastOrModal();
  408 |         });
  409 |     }
  410 | 
  411 |     /**
  412 |      * Gets the Support Email from company settings (XR-2605).
  413 |      */
  414 |     async getSupportEmail(): Promise<string> {
  415 |         return await test.step('Get current support email', async () => {
  416 |             const supportEmailInput = this.page.locator('.cbx-inputText-container')
  417 |                 .filter({ hasText: /Support email|Email de soporte/i })
  418 |                 .locator('input')
  419 |                 .first();
> 420 |             await supportEmailInput.waitFor({ state: 'visible', timeout: 10000 });
      |                                     ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  421 |             return await supportEmailInput.inputValue();
  422 |         });
  423 |     }
  424 | 
  425 |     /**
  426 |      * Updates the Support Email in company settings (XR-2605).
  427 |      */
  428 |     async updateSupportEmail(email: string) {
  429 |         await test.step(`Update support email to: ${email}`, async () => {
  430 |             const supportEmailInput = this.page.locator('.cbx-inputText-container')
  431 |                 .filter({ hasText: /Support email|Email de soporte/i })
  432 |                 .locator('input')
  433 |                 .first();
  434 |             await supportEmailInput.waitFor({ state: 'visible', timeout: 10000 });
  435 |             await supportEmailInput.fill(email);
  436 |             await supportEmailInput.blur();
  437 |         });
  438 |     }
  439 | 
  440 |     /**
  441 |      * Saves the company settings form (XR-1626 / XR-2605).
  442 |      */
  443 |     async saveCompanySettings() {
  444 |         await test.step('Save company settings', async () => {
  445 |             const saveBtn = this.page.getByRole('button', { name: /^Save$|^Guardar$/i })
  446 |                 .or(this.page.locator('button').filter({ hasText: /^Save$|^Guardar$/i }))
  447 |                 .first();
  448 |             await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
  449 |             await saveBtn.click();
  450 |             await this.page.waitForTimeout(1000);
  451 |         });
  452 |     }
  453 | 
  454 |     /**
  455 |      * Verifies the success alert after saving company settings (XR-1626 / XR-2605).
  456 |      */
  457 |     async verifyCompanySettingsSavedAlert() {
  458 |         await test.step('Verify company settings saved alert', async () => {
  459 |             const alert = this.page.locator('[role="alert"], [class*="snackbar"], [class*="toast"]').first();
  460 |             await expect(alert).toBeVisible({ timeout: 10000 });
  461 |             await expect(alert).toContainText(/saved successfully|guardado con éxito|correctamente/i);
  462 |         });
  463 |     }
  464 | 
  465 |     /**
  466 |      * Gets the company Name input value (OVAC-5741 / XR-1630).
  467 |      */
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
```