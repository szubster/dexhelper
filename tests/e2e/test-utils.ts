import fs from 'node:fs';
import { expect, type Page } from '@playwright/test';

export async function initializeWithSave(
  page: Page,
  savePathOrData: string | Uint8Array = 'tests/fixtures/yellow.sav',
) {
  await page.goto('.');

  await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
  await waitForSync(page);

  const isInitialized = await page
    .getByText(/TRAINER/i)
    .first()
    .isVisible({ timeout: 2000 });

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
        // 1. IndexedDB injection
        const SAVE_DB_NAME = 'SaveDB';
        const STORE_NAME = 'saves';

        const db = await new Promise<IDBDatabase>((resolve, reject) => {
          const request = indexedDB.open(SAVE_DB_NAME, 1);
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

  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId('pokedex-card').first()).toBeVisible({ timeout: 30000 });
}

export async function waitForSync(page: Page) {
  const overlay = page.getByTestId('sync-progress-overlay');
  try {
    const isVisible = await overlay.isVisible({ timeout: 3000 });
    if (isVisible) {
      await expect(overlay).toBeHidden({ timeout: 60000 });
    }
  } catch {}
  await page.waitForTimeout(1000);
}

export async function clearStorage(page: Page) {
  await page.goto('.');
  await page.evaluate(async () => {
    localStorage.clear();
    const databases = (await window.indexedDB.databases?.()) || [];
    for (const db of databases) {
      if (db.name) window.indexedDB.deleteDatabase(db.name);
    }
  });
  await page.reload();
}
