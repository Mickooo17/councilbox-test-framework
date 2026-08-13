import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function fetchIssue(key: string) {
  const host = process.env.JIRA_HOST;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const auth = Buffer.from(`${email}:${token}`).toString('base64');

  const response = await fetch(`${host}/rest/api/3/issue/${key}?expand=renderedFields`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
  });

  return await response.json();
}

async function main() {
  const ovac = await fetchIssue('OVAC-1859');
  fs.writeFileSync('ovac-1859-details.json', JSON.stringify(ovac, null, 2));
  console.log('OVAC-1859 Summary:', ovac.fields?.summary);
  console.log('OVAC-1859 Description:', JSON.stringify(ovac.fields?.description, null, 2));

  // Let's also check Jira REST API for Xray test steps endpoint: /rest/raven/1.0/api/test/XR-3054/steps
  const host = process.env.JIRA_HOST;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const auth = Buffer.from(`${email}:${token}`).toString('base64');

  const xrayStepsRes = await fetch(`${host}/rest/raven/1.0/api/test/XR-3054/steps`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  console.log('Raven API status:', xrayStepsRes.status);
  if (xrayStepsRes.ok) {
    console.log('Raven Steps:', await xrayStepsRes.json());
  }
}

main();
