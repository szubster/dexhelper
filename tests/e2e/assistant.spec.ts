import { expect, test } from '@playwright/test';
import { argosScreenshot } from '../../src/utils/argos';
import { initializeWithSave } from './test-utils';

test.describe('Assistant Page', () => {
  test('should show wild encounter suggestions', async ({ page }) => {
    // 1. Initialize with Yellow save
    await initializeWithSave(page);

    // 2. Navigate to Assistant page via Sidebar
    // Wait for sidebar to be interactive
    const assistantLink = page.getByRole('link', { name: /Assistant/i });
    await expect(assistantLink).toBeVisible();
    await assistantLink.click();

    // 3. Verify page content
    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    // 4. Check for Wild Encounters category
    // In Yellow, at the start (Pallet Town), there should be nearby suggestions even if not directly catchable in Pallet Town.
    // Pallet Town has no encounters in Yellow, but Route 1 is nearby.
    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // 5. Verify nearby suggestions (Route 1 is nearby)
    // We expect "Nearby Pokémon" to be visible
    await expect(page.getByText(/Nearby Pokémon/i)).toBeVisible();

    // 6. Screenshot for visual regression
    await argosScreenshot(page, 'assistant-nearby-suggestions');
  });

  test('should show local catch suggestions if applicable', async ({ page }) => {
    // This would require a save at a specific location, but we can verify the UI structure even with just nearby.
    await initializeWithSave(page);
    await page.goto('/assistant');

    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // Check if the suggestion cards have the expected elements
    const suggestionCard = page.locator('[data-testid="assistant-suggestion-card"]').first();
    await expect(suggestionCard).toBeVisible();
  });
});
