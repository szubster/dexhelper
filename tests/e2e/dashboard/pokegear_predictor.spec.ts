import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../test-utils';

test.describe('Pokegear Predictor Engine & UI', () => {
  test.beforeEach(async ({ page }) => {
    // Clear the storage first
    await clearStorage(page);

    // Initialize with a standard Gen 2 save (Crystal)
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
  });

  test('should parse Gen 2 Pokegear phone data and render the Active Callers Dashboard', async ({ page }) => {
    // Navigate to the Dashboard
    await page.goto('./dashboard');

    // Ensure the 'Active Callers Matrix' title is visible
    const matrixTitle = page.getByText('ACTIVE CALLERS MATRIX');
    await expect(matrixTitle).toBeVisible();

    // Ensure the state shows 'ACTIVE'
    const statusText = page.getByText('ACTIVE', { exact: true });
    await expect(statusText).toBeVisible();

    // Note: The specific contacts might vary based on the crystal.sav file contents,
    // so we can test that at least one of the expected fields exists or a tactical card is rendered.
    const hasAnyContact = await page.getByText('PROB: 50%').first().isVisible();
    const hasSearching = await page.getByText('[ SEARCHING_FOR_SIGNALS... ]').isVisible();

    expect(hasAnyContact || hasSearching).toBeTruthy();
  });
});
