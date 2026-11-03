import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Missed Items Dashboard', () => {
  test('should not show Gen 3 Missed Items Dashboard for Gen 1/2 saves', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    await page.goto('./gen3-dashboard');
    await waitForSync(page);

    await expect(page.getByText('Missed Items & Milestones')).toBeHidden();
  });

  test('should show Gen 3 Missed Items Dashboard for Gen 3 saves and extract data', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/saves/gen3/emerald_vithuang.sav');

    await page.goto('./gen3-dashboard');
    await waitForSync(page);

    await expect(page.getByText('Missed Items & Milestones')).toBeVisible();
    await expect(page.getByText('Master Ball Status')).toBeVisible();
    await expect(page.getByText('Missed Legendaries')).toBeVisible();
  });
});
