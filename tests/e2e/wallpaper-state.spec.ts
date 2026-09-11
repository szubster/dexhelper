import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Gen 3 Wallpaper State Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('should load the Gen 3 save successfully', async ({ page }) => {
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible();
  });
});
