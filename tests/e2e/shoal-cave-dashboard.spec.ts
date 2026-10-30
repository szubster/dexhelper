import { expect, test } from '@playwright/test';
import { waitForSync } from './test-utils';

test.describe('Shoal Cave Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to kitchen sink where isolated components are mounted
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);
  });

  test('verifies display of current tide and countdown', async ({ page }) => {
    // Test dashboard 1 (High Tide)
    const dashboard1 = page.locator('#test-shoal-dashboard-1');
    await expect(dashboard1).toBeVisible();
    await expect(dashboard1.getByText('Shoal Cave Tide Status')).toBeVisible();
    await expect(dashboard1.getByText('High', { exact: true })).toBeVisible();
    await expect(dashboard1.getByText('2h 30m')).toBeVisible();

    // Test dashboard 2 (Low Tide)
    const dashboard2 = page.locator('#test-shoal-dashboard-2');
    await expect(dashboard2).toBeVisible();
    await expect(dashboard2.getByText('Shoal Cave Tide Status')).toBeVisible();
    await expect(dashboard2.getByText('Low', { exact: true })).toBeVisible();
    await expect(dashboard2.getByText('0h 45m')).toBeVisible();
  });

  test('verifies display of Shoal Shell and Shoal Salt item counts', async ({ page }) => {
    const dashboard1 = page.locator('#test-shoal-dashboard-1');
    await expect(dashboard1.getByText('Shoal Shells')).toBeVisible();
    await expect(dashboard1.getByText('2 / 4', { exact: true })).toBeVisible();
    await expect(dashboard1.getByText('Shoal Salts')).toBeVisible();
    await expect(dashboard1.getByText('4 / 4', { exact: true })).toBeVisible();
  });

  test('verifies Shell Bell crafting readiness visual indicator', async ({ page }) => {
    // Not ready state
    const dashboard1 = page.locator('#test-shoal-dashboard-1');
    await expect(dashboard1.getByText('INSUFFICIENT MATERIALS')).toBeVisible();

    // Ready state
    const dashboard2 = page.locator('#test-shoal-dashboard-2');
    await expect(dashboard2.getByText('READY', { exact: true })).toBeVisible();
  });
});
