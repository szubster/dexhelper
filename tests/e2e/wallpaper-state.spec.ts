import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Gen 3 Wallpaper State Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('should persist wallpaper unlock state across reloads', async ({ page }) => {
    // Wait for initial load
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible();

    // Interact with the Zustand store to toggle a wallpaper for a specific save file
    await page.evaluate(() => {
      // The UI for the wallpaper dashboard doesn't exist yet, so we interact directly with localStorage
      const storageKey = 'dexhelper-settings';
      const storageData = localStorage.getItem(storageKey);
      const parsed = storageData ? JSON.parse(storageData) : { state: {} };
      if (!parsed.state) parsed.state = {};
      if (!parsed.state.unlockedWallpapers) parsed.state.unlockedWallpapers = {};
      if (!parsed.state.unlockedWallpapers[12345]) parsed.state.unlockedWallpapers[12345] = {};
      parsed.state.unlockedWallpapers[12345][5] = true;
      localStorage.setItem(storageKey, JSON.stringify(parsed));
    });

    // Reload the page
    await page.reload();

    // Wait for load again
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible();

    // Verify localStorage still contains the persisted state
    const persistedState = await page.evaluate(() => {
      const storageKey = 'dexhelper-settings';
      const storageData = localStorage.getItem(storageKey);
      if (!storageData) return null;

      const parsed = JSON.parse(storageData);
      return parsed.state?.unlockedWallpapers?.[12345]?.[5];
    });

    expect(persistedState).toBe(true);
  });
});
