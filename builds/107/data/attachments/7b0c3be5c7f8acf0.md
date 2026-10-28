# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> When user clicks Status for canceled appointment, Details window appears @XR-3126 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:18:7

# Error details

```
Error: CreateAppointment GraphQL error: [
  {
    "message": "Cannot read properties of undefined (reading 'find')",
    "code": 500,
    "locations": [
      {
        "line": 7,
        "column": 9
      }
    ],
    "path": [
      "createAppointment"
    ],
    "originalError": {
      "name": "UserError",
      "code": 500
    }
  }
]
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
                      - columnheader "Entity Entity " [ref=e197]:
                        - generic [ref=e198]: Entity
                        - button "Entity " [ref=e199] [cursor=pointer]:
                          - generic [ref=e200]: Entity
                          - generic [ref=e201]: 
                      - columnheader "Status Status " [ref=e203]:
                        - generic [ref=e204]: Status
                        - button "Status " [ref=e205] [cursor=pointer]:
                          - generic [ref=e206]: Status
                          - generic [ref=e207]: 
                      - columnheader "Actions [object Object]" [ref=e209]:
                        - generic [ref=e210]: Actions
                        - generic [ref=e213]:
                          - generic [ref=e214] [cursor=pointer]:
                            - generic [aria-hidden] [ref=e216]: 
                            - combobox "Settings": "[object Object]"
                          - group [aria-hidden]
                  - rowgroup [ref=e218]:
                    - row [ref=e219] [cursor=pointer]:
                      - cell [ref=e220]:
                        - checkbox "Select" [ref=e225]
                      - cell " 30/10/2026 08:00" [ref=e228]:
                        - generic [ref=e229]:
                          - generic [ref=e230]: 
                          - generic [ref=e233]:
                            - generic [ref=e234]: 30/10/2026
                            - generic [ref=e235]: 08:00
                      - cell "67334" [ref=e236]
                      - cell [ref=e237]
                      - cell "moqa" [ref=e238]
                      - cell [ref=e239]:
                        - button "4" [ref=e241]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e243]
                      - cell "Confirmed" [ref=e246]
                      - cell [ref=e254]:
                        - button "More" [ref=e257]:
                          - generic [ref=e258]: 
                    - row [ref=e260] [cursor=pointer]:
                      - cell [ref=e261]:
                        - checkbox "Select" [ref=e266]
                      - cell " 28/10/2026 13:45" [ref=e269]:
                        - generic [ref=e270]:
                          - generic [ref=e271]: 
                          - generic [ref=e274]:
                            - generic [ref=e275]: 28/10/2026
                            - generic [ref=e276]: 13:45
                      - cell "67404" [ref=e277]
                      - cell [ref=e278]
                      - cell "11121112674042026208d3" [ref=e279]
                      - cell [ref=e280]:
                        - button "1" [ref=e282]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e283]
                      - cell "Confirmed" [ref=e286]
                      - cell [ref=e294]:
                        - button "More" [ref=e297]:
                          - generic [ref=e298]: 
                    - row [ref=e300] [cursor=pointer]:
                      - cell [ref=e301]:
                        - checkbox "Select" [ref=e306]
                      - cell " 28/10/2026 12:30" [ref=e309]:
                        - generic [ref=e310]:
                          - generic [ref=e311]: 
                          - generic [ref=e314]:
                            - generic [ref=e315]: 28/10/2026
                            - generic [ref=e316]: 12:30
                      - cell "67403" [ref=e317]
                      - cell [ref=e318]
                      - cell "111211126740320269ba75" [ref=e319]
                      - cell [ref=e320]:
                        - button "1" [ref=e322]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e323]
                      - cell "Confirmed" [ref=e326]
                      - cell [ref=e334]:
                        - button "More" [ref=e337]:
                          - generic [ref=e338]: 
                    - row [ref=e340] [cursor=pointer]:
                      - cell [ref=e341]:
                        - checkbox "Select" [ref=e346]
                      - cell " 28/10/2026 12:30" [ref=e349]:
                        - generic [ref=e350]:
                          - generic [ref=e351]: 
                          - generic [ref=e354]:
                            - generic [ref=e355]: 28/10/2026
                            - generic [ref=e356]: 12:30
                      - cell "67402" [ref=e357]
                      - cell [ref=e358]
                      - cell "11121112674022026d156d" [ref=e359]
                      - cell [ref=e360]:
                        - button "1" [ref=e362]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e363]
                      - cell "Confirmed" [ref=e366]
                      - cell [ref=e374]:
                        - button "More" [ref=e377]:
                          - generic [ref=e378]: 
                    - row [ref=e380] [cursor=pointer]:
                      - cell [ref=e381]:
                        - checkbox "Select" [ref=e386]
                      - cell " 28/10/2026 11:45" [ref=e389]:
                        - generic [ref=e390]:
                          - generic [ref=e391]: 
                          - generic [ref=e394]:
                            - generic [ref=e395]: 28/10/2026
                            - generic [ref=e396]: 11:45
                      - cell "67405" [ref=e397]
                      - cell [ref=e398]
                      - cell "1112111267405202626966" [ref=e399]
                      - cell [ref=e400]:
                        - button "0" [ref=e402]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e403]
                      - cell "In progress" [ref=e406]
                      - cell [ref=e414]:
                        - button "More" [ref=e417]:
                          - generic [ref=e418]: 
                    - row [ref=e420] [cursor=pointer]:
                      - cell [ref=e421]:
                        - checkbox "Select" [ref=e426]
                      - cell " 28/10/2026 08:00 " [ref=e429]:
                        - generic [ref=e430]:
                          - generic [ref=e431]: 
                          - generic [ref=e434]:
                            - generic [ref=e435]: 28/10/2026
                            - generic [ref=e436]: 08:00
                          - generic [ref=e437]: 
                      - cell "67316" [ref=e440]
                      - cell [ref=e441]
                      - cell "111211126731620265cfca" [ref=e442]
                      - cell [ref=e443]:
                        - button "5" [ref=e445]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e446]
                      - cell "Confirmed" [ref=e449]
                      - cell [ref=e457]:
                        - button "More" [ref=e460]:
                          - generic [ref=e461]: 
                    - row [ref=e463] [cursor=pointer]:
                      - cell [ref=e464]:
                        - checkbox "Select" [ref=e469]
                      - cell " 27/10/2026 14:30 " [ref=e472]:
                        - generic [ref=e473]:
                          - generic [ref=e474]: 
                          - generic [ref=e477]:
                            - generic [ref=e478]: 27/10/2026
                            - generic [ref=e479]: 14:30
                          - generic [ref=e480]: 
                      - cell "67393" [ref=e483]
                      - cell [ref=e484]
                      - cell "111211126739320262f004" [ref=e485]
                      - cell [ref=e486]:
                        - button "5" [ref=e488]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e490]
                      - cell "In progress" [ref=e493]
                      - cell [ref=e501]:
                        - button "More" [ref=e504]:
                          - generic [ref=e505]: 
                    - row [ref=e507] [cursor=pointer]:
                      - cell [ref=e508]:
                        - checkbox "Select" [ref=e513]
                      - cell " 27/10/2026 14:00 " [ref=e516]:
                        - generic [ref=e517]:
                          - generic [ref=e518]: 
                          - generic [ref=e521]:
                            - generic [ref=e522]: 27/10/2026
                            - generic [ref=e523]: 14:00
                          - generic [ref=e524]: 
                      - cell "67392" [ref=e527]
                      - cell [ref=e528]
                      - cell "111211126739220265b02d" [ref=e529]
                      - cell [ref=e530]:
                        - button "5" [ref=e532]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e534]
                      - cell "In progress" [ref=e537]
                      - cell [ref=e545]:
                        - button "More" [ref=e548]:
                          - generic [ref=e549]: 
                    - row [ref=e551] [cursor=pointer]:
                      - cell [ref=e552]:
                        - checkbox "Select" [ref=e557]
                      - cell " 27/10/2026 08:00 " [ref=e560]:
                        - generic [ref=e561]:
                          - generic [ref=e562]: 
                          - generic [ref=e565]:
                            - generic [ref=e566]: 27/10/2026
                            - generic [ref=e567]: 08:00
                          - generic [ref=e568]: 
                      - cell "67328" [ref=e571]
                      - cell [ref=e572]
                      - cell "1112111267328202646515" [ref=e573]
                      - cell [ref=e574]:
                        - button "5" [ref=e576]
                      - cell "Grupo Castelar Servicios Legales y Financieros S.A" [ref=e577]
                      - cell "Confirmed" [ref=e580]
                      - cell [ref=e588]:
                        - button "More" [ref=e591]:
                          - generic [ref=e592]: 
                    - row [ref=e594] [cursor=pointer]:
                      - cell [ref=e595]:
                        - checkbox "Select" [ref=e600]
                      - cell " 26/10/2026 08:00" [ref=e603]:
                        - generic [ref=e604]:
                          - generic [ref=e605]: 
                          - generic [ref=e608]:
                            - generic [ref=e609]: 26/10/2026
                            - generic [ref=e610]: 08:00
                      - cell "67337" [ref=e611]
                      - cell "hhhhh," [ref=e612]
                      - cell "11122471673372026ec013" [ref=e613]
                      - cell [ref=e614]:
                        - button "4" [ref=e616]
                      - cell "Notaría y Servicios Jurídicos Castelar S.L." [ref=e618]
                      - cell "Pending report" [ref=e621]
                      - cell [ref=e629]:
                        - button "More" [ref=e632]:
                          - generic [ref=e633]: 
                - generic [ref=e635]: 1 - 10 of 10
            - generic [ref=e639]:
              - generic [ref=e640] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e641] [cursor=pointer]: PRIVACY_POLICY
            - generic [ref=e642]:
              - generic [ref=e643]:
                - generic [ref=e644] [cursor=pointer]: 
                - generic [ref=e646]: 0 selected
              - generic [ref=e649] [cursor=pointer]:
                - generic [ref=e651]: 
                - generic [ref=e652]: SELECT ALL
  - generic [ref=e653]:
    - generic [ref=e657]:
      - generic [ref=e658]: New version OVAC 8.7
      - generic [ref=e659]:
        - generic [ref=e660]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e661]: Review upgrades
    - button [ref=e667] [cursor=pointer]
```

