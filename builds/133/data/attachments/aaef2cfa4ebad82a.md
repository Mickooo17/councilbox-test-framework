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
- generic [ref=f6e3]:
  - generic [ref=f6e4]:
    - button "" [ref=f6e5] [cursor=pointer]
    - generic [ref=f6e10]:
      - link [ref=f6e12] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=f6e13]:
          - generic [ref=f6e14]: 
          - generic [ref=f6e16]: Activity
      - link [ref=f6e18] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=f6e19]:
          - generic [ref=f6e20]: 
          - generic [ref=f6e22]: Appointments
      - link [ref=f6e24] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=f6e25]:
          - generic [ref=f6e26]: 
          - generic [ref=f6e28]: Processes
      - link [ref=f6e30] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=f6e31]:
          - generic [ref=f6e32]: 
          - generic [ref=f6e34]: Procedures
      - link [ref=f6e36] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=f6e37]:
          - generic [ref=f6e38]: 
          - generic [ref=f6e40]: Templates
      - link [ref=f6e42] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=f6e43]:
          - generic [ref=f6e44]: 
          - generic [ref=f6e46]: Documents
      - link [ref=f6e48] [cursor=pointer]:
        - /url: /company/1112/entities
        - button " Entities" [ref=f6e49]:
          - generic [ref=f6e50]: 
          - generic [ref=f6e52]: Entities
      - link [ref=f6e54] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=f6e55]:
          - generic [ref=f6e56]: 
          - generic [ref=f6e58]: Users
    - generic [ref=f6e60]:
      - img "CBX white Logo" [ref=f6e61]
      - generic [ref=f6e62]: © 2026 v8.8.0
  - generic [ref=f6e64]:
    - banner [ref=f6e65]:
      - button [ref=f6e67] [cursor=pointer]:
        - img "Logo Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e68]
      - generic [ref=f6e69]: Grupo Castelar Servicios Legales y Financieros S.A
      - generic [ref=f6e75]:
        - button [ref=f6e78] [cursor=pointer]:
          - button "Notifications" [ref=f6e79]:
            - generic [ref=f6e80]: 
        - button [ref=f6e82] [cursor=pointer]:
          - button "Button user" [ref=f6e84]:
            - generic [ref=f6e87]:
              - img "Logo Virtual Citizen Service Office" [ref=f6e89]
              - generic [ref=f6e90]: 
    - generic [ref=f6e92]:
      - button "Actions" [ref=f6e95] [cursor=pointer]:
        - generic [ref=f6e96]: 
      - generic [ref=f6e98]:
        - tablist "Pestañas" [ref=f6e102]:
          - tab "Video-appointments" [selected] [ref=f6e103] [cursor=pointer]:
            - paragraph [ref=f6e105]: Video-appointments
          - tab "In-person appointments" [ref=f6e106] [cursor=pointer]:
            - paragraph [ref=f6e108]: In-person appointments
        - generic [ref=f6e110]:
          - generic [ref=f6e112]:
            - generic [ref=f6e113]:
              - generic [ref=f6e115]:
                - generic [ref=f6e118]:
                  - generic [ref=f6e119] [cursor=pointer]:
                    - generic [ref=f6e121]:
                      - generic [ref=f6e122]: 
                      - generic [ref=f6e123]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=f6e129]:
                  - generic [ref=f6e130] [cursor=pointer]:
                    - generic [ref=f6e131]: Confirmed, In progress, Pending report, Completed, In pause
                    - combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
                    - generic [ref=f6e132]: Status
                  - group [aria-hidden]
                - generic [ref=f6e138]:
                  - generic [ref=f6e139] [cursor=pointer]:
                    - generic [ref=f6e140]: This week
                    - combobox "Period": This week
                    - generic [ref=f6e141]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=f6e145] [cursor=pointer]:
                  - generic [ref=f6e146]: 
              - generic [ref=f6e147]:
                - generic [ref=f6e148]:
                  - paragraph [ref=f6e149]: Search by participant or record
                  - generic [ref=f6e152]:
                    - button "Search" [ref=f6e154] [cursor=pointer]:
                      - generic [ref=f6e155]: 
                    - textbox "Search by participant or record" [ref=f6e156]:
                      - /placeholder: Search
                - button "Help" [ref=f6e157] [cursor=pointer]:
                  - generic [ref=f6e158]: 
            - generic [ref=f6e166]:
              - table [ref=f6e167]:
                - rowgroup [ref=f6e168]:
                  - row [ref=f6e169]:
                    - columnheader "Selection" [ref=f6e170]
                    - columnheader "Date Date " [ref=f6e172]:
                      - generic [ref=f6e173]: Date
                      - button "Date " [ref=f6e174] [cursor=pointer]:
                        - generic [ref=f6e175]: Date
                        - generic [ref=f6e176]: 
                    - columnheader "Ref. Ref. " [ref=f6e178]:
                      - generic [ref=f6e179]: Ref.
                      - button "Ref. " [ref=f6e180] [cursor=pointer]:
                        - generic [ref=f6e181]: Ref.
                        - generic [ref=f6e182]: 
                    - columnheader "External ID External ID " [ref=f6e184]:
                      - generic [ref=f6e185]: External ID
                      - button "External ID " [ref=f6e186] [cursor=pointer]:
                        - generic [ref=f6e187]: External ID
                        - generic [ref=f6e188]: 
                    - columnheader "Record Record " [ref=f6e190]:
                      - generic [ref=f6e191]: Record
                      - button "Record " [ref=f6e192] [cursor=pointer]:
                        - generic [ref=f6e193]: Record
                        - generic [ref=f6e194]: 
                    - columnheader "Documents" [ref=f6e196]
                    - columnheader "Entity Entity " [ref=f6e197]:
                      - generic [ref=f6e198]: Entity
                      - button "Entity " [ref=f6e199] [cursor=pointer]:
                        - generic [ref=f6e200]: Entity
                        - generic [ref=f6e201]: 
                    - columnheader "Status Status " [ref=f6e203]:
                      - generic [ref=f6e204]: Status
                      - button "Status " [ref=f6e205] [cursor=pointer]:
                        - generic [ref=f6e206]: Status
                        - generic [ref=f6e207]: 
                    - columnheader "Actions [object Object]" [ref=f6e209]:
                      - generic [ref=f6e210]: Actions
                      - generic [ref=f6e213]:
                        - generic [ref=f6e214] [cursor=pointer]:
                          - generic [aria-hidden] [ref=f6e216]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=f6e218]:
                  - row [ref=f6e219] [cursor=pointer]:
                    - cell [ref=f6e220]:
                      - checkbox "Select" [ref=f6e225]
                    - cell " 27/11/2026 10:00  " [ref=f6e228]:
                      - generic [ref=f6e229]:
                        - generic [ref=f6e230]: 
                        - generic [ref=f6e233]:
                          - generic [ref=f6e234]: 27/11/2026
                          - generic [ref=f6e235]: 10:00
                        - generic [ref=f6e236]:
                          - generic [ref=f6e237]: 
                          - generic [ref=f6e239]: 
                    - cell "67966" [ref=f6e241]
                    - cell [ref=f6e242]
                    - cell "111211126796620265902d" [ref=f6e243]
                    - cell [ref=f6e244]:
                      - button "1" [ref=f6e246]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e247]
                    - cell "Confirmed" [ref=f6e250]
                    - cell [ref=f6e258]:
                      - button "More" [ref=f6e261]:
                        - generic [ref=f6e262]: 
                  - row [ref=f6e264] [cursor=pointer]:
                    - cell [ref=f6e265]:
                      - checkbox "Select" [ref=f6e270]
                    - cell " 27/11/2026 10:00 " [ref=f6e273]:
                      - generic [ref=f6e274]:
                        - generic [ref=f6e275]: 
                        - generic [ref=f6e278]:
                          - generic [ref=f6e279]: 27/11/2026
                          - generic [ref=f6e280]: 10:00
                        - generic [ref=f6e281]: 
                    - cell "67963" [ref=f6e284]
                    - cell [ref=f6e285]
                    - cell "11121112679632026e7a66" [ref=f6e286]
                    - cell [ref=f6e287]:
                      - button "1" [ref=f6e289]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e290]
                    - cell "Confirmed" [ref=f6e293]
                    - cell [ref=f6e301]:
                      - button "More" [ref=f6e304]:
                        - generic [ref=f6e305]: 
                  - row [ref=f6e307] [cursor=pointer]:
                    - cell [ref=f6e308]:
                      - checkbox "Select" [ref=f6e313]
                    - cell " 27/11/2026 10:00  " [ref=f6e316]:
                      - generic [ref=f6e317]:
                        - generic [ref=f6e318]: 
                        - generic [ref=f6e321]:
                          - generic [ref=f6e322]: 27/11/2026
                          - generic [ref=f6e323]: 10:00
                        - generic [ref=f6e324]:
                          - generic [ref=f6e325]: 
                          - generic [ref=f6e327]: 
                    - cell "67964" [ref=f6e329]
                    - cell [ref=f6e330]
                    - cell "1112111267964202683a19" [ref=f6e331]
                    - cell [ref=f6e332]:
                      - button "1" [ref=f6e334]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e335]
                    - cell "Confirmed" [ref=f6e338]
                    - cell [ref=f6e346]:
                      - button "More" [ref=f6e349]:
                        - generic [ref=f6e350]: 
                  - row [ref=f6e352] [cursor=pointer]:
                    - cell [ref=f6e353]:
                      - checkbox "Select" [ref=f6e358]
                    - cell " 27/11/2026 10:00 " [ref=f6e361]:
                      - generic [ref=f6e362]:
                        - generic [ref=f6e363]: 
                        - generic [ref=f6e366]:
                          - generic [ref=f6e367]: 27/11/2026
                          - generic [ref=f6e368]: 10:00
                        - generic [ref=f6e369]: 
                    - cell "67965" [ref=f6e372]
                    - cell [ref=f6e373]
                    - cell "11121112679652026bc1e3" [ref=f6e374]
                    - cell [ref=f6e375]:
                      - button "1" [ref=f6e377]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e378]
                    - cell "Confirmed" [ref=f6e381]
                    - cell [ref=f6e389]:
                      - button "More" [ref=f6e392]:
                        - generic [ref=f6e393]: 
                  - row [ref=f6e395] [cursor=pointer]:
                    - cell [ref=f6e396]:
                      - checkbox "Select" [ref=f6e401]
                    - cell " 27/11/2026 10:00 " [ref=f6e404]:
                      - generic [ref=f6e405]:
                        - generic [ref=f6e406]: 
                        - generic [ref=f6e409]:
                          - generic [ref=f6e410]: 27/11/2026
                          - generic [ref=f6e411]: 10:00
                        - generic [ref=f6e412]: 
                    - cell "67958" [ref=f6e415]
                    - cell [ref=f6e416]
                    - cell "111211126795820263f7f0" [ref=f6e417]
                    - cell [ref=f6e418]:
                      - button "1" [ref=f6e420]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e421]
                    - cell "Confirmed" [ref=f6e424]
                    - cell [ref=f6e432]:
                      - button "More" [ref=f6e435]:
                        - generic [ref=f6e436]: 
                  - row [ref=f6e438] [cursor=pointer]:
                    - cell [ref=f6e439]:
                      - checkbox "Select" [ref=f6e444]
                    - cell " 27/11/2026 10:00 " [ref=f6e447]:
                      - generic [ref=f6e448]:
                        - generic [ref=f6e449]: 
                        - generic [ref=f6e452]:
                          - generic [ref=f6e453]: 27/11/2026
                          - generic [ref=f6e454]: 10:00
                        - generic [ref=f6e455]: 
                    - cell "67961" [ref=f6e458]
                    - cell [ref=f6e459]
                    - cell "111211126796120266b636" [ref=f6e460]
                    - cell [ref=f6e461]:
                      - button "1" [ref=f6e463]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e464]
                    - cell "Confirmed" [ref=f6e467]
                    - cell [ref=f6e475]:
                      - button "More" [ref=f6e478]:
                        - generic [ref=f6e479]: 
                  - row [ref=f6e481] [cursor=pointer]:
                    - cell [ref=f6e482]:
                      - checkbox "Select" [ref=f6e487]
                    - cell " 27/11/2026 10:00 " [ref=f6e490]:
                      - generic [ref=f6e491]:
                        - generic [ref=f6e492]: 
                        - generic [ref=f6e495]:
                          - generic [ref=f6e496]: 27/11/2026
                          - generic [ref=f6e497]: 10:00
                        - generic [ref=f6e498]: 
                    - cell "67956" [ref=f6e501]
                    - cell [ref=f6e502]
                    - cell "111211126795620260dc9f" [ref=f6e503]
                    - cell [ref=f6e504]:
                      - button "1" [ref=f6e506]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e507]
                    - cell "Confirmed" [ref=f6e510]
                    - cell [ref=f6e518]:
                      - button "More" [ref=f6e521]:
                        - generic [ref=f6e522]: 
                  - row [ref=f6e524] [cursor=pointer]:
                    - cell [ref=f6e525]:
                      - checkbox "Select" [ref=f6e530]
                    - cell " 27/11/2026 10:00 " [ref=f6e533]:
                      - generic [ref=f6e534]:
                        - generic [ref=f6e535]: 
                        - generic [ref=f6e538]:
                          - generic [ref=f6e539]: 27/11/2026
                          - generic [ref=f6e540]: 10:00
                        - generic [ref=f6e541]: 
                    - cell "67951" [ref=f6e544]
                    - cell [ref=f6e545]
                    - cell "111211126795120262b714" [ref=f6e546]
                    - cell [ref=f6e547]:
                      - button "1" [ref=f6e549]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e550]
                    - cell "Confirmed" [ref=f6e553]
                    - cell [ref=f6e561]:
                      - button "More" [ref=f6e564]:
                        - generic [ref=f6e565]: 
                  - row [ref=f6e567] [cursor=pointer]:
                    - cell [ref=f6e568]:
                      - checkbox "Select" [ref=f6e573]
                    - cell " 27/11/2026 10:00 " [ref=f6e576]:
                      - generic [ref=f6e577]:
                        - generic [ref=f6e578]: 
                        - generic [ref=f6e581]:
                          - generic [ref=f6e582]: 27/11/2026
                          - generic [ref=f6e583]: 10:00
                        - generic [ref=f6e584]: 
                    - cell "67955" [ref=f6e587]
                    - cell [ref=f6e588]
                    - cell "111211126795520268efd6" [ref=f6e589]
                    - cell [ref=f6e590]:
                      - button "1" [ref=f6e592]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e593]
                    - cell "Confirmed" [ref=f6e596]
                    - cell [ref=f6e604]:
                      - button "More" [ref=f6e607]:
                        - generic [ref=f6e608]: 
                  - row [ref=f6e610] [cursor=pointer]:
                    - cell [ref=f6e611]:
                      - checkbox "Select" [ref=f6e616]
                    - cell " 27/11/2026 10:00 " [ref=f6e619]:
                      - generic [ref=f6e620]:
                        - generic [ref=f6e621]: 
                        - generic [ref=f6e624]:
                          - generic [ref=f6e625]: 27/11/2026
                          - generic [ref=f6e626]: 10:00
                        - generic [ref=f6e627]: 
                    - cell "67954" [ref=f6e630]
                    - cell [ref=f6e631]
                    - cell "11121112679542026ce655" [ref=f6e632]
                    - cell [ref=f6e633]:
                      - button "1" [ref=f6e635]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e636]
                    - cell "Confirmed" [ref=f6e639]
                    - cell [ref=f6e647]:
                      - button "More" [ref=f6e650]:
                        - generic [ref=f6e651]: 
                  - row [ref=f6e653] [cursor=pointer]:
                    - cell [ref=f6e654]:
                      - checkbox "Select" [ref=f6e659]
                    - cell " 27/11/2026 10:00" [ref=f6e662]:
                      - generic [ref=f6e663]:
                        - generic [ref=f6e664]: 
                        - generic [ref=f6e667]:
                          - generic [ref=f6e668]: 27/11/2026
                          - generic [ref=f6e669]: 10:00
                    - cell "67907" [ref=f6e670]
                    - cell [ref=f6e671]
                    - cell "-" [ref=f6e672]
                    - cell [ref=f6e673]:
                      - button "0" [ref=f6e675]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e676]
                    - cell "Confirmed" [ref=f6e679]
                    - cell [ref=f6e687]:
                      - button "More" [ref=f6e690]:
                        - generic [ref=f6e691]: 
                  - row [ref=f6e693] [cursor=pointer]:
                    - cell [ref=f6e694]:
                      - checkbox "Select" [ref=f6e699]
                    - cell " 27/11/2026 10:00 " [ref=f6e702]:
                      - generic [ref=f6e703]:
                        - generic [ref=f6e704]: 
                        - generic [ref=f6e707]:
                          - generic [ref=f6e708]: 27/11/2026
                          - generic [ref=f6e709]: 10:00
                        - generic [ref=f6e710]: 
                    - cell "67957" [ref=f6e713]
                    - cell [ref=f6e714]
                    - cell "11121112679572026449db" [ref=f6e715]
                    - cell [ref=f6e716]:
                      - button "1" [ref=f6e718]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e719]
                    - cell "Confirmed" [ref=f6e722]
                    - cell [ref=f6e730]:
                      - button "More" [ref=f6e733]:
                        - generic [ref=f6e734]: 
                  - row [ref=f6e736] [cursor=pointer]:
                    - cell [ref=f6e737]:
                      - checkbox "Select" [ref=f6e742]
                    - cell " 27/11/2026 10:00 " [ref=f6e745]:
                      - generic [ref=f6e746]:
                        - generic [ref=f6e747]: 
                        - generic [ref=f6e750]:
                          - generic [ref=f6e751]: 27/11/2026
                          - generic [ref=f6e752]: 10:00
                        - generic [ref=f6e753]: 
                    - cell "67959" [ref=f6e756]
                    - cell [ref=f6e757]
                    - cell "11121112679592026c04de" [ref=f6e758]
                    - cell [ref=f6e759]:
                      - button "1" [ref=f6e761]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e762]
                    - cell "Confirmed" [ref=f6e765]
                    - cell [ref=f6e773]:
                      - button "More" [ref=f6e776]:
                        - generic [ref=f6e777]: 
                  - row [ref=f6e779] [cursor=pointer]:
                    - cell [ref=f6e780]:
                      - checkbox "Select" [ref=f6e785]
                    - cell " 27/11/2026 10:00 " [ref=f6e788]:
                      - generic [ref=f6e789]:
                        - generic [ref=f6e790]: 
                        - generic [ref=f6e793]:
                          - generic [ref=f6e794]: 27/11/2026
                          - generic [ref=f6e795]: 10:00
                        - generic [ref=f6e796]: 
                    - cell "67960" [ref=f6e799]
                    - cell [ref=f6e800]
                    - cell "1112111267960202641a9a" [ref=f6e801]
                    - cell [ref=f6e802]:
                      - button "1" [ref=f6e804]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e805]
                    - cell "Confirmed" [ref=f6e808]
                    - cell [ref=f6e816]:
                      - button "More" [ref=f6e819]:
                        - generic [ref=f6e820]: 
                  - row [ref=f6e822] [cursor=pointer]:
                    - cell [ref=f6e823]:
                      - checkbox "Select" [ref=f6e828]
                    - cell " 27/11/2026 10:00 " [ref=f6e831]:
                      - generic [ref=f6e832]:
                        - generic [ref=f6e833]: 
                        - generic [ref=f6e836]:
                          - generic [ref=f6e837]: 27/11/2026
                          - generic [ref=f6e838]: 10:00
                        - generic [ref=f6e839]: 
                    - cell "67952" [ref=f6e842]
                    - cell [ref=f6e843]
                    - cell "111211126795220265e3a8" [ref=f6e844]
                    - cell [ref=f6e845]:
                      - button "1" [ref=f6e847]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e848]
                    - cell "Confirmed" [ref=f6e851]
                    - cell [ref=f6e859]:
                      - button "More" [ref=f6e862]:
                        - generic [ref=f6e863]: 
                  - row [ref=f6e865] [cursor=pointer]:
                    - cell [ref=f6e866]:
                      - checkbox "Select" [ref=f6e871]
                    - cell " 27/11/2026 10:00 " [ref=f6e874]:
                      - generic [ref=f6e875]:
                        - generic [ref=f6e876]: 
                        - generic [ref=f6e879]:
                          - generic [ref=f6e880]: 27/11/2026
                          - generic [ref=f6e881]: 10:00
                        - generic [ref=f6e882]: 
                    - cell "67945" [ref=f6e885]
                    - cell [ref=f6e886]
                    - cell "111211126794520265c4f0" [ref=f6e887]
                    - cell [ref=f6e888]:
                      - button "1" [ref=f6e890]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e891]
                    - cell "Confirmed" [ref=f6e894]
                    - cell [ref=f6e902]:
                      - button "More" [ref=f6e905]:
                        - generic [ref=f6e906]: 
                  - row [ref=f6e908] [cursor=pointer]:
                    - cell [ref=f6e909]:
                      - checkbox "Select" [ref=f6e914]
                    - cell " 27/11/2026 10:00 " [ref=f6e917]:
                      - generic [ref=f6e918]:
                        - generic [ref=f6e919]: 
                        - generic [ref=f6e922]:
                          - generic [ref=f6e923]: 27/11/2026
                          - generic [ref=f6e924]: 10:00
                        - generic [ref=f6e925]: 
                    - cell "67949" [ref=f6e928]
                    - cell [ref=f6e929]
                    - cell "11121112679492026eebad" [ref=f6e930]
                    - cell [ref=f6e931]:
                      - button "1" [ref=f6e933]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e934]
                    - cell "Confirmed" [ref=f6e937]
                    - cell [ref=f6e945]:
                      - button "More" [ref=f6e948]:
                        - generic [ref=f6e949]: 
                  - row [ref=f6e951] [cursor=pointer]:
                    - cell [ref=f6e952]:
                      - checkbox "Select" [ref=f6e957]
                    - cell " 27/11/2026 10:00 " [ref=f6e960]:
                      - generic [ref=f6e961]:
                        - generic [ref=f6e962]: 
                        - generic [ref=f6e965]:
                          - generic [ref=f6e966]: 27/11/2026
                          - generic [ref=f6e967]: 10:00
                        - generic [ref=f6e968]: 
                    - cell "67950" [ref=f6e971]
                    - cell [ref=f6e972]
                    - cell "11121112679502026f2f3b" [ref=f6e973]
                    - cell [ref=f6e974]:
                      - button "1" [ref=f6e976]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e977]
                    - cell "Confirmed" [ref=f6e980]
                    - cell [ref=f6e988]:
                      - button "More" [ref=f6e991]:
                        - generic [ref=f6e992]: 
                  - row [ref=f6e994] [cursor=pointer]:
                    - cell [ref=f6e995]:
                      - checkbox "Select" [ref=f6e1000]
                    - cell " 27/11/2026 10:00 " [ref=f6e1003]:
                      - generic [ref=f6e1004]:
                        - generic [ref=f6e1005]: 
                        - generic [ref=f6e1008]:
                          - generic [ref=f6e1009]: 27/11/2026
                          - generic [ref=f6e1010]: 10:00
                        - generic [ref=f6e1011]: 
                    - cell "67953" [ref=f6e1014]
                    - cell [ref=f6e1015]
                    - cell "11121112679532026b5a31" [ref=f6e1016]
                    - cell [ref=f6e1017]:
                      - button "1" [ref=f6e1019]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e1020]
                    - cell "Confirmed" [ref=f6e1023]
                    - cell [ref=f6e1031]:
                      - button "More" [ref=f6e1034]:
                        - generic [ref=f6e1035]: 
                  - row [ref=f6e1037] [cursor=pointer]:
                    - cell [ref=f6e1038]:
                      - checkbox "Select" [ref=f6e1043]
                    - cell " 27/11/2026 10:00 " [ref=f6e1046]:
                      - generic [ref=f6e1047]:
                        - generic [ref=f6e1048]: 
                        - generic [ref=f6e1051]:
                          - generic [ref=f6e1052]: 27/11/2026
                          - generic [ref=f6e1053]: 10:00
                        - generic [ref=f6e1054]: 
                    - cell "67970" [ref=f6e1057]
                    - cell [ref=f6e1058]
                    - cell "111211126797020268d6ae" [ref=f6e1059]
                    - cell [ref=f6e1060]:
                      - button "1" [ref=f6e1062]
                    - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=f6e1063]
                    - cell "Confirmed" [ref=f6e1066]
                    - cell [ref=f6e1074]:
                      - button "More" [ref=f6e1077]:
                        - generic [ref=f6e1078]: 
              - generic [ref=f6e1080]:
                - generic [ref=f6e1081]: 1 - 20 of 118
                - navigation "Paginación de resultados" [ref=f6e1084]:
                  - generic [ref=f6e1085]:
                    - button "Página 1" [ref=f6e1086] [cursor=pointer]: "1"
                    - button "Página 2" [ref=f6e1087] [cursor=pointer]: "2"
                    - button "Página 3" [ref=f6e1088] [cursor=pointer]: "3"
                    - button "Página 4" [ref=f6e1089] [cursor=pointer]: "4"
                    - button "Página 5" [ref=f6e1090] [cursor=pointer]: "5"
                    - button "Página 6" [ref=f6e1091] [cursor=pointer]: "6"
                  - button "Página siguiente" [ref=f6e1093] [cursor=pointer]:
                    - generic [aria-hidden] [ref=f6e1094]: 
          - generic [ref=f6e1096]:
            - generic [ref=f6e1097] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=f6e1098] [cursor=pointer]: Privacy policy
          - generic [ref=f6e1099]:
            - generic [ref=f6e1100]:
              - generic [ref=f6e1101] [cursor=pointer]: 
              - generic [ref=f6e1103]: 0 selected
            - generic [ref=f6e1106] [cursor=pointer]:
              - generic [ref=f6e1108]: 
              - generic [ref=f6e1109]: SELECT ALL
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