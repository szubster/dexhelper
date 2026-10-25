import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 PK3 Extraction E2E', () => {
  test('should extract PK3 attributes correctly', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    // Verify UI actually renders correctly and data has been parsed
    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible({ timeout: 15000 });

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
    expect(saveData.generation).toBe(3);

    // If PK3 extraction works, pokemon will have their traits properly parsed from PC memory blocks
    const pcDetails = saveData.pcDetails || [];
    expect(pcDetails.length).toBeGreaterThan(0);

    const firstPokemon = pcDetails[0];
    expect(firstPokemon.speciesId).toBeDefined();
    // Valid stats array and moves array confirm block parsing and bit unpacking succeeded
    expect(firstPokemon.moves).toBeDefined();
    expect(Array.isArray(firstPokemon.moves)).toBe(true);
    expect(firstPokemon.level).toBeDefined();
    expect(typeof firstPokemon.level).toBe('number');
  });
});
