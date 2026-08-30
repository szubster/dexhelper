import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Room Decorations', () => {
  test('should display correctly for Gold save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=ROOM DECORATIONS')).toBeVisible();

    const decoElement = page.getByText(/\[ ACTIVE \]/).first();
    await expect(decoElement).toBeVisible();
  });

  test('should display correctly for Crystal save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=ROOM DECORATIONS')).toBeVisible();

    await expect(page.locator('text=BED')).toBeVisible();
    await expect(page.locator('text=CARPET')).toBeVisible();
  });
});
