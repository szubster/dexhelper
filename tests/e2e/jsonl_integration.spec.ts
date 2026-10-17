import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('JSONL Integration E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('Move and item data is correctly loaded into indexedDB and state', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for the indexedDB to have moves and items stores and verify they have data
    const dbHasData = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('PokeDB');
        req.onerror = () => reject(req.error);
        req.onsuccess = (e) => {
          const db = (e.target as IDBOpenDBRequest).result;

          if (!db.objectStoreNames.contains('items') || !db.objectStoreNames.contains('moves')) {
            resolve(false);
            return;
          }

          let itemsCount = 0;
          let movesCount = 0;

          const itemsTx = db.transaction('items', 'readonly');
          const itemsStore = itemsTx.objectStore('items');
          const itemsReq = itemsStore.count();
          itemsReq.onsuccess = () => {
            itemsCount = itemsReq.result;

            const movesTx = db.transaction('moves', 'readonly');
            const movesStore = movesTx.objectStore('moves');
            const movesReq = movesStore.count();
            movesReq.onsuccess = () => {
              movesCount = movesReq.result;
              resolve(itemsCount > 0 && movesCount > 0);
            };
          };
        };
      });
    });

    expect(dbHasData).toBeTruthy();
  });

  test('Inventory views show item data', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // To navigate to dashboard, we locate the dashboard link
    await page.goto('./dashboard');

    // Wait for WILD ITEM TRACKER TARGETS text
    await expect(page.getByText(/WILD ITEM TRACKER TARGETS/i).first()).toBeVisible({ timeout: 10000 });
    // Or SEARCH ITEMS... placeholder
    await expect(page.getByPlaceholder('SEARCH ITEMS...').first()).toBeVisible({ timeout: 10000 });

    // Type into the search input
    const searchInput = page.getByPlaceholder('SEARCH ITEMS...');
    await searchInput.fill('MASTER BALL');

    // Check if the item appears as a button
    await expect(page.getByRole('button', { name: 'MASTER BALL' })).toBeVisible({ timeout: 10000 });
  });

  test('Pokemon details view shows move data', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Go to Box Analyzer where moves are listed per pokemon
    await page.goto('./box-analyzer');

    const analyzerCard = page.locator('.tactical-card').first();
    await expect(analyzerCard).toBeVisible({ timeout: 15000 });

    // The BoxAnalyzerView lists Pokemon with their moves.
    // Usually tackle, growl, or thundershock appear.
    // For yellow.sav, the first Pokemon is usually Pikachu (THUNDERSHOCK, GROWL) or Bulbasaur.
    await expect(page.getByText(/THUNDERSHOCK|GROWL|TACKLE|LEECH SEED/i).first()).toBeVisible({ timeout: 15000 });
  });
});
