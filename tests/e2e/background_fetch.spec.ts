import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Background Fetching Data Integration E2E', () => {
  test('should not block UI during initial load and correctly parse background fetched gen 3 data', async ({
    page,
  }) => {
    await clearStorage(page);

    // Mock network latency for the data fetch to ensure we can verify non-blocking UI behavior
    await page.route('**/data/pokedata-gen3.msgpack', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.continue();
    });

    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // UI should not be blocked while waiting for data
    await expect(
      page
        .locator('header')
        .getByText(/EMERALD/i)
        .first(),
    ).toBeVisible({ timeout: 15000 });

    await waitForSync(page);

    // PokeDB lazily requests this via ensureExtension for specific generations
    const isDataAvailable = await page.evaluate(async () => {
      for (let i = 0; i < 40; i++) {
        const hasData = await new Promise((resolve) => {
          const DB_NAME = 'PokeDB';
          const request = indexedDB.open(DB_NAME);
          request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            try {
              const tx = db.transaction(['locations', 'encounters'], 'readonly');
              const store = tx.objectStore('locations');
              const countReq = store.count();

              countReq.onsuccess = () => resolve(countReq.result > 0);
              countReq.onerror = () => resolve(false);
            } catch {
              resolve(false);
            }
          };
          request.onerror = () => resolve(false);
        });
        if (hasData) return true;
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(isDataAvailable).toBe(true);
  });
});
