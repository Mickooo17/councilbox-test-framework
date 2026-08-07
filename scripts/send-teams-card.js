const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

async function sendTeamsCard() {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('[send-teams-card] TEAMS_WEBHOOK_URL is missing, skipping Teams notification.');
    return;
  }

  const buildNumber = process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || '1';
  const reportUrl = process.env.REPORT_URL || 'https://mickooo17.github.io/councilbox-test-framework/';
  const githubRunUrl = process.env.GITHUB_RUN_URL || `https://github.com/${process.env.GITHUB_REPOSITORY || 'Mickooo17/councilbox-test-framework'}/actions/runs/${process.env.GITHUB_RUN_ID || ''}`;

  let total = 0, passed = 0, failed = 0;
  try {
    total = parseInt(fs.readFileSync('total-tests.txt', 'utf8').trim(), 10) || 0;
    passed = parseInt(fs.readFileSync('passed-tests.txt', 'utf8').trim(), 10) || 0;
    failed = parseInt(fs.readFileSync('failed-tests-count.txt', 'utf8').trim(), 10) || 0;
  } catch {
    // fallback
  }

  const passRate = total > 0 ? Math.round((passed / total) * 100) : (failed === 0 ? 100 : 0);
  const isSuccess = failed === 0;

  const statusText = isSuccess ? '✔ PASSED' : '✖ FAILED';
  const statusColor = isSuccess ? 'Good' : 'Attention';
  const statusStyle = isSuccess ? 'good' : 'attention';

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }) + ' UTC';

  const bannerText = isSuccess
    ? '🎉 All automated tests completed successfully. No failures detected.'
    : `⚠️ ${failed} test(s) failed out of ${total}. Check Allure Report for details.`;

  const cardContent = {
    $schema: 'http://adaptivecards.io/schemas/adaptivecard.json',
    type: 'AdaptiveCard',
    version: '1.5',
    body: [
      {
        type: 'ColumnSet',
        columns: [
          {
            type: 'Column',
            width: 'auto',
            verticalContentAlignment: 'Center',
            items: [
              {
                type: 'TextBlock',
                text: '🚀',
                size: 'ExtraLarge'
              }
            ]
          },
          {
            type: 'Column',
            width: 'stretch',
            verticalContentAlignment: 'Center',
            items: [
              {
                type: 'TextBlock',
                text: 'Councilbox QA Automation',
                weight: 'Bolder',
                size: 'Large',
                spacing: 'None'
              },
              {
                type: 'TextBlock',
                text: 'councilbox-web · main · Staging',
                isSubtle: true,
                size: 'Small',
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 'auto',
            verticalContentAlignment: 'Center',
            items: [
              {
                type: 'Container',
                style: statusStyle,
                bleed: false,
                items: [
                  {
                    type: 'TextBlock',
                    text: statusText,
                    weight: 'Bolder',
                    size: 'Small',
                    color: statusColor,
                    horizontalAlignment: 'Center',
                    spacing: 'None'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'TextBlock',
        text: `Build #${buildNumber}  •  ${dateStr}`,
        size: 'Small',
        isSubtle: true,
        spacing: 'Small'
      },
      {
        type: 'ColumnSet',
        spacing: 'Medium',
        columns: [
          {
            type: 'Column',
            width: 1,
            items: [
              {
                type: 'TextBlock',
                text: 'Pass rate',
                size: 'Small',
                isSubtle: true,
                spacing: 'None'
              },
              {
                type: 'TextBlock',
                text: `${passRate}%`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                color: isSuccess ? 'Good' : 'Attention',
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 1,
            items: [
              {
                type: 'TextBlock',
                text: 'Total tests',
                size: 'Small',
                isSubtle: true,
                spacing: 'None',
                horizontalAlignment: 'Right'
              },
              {
                type: 'TextBlock',
                text: `${total}`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                horizontalAlignment: 'Right',
                spacing: 'None'
              }
            ]
          }
        ]
      },
      {
        type: 'ColumnSet',
        spacing: 'Small',
        columns: [
          {
            type: 'Column',
            width: passRate > 0 ? passRate : 1,
            items: [
              {
                type: 'Container',
                style: statusStyle,
                height: 'stretch',
                spacing: 'None',
                items: [
                  {
                    type: 'TextBlock',
                    text: ' ',
                    size: 'Small',
                    spacing: 'None'
                  }
                ]
              }
            ]
          },
          {
            type: 'Column',
            width: (100 - passRate) > 0 ? (100 - passRate) : 0,
            items: [
              {
                type: 'Container',
                style: 'attention',
                height: 'stretch',
                items: [
                  {
                    type: 'TextBlock',
                    text: ' ',
                    size: 'Small',
                    spacing: 'None'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'ColumnSet',
        spacing: 'Medium',
        columns: [
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: '🟢  Passed',
                weight: 'Bolder',
                size: 'Small'
              }
            ]
          },
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: `${passed}`,
                weight: 'Bolder',
                size: 'Small',
                color: 'Good'
              }
            ]
          },
          {
            type: 'Column',
            width: 'stretch',
            items: []
          },
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: '🔴  Failed',
                weight: 'Bolder',
                size: 'Small'
              }
            ]
          },
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: `${failed}`,
                weight: 'Bolder',
                size: 'Small',
                color: failed > 0 ? 'Attention' : 'Default'
              }
            ]
          }
        ]
      },
      {
        type: 'Container',
        style: 'emphasis',
        spacing: 'Medium',
        items: [
          {
            type: 'TextBlock',
            text: bannerText,
            wrap: true,
            weight: 'Bolder',
            horizontalAlignment: 'Center',
            size: 'Small'
          }
        ]
      },
      {
        type: 'ActionSet',
        spacing: 'Medium',
        actions: [
          {
            type: 'Action.OpenUrl',
            title: '📊 Allure Report',
            url: reportUrl,
            style: 'positive'
          },
          {
            type: 'Action.OpenUrl',
            title: '🐙 GitHub Actions',
            url: githubRunUrl
          }
        ]
      }
    ]
  };

  const payload = JSON.stringify({
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        contentUrl: null,
        content: cardContent
      }
    ]
  });

  const parsedUrl = new URL(webhookUrl);
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || 443,
    path: parsedUrl.pathname + parsedUrl.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const client = parsedUrl.protocol === 'https:' ? https : http;
    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        console.log(`[send-teams-card] Webhook response status: ${res.statusCode}`);
        resolve();
      });
    });

    req.on('error', (err) => {
      console.error(`[send-teams-card] Webhook request error: ${err.message}`);
      resolve(); // Don't throw error to avoid failing workflow
    });

    req.write(payload);
    req.end();
  });
}

sendTeamsCard();
