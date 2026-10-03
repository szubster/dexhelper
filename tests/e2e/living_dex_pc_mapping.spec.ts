import { expect, test } from '@playwright/test';
import { SettingsModalModel } from './models/SettingsModalModel';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Living Dex PC Mapping Integration E2E', () => {
  test('PC mapping data displays in Pokemon details modal when living dex is active', async ({ page }) => {
    // 1. Initialize with Yellow save
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // 2. Turn on Living Dex mode
    const settingsModal = new SettingsModalModel(page);
    await settingsModal.open();
    await settingsModal.toggleLivingDexMode();
    await settingsModal.close();
    await waitForSync(page);

    // 3. Search and click the Pikachu cell in the Living Dex Grid
    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Pikachu');

    const pikachuCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="25"]');
    await pikachuCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500);
    await expect(pikachuCard).toBeVisible({ timeout: 15000 });
    await pikachuCard.dispatchEvent('click');

    // 5. Verify Modal Headers
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/\[ SUBJECT_ID: 025 \]/i)).toBeVisible();

    // 6. Look for PC mapping info to ensure living dex data extraction works.
    await expect(
      page
        .getByText(/PC SLOT_14/i)
        .first()
        .or(page.getByText(/SLOT_14/i).first())
        .first(),
    ).toBeVisible();
  });
});
