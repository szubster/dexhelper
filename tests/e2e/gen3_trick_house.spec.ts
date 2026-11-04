import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Trick House E2E', () => {
  test('should display trick house component and specific values for Emerald save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    const panel = page.locator('.tactical-panel').filter({ hasText: 'TRICK HOUSE' });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('TRICK HOUSE');

    // Emerald save values based on parseTrickHouse defaults or general structure
    await expect(panel).toContainText('LEVEL');
    await expect(panel).toContainText('ENTRANCE STATE');
    await expect(panel).toContainText('PUZZLE1');
  });

  test('should display specific values for ruby-vithuang save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    const panel = page.locator('.tactical-panel').filter({ hasText: 'TRICK HOUSE' });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('TRICK HOUSE');

    await expect(panel).toContainText('PUZZLE2>>6');
    await expect(panel).toContainText('PUZZLE8>>2');
  });

  test('should display specific values for ruby-vithuang-2 save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang-2.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    const panel = page.locator('.tactical-panel').filter({ hasText: 'TRICK HOUSE' });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('TRICK HOUSE');

    await expect(panel).toContainText('PUZZLE2>>6');
    await expect(panel).toContainText('PUZZLE3>>1');
    await expect(panel).toContainText('PUZZLE8>>2');
    await expect(panel).toContainText('ENTRANCE STATE>>2');
  });
});
