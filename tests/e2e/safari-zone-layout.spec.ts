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

    const sidePanelArea = page.getByText('Side Panel Area');
    await expect(sidePanelArea).toBeVisible();
    await expect(sidePanelArea).toHaveClass(/border-dashed/);
    await expect(sidePanelArea).toHaveClass(/font-mono/);

    const mainArea = page.getByText('Safari Zone Main Area');
    await expect(mainArea).toBeVisible();
    await expect(mainArea).toHaveClass(/font-mono/);
  });
});
