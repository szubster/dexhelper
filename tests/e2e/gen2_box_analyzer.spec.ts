import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Box Analyzer Data Parsing E2E', () => {
  test('should extract PC Boxes and Group Pokemon from Gen 2 save file and verify statistics', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal-evolve.sav');

    // Make sure we wait sufficiently for parsing logic
    await page.waitForTimeout(2000);
    await waitForSync(page);

    // Explicitly wait for the store to be populated via locator to ensure reactivity is done
    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible({ timeout: 15000 });

    const saveData = await page.evaluate(async () => {
      // Poll a few times until __store is available and saveData is populated
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData) {
            return state.saveData;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return null;
    });

    expect(saveData).not.toBeNull();

    // Box Analysis logic tests
    const pcDetails = saveData.pcDetails || [];
    const partyDetails = saveData.partyDetails || [];

    // We expect some pokemon in the PC
    expect(pcDetails.length).toBeGreaterThan(0);

    // Ensure they have valid locations and stats
    for (const p of pcDetails) {
      if (p.storageLocation?.startsWith('Box')) {
        expect(p.speciesId).toBeGreaterThan(0);
        expect(p.dvs).toBeDefined();
        // Stats sanity check
        expect(p.dvs.atk).toBeGreaterThanOrEqual(0);
        expect(p.dvs.atk).toBeLessThanOrEqual(15);
        expect(p.dvs.def).toBeGreaterThanOrEqual(0);
        expect(p.dvs.def).toBeLessThanOrEqual(15);
        expect(p.dvs.spd).toBeGreaterThanOrEqual(0);
        expect(p.dvs.spd).toBeLessThanOrEqual(15);
        expect(p.dvs.spc).toBeGreaterThanOrEqual(0);
        expect(p.dvs.spc).toBeLessThanOrEqual(15);

        // Shininess calculation should be populated based on DVs
        expect(typeof p.isShiny).toBe('boolean');
      }
    }

    // Ensure Party Pokemon are excluded from Box analysis / not in PC
    const partyPokemonInPc = pcDetails.filter((p: { storageLocation?: string }) => p.storageLocation === 'Party');
    expect(partyPokemonInPc.length).toBe(0);

    // Make sure party details have the correct location
    if (partyDetails.length > 0) {
      for (const p of partyDetails) {
        expect(p.storageLocation).toBe('Party');
      }
    }
  });
});
