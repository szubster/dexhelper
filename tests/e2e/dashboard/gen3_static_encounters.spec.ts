import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Static Encounters Dashboard', () => {
  test('should not show Gen 3 Static Encounters Dashboard link for Gen 1/2 saves', async ({ page }) => {
    // Navigate using a Gen 2 save where the dashboard link should be hidden
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Attempt to navigate to the dashboard route
    await expect(page.getByRole('link', { name: /SYS\.DASH/i })).toBeHidden();
  });

  test('should show Gen 3 Static Encounters Dashboard for Gen 3 saves', async ({ page, isMobile }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    if (!isMobile) {
      await expect(page.getByRole('link', { name: /SYS\.DASH/i })).toBeVisible();
    } else {
      await expect(page.getByRole('link', { name: /DASH/i })).toBeVisible();
    }

    await page.goto('./dashboard');
    await waitForSync(page);
    await expect(page.getByText('STATIC ENCOUNTERS DB')).toBeVisible();
  });
});
