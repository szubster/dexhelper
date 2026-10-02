import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Friendship Data Extraction E2E Validation', () => {
  test('should extract friendship correctly from Gen 3 save file for Party', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
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
    for (const p of partyDetails) {
      expect(p.friendship).toBeDefined();
      expect(typeof p.friendship).toBe('number');
      expect(p.friendship).toBeGreaterThanOrEqual(0);
      expect(p.friendship).toBeLessThanOrEqual(255);
    }

    const aggron = partyDetails.find((p: { speciesId: number }) => p.speciesId === 306);
    expect(aggron).toBeDefined();
    expect(aggron.friendship).toBe(73);
  });

  test('should extract friendship correctly from Gen 3 save file for PC Boxes', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');
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

    const pcDetails = saveData.pcDetails || [];

    expect(pcDetails.length).toBeGreaterThan(0);
    for (const p of pcDetails) {
      expect(p.friendship).toBeDefined();
      expect(typeof p.friendship).toBe('number');
      expect(p.friendship).toBeGreaterThanOrEqual(0);
      expect(p.friendship).toBeLessThanOrEqual(255);
    }

    const relicanth = pcDetails.find((p: { speciesId: number }) => p.speciesId === 369);
    expect(relicanth).toBeDefined();
    expect(relicanth.friendship).toBe(75);
  });
});
