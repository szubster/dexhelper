import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Hall of Fame Certificate Rendering', () => {
  test('should render the certificate with correct mock state and typography after font loading', async ({ page }) => {
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

    await expect(container).toHaveClass(/flex/);

    await expect(container.locator('text=HALL OF FAME')).toBeVisible();
    await expect(container.locator('text=VERSION: BLUE')).toBeVisible();

    await expect(container.locator('text=TRAINER:')).toBeVisible();

    await expect(container.locator('text=Lvl').first()).toBeVisible();

    await expect(container.locator('.animate-pulse')).toHaveCount(6);
  });
});
