import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Core Data Extraction Validation E2E', () => {
  test('core IndexedDB stores (pokemon, moves, items) should be populated correctly from pokedata-core.msgpack', async ({
    page,
  }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Evaluate in browser context to check the stores
    const storesStatus = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('PokeDB');
        req.onerror = () => reject(req.error);
        req.onsuccess = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;
          const storesToCheck = ['pokemon', 'moves', 'items'];
          const status: Record<string, boolean> = {};

          let completed = 0;
          const checkDone = () => {
            completed++;
            if (completed === storesToCheck.length) {
              resolve(status);
            }
          };

          for (const storeName of storesToCheck) {
            if (!db.objectStoreNames.contains(storeName)) {
              status[storeName] = false;
              checkDone();
              continue;
            }
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const countReq = store.count();
            countReq.onsuccess = () => {
              status[storeName] = countReq.result > 0;
              checkDone();
            };
            countReq.onerror = () => {
              status[storeName] = false;
              checkDone();
            };
          }
        };
      });
    });

    expect(storesStatus).toEqual({
      pokemon: true,
      moves: true,
      items: true,
    });
  });
});
