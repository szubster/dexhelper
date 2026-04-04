import { test, expect } from '@playwright/test';
import { argosScreenshot } from '@argos-ci/playwright';

test.describe('Dexhelper App', () => {
  test('should load the main page', async ({ page }) => {
    await page.goto('/');

    // Wait for the container we expect to be visible, or at least the body
    await expect(page.locator('body')).toBeVisible();

    // Verify title if there is one, or just check the page loaded without JS errors 
    // by ensuring some content is there. We'll check for the app container.
    // The main application container id is 'root'.
    await expect(page.locator('#root')).toBeAttached();

    // Give mobile layout time to settle
    await page.waitForTimeout(1000);

    // Take a screenshot of the whole page automatically processed via Argos
    await argosScreenshot(page, 'home-page', { fullPage: true });
  });
});
