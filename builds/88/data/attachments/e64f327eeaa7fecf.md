# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/appointmentsTests.spec.ts >> Appointments Management - Status Verification Tests >> When user clicks Status for canceled appointment, Details window appears @XR-3126 @regression
- Location: tests/appointments/appointmentsTests.spec.ts:18:7

# Error details

```
Error: CancelAppointment GraphQL error: [
  {
    "message": "Not Authorized - ROLE",
    "code": 403,
    "locations": [
      {
        "line": 3,
        "column": 9
      }
    ],
    "path": [
      "cancelAppointment"
    ],
    "originalError": {
      "name": "AuthError",
      "code": 403
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
          - /url: /company/1112/auditorActivity
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
      - generic [ref=e30]:
        - img "CBX white Logo" [ref=e31]
        - generic [ref=e32]: © 2026 v8.7.0
    - generic [ref=e34]:
      - banner [ref=e35]:
        - button [ref=e37] [cursor=pointer]:
          - img "Logo QA DEV" [ref=e38]
        - generic [ref=e39]: QA DEV
        - generic [ref=e45]:
          - button [ref=e48] [cursor=pointer]:
            - button "Botón" [ref=e49]:
              - generic [ref=e50]: 
          - button [ref=e52] [cursor=pointer]:
            - button "Actions Button" [ref=e54]:
              - generic [ref=e57]:
                - img "Logo Virtual Citizen Service Office" [ref=e59]
                - generic [ref=e60]: 
      - generic [ref=e64]:
        - tablist "Tabs" [ref=e68]:
          - tab "Botón" [selected] [ref=e69] [cursor=pointer]:
            - paragraph [ref=e71]: Video-appointments
          - tab "Botón" [ref=e72] [cursor=pointer]:
            - paragraph [ref=e74]: In-person appointments
        - generic [ref=e76]:
          - generic [ref=e78]:
            - generic [ref=e79]:
              - generic [ref=e81]:
                - generic [ref=e84]:
                  - generic [ref=e85] [cursor=pointer]:
                    - generic [ref=e87]:
                      - generic [ref=e88]: 
                      - generic [ref=e89]: List view
                    - combobox "Campo de texto": "[object Object]"
                  - group [aria-hidden]
                - generic [ref=e94]:
                  - generic [ref=e95] [cursor=pointer]:
                    - generic [ref=e96]: This week
                    - combobox "Period": This week
                    - generic [ref=e97]: Period
                  - group [aria-hidden]
                - button "Botón" [ref=e101] [cursor=pointer]:
                  - generic [ref=e102]: 
              - generic [ref=e103]:
                - generic [ref=e104]:
                  - paragraph [ref=e105]: Search by participant or record
                  - generic [ref=e108]:
                    - button "Botón" [ref=e110] [cursor=pointer]:
                      - generic [ref=e111]: 
                    - textbox "Search by participant or record" [ref=e112]:
                      - /placeholder: Search
                - button "Help" [ref=e113] [cursor=pointer]:
                  - generic [ref=e114]: 
            - generic [ref=e122]:
              - table [ref=e123]:
                - rowgroup [ref=e124]:
                  - row [ref=e125]:
                    - columnheader "Date Date " [ref=e126]:
                      - generic [ref=e127]: Date
                      - button "Date " [ref=e128] [cursor=pointer]:
                        - generic [ref=e129]: Date
                        - generic [ref=e130]: 
                    - columnheader "Ref. Ref. " [ref=e132]:
                      - generic [ref=e133]: Ref.
                      - button "Ref. " [ref=e134] [cursor=pointer]:
                        - generic [ref=e135]: Ref.
                        - generic [ref=e136]: 
                    - columnheader "Attendees" [ref=e138]
                    - columnheader "Procedure Procedure " [ref=e139]:
                      - generic [ref=e140]: Procedure
                      - button "Procedure " [ref=e141] [cursor=pointer]:
                        - generic [ref=e142]: Procedure
                        - generic [ref=e143]: 
                    - columnheader "Documents" [ref=e145]
                    - columnheader "Assigned agent" [ref=e146]
                    - columnheader "Entity Entity " [ref=e147]:
                      - generic [ref=e148]: Entity
                      - button "Entity " [ref=e149] [cursor=pointer]:
                        - generic [ref=e150]: Entity
                        - generic [ref=e151]: 
                    - columnheader "Status Status " [ref=e153]:
                      - generic [ref=e154]: Status
                      - button "Status " [ref=e155] [cursor=pointer]:
                        - generic [ref=e156]: Status
                        - generic [ref=e157]: 
                    - columnheader "Actions" [ref=e159]
                    - columnheader "Actions [object Object]" [ref=e160]:
                      - generic [ref=e161]: Actions
                      - generic [ref=e164]:
                        - generic [ref=e165] [cursor=pointer]:
                          - generic [aria-hidden] [ref=e167]: 
                          - combobox "Settings": "[object Object]"
                        - group [aria-hidden]
                - rowgroup [ref=e169]:
                  - row [ref=e170] [cursor=pointer]:
                    - cell " 06/10/2026 10:00" [ref=e171]:
                      - generic [ref=e172]:
                        - generic [ref=e173]: 
                        - generic [ref=e176]:
                          - generic [ref=e177]: 06/10/2026
                          - generic [ref=e178]: 10:00
                    - cell "67060" [ref=e179]
                    - cell "Ammar Micijevic" [ref=e180]
                    - cell "ALL in ONE" [ref=e185]
                    - cell [ref=e190]:
                      - button "5" [ref=e192]
                    - cell " Not assigned" [ref=e193]:
                      - generic [ref=e194]:
                        - generic [ref=e195]: 
                        - generic [ref=e197]: Not assigned
                    - cell "QA DEV" [ref=e200]
                    - cell "Canceled" [ref=e203]
                    - cell [ref=e211]:
                      - generic [ref=e213]:
                        - button [disabled]
                    - cell [ref=e214]:
                      - button "More" [ref=e217]:
                        - generic [ref=e218]: 
                  - row [ref=e220] [cursor=pointer]:
                    - cell " 05/10/2026 06:00" [ref=e221]:
                      - generic [ref=e222]:
                        - generic [ref=e223]: 
                        - generic [ref=e226]:
                          - generic [ref=e227]: 05/10/2026
                          - generic [ref=e228]: 06:00
                    - cell "67027" [ref=e229]
                    - cell "AMMAR MICIJEVIC" [ref=e230]
                    - cell "ALL in ONE" [ref=e235]
                    - cell [ref=e240]:
                      - button "5" [ref=e242]
                    - cell " Ammar Mičijević" [ref=e243]:
                      - generic [ref=e244]:
                        - generic [ref=e245]: 
                        - generic [ref=e247]: Ammar Mičijević
                    - cell "QA DEV" [ref=e250]
                    - cell "Incomplete" [ref=e253]
                    - cell [ref=e261]:
                      - generic [ref=e263]:
                        - button [disabled]
                    - cell [ref=e264]:
                      - button "More" [ref=e267]:
                        - generic [ref=e268]: 
              - generic [ref=e270]: 1 - 2 of 2
          - generic [ref=e274]:
            - generic [ref=e275] [cursor=pointer]: Legal notice and Terms and conditions of use
            - generic [ref=e276] [cursor=pointer]: PRIVACY_POLICY
          - generic [ref=e277]:
            - generic [ref=e278]:
              - generic [ref=e279] [cursor=pointer]: 
              - generic [ref=e281]: 0 selected
            - generic [ref=e284] [cursor=pointer]:
              - generic [ref=e286]: 
              - generic [ref=e287]: SELECT ALL
  - generic [ref=e288]:
    - generic [ref=e292]:
      - generic [ref=e293]: New version OVAC 8.7
      - generic [ref=e294]:
        - generic [ref=e295]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e296]: Review upgrades
    - button [ref=e302] [cursor=pointer]
```

# Test source

```ts
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
  127 |       throw new Error(`CreateAppointment GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
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
> 209 |       throw new Error(`CancelAppointment GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
      |             ^ Error: CancelAppointment GraphQL error: [
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