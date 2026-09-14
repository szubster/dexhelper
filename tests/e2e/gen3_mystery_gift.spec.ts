import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Mystery Gift Fixtures', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should load emerald-mystery-gift.sav successfully', async ({ page }) => {
    // This just verifies the fixture is properly copied into the build and can be loaded
    // and parsed without the engine crashing.
    await initializeWithSave(page, 'tests/fixtures/emerald-mystery-gift.sav');

    // Check if the dashboard or main elements load
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible();
  });

  test('should load firered-mystery-gift.sav successfully', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/firered-mystery-gift.sav');
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible();
  });
});
