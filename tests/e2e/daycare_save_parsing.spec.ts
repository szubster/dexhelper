import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Daycare Save Parsing E2E', () => {
  test('should extract daycare data and egg flags correctly for Gen 2', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');
    await waitForSync(page);

    const saveData = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: access Zustand store
      const globalWindow = window as any;
      if (globalWindow.__store) {
        return globalWindow.__store().saveData;
      }
      return null;
    });

    expect(saveData).not.toBeNull();
    expect(saveData.generation).toBe(2);
    expect(saveData).toHaveProperty('daycareHasEgg');
    expect(saveData).toHaveProperty('daycare');
    expect(Array.isArray(saveData.daycare)).toBe(true);
  });

  test('should extract daycare data correctly for Gen 3', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    const saveData = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: access Zustand store
      const globalWindow = window as any;
      if (globalWindow.__store) {
        return globalWindow.__store().saveData;
      }
      return null;
    });

    expect(saveData).not.toBeNull();
    expect(saveData.generation).toBe(3);
    expect(saveData).toHaveProperty('gen3Daycare');
    expect(saveData.gen3Daycare).toHaveProperty('mons');
    expect(Array.isArray(saveData.gen3Daycare.mons)).toBe(true);
    expect(saveData.gen3Daycare).toHaveProperty('stepCounter');
  });
});
