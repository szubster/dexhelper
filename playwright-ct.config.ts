import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/experimental-ct-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	testDir: "./src",
	testMatch: "**/*.spec.tsx",
	timeout: 10 * 1000,
	expect: {
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
				buildName: process.env.ARGOS_BUILD_NAME || "Component",
			},
		],
	],
	use: {
		trace: "retain-on-failure",
		video: "retain-on-failure",
		screenshot: "only-on-failure",
		ctPort: 3100,
		ctViteConfig: {
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "./src"),
				},
			},
		},
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
});
