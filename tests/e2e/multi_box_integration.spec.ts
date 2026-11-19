import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Multi-Box Search Integration E2E Tests (Retry)', () => {
  test('should dim non-matching Pokemon in PC Box when searching', async ({ page }) => {
    test.setTimeout(120000);
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    await page.goto('./box-analyzer');
    await waitForSync(page);

    await expect(page.getByText(/Box Search Engine/i)).toBeVisible({ timeout: 15000 });

    const searchInput = page.getByTestId('multi-box-search-input');
    await expect(searchInput).toBeVisible();

    const cards = page.locator('button.group.tactical-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const kinglerLine = 'KINGLER';

    const otherCards = cards.filter({ hasNotText: kinglerLine });
    const kinglerCard = cards.filter({ hasText: kinglerLine }).first();

    if ((await otherCards.count()) > 0) {
      await searchInput.fill(kinglerLine);
      await page.waitForTimeout(500); // give time for react deferred value to update

      // Kingler card should not be dimmed
      await expect(kinglerCard).not.toHaveClass(/opacity-20/);
      await expect(kinglerCard).not.toHaveClass(/grayscale/);

      // Other cards should be dimmed
      await expect(otherCards.first()).toHaveClass(/opacity-20/);
      await expect(otherCards.first()).toHaveClass(/grayscale/);
    }
  });

  test('should ensure spatial organization remains unbroken', async ({ page }) => {
    test.setTimeout(120000);
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    await page.goto('./box-analyzer');
    await waitForSync(page);

    const cards = page.locator('button.group.tactical-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const initialCount = await cards.count();

    const searchInput = page.getByTestId('multi-box-search-input');
    await expect(searchInput).toBeVisible();

    // Fill with a query that matches something
    await searchInput.fill('KINGLER');
    await page.waitForTimeout(500);

    // The number of cards should remain the same (spatial organization unbroken)
    const afterSearchCount = await cards.count();
    expect(afterSearchCount).toBe(initialCount);
  });
});
