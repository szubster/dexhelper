import { expect, test } from '@playwright/test';
import { clearStorage } from './test-utils';

test.describe('pokedata-core.msgpack Fetch E2E', () => {
  test('should fetch pokedata-core.msgpack during initialization', async ({ page }) => {
    await clearStorage(page);

    // Must go to the domain first before deleting indexedDB to avoid about:blank security error
    await page.goto('.');
    await page.evaluate(async () => {
      await new Promise<void>((resolve, reject) => {
        const req = window.indexedDB.deleteDatabase('PokeDB');
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
        req.onblocked = () => resolve(); // Ignore blocked
      });
    });

    // We use a flag mapped onto the window to detect if the native fetch intercepted the URL
    await page.addInitScript(() => {
      const originalFetch = window.fetch;
      window.fetch = async function (input, init) {
        let url = '';
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof URL) {
          url = input.href;
        } else if (input instanceof Request) {
          url = input.url;
        }
        if (url.includes('pokedata-core.msgpack')) {
          (window as any).__pokedataFetched = true;
        }
        return originalFetch.apply(this, [input, init]);
      };
    });

    // Reload the page to ensure the init script and cleared PokeDB take effect
    await page.goto('.');

    // Wait for the app to initialize
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
    // Add small timeout just in case it is lazy-loaded
    await page.waitForTimeout(1000);

    // Check if the mock caught the fetch
    const isFetched = await page.evaluate(() => {
      return !!(window as any).__pokedataFetched;
    });

    // Expect the file to be fetched
    expect(isFetched).toBe(true);
  });
});
