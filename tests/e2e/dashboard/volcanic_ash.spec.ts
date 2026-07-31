import { expect, test } from '@playwright/test';
import { initializeWithSave } from '../test-utils';

test.describe('Gen 3 Volcanic Ash UI', () => {
  test('should verify the Volcanic Ash count renders correctly on the Assistant page', async ({ page, isMobile }) => {
    // Initialize app with the synthetic Gen 3 Emerald save file containing Volcanic Ash data
    await initializeWithSave(page, 'tests/fixtures/gen3/emerald-ash.sav');

    // Wait for the app to settle and verify it detected as Gen 3 Emerald.
    // The TRNR card should display something like "EMERALD" instead of "YELLOW".
    await expect(page.getByText('EMERALD').first()).toBeVisible({ timeout: 10000 });

    // Navigate to Assistant page
    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    // Verify Assistant page loaded
    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    // The diagnostics view is hidden by default behind the Debug Mode toggle.
    // Click "Toggle Debug Mode" to reveal diagnostics if not visible.
    const debugToggle = page.getByRole('button', { name: 'Toggle Debug Mode' });
    if (await debugToggle.isVisible()) {
      await debugToggle.click();
    }

    // Verify the SYS.DIAGNOSTICS block is visible
    await expect(page.getByText('[ SYS.DIAGNOSTICS ]')).toBeVisible({ timeout: 5000 });

    // Verify the Volcanic Ash label is visible
    await expect(page.getByText('Volcanic Ash')).toBeVisible();

    // Verify the exact ash count value we mocked (450)
    await expect(page.getByText('450', { exact: true })).toBeVisible();
  });
});
