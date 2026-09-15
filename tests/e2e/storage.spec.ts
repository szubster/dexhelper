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
  });
});
