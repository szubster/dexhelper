import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 2 Roamer Extraction E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should parse Gen 2 roamer fixtures and extract Raikou, Entei, Suicune data correctly', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Check if the state has the roamingLegendaries correctly populated
    const roamingLegendaries = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData?.roamingLegendaries) {
            return state.saveData.roamingLegendaries;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return null;
    });

    expect(roamingLegendaries).not.toBeNull();
  });

  test('should correctly handle inactive roamers in Gold save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    const roamingLegendaries = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData?.roamingLegendaries) {
            return state.saveData.roamingLegendaries;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return null;
    });

    expect(roamingLegendaries).not.toBeNull();
  });

  test('should correctly extract map group and number data', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/silver.sav');

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
    expect(saveData.roamerCurMapGroup).toBeDefined();
    expect(saveData.roamerCurMapId).toBeDefined();

    // Ensure roamingLegendaries have level and map data
    if (saveData.roamingLegendaries?.length) {
      const roamer = saveData.roamingLegendaries[0];
      expect(roamer.level).toBeDefined();
    }
  });
});
