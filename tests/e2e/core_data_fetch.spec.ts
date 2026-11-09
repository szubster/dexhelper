import { expect, test } from '@playwright/test';
import { clearStorageWipeAll } from './test-utils';

test.describe('pokedata-core.msgpack Fetch E2E', () => {
  test('should fetch pokedata-core.msgpack during initialization', async ({ page }) => {
    await clearStorageWipeAll(page);

    // Intercept network requests
    let isFetched = false;
    page.on('request', (request) => {
      if (request.url().includes('pokedata-core.msgpack')) {
        isFetched = true;
      }
    });

    await page.goto('.');

    // Wait for the app to initialize
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

    // Expect the file to be fetched
    expect(isFetched).toBe(true);
  });
});
