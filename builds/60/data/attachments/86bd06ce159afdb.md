# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/documentation/documentationTests.spec.ts >> Documentation - Upload and Download Document Tests >> should upload a new document and verify it appears in the list @smoke @regression
- Location: tests/documentation/documentationTests.spec.ts:15:7

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]: 
    - generic [ref=e11]:
      - link [ref=e13] [cursor=pointer]:
        - /url: /company/1112/activity/dashboardCouncils
        - button " Activity" [ref=e14]:
          - generic [ref=e15]: 
          - generic [ref=e17]: Activity
      - link [ref=e19] [cursor=pointer]:
        - /url: /company/1112
        - button " Appointments" [ref=e20]:
          - generic [ref=e21]: 
          - generic [ref=e23]: Appointments
      - link [ref=e25] [cursor=pointer]:
        - /url: /company/1112/managements
        - button " Processes" [ref=e26]:
          - generic [ref=e27]: 
          - generic [ref=e29]: Processes
      - link [ref=e31] [cursor=pointer]:
        - /url: /company/1112/procedures
        - button " Procedures" [ref=e32]:
          - generic [ref=e33]: 
          - generic [ref=e35]: Procedures
      - link [ref=e37] [cursor=pointer]:
        - /url: /company/1112/drafts
        - button " Templates" [ref=e38]:
          - generic [ref=e39]: 
          - generic [ref=e41]: Templates
      - link [ref=e43] [cursor=pointer]:
        - /url: /company/1112/documentation
        - button " Documents" [ref=e44]:
          - generic [ref=e45]: 
          - generic [ref=e47]: Documents
      - link [ref=e49] [cursor=pointer]:
        - /url: /company/1112/companies
        - button " Entities" [ref=e50]:
          - generic [ref=e51]: 
          - generic [ref=e53]: Entities
      - link [ref=e55] [cursor=pointer]:
        - /url: /company/1112/users
        - button " Users" [ref=e56]:
          - generic [ref=e57]: 
          - generic [ref=e59]: Users
    - generic [ref=e61]:
      - img "CBX white Logo" [ref=e62]
      - generic [ref=e63]: © 2026 v8.6.6
  - generic [ref=e65]:
    - banner [ref=e66]:
      - img "logo" [ref=e69] [cursor=pointer]
      - generic [ref=e70]: QA DEV
      - generic [ref=e76]:
        - button "" [ref=e80] [cursor=pointer]
        - button "" [ref=e88] [cursor=pointer]
        - button "Actions Button" [ref=e94] [cursor=pointer]:
          - generic [ref=e97]:
            - img "logo" [ref=e99]
            - generic [ref=e100]: 
    - generic [ref=e102]:
      - generic [ref=e105]:
        - generic [ref=e106]:
          - generic [ref=e107]:
            - generic [ref=e108]:
              - generic [ref=e111]:
                - generic [ref=e112] [cursor=pointer]:
                  - generic [ref=e113]: Alphabetical (A/Z)
                  - textbox "Input":
                    - /placeholder: ""
                    - text: Alphabetical (A/Z)
                  - generic [ref=e114]: Order
                - group "Input fieldset":
                  - generic: Order
              - generic [ref=e119]:
                - generic [ref=e120] [cursor=pointer]:
                  - generic [ref=e121]: All the files
                  - textbox "Input":
                    - /placeholder: ""
                    - text: All the files
                  - generic [ref=e122]: File type
                - group "Input fieldset":
                  - generic: File type
            - generic [ref=e125]:
              - generic [ref=e130]:
                - button "Icon Button" [ref=e132] [cursor=pointer]:
                  - generic [ref=e133]: 
                - textbox "Search for document/folder" [active] [ref=e135]: test_document_1788864873953.txt
              - button "Icon Button" [ref=e136] [cursor=pointer]:
                - generic [ref=e137]: 
              - button "Icon Button" [ref=e139] [cursor=pointer]:
                - generic [ref=e140]: 
          - generic [ref=e142]:
            - generic [ref=e145] [cursor=pointer]:
              - generic [ref=e146]: OVAC Storage
              - generic [ref=e147]: /
            - generic [ref=e153]:
              - generic [ref=e154]: 28.52 MB
              - generic [ref=e155]: /
              - generic [ref=e156]: 5.37 GB
          - generic [ref=e158]:
            - generic [ref=e159]: 
            - generic [ref=e161]:
              - paragraph
              - generic [ref=e162]: Admitted formats.
              - text: "Maximum size: 60 MB"
          - generic [ref=e165]:
            - generic [ref=e168] [cursor=pointer]:
              - button "Icon Button" [ref=e170]:
                - generic [ref=e171]: 
              - button "Choose File" [ref=e173]
              - paragraph [ref=e175]: Drag your files here or click
            - generic [ref=e177]:
              - img "test_document_1788864873953" [ref=e179]
              - generic [ref=e180]:
                - generic [ref=e181]:
                  - generic [ref=e182]: test_document_1788864873953
                  - button "Icon Button" [ref=e190] [cursor=pointer]:
                    - generic [ref=e191]: 
                - generic [ref=e194]:
                  - generic [ref=e195]: 
                  - generic [ref=e196]: TXT - 94 B
          - generic [ref=e198]:
            - paragraph [ref=e199] [cursor=pointer]: Legal notice and Terms and conditions of use
            - paragraph [ref=e200] [cursor=pointer]: PRIVACY_POLICY
        - button "Choose File"
        - generic "Add document" [ref=e201]:
          - button "" [ref=e202] [cursor=pointer]
      - generic [ref=e205]:
        - generic [ref=e206]:
          - generic [ref=e207] [cursor=pointer]: 
          - generic [ref=e209]: 0 selected
        - generic [ref=e212] [cursor=pointer]:
          - generic [ref=e213]: 
          - generic [ref=e215]: SELECT ALL
```