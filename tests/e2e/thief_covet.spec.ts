import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Thief/Covet Optimizer UI', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should display Thief/Covet optimizer panel for Emerald save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Go to the dashboard
    await page.goto('./dashboard');

    // Wait for the main container to confirm load
    await expect(page.locator('main')).toBeVisible();

    // The dashboard utilizes lazy loaded components, evaluate scroll to ensure it mounts
    await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        window.scrollBy(0, 1000);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    });

    const panelHeader = page.getByText('THIEF/COVET OPTIMIZER', { exact: true }).first();
    await expect(panelHeader).toBeAttached({ timeout: 10000 });
    await panelHeader.scrollIntoViewIfNeeded();
    await expect(panelHeader).toBeVisible();

    // Verify it rendered the correct state
    const noCapable = page.getByText(/NO CAPABLE POKEMON DETECTED/i).first();
    const activeParty = page.getByText(/ACTIVE PARTY TEAM/i).first();
    const availableStorage = page.getByText(/AVAILABLE IN STORAGE/i).first();

    await expect(noCapable.or(activeParty).or(availableStorage).first()).toBeVisible();
  });
});
