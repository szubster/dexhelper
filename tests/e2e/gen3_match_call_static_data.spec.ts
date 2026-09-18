import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Match Call Static Data Extraction Validation E2E', () => {
  test('Match Calls IndexedDB store should be populated correctly from pokedata-core.msgpack', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for PokeDB to finish populating by waiting for the sync event
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        const checkHash = () => {
          const req = indexedDB.open('PokeDB');
          req.onsuccess = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('metadata')) {
              db.close();
              setTimeout(checkHash, 500);
              return;
            }
            const tx = db.transaction('metadata', 'readonly');
            const store = tx.objectStore('metadata');
            const reqHash = store.get('hash');
            reqHash.onsuccess = () => {
              db.close();
              if (reqHash.result?.value && reqHash.result.value !== 'initial') {
                resolve();
              } else {
                setTimeout(checkHash, 500);
              }
            };
            reqHash.onerror = () => {
              db.close();
              setTimeout(checkHash, 500);
            };
          };
          req.onerror = () => {
            setTimeout(checkHash, 500);
          };
        };
        checkHash();
      });
    });

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
