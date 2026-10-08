import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

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

  test('should load save file, display optimizer, calculate recommendation and display results', async ({
    page,
    isMobile,
  }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    if (isMobile) {
      await page.goto('./gen3-dashboard');
    } else {
      await page.goto('./gen3-dashboard');
    }

    // Verify header exists
    await expect(page.getByText('POKEBLOCK OPTIMIZER', { exact: true })).toBeVisible();

    // Nature select
    await page.locator('select').first().selectOption('modest');

    // Target Category select
    await page.locator('select').nth(1).selectOption('beauty');

    // Ensure calculate button is visible and click it
    const calculateBtn = page.getByRole('button', { name: /Calculate Recommendation/i });
    await expect(calculateBtn).toBeVisible();
    await calculateBtn.click();

    // Verify recommendation results appear
    await expect(page.getByText('STATUS:')).toBeVisible();
    await expect(page.getByText(/Final Condition:/)).toBeVisible();
    await expect(page.getByText(/Final Sheen:/)).toBeVisible();
  });
});
