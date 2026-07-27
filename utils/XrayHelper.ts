import dotenv from 'dotenv';
dotenv.config();

const AUTH_URL = 'https://xray.cloud.getxray.app/api/v2/authenticate';
const GRAPHQL_URL = 'https://xray.cloud.getxray.app/api/v2/graphql';
const EXECUTION_URL = 'https://xray.cloud.getxray.app/api/v2/import/execution';

export class XrayHelper {
  private static token: string | null = null;

  /**
   * Authenticates with Xray Cloud API and returns a Bearer Token.
   */
  public static async getBearerToken(): Promise<string> {
    if (this.token) return this.token;

    const clientId = process.env.XRAY_CLIENT_ID;
    const clientSecret = process.env.XRAY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('XRAY_CLIENT_ID and XRAY_CLIENT_SECRET must be set in .env');
    }

    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
    });

    if (!response.ok) {
      throw new Error(`Failed to authenticate with Xray Cloud: ${response.statusText}`);
    }

    const rawToken = await response.text();
    this.token = rawToken.replace(/"/g, '').trim();
    return this.token;
  }

  /**
   * Query Xray Tests and Test Steps via Xray Cloud GraphQL API.
   * @param jql Jira Query Language string (e.g. 'project = "OVAC" AND issuetype = "Test"')
   */
  public static async getTests(jql: string, limit = 20): Promise<any[]> {
    const token = await this.getBearerToken();

    const query = `
      query GetTests($jql: String!, $limit: Int!) {
        getTests(jql: $jql, limit: $limit) {
          total
          results {
            issueId
            jira {
              key
              summary
            }
            testType {
              name
            }
            steps {
              action
              data
              result
            }
          }
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { jql, limit },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Xray tests: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data?.getTests?.results || [];
  }

  /**
   * Update Xray Test Case execution status (e.g., PASSED, FAILED, TODO, EXECUTING).
   */
  public static async updateTestStatus(executionKey: string, testKey: string, status: 'PASSED' | 'FAILED' | 'TODO' | 'EXECUTING' | 'ABORTED'): Promise<boolean> {
    const token = await this.getBearerToken();

    const payload = {
      testExecutionKey: executionKey,
      tests: [
        {
          testKey,
          status,
        },
      ],
    };

    const response = await fetch(EXECUTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Failed to update test status for ${testKey}:`, await response.text());
      return false;
    }

    return true;
  }
}
