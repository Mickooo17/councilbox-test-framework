# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/institutions/institutionsTests.spec.ts >> Institutions - Full Lifecycle Tests >> should create and delete an institution, then verify it no longer appears @regression
- Location: tests/institutions/institutionsTests.spec.ts:57:7

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
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
      - generic [ref=e62]: © 2026 v8.7.1
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
      - generic [ref=e93]:
        - generic "Add entity" [ref=e94]:
          - button "Actions" [ref=e95] [cursor=pointer]:
            - generic [ref=e96]: 
        - generic [ref=e98]:
          - generic [ref=e100]:
            - generic [ref=e104]:
              - button "Botón" [ref=e106] [cursor=pointer]:
                - generic [ref=e107]: 
              - textbox "Search by participant or record" [active] [ref=e108]:
                - /placeholder: Search entity...
                - text: Automation Institution 661448
            - button "Help" [ref=e109] [cursor=pointer]:
              - generic [ref=e110]: 
          - generic [ref=e113]:
            - generic [ref=e115]:
              - table [ref=e116]:
                - rowgroup [ref=e117]:
                  - row [ref=e118]:
                    - columnheader "Name Name " [ref=e119]:
                      - generic [ref=e120]: Name
                      - button "Name " [ref=e121] [cursor=pointer]:
                        - generic [ref=e122]: Name
                        - generic [ref=e123]: 
                    - columnheader "Id Id " [ref=e125]:
                      - generic [ref=e126]: Id
                      - button "Id " [ref=e127] [cursor=pointer]:
                        - generic [ref=e128]: Id
                        - generic [ref=e129]: 
                    - columnheader "External ID External ID " [ref=e131]:
                      - generic [ref=e132]: External ID
                      - button "External ID " [ref=e133] [cursor=pointer]:
                        - generic [ref=e134]: External ID
                        - generic [ref=e135]: 
                    - columnheader "Level Level " [ref=e137]:
                      - generic [ref=e138]: Level
                      - button "Level " [ref=e139] [cursor=pointer]:
                        - generic [ref=e140]: Level
                        - generic [ref=e141]: 
                    - columnheader "Actions" [ref=e143]
                - rowgroup
              - generic [ref=e145]: 0 - No results were found
            - generic [ref=e149]:
              - generic [ref=e150] [cursor=pointer]: Legal notice and Terms and conditions of use
              - generic [ref=e151] [cursor=pointer]: PRIVACY_POLICY
      - generic [ref=e153]:
        - generic [ref=e154] [cursor=pointer]: 
        - generic [ref=e156]: 0 selected
```