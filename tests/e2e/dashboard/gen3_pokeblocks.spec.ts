import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Pokéblocks Dashboard', () => {
  test('should not show Pokéblocks Dashboard for Gen 1/2 saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('POKÉBLOCKS')).toBeHidden();
  });

  test('should handle FireRed/LeafGreen saves appropriately (no Pokéblocks)', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/firered.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('POKÉBLOCKS')).toBeHidden();
  });

  test('should display Pokéblocks for Ruby/Sapphire saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/saves/gen3/ruby2_vithuang.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('POKÉBLOCKS')).toBeVisible();
  });

  test('should display Pokéblocks for Emerald saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/saves/gen3/emerald_vithuang.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('POKÉBLOCKS')).toBeVisible();
  });
});
