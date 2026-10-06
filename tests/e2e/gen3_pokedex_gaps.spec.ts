import { expect, test } from '@playwright/test';
import { PokedexGridModel } from './models/PokedexGridModel';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Pokedex Gaps Tracker', () => {
  test('should display gaps and version exclusive indicators for Gen 3 saves', async ({ page }) => {
    const gridModel = new PokedexGridModel(page);
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for the cards to load
    const cards = gridModel.pokemonCards;
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    // Verify secured (emerald) items exist by toggling secured filter
    const securedFilter = page.getByTestId('filter-secured');
    await expect(securedFilter).toBeVisible();
    await securedFilter.click();
    await expect(page.locator('.border-emerald-500\\/50').first()).toBeVisible({ timeout: 10000 });
    const emeraldCount = await page.locator('.border-emerald-500\\/50').count();
    expect(emeraldCount).toBeGreaterThan(0);
    await securedFilter.click(); // toggle off

    // Verify dex-only (amber) items exist by toggling dex-only filter
    const dexOnlyFilter = page.getByTestId('filter-dex-only');
    await expect(dexOnlyFilter).toBeVisible();
    await dexOnlyFilter.click();
    await expect(page.locator('.border-amber-500\\/50').first()).toBeVisible({ timeout: 10000 });
    const amberCount = await page.locator('.border-amber-500\\/50').count();
    expect(amberCount).toBeGreaterThan(0);
    await dexOnlyFilter.click(); // toggle off

    // The "missing" filter allows users to see what is missing. Let's just click it using the testId.
    const missingFilter = page.getByTestId('filter-missing');
    await expect(missingFilter).toBeVisible();
    await missingFilter.click();

    // UI updates asynchronously, wait for the missing filter to hide the "secured" (emerald) items.
    await expect(page.locator('.border-emerald-500\\/50')).toHaveCount(0);
  });
});
