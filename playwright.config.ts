import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    [
      "@argos-ci/playwright/reporter",
      {
        uploadToArgos: !!process.env.CI,
        buildName: process.env.ARGOS_BUILD_NAME || "E2E",
      },
    ],
  ],
  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:3000/dexhelper",
    // Automatically capture a DOM snapshot, Network requests, and Console logs for failing tests
    trace: "retain-on-failure",
    // Automatically capture a video of the test, but only keep it if the test fails
    video: "retain-on-failure",
    // Automatically take a screenshot precisely at the moment a test fails (different from visual regression test)
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Desktop FullHD",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "Desktop 1440p",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 2560, height: 1440 },
      },
    },
    {
      name: "Mobile Pixel 9",
      use: {
        ...devices["Pixel 7"], // Fallback base
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        defaultBrowserType: "chromium",
        userAgent:
          "Mozilla/5.0 (Linux; Android 14; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
