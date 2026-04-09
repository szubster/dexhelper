import { expect, type Page } from '@playwright/test';
import path from 'path';

/**
 * Initializes the Dexhelper app with a standard save file (Yellow version).
 * This transitions the app from the "Uninitialized" state to the active Pokedex grid.
 */
export async function initializeWithSave(page: Page) {
  await page.goto('/');

  // Locate the file input (hidden inside the label)
  const fileInput = page.locator('input[type="file"]');

  // Upload the yellow.sav fixture
  // Note: Path is relative to the project root where playwright is executed
  await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));

  // Wait for the app to hydrate (the "Initialize Pokedex" label should disappear,
  // and the Trainer card should appear).
  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 10000 });
}
