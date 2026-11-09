import { expect, test } from '@playwright/test';
import { clearStorage } from './test-utils';

test.describe('pokedata-core.msgpack Fetch E2E', () => {
  test('should fetch pokedata-core.msgpack during initialization', async ({ page }) => {
    // Intercept network requests before navigating
    await clearStorage(page);

    let isFetched = false;
    await page.route('**/pokedata-core.msgpack', async (route) => {
      isFetched = true;
      await route.continue();
    });

    // We must manually delete the PokeDB so that it's forced to re-fetch on reload, since we fixed clearStorage to preserve it
    await page.evaluate(() => {
      window.indexedDB.deleteDatabase('PokeDB');
    });

    await page.goto('.');

    // Wait for the app to initialize
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

    // Expect the file to be fetched
    expect(isFetched).toBe(true);
  });
});
