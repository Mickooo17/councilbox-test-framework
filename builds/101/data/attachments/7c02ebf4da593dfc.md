# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/procedures/procedureTests.spec.ts >> Procedures - Configuration & Documentation Tab Tests >> Using the toggle switch on the procedure, the administrator can make consent as required @XR-2706 @regression
- Location: tests/procedures/procedureTests.spec.ts:68:9

# Error details

```
Error: GraphQL Error creating procedure: [{"message":"Not Authorized - ROLE","code":403,"locations":[{"line":2,"column":21}],"path":["createCompanyStatute"],"originalError":{"name":"AuthError","code":403}}]
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
        - generic [ref=e62]: © 2026 v8.7.2
    - generic [ref=e64]:
      - banner [ref=e65]:
        - button [ref=e67] [cursor=pointer]:
          - img "Logo QA DEV" [ref=e68]
        - generic [ref=e69]: QA DEV
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
        - generic [ref=e95]:
          - generic [ref=e96]:
            - generic [ref=e98]:
              - generic [ref=e102]:
                - generic [ref=e103] [cursor=pointer]:
                  - generic [ref=e104]: All status
                  - combobox "Status": All status
                  - generic [ref=e105]: Status
                - group [aria-hidden]
              - generic [ref=e111]:
                - generic [ref=e112] [cursor=pointer]:
                  - generic [ref=e113]: All
                  - combobox "Types": All
                  - generic [ref=e114]: Types
                - group [aria-hidden]
              - generic [ref=e120]:
                - generic [ref=e121] [cursor=pointer]:
                  - generic [ref=e122]: All
                  - combobox "Expiration date": All
                  - generic [ref=e123]: Expiration date
                - group [aria-hidden]
            - generic [ref=e126]:
              - generic [ref=e130]:
                - button "Botón" [ref=e132] [cursor=pointer]:
                  - generic [ref=e133]: 
                - textbox "Search by participant or record" [active] [ref=e134]:
                  - /placeholder: Search for procedures
                  - text: Automation Procedure 257132
              - button "Help" [ref=e135] [cursor=pointer]:
                - generic [ref=e136]: 
          - generic [ref=e139]:
            - generic [ref=e142]:
              - generic [ref=e144]: There are no results for your search. Please, check your selection and try again.
              - generic "Add procedure" [ref=e145]:
                - button "Floating action button" [ref=e146] [cursor=pointer]:
                  - generic [ref=e147]: 
            - generic [ref=e150]:
              - generic [ref=e151] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e152] [cursor=pointer]: PRIVACY_POLICY
        - generic [ref=e154]:
          - generic [ref=e155] [cursor=pointer]: 
          - generic [ref=e157]: 0 selected
  - generic [ref=e158]:
    - generic [ref=e162]:
      - generic [ref=e163]: New version OVAC 8.7
      - generic [ref=e164]:
        - generic [ref=e165]: We have updated the app to the latest version to offer you a better experience. This update includes important improvements, error corrections and optimizations so that use will be easier and friendlier.
        - generic [ref=e166]: Review upgrades
    - button [ref=e172] [cursor=pointer]
```

# Test source

