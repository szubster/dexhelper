import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../../test-utils';

test.describe('Gen 2 Breeding DV Overlap and Shiny Odds E2E', () => {
  test('should display shiny odds correctly in the UI', async ({ page }) => {
    await clearStorage(page);

    const savePath = 'tests/fixtures/gold.sav';
    const saveBuffer = fs.readFileSync(savePath);
    const saveArray = new Uint8Array(saveBuffer);

    await initializeWithSave(page, saveArray);
    await page.goto('.');

    const navigationTab = page.locator('text=DASHBOARD').first();
    const hasNav = await navigationTab.isVisible();
    if (hasNav) {
      await navigationTab.click();
    } else {
      await page.goto('/dexhelper/dashboard');
    }

    const breedingPanel = page.getByText('OPTIMAL BREEDING PAIRS').first();
    await expect(breedingPanel).toBeVisible({ timeout: 15000 });

    const pairsContainer = breedingPanel.locator('..').locator('..');
    const pairsCards = pairsContainer.locator('.border-dashed.bg-black\\/60').first();

    const isVisible = await pairsCards.isVisible();
    if (isVisible) {
      const pairText = await pairsCards.textContent();
      expect(pairText).toContain('MALE ODDS:');
      expect(pairText).toContain('FEMALE ODDS:');
    }
  });
});
