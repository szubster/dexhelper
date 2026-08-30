import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 1 Safari Zone Data Extraction E2E', () => {
  test('missing Safari Zone encounters should be correctly identified and surfaced from Gen 1 save in the assistant page', async ({
    page,
  }) => {
    // 1. Initialize with yellow save
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // 2. Go to the Assistant page and wait for Wild Encounters section
    await page.goto('assistant');
    await expect(page.getByText(/Wild Encounters/i)).toBeVisible({ timeout: 15000 });

    // Safari Zone should be recommended for missing encounters
    // Based on the game state in yellow.sav, Chansey/Tauros etc are likely missing
    await expect(page.getByText(/Safari Zone/i).first()).toBeVisible({ timeout: 15000 });
  });
});
