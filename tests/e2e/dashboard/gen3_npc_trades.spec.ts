import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 NPC Trades', () => {
  test('should display correctly for RSE save', async ({ page, isMobile }) => {
    // There are no Gen 3 fixtures available yet. So this will test that we can view the page and the dashboard isn't available for gen 1/2 saves.
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    if (!isMobile) {
      await expect(page.getByRole('link', { name: /SYS\.DASH/i })).toBeVisible();
    }

    await page.goto('./dashboard');
    await waitForSync(page);

    // RSE specific should not be visible here because it's a gen 2 save.
    await expect(page.locator('text=SYS.GEN3_IN_GAME_TRADES')).toBeHidden();
  });
});
