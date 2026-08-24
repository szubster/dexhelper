import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 RSE Data Extraction E2E Validation', () => {
  test('successfully extracts party Pokemon data from emerald.sav', async ({ page }) => {
    await clearStorage(page);

    // We expect initializeWithSave to correctly populate the dashboard
    await page.goto('.');
    await page.evaluate(() => {
      localStorage.setItem('pokemon-game-version', 'emerald');
      localStorage.setItem('pokemon-game-generation', '3');
    });

    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await waitForSync(page);

    const cards = page.getByTestId('pokedex-card');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Check if the Pokemon details modal works for at least one Pokemon to verify extraction
    const firstCard = cards.first();
    await firstCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));

    // Use .click() to comply with the reviewer's comment
    await firstCard.click();

    // Verify Modal Headers
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/\[ SUBJECT_ID: \d+ \]/i)).toBeVisible();
  });
});
