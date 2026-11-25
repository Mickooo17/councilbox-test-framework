# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/support/accountMenuSupportTests.spec.ts >> Account Menu - Support Modal Tests >> From the account menu, users have the option to send messages to the support team @XR-3028 @smoke @regression
- Location: tests/support/accountMenuSupportTests.spec.ts:9:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('alert')
Expected pattern: /The message has been successfully sent|El mensaje se ha enviado correctamente/i
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" getByRole('alert') with timeout 10000ms
  - waiting for getByRole('alert')

```

```yaml
- button ""
- link " Activity":
  - /url: /company/1112/activity/dashboardCouncils
  - button " Activity"
- link " Appointments":
  - /url: /company/1112
  - button " Appointments"
- link " Processes":
  - /url: /company/1112/managements
  - button " Processes"
- link " Procedures":
  - /url: /company/1112/procedures
  - button " Procedures"
- link " Templates":
  - /url: /company/1112/drafts
  - button " Templates"
- link " Documents":
  - /url: /company/1112/documentation
  - button " Documents"
- link " Entities":
  - /url: /company/1112/entities
  - button " Entities"
- link " Users":
  - /url: /company/1112/users
  - button " Users"
- img "CBX white Logo"
- text: © 2026 v8.8.0
- banner:
  - button "Logo Grupo Castelar Servicios Legales y Financieros S.A":
    - img "Logo Grupo Castelar Servicios Legales y Financieros S.A"
  - text: Grupo Castelar Servicios Legales y Financieros S.A
  - button "Notifications":
    - button "Notifications": 
  - button "Button user":
    - button "Button user":
      - img "Logo Virtual Citizen Service Office"
      - text: 
- button "Actions": 
- tablist "Pestañas":
  - tab "Video-appointments" [selected]:
    - paragraph: Video-appointments
  - tab "In-person appointments":
    - paragraph: In-person appointments
- text:  List view
- combobox "Campo de texto": "[object Object]"
- text: Confirmed, In progress, Pending report, Completed, In pause
- combobox "Status": Confirmed, In progress, Pending report, Completed, In pause
- text: Status This week
- combobox "Period": This week
- text: Period
- button "Botón": 
- paragraph: Search by participant or record
- button "Search": 
- textbox "Search by participant or record":
  - /placeholder: Search
