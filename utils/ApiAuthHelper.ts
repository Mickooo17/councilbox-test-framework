import { APIRequestContext, BrowserContext, Page } from '@playwright/test';
import envConfig from '../global-env';

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export class ApiAuthHelper {
  static getGraphqlUrl(): string {
    const baseUrl = envConfig.baseUrl || 'https://qa.ovac.pre.councilbox.com/admin';
    const url = new URL(baseUrl);
    const hostParts = url.hostname.split('.');
    if (hostParts.length >= 4 && hostParts[0] === 'qa') {
      hostParts[0] = 'api';
    }
    return `https://${hostParts.join('.')}/graphql`;
  }

  static async fetchTokens(requestContext: APIRequestContext, email: string, password: string): Promise<AuthTokens> {
    const graphqlUrl = this.getGraphqlUrl();
    const baseUrl = envConfig.baseUrl || 'https://qa.ovac.pre.councilbox.com/admin';
    const origin = new URL(baseUrl).origin;

    const response = await requestContext.post(graphqlUrl, {
      data: {
        operationName: 'Login',
        query: `mutation Login($email: String!, $password: String!, $recaptchaToken: String) {
          secureLogin(email: $email, password: $password, recaptchaToken: $recaptchaToken) {
            token
            refreshToken
          }
        }`,
        variables: {
          recaptchaToken: '',
          email,
          password,
        },
      },
      headers: {
        'Content-Type': 'application/json',
        'cbx-client-v': '8.6.6',
        'referer': `${origin}/`,
      },
    });

    if (!response.ok()) {
      throw new Error(`API login failed HTTP status ${response.status()}: ${await response.text()}`);
    }

    const body = await response.json();
    if (body.errors && body.errors.length > 0) {
      throw new Error(`API login GraphQL error: ${JSON.stringify(body.errors)}`);
    }

    const data = body.data?.secureLogin;
    if (!data || !data.token || !data.refreshToken) {
      throw new Error(`API login returned incomplete tokens: ${JSON.stringify(body)}`);
    }

    return {
      token: data.token,
      refreshToken: data.refreshToken,
    };
  }

  static async loginViaApi(page: Page, requestContext: APIRequestContext, email: string, password: string): Promise<AuthTokens> {
    const tokens = await this.fetchTokens(requestContext, email, password);

    await page.addInitScript(({ token, refreshToken }) => {
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('refreshUserToken', refreshToken);
    }, { token: tokens.token, refreshToken: tokens.refreshToken });

    return tokens;
  }

  static async setupContextApiAuth(context: BrowserContext, requestContext: APIRequestContext, email: string, password: string): Promise<AuthTokens> {
    const tokens = await this.fetchTokens(requestContext, email, password);

    await context.addInitScript(({ token, refreshToken }) => {
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('refreshUserToken', refreshToken);
    }, { token: tokens.token, refreshToken: tokens.refreshToken });

    return tokens;
  }
}
