import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('SaveData E2E - Gen 2', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should successfully load a Gold save and parse Gen 2 SaveData', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    // Verify UI indicating Gen 2 / Gold is loaded
    await expect(
      page.getByText('Gold', { exact: true }).first().or(page.getByText('GOLD').first()).first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('should successfully load a Silver save and parse Gen 2 SaveData', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/silver.sav');

    // Verify UI indicating Gen 2 / Silver is loaded
    await expect(
      page.getByText('Silver', { exact: true }).first().or(page.getByText('SILVER').first()).first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('should successfully load a Crystal save and parse Gen 2 SaveData', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Verify UI indicating Gen 2 / Crystal is loaded
    await expect(
      page.getByText('Crystal', { exact: true }).first().or(page.getByText('CRYSTAL').first()).first(),
    ).toBeVisible({ timeout: 10000 });
  });
});
