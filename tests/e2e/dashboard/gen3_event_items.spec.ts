import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Event Items Dashboard', () => {
  test('should not show Gen 3 Event Items Dashboard for Gen 1/2 saves', async ({ page }) => {
    // Navigate using a Gen 2 save where the dashboard link should be hidden
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Attempt to navigate to the dashboard route
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('EVENT ITEMS')).toBeHidden();
  });

  test.skip('should show Gen 3 Event Items Dashboard for Gen 3 saves', async () => {
    // TODO: Implement once a reliable Gen 3 fixture with Event Items is available.
    // await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    // await page.getByRole('link', { name: /SYS\.DASH/i }).click();
    // await expect(page.getByText('EVENT ITEMS')).toBeVisible();
  });
});
