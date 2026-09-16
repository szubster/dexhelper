import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../../test-utils';

test.describe('Gen 2 Breeding Mechanics E2E', () => {
  test('should display gender indicators, validate breeding pairs, and render shiny odds via UI', async ({ page }) => {
    await clearStorage(page);

    const savePath = 'tests/fixtures/gold.sav';
    const saveBuffer = fs.readFileSync(savePath);
    const saveArray = new Uint8Array(saveBuffer);

    await initializeWithSave(page, saveArray);

    await page.goto('.');

    const navigationTab = page.locator('text=DASHBOARD').first();
    const hasNav = await navigationTab.isVisible();
    if (hasNav) {
      await navigationTab.click();
    } else {
      await page.goto('/dexhelper/dashboard');
    }

    const breedingPanel = page.getByText('OPTIMAL BREEDING PAIRS').first();
    await expect(breedingPanel).toBeVisible({ timeout: 15000 });

    const pairsContainer = breedingPanel.locator('..').locator('..');

    const emptyState = page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE').first();
    const pairsCards = pairsContainer.locator('.border-dashed.bg-black\\/60').first();

    await expect(emptyState.or(pairsCards).first()).toBeVisible({ timeout: 10000 });

    const isVisible = await pairsCards.isVisible();
    if (isVisible) {
      const pairText = await pairsCards.textContent();
      expect(pairText).toMatch(/\([MF-]\)/);

      expect(pairText).toContain('SCORE:');

      await expect(pairsCards.getByText('SHINY ODDS:')).toBeVisible();
      await expect(pairsCards.getByText('MALE')).toBeVisible();
      await expect(pairsCards.getByText('FEMALE')).toBeVisible();
      await expect(pairsCards.getByText('GENDERLESS')).toBeVisible();

      expect(pairText).toMatch(/1\/(64|8192)/);
    }
  });

  test('should properly constrain DV overlapping Pokémon pairs', async ({ page }) => {
    await clearStorage(page);

    const savePath = 'tests/fixtures/gold.sav';
    const saveBuffer = fs.readFileSync(savePath);
    const saveArray = new Uint8Array(saveBuffer);

    await initializeWithSave(page, saveArray);

    // In Gen 2, two shiny Pokémon share defense=10 and special=10 (difference=0)
    // Thus they trigger the DV overlap constraint and shouldn't appear as a valid breeding pair.

    await page.evaluate(async () => {
      // Access the Zustand store directly in the browser to override the save data for this specific test
      // @ts-expect-error
      const store = window.__ZUSTAND_STORE__; // Dexhelper uses a global store variable for testing in some places
      if (store) {
        const state = store.getState();
        if (state.saveData) {
          store.setState({
            saveData: {
              ...state.saveData,
              partyDetails: [
                // Parent A: Shiny Carrier (Def: 10, Spc: 10) - Bulbasaur (Male, ATK: 15)
                {
                  ...state.saveData.partyDetails[0],
                  speciesId: 1,
                  dvs: { atk: 15, def: 10, spd: 15, spc: 10 },
                  isShinyCarrier: true,
                  isShiny: false,
                },
                // Parent B: Shiny Carrier (Def: 10, Spc: 2) -> Diff is exactly 8, triggers overlap constraint
                // We must use Ditto (speciesId: 132) to avoid false positive gender incompatibility rejections
                {
                  ...state.saveData.partyDetails[0],
                  speciesId: 132,
                  dvs: { atk: 15, def: 10, spd: 15, spc: 2 },
                  isShinyCarrier: true,
                  isShiny: false,
                },
              ],
              pcDetails: [],
            },
          });
        }
      } else {
        // Fallback: intercept the query or use IndexedDB if store is not exposed globally
        const SAVE_DB_NAME = 'SaveDB';
        const STORE_NAME = 'saves';

        const db = await new Promise<IDBDatabase>((resolve, reject) => {
          const request = indexedDB.open(SAVE_DB_NAME, 2);
          request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
          request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
        });

        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const getReq = store.get('last_save_state');

          getReq.onsuccess = (e) => {
            const data = (e.target as IDBRequest).result;
            if (data) {
              data.partyDetails = [
                {
                  ...data.partyDetails[0],
                  speciesId: 1,
                  dvs: { atk: 15, def: 10, spd: 15, spc: 10 },
                  isShinyCarrier: true,
                  isShiny: false,
                },
                {
                  ...data.partyDetails[0],
                  speciesId: 132,
                  dvs: { atk: 15, def: 10, spd: 15, spc: 2 },
                  isShinyCarrier: true,
                  isShiny: false,
                },
              ];
              data.pcDetails = [];
              const putReq = store.put(data, 'last_save_state');
              putReq.onsuccess = () => resolve();
            } else {
              resolve();
            }
          };
          getReq.onerror = () => reject(getReq.error);
        });
        db.close();
      }
    });

    // Reload to apply the IDB changes if store fallback was used
    await page.reload();

    await page.goto('.');

    const navigationTab = page.locator('text=DASHBOARD').first();
    const hasNav = await navigationTab.isVisible();
    if (hasNav) {
      await navigationTab.click();
    } else {
      await page.goto('/dexhelper/dashboard');
    }

    const breedingPanel = page.getByText('OPTIMAL BREEDING PAIRS').first();
    await expect(breedingPanel).toBeVisible({ timeout: 15000 });

    // Because the only two Pokémon in our party mock overlap DVs (Def diff=0, Spc diff=8),
    // the algorithm should discard them, resulting in the empty state.
    const emptyState = page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE').first();
    await expect(emptyState).toBeVisible({ timeout: 10000 });
  });
});
