import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Heuristic Detection E2E', () => {
  test('should successfully load Emerald and detect as Gen 3', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible({ timeout: 15000 });

    const generation = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: testing hook
      const globalWindow = window as any;
      if (globalWindow.__store) {
        const state = globalWindow.__store();
        return state?.saveData?.generation;
      }
      return null;
    });

    expect(generation).toBe(3);
  });

  test('should successfully load Ruby and detect as Gen 3', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');
    await waitForSync(page);

    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible({ timeout: 15000 });

    const generation = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: testing hook
      const globalWindow = window as any;
      if (globalWindow.__store) {
        const state = globalWindow.__store();
        return state?.saveData?.generation;
      }
      return null;
    });

    expect(generation).toBe(3);
  });
});
