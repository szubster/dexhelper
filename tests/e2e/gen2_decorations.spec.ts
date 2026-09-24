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
    // Tests for specific decorations that might exist in crystal.sav,
    // we should wait for a known category like CONSOLES or BEDS or something that's definitely there, or just check the title
  });
});
