import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration 0', () => {
  test('should load Gen 1 fixture (blue-0.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen1/POKEMON BLUE-0.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 1 fixture (yellow-0.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen1/POKEMON YELLOW-0.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 1 fixture (yellow-glitch-hunt-2.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen1/Pokemon Yellow - 2nd Glitch Hunt.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 1 fixture (yellow-glitch-hunt-1.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen1/Pokemon Yellow - 1st Glitch Hunt.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 1 fixture (red-base.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen1/BaseSAV.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 1 fixture (red-0.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen1/POKEMON RED-0.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 2 fixture (silver-tid-39093.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen2/Pokemon Silver - TID 39093.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 2 fixture (silver-tid-38183.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen2/Pokemon Silver - TID 38183.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
});