- button "Help": 
- table:
  - rowgroup:
    - row "Selection Date Date  Ref. Ref.  External ID External ID  Record Record  Documents Entity Entity  Status Status  Actions [object Object]":
      - columnheader "Selection"
      - columnheader "Date Date ":
        - text: Date
        - button "Date "
      - columnheader "Ref. Ref. ":
        - text: Ref.
        - button "Ref. "
      - columnheader "External ID External ID ":
        - text: External ID
        - button "External ID "
      - columnheader "Record Record ":
        - text: Record
        - button "Record "
      - columnheader "Documents"
      - columnheader "Entity Entity ":
        - text: Entity
        - button "Entity "
      - columnheader "Status Status ":
        - text: Status
        - button "Status "
      - columnheader "Actions [object Object]":
        - text: Actions
        - combobox "Settings": "[object Object]"
  - rowgroup:
    - row "Select  27/11/2026 10:00 67907 1112111267907202694083 0 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 27/11/2026 10:00"
      - cell "67907"
      - cell
      - cell "1112111267907202694083"
      - cell "0":
        - button "0"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  27/11/2026 09:00 67811 111211126781120269bcf2 3 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 27/11/2026 09:00"
      - cell "67811"
      - cell
      - cell "111211126781120269bcf2"
      - cell "3":
        - button "3"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  26/11/2026 10:00  67915 11121112679152026a147a 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 26/11/2026 10:00 "
      - cell "67915"
      - cell
      - cell "11121112679152026a147a"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  26/11/2026 10:00  67919 1112111267919202659e67 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 26/11/2026 10:00 "
      - cell "67919"
      - cell
      - cell "1112111267919202659e67"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  26/11/2026 10:00  67920 1112111267920202647e1b 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 26/11/2026 10:00 "
      - cell "67920"
      - cell
      - cell "1112111267920202647e1b"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 18:00   67917 11121112679172026c72ec 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 18:00  "
      - cell "67917"
      - cell
      - cell "11121112679172026c72ec"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 13:15  67906 11121112679062026d9a31 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 13:15 "
      - cell "67906"
      - cell
      - cell "11121112679062026d9a31"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67895 1112111267895202600714 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67895"
      - cell
      - cell "1112111267895202600714"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67891 11121112678912026c3ff6 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67891"
      - cell
      - cell "11121112678912026c3ff6"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67896 11121112678962026c480a 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67896"
      - cell
      - cell "11121112678962026c480a"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67889 1112111267889202628109 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67889"
      - cell
      - cell "1112111267889202628109"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67890 11121112678902026125a0 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67890"
      - cell
      - cell "11121112678902026125a0"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67893 11121112678932026bd872 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67893"
      - cell
      - cell "11121112678932026bd872"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67894 11121112678942026b1daa 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67894"
      - cell
      - cell "11121112678942026b1daa"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67886 11121112678862026592f2 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67886"
      - cell
      - cell "11121112678862026592f2"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67885 11121112678852026f8476 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67885"
      - cell
      - cell "11121112678852026f8476"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67887 111211126788720269872c 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67887"
      - cell
      - cell "111211126788720269872c"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67881 1112111267881202666177 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67881"
      - cell
      - cell "1112111267881202666177"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67884 1112111267884202664c60 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67884"
      - cell
      - cell "1112111267884202664c60"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
    - row "Select  25/11/2026 10:00   67880 1112111267880202672d19 1 Grupo Castelar Servicios Legales y Financieros S.A Confirmed More":
      - cell "Select":
        - checkbox "Select"
      - cell " 25/11/2026 10:00  "
      - cell "67880"
      - cell
      - cell "1112111267880202672d19"
      - cell "1":
        - button "1"
      - cell "Grupo Castelar Servicios Legales y Financieros S.A"
      - cell "Confirmed"
      - cell "More":
        - button "More": 
- text: 1 - 20 of 80
- navigation "Paginación de resultados":
  - button "Página 1": "1"
  - button "Página 2": "2"
  - button "Página 3": "3"
  - button "Página 4": "4"
  - button "Página siguiente"
