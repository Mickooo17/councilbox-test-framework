# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> When user clicks Status for canceled appointment, Details window appears @XR-3126 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:18:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div').filter({ hasText: /^Status$/ }).locator('..').locator('[role="button"]').or(locator('input[name="Status"]').locator('..')).first() to be visible

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
        - /url: /company/1112/companies
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
      - generic [ref=f5e62]: © 2026 v8.7.0
  - generic [ref=f5e64]:
    - banner [ref=f5e65]:
      - button [ref=f5e67] [cursor=pointer]:
        - img "Logo QA DEV" [ref=f5e68]
      - generic [ref=f5e69]: QA DEV
      - generic [ref=f5e75]:
        - button [ref=f5e78] [cursor=pointer]:
          - button "Botón" [ref=f5e79]:
            - generic [ref=f5e80]: 
        - button [ref=f5e82] [cursor=pointer]:
          - button "Actions Button" [ref=f5e84]:
            - generic [ref=f5e87]:
              - img "Logo Virtual Citizen Service Office" [ref=f5e89]
              - generic [ref=f5e90]: 
    - generic [ref=f5e92]:
      - button "Actions" [ref=f5e95] [cursor=pointer]:
        - generic [ref=f5e96]: 
      - generic [ref=f5e98]:
        - tablist "Tabs" [ref=f5e102]:
          - tab "Botón" [selected] [ref=f5e103] [cursor=pointer]:
            - paragraph [ref=f5e105]: Video-appointments
          - tab "Botón" [ref=f5e106] [cursor=pointer]:
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
                    - button "Botón" [ref=f5e154] [cursor=pointer]:
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
                    - columnheader "Type Type " [ref=f5e197]:
                      - generic [ref=f5e198]: Type
                      - button "Type " [ref=f5e199] [cursor=pointer]:
                        - generic [ref=f5e200]: Type
                        - generic [ref=f5e201]: 
                    - columnheader "Status Status " [ref=f5e203]:
                      - generic [ref=f5e204]: Status
                      - button "Status " [ref=f5e205] [cursor=pointer]:
                        - generic [ref=f5e206]: Status
                        - generic [ref=f5e207]: 
                    - columnheader "Actions" [ref=f5e209]
                    - columnheader "Actions [object Object]" [ref=f5e210]:
                      - generic [ref=f5e211]: Actions
                      - generic [ref=f5e214]:
                        - generic [ref=f5e215] [cursor=pointer]:
                          - generic [aria-hidden] [ref=f5e217]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=f5e219]:
                  - row [ref=f5e220] [cursor=pointer]:
                    - cell [ref=f5e221]:
                      - checkbox "Select" [ref=f5e226]
                    - cell " 30/09/2026 10:00 " [ref=f5e229]:
                      - generic [ref=f5e230]:
                        - generic [ref=f5e231]: 
                        - generic [ref=f5e234]:
                          - generic [ref=f5e235]: 30/09/2026
                          - generic [ref=f5e236]: 10:00
                        - generic [ref=f5e237]: 
                    - cell "67005" [ref=f5e240]
                    - cell [ref=f5e241]
                    - cell "111211126700520269bb0e" [ref=f5e242]
                    - cell [ref=f5e243]:
                      - button "5" [ref=f5e245]
                    - cell "Appointment" [ref=f5e246]
                    - cell "Confirmed" [ref=f5e247]
                    - cell [ref=f5e255]:
                      - generic [ref=f5e257]:
                        - generic "Send notification" [ref=f5e259]:
                          - button "" [ref=f5e260]
                        - button "open" [ref=f5e264]
                    - cell [ref=f5e267]:
                      - button "More" [ref=f5e270]:
                        - generic [ref=f5e271]: 
                  - row [ref=f5e273] [cursor=pointer]:
                    - cell [ref=f5e274]:
                      - checkbox "Select" [ref=f5e279]
                    - cell " 29/09/2026 10:15 " [ref=f5e282]:
                      - generic [ref=f5e283]:
                        - generic [ref=f5e284]: 
                        - generic [ref=f5e287]:
                          - generic [ref=f5e288]: 29/09/2026
                          - generic [ref=f5e289]: 10:15
                        - generic [ref=f5e290]: 
                    - cell "67004" [ref=f5e293]
                    - cell [ref=f5e294]
                    - cell "11121112670042026a4539" [ref=f5e295]
                    - cell [ref=f5e296]:
                      - button "5" [ref=f5e298]
                    - cell "Appointment" [ref=f5e299]
                    - cell "Confirmed" [ref=f5e300]
                    - cell [ref=f5e308]:
                      - generic [ref=f5e310]:
                        - generic "Send notification" [ref=f5e312]:
                          - button "" [ref=f5e313]
                        - button "open" [ref=f5e317]
                    - cell [ref=f5e320]:
                      - button "More" [ref=f5e323]:
                        - generic [ref=f5e324]: 
                  - row [ref=f5e326] [cursor=pointer]:
                    - cell [ref=f5e327]:
                      - checkbox "Select" [ref=f5e332]
                    - cell " 29/09/2026 10:00 " [ref=f5e335]:
                      - generic [ref=f5e336]:
                        - generic [ref=f5e337]: 
                        - generic [ref=f5e340]:
                          - generic [ref=f5e341]: 29/09/2026
                          - generic [ref=f5e342]: 10:00
                        - generic [ref=f5e343]: 
                    - cell "66990" [ref=f5e346]
                    - cell [ref=f5e347]
                    - cell "1112111266990202676d35" [ref=f5e348]
                    - cell [ref=f5e349]:
                      - button "5" [ref=f5e351]
                    - cell "Appointment" [ref=f5e352]
                    - cell "In progress" [ref=f5e353]
                    - cell [ref=f5e361]:
                      - generic [ref=f5e363]:
                        - generic "Send notification" [ref=f5e365]:
                          - button "" [ref=f5e366]
                        - button "Join" [ref=f5e370]
                    - cell [ref=f5e373]:
                      - button "More" [ref=f5e376]:
                        - generic [ref=f5e377]: 
                  - row [ref=f5e379] [cursor=pointer]:
                    - cell [ref=f5e380]:
                      - checkbox "Select" [ref=f5e385]
                    - cell " 29/09/2026 10:00  " [ref=f5e388]:
                      - generic [ref=f5e389]:
                        - generic [ref=f5e390]: 
                        - generic [ref=f5e393]:
                          - generic [ref=f5e394]: 29/09/2026
                          - generic [ref=f5e395]: 10:00
                        - generic [ref=f5e396]:
                          - generic [ref=f5e397]: 
                          - generic [ref=f5e399]: 
                    - cell "66993" [ref=f5e401]
                    - cell [ref=f5e402]
                    - cell "11121112669932026b9126" [ref=f5e403]
                    - cell [ref=f5e404]:
                      - button "5" [ref=f5e406]
                    - cell "Appointment" [ref=f5e407]
                    - cell "Confirmed" [ref=f5e408]
                    - cell [ref=f5e416]:
                      - generic [ref=f5e418]:
                        - generic "Send notification" [ref=f5e420]:
                          - button "" [ref=f5e421]
                        - button "open" [ref=f5e425]
                    - cell [ref=f5e428]:
                      - button "More" [ref=f5e431]:
                        - generic [ref=f5e432]: 
                  - row [ref=f5e434] [cursor=pointer]:
                    - cell [ref=f5e435]:
                      - checkbox "Select" [ref=f5e440]
                    - cell " 29/09/2026 07:00" [ref=f5e443]:
                      - generic [ref=f5e444]:
                        - generic [ref=f5e445]: 
                        - generic [ref=f5e448]:
                          - generic [ref=f5e449]: 29/09/2026
                          - generic [ref=f5e450]: 07:00
                    - cell "67001" [ref=f5e451]
                    - cell [ref=f5e452]
                    - cell "111211126700120265f9f0" [ref=f5e453]
                    - cell [ref=f5e454]:
                      - button "5" [ref=f5e456]
                    - cell "Appointment" [ref=f5e457]
                    - cell "Completed" [ref=f5e458]
                    - cell [ref=f5e466]:
                      - generic "Send notification" [ref=f5e470]:
                        - button "" [ref=f5e471]
                    - cell [ref=f5e474]:
                      - button "More" [ref=f5e477]:
                        - generic [ref=f5e478]: 
                  - row [ref=f5e480] [cursor=pointer]:
                    - cell [ref=f5e481]:
                      - checkbox "Select" [ref=f5e486]
                    - cell " 29/09/2026 07:00 " [ref=f5e489]:
                      - generic [ref=f5e490]:
                        - generic [ref=f5e491]: 
                        - generic [ref=f5e494]:
                          - generic [ref=f5e495]: 29/09/2026
                          - generic [ref=f5e496]: 07:00
                        - generic [ref=f5e497]: 
                    - cell "66999" [ref=f5e500]
                    - cell [ref=f5e501]
                    - cell "11121112669992026bbb1b" [ref=f5e502]
                    - cell [ref=f5e503]:
                      - button "1" [ref=f5e505]
                    - cell "Appointment" [ref=f5e507]
                    - cell "Confirmed" [ref=f5e508]
                    - cell [ref=f5e516]:
                      - generic [ref=f5e518]:
                        - generic "Send notification" [ref=f5e520]:
                          - button "" [ref=f5e521]
                        - button "open" [ref=f5e525]
                    - cell [ref=f5e528]:
                      - button "More" [ref=f5e531]:
                        - generic [ref=f5e532]: 
                  - row [ref=f5e534] [cursor=pointer]:
                    - cell [ref=f5e535]:
                      - checkbox "Select" [ref=f5e540]
                    - cell " 29/09/2026 07:00" [ref=f5e543]:
                      - generic [ref=f5e544]:
                        - generic [ref=f5e545]: 
                        - generic [ref=f5e548]:
                          - generic [ref=f5e549]: 29/09/2026
                          - generic [ref=f5e550]: 07:00
                    - cell "67002" [ref=f5e551]
                    - cell [ref=f5e552]
                    - cell "moqa" [ref=f5e553]
                    - cell [ref=f5e554]:
                      - button "5" [ref=f5e556]
                    - cell "Appointment" [ref=f5e557]
                    - cell "Pending report" [ref=f5e558]
                    - cell [ref=f5e566]:
                      - generic "Send notification" [ref=f5e570]:
                        - button "" [ref=f5e571]
                    - cell [ref=f5e574]:
                      - button "More" [ref=f5e577]:
                        - generic [ref=f5e578]: 
                  - row [ref=f5e580] [cursor=pointer]:
                    - cell [ref=f5e581]:
                      - checkbox "Select" [ref=f5e586]
                    - cell " 29/09/2026 06:30 " [ref=f5e589]:
                      - generic [ref=f5e590]:
                        - generic [ref=f5e591]: 
                        - generic [ref=f5e594]:
                          - generic [ref=f5e595]: 29/09/2026
                          - generic [ref=f5e596]: 06:30
                        - generic [ref=f5e597]: 
                    - cell "67000" [ref=f5e600]
                    - cell [ref=f5e601]
                    - cell "1112111267000202668ee4" [ref=f5e602]
                    - cell [ref=f5e603]:
                      - button "8" [ref=f5e605]
                    - cell "Appointment" [ref=f5e607]
                    - cell "Confirmed" [ref=f5e608]
                    - cell [ref=f5e616]:
                      - generic [ref=f5e618]:
                        - generic "Send notification" [ref=f5e620]:
                          - button "" [ref=f5e621]
                        - button "open" [ref=f5e625]
                    - cell [ref=f5e628]:
                      - button "More" [ref=f5e631]:
                        - generic [ref=f5e632]: 
                  - row [ref=f5e634] [cursor=pointer]:
                    - cell [ref=f5e635]:
                      - checkbox "Select" [ref=f5e640]
                    - cell " 29/09/2026 06:15 " [ref=f5e643]:
                      - generic [ref=f5e644]:
                        - generic [ref=f5e645]: 
                        - generic [ref=f5e648]:
                          - generic [ref=f5e649]: 29/09/2026
                          - generic [ref=f5e650]: 06:15
                        - generic [ref=f5e651]: 
                    - cell "66998" [ref=f5e654]
                    - cell [ref=f5e655]
                    - cell "111211126699820265f68b" [ref=f5e656]
                    - cell [ref=f5e657]:
                      - button "5" [ref=f5e659]
                    - cell "Appointment" [ref=f5e660]
                    - cell "Confirmed" [ref=f5e661]
                    - cell [ref=f5e669]:
                      - generic [ref=f5e671]:
                        - generic "Send notification" [ref=f5e673]:
                          - button "" [ref=f5e674]
                        - button "open" [ref=f5e678]
                    - cell [ref=f5e681]:
                      - button "More" [ref=f5e684]:
                        - generic [ref=f5e685]: 
                  - row [ref=f5e687] [cursor=pointer]:
                    - cell [ref=f5e688]:
                      - checkbox "Select" [ref=f5e693]
                    - cell " 28/09/2026 20:15" [ref=f5e696]:
                      - generic [ref=f5e697]:
                        - generic [ref=f5e698]: 
                        - generic [ref=f5e701]:
                          - generic [ref=f5e702]: 28/09/2026
                          - generic [ref=f5e703]: 20:15
                    - cell "66997" [ref=f5e704]
                    - cell [ref=f5e705]
                    - cell "111211126699720263e3fa" [ref=f5e706]
                    - cell [ref=f5e707]:
                      - button "0" [ref=f5e709]
                    - cell "Appointment" [ref=f5e710]
                    - cell "Completed" [ref=f5e711]
                    - cell [ref=f5e719]:
                      - generic "Send notification" [ref=f5e723]:
                        - button "" [ref=f5e724]
                    - cell [ref=f5e727]:
                      - button "More" [ref=f5e730]:
                        - generic [ref=f5e731]: 
              - generic [ref=f5e733]: 1 - 10 of 10
          - generic [ref=f5e737]:
            - generic [ref=f5e738] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=f5e739] [cursor=pointer]: PRIVACY_POLICY
          - generic [ref=f5e740]:
            - generic [ref=f5e741]:
              - generic [ref=f5e742] [cursor=pointer]: 
              - generic [ref=f5e744]: 0 selected
            - generic [ref=f5e747] [cursor=pointer]:
              - generic [ref=f5e749]: 
              - generic [ref=f5e750]: SELECT ALL
