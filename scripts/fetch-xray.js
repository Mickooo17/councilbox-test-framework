const dotenv = require('dotenv');
dotenv.config();

async function getXrayTest(ticketKey) {
  const xrayClientId = process.env.XRAY_CLIENT_ID;
  const xrayClientSecret = process.env.XRAY_CLIENT_SECRET;

  if (!xrayClientId || !xrayClientSecret) {
    console.error('XRAY_CLIENT_ID or XRAY_CLIENT_SECRET not found in .env');
    return null;
  }

  const authRes = await fetch('https://xray.cloud.getxray.app/api/v2/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: xrayClientId, client_secret: xrayClientSecret })
  });

  if (!authRes.ok) {
    console.error('Xray Auth failed:', authRes.status, await authRes.text());
    return null;
  }

  const xrayToken = (await authRes.text()).replace(/"/g, '');

  const gqlQuery = `
    query {
      getTests(jql: "key = '${ticketKey}'", limit: 1) {
        results {
          issueId
          testType {
            name
          }
          steps {
            id
            action
            data
            result
          }
        }
      }
    }
  `;

  const gqlRes = await fetch('https://xray.cloud.getxray.app/api/v2/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${xrayToken}`
    },
    body: JSON.stringify({ query: gqlQuery })
  });

  const gqlData = await gqlRes.json();
  const testData = gqlData.data?.getTests?.results?.[0];
  return testData;
}

async function main() {
  const ticketKey = process.argv[2] || 'XR-3111';
  const data = await getXrayTest(ticketKey);
  if (!data) {
    console.log(`No data found for ${ticketKey}`);
    return;
  }

  console.log(`\n📋 Xray Test Case: ${ticketKey}`);
  console.log(`Type: ${data.testType?.name || 'Manual'}`);
  console.log(`\nSteps (${data.steps?.length || 0}):`);
  (data.steps || []).forEach((s, idx) => {
    console.log(`\nStep ${idx + 1}:`);
    console.log(`  Action: ${s.action}`);
    if (s.data) console.log(`  Data:   ${s.data}`);
    console.log(`  Result: ${s.result}`);
  });
}

main();
