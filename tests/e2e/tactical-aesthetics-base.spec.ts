import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Aesthetics E2E - Base Components', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
    await page.goto('./?kitchen_sink=1');
    await waitForSync(page);
    await page.waitForTimeout(500);
  });

  test('verifies base components adhere to tactical invariants (sharp edges, dashed borders, monospaced fonts)', async ({ page }) => {
    // TacticalBadge
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
      const el = page.locator(id);
      await expect(el).toBeVisible();
      await expect(el).toHaveCSS('font-family', /ui-monospace|monospace/i);
      await expect(el).toHaveCSS('border-style', 'dashed');
      await expect(el).toHaveCSS('border-radius', '0px');
    }

    // TacticalButton
    const buttonIds = [
      '#btn-default',
      '#btn-primary',
      '#btn-danger',
      '#btn-danger-outline',
      '#btn-secondary',
      '#btn-sidebar',
    ];

    for (const id of buttonIds) {
      const el = page.locator(id);
      await expect(el).toBeVisible();
      await expect(el).toHaveCSS('font-family', /ui-monospace|monospace/i);
      await expect(el).toHaveCSS('border-style', 'dashed');
      await expect(el).toHaveCSS('border-radius', '0px');
    }

    // TacticalInput
    const inputIds = [
      '#input-default'
    ];

    for (const id of inputIds) {
      const el = page.locator(id);
      await expect(el).toBeVisible();
      await expect(el).toHaveCSS('font-family', /ui-monospace|monospace/i);
      await expect(el).toHaveCSS('border-style', 'dashed');
      await expect(el).toHaveCSS('border-radius', '0px');
    }

    // TacticalCard
    const cardIds = [
      '[data-testid="card-default"]',
      '[data-testid="card-emerald"]',
      '[data-testid="card-amber"]',
      '[data-testid="card-storage-cyan"]',
      '[data-testid="card-storage-amber"]',
      '[data-testid="card-storage-red"]',
    ];

    for (const id of cardIds) {
      const el = page.locator(id);
      await expect(el).toBeVisible();
      await expect(el).toHaveCSS('border-style', 'dashed');
      await expect(el).toHaveCSS('border-radius', '0px');
    }

    // TacticalPanel
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
      const el = page.locator(id);
      await expect(el).toBeVisible();
      await expect(el).toHaveCSS('border-style', 'dashed');
      await expect(el).toHaveCSS('border-radius', '0px');
    }
  });
});
