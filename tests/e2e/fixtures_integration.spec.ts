import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration', () => {
  test('should load Gen 1 fixture (red.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/red.sav');
    await expect(page.locator('header').getByText(/RED/i).first()).toBeVisible();
  });

  test('should load Gen 2 fixture (crystal.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/crystal.sav');
    await expect(
      page
        .locator('header')
        .getByText(/CRYSTAL/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald.sav');
    await expect(
      page
        .locator('header')
        .getByText(/DIXIE/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-vithuang.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/MAY/i)
        .first(),
    ).toBeVisible();
  });
});
