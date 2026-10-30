import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration 2', () => {
  test('should load Gen 3 fixture (firered-vithuang.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/firered_vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-spinda-party.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_spinda_party_fixture.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-bl1ndbeholder.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_bl1ndbeholder.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-vithuang.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_vithuang.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-egg.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_egg_fixture.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-mystery-gift.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_mystery_gift.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (firered-mystery-gift.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/firered_mystery_gift.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
  test('should load Gen 3 fixture (emerald-vithuang-rtc.sav)', async ({ page, loadSave, isMobile }) => {
    test.skip(isMobile, 'Mobile layout assertions not supported for this fixture check');
    await clearStorage(page);
    await loadSave('tests/fixtures/saves/gen3/emerald_vithuang_rtc.sav');
    await expect(
      page
        .locator('header')
        .getByText(/RED|YELLOW|ASH|BLUE|GREEN|GOLD|SILVER|CRYSTAL|DUDE|TRNR|RUBY|SAPPHIRE|EMERALD|Player/i)
        .first(),
    ).toBeVisible({ timeout: 5000 });
  });
});
