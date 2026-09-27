import { expect, test } from '@playwright/test';
import { initializeWithSave, mockDagData, waitForSync } from './test-utils';

test.describe('Lens Exploratory Visual & Layout Audit Suite', () => {
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
    test(`Exploratory Audit — Route ${r.name}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (err) => {
        consoleErrors.push(err.message);
      });

      await initializeWithSave(page, 'tests/fixtures/yellow.sav');
      await page.goto(r.path);
      await waitForSync(page);
      await page.waitForTimeout(500);

      // Verify page app container and layout root are loaded without crashing
      await expect(page.locator('#root')).toBeVisible();

      // Ensure viewport has no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // Check for broken tactical bracket wrapping where brackets wrap into isolated lines
      const brokenBrackets = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a, span, div'));
        const issues: string[] = [];
        for (const el of elements) {
          if (el.children.length === 0 && (el.textContent === '[' || el.textContent === ']')) {
            // Check if parent has multiple lines causing bracket separation
            const parent = el.parentElement;
            if (parent?.innerText && parent.innerText.split('\n').length > 2) {
              issues.push(`Isolated bracket in: ${parent.innerText.replace(/\n/g, ' ')}`);
            }
          }
        }
        return issues.slice(0, 5);
      });
      expect(brokenBrackets, `Broken bracket wrapping detected: ${brokenBrackets.join('; ')}`).toEqual([]);

      // Verify no fatal console errors during navigation
      const fatalErrors = consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('push to cloud failed'));
      expect(fatalErrors, `Console errors encountered on ${r.name}: ${fatalErrors.join('; ')}`).toEqual([]);
    });
  }

  test('Exploratory Audit — Interactive Exploration & Filter Toggles', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');
    await page.goto('.');
    await waitForSync(page);

    // Play with filters: toggle SECURED, MISSING, DEX_ONLY
    const filterSecured = page.getByTestId('filter-secured');
    if (await filterSecured.isVisible()) {
      await filterSecured.click();
      await page.waitForTimeout(300);
      await expect(page.locator('#root')).toBeVisible();

      // Click again to toggle off
      await filterSecured.click();
      await page.waitForTimeout(300);
    }

    // Play with search input
    const searchInput = page.getByPlaceholder(/search|enter/i).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Pikachu');
      await page.waitForTimeout(300);
      await expect(page.locator('#root')).toBeVisible();
      await searchInput.clear();
      await page.waitForTimeout(200);
    }

    // Ensure no horizontal overflow after interactions
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  test('Exploratory Audit — Cross-Generation Save State Switching', async ({ page }) => {
    // Gen 1 Save Test
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');
    await page.goto('.');
    await waitForSync(page);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.getByText(/GEN I/i).first()).toBeVisible();

    // Gen 2 Save Test
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('.');
    await waitForSync(page);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.getByText(/GEN II/i).first()).toBeVisible();

    // Gen 3 Save Test
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await page.goto('.');
    await waitForSync(page);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.getByText(/GEN III/i).first()).toBeVisible();
  });
});
