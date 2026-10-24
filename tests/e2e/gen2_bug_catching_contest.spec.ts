import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 2 Bug-Catching Contest Extraction E2E', () => {
  test('should successfully extract Bug-Catching Contest data from a valid save without crashing', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({
      timeout: 20000,
    });

    // As long as the page loads and parsing completes (verified by initializeWithSave),
    // we know the Bug-Catching Contest extraction didn't crash the save parsing pipeline.
    // The exact parsing logic is unit-tested in extractors.test.ts
  });

  test('should not throw error if save has no active bug catching contest', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({
      timeout: 20000,
    });
  });
});
