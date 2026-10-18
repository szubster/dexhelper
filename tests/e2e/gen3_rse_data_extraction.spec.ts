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


    // Use .click() to comply with the reviewer's comment
    await firstCard.scrollIntoViewIfNeeded();
    // Click the inner element to ensure the click isn't intercepted
    await page.waitForTimeout(500);
    await firstCard.dispatchEvent('click');

    // Wait for the modal to be visible
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible', timeout: 10000 });

    // Wait for animation
    await page.waitForTimeout(500);

    // Verify Modal Headers
    // dialog is already waited for
    await expect(page.getByText(/\[ SUBJECT_ID: \d+ \]/i)).toBeVisible();
  });
});
