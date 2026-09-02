import { APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ApiAuthHelper, AuthTokens } from '../ApiAuthHelper';
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

const TOKENS_FILE = path.join(process.cwd(), 'playwright/.auth/tokens.json');

export class UserApiHelper {
  private static async getAuthHeaders(requestContext: APIRequestContext): Promise<{ graphqlUrl: string; headers: Record<string, string> }> {
    let tokens: AuthTokens | undefined;

    if (fs.existsSync(TOKENS_FILE)) {
      try {
        const fileData = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
        if (fileData.token && fileData.refreshToken) {
          tokens = fileData;
        }
      } catch {
        // fallback
      }
    }

    if (!tokens) {
      tokens = await ApiAuthHelper.getTokensForUser(
        requestContext,
        adminProfessionalUser.username,
        adminProfessionalUser.password
      );
    }

    const graphqlUrl = ApiAuthHelper.getGraphqlUrl();

    return {
      graphqlUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.token}`,
        'x-jwt-token': tokens.token,
        'cbx-client-v': '8.6.6',
      },
    };
  }

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

    const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);

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
      headers,
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
      id: Number(createdId),
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

  /**
   * Deletes a user by ID via GraphQL DeleteUser mutation.
   */
  static async deleteUser(
    requestContext: APIRequestContext,
    userId: number | string
  ): Promise<boolean> {
    const numericId = Number(userId);
    if (!numericId || isNaN(numericId)) {
      return false;
    }

    const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);

    const response = await requestContext.post(graphqlUrl, {
      headers,
      data: {
        operationName: 'DeleteUser',
        variables: {
          userId: numericId,
        },
        query: `mutation DeleteUser($userId: ID!) {
          deleteUser(userId: $userId) {
            success
            message
            __typename
          }
        }`,
      },
    });

    if (!response.ok()) {
      throw new Error(`DeleteUser HTTP error status ${response.status()}: ${await response.text()}`);
    }

    const body = await response.json();
    if (body.errors && body.errors.length > 0) {
      throw new Error(`DeleteUser GraphQL error: ${JSON.stringify(body.errors, null, 2)}`);
    }

    const isSuccess = body.data?.deleteUser?.success === true;
    if (isSuccess) {
      UserDataStore.removeUser(numericId);
    }
    return isSuccess;
  }

  /**
   * Deletes multiple users by IDs via GraphQL API.
   */
  static async deleteUsers(
    requestContext: APIRequestContext,
    userIds: (number | string)[]
  ): Promise<boolean> {
    let allSuccess = true;
    for (const id of userIds) {
      const res = await this.deleteUser(requestContext, id);
      if (!res) allSuccess = false;
    }
    return allSuccess;
  }

  /**
   * Finds user(s) by email and deletes them via GraphQL API.
   */
  static async deleteUserByEmail(
    requestContext: APIRequestContext,
    email: string,
    corporationId: number = 1112
  ): Promise<boolean> {
    const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);

    const response = await requestContext.post(graphqlUrl, {
      headers,
      data: {
        operationName: 'corporationUsers',
        variables: {
          filters: [{ field: 'name', text: email }],
          options: { offset: 0, limit: 20 },
          corporationId,
          showDeletedUsers: false,
        },
        query: `query corporationUsers($filters: [FilterInput], $options: OptionsInput, $corporationId: Int, $showDeletedUsers: Boolean) {
          corporationUsers(filters: $filters, options: $options, corporationId: $corporationId, showDeletedUsers: $showDeletedUsers) {
            list {
              id
              email
              name
              surname
              __typename
            }
            total
            __typename
          }
        }`,
      },
    });

    if (!response.ok()) {
      return false;
    }

    const body = await response.json();
    const users: Array<{ id: number; email: string }> = body.data?.corporationUsers?.list || [];
    const matchingUsers = users.filter(
      (u) => u.email && u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (matchingUsers.length === 0) {
      return false;
    }

    return await this.deleteUsers(
      requestContext,
      matchingUsers.map((u) => u.id)
    );
  }

  /**
   * Cleans up all users saved in UserDataStore via GraphQL API.
   */
  static async cleanupStoredUsers(requestContext: APIRequestContext): Promise<number> {
    const storedUsers = UserDataStore.getAllUsers();
    let cleanedCount = 0;

    for (const user of storedUsers) {
      try {
        const ok = await this.deleteUser(requestContext, user.id);
        if (ok) cleanedCount++;
      } catch (err) {
        console.warn(`[UserApiHelper] Failed to cleanup user #${user.id}:`, err);
      }
    }

    UserDataStore.clearStore();
    return cleanedCount;
  }
}
