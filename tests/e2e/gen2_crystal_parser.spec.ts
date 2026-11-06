import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 2 Crystal Parser E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should successfully load a Crystal save and render correctly', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Verify UI indicating Gen 2 / Crystal is loaded
    await expect(
      page.getByText('Crystal', { exact: true }).first().or(page.getByText('CRYSTAL').first()).first(),
    ).toBeVisible({ timeout: 10000 });

    // Check if the Pokemon instances are parsed. Check for a Pokemon that exists in a typical Gen 2 save.
    // e.g., Pokedex card for Feraligatr, Meganium, Typhlosion, etc. Or just check for existence of any Dex Card.
    await expect(page.getByTestId('pokedex-card').first()).toBeVisible({ timeout: 15000 });
  });
});
