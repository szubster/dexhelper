import { expect, type Page } from '@playwright/test';

/**
 * Initializes the Dexhelper app with a save file.
 * Defaults to Yellow version if no path is provided.
 */
export async function initializeWithSave(page: Page, savePath: string = 'tests/fixtures/yellow.sav') {
  await page.goto('.');

  // 1. Wait for the app to be "interactive" - either showing synced state or the upload button
  // We wait for the root layout to at least mount correctly.
  await expect(page.locator('header')).toBeVisible({ timeout: 15000 });

  // 2. Wait for initial synchronization to complete if any is happening
  await waitForSync(page);

  // 3. Check if we're already initialized (from storageState)
  // We use a shorter timeout here as we expect the state to be ready if it exists.
  const isInitialized = await page
    .getByText(/TRAINER/i)
    .first()
    .isVisible({ timeout: 2000 });

  if (!isInitialized) {
    // Wait for the file input to be available in AppLayout
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible({ timeout: 10000 });
    await fileInput.setInputFiles(savePath);

    // ⚡ Bolt: Wait for synchronization triggered by save upload
    await waitForSync(page);
  }

  // 4. Final verification: Trainer info and Pokedex should be visible
  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 20000 });
  await expect(page.getByTestId('pokedex-card').first()).toBeVisible({ timeout: 30000 });
}

/**
 * Wait for the IndexedDB synchronization process to finish.
 */
export async function waitForSync(page: Page) {
  // The overlay might not appear immediately (especially on fast machines)
  // or it might already be gone. We check for it but don't fail if it's not found.
  const overlay = page.getByTestId('sync-progress-overlay');

  try {
    // If the overlay appears within 3s, wait for it to be hidden.
    // If it takes longer than 3s, we assume it's not coming or already finished.
    const isVisible = await overlay.isVisible({ timeout: 3000 });
    if (isVisible) {
      await expect(overlay).toBeHidden({ timeout: 60000 });
    }
  } catch {
    // Timeout waiting for visibility is fine - it means sync was fast or unnecessary.
  }

  // Final wait for IndexedDB to be ready
  await page.waitForTimeout(1000);
}

/**
 * Clears LocalStorage and all IndexedDB databases.
 */
export async function clearStorage(page: Page) {
  await page.goto('.');
  await page.evaluate(async () => {
    localStorage.clear();
    const databases = (await window.indexedDB.databases?.()) || [];
    for (const db of databases) {
      if (db.name) window.indexedDB.deleteDatabase(db.name);
    }
  });
  await page.reload();
}
