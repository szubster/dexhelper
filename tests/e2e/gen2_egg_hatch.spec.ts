import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Egg Hatch Data Parsing', () => {
  test('should successfully parse a mutated save file containing a Gen 2 Egg in the party', async ({ page }) => {
    await clearStorage(page);

    // We generated this file earlier during testing
    const mutatedSavePath = 'tests/fixtures/gold-egg.sav';
    const mutatedSaveBuffer = fs.readFileSync(mutatedSavePath);
    const mutatedSaveArray = new Uint8Array(mutatedSaveBuffer);

    // Initializing with the manipulated Gen 2 save
    await initializeWithSave(page, mutatedSaveArray);
    await waitForSync(page);

    // Retrieve parsed save data from IndexedDB or the window.__store (as done in other tests)
    const saveData = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: access Zustand store
      const globalWindow = window as any;
      if (globalWindow.__store) {
        return globalWindow.__store().saveData;
      }
      return null;
    });

    expect(saveData).not.toBeNull();

    // Validate we have the egg steps populated
    const partyEggs = saveData.partyDetails?.filter((p: { eggSteps?: number }) => p.eggSteps !== undefined);
    expect(partyEggs).toBeDefined();
    expect(partyEggs.length).toBeGreaterThan(0);
    expect(partyEggs[0].speciesId).toBe(253); // The injected egg

    // Validate daycare egg indicator
    expect(saveData.daycareHasEgg).toBe(true);
  });
});
