import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const host = process.env.JIRA_HOST;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;

  if (!host || !email || !token) {
    throw new Error('JIRA_HOST, JIRA_EMAIL, and JIRA_API_TOKEN must be set in .env');
  }

  const auth = Buffer.from(`${email}:${token}`).toString('base64');
  console.log(`Connecting to Jira as ${email}...`);

  const url = `${host}/rest/api/3/search/jql`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      jql: 'issuetype = Test ORDER BY created DESC',
      maxResults: 5,
      fields: ['summary', 'status', 'issuetype', 'project'],
    }),
  });

  if (!response.ok) {
    console.error('Jira API error:', response.status, await response.text());
    return;
  }

  const data = await response.json();
  console.log(`Total Xray Test issues found: ${data.total || data.issues?.length}`);
  if (data.issues) {
    data.issues.forEach((issue: any) => {
      console.log(`- [${issue.key}]: ${issue.fields?.summary} (Status: ${issue.fields?.status?.name})`);
    });
  }
}

main();
