import { APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ApiAuthHelper, AuthTokens } from '../ApiAuthHelper';
import { adminProfessionalUser } from '../../tests/fixtures';

export interface CreateProcedureApiOptions {
    companyId?: number;
    title?: string;
    description?: string;
    councilType?: number;
    signatureType?: number;
}

export interface CreatedProcedureData {
    id: string;
    title: string;
    description: string;
    companyId: number;
}

const TOKENS_FILE = path.join(process.cwd(), 'playwright/.auth/tokens.json');

export class ProcedureApiHelper {
    private static async getAuthHeaders(requestContext: APIRequestContext): Promise<{ graphqlUrl: string; headers: Record<string, string> }> {
        let tokens: AuthTokens | undefined;

        if (fs.existsSync(TOKENS_FILE)) {
            try {
                const fileData = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
                if (fileData.token && fileData.refreshToken) {
                    tokens = fileData;
                }
            } catch {
                // fallback to ApiAuthHelper
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
     * Creates a procedure via GraphQL API and returns the created procedure data.
     */
    static async createProcedure(
        requestContext: APIRequestContext,
        options: CreateProcedureApiOptions = {}
    ): Promise<CreatedProcedureData> {
        const companyId = options.companyId ?? 1112;
        const title = options.title ?? `Automation Procedure ${Math.floor(100000 + Math.random() * 900000)}`;
        const description = options.description ?? `<p>Automation description for ${title}</p>`;
        const councilType = options.councilType ?? 5; // 5 = Video-appointment
        const signatureType = options.signatureType ?? 1;

        const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);

        const response = await requestContext.post(graphqlUrl, {
            headers,
            data: {
                operationName: 'createCompanyStatute',
                variables: {
                    statute: {
                        title,
                        conveneHeader: description.startsWith('<') ? description : `<p>${description}</p>`,
                        conveneFooter: '',
                        companyId,
                        signatureType,
                        councilType,
                    },
                },
                query: `mutation createCompanyStatute($statute: StatuteInput!) {
                    createCompanyStatute(statute: $statute) {
                        id
                        __typename
                    }
                }`,
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to create procedure via API HTTP ${response.status()}: ${await response.text()}`);
        }

        const body = await response.json();
        if (body.errors && body.errors.length > 0) {
            throw new Error(`GraphQL Error creating procedure: ${JSON.stringify(body.errors)}`);
        }

        const createdId = body.data?.createCompanyStatute?.id;
        if (!createdId) {
            throw new Error(`Procedure creation via API did not return an ID: ${JSON.stringify(body)}`);
        }

        return {
            id: String(createdId),
            title,
            description,
            companyId,
        };
    }

    /**
     * Deletes procedures by IDs via GraphQL mutation DeleteCompanyStatutes
     */
    static async deleteProceduresByIds(
        requestContext: APIRequestContext,
        statuteIds: (number | string)[],
        reasonDeletion: string = 'Automated cleanup'
    ): Promise<boolean> {
        const numericIds = statuteIds.map(id => Number(id)).filter(id => !isNaN(id));
        if (numericIds.length === 0) {
            return false;
        }

        const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);

        const response = await requestContext.post(graphqlUrl, {
            headers,
            data: {
                operationName: 'DeleteCompanyStatutes',
                variables: {
                    statuteIds: numericIds,
                    reasonDeletion,
                },
                query: `mutation DeleteCompanyStatutes($statuteIds: [Int!], $reasonDeletion: SafeString) {
                    deleteCompanyStatutes(statuteIds: $statuteIds, reasonDeletion: $reasonDeletion) {
                        success
                        __typename
                    }
                }`,
            },
        });

        if (!response.ok()) {
            throw new Error(`Failed to delete procedures via API HTTP ${response.status()}: ${await response.text()}`);
        }

        const body = await response.json();
        if (body.errors && body.errors.length > 0) {
            throw new Error(`GraphQL Error deleting procedures: ${JSON.stringify(body.errors)}`);
        }

        return body.data?.deleteCompanyStatutes?.success === true;
    }

    /**
     * Finds procedure(s) by name and deletes them via GraphQL API
     */
    static async deleteProcedureByName(
        requestContext: APIRequestContext,
        title: string,
        companyId: number = 1112,
        reasonDeletion: string = 'Automated cleanup'
    ): Promise<boolean> {
        const { graphqlUrl, headers } = await this.getAuthHeaders(requestContext);

        const response = await requestContext.post(graphqlUrl, {
            headers,
            data: {
                operationName: 'statutes',
                variables: {
                    companyId,
                    includeUnpublished: true,
                    councilType: null,
                },
                query: `query statutes($companyId: Int!, $includeUnpublished: Boolean, $councilType: Int) {
                    companyStatutes(companyId: $companyId, includeUnpublished: $includeUnpublished, councilType: $councilType) {
                        id
                        title
                        __typename
                    }
                }`,
            },
        });

        if (!response.ok()) {
            return false;
        }

        const body = await response.json();
        const statutes: Array<{ id: number; title: string }> = body.data?.companyStatutes || [];
        const matchingStatutes = statutes.filter(
            s => s.title && s.title.trim().toLowerCase() === title.trim().toLowerCase()
        );

        if (matchingStatutes.length === 0) {
            return false;
        }

        const idsToDelete = matchingStatutes.map(s => s.id);
        return await this.deleteProceduresByIds(requestContext, idsToDelete, reasonDeletion);
    }
}
