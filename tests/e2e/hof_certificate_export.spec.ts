import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Hall of Fame Certificate Export', () => {
  test('should trigger image generation and initiate download when export button is clicked', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    await page.waitForTimeout(2000);

    const dashboardLink = page.getByRole('link', { name: /Dashboard/i });
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click();
    } else {
      await page.goto('./dashboard');
    }

    await page.waitForTimeout(1000);

    const container = page.locator('#hof-certificate-hidden-container');
    await expect(container).toBeAttached();

    const exportBtn = page.getByRole('button', { name: /EXPORT CERTIFICATE/i });
    await expect(exportBtn).toBeVisible();

    const [download] = await Promise.all([page.waitForEvent('download'), exportBtn.click()]);

    expect(download.suggestedFilename()).toContain('hall_of_fame_');
    expect(download.suggestedFilename()).toMatch(/hall_of_fame_.*_\w+\.png/);

    const generateBtn = page.getByRole('button', { name: /GENERATING.../i });
    if (await generateBtn.isVisible()) {
      await expect(exportBtn).toHaveText(/EXPORT CERTIFICATE/i);
    }
  });
});
