import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Mirage Island UI Tracker Component', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('verifies tracker rendering and aesthetic constraints (no match)', async ({ page }) => {
    // tests/fixtures/emerald.sav returns NO MATCH FOUND
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await page.waitForTimeout(1000);

    const trackerPanel = page.locator('[aria-label="Mirage Island Tracker"]');
    await expect(trackerPanel).toBeVisible({ timeout: 5000 });

    const hasCorrectStyles = await trackerPanel.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.borderRadius === '0px';
    });

    // Explicitly test the aesthetic constraint (sharp edges)
    expect(hasCorrectStyles).toBe(true);

    await expect(trackerPanel.getByText('MIRAGE ISLAND TRACKER')).toBeVisible();
    await expect(trackerPanel.getByText('SYS.MIRAGE_ISLAND')).toBeVisible();

    const statusLabel = trackerPanel.locator('div', { hasText: 'STATUS' }).last();
    await expect(statusLabel).toBeVisible();

    // Check DataPoint aesthetic constraints (dashed border)
    const statusDataPoint = trackerPanel.locator('div', { hasText: 'STATUS' }).last().locator('..').locator('..');
    const hasDashedBorder = await statusDataPoint.evaluate((el) => {
      return el.classList.contains('border-dashed') || el.closest('.border-dashed') !== null;
    });
    expect(hasDashedBorder).toBe(true);

    // Explicitly check for NO MATCH FOUND
    await expect(trackerPanel.getByText('NO MATCH FOUND', { exact: true })).toBeVisible();
  });
});
