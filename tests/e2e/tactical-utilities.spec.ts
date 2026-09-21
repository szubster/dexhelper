import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Tactical Utilities E2E', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('verifies all tactical primitives are applied correctly', async ({ page }) => {
    await page.goto('.');
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

  test('verifies CVA tactical variants applied correctly', async ({ page }) => {
    // Navigate to dashboard which renders various variants
    await page.goto('.');
    await waitForSync(page);

    // We navigate to a view we know has badges, e.g., pokemon details
    await page.getByTestId('pokedex-card').first().click();

    // Since we can't mount React components in Playwright E2E and we don't have a Kitchen Sink test route,
    // we use `evaluate` to manually create DOM nodes that perfectly mirror the React component's CVA output
    // to test that the rendered classes correctly resolve to the intended CSS properties.
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'cva-tactical-variants-container';
      container.style.position = 'absolute';
      container.style.zIndex = '9999';
      container.style.background = 'black';

      const badgeVariantsHtml = `
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]" id="badge-primary">Primary Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-amber-500/10 bg-amber-500/5 text-amber-500/60" id="badge-amber">Amber Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-red-500/10 bg-red-500/5 text-red-500/60" id="badge-red">Red Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-zinc-800 bg-zinc-950 text-zinc-500" id="badge-zinc">Zinc Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-blue-500/50 bg-blue-500/10 text-blue-400" id="badge-blue">Blue Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-emerald-500/50 bg-emerald-500/10 text-emerald-400" id="badge-emerald">Emerald Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-rose-500/50 bg-rose-500/10 text-rose-400" id="badge-rose">Rose Badge</span>
        <span class="tactical-badge inline-flex flex-row px-2 py-1 text-[8px] border-pink-500/10 bg-pink-500/5 text-pink-400/60" id="badge-pink">Pink Badge</span>
      `;

      const buttonVariantsHtml = `
        <button class="tactical-button group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-black border-white/20 bg-zinc-900/50 text-zinc-500 hover:border-white/40 hover:bg-zinc-800/80 hover:text-white focus-visible:ring-[var(--theme-primary)] px-5 py-3 text-[10px]" id="btn-default">Default Button</button>
        <button class="tactical-button group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-black border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-zinc-950 focus-visible:ring-[var(--theme-primary)] px-5 py-3 text-[10px]" id="btn-primary">Primary Button</button>
        <button class="tactical-button group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-black border-red-500 bg-red-950/50 text-red-500 hover:bg-red-900/50 focus-visible:ring-red-500 px-5 py-3 text-[10px]" id="btn-danger">Danger Button</button>
        <button class="tactical-button group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-black border-red-900/50 bg-red-950/20 text-red-500/80 hover:border-red-500/50 hover:bg-red-950/40 hover:text-red-400 focus-visible:ring-red-500 px-5 py-3 text-[10px]" id="btn-danger-outline">Danger Outline Button</button>
        <button class="tactical-button group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-black border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 focus-visible:ring-[var(--theme-primary)] px-5 py-3 text-[10px]" id="btn-secondary">Secondary Button</button>
        <button class="tactical-button group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden font-black border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10 hover:text-[var(--theme-primary)] focus-visible:ring-[var(--theme-primary)] px-5 py-3 text-[10px]" id="btn-sidebar">Sidebar Button</button>
      `;

      container.innerHTML = badgeVariantsHtml + buttonVariantsHtml;
      document.body.appendChild(container);
    });

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
  });
});
