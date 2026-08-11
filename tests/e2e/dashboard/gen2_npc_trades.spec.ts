import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 2 NPC Trades', () => {
  test('should display correctly for Gold save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=IN-GAME TRADES')).toBeVisible();

    await expect(page.getByText('ROCKY')).toBeVisible();
    await expect(page.getByText('MUSCLE')).toBeVisible();
  });
});
