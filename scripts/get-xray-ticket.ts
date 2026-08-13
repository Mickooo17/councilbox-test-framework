import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function main() {
  const host = process.env.JIRA_HOST;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;

  if (!host || !email || !token) {
    console.error('Missing Jira credentials');
    return;
  }

  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  console.log(`Connecting to Jira as ${email}...`);

  const ticketKey = process.argv[2] || 'XR-3086';
  const response = await fetch(`${host}/rest/api/3/issue/${ticketKey}`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Error fetching issue:', response.status, await response.text());
    return;
  }

  const data = await response.json();
  fs.writeFileSync(`${ticketKey.toLowerCase()}-details.json`, JSON.stringify(data, null, 2));
  console.log(`Saved to ${ticketKey.toLowerCase()}-details.json`);
  console.log('Summary:', data.fields?.summary);
  console.log('Description:', JSON.stringify(data.fields?.description, null, 2));
}

main();
