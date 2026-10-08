import { expect, test } from './fixtures/index';
import { clearStorage } from './test-utils';

test.describe('Fixture Integration', () => {
  test('should load Gen 1 fixture (blue-0.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/blue-0.sav');
    await expect(page.locator('header').getByText(/LINUS/i).first()).toBeVisible();
  });

  test('should load Gen 1 fixture (yellow-0.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/yellow-0.sav');
    await expect(page.locator('header').getByText(/ASH/i).first()).toBeVisible();
  });

  test('should load Gen 1 fixture (yellow-glitch-hunt-2.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/yellow-glitch-hunt-2.sav');
    await expect(page.locator('header').getByText(/Retro/i).first()).toBeVisible();
  });

  test('should load Gen 1 fixture (yellow-glitch-hunt-1.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/yellow-glitch-hunt-1.sav');
    await expect(page.locator('header').getByText(/Retro/i).first()).toBeVisible();
  });

  test('should load Gen 1 fixture (red-base.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/red-base.sav');
    await expect(page.locator('header').getByText(/JUNE7/i).first()).toBeVisible();
  });

  test('should load Gen 1 fixture (red-0.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/red-0.sav');
    await expect(page.locator('header').getByText(/ASH/i).first()).toBeVisible();
  });

  test('should load Gen 2 fixture (silver-tid-39093.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/silver-tid-39093.sav');
    await expect(page.locator('header').getByText(/Chris/i).first()).toBeVisible();
  });

  test('should load Gen 2 fixture (silver-tid-38183.sav)', async ({ page, loadSave }) => {
    await clearStorage(page);
    await loadSave('tests/fixtures/silver-tid-38183.sav');
    await expect(page.locator('header').getByText(/Retro/i).first()).toBeVisible();
  });
});
