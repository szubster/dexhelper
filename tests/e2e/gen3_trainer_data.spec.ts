import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Trainer Data Extraction E2E', () => {
  test.beforeEach(async ({ page }) => {
    // We use emerald.sav to test Gen 3 specific trainer data
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('verifies TID and SID are rendered correctly for Gen 3', async ({ page }) => {
    await page.goto('/');
    await waitForSync(page);

    // Emerald uses 16-bit TID and SID extracted from the 32-bit trainer ID
    // Check if the TID and SID are present in the TelemetryMatrix

    const tidElement = page.getByText(/TID/i).locator('..').locator('span').nth(1);
    const sidElement = page.getByText(/SID/i).locator('..').locator('span').nth(1);

    await expect(tidElement).toBeVisible();
    await expect(sidElement).toBeVisible();

    // We expect both to be numbers padded to 5 digits
    const tidText = await tidElement.textContent();
    const sidText = await sidElement.textContent();

    expect(tidText).toMatch(/^\d{5}$/);
    expect(sidText).toMatch(/^\d{5}$/);
  });
});
