import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const clientId = process.env.XRAY_CLIENT_ID;
  const clientSecret = process.env.XRAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing Xray credentials');
    return;
  }

  // Authenticate
  const authRes = await fetch('https://xray.cloud.getxray.app/api/v2/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
  });

  if (!authRes.ok) {
    console.error('Xray auth failed:', authRes.status, await authRes.text());
    return;
  }

  const token = await authRes.text();
  const tokenClean = token.replace(/^"(.*)"$/, '$1');

  const ticketKey = process.argv[2] || 'XR-3086';
  // GraphQL query
  const query = `
    query {
      getTest(issueKey: "${ticketKey}") {
        issueId
        jira(fields: ["summary", "description"])
        testType { name }
        steps {
          action
          data
          result
        }
      }
    }
  `;

  const gqlRes = await fetch('https://xray.cloud.getxray.app/api/v2/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenClean}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const gqlData = await gqlRes.json();
  console.log('Xray Data:', JSON.stringify(gqlData, null, 2));
}

main();