- text: Legal notice and Terms and conditions of use Privacy policy  0 selected SELECT ALL
```

# Test source

```ts
  18  | 
  19  |     constructor(page: Page) {
  20  |         super(page);
  21  |         
  22  |         // Help / Support icon on login page or header
  23  |         this.supportButton = page.locator('.ri-customer-service-2-line, .ri-question-line, .ri-help-line')
  24  |             .or(page.locator('div').filter({ hasText: /^Help$|^Ayuda$|^Soporte$/i }))
  25  |             .or(page.getByRole('button', { name: /support|soporte|help|ayuda/i }))
  26  |             .first();
  27  | 
  28  |         // User account dropdown in dashboard header
  29  |         this.userAccountDropdown = page.locator('#cbx-header-third-dropdown-user')
  30  |             .or(page.getByRole('button', { name: 'Actions Button' }))
  31  |             .or(page.locator('header button:has(img)'))
  32  |             .first();
  33  | 
  34  |         // Support option in account dropdown
  35  |         this.supportMenuItem = page.locator('#user-settings-contact-support')
  36  |             .or(page.getByRole('menuitem', { name: /^Support$|^Soporte$/i }))
  37  |             .or(page.locator('.cbx-dropdown-presentation').getByText(/^Support$|^Soporte$/i))
  38  |             .first();
  39  | 
  40  |         // Contact / Support modal drawer
  41  |         this.supportModal = page.locator('div:has(h6:has-text("Contact")), div:has(h6:has-text("Support")), .MuiDrawer-paperAnchorRight, .MuiDrawer-paper, .MuiDialog-paper, [role="dialog"], .cbx-drawerPanel-container')
  42  |             .filter({ has: page.getByRole('heading', { name: /Contact|Support|Soporte|Contacto/i }).or(page.getByText(/Support|Soporte|Contact/i)) })
  43  |             .first();
  44  | 
  45  |         // Input fields in Contact modal (Name = input 0, Surname = input 1, Email = input 2)
  46  |         this.nameInput = this.supportModal.locator('input').nth(0)
  47  |             .or(page.locator('input[name="name"], input#name'))
  48  |             .first();
  49  | 
  50  |         this.surnameInput = this.supportModal.locator('input').nth(1)
  51  |             .or(page.locator('input[name="surname"], input#surname'))
  52  |             .first();
  53  | 
  54  |         this.emailInput = this.supportModal.locator('input').nth(2)
  55  |             .or(page.locator('input[name="email"], input#email, input[type="email"]'))
  56  |             .first();
  57  | 
  58  |         this.messageInput = page.locator('#support-contact-message')
  59  |             .or(this.supportModal.locator('textarea'))
  60  |             .or(page.locator('textarea[name="message"], textarea'))
  61  |             .first();
  62  | 
  63  |         this.sendButton = this.supportModal.locator('button').filter({ hasText: /Send|Enviar/i })
  64  |             .or(page.locator('button').filter({ hasText: /^Send$|^Enviar$/i }))
  65  |             .or(page.locator('button[type="submit"]'))
  66  |             .first();
  67  | 
  68  |         this.validationError = page.getByText(/Required|Obligatorio|This field is required|Este campo es obligatorio/i).first();
  69  |     }
  70  | 
  71  |     async openSupportModalFromUserMenu() {
  72  |         await test.step('Open Support modal from user account menu', async () => {
  73  |             await this.dismissToastOrModal();
  74  |             await this.userAccountDropdown.waitFor({ state: 'visible', timeout: 15000 });
  75  |             await this.userAccountDropdown.click();
  76  |             await this.supportMenuItem.waitFor({ state: 'visible', timeout: 10000 });
  77  |             await this.supportMenuItem.click();
  78  |             await this.messageInput.waitFor({ state: 'visible', timeout: 10000 });
  79  |         });
  80  |     }
  81  | 
  82  |     async fillMessage(message: string) {
  83  |         await test.step(`Fill message in support modal (length: ${message.length})`, async () => {
  84  |             await this.messageInput.waitFor({ state: 'visible', timeout: 5000 });
  85  |             await this.messageInput.fill(message);
  86  |         });
  87  |     }
  88  | 
  89  |     async verifyMessageCharacterLimit(maxAllowedLength: number = 500) {
  90  |         await test.step(`Verify message input does not exceed ${maxAllowedLength} characters`, async () => {
  91  |             const value = await this.messageInput.inputValue();
  92  |             expect(value.length, `Message length (${value.length}) exceeded allowed maximum (${maxAllowedLength})`).toBeLessThanOrEqual(maxAllowedLength);
  93  | 
  94  |             const maxLengthAttr = await this.messageInput.getAttribute('maxlength');
  95  |             if (maxLengthAttr) {
  96  |                 expect(Number(maxLengthAttr)).toBe(maxAllowedLength);
  97  |             }
  98  |         });
  99  |     }
  100 | 
  101 |     async verifyCharacterCounter(expectedCounter: string = '500/500') {
  102 |         await test.step(`Verify character counter displays "${expectedCounter}"`, async () => {
  103 |             const counterRegex = new RegExp(expectedCounter.replace('/', '\\s*\\/\\s*'));
  104 |             const counter = this.page.getByText(counterRegex).first();
  105 |             await expect(counter).toBeVisible({ timeout: 5000 });
  106 |         });
  107 |     }
  108 | 
  109 |     async clickSendButton() {
  110 |         await test.step('Click Send button in support modal', async () => {
  111 |             await this.sendButton.waitFor({ state: 'visible', timeout: 5000 });
  112 |             await this.sendButton.click();
  113 |         });
  114 |     }
  115 | 
  116 |     async verifyMessageSentAlert() {
  117 |         await test.step('Verify support message sent success alert', async () => {
> 118 |             await expect(this.page.getByRole('alert')).toContainText(MESSAGES.SUPPORT_MESSAGE_SENT, { timeout: 10000 });
      |                                                        ^ Error: expect(locator).toContainText(expected) failed
  119 |         });
  120 |     }
  121 | 
  122 |     async sendSupportMessage(message: string) {
  123 |         await test.step(`Send support message: "${message}"`, async () => {
  124 |             await this.fillMessage(message);
  125 |             await this.clickSendButton();
  126 |         });
  127 |     }
  128 | 
  129 |     async closeSupportModal() {
  130 |         await test.step('Close Support modal', async () => {
  131 |             await this.page.keyboard.press('Escape');
  132 |             await this.page.waitForTimeout(500);
  133 |         });
  134 |     }
  135 | 
  136 |     async openSupportModal() {
  137 |         await test.step('Open Support modal', async () => {
  138 |             await this.dismissModal();
  139 |             const isOpened = await this.supportModal.isVisible({ timeout: 2000 }).catch(() => false);
  140 |             if (!isOpened) {
  141 |                 await this.supportButton.waitFor({ state: 'visible', timeout: 15000 });
  142 |                 await this.supportButton.click();
  143 |             }
  144 |             await this.supportModal.waitFor({ state: 'visible', timeout: 15000 });
  145 |         });
  146 |     }
  147 | 
  148 |     async sendMessageWithoutName(email?: string, message?: string, surname?: string) {
  149 |         await test.step('Attempt to send support message without populating Name field', async () => {
  150 |             const user = DataGenerator.randomUserData();
  151 |             const surnameVal = surname || user.surname;
  152 |             const emailVal = email || user.email;
  153 |             const messageVal = message || DataGenerator.randomSupportMessage();
  154 | 
  155 |             if (await this.surnameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  156 |                 await this.surnameInput.fill(surnameVal);
  157 |             }
  158 | 
  159 |             if (await this.emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  160 |                 await this.emailInput.fill(emailVal);
  161 |             }
  162 | 
  163 |             if (await this.messageInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  164 |                 await this.messageInput.fill(messageVal);
  165 |             }
  166 | 
  167 |             if (await this.nameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  168 |                 await this.nameInput.clear();
  169 |             }
  170 | 
  171 |             await this.sendButton.click();
  172 |         });
  173 |     }
  174 | 
  175 |     async verifyCannotSendMessageWithoutName() {
  176 |         await test.step('Verify message cannot be sent without Name field', async () => {
  177 |             const isModalVisible = await this.supportModal.isVisible().catch(() => false);
  178 |             expect(isModalVisible, 'Support modal should remain open when Name field is empty').toBe(true);
  179 | 
  180 |             await expect(this.validationError).toBeVisible({ timeout: 5000 });
  181 |         });
  182 |     }
  183 | 
  184 |     async sendMessageWithoutSurname(name?: string, email?: string, message?: string) {
  185 |         await test.step('Attempt to send support message without populating Surname field', async () => {
  186 |             const user = DataGenerator.randomUserData();
  187 |             const nameVal = name || user.name;
  188 |             const emailVal = email || user.email;
  189 |             const messageVal = message || DataGenerator.randomSupportMessage();
  190 | 
  191 |             if (await this.nameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  192 |                 await this.nameInput.fill(nameVal);
  193 |             }
  194 | 
  195 |             if (await this.emailInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  196 |                 await this.emailInput.fill(emailVal);
  197 |             }
  198 | 
  199 |             if (await this.messageInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  200 |                 await this.messageInput.fill(messageVal);
  201 |             }
  202 | 
  203 |             if (await this.surnameInput.isVisible({ timeout: 1500 }).catch(() => false)) {
  204 |                 await this.surnameInput.clear();
  205 |             }
  206 | 
  207 |             await this.sendButton.click();
  208 |         });
  209 |     }
  210 | 
  211 |     async verifyCannotSendMessageWithoutSurname() {
  212 |         await test.step('Verify message cannot be sent without Surname field', async () => {
  213 |             const isModalVisible = await this.supportModal.isVisible().catch(() => false);
  214 |             expect(isModalVisible, 'Support modal should remain open when Surname field is empty').toBe(true);
  215 | 
  216 |             await expect(this.validationError).toBeVisible({ timeout: 5000 });
  217 |         });
  218 |     }
```