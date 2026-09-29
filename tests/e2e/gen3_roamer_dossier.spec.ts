import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Roamer Dossier Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('renders active Ruby/Sapphire roamer correctly with mocked save data', async ({ page }) => {
    // 1. Initialize with save data
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');

    // 2. Navigate to Dashboard (where Dossier is rendered)
    await page.goto('./dashboard');
    await waitForSync(page);

    // 3. Inject mock save data to ensure roamer state exists and matches assertions
    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Required for E2E store access
      const store = (window as any).useStore;
      const state = store.getState();

      // Update store directly
      if (state.saveData) {
        store.setState({
          saveData: {
            ...state.saveData,
            generation: 3,
            gameVersion: 'ruby' as const,
            roamingLegendaries: [
              {
                speciesId: 380, // Latias
                level: 40,
                isActive: true,
                hp: 120,
                statusCondition: 0,
                personalityValue: 0x12345678,
                ivs: { hp: 31, atk: 14, def: 20, spAtk: 15, spDef: 30, spd: 25 },
              },
            ],
          },
        });
      }
    });

    // 4. Wait for react to re-render

    // 5. Assert Roamer Dossier Rendering
    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText('[ ACTIVE ]')).toBeVisible();
    await expect(page.getByText('40').first()).toBeVisible();
    await expect(page.getByText('0x12345678')).toBeVisible();
  });

  test('renders inactive Emerald roamer correctly', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
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
            generation: 3,
            gameVersion: 'emerald' as const,
            roamingLegendaries: [
              {
                speciesId: 381, // Latios
                level: 40,
                isActive: false,
                hp: 0,
                statusCondition: 0,
                personalityValue: 0,
                ivs: { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, spd: 0 },
              },
            ],
          },
        });
      }
    });

    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText('[ INACTIVE ]')).toBeVisible();
  });

  test('renders IV glitch warning for FireRed/LeafGreen roamer', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/firered.sav');
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
            generation: 3,
            gameVersion: 'firered' as const,
            roamingLegendaries: [
              {
                speciesId: 244, // Entei
                level: 50,
                isActive: true,
                hp: 150,
                statusCondition: 0,
                personalityValue: 0x98765432,
                ivs: { hp: 20, atk: 5, def: 0, spAtk: 0, spDef: 0, spd: 0 },
              },
            ],
          },
        });
      }
    });

    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText(/Severe IV Truncation/i)).toBeVisible();
    await expect(page.getByText('0x98765432')).toBeVisible();
  });
});
