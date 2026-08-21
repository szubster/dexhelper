import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 NPC Trades', () => {
  test('should display correctly for RSE save', async ({ page, isMobile }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    if (!isMobile) {
      await expect(page.getByRole('link', { name: /SYS\.DASH/i })).toBeVisible();
    }

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=IN-GAME TRADES').first()).toBeVisible();
  });
});
