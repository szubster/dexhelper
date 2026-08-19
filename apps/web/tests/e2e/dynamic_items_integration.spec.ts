import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Dynamic Item List Parsing E2E', () => {
  test('items object store should be populated after initialization', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Evaluate in browser context
    const hasItems = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('PokeDB');
        req.onerror = () => reject(req.error);
        req.onsuccess = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains('items')) {
            resolve(false);
            return;
          }
          const tx = db.transaction('items', 'readonly');
          const store = tx.objectStore('items');
          const countReq = store.count();
          countReq.onsuccess = () => {
            resolve(countReq.result > 0);
          };
          countReq.onerror = () => reject(countReq.error);
        };
      });
    });

    expect(hasItems).toBeTruthy();
  });
});
