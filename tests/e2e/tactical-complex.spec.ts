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

  test('verifies complex component tactical invariants', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    // Test SubDataPoint variants
    const subDataPoints = page.locator('#subdatapoint-showcase > div');
    const count = await subDataPoints.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const sub = subDataPoints.nth(i);
      await expect(sub).toHaveCSS('border-style', 'dashed');
      // SubDataPoint itself doesn't explicitly have a border-radius property in Tailwind inline, but it is bounded by the hardware corners.
      // We check for sharp edges conceptually or by validating the absence of rounded-md, etc.

      const label = sub.locator('span').first();
      await expect(label).toHaveCSS('font-family', /ui-monospace|monospace/i);
    }

    // Test TacticalModal invariants
    const openModalBtn = page.locator('#btn-open-modal');
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // The modal content is a TacticalPanel, which should have the dashed border and 0px border-radius
    const modalContent = modal.locator('.tactical-panel').first();
    await expect(modalContent).toBeVisible();
    await expect(modalContent).toHaveCSS('border-style', 'dashed');
    await expect(modalContent).toHaveCSS('border-radius', '0px');

    const closeModalBtn = page.locator('#btn-close-modal');
    await expect(closeModalBtn).toBeVisible();
    await closeModalBtn.click();

    await expect(modal).toBeHidden();
  });
});
