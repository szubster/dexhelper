import { test, expect } from '@playwright/test';
import { argosScreenshot } from '../../src/utils/argos';

test.describe('Save Management', () => {
  test('should upload a save file and persist it on reload', async ({ page }) => {
    await page.goto('/');

    // 1. Initial State
    await expect(page.getByText('Initialize Pokedex')).toBeVisible();
    await argosScreenshot(page, 'initial-state');

    // 2. Upload Save
    const saveFilePath = 'tests/fixtures/yellow.sav';
    await page.locator('input[type="file"]').first().setInputFiles(saveFilePath);

    // 3. Verify Trainer Info (Wait for the data to be parsed and UI to update)
    // Trainer Name and ID are displayed in the header
    await expect(page.locator('header').getByText('Trainer', { exact: true }).first()).toBeVisible();
    
    // 4. Verify Pokedex Grid
    // Check for a specific pokemon that should be caught/seen in yellow.sav
    // #025 Pikachu is a safe bet for Yellow
    await expect(page.getByText('PIKACHU')).toBeVisible();

    // 5. Visual Check after upload
    await argosScreenshot(page, 'save-loaded');

    // 6. Reload and Verify Persistence
    await page.reload();
    await expect(page.getByText('PIKACHU')).toBeVisible();
    await expect(page.locator('header').getByText('Trainer', { exact: true }).first()).toBeVisible();
    
    // 7. Visual Check after reload
    await argosScreenshot(page, 'save-persisted');
  });
});
