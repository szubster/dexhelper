import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Bike Requirement Route Mapping E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('verifies bike areas are shown in Smart Route Radar for Emerald save', async ({ page, isMobile }) => {
    // 1. Initialize with an Emerald save
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

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

    // 3. Verify page content (Route radar should be present if there are suggestions)
    await expect(page.getByText(/Active Route Radar/i)).toBeVisible({ timeout: 15000 });

    // 4. Verify presence of "hoenn-safari-zone-nwmach-bike-area" and "hoenn-safari-zone-neacro-bike-area"
    // on the UI. Either by explicit ID or by the presence of mapped text.

    // Based on the acceptance criteria, we need to check for the presence of Mach and Acro bike area nodes/badges on the UI.
    const machBadgeVisible = page.getByText(/MACH/i).or(page.getByText(/hoenn-safari-zone-nwmach-bike-area/i));
    await expect(machBadgeVisible.first()).toBeVisible();

    const acroBadgeVisible = page.getByText(/ACRO/i).or(page.getByText(/hoenn-safari-zone-neacro-bike-area/i));
    await expect(acroBadgeVisible.first()).toBeVisible();
  });
});
