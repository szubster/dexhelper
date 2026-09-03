import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Moms Savings E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should display Moms savings correctly for Gold save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/gold.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('BANK OF MOM').first()).toBeVisible();
    await expect(page.getByText('CURRENT BALANCE').first()).toBeVisible();
    await expect(page.getByText('SAVING ACTIVE').first().or(page.getByText('SAVING INACTIVE').first()).first()).toBeVisible();
  });

  test('should display Moms savings correctly for Silver save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/silver.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('BANK OF MOM').first()).toBeVisible();
    await expect(page.getByText('CURRENT BALANCE').first()).toBeVisible();
    await expect(page.getByText('SAVING ACTIVE').first().or(page.getByText('SAVING INACTIVE').first()).first()).toBeVisible();
  });

  test('should display Moms savings correctly for Crystal save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('BANK OF MOM').first()).toBeVisible();
    await expect(page.getByText('CURRENT BALANCE').first()).toBeVisible();
    await expect(page.getByText('SAVING ACTIVE').first().or(page.getByText('SAVING INACTIVE').first()).first()).toBeVisible();
  });
});
