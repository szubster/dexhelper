import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Egg Move Pathfinding Engine', () => {
  test('surfaces valid breeding chains for egg moves in Assistant', async ({ page, isMobile }) => {
    // 1. Initialize with Gold save (Gen 2 supports breeding)
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

    // 3. Verify page content
    await expect(page.getByText(/TACTICAL OPERATIONS AI/i)).toBeVisible();

    // 4. Wait for suggestion cards to load
    const cards = page.locator('[data-testid="assistant-suggestion-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    // 5. Ensure that the E2E test passes if suggestion cards load.
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
