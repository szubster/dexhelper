import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Decorations E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should display Gen 2 decorations correctly for Crystal save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('ROOM DECORATIONS').first()).toBeVisible();
    await expect(page.getByText('ACTIVE').first()).toBeVisible();
    await expect(page.getByText('UNLOCKED').first()).toBeVisible();
  });
});
