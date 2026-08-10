import { APIRequestContext } from '@playwright/test';
import { ApiAuthHelper } from '../ApiAuthHelper';
import { adminProfessionalUser } from '../../tests/fixtures';
import {
  AppointmentDataStore,
  CreatedAppointmentData,
  ParticipantDetails,
} from './AppointmentDataStore';

export interface CreateAppointmentApiOptions {
  companyId?: number;
  procedureId?: number;
  procedureTitle?: string;
  dateStart?: Date;
  durationMinutes?: number;
  participant?: Partial<ParticipantDetails>;
  observations?: string;
  internalNotes?: string;
}

export class AppointmentApiHelper {
  /**
   * Creates an appointment via GraphQL API, automatically saves the result into AppointmentDataStore,
   * and returns the created appointment data object.
   */
  static async createAppointment(
    requestContext: APIRequestContext,
    options: CreateAppointmentApiOptions = {}
  ): Promise<CreatedAppointmentData> {
    const companyId = options.companyId ?? 1112;
    const procedureId = options.procedureId ?? 3524;
    const procedureTitle = options.procedureTitle ?? 'ALL in ONE';

    // Calculate appointment start and end times (default: tomorrow at 10:00 AM UTC)
    const startDate = options.dateStart ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (!options.dateStart) {
      startDate.setHours(10, 0, 0, 0);
    }
    const durationMs = (options.durationMinutes ?? 15) * 60 * 1000;
    const endDate = new Date(startDate.getTime() + durationMs);

    const participant: ParticipantDetails = {
      dni: options.participant?.dni ?? 'ammarpass',
      idCardType: options.participant?.idCardType ?? 'passport',
      name: options.participant?.name ?? 'Ammar',
      surname: options.participant?.surname ?? 'Micijevic',
      phone: options.participant?.phone ?? '+38761123456',
      email: options.participant?.email ?? 'ammar.micijevic@councilbox.com',
      zipcode: options.participant?.zipcode ?? '71000',
      country: options.participant?.country ?? 'Spain',
      prefix: options.participant?.prefix ?? '+387',
    };

    // Authenticate and fetch valid token
    const tokens = await ApiAuthHelper.getTokensForUser(
      requestContext,
      adminProfessionalUser.username,
      adminProfessionalUser.password
    );

    const graphqlUrl = ApiAuthHelper.getGraphqlUrl();

    const mutationQuery = `
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

    const response = await requestContext.post(graphqlUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.token}`,
        'x-jwt-token': tokens.token,
        'cbx-client-v': '8.6.6',
      },
      data: {
        operationName: 'CreateAppointment',
        query: mutationQuery,
        variables: {
          council: {
            name: procedureTitle,
            companyId: companyId,
            councilType: 5,
            statuteId: procedureId,
            dateStart: startDate.toISOString(),
            dateEnd: endDate.toISOString(),
            language: 'en',
            observations: options.observations ?? 'Automated test appointment',
            internalNotes: options.internalNotes ?? 'Created via AppointmentApiHelper',
          },
          proceduresIds: [procedureId],
          participant: {
            dni: participant.dni,
            idCardType: participant.idCardType,
            name: participant.name,
            surname: participant.surname,
            phone: participant.phone,
            email: participant.email,
            zipcode: participant.zipcode,
          },
        },
      },
    });

    if (!response.ok()) {
      throw new Error(`CreateAppointment HTTP error status ${response.status()}: ${await response.text()}`);
    }

    const body = await response.json();
    if (body.errors && body.errors.length > 0) {
      throw new Error(`CreateAppointment GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
    }

    const created = body.data?.createAppointment;
    if (!created || !created.id) {
      throw new Error(`CreateAppointment returned empty or invalid data: ${JSON.stringify(body)}`);
    }

    const appData: CreatedAppointmentData = {
      id: created.id,
      name: created.name || procedureTitle,
      caseNumber: created.caseNumber,
      externalId: created.externalId || null,
      dateStart: created.dateStart,
      dateEnd: created.dateEnd,
      state: created.state,
      procedureId,
      procedureTitle,
      companyId,
      participant,
      createdTimeMs: Date.now(),
    };

    // Save to data store
    AppointmentDataStore.saveAppointment(appData);

    return appData;
  }
}
