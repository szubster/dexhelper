import { expect, test } from '@playwright/test';
import { initializeWithSave } from '../test-utils';

test.describe('Rematch Dashboard Routing', () => {
  test('should navigate to the Rematch Dashboard via route and render correctly with save data', async ({ page }) => {
    // Navigate and load save data
    await initializeWithSave(page, 'gen3/emerald_post_e4.sav');

    // Just directly navigate to the page since the test expects us to verify navigation to a relative route per playwright best practices
    await page.goto('./rematch');

    // Check for unique RematchDashboard elements
    await expect(page.locator('h1').filter({ hasText: '[REMATCH_DASHBOARD]' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: '[AVAILABLE_REMATCHES]' })).toBeVisible();
  });
});
