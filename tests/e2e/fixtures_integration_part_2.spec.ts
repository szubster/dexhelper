import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration', () => {
  test('should load Gen 2 fixture (gold-tid-65525.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/gold-tid-65525.sav');
    await expect(page.locator('header').getByText(/Chris/i).first()).toBeVisible();
  });

  test('should load Gen 2 fixture (silver-ue-c.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/silver-ue-c.sav');
    await expect(
      page
        .locator('header')
        .getByText(/Silver/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 2 fixture (gold-tid-15051.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/gold-tid-15051.sav');
    await expect(page.locator('header').getByText(/Retro/i).first()).toBeVisible();
  });

  test('should load Gen 2 fixture (crystal-egg-shiny-living-dex.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/crystal-egg-shiny-living-dex.sav');
    await expect(
      page
        .locator('header')
        .getByText(/Digiex/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (ruby-vithuang-2.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/ruby-vithuang-2.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 1 fixture (firered-eventsgallery.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/firered-eventsgallery.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (emerald-spinda-pc.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/emerald-spinda-pc.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });

  test('should load Gen 3 fixture (ruby-vithuang.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/ruby-vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/UNKNOWN/i)
        .first(),
    ).toBeVisible();
  });
});
