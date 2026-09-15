import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Mirage Island Save Parsing E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('extracts Mirage Island daily value and cross-references party/pc', async ({ page }) => {
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

    expect(emeraldSave.mirageIslandValue).toBeDefined();
    expect(typeof emeraldSave.mirageIslandValue).toBe('number');

    const allPokes = [...(emeraldSave.partyDetails || []), ...(emeraldSave.pcDetails || [])];

    // biome-ignore lint/suspicious/noExplicitAny: simple object extraction
    const hasMirageKey = allPokes.some((poke: any) => typeof poke.isMirageIslandKey === 'boolean');
    expect(hasMirageKey).toBe(true);
  });
});
