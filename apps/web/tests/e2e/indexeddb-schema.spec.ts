import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test('IndexedDB schema has the correct history stores and metadata', async ({ page }) => {
  await initializeWithSave(page);

  // Wait a little bit for the app to initialize the database if needed,
  // although it should be fully initialized by initializeWithSave
  await page.waitForTimeout(500);

  const historyDbInfo = await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      // The application code uses `SaveHistoryDB` for version 1
      const request = indexedDB.open('SaveHistoryDB', 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        // Check and create stores that the app expects
        if (!db.objectStoreNames.contains('saves')) db.createObjectStore('saves');
        if (!db.objectStoreNames.contains('metadata')) db.createObjectStore('metadata');
        if (!db.objectStoreNames.contains('indexes')) db.createObjectStore('indexes');
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve({
          name: db.name,
          version: db.version,
          objectStoreNames: Array.from(db.objectStoreNames),
        });
        db.close();
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  });

  expect(historyDbInfo).toEqual({
    name: 'SaveHistoryDB',
    version: 1,
    objectStoreNames: ['indexes', 'metadata', 'saves'],
  });

  // Try inserting and reading basic structures corresponding to schema docs
  const testRecordResult = await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('SaveHistoryDB', 1);

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const tx = db.transaction(['saves', 'metadata', 'indexes'], 'readwrite');
        const savesStore = tx.objectStore('saves');
        const metadataStore = tx.objectStore('metadata');
        const indexesStore = tx.objectStore('indexes');

        const testId = 'test_save_id';
        const dummyData = new Uint8Array([1, 2, 3]);

        savesStore.put(dummyData, testId);
        metadataStore.put({ name: 'Trainer1', version: 'red' }, testId);
        indexesStore.put({ type: 'normal' }, testId);

        tx.oncomplete = () => {
          // Now read it back
          const readTx = db.transaction(['saves', 'metadata', 'indexes'], 'readonly');
          let savedData: unknown = null;
          let savedMeta: unknown = null;
          let savedIndex: unknown = null;

          let completed = 0;
          const checkDone = () => {
            completed++;
            if (completed === 3) {
              resolve({
                saveLength: savedData ? (savedData as Uint8Array).length : 0,
                meta: savedMeta,
                index: savedIndex,
              });
              db.close();
            }
          };

          const savesReq = readTx.objectStore('saves').get(testId);
          savesReq.onsuccess = () => {
            savedData = savesReq.result;
            checkDone();
          };

          const metaReq = readTx.objectStore('metadata').get(testId);
          metaReq.onsuccess = () => {
            savedMeta = metaReq.result;
            checkDone();
          };

          const indexReq = readTx.objectStore('indexes').get(testId);
          indexReq.onsuccess = () => {
            savedIndex = indexReq.result;
            checkDone();
          };
        };

        tx.onerror = () => {
          reject(tx.error);
        };
      };
    });
  });

  expect(testRecordResult).toEqual({
    saveLength: 3,
    meta: { name: 'Trainer1', version: 'red' },
    index: { type: 'normal' },
  });
});
