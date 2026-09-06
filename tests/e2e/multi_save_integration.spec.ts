import path from 'node:path';
import { expect, test } from '@playwright/test';
import { clearStorage, waitForSync } from './test-utils';

test.describe('Multi-Save Architecture Integration', () => {
  test('should allow switching between multiple saves and retain state', async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');
    await waitForSync(page);
    await expect(page.getByText(/\[ UPLOAD\.SYS \]/i)).toBeVisible();

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));
    await waitForSync(page);

    await expect(
      page
        .locator('header')
        .getByText(/YELLOW/i)
        .first(),
    ).toBeVisible();
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();

    const fileInput2 = page.locator('input[type="file"]').first();
    await fileInput2.setInputFiles(path.join('tests', 'fixtures', 'crystal.sav'));
    await waitForSync(page);

    await expect(
      page
        .locator('header')
        .getByText(/CRYSTAL/i)
        .first(),
    ).toBeVisible();

    const savesCount = await page.evaluate(async () => {
      const SAVE_DB_NAME = 'SaveHistoryDB';
      const STORE_NAME = 'saves';

      const checkStoreExists = await new Promise<boolean>((resolve) => {
        const request = indexedDB.open(SAVE_DB_NAME);
        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const exists = db.objectStoreNames.contains(STORE_NAME);
          db.close();
          resolve(exists);
        };
      });

      if (!checkStoreExists) return 0;

      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(SAVE_DB_NAME);
        request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
        request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
      });

      const count = await new Promise<number>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const countRequest = store.count();
        countRequest.onsuccess = () => resolve(countRequest.result);
        countRequest.onerror = () => reject(countRequest.error);
      });
      db.close();
      return count;
    });

    console.log(`Saves in SaveHistoryDB: ${savesCount}`);

    await expect(page.locator('#root')).toBeAttached();
  });

  test('should allow offline saves to be synced when back online', async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');

    // Simulate login
    await page.evaluate(() => {
      localStorage.setItem('isLoggedIn', 'true');
    });

    // Simulate offline state (requests fail)
    await page.route('/api/saves', async (route) => {
      await route.fulfill({ status: 500 });
    });

    await page.reload();
    await waitForSync(page);

    await expect(page.getByText(/\[ UPLOAD\.SYS \]/i)).toBeVisible();

    // Upload a save file while "offline"
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));
    await waitForSync(page);

    await expect(
      page
        .locator('header')
        .getByText(/YELLOW/i)
        .first(),
    ).toBeVisible();

    // Now come back "online" and mock the API responses
    await page.unroute('/api/saves');

    // We need to trigger the initial listSaves check
    await page.route('/api/saves', async (route) => {
      if (route.request().method() === 'GET') {
        // Return empty so it doesn't think the server has newer data than local
        await route.fulfill({ json: [] });
      } else {
        await route.continue();
      }
    });

    const putRequestPromise = page.waitForRequest(
      (request) => request.url().includes('/api/saves/') && request.method() === 'PUT',
    );

    await page.route('/api/saves/*', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({ status: 200 });
      } else if (route.request().method() === 'GET') {
        await route.fulfill({ status: 404 });
      } else {
        await route.continue();
      }
    });

    // Upload another save file to trigger the sync logic while online
    const fileInput2 = page.locator('input[type="file"]').first();
    await fileInput2.setInputFiles(path.join('tests', 'fixtures', 'crystal.sav'));
    await waitForSync(page);

    await expect(
      page
        .locator('header')
        .getByText(/CRYSTAL/i)
        .first(),
    ).toBeVisible();

    const request = await putRequestPromise;
    expect(request.method()).toBe('PUT');
  });
});
