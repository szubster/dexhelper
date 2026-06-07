import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Run Dashboard', () => {
  test('should display [ AWAITING_DATA ] state when no save is loaded', async ({ page }) => {
    await clearStorage(page);
    await page.goto('./run');
    await waitForSync(page);
    await expect(page.locator('text=[ AWAITING_DATA ]')).toBeVisible();
    await expect(page.locator('text=Upload a save file to view run statistics')).toBeVisible();
  });

  test('should display dashboard correctly when save is loaded', async ({ page }) => {
    await clearStorage(page);
    // Note: Use a valid fixture path that exists
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // The RUN navigation link should be visible if we navigate directly
    await page.goto('./run');
    await waitForSync(page);

    // Check for dashboard elements
    await expect(page.locator('text=RUN_DASHBOARD.SYS')).toBeVisible();
    await expect(page.locator('text=SYS.ALIVE_TEAM')).toBeVisible();
    await expect(page.locator('text=SYS.VISITED_ROUTES')).toBeVisible();
    await expect(page.locator('text=SYS.UNVISITED_ROUTES')).toBeVisible();
  });
});
