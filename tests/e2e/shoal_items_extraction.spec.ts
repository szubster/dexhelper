import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Shoal Items Save Parsing E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('extracts Shoal Salt and Shoal Shells counts', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    const storeState = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: required for window injection
      return (window as unknown as { __store: () => any }).__store();
    });

    expect(storeState.saveData).toBeDefined();

    const emeraldSave = storeState.saveData;
    expect(emeraldSave.generation).toBe(3);

    expect(emeraldSave.gen3ShoalItems).toBeDefined();
    expect(emeraldSave.gen3ShoalItems.salt).toBe(0);
    expect(emeraldSave.gen3ShoalItems.shells).toBe(0);
  });
});
