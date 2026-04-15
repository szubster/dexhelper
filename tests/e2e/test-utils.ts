import { expect, type Page } from '@playwright/test';

/**
 * Initializes the Dexhelper app with a save file.
 * Defaults to Yellow version if no path is provided.
 */
export async function initializeWithSave(page: Page, savePath: string = 'tests/fixtures/yellow.sav') {
  await page.goto('.');

  // 1. Wait for initial synchronization to complete
  await waitForSync(page);

  // 2. If we're already initialized (from storageState), TRAINER should be visible
  const isInitialized = await page
    .getByText(/TRAINER/i)
    .first()
    .isVisible();

  if (!isInitialized) {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(savePath);
    // ⚡ Bolt: Wait for synchronization triggered by save upload
    await waitForSync(page);
  }

  // 3. Wait for the app to hydrate and the trainer info to be visible
  await expect(page.getByText(/TRAINER/i).first()).toBeVisible({ timeout: 20000 });

  // 4. Final verification: Pokedex should have items.
  // We wait for a card to be visible, ensuring the grid has rendered.
  await expect(page.getByTestId('pokedex-card').first()).toBeVisible({ timeout: 30000 });
}

/**
 * Wait for the IndexedDB synchronization process to finish.
 */
export async function waitForSync(page: Page) {
  // The overlay might not appear immediately. We wait up to 5s for it to show.
  // If it shows, we wait up to 60s for it to finish (syncing 251 pokemon + locations).
  const overlay = page.getByTestId('sync-progress-overlay');

  try {
    // We check visibility with a reasonable timeout
    const isVisible = await overlay.isVisible({ timeout: 5000 });
    if (isVisible) {
      await expect(overlay).toBeHidden({ timeout: 60000 });
    }
  } catch (_e) {
    // If it never appeared, it's either already synced or sync hasn't started.
    // We don't want to fail here, but we'll log it if it's a real error.
  }
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
