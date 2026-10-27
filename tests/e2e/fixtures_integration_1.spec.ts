import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration 1', () => {
  test('should load Gen 2 fixture (gold-tid-65525.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen2/Pokemon Gold - TID 65525.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 2 fixture (silver-ue-c.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen2/Pokemon - Silver Version (UE) [C][!].sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 2 fixture (gold-tid-15051.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen2/Pokemon Gold - TID 15051.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 2 fixture (crystal-egg-shiny-living-dex.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen2/Egg Shiny Living Dex.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (ruby-vithuang-2.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/ruby2_vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (firered-eventsgallery.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/firered_eventsgallery.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-spinda-pc.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_spinda_pc_fixture.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (ruby-vithuang.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/ruby_vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
});
