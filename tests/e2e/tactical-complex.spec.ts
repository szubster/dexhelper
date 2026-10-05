import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Utilities E2E - Complex Components', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies TacticalModal visual regression', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    const openModalBtn = page.locator('#btn-open-modal');
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    await expect(modal).toHaveScreenshot('tactical-modal.png');

    const closeModalBtn = page.locator('#btn-close-modal');
    await expect(closeModalBtn).toBeVisible();
    await closeModalBtn.click();

    await expect(modal).toBeHidden();
  });
});
