import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Pokerus State Exfiltration', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('displays pokerus badge for infected pokemon', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/gold-pokerus.sav');

    // Search for CYNDAQUIL to bring it into the virtualized viewport
    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('CYNDAQUIL');

    // Wait for CYNDAQUIL to appear
    await expect(page.getByText('CYNDAQUIL', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /CYNDAQUIL/i })
      .first()
      .click();

    // The details dialog or panel should have the badge.
    const badge = page.locator('.tactical-badge', { hasText: '[PKRS INF: 10D]' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('[PKRS INF: 10D]'); // The strain we set
  });

  test('displays pokerus badge for PC pokemon', async ({ page }) => {
    // 148 is Dragonair, which has pokerus in this save
    await initializeWithSave(page, 'tests/fixtures/gold-tid-15051.sav');

    // Search for DRAGONAIR to bring it into the virtualized viewport
    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('DRAGONAIR');

    // Wait for the PC list to render
    await expect(page.getByText('DRAGONAIR', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /DRAGONAIR/i })
      .first()
      .click();

    // The details dialog or panel should have the badge.
    const badge = page.locator('.tactical-badge', { hasText: '[PKRS INF: 15D]' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('[PKRS INF: 15D]'); // The strain we set
  });

  test('displays uninfected pokerus badge for pokemon with strain 0', async ({ page }) => {
    // 160 is Feraligatr, which is uninfected in this save (strain undefined, but badge renders for strain 0, let's inject a mock to make sure strain is 0)
    await initializeWithSave(page, 'tests/fixtures/gold-tid-15051.sav');

    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: needed for E2E testing
      const store = (window as any).__store();
      const data = store.saveData;
      // biome-ignore lint/suspicious/noExplicitAny: needed for E2E testing
      const feraligatr = data.partyDetails.find((p: any) => p.speciesId === 160);
      if (feraligatr) {
        feraligatr.pokerus = { strain: 0, daysRemaining: 0 };
      }
      store.setSaveData({ ...data });
    });

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('FERALIGATR');

    await expect(page.getByText('FERALIGATR', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /FERALIGATR/i })
      .first()
      .click();

    const badge = page.locator('.tactical-badge', { hasText: '[PKRS STRN: 0]' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('[PKRS STRN: 0]');
  });

  test('displays cured pokerus badge for pokemon with strain > 0 but daysRemaining = 0', async ({ page }) => {
    // 176 is Togetic, which we will inject as cured
    await initializeWithSave(page, 'tests/fixtures/gold-tid-15051.sav');

    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: needed for E2E testing
      const store = (window as any).__store();
      const data = store.saveData;
      // biome-ignore lint/suspicious/noExplicitAny: needed for E2E testing
      const togetic = data.partyDetails.find((p: any) => p.speciesId === 176);
      if (togetic) {
        togetic.pokerus = { strain: 3, daysRemaining: 0 };
      }
      store.setSaveData({ ...data });
    });

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('TOGETIC');

    await expect(page.getByText('TOGETIC', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /TOGETIC/i })
      .first()
      .click();

    const badge = page.locator('.tactical-badge', { hasText: '[PKRS CURED]' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('[PKRS CURED]');
  });
});
