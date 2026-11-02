import fs from 'node:fs';
import { chromium } from 'playwright';

/**
 * Checks if the Playwright Chromium binary is installed locally.
 * Returns true if it is available, false otherwise.
 * We only check chromium to avoid failing if only chromium is used.
 */
export function arePlaywrightBrowsersInstalled(): boolean {
    try {
        const executablePath = chromium.executablePath();
        return fs.existsSync(executablePath);
    } catch {
        return false;
    }
}

// Support running directly as a CLI script
if (
    import.meta.url.endsWith(process.argv[1] || '') ||
    // also check if the script name is in argv (e.g., when run with npx tsx)
    process.argv[1]?.endsWith('check-playwright-browsers.ts')
) {
    const installed = arePlaywrightBrowsersInstalled();
    if (installed) {
        console.log('Playwright Chromium is installed.');
        process.exit(0);
    } else {
        console.error('Playwright Chromium is missing. Please run `npx playwright install`.');
        process.exit(1);
    }
}
