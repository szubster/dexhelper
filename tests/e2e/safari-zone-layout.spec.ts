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

    // Assert header and mode badge
    await expect(page.getByText('SAFARI ZONE MISSING ENCOUNTERS')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/MODE:/i)).toBeVisible();

    // Assert tactical encounter panels render
    const panel = page.locator('.tactical-panel').first();
    await expect(panel).toBeVisible();
    await expect(page.getByText(/MISSING/i).first()).toBeVisible();
  });
});
