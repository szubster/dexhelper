import { expect, test } from '@playwright/test';
import path from 'path';
import { argosScreenshot } from '../../src/utils/argos';

test.describe('Save Management', () => {
  test('should upload a save file and persist it on reload', async ({ page }) => {
    await page.goto('/');

    // 1. Initial State: Should show "Initialize Pokedex" button (clean state)
    await expect(page.getByText(/Initialize Pokedex/i)).toBeVisible();
    await argosScreenshot(page, 'save-initial-state');

    // 2. Upload Yellow Save
    // The input is hidden inside a label, but locator('input[type="file"]') should find it.
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));

    // 3. Verify Hydration: Pokedex grid should appear (Wait for Pikachu)
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();

    // 4. Verify Trainer Info in Header
    await expect(
      page
        .locator('header')
        .getByText(/TRAINER/i)
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator('header')
        .getByText(/YELLOW/i)
        .first(),
    ).toBeVisible();

    // 5. Persistence: Reload page
    await page.reload();

    // 6. Verify it's still hydrated (persisted in localStorage)
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();
    await expect(
      page
        .locator('header')
        .getByText(/TRAINER/i)
        .first(),
    ).toBeVisible();

    await argosScreenshot(page, 'save-persisted-yellow');
  });
});
