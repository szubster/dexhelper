import fs from 'node:fs';
import { test as base, expect } from '@playwright/test';
import { waitForSync } from '../test-utils';

export type Fixtures = {
  loadSave: (savePathOrData?: string | Uint8Array) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loadSave: async ({ page }, use) => {
    const loadSave = async (savePathOrData: string | Uint8Array = 'tests/fixtures/yellow.sav') => {
      await page.goto('.');

      await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
      await waitForSync(page);
      // Add a slight delay to allow the complex DOM (targeting array) to render correctly in CI
      await page.waitForTimeout(500);

      const isInitialized = await page.getByText(/TRNR/i).first().isVisible({ timeout: 2000 });

      if (!isInitialized) {
        let fileBuffer: Buffer;
        if (typeof savePathOrData === 'string') {
          fileBuffer = fs.readFileSync(savePathOrData);
        } else {
          fileBuffer = Buffer.from(savePathOrData);
        }
        const saveArray = Array.from(fileBuffer);

        await page.evaluate(
          async ({ saveArray }) => {
            // IndexedDB injection
            const SAVE_DB_NAME = 'SaveDB';
            const STORE_NAME = 'saves';

            const db = await new Promise<IDBDatabase>((resolve, reject) => {
              const request = indexedDB.open(SAVE_DB_NAME, 2);
              request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                  db.createObjectStore(STORE_NAME);
                }
              };
              request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
              request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
            });

            await new Promise<void>((resolve, reject) => {
              const tx = db.transaction(STORE_NAME, 'readwrite');
              const store = tx.objectStore(STORE_NAME);
              const request = store.put(new Uint8Array(saveArray), 'last_save_file');
              request.onsuccess = () => resolve();
              request.onerror = () => reject(request.error);
            });
            db.close();
          },
          { saveArray },
        );

        await page.reload();
        await waitForSync(page);
      }

      // Use Locator.or properly with a final .first() to prevent strict mode violations,
      // as one of these two elements guarantees successful load.
      await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({
        timeout: 20000,
      });
    };

    await use(loadSave);
  },
});

export { expect };