```ts
  4   | import { ApiAuthHelper, AuthTokens } from '../ApiAuthHelper';
  5   | import { adminProfessionalUser } from '../../tests/fixtures';
  6   | 
  7   | export interface CreateProcedureApiOptions {
  8   |     companyId?: number;
  9   |     title?: string;
  10  |     description?: string;
  11  |     councilType?: number;
  12  |     signatureType?: number;
  13  | }
  14  | 
  15  | export interface CreatedProcedureData {
  16  |     id: string;
  17  |     title: string;
  18  |     description: string;
  19  |     companyId: number;
  20  | }
  21  | 
  22  | const TOKENS_FILE = path.join(process.cwd(), 'playwright/.auth/tokens.json');
  23  | 
  24  | export class ProcedureApiHelper {
  25  |     private static async getAuthHeaders(requestContext: APIRequestContext): Promise<{ graphqlUrl: string; headers: Record<string, string> }> {
  26  |         let tokens: AuthTokens | undefined;
  27  | 
  28  |         if (fs.existsSync(TOKENS_FILE)) {
  29  |             try {
  30  |                 const fileData = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
  31  |                 if (fileData.token && fileData.refreshToken) {
  32  |                     tokens = fileData;
  33  |                 }
  34  |             } catch {
  35  |                 // fallback to ApiAuthHelper
  36  |             }
  37  |         }
  38  | 
  39  |         if (!tokens) {
  40  |             tokens = await ApiAuthHelper.getTokensForUser(
  41  |                 requestContext,
  42  |                 adminProfessionalUser.username,
  43  |                 adminProfessionalUser.password
  44  |             );
  45  |         }
  46  | 
  47  |         const graphqlUrl = ApiAuthHelper.getGraphqlUrl();
  48  | 
  49  |         return {
  50  |             graphqlUrl,
  51  |             headers: {
  52  |                 'Content-Type': 'application/json',
  53  |                 'Authorization': `Bearer ${tokens.token}`,
  54  |                 'x-jwt-token': tokens.token,
  55  |                 'cbx-client-v': '8.6.6',
  56  |             },
  57  |         };
  58  |     }
  59  | 
  60  |     /**
  61  |      * Creates a procedure via GraphQL API and returns the created procedure data.
  62  |      */
  63  |     static async createProcedure(
  64  |         requestContext: APIRequestContext,
  65  |         options: CreateProcedureApiOptions = {}
  66  |     ): Promise<CreatedProcedureData> {
  67  |         const companyId = options.companyId ?? 1112;
  68  |         const title = options.title ?? `Automation Procedure ${Math.floor(100000 + Math.random() * 900000)}`;
  69  |         const description = options.description ?? `<p>Automation description for ${title}</p>`;
  70  |         const councilType = options.councilType ?? 5; // 5 = Video-appointment
  71  |         const signatureType = options.signatureType ?? 1;
  72  | 
  73  |         const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);
  74  | 
  75  |         const response = await requestContext.post(graphqlUrl, {
  76  |             headers,
  77  |             data: {
  78  |                 operationName: 'createCompanyStatute',
  79  |                 variables: {
  80  |                     statute: {
  81  |                         title,
  82  |                         conveneHeader: description.startsWith('<') ? description : `<p>${description}</p>`,
  83  |                         conveneFooter: '',
  84  |                         companyId,
  85  |                         signatureType,
  86  |                         councilType,
  87  |                     },
  88  |                 },
  89  |                 query: `mutation createCompanyStatute($statute: StatuteInput!) {
  90  |                     createCompanyStatute(statute: $statute) {
  91  |                         id
  92  |                         __typename
  93  |                     }
  94  |                 }`,
  95  |             },
  96  |         });
  97  | 
  98  |         if (!response.ok()) {
  99  |             throw new Error(`Failed to create procedure via API HTTP ${response.status()}: ${await response.text()}`);
  100 |         }
  101 | 
  102 |         const body = await response.json();
  103 |         if (body.errors && body.errors.length > 0) {
> 104 |             throw new Error(`GraphQL Error creating procedure: ${JSON.stringify(body.errors)}`);
      |                   ^ Error: GraphQL Error creating procedure: [{"message":"Not Authorized - ROLE","code":403,"locations":[{"line":2,"column":21}],"path":["createCompanyStatute"],"originalError":{"name":"AuthError","code":403}}]
  105 |         }
  106 | 
  107 |         const createdId = body.data?.createCompanyStatute?.id;
  108 |         if (!createdId) {
  109 |             throw new Error(`Procedure creation via API did not return an ID: ${JSON.stringify(body)}`);
  110 |         }
  111 | 
  112 |         return {
  113 |             id: String(createdId),
  114 |             title,
  115 |             description,
  116 |             companyId,
  117 |         };
  118 |     }
  119 | 
  120 |     /**
  121 |      * Deletes procedures by IDs via GraphQL mutation DeleteCompanyStatutes
  122 |      */
  123 |     static async deleteProceduresByIds(
  124 |         requestContext: APIRequestContext,
  125 |         statuteIds: (number | string)[],
  126 |         reasonDeletion: string = 'Automated cleanup'
  127 |     ): Promise<boolean> {
  128 |         const numericIds = statuteIds.map(id => Number(id)).filter(id => !isNaN(id));
  129 |         if (numericIds.length === 0) {
  130 |             return false;
  131 |         }
  132 | 
  133 |         const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);
  134 | 
  135 |         const response = await requestContext.post(graphqlUrl, {
  136 |             headers,
  137 |             data: {
  138 |                 operationName: 'DeleteCompanyStatutes',
  139 |                 variables: {
  140 |                     statuteIds: numericIds,
  141 |                     reasonDeletion,
  142 |                 },
  143 |                 query: `mutation DeleteCompanyStatutes($statuteIds: [Int!], $reasonDeletion: SafeString) {
  144 |                     deleteCompanyStatutes(statuteIds: $statuteIds, reasonDeletion: $reasonDeletion) {
  145 |                         success
  146 |                         __typename
  147 |                     }
  148 |                 }`,
  149 |             },
  150 |         });
  151 | 
  152 |         if (!response.ok()) {
  153 |             throw new Error(`Failed to delete procedures via API HTTP ${response.status()}: ${await response.text()}`);
  154 |         }
  155 | 
  156 |         const body = await response.json();
  157 |         if (body.errors && body.errors.length > 0) {
  158 |             throw new Error(`GraphQL Error deleting procedures: ${JSON.stringify(body.errors)}`);
  159 |         }
  160 | 
  161 |         return body.data?.deleteCompanyStatutes?.success === true;
  162 |     }
  163 | 
  164 |     /**
  165 |      * Finds procedure(s) by name and deletes them via GraphQL API
  166 |      */
  167 |     static async deleteProcedureByName(
  168 |         requestContext: APIRequestContext,
  169 |         title: string,
  170 |         companyId: number = 1112,
  171 |         reasonDeletion: string = 'Automated cleanup'
  172 |     ): Promise<boolean> {
  173 |         const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);
  174 | 
  175 |         const response = await requestContext.post(graphqlUrl, {
  176 |             headers,
  177 |             data: {
  178 |                 operationName: 'statutes',
  179 |                 variables: {
  180 |                     companyId,
  181 |                     includeUnpublished: true,
  182 |                     councilType: null,
  183 |                 },
  184 |                 query: `query statutes($companyId: Int!, $includeUnpublished: Boolean, $councilType: Int) {
  185 |                     companyStatutes(companyId: $companyId, includeUnpublished: $includeUnpublished, councilType: $councilType) {
  186 |                         id
  187 |                         title
  188 |                         __typename
  189 |                     }
  190 |                 }`,
  191 |             },
  192 |         });
  193 | 
  194 |         if (!response.ok()) {
  195 |             return false;
  196 |         }
  197 | 
  198 |         const body = await response.json();
  199 |         const statutes: Array<{ id: number; title: string }> = body.data?.companyStatutes || [];
  200 |         const matchingStatutes = statutes.filter(
  201 |             s => s.title && s.title.trim().toLowerCase() === title.trim().toLowerCase()
  202 |         );
  203 | 
  204 |         if (matchingStatutes.length === 0) {
```