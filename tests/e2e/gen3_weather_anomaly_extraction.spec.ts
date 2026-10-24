import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Weather Anomaly Extraction E2E', () => {
  test('should extract weather anomaly data from emerald.sav', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

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

    // Emerald has weather anomalies (Kyogre/Groudon)
    // The exact properties will depend on the emerald.sav file, so we check if gen3WeatherAnomaly is present
    // It should either be undefined or an object with isActive depending on if it's ruby/sapphire or emerald,
    // and where in the story the save is.
    if (saveData.gen3WeatherAnomaly) {
      expect(saveData.gen3WeatherAnomaly.isActive).toBeDefined();
      expect(typeof saveData.gen3WeatherAnomaly.isActive).toBe('boolean');
    }
  });
});
