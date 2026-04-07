import { test, expect } from '@playwright/test';
import { argosScreenshot } from '../../src/utils/argos';

test.describe('Filtering Logic', () => {
  test('should filter by name successfully', async ({ page }) => {
    await page.goto('/');

    // 1. Upload Yellow Save
    const saveFilePath = 'tests/fixtures/yellow.sav';
    await page.locator('input[type="file"]').first().setInputFiles(saveFilePath);

    // 2. Initial State (All Pokemon showing)
    await expect(page.getByText('PIKACHU')).toBeVisible();
    await argosScreenshot(page, 'filter-initial-all');

    // 3. Search for "Pikachu"
    const searchInput = page.getByPlaceholder('Search');
    await searchInput.fill('PIKACHU');
    await expect(page.getByText('PIKACHU')).toBeVisible();
    await expect(page.getByText('BULBASAUR')).not.toBeVisible();
    await argosScreenshot(page, 'filter-search-pikachu');

    // 4. Clear Search
    await searchInput.fill('');
    await expect(page.getByText('BULBASAUR')).toBeVisible();
  });

  test('should filter by Secured (Owned) status', async ({ page }) => {
    await page.goto('/');
    const saveFilePath = 'tests/fixtures/yellow.sav';
    await page.locator('input[type="file"]').first().setInputFiles(saveFilePath);

    const securedBtn = page.getByTestId('filter-secured');
    await securedBtn.click();
    
    // In Yellow, Pikachu (ID 25) should be Secured
    await expect(page.locator('[data-testid="pokedex-card"][data-pokemon-id="25"]')).toBeVisible();
  });

  test('should filter by Missing status', async ({ page }) => {
    await page.goto('/');
    const saveFilePath = 'tests/fixtures/yellow.sav';
    await page.locator('input[type="file"]').first().setInputFiles(saveFilePath);
    
    const missingBtn = page.getByTestId('filter-missing');
    await missingBtn.click();
    
    // Pikachu (Secured) should NOT be visible
    await expect(page.locator('[data-testid="pokedex-card"][data-pokemon-id="25"]')).not.toBeVisible();
    
    await argosScreenshot(page, 'filter-missing-active');
  });
});
