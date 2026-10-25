import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Ribbons Data Extraction E2E Validation', () => {
  test('should extract ribbons correctly from Gen 3 save file for Party and PC Pokemon', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald-vithuang.sav');
    await waitForSync(page);

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

    const partyDetails = saveData.partyDetails || [];
    expect(partyDetails.length).toBeGreaterThan(0);

    let foundPartyRibbon = false;
    for (const p of partyDetails) {
      if (p.ribbons) {
        expect(p.ribbons).toHaveProperty('cool');
        expect(p.ribbons).toHaveProperty('beauty');
        expect(p.ribbons).toHaveProperty('cute');
        expect(p.ribbons).toHaveProperty('smart');
        expect(p.ribbons).toHaveProperty('tough');
        expect(p.ribbons).toHaveProperty('champion');
        expect(p.ribbons).toHaveProperty('winning');
        expect(p.ribbons).toHaveProperty('victory');
        expect(p.ribbons).toHaveProperty('artist');
        expect(p.ribbons).toHaveProperty('effort');
        expect(p.ribbons).toHaveProperty('battleChampion');
        expect(p.ribbons).toHaveProperty('regionalChampion');
        expect(p.ribbons).toHaveProperty('nationalChampion');
        expect(p.ribbons).toHaveProperty('country');
        expect(p.ribbons).toHaveProperty('national');
        expect(p.ribbons).toHaveProperty('earth');
        expect(p.ribbons).toHaveProperty('world');
        expect(p.ribbons).toHaveProperty('obedience');

        if (
          Object.values(p.ribbons).some(
            (/* biome-ignore lint/suspicious/noExplicitAny: explicit bypass */ r: any) => r > 0 || r === true,
          )
        ) {
          foundPartyRibbon = true;
        }
      }
    }
    expect(foundPartyRibbon).toBe(true);

    const pcDetails = saveData.pcDetails || [];
    expect(pcDetails.length).toBeGreaterThan(0);

    let foundPcRibbon = false;
    for (const p of pcDetails) {
      if (p.ribbons) {
        if (
          Object.values(p.ribbons).some(
            (/* biome-ignore lint/suspicious/noExplicitAny: explicit bypass */ r: any) => r > 0 || r === true,
          )
        ) {
          foundPcRibbon = true;
          break; // Optimization: Stop early since PC has many entries
        }
      }
    }
    expect(foundPcRibbon).toBe(true);
  });
});
