import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Safari Zone E2E Tests', () => {
  test('safari encounters extraction should handle gen3 emerald saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    // Natively Psyduck (54) is in Emerald Safari Zone. We verify the underlying data layer directly via IndexedDB.
    const isPokeDBpopulated = await page.evaluate(async () => {
      const pokedbReq = indexedDB.open('PokeDB');
      const pokedb = await new Promise<IDBDatabase>((resolve, reject) => {
        pokedbReq.onsuccess = () => resolve(pokedbReq.result);
        pokedbReq.onerror = () => reject(pokedbReq.error);
      });
      const tx = pokedb.transaction('pokemon', 'readonly');
      const store = tx.objectStore('pokemon');
      const pokemon = await new Promise<unknown>((resolve, reject) => {
        const getReq = store.get(54); // Psyduck
        getReq.onsuccess = () => resolve(getReq.result);
        getReq.onerror = () => reject(getReq.error);
      });
      return !!pokemon;
    });

    expect(isPokeDBpopulated).toBe(true);

    // Verify UI actually renders correctly
    await page.goto('./');
    await waitForSync(page);

    const cards = page.getByTestId('pokedex-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const firstCard = cards.first();
    await firstCard.evaluate((el) => {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      (el as HTMLElement).click();
    });

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  });

  test('safari encounters extraction should handle gen3 firered saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/firered.sav');
    await waitForSync(page);

    // KantoSafariZoneGen3 area 1 east: Nidoran M (32) is an uncaught/missing encounter.
    const isPokeDBpopulated = await page.evaluate(async () => {
      const pokedbReq = indexedDB.open('PokeDB');
      const pokedb = await new Promise<IDBDatabase>((resolve, reject) => {
        pokedbReq.onsuccess = () => resolve(pokedbReq.result);
        pokedbReq.onerror = () => reject(pokedbReq.error);
      });
      const tx = pokedb.transaction('pokemon', 'readonly');
      const store = tx.objectStore('pokemon');
      const pokemon = await new Promise<unknown>((resolve, reject) => {
        const getReq = store.get(32); // Nidoran M
        getReq.onsuccess = () => resolve(getReq.result);
        getReq.onerror = () => reject(getReq.error);
      });
      return !!pokemon;
    });

    expect(isPokeDBpopulated).toBe(true);

    // Go to Pokedex View and click first card
    await page.goto('./');
    await waitForSync(page);

    const cards = page.getByTestId('pokedex-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const firstCard = cards.first();
    await firstCard.evaluate((el) => {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
      (el as HTMLElement).click();
    });

    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  });
});
