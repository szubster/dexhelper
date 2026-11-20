import { expect, test } from '@playwright/test';

test.describe('Palette Persona Style Verification', () => {
  test('safely loads page and finds tactical elements', async ({ page }) => {
    await page.goto('./');
    const headerEl = page.locator('header');
    const rootEl = page.locator('#root');
    await expect(headerEl.first().or(rootEl.first()).first()).toBeVisible({ timeout: 20000 });
  });
});
