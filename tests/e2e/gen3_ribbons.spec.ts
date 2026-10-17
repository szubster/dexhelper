import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Ribbon Data Extraction E2E', () => {
  test('should extract ribbons correctly from a Gen 3 save file', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for the app to initialize
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({
      timeout: 20000,
    });

    const ribbonsData = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Required to access dynamic window properties in evaluate
      const state = (window as any).useStore?.getState();
      if (!state?.saveData) return { error: 'no save data in store' };

      const allPokemon = [...(state.saveData.partyDetails || []), ...(state.saveData.pcDetails || [])];
      // We'll just verify that `ribbons` exists on pokemon and has the expected boolean/number structure
      const withRibbons = allPokemon.filter((p) => p.ribbons !== undefined);

      return {
        totalPokemon: allPokemon.length,
        pokemonWithRibbons: withRibbons.length,
        sampleRibbons: withRibbons.length > 0 ? withRibbons[0].ribbons : null,
      };
    });

    // Check we actually got Pokemon and they have a ribbons object
    expect(ribbonsData.error).toBeUndefined();
    expect(ribbonsData.totalPokemon).toBeGreaterThan(0);
    expect(ribbonsData.pokemonWithRibbons).toBe(ribbonsData.totalPokemon); // In Gen 3, all mons should have a ribbons object even if all false/0

    // Check that the shape of the ribbons object has expected keys
    const sample = ribbonsData.sampleRibbons;
    expect(sample).not.toBeNull();
    if (sample) {
      expect(typeof sample.cool).toBe('number');
      expect(typeof sample.champion).toBe('boolean');
      expect(typeof sample.obedience).toBe('boolean');
    }
  });

  test('should navigate to the Ribbon Checklist dashboard', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for the app to initialize
    await expect(page.getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first()).toBeVisible({
      timeout: 20000,
    });

    // The Ribbon Checklist is accessible via the "System Directory" or the global navigation.
    await page.goto('./dashboard');

    // Wait for dashboard to load
    await expect(
      page
        .getByText(/PC BOXES/i)
        .first()
        .or(page.getByText(/SYSTEM DIRECTORY/i).first())
        .first(),
    ).toBeVisible({ timeout: 15000 });

    // We can interact with the main menu link
    const ribbonLink = page.getByRole('link', { name: /GLOBAL RIBBON CHECKLIST/i });
    if (await ribbonLink.first().isVisible()) {
      await ribbonLink.first().click();
    } else {
      // Try clicking it via CSS if the role isn't exactly matching (e.g. mobile nav or hidden structure)
      await page.locator('text=/GLOBAL RIBBON CHECKLIST/i').first().click({ force: true });
    }

    // Verify it loads correctly
    await expect(page.getByText(/GLOBAL RIBBON CHECKLIST/i).first()).toBeVisible({ timeout: 15000 });
  });
});
