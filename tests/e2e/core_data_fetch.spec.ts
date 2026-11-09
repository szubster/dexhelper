import { expect, test } from '@playwright/test';

test.describe('pokedata-core.msgpack Fetch E2E', () => {
  test('should fetch pokedata-core.msgpack during initialization', async ({ page }) => {
    await page.goto('.');
    await page.evaluate(async () => {
      localStorage.clear();
      const databases = (await window.indexedDB.databases?.()) || [];
      for (const db of databases) {
        if (db.name) window.indexedDB.deleteDatabase(db.name);
      }
    });
    await page.reload();

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
