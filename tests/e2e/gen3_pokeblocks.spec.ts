import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Pokeblocks E2E', () => {
  test('should parse and display pokeblocks for Emerald', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await page.goto('./gen3-dashboard');

    // For an empty array of pokeblocks, the POKÉBLOCKS component won't render
    const pokeblockHeader = page.getByText('POKÉBLOCKS', { exact: true });
    await expect(pokeblockHeader).toBeHidden();
  });

  test('should parse and display pokeblocks for Ruby/Sapphire', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang-2.sav');

    await page.goto('./gen3-dashboard');

    await expect(page.getByText('POKÉBLOCKS', { exact: true })).toBeVisible();
    await expect(page.getByText(/Spicy:/).first()).toBeVisible();
  });

  test('should handle FireRed/LeafGreen gracefully without pokeblocks', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/firered.sav');

    await page.goto('./gen3-dashboard');

    // FRLG does not have pokeblocks.
    const pokeblockHeader = page.getByText('POKÉBLOCKS', { exact: true });
    await expect(pokeblockHeader).toBeHidden();
  });
});
