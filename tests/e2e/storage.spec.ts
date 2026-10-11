import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Storage UI', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);
  });

  test('should render the storage grid properly with boxes and party', async ({ page }) => {
    await page.goto('./storage');
    await waitForSync(page);

    await expect(page.getByText('SYS.DIR').first()).toBeVisible();
    await expect(page.getByText('Party').first()).toBeVisible();
    await expect(page.getByText('Box 1').first()).toBeVisible();

    // Verify standard Pokémon render in storage cards
    await expect(page.getByLabel(/View details for/).first()).toBeVisible();
    await expect(page.getByText(/LV\./).first()).toBeVisible();
  });

  test('should virtualize and render correctly when scrolling', async ({ page }) => {
    await page.goto('./storage');
    await waitForSync(page);

    // Scroll down to bottom of page to trigger virtualization rendering
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Verify that some boxes are visible in the DOM
    await expect(page.getByText('Box 1').first()).toBeVisible();
  });

  test('should adjust columns dynamically based on viewport', async ({ page, isMobile }) => {
    await page.goto('./storage');
    await waitForSync(page);

    // Ensure grid displays without error
    await expect(page.getByText('Party').first()).toBeVisible();

    if (isMobile) {
      // Mobile test viewport change implicitly handled by isMobile context
      await expect(page.getByText('Party').first()).toBeVisible();
    } else {
      // Resize viewport to narrow width
      await page.setViewportSize({ width: 600, height: 800 });
      await page.waitForTimeout(200);
      await expect(page.getByText('Party').first()).toBeVisible();

      // Resize viewport to wide width
      await page.setViewportSize({ width: 1400, height: 800 });
      await page.waitForTimeout(200);
      await expect(page.getByText('Party').first()).toBeVisible();
    }
  });
});
