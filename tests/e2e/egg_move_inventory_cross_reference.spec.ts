import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Egg Move Inventory Cross-Reference', () => {
  test('surfaces missing links in breeding chains correctly', async ({ page, isMobile }) => {
    // 1. Initialize with Gold save
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    // 2. Navigate to Assistant page
    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    // 3. Wait for cards
    const cards = page.locator('[data-testid="assistant-suggestion-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    // 4. Validate that missing links are surfaced by the engine
    // (a fresh gold save missing many breeding dependencies should trigger warnings)
    const hasMissing = await page.getByText(/Missing/i).count();
    expect(hasMissing).toBeGreaterThan(0);
  });
});
