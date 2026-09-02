const fs = require('fs');

function generateEmailHtml() {
  const buildNumber = process.env.BUILD_NUMBER || process.env.GITHUB_RUN_NUMBER || '1';
  const branchName = process.env.GITHUB_REF_NAME || 'main';
  const testEnv = (process.env.TEST_ENV || 'Staging').charAt(0).toUpperCase() + (process.env.TEST_ENV || 'Staging').slice(1);
  const reportUrl = process.env.REPORT_URL || 'https://mickooo17.github.io/councilbox-test-framework/';
  const githubRunUrl = process.env.GITHUB_RUN_URL || `https://github.com/${process.env.GITHUB_REPOSITORY || 'Mickooo17/councilbox-test-framework'}/actions/runs/${process.env.GITHUB_RUN_ID || ''}`;

  let total = 0, passed = 0, failed = 0, broken = 0, skipped = 0;
  try {
    total = parseInt(fs.readFileSync('total-tests.txt', 'utf8').trim(), 10) || 0;
    passed = parseInt(fs.readFileSync('passed-tests.txt', 'utf8').trim(), 10) || 0;
    failed = parseInt(fs.readFileSync('failed-tests-count.txt', 'utf8').trim(), 10) || 0;
    broken = parseInt(fs.readFileSync('broken-tests.txt', 'utf8').trim(), 10) || 0;
    skipped = parseInt(fs.readFileSync('skipped-tests.txt', 'utf8').trim(), 10) || 0;
  } catch {
    // fallback if files missing
  }

  const isSuccess = failed === 0;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : (isSuccess ? 100 : 0);

  // Calculate progress bar widths
  const passedPct = total > 0 ? Math.round((passed / total) * 100) : 0;
  const brokenPct = total > 0 ? Math.round((broken / total) * 100) : 0;
  const skippedPct = total > 0 ? Math.round((skipped / total) * 100) : 0;
  const failedPct = total > 0 ? Math.max(0, 100 - passedPct - brokenPct - skippedPct) : 0;

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });

  let durationStr = process.env.BUILD_DURATION || '';
  if (!durationStr && fs.existsSync('build-duration.txt')) {
    try {
      durationStr = fs.readFileSync('build-duration.txt', 'utf8').trim();
    } catch {}
  }
  if (!durationStr) {
    durationStr = 'N/A';
  }

  const statusBadgeText = isSuccess ? '✔ PASSED' : '✖ FAILED';
  const statusBadgeBg = isSuccess ? 'rgba(255,255,255,0.15)' : 'rgba(239,68,68,0.3)';
  const headerBg = isSuccess
    ? 'linear-gradient(135deg,#4f46e5,#4338ca); background-color:#4338ca;'
    : 'linear-gradient(135deg,#dc2626,#991b1b); background-color:#991b1b;';

  let bannerIcon = '✅';
  let bannerText = '';
  let bannerBg = '#f0fdf4';
  let bannerColor = '#14532d';

  if (isSuccess && broken === 0 && skipped === 0) {
    bannerText = 'All automated tests completed successfully. No failures detected.';
  } else if (isSuccess) {
    const note = [];
    if (broken > 0) note.push(`${broken} broken`);
    if (skipped > 0) note.push(`${skipped} skipped`);
    bannerText = `No failures detected. ${note.join(' and ')} test(s) may need a quick look before release.`;
  } else {
    bannerIcon = '❌';
    bannerText = `${failed} test(s) failed out of ${total}. Check Allure Report for full failure trace.`;
    bannerBg = '#fef2f2';
    bannerColor = '#991b1b';
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Councilbox QA Automation — Build #${buildNumber}</title>
</head>
<body style="margin:0; padding:0; background-color:#eef1f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Build #${buildNumber} — ${passed} passed, ${broken} broken, ${skipped} skipped, ${failed} failed. Pass rate ${passRate}%.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef1f5; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.08);">

          <!-- Header banner -->
          <tr>
            <td style="background:${headerBg} padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:48px; vertical-align:middle;">
                    <div style="width:40px; height:40px; background-color:rgba(255,255,255,0.18); border-radius:10px; text-align:center; line-height:40px; font-size:20px;">🚀</div>
                  </td>
                  <td style="vertical-align:middle; padding-left:12px;">
                    <div style="color:#ffffff; font-size:19px; font-weight:700; line-height:1.3;">Councilbox QA Automation</div>
                    <div style="color:#c7d2fe; font-size:13px; margin-top:2px;">Automated Test Execution Summary</div>
                  </td>
                  <td style="vertical-align:middle; text-align:right;">
                    <span style="display:inline-block; background-color:${statusBadgeBg}; color:#ffffff; font-size:12px; font-weight:700; padding:6px 12px; border-radius:20px; letter-spacing:0.3px;">${statusBadgeText}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Meta row -->
          <tr>
            <td style="padding:16px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:13px; color:#6b7280;">🔧 <span style="color:#111827; font-weight:600;">Build #${buildNumber}</span></td>
                  <td style="font-size:13px; color:#6b7280;">🌿 ${branchName}</td>
                  <td style="font-size:13px; color:#6b7280;">🧪 ${testEnv}</td>
                  <td style="font-size:13px; color:#6b7280;">⏱ ${durationStr}</td>
                  <td style="font-size:13px; color:#6b7280; text-align:right;" nowrap>${dateStr}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Stats grid -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Total -->
                  <td width="20%" align="center" style="padding:0 4px;">
                    <div style="height:4px; background-color:#c7d2fe; border-radius:2px; margin-bottom:8px;"></div>
                    <div style="font-size:11px; color:#6b7280; font-weight:600; letter-spacing:0.4px;">TOTAL</div>
                    <div style="font-size:26px; color:#111827; font-weight:800; line-height:1.4;">${total}</div>
                  </td>
                  <!-- Passed -->
                  <td width="20%" align="center" style="padding:0 4px;">
                    <div style="height:4px; background-color:#22c55e; border-radius:2px; margin-bottom:8px;"></div>
                    <div style="font-size:11px; color:#16a34a; font-weight:600; letter-spacing:0.4px;">PASSED</div>
                    <div style="font-size:26px; color:#16a34a; font-weight:800; line-height:1.4;">${passed}</div>
                  </td>
                  <!-- Failed -->
                  <td width="20%" align="center" style="padding:0 4px;">
                    <div style="height:4px; background-color:#ef4444; border-radius:2px; margin-bottom:8px;"></div>
                    <div style="font-size:11px; color:#dc2626; font-weight:600; letter-spacing:0.4px;">FAILED</div>
                    <div style="font-size:26px; color:#dc2626; font-weight:800; line-height:1.4;">${failed}</div>
                  </td>
                  <!-- Broken -->
                  <td width="20%" align="center" style="padding:0 4px;">
                    <div style="height:4px; background-color:#f59e0b; border-radius:2px; margin-bottom:8px;"></div>
                    <div style="font-size:11px; color:#d97706; font-weight:600; letter-spacing:0.4px;">BROKEN</div>
                    <div style="font-size:26px; color:#d97706; font-weight:800; line-height:1.4;">${broken}</div>
                  </td>
                  <!-- Skipped -->
                  <td width="20%" align="center" style="padding:0 4px;">
                    <div style="height:4px; background-color:#9ca3af; border-radius:2px; margin-bottom:8px;"></div>
                    <div style="font-size:11px; color:#6b7280; font-weight:600; letter-spacing:0.4px;">SKIPPED</div>
                    <div style="font-size:26px; color:#6b7280; font-weight:800; line-height:1.4;">${skipped}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Progress bar -->
          <tr>
            <td style="padding:22px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:12px; color:#6b7280; font-weight:600;">Test result breakdown</td>
                  <td style="font-size:12px; color:#16a34a; font-weight:700; text-align:right;">${passRate}% passed</td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
                <tr style="height:8px;">
                  ${passedPct > 0 ? `<td width="${passedPct}%" bgcolor="#22c55e" style="height:8px; font-size:0; line-height:0; border-radius:4px 0 0 4px;">&nbsp;</td>` : ''}
                  ${brokenPct > 0 ? `<td width="${brokenPct}%" bgcolor="#f59e0b" style="height:8px; font-size:0; line-height:0;">&nbsp;</td>` : ''}
                  ${skippedPct > 0 ? `<td width="${skippedPct}%" bgcolor="#9ca3af" style="height:8px; font-size:0; line-height:0;">&nbsp;</td>` : ''}
                  ${failedPct > 0 ? `<td width="${failedPct}%" bgcolor="#ef4444" style="height:8px; font-size:0; line-height:0; border-radius:0 4px 4px 0;">&nbsp;</td>` : ''}
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
                <tr>
                  <td style="font-size:11px; color:#6b7280; padding-right:14px;"><span style="color:#22c55e;">●</span>&nbsp;Passed</td>
                  <td style="font-size:11px; color:#6b7280; padding-right:14px;"><span style="color:#f59e0b;">●</span>&nbsp;Broken</td>
                  <td style="font-size:11px; color:#6b7280; padding-right:14px;"><span style="color:#9ca3af;">●</span>&nbsp;Skipped</td>
                  <td style="font-size:11px; color:#6b7280;"><span style="color:#ef4444;">●</span>&nbsp;Failed</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary message -->
          <tr>
            <td style="padding:22px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${bannerBg}; border-radius:8px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:18px; vertical-align:middle; padding-right:10px;">${bannerIcon}</td>
                        <td style="font-size:13px; color:${bannerColor}; font-weight:600; vertical-align:middle; line-height:1.4;">
                          ${bannerText}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA buttons -->
          <tr>
            <td style="padding:24px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-right:8px;" width="50%">
                    <a href="${reportUrl}" style="display:block; background-color:#4338ca; color:#ffffff; font-size:13px; font-weight:700; text-decoration:none; padding:12px 0; border-radius:8px; text-align:center;">📊 View Allure Report</a>
                  </td>
                  <td align="center" style="padding-left:8px;" width="50%">
                    <a href="${githubRunUrl}" style="display:block; background-color:#ffffff; color:#374151; font-size:13px; font-weight:700; text-decoration:none; padding:12px 0; border-radius:8px; text-align:center; border:1px solid #e5e7eb;">🐙 GitHub Actions</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 28px 32px;">
              <div style="border-top:1px solid #eef1f5; margin-bottom:16px;"></div>
              <div style="font-size:11px; color:#9ca3af; text-align:center; line-height:1.6;">
                Sent automatically by Councilbox CI/CD pipeline &bull; councilbox-web / ${branchName}<br>
                Received this by mistake? Contact your QA team lead.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  fs.writeFileSync('email-body.html', html);
  console.log('[generate-email-html] Generated email-body.html successfully!');
}

generateEmailHtml();
