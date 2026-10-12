import { expect, test } from '@playwright/test';
import { PokedexGridModel } from './models/PokedexGridModel';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('PokedexGrid Virtualization', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page);
  });

  test('should render cards within the viewport', async ({ page }) => {
    const gridModel = new PokedexGridModel(page);
    await gridModel.waitForGridToLoad();

    // Check first card is visible
    await gridModel.expectCardToBeVisible(1);

    // Since it is virtualized, card 151 shouldn't be in the DOM initially
    const lastCard = gridModel.getPokemonCard(151);
    await expect(lastCard).not.toBeAttached();
  });

  test('should render subsequent cards when scrolling down', async ({ page }) => {
    const gridModel = new PokedexGridModel(page);
    await gridModel.waitForGridToLoad();

    // The grid might take a moment to calculate sizes
    await page.waitForTimeout(500);

    // Scroll down to the bottom
    await gridModel.scrollToBottom();

    await expect(async () => {
      const lastCard = gridModel.getPokemonCard(151);
      await expect(lastCard).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 5000 });

    // And first card shouldn't be attached to DOM anymore
    const firstCard = gridModel.getPokemonCard(1);
    await expect(firstCard).not.toBeAttached();
  });
});
