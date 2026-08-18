import { APIRequestContext } from '@playwright/test';
import { ApiAuthHelper } from '../ApiAuthHelper';
import { adminProfessionalUser } from '../../tests/fixtures';
import { DataGenerator } from '../DataGenerator';
import { UserDataStore } from './UserDataStore';

export type UserRole =
  | 'professionalAdmin' // Admin agent
  | 'professional'      // Agent
  | 'admin'             // Entity administrator
  | 'supervisor'        // Supervisor
  | 'calendarManager'   // Schedule administrator
  | 'appointmentAgent'; // Agent with video attention

export interface CreateUserApiOptions {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  idCard?: string;
  preferredLanguage?: 'en' | 'es';
  role?: UserRole;
  corporationId?: number;
  companies?: number[];
  options?: {
    appointments?: boolean;
    managements?: boolean;
    immediateAppointments?: boolean;
  };
  usr?: string;
  licenseId?: number | null;
  variant?: string | null;
}

export interface CreatedUserData {
  id: number;
  name: string;
  surname: string;
  fullName: string;
  email: string;
  phone: string;
  idCard: string;
  role: UserRole;
  corporationId: number;
}

export class UserApiHelper {
  /**
   * Creates a user via GraphQL API (CreateUserWithoutPassword) and returns user metadata.
   */
  static async createUser(
    requestContext: APIRequestContext,
    options: CreateUserApiOptions = {}
  ): Promise<CreatedUserData> {
    const randomData = DataGenerator.randomUserData();
    const corporationId = options.corporationId ?? 1112;
    const name = options.name ?? randomData.name;
    const surname = options.surname ?? randomData.surname;
    const email = options.email ?? randomData.email;
    const idCard = options.idCard ?? randomData.idCard;
    const phone = options.phone ?? `+387-${randomData.phone}`;
    const preferredLanguage = options.preferredLanguage ?? 'es';
    const role: UserRole = options.role ?? 'professionalAdmin';
    const companies = options.companies ?? [];

    const userOptions = {
      appointments: options.options?.appointments ?? true,
      managements: options.options?.managements ?? true,
      ...(options.options?.immediateAppointments ? { immediate_appointments: true } : {}),
    };

    // Obtain authentication token
    const tokens = await ApiAuthHelper.getTokensForUser(
      requestContext,
      adminProfessionalUser.username,
      adminProfessionalUser.password
    );

    const graphqlUrl = ApiAuthHelper.getGraphqlUrl();

    const mutationQuery = `
      mutation CreateUserWithoutPassword(
        $user: UserInput!,
        $companies: [Int],
        $corporationId: Int,
        $variant: String
      ) {
        createUserWithoutPassword(
          user: $user
          companies: $companies
          corporationId: $corporationId
          variant: $variant
        ) {
          id
          __typename
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
        operationName: 'CreateUserWithoutPassword',
        query: mutationQuery,
        variables: {
          user: {
            name,
            surname,
            email,
            phone,
            idCard,
            preferredLanguage,
            roles: role,
            options: userOptions,
            usr: options.usr ?? '',
            licenseId: options.licenseId ?? null,
          },
          companies,
          corporationId,
          variant: options.variant ?? null,
        },
      },
    });

    if (!response.ok()) {
      throw new Error(`CreateUserWithoutPassword HTTP error status ${response.status()}: ${await response.text()}`);
    }

    const body = await response.json();
    if (body.errors && body.errors.length > 0) {
      throw new Error(`CreateUserWithoutPassword GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
    }

    const createdId = body.data?.createUserWithoutPassword?.id;
    if (!createdId) {
      throw new Error(`CreateUserWithoutPassword returned invalid data: ${JSON.stringify(body)}`);
    }

    const createdUserData: CreatedUserData = {
      id: createdId,
      name,
      surname,
      fullName: `${name} ${surname}`,
      email,
      phone,
      idCard,
      role,
      corporationId,
    };

    UserDataStore.saveUser(createdUserData);

    return createdUserData;
  }

  /**
   * Helper to create an Admin Agent user (role: 'professionalAdmin').
   */
  static async createAdminAgentUser(
    requestContext: APIRequestContext,
    options: Omit<CreateUserApiOptions, 'role'> = {}
  ): Promise<CreatedUserData> {
    return this.createUser(requestContext, {
      ...options,
      role: 'professionalAdmin',
    });
  }
}
