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

        let tokens: AuthTokens | undefined;

        // Try reading cached tokens saved by auth.setup.ts
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

        const response = await requestContext.post(graphqlUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.token}`,
                'x-jwt-token': tokens.token,
                'cbx-client-v': '8.6.6',
            },
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
}
