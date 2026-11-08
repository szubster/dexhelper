import { expect, test } from '@playwright/test';
import { clearStorage } from './test-utils';

test.describe('pokedata-core.msgpack Fetch E2E', () => {
  test('should fetch pokedata-core.msgpack during initialization', async ({ page }) => {
    await clearStorage(page);
    // Clear PokeDB locally as well so it is forced to fetch in this test
    await page.evaluate(async () => {
      window.indexedDB.deleteDatabase('PokeDB');
    });

    // Intercept network requests
    let isFetched = false;
    page.on('request', (request) => {
      if (request.url().includes('pokedata-core.msgpack')) {
        isFetched = true;
      }
    });

    await page.goto('.');
    await page.waitForTimeout(2000);

    // Wait for the app to initialize
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

    // Expect the file to be fetched
    expect(isFetched).toBe(true);
  });
});
