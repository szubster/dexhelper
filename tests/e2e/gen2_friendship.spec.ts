import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Friendship Data Extraction E2E', () => {
  test('should extract friendship correctly from Gen 2 save file for Party and PC Boxes', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal-evolve.sav');

    // Wait for the sync and UI to fully load
    await page.waitForTimeout(2000);
    await waitForSync(page);

    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible({ timeout: 15000 });

    const saveData = await page.evaluate(async () => {
      // Wait for __store and saveData to be available
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

    const partyDetails = saveData.partyDetails || [];
    const pcDetails = saveData.pcDetails || [];

    // Verify Party friendship
    expect(partyDetails.length).toBeGreaterThan(0);
    for (const p of partyDetails) {
      expect(p.friendship).toBeDefined();
      expect(typeof p.friendship).toBe('number');
      expect(p.friendship).toBeGreaterThanOrEqual(0);
      expect(p.friendship).toBeLessThanOrEqual(255);
    }

    // Specific Party checks from crystal-evolve.sav
    // First pokemon in party is Chikorita (152) with friendship 77
    const chikorita = partyDetails[0];
    expect(chikorita.speciesId).toBe(152);
    expect(chikorita.friendship).toBe(77);

    // Verify PC Box friendship
    expect(pcDetails.length).toBeGreaterThan(0);
    for (const p of pcDetails) {
      expect(p.friendship).toBeDefined();
      expect(typeof p.friendship).toBe('number');
      expect(p.friendship).toBeGreaterThanOrEqual(0);
      expect(p.friendship).toBeLessThanOrEqual(255);
    }

    // Specific PC Box check from crystal-evolve.sav
    // First pokemon in PC is Totodile (21) with friendship 70
    const totodile = pcDetails.find((p: { speciesId: number }) => p.speciesId === 21);
    expect(totodile).toBeDefined();
    expect(totodile.friendship).toBe(70);
  });
});
