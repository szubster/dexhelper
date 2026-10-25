import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Roamer Dossier Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('renders active Gen 2 roamer correctly with mocked save data', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Required for E2E store access
      const store = (window as any).useStore;
      const state = store.getState();

      if (state.saveData) {
        store.setState({
          saveData: {
            ...state.saveData,
            generation: 2,
            gameVersion: 'crystal' as const,
            roamingLegendaries: [
              {
                speciesId: 243, // Raikou
                level: 40,
                isActive: true,
                hp: 120,
                mapGroup: 1, // Example group
                mapId: 1, // Example map ID
              },
            ],
          },
        });
      }
    });

    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText('[ TRACKING ACTIVE ]')).toBeVisible();
    await expect(page.getByText('40').first()).toBeVisible();
    await expect(page.getByText('UNKNOWN')).not.toBeVisible();
    await expect(page.getByText('HP: 120')).toBeVisible();
    await expect(page.getByText('LOC: Olivine City (Group 1, ID 1)').first()).toBeVisible();
  });

  test('renders inactive Gen 2 roamer correctly', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Required for E2E store access
      const store = (window as any).useStore;
      const state = store.getState();

      if (state.saveData) {
        store.setState({
          saveData: {
            ...state.saveData,
            generation: 2,
            gameVersion: 'crystal' as const,
            roamingLegendaries: [
              {
                speciesId: 244, // Entei
                level: 40,
                isActive: false,
                hp: 0,
                mapGroup: 0,
                mapId: 0,
              },
            ],
          },
        });
      }
    });

    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText('[ INACTIVE ]')).toBeVisible();
  });
});
