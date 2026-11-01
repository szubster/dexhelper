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

    // In yellow.sav, we don't know the exact Pokemon we'll be fetching to guarantee moves load via UI since
    // it's highly dependent on save file state.
    // Instead we can just evaluate the window store to see if moves are attached to any party/pc pokemon.
    const hasPokemonWithMoves = await page.evaluate(async () => {
      // Poll a few times until __store is available and saveData is populated
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData?.partyDetails) {
            // biome-ignore lint/suspicious/noExplicitAny: required for inspecting global state arrays dynamically
            return state.saveData.partyDetails.some((p: any) => p.moves && p.moves.length > 0);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(hasPokemonWithMoves).toBe(true);

    // Additionally, verify UI works by searching
    await page.goto('./');

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Pikachu');
    await page.waitForTimeout(1000);

    const targetCard = page.getByTestId('pokedex-card').first();
    await targetCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await expect(targetCard).toBeVisible({ timeout: 10000 });
    await targetCard.click({ force: true });

    // Wait for modal to open
    await expect(page.locator('[role="dialog"]').first()).toBeVisible({ timeout: 15000 });
    // Pikachu exact match isn't reliable due to text nodes having siblings or whitespace. Use a case-insensitive regex without exact
    await expect(page.getByText(/Pikachu/i).first()).toBeVisible({ timeout: 15000 });
  });
});
