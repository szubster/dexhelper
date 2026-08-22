import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Bike Requirement Route Mapping E2E', () => {
  test.beforeEach(async ({ page }) => {
    // We use emerald.sav to test Gen 3 specific trainer data
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('verifies bike areas are shown in Smart Route Radar for Emerald save', async ({ page, isMobile }) => {
    // 2. Navigate to Assistant page
    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    // Wait for route navigation to complete
    await page.waitForURL('**/assistant');

    // 3. Verify page content (Route radar should be present if there are suggestions)
    await expect(page.getByText(/Active Route Radar/i)).toBeVisible({ timeout: 15000 });

    const radarContainer = page.locator('div').filter({ hasText: 'Active Route Radar' }).first();

    const machBadgeVisible = radarContainer.getByText(/MACH/i).or(radarContainer.getByText(/safari/i));
    await expect(machBadgeVisible.first()).toBeVisible({ timeout: 15000 });

    const acroBadgeVisible = radarContainer.getByText(/ACRO/i).or(radarContainer.getByText(/safari/i));
    await expect(acroBadgeVisible.first()).toBeVisible({ timeout: 15000 });
  });
});
