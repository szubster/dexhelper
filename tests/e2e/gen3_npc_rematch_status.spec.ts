import { expect, test } from '@playwright/test';
import type { SaveData } from '../src/engine/saveParser/parsers/common';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 NPC Rematch Status E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('displays available and battled statuses correctly for secret base rematches', async ({ page }) => {
    // 1. Initialize with an emerald save so the basic Gen 3 app components mount.
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // 2. Explicitly navigate to the dashboard where the Secret Base Rematches component is rendered
    await page.goto('./dashboard');

    // 3. Wait for the initial app load and save parsing to complete.
    await waitForSync(page);

    const isStateInjected = await page.evaluate(() => {
      // Find the zustand store, which Dexhelper exposes as window.useStore
      const store = (
        window as unknown as {
          useStore: { getState: () => { saveData: SaveData }; setState: (state: unknown) => void };
        }
      ).useStore;
      if (!store) return false;
      const state = store.getState();
      if (!state?.saveData) return false;

      // React to the mutation by explicitly calling setState so components re-render!
      store.setState({
        saveData: {
          ...state.saveData,
          gen3SecretBases: [
            { trainerName: 'TrainerAsh', battledOwnerToday: false },
            { trainerName: 'TrainerMisty', battledOwnerToday: true },
            { trainerName: 'TrainerBrock', battledOwnerToday: false },
            { trainerName: 'TrainerMay', battledOwnerToday: false },
          ],
          gen3TrainerRematchFlags: [0, 0, 1, 0], // Brock (idx 2) has flag=1 which overrides to 'battled'
        },
      });

      return true;
    });

    expect(isStateInjected).toBe(true);
    // Give React time to re-render the components
    await page.waitForTimeout(500);

    // 4. Verify the dashboard component conditionally renders and displays the expected data
    await expect(page.getByText('SECRET BASE REMATCHES')).toBeVisible({ timeout: 10000 });

    await expect(page.getByText('TrainerAsh', { exact: true })).toBeVisible();
    await expect(page.getByText('TrainerMisty', { exact: true })).toBeVisible();
    await expect(page.getByText('TrainerBrock', { exact: true })).toBeVisible();
    await expect(page.getByText('TrainerMay', { exact: true })).toBeVisible();

    const availableElements = page.getByText('[ BATTLE AVAILABLE ]');
    await expect(availableElements).toHaveCount(2); // Ash and May

    const battledElements = page.getByText('[ ALREADY BATTLED ]');
    await expect(battledElements).toHaveCount(2); // Misty (battledOwnerToday) and Brock (rematch flag)
  });
});
