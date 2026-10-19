import { expect, test } from '@playwright/test';
import { MAX_SAVE_STATES_PER_PLAYTHROUGH } from '../../src/engine/storage/constants';
import { clearStorage } from './test-utils';

test.describe('Save State Limits and Quota Handling (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');
    await page.waitForLoadState('networkidle');
  });

  test('should enforce max save states limit and evict oldest', async ({ page }) => {
    const result = await page.evaluate(async (maxLimit) => {
      const playthroughId = 'test-limits';

      // Write maxLimit + 5 saves
      const numSaves = maxLimit + 5;
      for (let i = 0; i < numSaves; i++) {
        await window.writeSaveState(`limit-save-${i}`, new Uint8Array([i]), {
          playthroughId,
          timestamp: 1000 + i, // ascending timestamps
        });
      }

      // We implement count and getOldest directly here to avoid touching src/main.tsx
      const countSaves = async (pid: string) => {
        return new Promise<number>((resolve, reject) => {
          const req = indexedDB.open('SaveHistoryDB');
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction('metadata', 'readonly');
            const store = tx.objectStore('metadata');
            const index = store.index('by-playthrough-timestamp');
            const range = IDBKeyRange.bound([pid, -Infinity], [pid, Infinity]);
            const countReq = index.count(range);
            countReq.onsuccess = () => resolve(countReq.result);
            countReq.onerror = () => reject(countReq.error);
          };
          req.onerror = () => reject(req.error);
        });
      };

      const getOldest = async (pid: string, limit: number) => {
        return new Promise<string[]>((resolve, reject) => {
          const req = indexedDB.open('SaveHistoryDB');
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction('metadata', 'readonly');
            const store = tx.objectStore('metadata');
            const index = store.index('by-playthrough-timestamp');
            const range = IDBKeyRange.bound([pid, -Infinity], [pid, Infinity]);
            const cursorReq = index.openCursor(range, 'next');
            const res: string[] = [];
            cursorReq.onsuccess = (e) => {
              const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
              if (cursor && res.length < limit) {
                res.push(cursor.primaryKey as string);
                cursor.continue();
              } else {
                resolve(res);
              }
            };
            cursorReq.onerror = () => reject(cursorReq.error);
          };
          req.onerror = () => reject(req.error);
        });
      };

      const count = await countSaves(playthroughId);
      const oldestSaves = await getOldest(playthroughId, 5);

      return { count, oldestSaves };
    }, MAX_SAVE_STATES_PER_PLAYTHROUGH);

    expect(result.count).toBe(MAX_SAVE_STATES_PER_PLAYTHROUGH);
    expect(result.oldestSaves).toEqual([
      'limit-save-5',
      'limit-save-6',
      'limit-save-7',
      'limit-save-8',
      'limit-save-9',
    ]);
  });

  test('should handle QuotaExceededError by evicting half the saves', async ({ page }) => {
    const result = await page.evaluate(async () => {
      const playthroughId = 'test-quota';

      // Write 10 saves normally
      for (let i = 0; i < 10; i++) {
        await window.writeSaveState(`quota-save-${i}`, new Uint8Array([i]), {
          playthroughId,
          timestamp: 1000 + i,
        });
      }

      // eslint-disable-next-line @typescript-eslint/unbound-method
      const originalPut = IDBObjectStore.prototype.put;
      let throwQuotaError = true;

      IDBObjectStore.prototype.put = function (value, key) {
        if (this.name === 'saves' && throwQuotaError) {
          throwQuotaError = false; // Only throw once
          const err = new DOMException('Quota exceeded', 'QuotaExceededError');
          throw err;
        }
        return originalPut.call(this, value, key);
      };

      try {
        await window.writeSaveState(`quota-save-new`, new Uint8Array([99]), {
          playthroughId,
          timestamp: 5000,
        });
      } finally {
        IDBObjectStore.prototype.put = originalPut;
      }

      const countSaves = async (pid: string) => {
        return new Promise<number>((resolve, reject) => {
          const req = indexedDB.open('SaveHistoryDB');
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction('metadata', 'readonly');
            const store = tx.objectStore('metadata');
            const index = store.index('by-playthrough-timestamp');
            const range = IDBKeyRange.bound([pid, -Infinity], [pid, Infinity]);
            const countReq = index.count(range);
            countReq.onsuccess = () => resolve(countReq.result);
            countReq.onerror = () => reject(countReq.error);
          };
          req.onerror = () => reject(req.error);
        });
      };

      const getOldest = async (pid: string, limit: number) => {
        return new Promise<string[]>((resolve, reject) => {
          const req = indexedDB.open('SaveHistoryDB');
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction('metadata', 'readonly');
            const store = tx.objectStore('metadata');
            const index = store.index('by-playthrough-timestamp');
            const range = IDBKeyRange.bound([pid, -Infinity], [pid, Infinity]);
            const cursorReq = index.openCursor(range, 'next');
            const res: string[] = [];
            cursorReq.onsuccess = (e) => {
              const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
              if (cursor && res.length < limit) {
                res.push(cursor.primaryKey as string);
                cursor.continue();
              } else {
                resolve(res);
              }
            };
            cursorReq.onerror = () => reject(cursorReq.error);
          };
          req.onerror = () => reject(req.error);
        });
      };

      const count = await countSaves(playthroughId);
      const oldestSaves = await getOldest(playthroughId, 10);

      return { count, oldestSaves };
    });

    expect(result.count).toBe(6);
    expect(result.oldestSaves).toEqual([
      'quota-save-5',
      'quota-save-6',
      'quota-save-7',
      'quota-save-8',
      'quota-save-9',
      'quota-save-new',
    ]);
  });
});
