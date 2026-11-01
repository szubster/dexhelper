import { expect, test } from '@playwright/test';

test.describe('Gen 3 Map Dashboard (Mobile Strict OR)', () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true });

  test('should load Map dashboard and verify toggles and selection via OR locator', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');

    // Check Map Dashboard rendered via strict mode OR locator
    const mapHeading = page
      .locator('text=Gen 3 Map Dashboard')
      .first()
      .or(page.locator('h2:has-text("Gen 3 Map Dashboard")').first())
      .first();
    await expect(mapHeading).toBeVisible();

    // Initial State Check
    await expect(page.locator('[data-testid="layer-routes"]')).toBeChecked();
    await expect(page.locator('[data-testid="layer-cities"]')).toBeChecked();
    await expect(page.locator('[data-testid="layer-pois"]')).toBeChecked();

    // Toggle check
    await page.locator('[data-testid="layer-routes"]').uncheck();
    await expect(page.locator('[data-testid="layer-routes"]')).not.toBeChecked();

    const selectedText = page.locator('[data-testid="selected-feature"]');
    await expect(selectedText).toHaveText('None');

    await page.getByRole('button', { name: 'Select Route 101' }).click();
    await expect(selectedText).toHaveText('Route 101');

    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(selectedText).toHaveText('None');
  });
});
