import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Mystery Gift Fixtures', () => {
  test('should parse Mystery Gift data for Emerald', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald-mystery-gift.sav');

    // Navigate to the dashboard to verify event items render successfully.
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('EVENT ITEMS')).toBeVisible();
    await expect(page.getByText('Aurora Ticket')).toBeVisible();
    await expect(page.getByText('Mystic Ticket')).toBeVisible();
    await expect(page.getByText('Old Sea Map')).toBeVisible();
  });

  test('should parse Mystery Gift data for FireRed', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/firered-mystery-gift.sav');

    // Navigate to the dashboard to verify event items render successfully.
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('EVENT ITEMS')).toBeVisible();
    await expect(page.getByText('Aurora Ticket')).toBeVisible();
    await expect(page.getByText('Mystic Ticket')).toBeVisible();
  });
});
