import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 2 Checklist Integration', () => {
  test('should display correctly for Crystal save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('NARRATIVE EVENTS')).toBeVisible();
    await expect(page.getByText('STATIC ENCOUNTERS')).toBeVisible();
    await expect(page.getByText('DAILY / WEEKLY EVENTS')).toBeVisible();

    await expect(page.getByText('FALKNER')).toBeVisible();
    await expect(page.getByText('SUDOWOODO')).toBeVisible();
    await expect(page.getByText('MYSTERY GIFT', { exact: true })).toBeVisible();
  });
});
