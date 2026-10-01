import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Utilities E2E', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies CVA variants generate correct CSS classes on actual React components', async ({ page }) => {
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);

    const badgeIds = [
      '#badge-primary',
      '#badge-amber',
      '#badge-red',
      '#badge-zinc',
      '#badge-blue',
      '#badge-emerald',
      '#badge-rose',
      '#badge-pink',
    ];

    for (const id of badgeIds) {
      const badge = page.locator(id);
      await expect(badge).toBeVisible();
      await expect(badge).toHaveCSS('font-family', /ui-monospace|monospace/i);
      await expect(badge).toHaveCSS('border-style', 'dashed');
      await expect(badge).toHaveCSS('border-radius', '0px');
    }

    const buttonIds = [
      '#btn-default',
      '#btn-primary',
      '#btn-danger',
      '#btn-danger-outline',
      '#btn-secondary',
      '#btn-sidebar',
    ];

    for (const id of buttonIds) {
      const btn = page.locator(id);
      await expect(btn).toBeVisible();
      await expect(btn).toHaveCSS('font-family', /ui-monospace|monospace/i);
      await expect(btn).toHaveCSS('border-style', 'dashed');
      await expect(btn).toHaveCSS('border-radius', '0px');
    }

    const panelIds = [
      '#panel-emerald',
      '#panel-amber',
      '#panel-cyan',
      '#panel-red',
      '#panel-purple',
      '#panel-blue',
      '#panel-pink',
      '#panel-white',
      '#panel-default',
    ];

    for (const id of panelIds) {
      const panel = page.locator(id);
      await expect(panel).toBeVisible();
      await expect(panel).toHaveCSS('border-style', 'dashed');
      await expect(panel).toHaveCSS('border-radius', '0px');
    }

    const cardIds = [
      '[data-testid="card-default"]',
      '[data-testid="card-emerald"]',
      '[data-testid="card-amber"]',
      '[data-testid="card-storage-cyan"]',
      '[data-testid="card-storage-amber"]',
      '[data-testid="card-storage-red"]',
    ];

    for (const id of cardIds) {
      const card = page.locator(id);
      await expect(card).toBeVisible();
      await expect(card).toHaveCSS('border-style', 'dashed');
      await expect(card).toHaveCSS('border-radius', '0px');
    }

    const input = page.locator('#input-default');
    await expect(input).toBeVisible();
    await expect(input).toHaveCSS('border-style', 'dashed');
    await expect(input).toHaveCSS('border-radius', '0px');
    await expect(input).toHaveCSS('font-family', /ui-monospace|monospace/i);
  });
});
