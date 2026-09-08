import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../../test-utils';

test.describe('Gen 2 Breeding Mechanics E2E', () => {
  test('should display gender indicators and validate breeding pairs via UI rendering', async ({ page }) => {
    await clearStorage(page);

    const savePath = 'tests/fixtures/gold.sav';
    const saveBuffer = fs.readFileSync(savePath);
    const saveArray = new Uint8Array(saveBuffer);

    await initializeWithSave(page, saveArray);

    // Explicitly click the Dashboard tab via the main layout on the home screen
    await page.goto('.');

    // Some routes have a left menu or a bottom nav
    // Let's use the UI interactions tested in other E2E tests
    const navigationTab = page.locator('text=DASHBOARD').first();
    const hasNav = await navigationTab.isVisible();
    if (hasNav) {
      await navigationTab.click();
    } else {
      await page.goto('/dexhelper/dashboard');
    }

    // Now verify the breeding panel
    const breedingPanel = page.getByText('OPTIMAL BREEDING PAIRS').first();
    await expect(breedingPanel).toBeVisible({ timeout: 15000 });

    // Target the specific container for pairs
    const pairsContainer = breedingPanel.locator('..').locator('..');

    const emptyState = page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE').first();
    // Look for the specific card styles inside the panel
    const pairsCards = pairsContainer.locator('.border-dashed.bg-black\\/60').first();

    // Use locator.or() correctly to wait for either the empty state or the pairs to render
    await expect(emptyState.or(pairsCards).first()).toBeVisible({ timeout: 10000 });

    const isVisible = await pairsCards.isVisible();
    if (isVisible) {
      // Validate gender indicators are present inside the rendered cards
      const pairText = await pairsCards.textContent();
      expect(pairText).toMatch(/\([MF-]\)/);

      // Validate score rendering which implies egg group matching succeeded
      expect(pairText).toContain('SCORE:');
    }
  });
});
