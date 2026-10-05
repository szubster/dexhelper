import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('CVA Base Components Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies TacticalBadge visual regression across variants', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    const badgePrimary = page.locator('#badge-primary');
    await expect(badgePrimary).toBeVisible();
    await expect(badgePrimary).toHaveScreenshot('tactical-badge-primary.png');

    const badgeAmber = page.locator('#badge-amber');
    await expect(badgeAmber).toBeVisible();
    await expect(badgeAmber).toHaveScreenshot('tactical-badge-amber.png');

    const badgeRed = page.locator('#badge-red');
    await expect(badgeRed).toBeVisible();
    await expect(badgeRed).toHaveScreenshot('tactical-badge-red.png');

    const badgeZinc = page.locator('#badge-zinc');
    await expect(badgeZinc).toBeVisible();
    await expect(badgeZinc).toHaveScreenshot('tactical-badge-zinc.png');
  });

  test('verifies TacticalButton visual regression across variants', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    const btnDefault = page.locator('#btn-default');
    await expect(btnDefault).toBeVisible();
    await expect(btnDefault).toHaveScreenshot('tactical-button-default.png');

    const btnPrimary = page.locator('#btn-primary');
    await expect(btnPrimary).toBeVisible();
    await expect(btnPrimary).toHaveScreenshot('tactical-button-primary.png');

    const btnDanger = page.locator('#btn-danger');
    await expect(btnDanger).toBeVisible();
    await expect(btnDanger).toHaveScreenshot('tactical-button-danger.png');

    const btnSecondary = page.locator('#btn-secondary');
    await expect(btnSecondary).toBeVisible();
    await expect(btnSecondary).toHaveScreenshot('tactical-button-secondary.png');
  });

  test('verifies TacticalInput visual regression', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    const inputDefault = page.locator('#input-default');
    await expect(inputDefault).toBeVisible();
    await expect(inputDefault).toHaveScreenshot('tactical-input-default.png');
  });
});
