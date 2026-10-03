import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen-Specific Extensions Load E2E Tests', () => {
  test('should successfully load generation 1 extensions upon save upload', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    await expect(page.locator('header').getByText(/BLUE/i).first()).toBeVisible({ timeout: 15000 });

    const isExtensionLoaded = await page.evaluate(async () => {
      for (let i = 0; i < 40; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: PokeDB state test hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData?.generation === 1) {
            const hasData = await new Promise((resolve) => {
              const DB_NAME = 'PokeDB';
              const request = indexedDB.open(DB_NAME);
              request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                try {
                  const tx = db.transaction(['locations', 'encounters'], 'readonly');
                  const store = tx.objectStore('locations');
                  const countReq = store.count();

                  countReq.onsuccess = () => resolve(countReq.result > 0);
                  countReq.onerror = () => resolve(false);
                } catch {
                  resolve(false);
                }
              };
              request.onerror = () => resolve(false);
            });
            if (hasData) return true;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(isExtensionLoaded).toBe(true);
  });

  test('should successfully load generation 2 extensions upon save upload', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await waitForSync(page);

    await expect(
      page
        .locator('header')
        .getByText(/CRYSTAL/i)
        .first(),
    ).toBeVisible({ timeout: 15000 });

    const isExtensionLoaded = await page.evaluate(async () => {
      for (let i = 0; i < 40; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: PokeDB state test hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData?.generation === 2) {
            const hasData = await new Promise((resolve) => {
              const DB_NAME = 'PokeDB';
              const request = indexedDB.open(DB_NAME);
              request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                try {
                  const tx = db.transaction(['locations', 'encounters'], 'readonly');
                  const store = tx.objectStore('locations');
                  const countReq = store.count();

                  countReq.onsuccess = () => resolve(countReq.result > 0);
                  countReq.onerror = () => resolve(false);
                } catch {
                  resolve(false);
                }
              };
              request.onerror = () => resolve(false);
            });
            if (hasData) return true;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(isExtensionLoaded).toBe(true);
  });

  test('should successfully load generation 3 extensions upon save upload', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    const isInitialized = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData) {
            return state.saveData !== null;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(isInitialized).toBe(true);

    const isExtensionLoaded = await page.evaluate(async () => {
      for (let i = 0; i < 40; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: PokeDB state test hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData?.generation === 3) {
            const hasData = await new Promise((resolve) => {
              const DB_NAME = 'PokeDB';
              const request = indexedDB.open(DB_NAME);
              request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                try {
                  const tx = db.transaction(['locations', 'encounters'], 'readonly');
                  const store = tx.objectStore('locations');
                  const countReq = store.count();

                  countReq.onsuccess = () => resolve(countReq.result > 0);
                  countReq.onerror = () => resolve(false);
                } catch {
                  resolve(false);
                }
              };
              request.onerror = () => resolve(false);
            });
            if (hasData) return true;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(isExtensionLoaded).toBe(true);
  });
});
