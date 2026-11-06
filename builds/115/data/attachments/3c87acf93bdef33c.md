# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/appointments/apiCreateAppointmentTest.spec.ts >> OVAC Appointment API Creation & UI Verification >> Create appointment via API and verify in UI by appointment ID @XR-API-APPOINTMENT
- Location: tests/appointments/apiCreateAppointmentTest.spec.ts:6:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('tr').filter({ hasText: '67511' })
Expected pattern: /QA DEV|Grupo Castelar/i
Received string:  "07/11/202610:006751111121112675112026fa76f1AppointmentConfirmedOpen"
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('tr').filter({ hasText: '67511' }) with timeout 5000ms
  - waiting for locator('tr').filter({ hasText: '67511' })
    13 × locator resolved to <tr tabindex="0" id="appointment-row-0" class="cbx-table-row qdlf-cbx-table-row cursor-pointer qdlf-cursor-pointer hover qdlf-hover">…</tr>
       - unexpected value "07/11/202610:006751111121112675112026fa76f1AppointmentConfirmedOpen"

```

```yaml
- row "Select  07/11/2026 10:00  67511 11121112675112026fa76f 1 Appointment Confirmed  Open More":
  - cell "Select":
    - checkbox "Select"
  - cell " 07/11/2026 10:00 "
  - cell "67511"
  - cell
  - cell "11121112675112026fa76f"
  - cell "1":
    - button "1"
  - cell "Appointment"
  - cell "Confirmed"
  - cell " Open":
    - button ""
    - button "Open"
  - cell "More":
    - button "More": 
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures';
  2  | import { AppointmentApiHelper } from '../../utils/appointments/AppointmentApiHelper';
  3  | import { resolveCompanyUrl } from '../../utils/UrlHelper';
  4  | 
  5  | test.describe('OVAC Appointment API Creation & UI Verification', () => {
  6  |   test('Create appointment via API and verify in UI by appointment ID @XR-API-APPOINTMENT', async ({ page, request }) => {
  7  |     // 1. Create appointment via API (automatically saved to AppointmentDataStore)
  8  |     const createdAppointment = await AppointmentApiHelper.createAppointment(request, {
  9  |       procedureId: 3955,
  10 |       procedureTitle: 'Prueba iñaki',
  11 |       participant: {
  12 |         dni: 'ammarpass',
  13 |         idCardType: 'passport',
  14 |         name: 'Ammar',
  15 |         surname: 'Micijevic',
  16 |       },
  17 |       observations: 'Created via Automated Playwright API Test',
  18 |     });
  19 | 
  20 |     expect(createdAppointment).toBeDefined();
  21 |     expect(createdAppointment.id).toBeGreaterThan(0);
  22 | 
  23 |     const appointmentId = createdAppointment.id.toString();
  24 |     console.log(`[API Test] Successfully created Appointment ID: ${appointmentId}, Case: ${createdAppointment.caseNumber}`);
  25 | 
  26 |     // 2. Open UI and verify appointment exists in list
  27 |     await page.goto(resolveCompanyUrl(1112));
  28 | 
  29 |     // Search by Appointment ID
  30 |     const searchInput = page.locator('input[placeholder="Search"]');
  31 |     await searchInput.waitFor({ state: 'visible' });
  32 |     await searchInput.fill(appointmentId);
  33 |     await searchInput.press('Enter');
  34 | 
  35 |     // Verify appointment row in UI
  36 |     const appointmentRow = page.locator('tr').filter({ hasText: appointmentId });
  37 |     await expect(appointmentRow).toBeVisible({ timeout: 10000 });
  38 |     await expect(appointmentRow).toContainText(appointmentId);
> 39 |     await expect(appointmentRow).toContainText(/QA DEV|Grupo Castelar/i);
     |                                  ^ Error: expect(locator).toContainText(expected) failed
  40 |   });
  41 | });
  42 | 
```