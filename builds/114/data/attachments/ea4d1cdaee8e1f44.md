# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/users/usersTests.spec.ts >> Users - Search Tests >> Admin is able to use search engine to find users by user name @XR-624 @regression
- Location: tests/users/usersTests.spec.ts:132:7

# Error details

```
Test timeout of 60000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('menuitem', { name: /company-logo QA DEV|QA DEV|Grupo Castelar/i }).or(locator('[role="menuitem"]').filter({ hasText: /QA DEV|Grupo Castelar/i })).or(getByText(/QA DEV|Grupo Castelar/i)).first()
    - locator resolved to <li tabindex="-1" role="menuitem" aria-disabled="false" class="MuiButtonBase-root MuiListItem-root MuiMenuItem-root Mui-selected MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button Mui-selected">…</li>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not visible
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
          - button " Activity" [ref=e13]:
            - generic [ref=e14]: 
            - generic [ref=e16]: Activity
        - link [ref=e18] [cursor=pointer]:
          - /url: /company/1112
          - button " Appointments" [ref=e19]:
            - generic [ref=e20]: 
            - generic [ref=e22]: Appointments
        - link [ref=e24] [cursor=pointer]:
          - /url: /company/1112/managements
          - button " Processes" [ref=e25]:
            - generic [ref=e26]: 
            - generic [ref=e28]: Processes
        - link [ref=e30] [cursor=pointer]:
          - /url: /company/1112/procedures
          - button " Procedures" [ref=e31]:
            - generic [ref=e32]: 
            - generic [ref=e34]: Procedures
        - link [ref=e36] [cursor=pointer]:
          - /url: /company/1112/drafts
          - button " Templates" [ref=e37]:
            - generic [ref=e38]: 
            - generic [ref=e40]: Templates
        - link [ref=e42] [cursor=pointer]:
          - /url: /company/1112/documentation
          - button " Documents" [ref=e43]:
            - generic [ref=e44]: 
            - generic [ref=e46]: Documents
        - link [ref=e48] [cursor=pointer]:
          - /url: /company/1112/companies
          - button " Entities" [ref=e49]:
            - generic [ref=e50]: 
            - generic [ref=e52]: Entities
        - link [ref=e54] [cursor=pointer]:
          - /url: /company/1112/users
          - button " Users" [ref=e55]:
            - generic [ref=e56]: 
            - generic [ref=e58]: Users
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
                - img "Logo Virtual Citizen Service Office" [ref=e89]
                - generic [ref=e90]: 
      - generic [ref=e92]:
        - button "Actions" [ref=e95] [cursor=pointer]:
          - generic [ref=e96]: 
        - generic [ref=e98]:
          - tablist "Pestañas" [ref=e102]:
            - tab "Botón" [selected] [ref=e103] [cursor=pointer]:
              - paragraph [ref=e105]: Video-appointments
            - tab "Botón" [ref=e106] [cursor=pointer]:
              - paragraph [ref=e108]: In-person appointments
          - generic [ref=e110]:
            - generic [ref=e112]:
              - generic [ref=e113]:
                - generic [ref=e115]:
                  - generic [ref=e118]:
                    - generic [ref=e119] [cursor=pointer]:
                      - generic [ref=e121]:
                        - generic [ref=e122]: 
                        - generic [ref=e123]: List view
                      - combobox "Campo de texto": "[object Object]"
                    - group [aria-hidden]
                  - generic [ref=e129]:
                    - generic [ref=e130] [cursor=pointer]:
                      - generic [ref=e131]: Confirmed, In progress, Pending report, Completed, In pause
                      - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                      - generic [ref=e132]: Status
                    - group [aria-hidden]
                  - generic [ref=e138]:
                    - generic [ref=e139] [cursor=pointer]:
                      - generic [ref=e140]: This week
                      - combobox "Period": This week
                      - generic [ref=e141]: Period
                    - group [aria-hidden]
                  - button "Botón" [ref=e145] [cursor=pointer]:
                    - generic [ref=e146]: 
                - generic [ref=e147]:
                  - generic [ref=e148]:
                    - paragraph [ref=e149]: Search by participant or record
                    - generic [ref=e152]:
                      - button "Botón" [ref=e154] [cursor=pointer]:
                        - generic [ref=e155]: 
                      - textbox "Search by participant or record" [ref=e156]:
                        - /placeholder: Search
                  - button "Help" [ref=e157] [cursor=pointer]:
                    - generic [ref=e158]: 
              - generic [ref=e166]:
                - table [ref=e167]:
                  - rowgroup [ref=e168]:
                    - row [ref=e169]:
                      - columnheader "Selection" [ref=e170]
                      - columnheader "Date Date " [ref=e172]:
                        - generic [ref=e173]: Date
                        - button "Date " [ref=e174] [cursor=pointer]:
                          - generic [ref=e175]: Date
                          - generic [ref=e176]: 
                      - columnheader "Ref. Ref. " [ref=e178]:
                        - generic [ref=e179]: Ref.
                        - button "Ref. " [ref=e180] [cursor=pointer]:
                          - generic [ref=e181]: Ref.
                          - generic [ref=e182]: 
                      - columnheader "External ID External ID " [ref=e184]:
                        - generic [ref=e185]: External ID
                        - button "External ID " [ref=e186] [cursor=pointer]:
                          - generic [ref=e187]: External ID
                          - generic [ref=e188]: 
                      - columnheader "Record Record " [ref=e190]:
                        - generic [ref=e191]: Record
                        - button "Record " [ref=e192] [cursor=pointer]:
                          - generic [ref=e193]: Record
                          - generic [ref=e194]: 
                      - columnheader "Documents" [ref=e196]
                      - columnheader "Type Type " [ref=e197]:
                        - generic [ref=e198]: Type
                        - button "Type " [ref=e199] [cursor=pointer]:
                          - generic [ref=e200]: Type
                          - generic [ref=e201]: 
                      - columnheader "Status Status " [ref=e203]:
                        - generic [ref=e204]: Status
                        - button "Status " [ref=e205] [cursor=pointer]:
                          - generic [ref=e206]: Status
                          - generic [ref=e207]: 
                      - columnheader "Actions" [ref=e209]
                      - columnheader "Actions [object Object]" [ref=e210]:
                        - generic [ref=e211]: Actions
                        - generic [ref=e214]:
                          - generic [ref=e215] [cursor=pointer]:
                            - generic [aria-hidden] [ref=e217]: 
                            - combobox "Settings": "[object Object]"
                          - group [aria-hidden]
                  - rowgroup [ref=e219]:
                    - row [ref=e220] [cursor=pointer]:
                      - cell [ref=e221]:
                        - checkbox "Select" [ref=e226]
                      - cell " 07/11/2026 08:30" [ref=e229]:
                        - generic [ref=e230]:
                          - generic [ref=e231]: 
                          - generic [ref=e234]:
                            - generic [ref=e235]: 07/11/2026
                            - generic [ref=e236]: 08:30
                      - cell "67484" [ref=e237]
                      - cell [ref=e238]
                      - cell "11121112674842026678c8" [ref=e239]
                      - cell [ref=e240]:
                        - button "4" [ref=e242]
                      - cell "-" [ref=e244]
                      - cell "Pending report" [ref=e245]
                      - cell [ref=e253]:
                        - generic "Send notification" [ref=e257]:
                          - button "" [ref=e258]
                      - cell [ref=e261]:
                        - button "More" [ref=e264]:
                          - generic [ref=e265]: 
                    - row [ref=e267] [cursor=pointer]:
                      - cell [ref=e268]:
                        - checkbox "Select" [ref=e273]
                      - cell " 06/11/2026 10:00 " [ref=e276]:
                        - generic [ref=e277]:
                          - generic [ref=e278]: 
                          - generic [ref=e281]:
                            - generic [ref=e282]: 06/11/2026
                            - generic [ref=e283]: 10:00
                          - generic [ref=e284]: 
                      - cell "67501" [ref=e287]
                      - cell [ref=e288]
                      - cell "1112111267501202698076" [ref=e289]
                      - cell [ref=e290]:
                        - button "1" [ref=e292]
                      - cell "Appointment" [ref=e293]
                      - cell "Confirmed" [ref=e294]
                      - cell [ref=e302]:
                        - generic [ref=e304]:
                          - generic "Send notification" [ref=e306]:
                            - button "" [ref=e307]
                          - button "Open" [ref=e311]
                      - cell [ref=e314]:
                        - button "More" [ref=e317]:
                          - generic [ref=e318]: 
                    - row [ref=e320] [cursor=pointer]:
                      - cell [ref=e321]:
                        - checkbox "Select" [ref=e326]
                      - cell " 06/11/2026 08:00" [ref=e329]:
                        - generic [ref=e330]:
                          - generic [ref=e331]: 
                          - generic [ref=e334]:
                            - generic [ref=e335]: 06/11/2026
                            - generic [ref=e336]: 08:00
                      - cell "67441" [ref=e337]
                      - cell [ref=e338]
                      - cell "1112154567441202673f10" [ref=e339]
                      - cell [ref=e340]:
                        - button "4" [ref=e342]
                      - cell "Appointment" [ref=e344]
                      - cell "Pending report" [ref=e345]
                      - cell [ref=e353]:
                        - generic "Send notification" [ref=e357]:
                          - button "" [ref=e358]
                      - cell [ref=e361]:
                        - button "More" [ref=e364]:
                          - generic [ref=e365]: 
                    - row [ref=e367] [cursor=pointer]:
                      - cell [ref=e368]:
                        - checkbox "Select" [ref=e373]
                      - cell " 05/11/2026 19:00 " [ref=e376]:
                        - generic [ref=e377]:
                          - generic [ref=e378]: 
                          - generic [ref=e381]:
                            - generic [ref=e382]: 05/11/2026
                            - generic [ref=e383]: 19:00
                          - generic [ref=e384]: 
                      - cell "67453" [ref=e387]
                      - cell [ref=e388]
                      - cell "111211126745320262f176" [ref=e389]
                      - cell [ref=e390]:
                        - button "4" [ref=e392]
                      - cell "Appointment" [ref=e394]
                      - cell "In progress" [ref=e395]
                      - cell [ref=e403]:
                        - generic [ref=e405]:
                          - generic "Send notification" [ref=e407]:
                            - button "" [ref=e408]
                          - button "Join" [ref=e412]
                      - cell [ref=e415]:
                        - button "More" [ref=e418]:
                          - generic [ref=e419]: 
                    - row [ref=e421] [cursor=pointer]:
                      - cell [ref=e422]:
                        - checkbox "Select" [ref=e427]
                      - cell " 05/11/2026 16:00  " [ref=e430]:
                        - generic [ref=e431]:
                          - generic [ref=e432]: 
                          - generic [ref=e435]:
                            - generic [ref=e436]: 05/11/2026
                            - generic [ref=e437]: 16:00
                          - generic [ref=e438]:
                            - generic [ref=e439]: 
                            - generic [ref=e441]: 
                      - cell "67502" [ref=e443]
                      - cell [ref=e444]
                      - cell "1112111267502202609a31" [ref=e445]
                      - cell [ref=e446]:
                        - button "1" [ref=e448]
                      - cell "Appointment" [ref=e449]
                      - cell "Confirmed" [ref=e450]
                      - cell [ref=e458]:
                        - generic [ref=e460]:
                          - generic "Send notification" [ref=e462]:
                            - button "" [ref=e463]
                          - button "Open" [ref=e467]
                      - cell [ref=e470]:
                        - button "More" [ref=e473]:
                          - generic [ref=e474]: 
                    - row [ref=e476] [cursor=pointer]:
                      - cell [ref=e477]:
                        - checkbox "Select" [ref=e482]
                      - cell " 05/11/2026 10:00  " [ref=e485]:
                        - generic [ref=e486]:
                          - generic [ref=e487]: 
                          - generic [ref=e490]:
                            - generic [ref=e491]: 05/11/2026
                            - generic [ref=e492]: 10:00
                          - generic [ref=e493]:
                            - generic [ref=e494]: 
                            - generic [ref=e496]: 
                      - cell "67488" [ref=e498]
                      - cell [ref=e499]
                      - cell "1112111267488202632ca3" [ref=e500]
                      - cell [ref=e501]:
                        - button "1" [ref=e503]
                      - cell "Appointment" [ref=e504]
                      - cell "In progress" [ref=e505]
                      - cell [ref=e513]:
                        - generic [ref=e515]:
                          - generic "Send notification" [ref=e517]:
                            - button "" [ref=e518]
                          - button "Join" [ref=e522]
                      - cell [ref=e525]:
                        - button "More" [ref=e528]:
                          - generic [ref=e529]: 
                    - row [ref=e531] [cursor=pointer]:
                      - cell [ref=e532]:
                        - checkbox "Select" [ref=e537]
                      - cell " 04/11/2026 16:00  " [ref=e540]:
                        - generic [ref=e541]:
                          - generic [ref=e542]: 
                          - generic [ref=e545]:
                            - generic [ref=e546]: 04/11/2026
                            - generic [ref=e547]: 16:00
                          - generic [ref=e548]:
                            - generic [ref=e549]: 
                            - generic [ref=e551]: 
                      - cell "67490" [ref=e553]
                      - cell [ref=e554]
                      - cell "11121112674902026f7f3a" [ref=e555]
                      - cell [ref=e556]:
                        - button "1" [ref=e558]
                      - cell "Appointment" [ref=e559]
                      - cell "Confirmed" [ref=e560]
                      - cell [ref=e568]:
                        - generic [ref=e570]:
                          - generic "Send notification" [ref=e572]:
                            - button "" [ref=e573]
                          - button "Open" [ref=e577]
                      - cell [ref=e580]:
                        - button "More" [ref=e583]:
                          - generic [ref=e584]: 
                    - row [ref=e586] [cursor=pointer]:
                      - cell [ref=e587]:
                        - checkbox "Select" [ref=e592]
                      - cell " 04/11/2026 10:00  " [ref=e595]:
                        - generic [ref=e596]:
                          - generic [ref=e597]: 
                          - generic [ref=e600]:
                            - generic [ref=e601]: 04/11/2026
                            - generic [ref=e602]: 10:00
                          - generic [ref=e603]:
                            - generic [ref=e604]: 
                            - generic [ref=e606]: 
                      - cell "67478" [ref=e608]
                      - cell [ref=e609]
                      - cell "111211126747820269dd19" [ref=e610]
                      - cell [ref=e611]:
                        - button "1" [ref=e613]
                      - cell "Appointment" [ref=e614]
                      - cell "Confirmed" [ref=e615]
                      - cell [ref=e623]:
                        - generic [ref=e625]:
                          - generic "Send notification" [ref=e627]:
                            - button "" [ref=e628]
                          - button "Open" [ref=e632]
                      - cell [ref=e635]:
                        - button "More" [ref=e638]:
                          - generic [ref=e639]: 
                    - row [ref=e641] [cursor=pointer]:
                      - cell [ref=e642]:
                        - checkbox "Select" [ref=e647]
                      - cell " 04/11/2026 10:00 " [ref=e650]:
                        - generic [ref=e651]:
                          - generic [ref=e652]: 
                          - generic [ref=e655]:
                            - generic [ref=e656]: 04/11/2026
                            - generic [ref=e657]: 10:00
                          - generic [ref=e658]: 
                      - cell "67460" [ref=e661]
                      - cell [ref=e662]
                      - cell "1112111267460202687188" [ref=e663]
                      - cell [ref=e664]:
                        - button "1" [ref=e666]
                      - cell "Appointment" [ref=e668]
                      - cell "In progress" [ref=e669]
                      - cell [ref=e677]:
                        - generic [ref=e679]:
                          - generic "Send notification" [ref=e681]:
                            - button "" [ref=e682]
                          - button "Join" [ref=e686]
                      - cell [ref=e689]:
                        - button "More" [ref=e692]:
                          - generic [ref=e693]: 
                    - row [ref=e695] [cursor=pointer]:
                      - cell [ref=e696]:
                        - checkbox "Select" [ref=e701]
                      - cell " 04/11/2026 08:00 " [ref=e704]:
                        - generic [ref=e705]:
                          - generic [ref=e706]: 
                          - generic [ref=e709]:
                            - generic [ref=e710]: 04/11/2026
                            - generic [ref=e711]: 08:00
                          - generic [ref=e712]: 
                      - cell "67486" [ref=e715]
                      - cell [ref=e716]
                      - cell "1112111267486202621ce8" [ref=e717]
                      - cell [ref=e718]:
                        - button "1" [ref=e720]
                      - cell "Appointment" [ref=e722]
                      - cell "In progress" [ref=e723]
                      - cell [ref=e731]:
                        - generic [ref=e733]:
                          - generic "Send notification" [ref=e735]:
                            - button "" [ref=e736]
                          - button "Join" [ref=e740]
                      - cell [ref=e743]:
                        - button "More" [ref=e746]:
                          - generic [ref=e747]: 
                    - row [ref=e749] [cursor=pointer]:
                      - cell [ref=e750]:
                        - checkbox "Select" [ref=e755]
                      - cell " 03/11/2026 15:00  " [ref=e758]:
                        - generic [ref=e759]:
                          - generic [ref=e760]: 
                          - generic [ref=e763]:
                            - generic [ref=e764]: 03/11/2026
                            - generic [ref=e765]: 15:00
                          - generic [ref=e766]:
                            - generic [ref=e767]: 
                            - generic [ref=e769]: 
                      - cell "67480" [ref=e771]
                      - cell [ref=e772]
                      - cell "111211126748020268f764" [ref=e773]
                      - cell [ref=e774]:
                        - button "1" [ref=e776]
                      - cell "Appointment" [ref=e777]
                      - cell "Confirmed" [ref=e778]
                      - cell [ref=e786]:
                        - generic [ref=e788]:
                          - generic "Send notification" [ref=e790]:
                            - button "" [ref=e791]
                          - button "Open" [ref=e795]
                      - cell [ref=e798]:
                        - button "More" [ref=e801]:
                          - generic [ref=e802]: 
                    - row [ref=e804] [cursor=pointer]:
                      - cell [ref=e805]:
                        - checkbox "Select" [ref=e810]
                      - cell " 03/11/2026 11:15 " [ref=e813]:
                        - generic [ref=e814]:
                          - generic [ref=e815]: 
                          - generic [ref=e818]:
                            - generic [ref=e819]: 03/11/2026
                            - generic [ref=e820]: 11:15
                          - generic [ref=e821]: 
                      - cell "67477" [ref=e824]
                      - cell [ref=e825]
                      - cell "1112111267477202632d13" [ref=e826]
                      - cell [ref=e827]:
                        - button "2" [ref=e829]
                      - cell "Appointment" [ref=e830]
                      - cell "In progress" [ref=e831]
                      - cell [ref=e839]:
                        - generic [ref=e841]:
                          - generic "Send notification" [ref=e843]:
                            - button "" [ref=e844]
                          - button "Join" [ref=e848]
                      - cell [ref=e851]:
                        - button "More" [ref=e854]:
                          - generic [ref=e855]: 
                    - row [ref=e857] [cursor=pointer]:
                      - cell [ref=e858]:
                        - checkbox "Select" [ref=e863]
                      - cell " 03/11/2026 10:30 " [ref=e866]:
                        - generic [ref=e867]:
                          - generic [ref=e868]: 
                          - generic [ref=e871]:
                            - generic [ref=e872]: 03/11/2026
                            - generic [ref=e873]: 10:30
                          - generic [ref=e874]: 
                      - cell "67476" [ref=e877]
                      - cell [ref=e878]
                      - cell "11121112674762026feb0d" [ref=e879]
                      - cell [ref=e880]:
                        - button "0" [ref=e882]
                      - cell "Appointment" [ref=e883]
                      - cell "In progress" [ref=e884]
                      - cell [ref=e892]:
                        - generic [ref=e894]:
                          - generic "Send notification" [ref=e896]:
                            - button "" [ref=e897]
                          - button "Join" [ref=e901]
                      - cell [ref=e904]:
                        - button "More" [ref=e907]:
                          - generic [ref=e908]: 
                    - row [ref=e910] [cursor=pointer]:
                      - cell [ref=e911]:
                        - checkbox "Select" [ref=e916]
                      - cell " 03/11/2026 10:00  " [ref=e919]:
                        - generic [ref=e920]:
                          - generic [ref=e921]: 
                          - generic [ref=e924]:
                            - generic [ref=e925]: 03/11/2026
                            - generic [ref=e926]: 10:00
                          - generic [ref=e927]:
                            - generic [ref=e928]: 
                            - generic [ref=e930]: 
                      - cell "67466" [ref=e932]
                      - cell [ref=e933]
                      - cell "111211126746620260303c" [ref=e934]
                      - cell [ref=e935]:
                        - button "1" [ref=e937]
                      - cell "Appointment" [ref=e938]
                      - cell "In progress" [ref=e939]
                      - cell [ref=e947]:
                        - generic [ref=e949]:
                          - generic "Send notification" [ref=e951]:
                            - button "" [ref=e952]
                          - button "Join" [ref=e956]
                      - cell [ref=e959]:
                        - button "More" [ref=e962]:
                          - generic [ref=e963]: 
                    - row [ref=e965] [cursor=pointer]:
                      - cell [ref=e966]:
                        - checkbox "Select" [ref=e971]
                      - cell " 03/11/2026 08:15 " [ref=e974]:
                        - generic [ref=e975]:
                          - generic [ref=e976]: 
                          - generic [ref=e979]:
                            - generic [ref=e980]: 03/11/2026
                            - generic [ref=e981]: 08:15
                          - generic [ref=e982]: 
                      - cell "67473" [ref=e985]
                      - cell [ref=e986]
                      - cell "111211126747320266630b" [ref=e987]
                      - cell [ref=e988]:
                        - button "1" [ref=e990]
                      - cell "Appointment" [ref=e992]
                      - cell "In progress" [ref=e993]
                      - cell [ref=e1001]:
                        - generic [ref=e1003]:
                          - generic "Send notification" [ref=e1005]:
                            - button "" [ref=e1006]
                          - button "Join" [ref=e1010]
                      - cell [ref=e1013]:
                        - button "More" [ref=e1016]:
                          - generic [ref=e1017]: 
                    - row [ref=e1019] [cursor=pointer]:
                      - cell [ref=e1020]:
                        - checkbox "Select" [ref=e1025]
                      - cell " 02/11/2026 17:00  " [ref=e1028]:
                        - generic [ref=e1029]:
                          - generic [ref=e1030]: 
                          - generic [ref=e1033]:
                            - generic [ref=e1034]: 02/11/2026
                            - generic [ref=e1035]: 17:00
                          - generic [ref=e1036]:
                            - generic [ref=e1037]: 
                            - generic [ref=e1039]: 
                      - cell "67468" [ref=e1041]
                      - cell [ref=e1042]
                      - cell "111211126746820269a72b" [ref=e1043]
                      - cell [ref=e1044]:
                        - button "1" [ref=e1046]
                      - cell "Appointment" [ref=e1047]
                      - cell "In progress" [ref=e1048]
                      - cell [ref=e1056]:
                        - generic [ref=e1058]:
                          - generic "Send notification" [ref=e1060]:
                            - button "" [ref=e1061]
                          - button "Join" [ref=e1065]
                      - cell [ref=e1068]:
                        - button "More" [ref=e1071]:
                          - generic [ref=e1072]: 
                    - row [ref=e1074] [cursor=pointer]:
                      - cell [ref=e1075]:
                        - checkbox "Select" [ref=e1080]
                      - cell " 02/11/2026 15:00 " [ref=e1083]:
                        - generic [ref=e1084]:
                          - generic [ref=e1085]: 
                          - generic [ref=e1088]:
                            - generic [ref=e1089]: 02/11/2026
                            - generic [ref=e1090]: 15:00
                          - generic [ref=e1091]: 
                      - cell "67459" [ref=e1094]
                      - cell [ref=e1095]
                      - cell "11121112674592026a39df" [ref=e1096]
                      - cell [ref=e1097]:
                        - button "6" [ref=e1099]
                      - cell "Appointment" [ref=e1101]
                      - cell "In progress" [ref=e1102]
                      - cell [ref=e1110]:
                        - generic [ref=e1112]:
                          - button [disabled]
                          - button "Join" [ref=e1114]
                      - cell [ref=e1117]:
                        - button "More" [ref=e1120]:
                          - generic [ref=e1121]: 
                    - row [ref=e1123] [cursor=pointer]:
                      - cell [ref=e1124]:
                        - checkbox "Select" [ref=e1129]
                      - cell " 02/11/2026 12:42 " [ref=e1132]:
                        - generic [ref=e1133]:
                          - generic [ref=e1134]: 
                          - generic [ref=e1137]:
                            - generic [ref=e1138]: 02/11/2026
                            - generic [ref=e1139]: 12:42
                          - generic [ref=e1140]: 
                      - cell "67457" [ref=e1143]
                      - cell [ref=e1144]
                      - cell "11121112674572026be236" [ref=e1145]
                      - cell [ref=e1146]:
                        - button "1" [ref=e1148]
                      - cell "Instant appointment" [ref=e1150]
                      - cell "In progress" [ref=e1151]
                      - cell [ref=e1159]:
                        - generic [ref=e1161]:
                          - generic "Send notification" [ref=e1163]:
                            - button "" [ref=e1164]
                          - button "Join" [ref=e1168]
                      - cell [ref=e1171]:
                        - button "More" [ref=e1174]:
                          - generic [ref=e1175]: 
                    - row [ref=e1177] [cursor=pointer]:
                      - cell [ref=e1178]:
                        - checkbox "Select" [ref=e1183]
                      - cell " 02/11/2026 09:45 " [ref=e1186]:
                        - generic [ref=e1187]:
                          - generic [ref=e1188]: 
                          - generic [ref=e1191]:
                            - generic [ref=e1192]: 02/11/2026
                            - generic [ref=e1193]: 09:45
                          - generic [ref=e1194]: 
                      - cell "67452" [ref=e1197]
                      - cell [ref=e1198]
                      - cell "1112111267452202679118" [ref=e1199]
                      - cell [ref=e1200]:
                        - button "0" [ref=e1202]
                      - cell "Appointment" [ref=e1203]
                      - cell "In progress" [ref=e1204]
                      - cell [ref=e1212]:
                        - generic [ref=e1214]:
                          - generic "Send notification" [ref=e1216]:
                            - button "" [ref=e1217]
                          - button "Join" [ref=e1221]
                      - cell [ref=e1224]:
                        - button "More" [ref=e1227]:
                          - generic [ref=e1228]: 
                - generic [ref=e1230]: 1 - 19 of 19
            - generic [ref=e1234]:
              - generic [ref=e1235] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e1236] [cursor=pointer]: PRIVACY_POLICY
            - generic [ref=e1237]:
              - generic [ref=e1238]:
                - generic [ref=e1239] [cursor=pointer]: 
                - generic [ref=e1241]: 0 selected
              - generic [ref=e1244] [cursor=pointer]:
                - generic [ref=e1246]: 
                - generic [ref=e1247]: SELECT ALL
  - generic [ref=e1248]:
    - generic [ref=e1252]:
      - generic [ref=e1253]: New version OVAC 8.7
      - generic [ref=e1254]:
        - generic [ref=e1255]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e1256]: Review upgrades
    - button [ref=e1262] [cursor=pointer]
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
  23  |         this.qaDevMenuItem = page.getByRole('menuitem', { name: /company-logo QA DEV|QA DEV|Grupo Castelar/i })
  24  |             .or(page.locator('[role="menuitem"]').filter({ hasText: /QA DEV|Grupo Castelar/i }))
  25  |             .or(page.getByText(/QA DEV|Grupo Castelar/i))
  26  |             .first();
  27  |     }
  28  | 
  29  |     async dismissModal() {
  30  |         await test.step('Dismiss modal dialog', async () => {
  31  |             const modal = this.page.locator('#alert-confirm, .MuiDialog-root, #modal');
  32  |             if (await modal.first().isVisible({ timeout: 2000 }).catch(() => false)) {
  33  |                 const actionBtn = modal.first().locator('button').first();
  34  |                 if (await actionBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
  35  |                     await actionBtn.click();
  36  |                 } else {
  37  |                     await this.page.keyboard.press('Escape');
  38  |                 }
  39  |                 await modal.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  40  |             }
  41  |         });
  42  |     }
  43  | 
  44  |     async dismissToastOrModal() {
  45  |         await test.step('Dismiss toast or modal banner if present', async () => {
  46  |             const closeBtn = this.page.locator(`
  47  |                 .slide-in button,
  48  |                 .slide-in [class*="close"],
  49  |                 .slide-in [aria-label*="close" i],
  50  |                 .MuiButtonBase-root.MuiIconButton-root.closeIcon,
  51  |                 button.closeIcon,
  52  |                 [class*="toast"] button,
  53  |                 [class*="snackbar"] button,
  54  |                 button[aria-label="close" i],
  55  |                 button[aria-label="Close" i]
  56  |             `).first();
  57  | 
  58  |             if (await closeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
  59  |                 await closeBtn.click({ timeout: 1000, force: true }).catch(() => {});
  60  |             }
  61  | 
  62  |             await this.page.evaluate(() => {
  63  |                 document.querySelectorAll('.slide-in, .cbx-dropdown-backdrop, .cbx-dropdown-presentation, [class*="Toastify__toast"], #modal.cbx-Modal-container, .cbx-Modal-backdrop').forEach(el => (el as HTMLElement).remove());
  64  |             }).catch(() => {});
  65  |         });
  66  |     }
  67  | 
  68  |     async selectQADevCompany() {
  69  |         await test.step('Select QA DEV company', async () => {
  70  |             await this.dismissToastOrModal();
  71  |             const isMenuOpen = await this.qaDevMenuItem.isVisible({ timeout: 500 }).catch(() => false);
  72  |             if (!isMenuOpen) {
  73  |                 await this.governmentIcon.click();
  74  |             }
  75  |             await this.qaDevMenuItem.waitFor({ state: 'visible', timeout: 10000 });
> 76  |             await this.qaDevMenuItem.click();
      |                                      ^ Error: locator.click: Test timeout of 60000ms exceeded.
  77  |             await this.page.waitForTimeout(1000);
  78  |             await this.dismissToastOrModal();
  79  |         });
  80  |     }
  81  | 
  82  |     async navigateToInstitutions() {
  83  |         await test.step('Navigate to Institutions page', async () => {
  84  |             await this.institutionsButton.waitFor({ state: 'visible', timeout: 10000 });
  85  |             await this.institutionsButton.click();
  86  |             await this.page.waitForURL(/\/companies/i, { timeout: 10000 }).catch(() => {});
  87  |             await this.page.locator('table tbody tr').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  88  |             await this.page.waitForTimeout(500);
  89  |         });
  90  |     }
  91  | 
  92  |     async navigateToTemplates() {
  93  |         await test.step('Navigate to Templates page', async () => {
  94  |             await this.templatesButton.waitFor({ state: 'visible', timeout: 10000 });
  95  |             await this.templatesButton.click();
  96  |         });
  97  |     }
  98  | 
  99  |     async navigateToProcedures() {
  100 |         await test.step('Navigate to Procedures page', async () => {
  101 |             await this.proceduresButton.waitFor({ state: 'visible', timeout: 10000 });
  102 |             await this.proceduresButton.click();
  103 |             await this.page.waitForTimeout(1000);
  104 |         });
  105 |     }
  106 | 
  107 |     async navigateToDocumentation() {
  108 |         await test.step('Navigate to Documentation page', async () => {
  109 |             await this.documentationButton.waitFor({ state: 'visible', timeout: 10000 });
  110 |             await this.documentationButton.click();
  111 |         });
  112 |     }
  113 | 
  114 |     async navigateToUsers() {
  115 |         await test.step('Navigate to Users page', async () => {
  116 |             await this.usersButton.waitFor({ state: 'visible', timeout: 10000 });
  117 |             await this.usersButton.click();
  118 |             await this.page.waitForTimeout(1000);
  119 |         });
  120 |     }
  121 | 
  122 |     async navigateToAppointments() {
  123 |         await test.step('Navigate to Appointments page', async () => {
  124 |             await this.appointmentsButton.waitFor({ state: 'visible', timeout: 10000 });
  125 |             await this.appointmentsButton.click();
  126 |             await this.page.waitForTimeout(1000);
  127 |         });
  128 |     }
  129 | }
  130 | 
```