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

  // Wait for the app to hydrate and the database to sync
  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 10000 });

  // Wait for database sync completion (the 'Database Ready' state in SyncProgress)
  await expect(page.getByTestId('sync-status')).toContainText(/Database Ready/i, { timeout: 15000 });
}
