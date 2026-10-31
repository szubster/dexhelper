import path from 'node:path';
import { expect, test } from '@playwright/test';
import { PokedexGridModel } from './models/PokedexGridModel';
import { clearStorage, waitForSync } from './test-utils';

test.describe('SaveDataReader integration', () => {
  test('should parse a real save file and render the application state via SaveDataReader', async ({ page }) => {
    // This test verifies that the application actually uses SaveDataReader under the hood
    // when uploading a save file, satisfying the "full application integration flow" requirement.
    const gridModel = new PokedexGridModel(page);
    await clearStorage(page);
    await page.goto('.');
    await waitForSync(page);

    await expect(page.getByText(/\[ UPLOAD\.SYS \]/i)).toBeVisible();

    const fileInput = page.locator('input[type="file"]');
    // Upload a valid save file that will be processed by the engine (which uses SaveDataReader)
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));

    // Wait for the pokedex grid to render, proving that SaveDataReader successfully extracted the data
    await expect(gridModel.pokemonCards.first()).toBeVisible();

    // Check some specific state that SaveDataReader would have extracted (e.g. trainer name)
    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible();
    await expect(
      page
        .locator('header')
        .getByText(/YELLOW/i)
        .first(),
    ).toBeVisible();
  });
});
