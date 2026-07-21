import { expect, test } from '@playwright/test';
import { initializeWithSave } from '../test-utils';

test.describe('Global Ribbon Dashboard', () => {
  test('should not show Global Ribbon Dashboard link for Gen 1/2 saves', async ({ page }) => {
    // Navigate using a Gen 2 save where the dashboard link should be hidden
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await expect(page.getByRole('link', { name: /SYS\.DASH/i })).toBeHidden();
  });

  test.skip('should show Global Ribbon Checklist for Gen 3 saves', async () => {
    // TODO: Implement once a Gen 3 fixture is available.
    // await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    // await page.getByRole('link', { name: /SYS\.DASH/i }).click();
    // await expect(page.getByText('GLOBAL RIBBON CHECKLIST')).toBeVisible();
  });
});
