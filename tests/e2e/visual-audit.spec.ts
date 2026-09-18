import { expect, test } from '@playwright/test';
import { initializeWithSave, mockDagData, waitForSync } from './test-utils';

test.describe('Lens Visual Audit Suite', () => {
  test.beforeEach(async ({ page }) => {
    await mockDagData(page);
  });

  const routes = [
    { name: 'Home Route', path: '.' },
    { name: 'Dashboard Route', path: 'dashboard' },
    { name: 'Storage Route', path: 'storage' },
    { name: 'Assistant Route', path: 'assistant' },
    { name: 'DAG Route', path: 'dag' },
    { name: 'Safari Zone Route', path: 'safari-zone' },
    { name: 'Box Analyzer Route', path: 'box-analyzer' },
  ];

  for (const r of routes) {
    test(`Visual Audit — Route ${r.name}`, async ({ page, isMobile }) => {
      await initializeWithSave(page, 'tests/fixtures/yellow.sav');

      await page.goto(r.path);
      await waitForSync(page);
      await page.waitForTimeout(1000);

      // Verify page app container and layout root are loaded without JS errors
      await expect(page.locator('#root')).toBeVisible();

      // Ensure body has no unexpected horizontal overflow on mobile
      if (isMobile) {
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allow small subpixel variance
      }

      // Visual regression screenshot capture
      await expect(page).toHaveScreenshot(`visual-audit-${r.path.replace(/\//g, '_')}.png`, {
        fullPage: true,
      });
    });
  }

  test('Visual Audit — Save State Generation Testing (Gen 1 vs Gen 2 vs Gen 3)', async ({ page }) => {
    // Gen 1 Save Test
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');
    await page.goto('.');
    await waitForSync(page);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page).toHaveScreenshot('visual-audit-gen1-home.png', { fullPage: true });

    // Gen 2 Save Test
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('.');
    await waitForSync(page);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page).toHaveScreenshot('visual-audit-gen2-home.png', { fullPage: true });

    // Gen 3 Save Test
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await page.goto('.');
    await waitForSync(page);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page).toHaveScreenshot('visual-audit-gen3-home.png', { fullPage: true });
  });
});
