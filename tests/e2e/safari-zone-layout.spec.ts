import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Safari Zone Layout', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);
    await page.goto('./safari-zone');
  });

  test('should load the Safari Zone Layout with tactical UI components', async ({ page }) => {
    // Assert the route is accessible
    await expect(page).toHaveURL(/.*\/safari-zone/);

    // Assert tactical UI adherence
    const panel = page.locator('.tactical-panel').last();
    await expect(panel).toBeVisible();

    const sectorTelemetry = page.getByText('SECTOR TELEMETRY');
    await expect(sectorTelemetry).toBeVisible();
    await expect(sectorTelemetry).toHaveClass(/font-mono/);

    const mainTitle = page.getByText('SAFARI ZONE OPERATIONS CORE');
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toHaveClass(/font-mono/);
  });
});