# Test source

```ts
  27  |     requestContext: APIRequestContext,
  28  |     options: CreateAppointmentApiOptions = {}
  29  |   ): Promise<CreatedAppointmentData> {
  30  |     const companyId = options.companyId ?? 1112;
  31  |     const procedureId = options.procedureId ?? 3524;
  32  |     const procedureTitle = options.procedureTitle ?? 'ALL in ONE';
  33  | 
  34  |     // Calculate appointment start and end times (default: tomorrow at 10:00 AM UTC)
  35  |     const startDate = options.dateStart ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
  36  |     if (!options.dateStart) {
  37  |       startDate.setHours(10, 0, 0, 0);
  38  |     }
  39  |     const durationMs = (options.durationMinutes ?? 15) * 60 * 1000;
  40  |     const endDate = new Date(startDate.getTime() + durationMs);
  41  | 
  42  |     const participant: ParticipantDetails = {
  43  |       dni: options.participant?.dni ?? 'ammarpass',
  44  |       idCardType: options.participant?.idCardType ?? 'passport',
  45  |       name: options.participant?.name ?? 'Ammar',
  46  |       surname: options.participant?.surname ?? 'Micijevic',
  47  |       phone: options.participant?.phone ?? '+38761123456',
  48  |       email: options.participant?.email ?? 'ammar.micijevic@councilbox.com',
  49  |       zipcode: options.participant?.zipcode ?? '71000',
  50  |       country: options.participant?.country ?? 'Spain',
  51  |       prefix: options.participant?.prefix ?? '+387',
  52  |     };
  53  | 
  54  |     // Authenticate and fetch valid token
  55  |     const tokens = await ApiAuthHelper.getTokensForUser(
  56  |       requestContext,
  57  |       adminProfessionalUser.username,
  58  |       adminProfessionalUser.password
  59  |     );
  60  | 
  61  |     const graphqlUrl = ApiAuthHelper.getGraphqlUrl();
  62  | 
  63  |     const mutationQuery = `
  64  |       mutation CreateAppointment(
  65  |         $council: CouncilInput!,
  66  |         $participant: ParticipantInput!,
  67  |         $proceduresIds: [Int]
  68  |       ) {
  69  |         createAppointment(
  70  |           council: $council,
  71  |           participant: $participant,
  72  |           proceduresIds: $proceduresIds
  73  |         ) {
  74  |           id
  75  |           name
  76  |           caseNumber
  77  |           externalId
  78  |           dateStart
  79  |           dateEnd
  80  |           state
  81  |         }
  82  |       }
  83  |     `;
  84  | 
  85  |     const response = await requestContext.post(graphqlUrl, {
  86  |       headers: {
  87  |         'Content-Type': 'application/json',
  88  |         'Authorization': `Bearer ${tokens.token}`,
  89  |         'x-jwt-token': tokens.token,
  90  |         'cbx-client-v': '8.6.6',
  91  |       },
  92  |       data: {
  93  |         operationName: 'CreateAppointment',
  94  |         query: mutationQuery,
  95  |         variables: {
  96  |           council: {
  97  |             name: procedureTitle,
  98  |             companyId: companyId,
  99  |             councilType: 5,
  100 |             statuteId: procedureId,
  101 |             dateStart: startDate.toISOString(),
  102 |             dateEnd: endDate.toISOString(),
  103 |             language: 'en',
  104 |             observations: options.observations ?? 'Automated test appointment',
  105 |             internalNotes: options.internalNotes ?? 'Created via AppointmentApiHelper',
  106 |           },
  107 |           proceduresIds: [procedureId],
  108 |           participant: {
  109 |             dni: participant.dni,
  110 |             idCardType: participant.idCardType,
  111 |             name: participant.name,
  112 |             surname: participant.surname,
  113 |             phone: participant.phone,
  114 |             email: participant.email,
  115 |             zipcode: participant.zipcode,
  116 |           },
  117 |         },
  118 |       },
  119 |     });
  120 | 
  121 |     if (!response.ok()) {
  122 |       throw new Error(`CreateAppointment HTTP error status ${response.status()}: ${await response.text()}`);
  123 |     }
  124 | 
  125 |     const body = await response.json();
  126 |     if (body.errors && body.errors.length > 0) {
> 127 |       throw new Error(`CreateAppointment GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
      |             ^ Error: CreateAppointment GraphQL error: [
  128 |     }
  129 | 
  130 |     const created = body.data?.createAppointment;
  131 |     if (!created || !created.id) {
  132 |       throw new Error(`CreateAppointment returned empty or invalid data: ${JSON.stringify(body)}`);
  133 |     }
  134 | 
  135 |     const appData: CreatedAppointmentData = {
  136 |       id: created.id,
  137 |       name: created.name || procedureTitle,
  138 |       caseNumber: created.caseNumber,
  139 |       externalId: created.externalId || null,
  140 |       dateStart: created.dateStart,
  141 |       dateEnd: created.dateEnd,
  142 |       state: created.state,
  143 |       procedureId,
  144 |       procedureTitle,
  145 |       companyId,
  146 |       participant,
  147 |       createdTimeMs: Date.now(),
  148 |     };
  149 | 
  150 |     // Save to data store
  151 |     AppointmentDataStore.saveAppointment(appData);
  152 | 
  153 |     return appData;
  154 |   }
  155 | 
  156 |   /**
  157 |    * Cancels an appointment via GraphQL API (`cancelAppointment` mutation).
  158 |    * Automatically updates AppointmentDataStore.
  159 |    */
  160 |   static async cancelAppointment(
  161 |     requestContext: APIRequestContext,
  162 |     councilId: number,
  163 |     options: { reason?: string; message?: string } = {}
  164 |   ): Promise<boolean> {
  165 |     const reason = options.reason ?? 'unavailable';
  166 |     const message = options.message ?? 'Canceled for automated test verification';
  167 | 
  168 |     const tokens = await ApiAuthHelper.getTokensForUser(
  169 |       requestContext,
  170 |       adminProfessionalUser.username,
  171 |       adminProfessionalUser.password
  172 |     );
  173 | 
  174 |     const graphqlUrl = ApiAuthHelper.getGraphqlUrl();
  175 | 
  176 |     const mutationQuery = `
  177 |       mutation CancelAppointment($councilId: Int!, $message: String!, $reason: String) {
  178 |         cancelAppointment(councilId: $councilId, message: $message, reason: $reason) {
  179 |           success
  180 |           message
  181 |         }
  182 |       }
  183 |     `;
  184 | 
  185 |     const response = await requestContext.post(graphqlUrl, {
  186 |       headers: {
  187 |         'Content-Type': 'application/json',
  188 |         'Authorization': `Bearer ${tokens.token}`,
  189 |         'x-jwt-token': tokens.token,
  190 |         'cbx-client-v': '8.6.6',
  191 |       },
  192 |       data: {
  193 |         operationName: 'CancelAppointment',
  194 |         query: mutationQuery,
  195 |         variables: {
  196 |           councilId,
  197 |           message,
  198 |           reason,
  199 |         },
  200 |       },
  201 |     });
  202 | 
  203 |     if (!response.ok()) {
  204 |       throw new Error(`CancelAppointment HTTP error status ${response.status()}: ${await response.text()}`);
  205 |     }
  206 | 
  207 |     const body = await response.json();
  208 |     if (body.errors && body.errors.length > 0) {
  209 |       throw new Error(`CancelAppointment GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
  210 |     }
  211 | 
  212 |     const result = body.data?.cancelAppointment;
  213 |     if (!result || !result.success) {
  214 |       throw new Error(`CancelAppointment failed: ${JSON.stringify(body)}`);
  215 |     }
  216 | 
  217 |     AppointmentDataStore.updateAppointment(councilId, {
  218 |       state: 40,
  219 |       cancelReason: reason,
  220 |       cancelMessage: message,
  221 |     });
  222 | 
  223 |     console.log(`[AppointmentApiHelper] Successfully canceled appointment ID #${councilId}`);
  224 |     return true;
  225 |   }
  226 | }
  227 | 
```