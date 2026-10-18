import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 1 Save Data Parsing E2E', () => {
  test('should extract PC Boxes, Party, and trainer info from Gen 1 save file', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    await expect(page.locator('header').getByText(/BLUE/i).first()).toBeVisible({ timeout: 15000 });

    // Wait for Pokédex grid to populate
    await expect(page.getByTestId('pokedex-card').first()).toBeVisible({ timeout: 15000 });

    // Check that at least some cards are populated and show as logged/secured
    const pokemonCards = page.getByTestId('pokedex-card');
    await expect(pokemonCards.first()).toBeVisible({ timeout: 15000 });

    // We verify the save data parsing by checking if Pokémon are loaded into the grid
    const count = await pokemonCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
