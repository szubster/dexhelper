import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('CVA Visual Regression Base Components', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('matches baseline snapshots for buttons, badges, and inputs', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    const sinkLocator = page.locator('.flex.flex-col.gap-4.p-4');
    await expect(sinkLocator).toBeVisible();

    // Take snapshot of the entire kitchen sink which contains all the base component variations
    await expect(sinkLocator).toHaveScreenshot('base-cva-components.png', {
      maxDiffPixelRatio: 0.1,
    });
  });
});
