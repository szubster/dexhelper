import { expect, type Page } from '@playwright/test';

/**
 * Initializes the Dexhelper app with a save file.
 * Defaults to Yellow version if no path is provided.
 */
export async function initializeWithSave(page: Page, savePath: string = 'tests/fixtures/yellow.sav') {
  await page.goto('/');

  // If we're already initialized (from storageState), TRAINER should be visible
  const isInitialized = await page
    .getByText(/TRAINER/i)
    .first()
    .isVisible();

  if (!isInitialized) {
    // Locate the file input (hidden inside the label)
    const fileInput = page.locator('input[type="file"]');
    // Upload the save fixture
    await fileInput.setInputFiles(savePath);
  }

  // Wait for the app to hydrate and the trainer info to be visible
  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 15000 });

  // Final verification: Pokedex should should have some items if ready
  // This is a more reliable way to know sync is done than checking the transient SyncProgress
  await expect(page.getByTestId('pokedex-card').first()).toBeVisible({ timeout: 15000 });
}
