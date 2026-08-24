import fs from 'node:fs';
import { expect, type Page } from '@playwright/test';

export async function initializeWithSave(
  page: Page,
  savePathOrData: string | Uint8Array = 'tests/fixtures/yellow.sav',
) {
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

export async function mockDagData(page: Page, mockDataPath: string = 'tests/fixtures/dag/mock_dag.json') {
  const mockData = fs.readFileSync(mockDataPath, 'utf8');
  await page.route('**/data/foundry.json*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: mockData,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  });
}
