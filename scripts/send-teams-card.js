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
  const branchName = process.env.GITHUB_REF_NAME || 'main';
  const testEnv = (process.env.TEST_ENV || 'Staging').charAt(0).toUpperCase() + (process.env.TEST_ENV || 'Staging').slice(1);
  const reportUrl = process.env.REPORT_URL || 'https://mickooo17.github.io/councilbox-test-framework/';
  const githubRunUrl = process.env.GITHUB_RUN_URL || `https://github.com/${process.env.GITHUB_REPOSITORY || 'Mickooo17/councilbox-test-framework'}/actions/runs/${process.env.GITHUB_RUN_ID || ''}`;
  let durationStr = process.env.BUILD_DURATION || '';
  if (!durationStr && fs.existsSync('build-duration.txt')) {
    try {
      durationStr = fs.readFileSync('build-duration.txt', 'utf8').trim();
    } catch {}
  }
  if (!durationStr) {
    durationStr = 'N/A';
  }

  let total = 0, passed = 0, failed = 0, broken = 0, skipped = 0;
  try {
    total = parseInt(fs.readFileSync('total-tests.txt', 'utf8').trim(), 10) || 0;
    passed = parseInt(fs.readFileSync('passed-tests.txt', 'utf8').trim(), 10) || 0;
    failed = parseInt(fs.readFileSync('failed-tests-count.txt', 'utf8').trim(), 10) || 0;
    broken = parseInt(fs.readFileSync('broken-tests.txt', 'utf8').trim(), 10) || 0;
    skipped = parseInt(fs.readFileSync('skipped-tests.txt', 'utf8').trim(), 10) || 0;
  } catch {
    // fallback
  }

  const isSuccess = failed === 0;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : (isSuccess ? 100 : 0);

  const statusText = isSuccess ? '✔  PASSED' : '✖  FAILED';
  const statusColor = isSuccess ? 'Good' : 'Attention';
  const statusStyle = isSuccess ? 'good' : 'attention';

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });

  let bannerIcon = '✅';
  let bannerText = '';
  if (isSuccess && broken === 0 && skipped === 0) {
    bannerText = '🎉 All automated tests completed successfully. No failures detected.';
  } else if (isSuccess) {
    const note = [];
    if (broken > 0) note.push(`${broken} broken`);
    if (skipped > 0) note.push(`${skipped} skipped`);
    bannerText = `No failures detected. ${note.join(' and ')} tests may need a quick look before release.`;
  } else {
    bannerIcon = '❌';
    bannerText = `${failed} test(s) failed out of ${total}. Check Allure Report for full failure trace.`;
  }

  // Progress bar column widths (minimum width 1 if count > 0)
  const pWidth = passed > 0 ? passed : 0;
  const bWidth = broken > 0 ? broken : 0;
  const sWidth = skipped > 0 ? skipped : 0;
  const fWidth = failed > 0 ? failed : 0;

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
                type: 'Container',
                style: 'accent',
                items: [
                  {
                    type: 'TextBlock',
                    text: '🚀',
                    size: 'Large',
                    horizontalAlignment: 'Center',
                    spacing: 'None'
                  }
                ]
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
                text: 'Automated Test Execution Summary',
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
        type: 'Container',
        style: 'default',
        spacing: 'Medium',
        items: [
          {
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    text: `🔧 Build #${buildNumber}`,
                    size: 'Small',
                    weight: 'Bolder',
                    spacing: 'None'
                  }
                ]
              },
              {
                type: 'Column',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    text: `🌿 ${branchName}`,
                    size: 'Small',
                    isSubtle: true,
                    spacing: 'None'
                  }
                ]
              },
              {
                type: 'Column',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    text: `🧪 ${testEnv}`,
                    size: 'Small',
                    isSubtle: true,
                    spacing: 'None'
                  }
                ]
              },
              {
                type: 'Column',
                width: 'auto',
                items: [
                  {
                    type: 'TextBlock',
                    text: `⏱ ${durationStr}`,
                    size: 'Small',
                    isSubtle: true,
                    spacing: 'None'
                  }
                ]
              },
              {
                type: 'Column',
                width: 'stretch',
                items: [
                  {
                    type: 'TextBlock',
                    text: dateStr,
                    size: 'Small',
                    isSubtle: true,
                    horizontalAlignment: 'Right',
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
            width: 1,
            items: [
              {
                type: 'Container',
                style: 'accent',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              },
              {
                type: 'TextBlock',
                text: 'TOTAL',
                size: 'Small',
                isSubtle: true,
                horizontalAlignment: 'Center',
                spacing: 'Small'
              },
              {
                type: 'TextBlock',
                text: `${total}`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                horizontalAlignment: 'Center',
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 1,
            items: [
              {
                type: 'Container',
                style: 'good',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              },
              {
                type: 'TextBlock',
                text: 'PASSED',
                size: 'Small',
                color: 'Good',
                horizontalAlignment: 'Center',
                spacing: 'Small'
              },
              {
                type: 'TextBlock',
                text: `${passed}`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                color: 'Good',
                horizontalAlignment: 'Center',
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 1,
            items: [
              {
                type: 'Container',
                style: 'attention',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              },
              {
                type: 'TextBlock',
                text: 'FAILED',
                size: 'Small',
                color: 'Attention',
                horizontalAlignment: 'Center',
                spacing: 'Small'
              },
              {
                type: 'TextBlock',
                text: `${failed}`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                color: 'Attention',
                horizontalAlignment: 'Center',
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 1,
            items: [
              {
                type: 'Container',
                style: 'warning',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              },
              {
                type: 'TextBlock',
                text: 'BROKEN',
                size: 'Small',
                color: 'Warning',
                horizontalAlignment: 'Center',
                spacing: 'Small'
              },
              {
                type: 'TextBlock',
                text: `${broken}`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                color: 'Warning',
                horizontalAlignment: 'Center',
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 1,
            items: [
              {
                type: 'Container',
                style: 'default',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              },
              {
                type: 'TextBlock',
                text: 'SKIPPED',
                size: 'Small',
                isSubtle: true,
                horizontalAlignment: 'Center',
                spacing: 'Small'
              },
              {
                type: 'TextBlock',
                text: `${skipped}`,
                size: 'ExtraLarge',
                weight: 'Bolder',
                isSubtle: true,
                horizontalAlignment: 'Center',
                spacing: 'None'
              }
            ]
          }
        ]
      },
      {
        type: 'TextBlock',
        text: 'Pass rate',
        size: 'Small',
        isSubtle: true,
        spacing: 'Medium'
      },
      {
        type: 'ColumnSet',
        spacing: 'Small',
        columns: [
          {
            type: 'Column',
            width: pWidth,
            items: [
              {
                type: 'Container',
                style: 'good',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              }
            ]
          },
          {
            type: 'Column',
            width: bWidth,
            items: [
              {
                type: 'Container',
                style: 'warning',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              }
            ]
          },
          {
            type: 'Column',
            width: sWidth,
            items: [
              {
                type: 'Container',
                style: 'default',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
              }
            ]
          },
          {
            type: 'Column',
            width: fWidth,
            items: [
              {
                type: 'Container',
                style: 'attention',
                height: 'stretch',
                spacing: 'None',
                items: [{ type: 'TextBlock', text: ' ', size: 'Small', spacing: 'None' }]
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
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: '🟢 Passed',
                size: 'Small',
                isSubtle: true,
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: '🟡 Broken',
                size: 'Small',
                isSubtle: true,
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: '⚪ Skipped',
                size: 'Small',
                isSubtle: true,
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 'auto',
            items: [
              {
                type: 'TextBlock',
                text: '🔴 Failed',
                size: 'Small',
                isSubtle: true,
                spacing: 'None'
              }
            ]
          },
          {
            type: 'Column',
            width: 'stretch',
            items: [
              {
                type: 'TextBlock',
                text: `${passRate}% passed`,
                size: 'Small',
                weight: 'Bolder',
                color: statusColor,
                horizontalAlignment: 'Right',
                spacing: 'None'
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
            type: 'ColumnSet',
            columns: [
              {
                type: 'Column',
                width: 'auto',
                verticalContentAlignment: 'Center',
                items: [
                  {
                    type: 'TextBlock',
                    text: bannerIcon,
                    size: 'Medium',
                    spacing: 'None'
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
                    text: bannerText,
                    wrap: true,
                    weight: 'Bolder',
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
        type: 'ActionSet',
        spacing: 'Medium',
        actions: [
          {
            type: 'Action.OpenUrl',
            title: '📊 View Allure Report',
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
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

sendTeamsCard();
