import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Lazy Load Features', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage properly and then load Gen 2 save
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
  });

  test('should lazy load Gen 2 components on the dashboard without crashing', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('./dashboard');
    await waitForSync(page);

    // Verify that Gen 2 components load successfully.
    // Using SUDOWOODO from Gen2Checklist or SYS.GEN2_SAVINGS from Gen2SavingsDashboard
    await expect(
      page
        .getByText(/SUDOWOODO/i)
        .first()
        .or(page.getByText(/SYS\.GEN2_SAVINGS/i).first())
        .first(),
    ).toBeVisible({ timeout: 10000 });
  });
});
