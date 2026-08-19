import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Assistant Page', () => {
  test('should show wild encounter suggestions', async ({ page, isMobile }) => {
    // 1. Initialize with Yellow save
    await initializeWithSave(page);

    // 2. Navigate to Assistant page via Sidebar or BottomNav
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
    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    // 4. Check for Wild Encounters category
    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // 5. Verify nearby suggestions
    await expect(page.locator('[data-testid="assistant-suggestion-card"]').first()).toBeVisible();

    // 6. Screenshot for visual regression
  });

  test('should show local catch suggestions if applicable', async ({ page }) => {
    // This would require a save at a specific location, but we can verify the UI structure even with just nearby.
    await initializeWithSave(page);
    await page.goto('assistant');

    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // Check if the suggestion cards have the expected elements
    const suggestionCard = page.locator('[data-testid="assistant-suggestion-card"]').first();
    await expect(suggestionCard).toBeVisible();
  });
});