```

# Test source

```ts
  9   |   reason?: string;
  10  |   observations?: string;
  11  |   participantName?: string;
  12  | }
  13  | 
  14  | export class AppointmentsPage extends BasePage {
  15  |   readonly statusFilterButton: Locator;
  16  |   readonly periodFilterButton: Locator;
  17  |   readonly searchInput: Locator;
  18  |   readonly viewModeDropdown: Locator;
  19  |   readonly calendarViewButton: Locator;
  20  |   readonly tableViewButton: Locator;
  21  |   readonly dayViewRadio: Locator;
  22  |   readonly appointmentsTable: Locator;
  23  |   readonly tableRows: Locator;
  24  | 
  25  |   // Appointment Details Window
  26  |   readonly backButton: Locator;
  27  |   readonly appointmentDetailsHeader: Locator;
  28  |   readonly procedureTitleText: Locator;
  29  |   readonly statusSection: Locator;
  30  |   readonly canceledBySection: Locator;
  31  |   readonly reasonSection: Locator;
  32  |   readonly observationsSection: Locator;
  33  |   readonly participantsSection: Locator;
  34  | 
  35  |   // Cancel Appointment Modal elements
  36  |   readonly cancelModal: Locator;
  37  |   readonly cancelObservationsLabel: Locator;
  38  |   readonly cancelObservationsInput: Locator;
  39  |   readonly cancelErrorHelperText: Locator;
  40  |   readonly cancelAcceptButton: Locator;
  41  |   readonly cancelCloseButton: Locator;
  42  | 
  43  |   constructor(page: Page) {
  44  |     super(page);
  45  | 
  46  |     // Filter controls
  47  |     this.statusFilterButton = page.locator('div').filter({ hasText: /^Status$/ }).locator('..').locator('[role="button"]').or(page.locator('input[name="Status"]').locator('..')).first();
  48  |     this.periodFilterButton = page.locator('div').filter({ hasText: /^Period$/ }).locator('..').locator('[role="button"]').or(page.locator('input[name="Period"]').locator('..')).first();
  49  |     this.searchInput = page.locator('input[placeholder="Search"], input[placeholder*="participant" i]').first();
  50  |     this.viewModeDropdown = page.locator('div').filter({ hasText: /List view|Calendar view|Daily view|Vista de lista|Vista de calendario|Vista diaria/i })
  51  |       .locator('..')
  52  |       .or(page.getByRole('button', { name: /List view|Calendar view|Daily view|Vista de lista|Vista de calendario|Vista diaria/i }))
  53  |       .or(page.locator('text="List view"').locator('..'))
  54  |       .first();
  55  |     this.calendarViewButton = page.getByRole('menuitem', { name: /Calendar view|Vista de calendario/i })
  56  |       .or(page.getByRole('option', { name: /Calendar view|Vista de calendario/i }))
  57  |       .or(page.locator('li, .MuiMenuItem-root').filter({ hasText: /Calendar view|Vista de calendario/i }))
  58  |       .or(page.getByText(/Calendar view|Vista de calendario/i))
  59  |       .first();
  60  |     this.tableViewButton = page.getByRole('menuitem', { name: /List view|Vista de lista/i })
  61  |       .or(page.getByRole('option', { name: /List view|Vista de lista/i }))
  62  |       .or(page.locator('li, .MuiMenuItem-root').filter({ hasText: /List view|Vista de lista/i }))
  63  |       .first();
  64  |     this.dayViewRadio = page.getByRole('radio', { name: /^Day$|^Día$/i })
  65  |       .or(page.locator('label, span').filter({ hasText: /^Day$|^Día$/i }))
  66  |       .first();
  67  |     this.appointmentsTable = page.locator('table').first();
  68  |     this.tableRows = page.locator('tbody tr');
  69  | 
  70  |     // Details view elements
  71  |     this.backButton = page.locator('button:has(.ri-arrow-left-line)').or(page.getByRole('button', { name: /back/i })).first();
  72  |     this.appointmentDetailsHeader = page.getByText(/^Appointment$/i).or(page.getByRole('heading', { name: /Appointment/i })).first();
  73  |     this.procedureTitleText = page.locator('div, p').filter({ hasText: /ALL in ONE/i }).first();
  74  |     this.statusSection = page.locator('div, p').filter({ hasText: /^Status$/i }).or(page.getByText(/^Status$/i)).first();
  75  |     this.canceledBySection = page.locator('div, p').filter({ hasText: /^Canceled by$/i }).or(page.getByText(/^Canceled by$/i)).first();
  76  |     this.reasonSection = page.locator('div, p').filter({ hasText: /^Reason$/i }).or(page.getByText(/^Reason$/i)).first();
  77  |     this.observationsSection = page.locator('div, p').filter({ hasText: /^Observations$/i }).or(page.getByText(/^Observations$/i)).first();
  78  |     this.participantsSection = page.locator('div, p').filter({ hasText: /^Participants$/i }).or(page.getByText(/^Participants$/i)).first();
  79  | 
  80  |     // Cancel modal elements
  81  |     this.cancelModal = page.locator('.cbx-Modal-content, [class*="Modal-content"]')
  82  |       .filter({ hasText: /Cancel the appointment|Cancelar cita/i })
  83  |       .first();
  84  |     this.cancelObservationsLabel = this.cancelModal.locator('text=/Observations\\*|Observaciones\\*/i').first();
  85  |     this.cancelObservationsInput = this.cancelModal.locator('input[maxlength="500"], textarea').first();
  86  |     this.cancelErrorHelperText = this.cancelModal.locator('.MuiFormHelperText-root, p.MuiFormHelperText-root').first();
  87  |     this.cancelAcceptButton = this.cancelModal.locator('#modal-button-accept').or(
  88  |       this.cancelModal.getByRole('button', { name: /^ACCEPT$|^Aceptar$/i })
  89  |     ).first();
  90  |     this.cancelCloseButton = this.cancelModal.locator('#modal-button-cancel').or(
  91  |       this.cancelModal.getByRole('button', { name: /^CLOSE$|^Cerrar$/i })
  92  |     ).first();
  93  |   }
  94  | 
  95  |   async navigateToAppointmentsPage(companyId: number = 1112) {
  96  |     await test.step('Navigate to Appointments page', async () => {
  97  |       await this.page.goto(resolveCompanyUrl(companyId), { waitUntil: 'domcontentloaded' });
  98  |       await this.page.waitForLoadState('networkidle');
  99  |       await this.dismissToastOrModal();
  100 |     }, {
  101 |       params: { companyId },
  102 |       subtitle: 'Open company appointments view and wait for data load',
  103 |     });
  104 |   }
  105 | 
  106 |   async filterByStatus(statusName: string = 'Canceled') {
  107 |     await test.step(`Filter appointments by status: "${statusName}"`, async () => {
  108 |       await this.dismissToastOrModal();
> 109 |       await this.statusFilterButton.waitFor({ state: 'visible', timeout: 10000 });
      |                                     ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  110 |       await this.statusFilterButton.click();
  111 |       await this.page.waitForTimeout(500);
  112 | 
  113 |       const optionRegex = new RegExp(statusName, 'i');
  114 |       const statusOption = this.page.getByRole('option', { name: optionRegex }).or(
  115 |         this.page.locator('li').filter({ hasText: optionRegex })
  116 |       ).first();
  117 |       await statusOption.waitFor({ state: 'visible', timeout: 5000 });
  118 |       await statusOption.click();
  119 | 
  120 |       // Close dropdown by pressing Escape
  121 |       await this.page.keyboard.press('Escape');
  122 |       await this.page.waitForTimeout(1000);
  123 |       await this.page.waitForLoadState('networkidle');
  124 |     }, {
  125 |       params: { statusName },
  126 |       subtitle: 'Open status filter dropdown, select option, and close menu',
  127 |     });
  128 |   }
  129 | 
  130 |   async searchAppointment(identifier: string | number) {
  131 |     await test.step(`Search appointment by identifier: "${identifier}"`, async () => {
  132 |       await this.dismissToastOrModal();
  133 |       await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
  134 |       await this.searchInput.fill(String(identifier));
  135 |       await this.searchInput.press('Enter');
  136 |       await this.page.waitForTimeout(1500);
  137 |       await this.page.waitForLoadState('networkidle');
  138 |     }, {
  139 |       params: { identifier: String(identifier) },
  140 |       subtitle: 'Input identifier into search field and press Enter',
  141 |     });
  142 |   }
  143 | 
  144 |   async getAppointmentRow(identifier: string | number): Promise<Locator> {
  145 |     const idStr = String(identifier);
  146 |     const row = this.page.locator('tr').filter({ hasText: idStr }).first();
  147 |     await row.waitFor({ state: 'visible', timeout: 15000 });
  148 |     return row;
  149 |   }
  150 | 
  151 |   async clickAppointmentStatus(identifier: string | number) {
  152 |     await test.step(`Click on Status section for appointment "${identifier}"`, async () => {
  153 |       const row = await this.getAppointmentRow(identifier);
  154 |       const statusCell = row.locator('td').filter({ hasText: /Cancel/i }).first();
  155 |       await statusCell.waitFor({ state: 'visible', timeout: 10000 });
  156 |       await statusCell.click();
  157 |       await this.page.waitForLoadState('networkidle');
  158 |       await this.page.waitForTimeout(1500);
  159 |       await this.dismissToastOrModal();
  160 |     }, {
  161 |       params: { identifier: String(identifier) },
  162 |       subtitle: 'Locate appointment row and click its status badge/cell',
  163 |     });
  164 |   }
  165 | 
  166 |   async verifyCanceledAppointmentDetailsWindow(expected?: CanceledAppointmentDetailsExpected) {
  167 |     await test.step('Verify Canceled Appointment Details window appears with correct information', async () => {
  168 |       await this.dismissToastOrModal();
  169 | 
  170 |       // Verify Appointment details header / window is visible
  171 |       await expect(this.appointmentDetailsHeader).toBeVisible({ timeout: 15000 });
  172 | 
  173 |       // Verify Canceled by section and label
  174 |       await expect(this.canceledBySection).toBeVisible({ timeout: 10000 });
  175 |       if (expected?.canceledBy) {
  176 |         await expect(this.page.getByText(expected.canceledBy).first()).toBeVisible({ timeout: 10000 });
  177 |       }
  178 | 
  179 |       // Verify Reason section and label
  180 |       await expect(this.reasonSection).toBeVisible({ timeout: 10000 });
  181 |       if (expected?.reason) {
  182 |         const reasonPattern = new RegExp(expected.reason, 'i');
  183 |         await expect(this.page.getByText(reasonPattern).first()).toBeVisible({ timeout: 10000 });
  184 |       }
  185 | 
  186 |       // Verify Observations section and comments if provided
  187 |       if (expected?.observations) {
  188 |         await expect(this.observationsSection).toBeVisible({ timeout: 10000 });
  189 |         await expect(this.page.getByText(expected.observations).first()).toBeVisible({ timeout: 10000 });
  190 |       }
  191 | 
  192 |       // Verify Participant details
  193 |       if (expected?.participantName) {
  194 |         await expect(this.page.getByText(expected.participantName).first()).toBeVisible({ timeout: 10000 });
  195 |       }
  196 |     }, {
  197 |       params: { expected },
  198 |       subtitle: 'Assert Details window heading, status, canceled by, reason, observations, and participants',
  199 |     });
  200 |   }
  201 | 
  202 |   async switchToCalendarView() {
  203 |     await test.step('Switch to Calendar view (Day view)', async () => {
  204 |       await this.dismissToastOrModal();
  205 |       
  206 |       const currentUrl = this.page.url();
  207 |       if (!currentUrl.includes('/appointments/one_on_one') && !currentUrl.includes('/appointments')) {
  208 |         await this.navigateToAppointmentsPage();
  209 |       }
```