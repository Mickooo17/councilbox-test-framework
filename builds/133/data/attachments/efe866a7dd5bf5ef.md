# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Organization & Company Settings Tests >> The fields for the "Message" email notification should have default texts if the notification is not modified @OVAC-5714 @regression
- Location: tests/institutions/institutionsTests.spec.ts:272:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('tr, li, [role="row"]').filter({ has: locator('td:first-child div, td:first-child p, td:first-child span').filter({ hasText: /Message|Mensaje/i }) }).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f11e3]:
  - generic [ref=f11e4]:
    - button "" [ref=f11e5] [cursor=pointer]
    - generic [ref=f11e10]:
      - link [ref=f11e12] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=f11e13]:
          - generic [ref=f11e14]: 
          - generic [ref=f11e16]: Activity
      - link [ref=f11e18] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=f11e19]:
          - generic [ref=f11e20]: 
          - generic [ref=f11e22]: Appointments
      - link [ref=f11e24] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=f11e25]:
          - generic [ref=f11e26]: 
          - generic [ref=f11e28]: Processes
      - link [ref=f11e30] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=f11e31]:
          - generic [ref=f11e32]: 
          - generic [ref=f11e34]: Procedures
      - link [ref=f11e36] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=f11e37]:
          - generic [ref=f11e38]: 
          - generic [ref=f11e40]: Templates
      - link [ref=f11e42] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=f11e43]:
          - generic [ref=f11e44]: 
          - generic [ref=f11e46]: Documents
      - link [ref=f11e48] [cursor=pointer]:
        - /url: /company/1112/entities
        - button " Entities" [ref=f11e49]:
          - generic [ref=f11e50]: 
          - generic [ref=f11e52]: Entities
      - link [ref=f11e54] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=f11e55]:
          - generic [ref=f11e56]: 
          - generic [ref=f11e58]: Users
    - generic [ref=f11e60]:
      - img "CBX white Logo" [ref=f11e61]
      - generic [ref=f11e62]: © 2026 v8.8.0
  - generic [ref=f11e64]:
    - banner [ref=f11e65]:
      - button [ref=f11e67] [cursor=pointer]:
        - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e68]
      - generic [ref=f11e69]: Grupo Castelar Servicios Legales y Financieros S.A
      - generic [ref=f11e75]:
        - button [ref=f11e78] [cursor=pointer]:
          - button "Notifications" [ref=f11e79]:
            - generic [ref=f11e80]: 
        - button [ref=f11e82] [cursor=pointer]:
          - button "Button user" [ref=f11e84]:
            - generic [ref=f11e87]:
              - img "Logo Virtual Citizen Service Office" [ref=f11e89]
              - generic [ref=f11e90]: 
    - generic [ref=f11e92]:
      - button "Actions" [ref=f11e95] [cursor=pointer]:
        - generic [ref=f11e96]: 
      - generic [ref=f11e98]:
        - tablist "Pestañas" [ref=f11e102]:
          - tab "Video-appointments" [selected] [ref=f11e103] [cursor=pointer]:
            - paragraph [ref=f11e105]: Video-appointments
          - tab "In-person appointments" [ref=f11e106] [cursor=pointer]:
            - paragraph [ref=f11e108]: In-person appointments
        - generic [ref=f11e110]:
          - generic [ref=f11e112]:
            - generic [ref=f11e113]:
              - generic [ref=f11e115]:
                - generic [ref=f11e118]:
                  - generic [ref=f11e119] [cursor=pointer]:
                    - generic [ref=f11e121]:
                      - generic [ref=f11e122]: 
                      - generic [ref=f11e123]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=f11e129]:
                  - generic [ref=f11e130] [cursor=pointer]:
                    - generic [ref=f11e131]: Confirmed, In progress, Pending report, Completed, In pause
                    - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                    - generic [ref=f11e132]: Status
                  - group [aria-hidden]
                - generic [ref=f11e138]:
                  - generic [ref=f11e139] [cursor=pointer]:
                    - generic [ref=f11e140]: This week
                    - combobox "Period": This week
                    - generic [ref=f11e141]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=f11e145] [cursor=pointer]:
                  - generic [ref=f11e146]: 
              - generic [ref=f11e147]:
                - generic [ref=f11e148]:
                  - paragraph [ref=f11e149]: Search by participant or record
                  - generic [ref=f11e152]:
                    - button "Search" [ref=f11e154] [cursor=pointer]:
                      - generic [ref=f11e155]: 
                    - textbox "Search by participant or record" [ref=f11e156]:
                      - /placeholder: Search
                - button "Help" [ref=f11e157] [cursor=pointer]:
                  - generic [ref=f11e158]: 
            - generic [ref=f11e166]:
              - table [ref=f11e167]:
                - rowgroup [ref=f11e168]:
                  - row [ref=f11e169]:
                    - columnheader "Selection" [ref=f11e170]
                    - columnheader "Date Date " [ref=f11e172]:
                      - generic [ref=f11e173]: Date
                      - button "Date " [ref=f11e174] [cursor=pointer]:
                        - generic [ref=f11e175]: Date
                        - generic [ref=f11e176]: 
                    - columnheader "Ref. Ref. " [ref=f11e178]:
                      - generic [ref=f11e179]: Ref.
                      - button "Ref. " [ref=f11e180] [cursor=pointer]:
                        - generic [ref=f11e181]: Ref.
                        - generic [ref=f11e182]: 
                    - columnheader "External ID External ID " [ref=f11e184]:
                      - generic [ref=f11e185]: External ID
                      - button "External ID " [ref=f11e186] [cursor=pointer]:
                        - generic [ref=f11e187]: External ID
                        - generic [ref=f11e188]: 
                    - columnheader "Record Record " [ref=f11e190]:
                      - generic [ref=f11e191]: Record
                      - button "Record " [ref=f11e192] [cursor=pointer]:
                        - generic [ref=f11e193]: Record
                        - generic [ref=f11e194]: 
                    - columnheader "Documents" [ref=f11e196]
                    - columnheader "Entity Entity " [ref=f11e197]:
                      - generic [ref=f11e198]: Entity
                      - button "Entity " [ref=f11e199] [cursor=pointer]:
                        - generic [ref=f11e200]: Entity
                        - generic [ref=f11e201]: 
                    - columnheader "Status Status " [ref=f11e203]:
                      - generic [ref=f11e204]: Status
                      - button "Status " [ref=f11e205] [cursor=pointer]:
                        - generic [ref=f11e206]: Status
                        - generic [ref=f11e207]: 
                    - columnheader "Actions [object Object]" [ref=f11e209]:
                      - generic [ref=f11e210]: Actions
                      - generic [ref=f11e213]:
                        - generic [ref=f11e214] [cursor=pointer]:
                          - generic [aria-hidden] [ref=f11e216]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=f11e218]:
                  - row [ref=f11e219] [cursor=pointer]:
                    - cell [ref=f11e220]:
                      - checkbox "Select" [ref=f11e225]
                    - cell " 27/11/2026 10:00  " [ref=f11e228]:
                      - generic [ref=f11e229]:
                        - generic [ref=f11e230]: 
                        - generic [ref=f11e233]:
                          - generic [ref=f11e234]: 27/11/2026
                          - generic [ref=f11e235]: 10:00
                        - generic [ref=f11e236]:
                          - generic [ref=f11e237]: 
                          - generic [ref=f11e239]: 
                    - cell "67966" [ref=f11e241]
                    - cell [ref=f11e242]
                    - cell "111211126796620265902d" [ref=f11e243]
                    - cell [ref=f11e244]:
                      - button "1" [ref=f11e246]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e247]
                    - cell "Confirmed" [ref=f11e250]
                    - cell [ref=f11e258]:
                      - button "More" [ref=f11e261]:
                        - generic [ref=f11e262]: 
                  - row [ref=f11e264] [cursor=pointer]:
                    - cell [ref=f11e265]:
                      - checkbox "Select" [ref=f11e270]
                    - cell " 27/11/2026 10:00 " [ref=f11e273]:
                      - generic [ref=f11e274]:
                        - generic [ref=f11e275]: 
                        - generic [ref=f11e278]:
                          - generic [ref=f11e279]: 27/11/2026
                          - generic [ref=f11e280]: 10:00
                        - generic [ref=f11e281]: 
                    - cell "67963" [ref=f11e284]
                    - cell [ref=f11e285]
                    - cell "11121112679632026e7a66" [ref=f11e286]
                    - cell [ref=f11e287]:
                      - button "1" [ref=f11e289]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e290]
                    - cell "Confirmed" [ref=f11e293]
                    - cell [ref=f11e301]:
                      - button "More" [ref=f11e304]:
                        - generic [ref=f11e305]: 
                  - row [ref=f11e307] [cursor=pointer]:
                    - cell [ref=f11e308]:
                      - checkbox "Select" [ref=f11e313]
                    - cell " 27/11/2026 10:00  " [ref=f11e316]:
                      - generic [ref=f11e317]:
                        - generic [ref=f11e318]: 
                        - generic [ref=f11e321]:
                          - generic [ref=f11e322]: 27/11/2026
                          - generic [ref=f11e323]: 10:00
                        - generic [ref=f11e324]:
                          - generic [ref=f11e325]: 
                          - generic [ref=f11e327]: 
                    - cell "67964" [ref=f11e329]
                    - cell [ref=f11e330]
                    - cell "1112111267964202683a19" [ref=f11e331]
                    - cell [ref=f11e332]:
                      - button "1" [ref=f11e334]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e335]
                    - cell "Confirmed" [ref=f11e338]
                    - cell [ref=f11e346]:
                      - button "More" [ref=f11e349]:
                        - generic [ref=f11e350]: 
                  - row [ref=f11e352] [cursor=pointer]:
                    - cell [ref=f11e353]:
                      - checkbox "Select" [ref=f11e358]
                    - cell " 27/11/2026 10:00 " [ref=f11e361]:
                      - generic [ref=f11e362]:
                        - generic [ref=f11e363]: 
                        - generic [ref=f11e366]:
                          - generic [ref=f11e367]: 27/11/2026
                          - generic [ref=f11e368]: 10:00
                        - generic [ref=f11e369]: 
                    - cell "67965" [ref=f11e372]
                    - cell [ref=f11e373]
                    - cell "11121112679652026bc1e3" [ref=f11e374]
                    - cell [ref=f11e375]:
                      - button "1" [ref=f11e377]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e378]
                    - cell "Confirmed" [ref=f11e381]
                    - cell [ref=f11e389]:
                      - button "More" [ref=f11e392]:
                        - generic [ref=f11e393]: 
                  - row [ref=f11e395] [cursor=pointer]:
                    - cell [ref=f11e396]:
                      - checkbox "Select" [ref=f11e401]
                    - cell " 27/11/2026 10:00 " [ref=f11e404]:
                      - generic [ref=f11e405]:
                        - generic [ref=f11e406]: 
                        - generic [ref=f11e409]:
                          - generic [ref=f11e410]: 27/11/2026
                          - generic [ref=f11e411]: 10:00
                        - generic [ref=f11e412]: 
                    - cell "67958" [ref=f11e415]
                    - cell [ref=f11e416]
                    - cell "111211126795820263f7f0" [ref=f11e417]
                    - cell [ref=f11e418]:
                      - button "1" [ref=f11e420]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e421]
                    - cell "Confirmed" [ref=f11e424]
                    - cell [ref=f11e432]:
                      - button "More" [ref=f11e435]:
                        - generic [ref=f11e436]: 
                  - row [ref=f11e438] [cursor=pointer]:
                    - cell [ref=f11e439]:
                      - checkbox "Select" [ref=f11e444]
                    - cell " 27/11/2026 10:00 " [ref=f11e447]:
                      - generic [ref=f11e448]:
                        - generic [ref=f11e449]: 
                        - generic [ref=f11e452]:
                          - generic [ref=f11e453]: 27/11/2026
                          - generic [ref=f11e454]: 10:00
                        - generic [ref=f11e455]: 
                    - cell "67961" [ref=f11e458]
                    - cell [ref=f11e459]
                    - cell "111211126796120266b636" [ref=f11e460]
                    - cell [ref=f11e461]:
                      - button "1" [ref=f11e463]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e464]
                    - cell "Confirmed" [ref=f11e467]
                    - cell [ref=f11e475]:
                      - button "More" [ref=f11e478]:
                        - generic [ref=f11e479]: 
                  - row [ref=f11e481] [cursor=pointer]:
                    - cell [ref=f11e482]:
                      - checkbox "Select" [ref=f11e487]
                    - cell " 27/11/2026 10:00 " [ref=f11e490]:
                      - generic [ref=f11e491]:
                        - generic [ref=f11e492]: 
                        - generic [ref=f11e495]:
                          - generic [ref=f11e496]: 27/11/2026
                          - generic [ref=f11e497]: 10:00
                        - generic [ref=f11e498]: 
                    - cell "67956" [ref=f11e501]
                    - cell [ref=f11e502]
                    - cell "111211126795620260dc9f" [ref=f11e503]
                    - cell [ref=f11e504]:
                      - button "1" [ref=f11e506]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e507]
                    - cell "Confirmed" [ref=f11e510]
                    - cell [ref=f11e518]:
                      - button "More" [ref=f11e521]:
                        - generic [ref=f11e522]: 
                  - row [ref=f11e524] [cursor=pointer]:
                    - cell [ref=f11e525]:
                      - checkbox "Select" [ref=f11e530]
                    - cell " 27/11/2026 10:00 " [ref=f11e533]:
                      - generic [ref=f11e534]:
                        - generic [ref=f11e535]: 
                        - generic [ref=f11e538]:
                          - generic [ref=f11e539]: 27/11/2026
                          - generic [ref=f11e540]: 10:00
                        - generic [ref=f11e541]: 
                    - cell "67951" [ref=f11e544]
                    - cell [ref=f11e545]
                    - cell "111211126795120262b714" [ref=f11e546]
                    - cell [ref=f11e547]:
                      - button "1" [ref=f11e549]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e550]
                    - cell "Confirmed" [ref=f11e553]
                    - cell [ref=f11e561]:
                      - button "More" [ref=f11e564]:
                        - generic [ref=f11e565]: 
                  - row [ref=f11e567] [cursor=pointer]:
                    - cell [ref=f11e568]:
                      - checkbox "Select" [ref=f11e573]
                    - cell " 27/11/2026 10:00 " [ref=f11e576]:
                      - generic [ref=f11e577]:
                        - generic [ref=f11e578]: 
                        - generic [ref=f11e581]:
                          - generic [ref=f11e582]: 27/11/2026
                          - generic [ref=f11e583]: 10:00
                        - generic [ref=f11e584]: 
                    - cell "67955" [ref=f11e587]
                    - cell [ref=f11e588]
                    - cell "111211126795520268efd6" [ref=f11e589]
                    - cell [ref=f11e590]:
                      - button "1" [ref=f11e592]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e593]
                    - cell "Confirmed" [ref=f11e596]
                    - cell [ref=f11e604]:
                      - button "More" [ref=f11e607]:
                        - generic [ref=f11e608]: 
                  - row [ref=f11e610] [cursor=pointer]:
                    - cell [ref=f11e611]:
                      - checkbox "Select" [ref=f11e616]
                    - cell " 27/11/2026 10:00 " [ref=f11e619]:
                      - generic [ref=f11e620]:
                        - generic [ref=f11e621]: 
                        - generic [ref=f11e624]:
                          - generic [ref=f11e625]: 27/11/2026
                          - generic [ref=f11e626]: 10:00
                        - generic [ref=f11e627]: 
                    - cell "67954" [ref=f11e630]
                    - cell [ref=f11e631]
                    - cell "11121112679542026ce655" [ref=f11e632]
                    - cell [ref=f11e633]:
                      - button "1" [ref=f11e635]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e636]
                    - cell "Confirmed" [ref=f11e639]
                    - cell [ref=f11e647]:
                      - button "More" [ref=f11e650]:
                        - generic [ref=f11e651]: 
                  - row [ref=f11e653] [cursor=pointer]:
                    - cell [ref=f11e654]:
                      - checkbox "Select" [ref=f11e659]
                    - cell " 27/11/2026 10:00" [ref=f11e662]:
                      - generic [ref=f11e663]:
                        - generic [ref=f11e664]: 
                        - generic [ref=f11e667]:
                          - generic [ref=f11e668]: 27/11/2026
                          - generic [ref=f11e669]: 10:00
                    - cell "67907" [ref=f11e670]
                    - cell [ref=f11e671]
                    - cell "-" [ref=f11e672]
                    - cell [ref=f11e673]:
                      - button "0" [ref=f11e675]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e676]
                    - cell "Confirmed" [ref=f11e679]
                    - cell [ref=f11e687]:
                      - button "More" [ref=f11e690]:
                        - generic [ref=f11e691]: 
                  - row [ref=f11e693] [cursor=pointer]:
                    - cell [ref=f11e694]:
                      - checkbox "Select" [ref=f11e699]
                    - cell " 27/11/2026 10:00 " [ref=f11e702]:
                      - generic [ref=f11e703]:
                        - generic [ref=f11e704]: 
                        - generic [ref=f11e707]:
                          - generic [ref=f11e708]: 27/11/2026
                          - generic [ref=f11e709]: 10:00
                        - generic [ref=f11e710]: 
                    - cell "67957" [ref=f11e713]
                    - cell [ref=f11e714]
                    - cell "11121112679572026449db" [ref=f11e715]
                    - cell [ref=f11e716]:
                      - button "1" [ref=f11e718]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e719]
                    - cell "Confirmed" [ref=f11e722]
                    - cell [ref=f11e730]:
                      - button "More" [ref=f11e733]:
                        - generic [ref=f11e734]: 
                  - row [ref=f11e736] [cursor=pointer]:
                    - cell [ref=f11e737]:
                      - checkbox "Select" [ref=f11e742]
                    - cell " 27/11/2026 10:00 " [ref=f11e745]:
                      - generic [ref=f11e746]:
                        - generic [ref=f11e747]: 
                        - generic [ref=f11e750]:
                          - generic [ref=f11e751]: 27/11/2026
                          - generic [ref=f11e752]: 10:00
                        - generic [ref=f11e753]: 
                    - cell "67959" [ref=f11e756]
                    - cell [ref=f11e757]
                    - cell "11121112679592026c04de" [ref=f11e758]
                    - cell [ref=f11e759]:
                      - button "1" [ref=f11e761]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e762]
                    - cell "Confirmed" [ref=f11e765]
                    - cell [ref=f11e773]:
                      - button "More" [ref=f11e776]:
                        - generic [ref=f11e777]: 
                  - row [ref=f11e779] [cursor=pointer]:
                    - cell [ref=f11e780]:
                      - checkbox "Select" [ref=f11e785]
                    - cell " 27/11/2026 10:00 " [ref=f11e788]:
                      - generic [ref=f11e789]:
                        - generic [ref=f11e790]: 
                        - generic [ref=f11e793]:
                          - generic [ref=f11e794]: 27/11/2026
                          - generic [ref=f11e795]: 10:00
                        - generic [ref=f11e796]: 
                    - cell "67960" [ref=f11e799]
                    - cell [ref=f11e800]
                    - cell "1112111267960202641a9a" [ref=f11e801]
                    - cell [ref=f11e802]:
                      - button "1" [ref=f11e804]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e805]
                    - cell "Confirmed" [ref=f11e808]
                    - cell [ref=f11e816]:
                      - button "More" [ref=f11e819]:
                        - generic [ref=f11e820]: 
                  - row [ref=f11e822] [cursor=pointer]:
                    - cell [ref=f11e823]:
                      - checkbox "Select" [ref=f11e828]
                    - cell " 27/11/2026 10:00 " [ref=f11e831]:
                      - generic [ref=f11e832]:
                        - generic [ref=f11e833]: 
                        - generic [ref=f11e836]:
                          - generic [ref=f11e837]: 27/11/2026
                          - generic [ref=f11e838]: 10:00
                        - generic [ref=f11e839]: 
                    - cell "67952" [ref=f11e842]
                    - cell [ref=f11e843]
                    - cell "111211126795220265e3a8" [ref=f11e844]
                    - cell [ref=f11e845]:
                      - button "1" [ref=f11e847]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e848]
                    - cell "Confirmed" [ref=f11e851]
                    - cell [ref=f11e859]:
                      - button "More" [ref=f11e862]:
                        - generic [ref=f11e863]: 
                  - row [ref=f11e865] [cursor=pointer]:
                    - cell [ref=f11e866]:
                      - checkbox "Select" [ref=f11e871]
                    - cell " 27/11/2026 10:00 " [ref=f11e874]:
                      - generic [ref=f11e875]:
                        - generic [ref=f11e876]: 
                        - generic [ref=f11e879]:
                          - generic [ref=f11e880]: 27/11/2026
                          - generic [ref=f11e881]: 10:00
                        - generic [ref=f11e882]: 
                    - cell "67945" [ref=f11e885]
                    - cell [ref=f11e886]
                    - cell "111211126794520265c4f0" [ref=f11e887]
                    - cell [ref=f11e888]:
                      - button "1" [ref=f11e890]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e891]
                    - cell "Confirmed" [ref=f11e894]
                    - cell [ref=f11e902]:
                      - button "More" [ref=f11e905]:
                        - generic [ref=f11e906]: 
                  - row [ref=f11e908] [cursor=pointer]:
                    - cell [ref=f11e909]:
                      - checkbox "Select" [ref=f11e914]
                    - cell " 27/11/2026 10:00 " [ref=f11e917]:
                      - generic [ref=f11e918]:
                        - generic [ref=f11e919]: 
                        - generic [ref=f11e922]:
                          - generic [ref=f11e923]: 27/11/2026
                          - generic [ref=f11e924]: 10:00
                        - generic [ref=f11e925]: 
                    - cell "67949" [ref=f11e928]
                    - cell [ref=f11e929]
                    - cell "11121112679492026eebad" [ref=f11e930]
                    - cell [ref=f11e931]:
                      - button "1" [ref=f11e933]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e934]
                    - cell "Confirmed" [ref=f11e937]
                    - cell [ref=f11e945]:
                      - button "More" [ref=f11e948]:
                        - generic [ref=f11e949]: 
                  - row [ref=f11e951] [cursor=pointer]:
                    - cell [ref=f11e952]:
                      - checkbox "Select" [ref=f11e957]
                    - cell " 27/11/2026 10:00 " [ref=f11e960]:
                      - generic [ref=f11e961]:
                        - generic [ref=f11e962]: 
                        - generic [ref=f11e965]:
                          - generic [ref=f11e966]: 27/11/2026
                          - generic [ref=f11e967]: 10:00
                        - generic [ref=f11e968]: 
                    - cell "67950" [ref=f11e971]
                    - cell [ref=f11e972]
                    - cell "11121112679502026f2f3b" [ref=f11e973]
                    - cell [ref=f11e974]:
                      - button "1" [ref=f11e976]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e977]
                    - cell "Confirmed" [ref=f11e980]
                    - cell [ref=f11e988]:
                      - button "More" [ref=f11e991]:
                        - generic [ref=f11e992]: 
                  - row [ref=f11e994] [cursor=pointer]:
                    - cell [ref=f11e995]:
                      - checkbox "Select" [ref=f11e1000]
                    - cell " 27/11/2026 10:00 " [ref=f11e1003]:
                      - generic [ref=f11e1004]:
                        - generic [ref=f11e1005]: 
                        - generic [ref=f11e1008]:
                          - generic [ref=f11e1009]: 27/11/2026
                          - generic [ref=f11e1010]: 10:00
                        - generic [ref=f11e1011]: 
                    - cell "67953" [ref=f11e1014]
                    - cell [ref=f11e1015]
                    - cell "11121112679532026b5a31" [ref=f11e1016]
                    - cell [ref=f11e1017]:
                      - button "1" [ref=f11e1019]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e1020]
                    - cell "Confirmed" [ref=f11e1023]
                    - cell [ref=f11e1031]:
                      - button "More" [ref=f11e1034]:
                        - generic [ref=f11e1035]: 
                  - row [ref=f11e1037] [cursor=pointer]:
                    - cell [ref=f11e1038]:
                      - checkbox "Select" [ref=f11e1043]
                    - cell " 27/11/2026 10:00 " [ref=f11e1046]:
                      - generic [ref=f11e1047]:
                        - generic [ref=f11e1048]: 
                        - generic [ref=f11e1051]:
                          - generic [ref=f11e1052]: 27/11/2026
                          - generic [ref=f11e1053]: 10:00
                        - generic [ref=f11e1054]: 
                    - cell "67970" [ref=f11e1057]
                    - cell [ref=f11e1058]
                    - cell "111211126797020268d6ae" [ref=f11e1059]
                    - cell [ref=f11e1060]:
                      - button "1" [ref=f11e1062]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f11e1063]
                    - cell "Confirmed" [ref=f11e1066]
                    - cell [ref=f11e1074]:
                      - button "More" [ref=f11e1077]:
                        - generic [ref=f11e1078]: 
              - generic [ref=f11e1080]:
                - generic [ref=f11e1081]: 1 - 20 of 123
                - navigation "Paginación de resultados" [ref=f11e1084]:
                  - generic [ref=f11e1085]:
                    - button "Página 1" [ref=f11e1086] [cursor=pointer]: "1"
                    - button "Página 2" [ref=f11e1087] [cursor=pointer]: "2"
                    - button "Página 3" [ref=f11e1088] [cursor=pointer]: "3"
                    - generic [ref=f11e1092]:
                      - generic [ref=f11e1093] [cursor=pointer]:
                        - generic [ref=f11e1094]: ...
                        - combobox "Ir a otra página": ...
                      - group [aria-hidden]
                    - button "Página 5" [ref=f11e1096] [cursor=pointer]: "5"
                    - button "Página 6" [ref=f11e1097] [cursor=pointer]: "6"
                    - button "Página 7" [ref=f11e1098] [cursor=pointer]: "7"
                  - button "Página siguiente" [ref=f11e1100] [cursor=pointer]:
                    - generic [aria-hidden] [ref=f11e1101]: 
          - generic [ref=f11e1103]:
            - generic [ref=f11e1104] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=f11e1105] [cursor=pointer]: Privacy policy
          - generic [ref=f11e1106]:
            - generic [ref=f11e1107]:
              - generic [ref=f11e1108] [cursor=pointer]: 
              - generic [ref=f11e1110]: 0 selected
            - generic [ref=f11e1113] [cursor=pointer]:
              - generic [ref=f11e1115]: 
              - generic [ref=f11e1116]: SELECT ALL
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