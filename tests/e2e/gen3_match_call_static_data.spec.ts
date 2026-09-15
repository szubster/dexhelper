import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Match Call Static Data Extraction Validation E2E', () => {
  test('Match Calls IndexedDB store should be populated correctly from pokedata-core.msgpack', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Evaluate in browser context to check the match_calls store
    const storesStatus = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('PokeDB');
        req.onerror = () => reject(req.error);
        req.onsuccess = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          const storeName = 'match_calls';

          if (!db.objectStoreNames.contains(storeName)) {
            resolve({ [storeName]: false });
            return;
          }

          const tx = db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const countReq = store.count();
          countReq.onsuccess = () => {
            resolve({ [storeName]: countReq.result > 0 });
          };
          countReq.onerror = () => {
            resolve({ [storeName]: false });
          };
        };
      });
    });

    expect(storesStatus).toEqual({
      match_calls: true,
    });
  });
});
