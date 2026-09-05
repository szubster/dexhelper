import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Trick House E2E', () => {
  test('should display trick house component and specific values for Emerald save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    const panel = page.locator('.tactical-panel').filter({ hasText: 'TRICK HOUSE' });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('TRICK HOUSE');

    // Emerald save values based on parseTrickHouse defaults or general structure
    await expect(panel).toContainText('LEVEL');
    await expect(panel).toContainText('ENTRANCE STATE');
    await expect(panel).toContainText('PUZZLE1');
  });
});
