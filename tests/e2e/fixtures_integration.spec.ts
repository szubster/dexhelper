import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Fixture Integration', () => {
  test('should load Gen 1 fixture (red.sav)', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/red.sav');
    await expect(page.locator('header').getByText(/RED/i).first()).toBeVisible();
  });

  test('should load Gen 2 fixture (crystal.sav)', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await expect(
      page
        .locator('header')
        .getByText(/CRYSTAL/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald.sav)', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });
});
