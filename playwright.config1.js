// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 3, // runs the 2 test spec files in parallel but within the test file it will execute in sequence
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 30 * 1000,
  expect: {
    timeout: 10000,
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        //screenshot: 'on',
        screenshot: 'only-on-failure',
        //trace: 'retain-on-failure', //off , on
        trace: 'on',
        //viewport: { width: 720, height: 720 }, //Browser opens in specific width and height
        // ...devices['Galaxy S9+'], //Run mobile responsive mode
        ignoreHTTPSErrors: true, //ssl cerification
        permissions: ['geolocation'], //allows location when ask for location
        video: 'retain-on-failure',
      },
    },

    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        //screenshot: 'on',
        screenshot: 'only-on-failure',
        //trace: 'retain-on-failure', //off , on
        trace: 'on',
        ...devices['iPhone 15'],
        video: 'retain-on-failure',
        //viewport: { width: 720, height: 720 }, //Browser opens in specific width and height
        // ...devices['Galaxy S9+'], //Run mobile responsive mode
        ignoreHTTPSErrors: true, //ssl cerification
        permissions: ['geolocation'], //allows location when ask for location
      },
    },
  ],

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against mobile viewports. */
  //   // {
  //   //   name: 'Mobile Chrome',
  //   //   use: { ...devices['Pixel 5'] },
  //   // },
  //   // {
  //   //   name: 'Mobile Safari',
  //   //   use: { ...devices['iPhone 12'] },
  //   // },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },
  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
