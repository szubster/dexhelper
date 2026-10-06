import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Base Components Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);
  });

  test('verifies TacticalBadge visual regression', async ({ page }) => {
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

  test('verifies TacticalButton visual regression', async ({ page }) => {
    const btnDefault = page.locator('#btn-default');
    await expect(btnDefault).toBeVisible();
    await expect(btnDefault).toHaveScreenshot('tactical-btn-default.png');

    const btnPrimary = page.locator('#btn-primary');
    await expect(btnPrimary).toBeVisible();
    await expect(btnPrimary).toHaveScreenshot('tactical-btn-primary.png');

    const btnDanger = page.locator('#btn-danger');
    await expect(btnDanger).toBeVisible();
    await expect(btnDanger).toHaveScreenshot('tactical-btn-danger.png');
  });

  test('verifies TacticalInput visual regression', async ({ page }) => {
    const input = page.locator('#input-default');
    await expect(input).toBeVisible();
    await expect(input).toHaveScreenshot('tactical-input-default.png');
  });

  test('verifies TacticalCard visual regression', async ({ page }) => {
    const cardDefault = page.locator('[data-testid="card-default"]');
    await expect(cardDefault).toBeVisible();
    await expect(cardDefault).toHaveScreenshot('tactical-card-default.png');

    const cardEmerald = page.locator('[data-testid="card-emerald"]');
    await expect(cardEmerald).toBeVisible();
    await expect(cardEmerald).toHaveScreenshot('tactical-card-emerald.png');
  });

  test('verifies TacticalPanel visual regression', async ({ page }) => {
    const panelEmerald = page.locator('#panel-emerald');
    await expect(panelEmerald).toBeVisible();
    await expect(panelEmerald).toHaveScreenshot('tactical-panel-emerald.png');

    const panelAmber = page.locator('#panel-amber');
    await expect(panelAmber).toBeVisible();
    await expect(panelAmber).toHaveScreenshot('tactical-panel-amber.png');
  });
});
