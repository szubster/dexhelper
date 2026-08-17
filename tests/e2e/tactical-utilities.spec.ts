import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Utilities E2E', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies tactical primitives are applied correctly', async ({ page }) => {
    await page.goto('/');
    await waitForSync(page);

    // Check tactical-button
    const buttons = page.locator('button');
    if ((await buttons.count()) > 0) {
      const button = buttons.first();
      await expect(button).toHaveCSS('border-radius', '0px');
      await expect(button).toHaveCSS('font-family', /ui-monospace|monospace/i);
    }

    // check tactical-panel
    const panel = page.locator('.tactical-panel').first();
    if (await panel.isVisible()) {
      await expect(panel).toHaveCSS('border-style', 'dashed');
      await expect(panel).toHaveCSS('border-radius', '0px');
    }
  });
});
