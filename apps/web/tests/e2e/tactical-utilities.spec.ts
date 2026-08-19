import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Utilities E2E', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies all tactical primitives are applied correctly', async ({ page }) => {
    await page.goto('/');
    await waitForSync(page);

    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'tactical-test-container';
      container.innerHTML = `
        <button class="tactical-button" id="test-tactical-button">Button</button>
        <div class="tactical-panel" id="test-tactical-panel">Panel</div>
        <div class="tactical-card" id="test-tactical-card">Card</div>
        <input class="tactical-input" id="test-tactical-input" value="Input" />
        <span class="tactical-text" id="test-tactical-text">Text</span>
        <button class="tactical-focus" id="test-tactical-focus">Focus</button>
      `;
      document.body.appendChild(container);
    });

    const button = page.locator('#test-tactical-button');
    await expect(button).toHaveCSS('border-radius', '0px');
    await expect(button).toHaveCSS('font-family', /ui-monospace|monospace/i);
    await expect(button).toHaveCSS('border-style', 'dashed');

    const panel = page.locator('#test-tactical-panel');
    await expect(panel).toHaveCSS('border-radius', '0px');
    await expect(panel).toHaveCSS('border-style', 'dashed');
    await expect(panel).toHaveCSS('font-family', /ui-monospace|monospace/i);

    const card = page.locator('#test-tactical-card');
    await expect(card).toHaveCSS('border-radius', '0px');
    await expect(card).toHaveCSS('border-style', 'dashed');
    await expect(card).toHaveCSS('font-family', /ui-monospace|monospace/i);

    const input = page.locator('#test-tactical-input');
    await expect(input).toHaveCSS('border-radius', '0px');
    await expect(input).toHaveCSS('border-style', 'dashed');
    await expect(input).toHaveCSS('font-family', /ui-monospace|monospace/i);
    await expect(input).toHaveCSS('text-transform', 'uppercase');

    const text = page.locator('#test-tactical-text');
    await expect(text).toHaveCSS('font-family', /ui-monospace|monospace/i);
    await expect(text).toHaveCSS('text-transform', 'uppercase');

    const focus = page.locator('#test-tactical-focus');
    await focus.focus();
    await expect(focus).toHaveCSS('outline-style', 'dashed');
  });
});
