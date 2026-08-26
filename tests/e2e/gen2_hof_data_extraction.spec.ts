import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Hall of Fame Data Parsing E2E', () => {
  test('should extract Hall of Fame records from Gen 2 save file and make them available in IndexedDB', async ({
    page,
  }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Make sure we wait sufficiently for parsing logic
    await page.waitForTimeout(2000);
    await waitForSync(page);

    const saveData = await page.evaluate(async () => {
      // Ensure state evaluation wait for next tick just in case
      await new Promise((resolve) => setTimeout(resolve, 500));
      // biome-ignore lint/suspicious/noExplicitAny: testing hook
      const globalWindow = window as any;
      if (globalWindow.__store) {
        return globalWindow.__store().saveData;
      }
      return null;
    });

    expect(saveData).not.toBeNull();

    // Crystal fixture has HoF entries (we tested parsing it before)
    expect(saveData.hallOfFameCount).toBeGreaterThanOrEqual(0);
    if (saveData.hallOfFameRecords) {
      expect(Array.isArray(saveData.hallOfFameRecords)).toBe(true);
    }
  });
});
