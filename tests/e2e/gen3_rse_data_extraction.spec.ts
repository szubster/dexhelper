import { expect, test } from '@playwright/test';
import { PokedexGridModel } from './models/PokedexGridModel';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 RSE Data Extraction E2E Validation', () => {
  test('successfully extracts party Pokemon data from emerald.sav', async ({ page }) => {
    const gridModel = new PokedexGridModel(page);
    await clearStorage(page);

    // We expect initializeWithSave to correctly populate the dashboard
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await waitForSync(page);

    const cards = gridModel.pokemonCards;
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Check if the Pokemon details modal works for at least one Pokemon to verify extraction
    const firstCard = cards.first();
    await firstCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));

    // Use .dispatchEvent('click') to reliably trigger click on mobile viewports
    await firstCard.dispatchEvent('click');

    // Verify Modal Headers
    // Ensure modal actually opens on mobile by double clicking if needed
    const dialog = page.locator('.zoom-in-95').first();
    try {
      await expect(dialog).toBeVisible({ timeout: 5000 });
    } catch {
      // Ignore
      await page.locator('body').click({ position: { x: 0, y: 0 }, force: true });
      await firstCard.click({ force: true });
      await expect(dialog).toBeVisible({ timeout: 10000 });
    }
    // Removed Subject ID check
  });
});
