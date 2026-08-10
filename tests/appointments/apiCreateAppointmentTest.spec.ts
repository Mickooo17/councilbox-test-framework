import { test, expect, adminProfessionalUser } from '../fixtures';
import { ApiAuthHelper } from '../../utils/ApiAuthHelper';

test.describe('OVAC Appointment API Creation and UI Verification', () => {
  test('Create appointment via API and verify in UI by appointment ID @XR-API-APPOINTMENT', async ({ page, request }) => {
    // 1. Authenticate via API
    const tokens = await ApiAuthHelper.getTokensForUser(request, adminProfessionalUser.username, adminProfessionalUser.password);
    expect(tokens.token).toBeTruthy();

    const graphqlUrl = ApiAuthHelper.getGraphqlUrl();

    // 2. Define appointment date for first available slot (tomorrow 10:00 UTC)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    const endDate = new Date(tomorrow.getTime() + 15 * 60 * 1000);

    // 3. Send CreateAppointment GraphQL Mutation
    const createAppointmentMutation = `
      mutation CreateAppointment(
        $council: CouncilInput!,
        $participant: ParticipantInput!,
        $proceduresIds: [Int]
      ) {
        createAppointment(
          council: $council,
          participant: $participant,
          proceduresIds: $proceduresIds
        ) {
          id
          name
          caseNumber
          externalId
          dateStart
          dateEnd
          state
        }
      }
    `;

    const apiResponse = await request.post(graphqlUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.token}`,
        'x-jwt-token': tokens.token,
        'cbx-client-v': '8.6.6',
      },
      data: {
        operationName: 'CreateAppointment',
        query: createAppointmentMutation,
        variables: {
          council: {
            name: 'ALL in ONE',
            companyId: 1112,
            councilType: 5,
            statuteId: 3524,
            dateStart: tomorrow.toISOString(),
            dateEnd: endDate.toISOString(),
            language: 'en',
            observations: 'Created via Automated Playwright API Test',
            internalNotes: 'Automated test appointment',
          },
          proceduresIds: [3524],
          participant: {
            dni: 'ammarpass',
            idCardType: 'passport',
            name: 'Ammar',
            surname: 'Micijevic',
            phone: '+38761123456',
            email: 'ammar.micijevic@councilbox.com',
            zipcode: '71000',
          },
        },
      },
    });

    expect(apiResponse.ok()).toBeTruthy();
    const resBody = await apiResponse.json();
    expect(resBody.errors).toBeUndefined();

    const createdAppointment = resBody.data?.createAppointment;
    expect(createdAppointment).toBeDefined();
    expect(createdAppointment.id).toBeDefined();

    const appointmentId = createdAppointment.id.toString();
    const caseNumber = createdAppointment.caseNumber;

    console.log(`[API Test] Appointment successfully created! ID: ${appointmentId}, CaseNumber: ${caseNumber}`);

    // 4. Verify in UI: Navigate to Appointments list
    await page.goto('https://qa.ovac.pre.councilbox.com/company/1112', { waitUntil: 'domcontentloaded' });

    // Search by Appointment ID
    const searchInput = page.locator('input[placeholder="Search"]');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(appointmentId);
    await searchInput.press('Enter');

    // Wait for filtered results and verify appointment row
    const appointmentRow = page.locator('tr').filter({ hasText: appointmentId });
    await expect(appointmentRow).toBeVisible({ timeout: 10000 });

    // Verify appointment details in the table row
    await expect(appointmentRow).toContainText(appointmentId);
    await expect(appointmentRow).toContainText('QA DEV');
  });
});
