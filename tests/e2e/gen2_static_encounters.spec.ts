import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Static Encounters', () => {
  test('should display correctly for Gold save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    // Switch to Dashboard View to see checklists
    await page.goto('./dashboard');
    await waitForSync(page);

    // Test the dashboard checklist for Gold
    await expect(page.locator('text=STATIC ENCOUNTERS')).toBeVisible();

    // Check specific items based on the gold.sav
    // gold.sav might have some flags set, let's just make sure the items exist
    await expect(page.getByText('SUDOWOODO')).toBeVisible();
    await expect(page.getByText('SNORLAX')).toBeVisible();
    await expect(page.getByText('RED GYARADOS')).toBeVisible();
    await expect(page.getByText('HO-OH')).toBeVisible();
    await expect(page.getByText('LUGIA')).toBeVisible();
  });

  test('should display correctly for Crystal save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=STATIC ENCOUNTERS')).toBeVisible();
    await expect(page.getByText('SUDOWOODO')).toBeVisible();
    await expect(page.getByText('SNORLAX')).toBeVisible();
    await expect(page.getByText('RED GYARADOS')).toBeVisible();
    await expect(page.getByText('HO-OH')).toBeVisible();
    await expect(page.getByText('LUGIA')).toBeVisible();
  });
});
