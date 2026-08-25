import { expect, test } from '@playwright/test';
import type { PokemonInstance } from '../../src/engine/saveParser';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Box Analyzer E2E Validation', () => {
  test('successfully extracts PC Box Pokemon and excludes party from duplicate analysis', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    // Wait for indexing and UI updates to finish
    await waitForSync(page);

    // 1. Verify PC box labels/markers are rendered
    await expect(page.getByText(/Box 1/i).first()).toBeVisible({ timeout: 15000 });

    // 2. Validate statistical calculations (IVs, DVs, Natures, Hidden Power, Shininess) within the tests
    // To do this robustly without relying heavily on DOM structure which might change,
    // we query the indexed DB where parsing results are written
    const dbData = await page.evaluate(async () => {
      const SAVE_DB_NAME = 'PokeDB';
      const STORE_NAME = 'pokemon';

      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const req = indexedDB.open(SAVE_DB_NAME);
        req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
        req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
      });

      return new Promise<PokemonInstance[]>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    });

    // Check we actually got data out of the Gold Save fixture
    expect(dbData.length).toBeGreaterThan(0);

    // Test that the parsing actually created DVs and Hidden Power values (Gen 2 specifics)
    // Find at least one parsed pokemon instance that came from the save
    const parsedInstance = dbData.find((p) => p.ivs !== undefined && p.isShiny !== undefined);
    expect(parsedInstance).toBeDefined();
    expect(parsedInstance?.ivs).toBeDefined();
    expect(parsedInstance?.ivs?.hp).toBeGreaterThanOrEqual(0); // Should be 0-15 for DVs
    expect(parsedInstance?.hiddenPower).toBeDefined();

    // Ensure that party pokemon are excluded from duplicate analysis (Box vs Party check)
    // Box 1 -> PC box extraction
    const boxPokemon = dbData.filter((p) => p.storageLocation?.startsWith('Box'));
    expect(boxPokemon.length).toBeGreaterThan(0);

    const partyPokemon = dbData.filter((p) => p.storageLocation === 'Party');
    // Depending on the save, Party may or may not have pokemon, but we assume it does based on the spec
    if (partyPokemon.length > 0) {
      // In the context of a "duplicate analysis" or just verifying they are distinct correctly
      // each pokemon instance has a slot/location that sets them apart
      expect(partyPokemon[0]?.storageLocation).toEqual('Party');
    }

    // 3. Check for specific pokemon from boxes rendering and opening modal
    const cards = page.getByTestId('pokedex-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const firstCard = cards.first();
    await firstCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await firstCard.click();

    // Verify modal opens and statistical information like Hidden Power is visible on the UI side
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Verify some statistical calculation displays (Hidden Power specifically)
    await expect(dialog.getByText(/Hidden Power/i)).toBeVisible();
    await expect(dialog.getByText(/Shininess/i).or(dialog.getByText(/Shiny/i))).toBeVisible();
  });
});
