import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 1 Save Data Parsing E2E', () => {
  test('should extract PC Boxes, Party, and trainer info from Gen 1 save file', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    await expect(page.locator('header').getByText(/BLUE/i).first()).toBeVisible({ timeout: 15000 });

    const saveData = await page.evaluate(async () => {
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
    expect(saveData.generation).toBe(1);
    expect(saveData.trainerName).toBeDefined();
    expect(typeof saveData.trainerName).toBe('string');
    expect(saveData.trainerName.length).toBeGreaterThan(0);

    const pcDetails = saveData.pcDetails || [];
    const partyDetails = saveData.partyDetails || [];

    // We expect some pokemon in the PC
    expect(pcDetails.length).toBeGreaterThan(0);

    // We expect some pokemon in the party
    expect(partyDetails.length).toBeGreaterThan(0);

    // Verify properties of a PC pokemon
    const firstPcPokemon = pcDetails[0];
    expect(firstPcPokemon.speciesId).toBeDefined();
    expect(firstPcPokemon.level).toBeDefined();
    expect(firstPcPokemon.storageLocation).toContain('Box');

    // Verify properties of a party pokemon
    const firstPartyPokemon = partyDetails[0];
    expect(firstPartyPokemon.speciesId).toBeDefined();
    expect(firstPartyPokemon.level).toBeDefined();
    expect(firstPartyPokemon.storageLocation).toBe('Party');
  });
});
