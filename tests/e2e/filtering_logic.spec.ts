import { test, expect } from '@playwright/test';
import { argosScreenshot } from '../../src/utils/argos';
import { initializeWithSave } from './test-utils';

test.describe('Filtering Logic', () => {
  // Every test in this suite starts with an initialized Pokedex (Yellow version save)
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page);
  });

  test('should filter by name successfully', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search Pokedex by name or ID/i);
    await searchInput.fill('Pikachu');

    // Pikachu (ID 25) should be visible
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();
    
    // Bulbasaur (ID 1) should be hidden
    await expect(page.locator('[data-pokemon-id="1"]')).not.toBeVisible();

    await argosScreenshot(page, 'filter-name-pikachu');
  });

  test('should filter by Secured (Owned) status', async ({ page }) => {
    // 1. Toggle "Owned" filter
    await page.getByTestId('filter-secured').click();

    // 2. Pikachu (ID 25) is in our Yellow save fixture (Party/Box), should be visible
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();

    // 3. Bulbasaur (ID 1) is NOT in Yellow save by default, should be hidden
    await expect(page.locator('[data-pokemon-id="1"]')).not.toBeVisible();

    await argosScreenshot(page, 'filter-status-secured');
  });

  test('should filter by Missing status', async ({ page }) => {
    // 1. Toggle "Missing" filter
    await page.getByTestId('filter-missing').click();

    // 2. Bulbasaur (ID 1) should be visible (Missing)
    await expect(page.locator('[data-pokemon-id="1"]')).toBeVisible();

    // 3. Pikachu (ID 25) should be hidden (Owned)
    await expect(page.locator('[data-pokemon-id="25"]')).not.toBeVisible();

    await argosScreenshot(page, 'filter-status-missing');
  });
});
