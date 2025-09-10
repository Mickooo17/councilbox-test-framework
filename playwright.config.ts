import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Opera',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
  reporter: [
    ['line'],
    ['junit', { outputFile: 'junit-results/results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure'
  },
});
