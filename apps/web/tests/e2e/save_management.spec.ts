import path from 'node:path';
import { expect, test } from '@playwright/test';
import { clearStorage, waitForSync } from './test-utils';

test.describe('Save Management', () => {
  test('should upload a save file and persist it on reload', async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');
    await waitForSync(page);

    // 1. Initial State: Should show "Initialize Pokedex" button (clean state)
    await expect(page.getByText(/\[ UPLOAD\.SYS \]/i)).toBeVisible();

    // 2. Upload Yellow Save
    // The input is hidden inside a label, but locator('input[type="file"]') should find it.
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));

    // 3. Verify Hydration: Pokedex grid should appear (Wait for Pikachu)
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();

    // 4. Verify Trainer Info in Header
    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible();
    await expect(
      page
        .locator('header')
        .getByText(/YELLOW/i)
        .first(),
    ).toBeVisible();

    // 5. Persistence: Reload page
    await page.reload();
    await waitForSync(page);

    // 6. Verify it's still hydrated (persisted in localStorage)
    await expect(page.locator('[data-pokemon-id="25"]')).toBeVisible();
    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible();
  });

  test('should display an error when uploading an invalid save file', async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');
    await waitForSync(page);

    await expect(page.getByText(/\[ UPLOAD\.SYS \]/i)).toBeVisible();

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'invalid.sav'));

    await expect(page.getByText(/Failed to parse save file\./i)).toBeVisible();
  });
});
