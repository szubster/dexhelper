import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Living Dex Ghost Tracking E2E Validation', () => {
  test('ghost tracker evaluates missing Living Dex physical pokemon', async ({ page }) => {
    // Initialize with Yellow save
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Check main dashboard
    await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

    // Check assistant tab BEFORE turning on living dex
    const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
    if (await assistantLink.isVisible()) {
      await assistantLink.click();
    } else {
      await page.goto('assistant');
    }

    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // Now Turn on Living Dex
    await page.getByRole('button', { name: 'System Settings' }).click();

    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    const livingDexBtn = page.getByText('[ LIVING DEX ]');
    await livingDexBtn.click();

    await page.getByRole('button', { name: 'Close settings' }).click();

    await waitForSync(page);

    // Navigate back to assistant to ensure we're rendering correctly
    if (await assistantLink.isVisible()) {
      await assistantLink.click();
    } else {
      await page.goto('assistant');
    }
    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // The logic has switched from pokedex owned flags to physical possession in PC/party.
    // The UI should render without error and show suggestions based on this.
    const suggestionCard = page.locator('[data-testid="assistant-suggestion-card"]').first();
    await expect(suggestionCard).toBeVisible();
  });
});
