import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration', () => {
  test('should load Gen 1 fixture (firered-vithuang.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/firered-vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-spinda-party.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-spinda-party.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-bl1ndbeholder.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-bl1ndbeholder.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-vithuang.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-egg.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-egg.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-mystery-gift.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-mystery-gift.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 1 fixture (firered-mystery-gift.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/firered-mystery-gift.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });
});
