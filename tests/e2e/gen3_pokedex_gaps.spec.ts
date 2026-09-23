import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Pokedex Gaps Tracker', () => {
  test('should display gaps and version exclusive indicators for Gen 3 saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for the cards to load
    const cards = page.getByTestId('pokedex-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const emeraldCount = await page.locator('.border-emerald-500\\/50').count();
    const amberCount = await page.locator('.border-amber-500\\/50').count();

    expect(emeraldCount).toBeGreaterThan(0);
    expect(amberCount).toBeGreaterThan(0);

    // The "missing" filter allows users to see what is missing. Let's just click it using the testId.
    const missingFilter = page.getByTestId('filter-missing');
    await expect(missingFilter).toBeVisible();
    await missingFilter.click();

    // UI updates asynchronously, wait for the missing filter to hide the "secured" (emerald) items.
    await expect(page.locator('.border-emerald-500\\/50')).toHaveCount(0);
  });
});
