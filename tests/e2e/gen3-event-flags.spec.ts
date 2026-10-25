import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen3 Event Flags', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies Gen3 Event Flags render correctly in kitchen sink', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);

    // Explicitly scroll down to bottom since it's added at the bottom
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await page.waitForTimeout(100);
    }

    const container = page.locator('text="Gen 3 Event Flags"').locator('..');
    await expect(container).toBeVisible();

    await expect(container.getByText('EON TICKET')).toBeVisible();
    await expect(container.getByText('MYSTIC TICKET')).toBeVisible();
    await expect(container.getByText('AURORA TICKET')).toBeVisible();
    await expect(container.getByText('OLD SEA MAP')).toBeVisible();
  });
});
