import { expect, type Page } from '@playwright/test';

/**
 * Initializes the Dexhelper app with a save file.
 * Defaults to Yellow version if no path is provided.
 */
export async function initializeWithSave(page: Page, savePath: string = 'tests/fixtures/yellow.sav') {
  await page.goto('/');

  // Locate the file input (hidden inside the label)
  const fileInput = page.locator('input[type="file"]');

  // Upload the save fixture
  await fileInput.setInputFiles(savePath);

  // Wait for the app to hydrate
  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 10000 });
}
