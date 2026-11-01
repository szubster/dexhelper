import { expect, test } from '@playwright/test';

test.describe('Rematch Dashboard Routing', () => {
  test('should navigate to the Rematch Dashboard via route', async ({ page }) => {
    await page.goto('./rematch');

    // Check for unique RematchDashboard element
    await expect(page.locator('h1').filter({ hasText: '[REMATCH_DASHBOARD]' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: '[AVAILABLE_REMATCHES]' })).toBeVisible();
  });
});
