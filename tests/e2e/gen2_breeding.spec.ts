import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, mockDagData } from './test-utils';

test.describe('Gen 2 Breeding Dashboard - DV Overlap and Shiny Odds', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await mockDagData(page);
  });

  test('should not show breeding pairs due to DV overlap (Incest Prevention)', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/saves/gen2/Pokemon Gold - TID 15051.sav');
    await page.goto('./dashboard');
    await expect(
      page
        .getByText('OPTIMAL BREEDING PAIRS')
        .first()
        .or(page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE').first())
        .first(),
    ).toBeVisible({ timeout: 15000 });

    await page.evaluate(() => {
      const state = window.useStore.getState();
      window.useStore.setState({
        ...state,
        saveData: {
          ...state.saveData,
          generation: 2,
          partyDetails: [
            {
              speciesId: 25,
              isShiny: true,
              isShinyCarrier: false,
              dvs: { atk: 15, def: 10, spd: 10, spc: 10 },
            },
            {
              speciesId: 25,
              isShiny: true,
              isShinyCarrier: false,
              dvs: { atk: 7, def: 10, spd: 10, spc: 10 },
            },
          ],
          pcDetails: [],
        } as unknown as typeof state.saveData,
      });
    });

    await expect(page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE').first()).toBeVisible({ timeout: 15000 });
  });

  test('should show shiny odds correctly for a valid pair', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/saves/gen2/Pokemon Gold - TID 15051.sav');
    await page.goto('./dashboard');
    await expect(
      page
        .getByText('OPTIMAL BREEDING PAIRS')
        .first()
        .or(page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE').first())
        .first(),
    ).toBeVisible({ timeout: 15000 });

    await page.evaluate(() => {
      const state = window.useStore.getState();
      window.useStore.setState({
        ...state,
        saveData: {
          ...state.saveData,
          generation: 2,
          partyDetails: [
            {
              speciesId: 25, // Pikachu
              isShiny: true,
              isShinyCarrier: false,
              dvs: { atk: 15, def: 10, spd: 10, spc: 10 }, // Shiny Male
            },
            {
              speciesId: 132, // Ditto, to guarantee pairing
              isShiny: false,
              isShinyCarrier: false,
              dvs: { atk: 7, def: 5, spd: 10, spc: 12 }, // Non-shiny Ditto
            },
          ],
          pcDetails: [],
        } as unknown as typeof state.saveData,
      });
    });

    await expect(page.getByText('OPTIMAL BREEDING PAIRS').first()).toBeVisible({ timeout: 15000 });

    const panel = page.locator('.tactical-panel').filter({ hasText: 'OPTIMAL BREEDING PAIRS' }).first();
    await expect(panel).toBeVisible();

    const textContent = await panel.textContent();
    expect(textContent).toContain('MALE ODDS:1/64'); // Inherits from Pikachu
    expect(textContent).toContain('FEMALE ODDS:1/64');
  });
});
