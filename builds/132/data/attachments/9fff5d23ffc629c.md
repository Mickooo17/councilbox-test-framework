# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Organization & Company Settings Tests >> The user can add or edit support email for organization @XR-2605 @OVAC-5387 @smoke @regression
- Location: tests/institutions/institutionsTests.spec.ts:139:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.cbx-inputText-container').filter({ hasText: /Support email|Email de soporte/i }).locator('input').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f7e3]:
  - generic [ref=f7e4]:
    - button "" [ref=f7e5] [cursor=pointer]
    - generic [ref=f7e10]:
      - link [ref=f7e12] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=f7e13]:
          - generic [ref=f7e14]: 
          - generic [ref=f7e16]: Activity
      - link [ref=f7e18] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=f7e19]:
          - generic [ref=f7e20]: 
          - generic [ref=f7e22]: Appointments
      - link [ref=f7e24] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=f7e25]:
          - generic [ref=f7e26]: 
          - generic [ref=f7e28]: Processes
      - link [ref=f7e30] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=f7e31]:
          - generic [ref=f7e32]: 
          - generic [ref=f7e34]: Procedures
      - link [ref=f7e36] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=f7e37]:
          - generic [ref=f7e38]: 
          - generic [ref=f7e40]: Templates
      - link [ref=f7e42] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=f7e43]:
          - generic [ref=f7e44]: 
          - generic [ref=f7e46]: Documents
      - link [ref=f7e48] [cursor=pointer]:
        - /url: /company/1112/entities
        - button " Entities" [ref=f7e49]:
          - generic [ref=f7e50]: 
          - generic [ref=f7e52]: Entities
      - link [ref=f7e54] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=f7e55]:
          - generic [ref=f7e56]: 
          - generic [ref=f7e58]: Users
    - generic [ref=f7e60]:
      - img "CBX white Logo" [ref=f7e61]
      - generic [ref=f7e62]: © 2026 v8.8.0
  - generic [ref=f7e64]:
    - banner [ref=f7e65]:
      - button [ref=f7e67] [cursor=pointer]:
        - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e68]
      - generic [ref=f7e69]: Grupo Castelar Servicios Legales y Financieros S.A
      - generic [ref=f7e75]:
        - button [ref=f7e78] [cursor=pointer]:
          - button "Notifications" [ref=f7e79]:
            - generic [ref=f7e80]: 
        - button [ref=f7e82] [cursor=pointer]:
          - button "Button user" [ref=f7e84]:
            - generic [ref=f7e87]:
              - img "Logo Virtual Citizen Service Office" [ref=f7e89]
              - generic [ref=f7e90]: 
    - generic [ref=f7e92]:
      - button "Actions" [ref=f7e95] [cursor=pointer]:
        - generic [ref=f7e96]: 
      - generic [ref=f7e98]:
        - tablist "Pestañas" [ref=f7e102]:
          - tab "Video-appointments" [selected] [ref=f7e103] [cursor=pointer]:
            - paragraph [ref=f7e105]: Video-appointments
          - tab "In-person appointments" [ref=f7e106] [cursor=pointer]:
            - paragraph [ref=f7e108]: In-person appointments
        - generic [ref=f7e110]:
          - generic [ref=f7e112]:
            - generic [ref=f7e113]:
              - generic [ref=f7e115]:
                - generic [ref=f7e118]:
                  - generic [ref=f7e119] [cursor=pointer]:
                    - generic [ref=f7e121]:
                      - generic [ref=f7e122]: 
                      - generic [ref=f7e123]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=f7e129]:
                  - generic [ref=f7e130] [cursor=pointer]:
                    - generic [ref=f7e131]: Confirmed, In progress, Pending report, Completed, In pause
                    - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                    - generic [ref=f7e132]: Status
                  - group [aria-hidden]
                - generic [ref=f7e138]:
                  - generic [ref=f7e139] [cursor=pointer]:
                    - generic [ref=f7e140]: This week
                    - combobox "Period": This week
                    - generic [ref=f7e141]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=f7e145] [cursor=pointer]:
                  - generic [ref=f7e146]: 
              - generic [ref=f7e147]:
                - generic [ref=f7e148]:
                  - paragraph [ref=f7e149]: Search by participant or record
                  - generic [ref=f7e152]:
                    - button "Search" [ref=f7e154] [cursor=pointer]:
                      - generic [ref=f7e155]: 
                    - textbox "Search by participant or record" [ref=f7e156]:
                      - /placeholder: Search
                - button "Help" [ref=f7e157] [cursor=pointer]:
                  - generic [ref=f7e158]: 
            - generic [ref=f7e166]:
              - table [ref=f7e167]:
                - rowgroup [ref=f7e168]:
                  - row [ref=f7e169]:
                    - columnheader "Selection" [ref=f7e170]
                    - columnheader "Date Date " [ref=f7e172]:
                      - generic [ref=f7e173]: Date
                      - button "Date " [ref=f7e174] [cursor=pointer]:
                        - generic [ref=f7e175]: Date
                        - generic [ref=f7e176]: 
                    - columnheader "Ref. Ref. " [ref=f7e178]:
                      - generic [ref=f7e179]: Ref.
                      - button "Ref. " [ref=f7e180] [cursor=pointer]:
                        - generic [ref=f7e181]: Ref.
                        - generic [ref=f7e182]: 
                    - columnheader "External ID External ID " [ref=f7e184]:
                      - generic [ref=f7e185]: External ID
                      - button "External ID " [ref=f7e186] [cursor=pointer]:
                        - generic [ref=f7e187]: External ID
                        - generic [ref=f7e188]: 
                    - columnheader "Record Record " [ref=f7e190]:
                      - generic [ref=f7e191]: Record
                      - button "Record " [ref=f7e192] [cursor=pointer]:
                        - generic [ref=f7e193]: Record
                        - generic [ref=f7e194]: 
                    - columnheader "Documents" [ref=f7e196]
                    - columnheader "Entity Entity " [ref=f7e197]:
                      - generic [ref=f7e198]: Entity
                      - button "Entity " [ref=f7e199] [cursor=pointer]:
                        - generic [ref=f7e200]: Entity
                        - generic [ref=f7e201]: 
                    - columnheader "Status Status " [ref=f7e203]:
                      - generic [ref=f7e204]: Status
                      - button "Status " [ref=f7e205] [cursor=pointer]:
                        - generic [ref=f7e206]: Status
                        - generic [ref=f7e207]: 
                    - columnheader "Actions [object Object]" [ref=f7e209]:
                      - generic [ref=f7e210]: Actions
                      - generic [ref=f7e213]:
                        - generic [ref=f7e214] [cursor=pointer]:
                          - generic [aria-hidden] [ref=f7e216]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=f7e218]:
                  - row [ref=f7e219] [cursor=pointer]:
                    - cell [ref=f7e220]:
                      - checkbox "Select" [ref=f7e225]
                    - cell " 27/11/2026 10:00 " [ref=f7e228]:
                      - generic [ref=f7e229]:
                        - generic [ref=f7e230]: 
                        - generic [ref=f7e233]:
                          - generic [ref=f7e234]: 27/11/2026
                          - generic [ref=f7e235]: 10:00
                        - generic [ref=f7e236]: 
                    - cell "67950" [ref=f7e239]
                    - cell [ref=f7e240]
                    - cell "11121112679502026f2f3b" [ref=f7e241]
                    - cell [ref=f7e242]:
                      - button "1" [ref=f7e244]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e245]
                    - cell "Confirmed" [ref=f7e248]
                    - cell [ref=f7e256]:
                      - button "More" [ref=f7e259]:
                        - generic [ref=f7e260]: 
                  - row [ref=f7e262] [cursor=pointer]:
                    - cell [ref=f7e263]:
                      - checkbox "Select" [ref=f7e268]
                    - cell " 27/11/2026 10:00 " [ref=f7e271]:
                      - generic [ref=f7e272]:
                        - generic [ref=f7e273]: 
                        - generic [ref=f7e276]:
                          - generic [ref=f7e277]: 27/11/2026
                          - generic [ref=f7e278]: 10:00
                        - generic [ref=f7e279]: 
                    - cell "67949" [ref=f7e282]
                    - cell [ref=f7e283]
                    - cell "11121112679492026eebad" [ref=f7e284]
                    - cell [ref=f7e285]:
                      - button "1" [ref=f7e287]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e288]
                    - cell "Confirmed" [ref=f7e291]
                    - cell [ref=f7e299]:
                      - button "More" [ref=f7e302]:
                        - generic [ref=f7e303]: 
                  - row [ref=f7e305] [cursor=pointer]:
                    - cell [ref=f7e306]:
                      - checkbox "Select" [ref=f7e311]
                    - cell " 27/11/2026 10:00" [ref=f7e314]:
                      - generic [ref=f7e315]:
                        - generic [ref=f7e316]: 
                        - generic [ref=f7e319]:
                          - generic [ref=f7e320]: 27/11/2026
                          - generic [ref=f7e321]: 10:00
                    - cell "67907" [ref=f7e322]
                    - cell [ref=f7e323]
                    - cell "-" [ref=f7e324]
                    - cell [ref=f7e325]:
                      - button "0" [ref=f7e327]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e328]
                    - cell "Confirmed" [ref=f7e331]
                    - cell [ref=f7e339]:
                      - button "More" [ref=f7e342]:
                        - generic [ref=f7e343]: 
                  - row [ref=f7e345] [cursor=pointer]:
                    - cell [ref=f7e346]:
                      - checkbox "Select" [ref=f7e351]
                    - cell " 27/11/2026 10:00 " [ref=f7e354]:
                      - generic [ref=f7e355]:
                        - generic [ref=f7e356]: 
                        - generic [ref=f7e359]:
                          - generic [ref=f7e360]: 27/11/2026
                          - generic [ref=f7e361]: 10:00
                        - generic [ref=f7e362]: 
                    - cell "67945" [ref=f7e365]
                    - cell [ref=f7e366]
                    - cell "111211126794520265c4f0" [ref=f7e367]
                    - cell [ref=f7e368]:
                      - button "1" [ref=f7e370]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e371]
                    - cell "Confirmed" [ref=f7e374]
                    - cell [ref=f7e382]:
                      - button "More" [ref=f7e385]:
                        - generic [ref=f7e386]: 
                  - row [ref=f7e388] [cursor=pointer]:
                    - cell [ref=f7e389]:
                      - checkbox "Select" [ref=f7e394]
                    - cell " 27/11/2026 09:00" [ref=f7e397]:
                      - generic [ref=f7e398]:
                        - generic [ref=f7e399]: 
                        - generic [ref=f7e402]:
                          - generic [ref=f7e403]: 27/11/2026
                          - generic [ref=f7e404]: 09:00
                    - cell "67811" [ref=f7e405]
                    - cell [ref=f7e406]
                    - cell "111211126781120269bcf2" [ref=f7e407]
                    - cell [ref=f7e408]:
                      - button "3" [ref=f7e410]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e411]
                    - cell "Confirmed" [ref=f7e414]
                    - cell [ref=f7e422]:
                      - button "More" [ref=f7e425]:
                        - generic [ref=f7e426]: 
                  - row [ref=f7e428] [cursor=pointer]:
                    - cell [ref=f7e429]:
                      - checkbox "Select" [ref=f7e434]
                    - cell " 26/11/2026 10:00  " [ref=f7e437]:
                      - generic [ref=f7e438]:
                        - generic [ref=f7e439]: 
                        - generic [ref=f7e442]:
                          - generic [ref=f7e443]: 26/11/2026
                          - generic [ref=f7e444]: 10:00
                        - generic [ref=f7e445]:
                          - generic [ref=f7e446]: 
                          - generic [ref=f7e448]: 
                    - cell "67931" [ref=f7e450]
                    - cell [ref=f7e451]
                    - cell "1112111267931202662eac" [ref=f7e452]
                    - cell [ref=f7e453]:
                      - button "1" [ref=f7e455]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e456]
                    - cell "Confirmed" [ref=f7e459]
                    - cell [ref=f7e467]:
                      - button "More" [ref=f7e470]:
                        - generic [ref=f7e471]: 
                  - row [ref=f7e473] [cursor=pointer]:
                    - cell [ref=f7e474]:
                      - checkbox "Select" [ref=f7e479]
                    - cell " 26/11/2026 10:00  " [ref=f7e482]:
                      - generic [ref=f7e483]:
                        - generic [ref=f7e484]: 
                        - generic [ref=f7e487]:
                          - generic [ref=f7e488]: 26/11/2026
                          - generic [ref=f7e489]: 10:00
                        - generic [ref=f7e490]:
                          - generic [ref=f7e491]: 
                          - generic [ref=f7e493]: 
                    - cell "67933" [ref=f7e495]
                    - cell [ref=f7e496]
                    - cell "11121112679332026693a6" [ref=f7e497]
                    - cell [ref=f7e498]:
                      - button "1" [ref=f7e500]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e501]
                    - cell "Confirmed" [ref=f7e504]
                    - cell [ref=f7e512]:
                      - button "More" [ref=f7e515]:
                        - generic [ref=f7e516]: 
                  - row [ref=f7e518] [cursor=pointer]:
                    - cell [ref=f7e519]:
                      - checkbox "Select" [ref=f7e524]
                    - cell " 26/11/2026 10:00  " [ref=f7e527]:
                      - generic [ref=f7e528]:
                        - generic [ref=f7e529]: 
                        - generic [ref=f7e532]:
                          - generic [ref=f7e533]: 26/11/2026
                          - generic [ref=f7e534]: 10:00
                        - generic [ref=f7e535]:
                          - generic [ref=f7e536]: 
                          - generic [ref=f7e538]: 
                    - cell "67934" [ref=f7e540]
                    - cell [ref=f7e541]
                    - cell "11121112679342026ca440" [ref=f7e542]
                    - cell [ref=f7e543]:
                      - button "1" [ref=f7e545]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e546]
                    - cell "Confirmed" [ref=f7e549]
                    - cell [ref=f7e557]:
                      - button "More" [ref=f7e560]:
                        - generic [ref=f7e561]: 
                  - row [ref=f7e563] [cursor=pointer]:
                    - cell [ref=f7e564]:
                      - checkbox "Select" [ref=f7e569]
                    - cell " 26/11/2026 10:00  " [ref=f7e572]:
                      - generic [ref=f7e573]:
                        - generic [ref=f7e574]: 
                        - generic [ref=f7e577]:
                          - generic [ref=f7e578]: 26/11/2026
                          - generic [ref=f7e579]: 10:00
                        - generic [ref=f7e580]:
                          - generic [ref=f7e581]: 
                          - generic [ref=f7e583]: 
                    - cell "67924" [ref=f7e585]
                    - cell [ref=f7e586]
                    - cell "111211126792420266071f" [ref=f7e587]
                    - cell [ref=f7e588]:
                      - button "1" [ref=f7e590]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e591]
                    - cell "Confirmed" [ref=f7e594]
                    - cell [ref=f7e602]:
                      - button "More" [ref=f7e605]:
                        - generic [ref=f7e606]: 
                  - row [ref=f7e608] [cursor=pointer]:
                    - cell [ref=f7e609]:
                      - checkbox "Select" [ref=f7e614]
                    - cell " 26/11/2026 10:00  " [ref=f7e617]:
                      - generic [ref=f7e618]:
                        - generic [ref=f7e619]: 
                        - generic [ref=f7e622]:
                          - generic [ref=f7e623]: 26/11/2026
                          - generic [ref=f7e624]: 10:00
                        - generic [ref=f7e625]:
                          - generic [ref=f7e626]: 
                          - generic [ref=f7e628]: 
                    - cell "67923" [ref=f7e630]
                    - cell [ref=f7e631]
                    - cell "11121112679232026e8c07" [ref=f7e632]
                    - cell [ref=f7e633]:
                      - button "1" [ref=f7e635]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e636]
                    - cell "Confirmed" [ref=f7e639]
                    - cell [ref=f7e647]:
                      - button "More" [ref=f7e650]:
                        - generic [ref=f7e651]: 
                  - row [ref=f7e653] [cursor=pointer]:
                    - cell [ref=f7e654]:
                      - checkbox "Select" [ref=f7e659]
                    - cell " 26/11/2026 10:00  " [ref=f7e662]:
                      - generic [ref=f7e663]:
                        - generic [ref=f7e664]: 
                        - generic [ref=f7e667]:
                          - generic [ref=f7e668]: 26/11/2026
                          - generic [ref=f7e669]: 10:00
                        - generic [ref=f7e670]:
                          - generic [ref=f7e671]: 
                          - generic [ref=f7e673]: 
                    - cell "67928" [ref=f7e675]
                    - cell [ref=f7e676]
                    - cell "11121112679282026ce3ab" [ref=f7e677]
                    - cell [ref=f7e678]:
                      - button "1" [ref=f7e680]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e681]
                    - cell "Confirmed" [ref=f7e684]
                    - cell [ref=f7e692]:
                      - button "More" [ref=f7e695]:
                        - generic [ref=f7e696]: 
                  - row [ref=f7e698] [cursor=pointer]:
                    - cell [ref=f7e699]:
                      - checkbox "Select" [ref=f7e704]
                    - cell " 26/11/2026 10:00  " [ref=f7e707]:
                      - generic [ref=f7e708]:
                        - generic [ref=f7e709]: 
                        - generic [ref=f7e712]:
                          - generic [ref=f7e713]: 26/11/2026
                          - generic [ref=f7e714]: 10:00
                        - generic [ref=f7e715]:
                          - generic [ref=f7e716]: 
                          - generic [ref=f7e718]: 
                    - cell "67927" [ref=f7e720]
                    - cell [ref=f7e721]
                    - cell "111211126792720269dfb6" [ref=f7e722]
                    - cell [ref=f7e723]:
                      - button "1" [ref=f7e725]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e726]
                    - cell "Confirmed" [ref=f7e729]
                    - cell [ref=f7e737]:
                      - button "More" [ref=f7e740]:
                        - generic [ref=f7e741]: 
                  - row [ref=f7e743] [cursor=pointer]:
                    - cell [ref=f7e744]:
                      - checkbox "Select" [ref=f7e749]
                    - cell " 26/11/2026 10:00  " [ref=f7e752]:
                      - generic [ref=f7e753]:
                        - generic [ref=f7e754]: 
                        - generic [ref=f7e757]:
                          - generic [ref=f7e758]: 26/11/2026
                          - generic [ref=f7e759]: 10:00
                        - generic [ref=f7e760]:
                          - generic [ref=f7e761]: 
                          - generic [ref=f7e763]: 
                    - cell "67929" [ref=f7e765]
                    - cell [ref=f7e766]
                    - cell "111211126792920265c95d" [ref=f7e767]
                    - cell [ref=f7e768]:
                      - button "1" [ref=f7e770]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e771]
                    - cell "Confirmed" [ref=f7e774]
                    - cell [ref=f7e782]:
                      - button "More" [ref=f7e785]:
                        - generic [ref=f7e786]: 
                  - row [ref=f7e788] [cursor=pointer]:
                    - cell [ref=f7e789]:
                      - checkbox "Select" [ref=f7e794]
                    - cell " 26/11/2026 10:00  " [ref=f7e797]:
                      - generic [ref=f7e798]:
                        - generic [ref=f7e799]: 
                        - generic [ref=f7e802]:
                          - generic [ref=f7e803]: 26/11/2026
                          - generic [ref=f7e804]: 10:00
                        - generic [ref=f7e805]:
                          - generic [ref=f7e806]: 
                          - generic [ref=f7e808]: 
                    - cell "67930" [ref=f7e810]
                    - cell [ref=f7e811]
                    - cell "11121112679302026225c7" [ref=f7e812]
                    - cell [ref=f7e813]:
                      - button "1" [ref=f7e815]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e816]
                    - cell "Confirmed" [ref=f7e819]
                    - cell [ref=f7e827]:
                      - button "More" [ref=f7e830]:
                        - generic [ref=f7e831]: 
                  - row [ref=f7e833] [cursor=pointer]:
                    - cell [ref=f7e834]:
                      - checkbox "Select" [ref=f7e839]
                    - cell " 26/11/2026 10:00  " [ref=f7e842]:
                      - generic [ref=f7e843]:
                        - generic [ref=f7e844]: 
                        - generic [ref=f7e847]:
                          - generic [ref=f7e848]: 26/11/2026
                          - generic [ref=f7e849]: 10:00
                        - generic [ref=f7e850]:
                          - generic [ref=f7e851]: 
                          - generic [ref=f7e853]: 
                    - cell "67925" [ref=f7e855]
                    - cell [ref=f7e856]
                    - cell "111211126792520260d103" [ref=f7e857]
                    - cell [ref=f7e858]:
                      - button "1" [ref=f7e860]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e861]
                    - cell "Confirmed" [ref=f7e864]
                    - cell [ref=f7e872]:
                      - button "More" [ref=f7e875]:
                        - generic [ref=f7e876]: 
                  - row [ref=f7e878] [cursor=pointer]:
                    - cell [ref=f7e879]:
                      - checkbox "Select" [ref=f7e884]
                    - cell " 26/11/2026 10:00  " [ref=f7e887]:
                      - generic [ref=f7e888]:
                        - generic [ref=f7e889]: 
                        - generic [ref=f7e892]:
                          - generic [ref=f7e893]: 26/11/2026
                          - generic [ref=f7e894]: 10:00
                        - generic [ref=f7e895]:
                          - generic [ref=f7e896]: 
                          - generic [ref=f7e898]: 
                    - cell "67919" [ref=f7e900]
                    - cell [ref=f7e901]
                    - cell "1112111267919202659e67" [ref=f7e902]
                    - cell [ref=f7e903]:
                      - button "1" [ref=f7e905]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e906]
                    - cell "Confirmed" [ref=f7e909]
                    - cell [ref=f7e917]:
                      - button "More" [ref=f7e920]:
                        - generic [ref=f7e921]: 
                  - row [ref=f7e923] [cursor=pointer]:
                    - cell [ref=f7e924]:
                      - checkbox "Select" [ref=f7e929]
                    - cell " 26/11/2026 10:00  " [ref=f7e932]:
                      - generic [ref=f7e933]:
                        - generic [ref=f7e934]: 
                        - generic [ref=f7e937]:
                          - generic [ref=f7e938]: 26/11/2026
                          - generic [ref=f7e939]: 10:00
                        - generic [ref=f7e940]:
                          - generic [ref=f7e941]: 
                          - generic [ref=f7e943]: 
                    - cell "67920" [ref=f7e945]
                    - cell [ref=f7e946]
                    - cell "1112111267920202647e1b" [ref=f7e947]
                    - cell [ref=f7e948]:
                      - button "1" [ref=f7e950]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e951]
                    - cell "Confirmed" [ref=f7e954]
                    - cell [ref=f7e962]:
                      - button "More" [ref=f7e965]:
                        - generic [ref=f7e966]: 
                  - row [ref=f7e968] [cursor=pointer]:
                    - cell [ref=f7e969]:
                      - checkbox "Select" [ref=f7e974]
                    - cell " 26/11/2026 10:00  " [ref=f7e977]:
                      - generic [ref=f7e978]:
                        - generic [ref=f7e979]: 
                        - generic [ref=f7e982]:
                          - generic [ref=f7e983]: 26/11/2026
                          - generic [ref=f7e984]: 10:00
                        - generic [ref=f7e985]:
                          - generic [ref=f7e986]: 
                          - generic [ref=f7e988]: 
                    - cell "67921" [ref=f7e990]
                    - cell [ref=f7e991]
                    - cell "111211126792120261faab" [ref=f7e992]
                    - cell [ref=f7e993]:
                      - button "1" [ref=f7e995]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e996]
                    - cell "Confirmed" [ref=f7e999]
                    - cell [ref=f7e1007]:
                      - button "More" [ref=f7e1010]:
                        - generic [ref=f7e1011]: 
                  - row [ref=f7e1013] [cursor=pointer]:
                    - cell [ref=f7e1014]:
                      - checkbox "Select" [ref=f7e1019]
                    - cell " 26/11/2026 10:00  " [ref=f7e1022]:
                      - generic [ref=f7e1023]:
                        - generic [ref=f7e1024]: 
                        - generic [ref=f7e1027]:
                          - generic [ref=f7e1028]: 26/11/2026
                          - generic [ref=f7e1029]: 10:00
                        - generic [ref=f7e1030]:
                          - generic [ref=f7e1031]: 
                          - generic [ref=f7e1033]: 
                    - cell "67922" [ref=f7e1035]
                    - cell [ref=f7e1036]
                    - cell "11121112679222026daf73" [ref=f7e1037]
                    - cell [ref=f7e1038]:
                      - button "1" [ref=f7e1040]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e1041]
                    - cell "Confirmed" [ref=f7e1044]
                    - cell [ref=f7e1052]:
                      - button "More" [ref=f7e1055]:
                        - generic [ref=f7e1056]: 
                  - row [ref=f7e1058] [cursor=pointer]:
                    - cell [ref=f7e1059]:
                      - checkbox "Select" [ref=f7e1064]
                    - cell " 26/11/2026 10:00  " [ref=f7e1067]:
                      - generic [ref=f7e1068]:
                        - generic [ref=f7e1069]: 
                        - generic [ref=f7e1072]:
                          - generic [ref=f7e1073]: 26/11/2026
                          - generic [ref=f7e1074]: 10:00
                        - generic [ref=f7e1075]:
                          - generic [ref=f7e1076]: 
                          - generic [ref=f7e1078]: 
                    - cell "67915" [ref=f7e1080]
                    - cell [ref=f7e1081]
                    - cell "11121112679152026a147a" [ref=f7e1082]
                    - cell [ref=f7e1083]:
                      - button "1" [ref=f7e1085]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f7e1086]
                    - cell "Confirmed" [ref=f7e1089]
                    - cell [ref=f7e1097]:
                      - button "More" [ref=f7e1100]:
                        - generic [ref=f7e1101]: 
              - generic [ref=f7e1103]:
                - generic [ref=f7e1104]: 1 - 20 of 100
                - navigation "Paginación de resultados" [ref=f7e1107]:
                  - generic [ref=f7e1108]:
                    - button "Página 1" [ref=f7e1109] [cursor=pointer]: "1"
                    - button "Página 2" [ref=f7e1110] [cursor=pointer]: "2"
                    - button "Página 3" [ref=f7e1111] [cursor=pointer]: "3"
                    - button "Página 4" [ref=f7e1112] [cursor=pointer]: "4"
                    - button "Página 5" [ref=f7e1113] [cursor=pointer]: "5"
                  - button "Página siguiente" [ref=f7e1115] [cursor=pointer]:
                    - generic [aria-hidden] [ref=f7e1116]: 
          - generic [ref=f7e1118]:
            - generic [ref=f7e1119] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=f7e1120] [cursor=pointer]: Privacy policy
          - generic [ref=f7e1121]:
            - generic [ref=f7e1122]:
              - generic [ref=f7e1123] [cursor=pointer]: 
              - generic [ref=f7e1125]: 0 selected
            - generic [ref=f7e1128] [cursor=pointer]:
              - generic [ref=f7e1130]: 
              - generic [ref=f7e1131]: SELECT ALL
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