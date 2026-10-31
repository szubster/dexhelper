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

test.describe('Pokerus Spread Planner', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('displays spread planner when party has pokerus, showing warnings and risk suggestions', async ({ page }) => {
    // We'll use the tid 15051 save and artificially construct a party so we know exact positions and names
    await initializeWithSave(page, 'tests/fixtures/gold-tid-15051.sav');

    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: E2E injection
      const store = (window as any).__store();
      const data = store.saveData;

      // Keep existing party array items, but mock their stats so we can test the planner.
      // We will also use standard Pokemon names that we know will show up cleanly.
      const slot1 = {
        ...data.partyDetails[0],
        speciesId: 1,
        nickname: 'BULBASAUR',
        pokerus: { strain: 1, daysRemaining: 1 },
      };
      const slot2 = { ...data.partyDetails[0], speciesId: 2, nickname: 'IVYSAUR', pokerus: undefined };
      const slot3 = {
        ...data.partyDetails[0],
        speciesId: 3,
        nickname: 'VENUSAUR',
        pokerus: { strain: 1, daysRemaining: 0 },
      };

      data.partyDetails = [slot1, slot2, slot3, null, null, null];
      store.setSaveData({ ...data });
    });

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    // Search for one of the nicknames we assigned
    await searchInput.fill('BULBASAUR');
    await expect(page.getByText('BULBASAUR', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /BULBASAUR/i })
      .first()
      .click();

    // Scroll to the planner if necessary
    const planner = page
      .locator('.tactical-panel')
      .filter({ hasText: /Pokérus Spread Planner/i })
      .first();
    await expect(planner).toBeVisible({ timeout: 5000 });

    await expect(planner.getByText('[WARNING]')).toBeVisible();
    await expect(planner.getByText('Clock approaching midnight. Curing possible.')).toBeVisible();

    // Get the first slot (index 0) which is #1
    const bulbaRow = planner.locator('> div > div').filter({ hasText: '#1' }).first();
    await expect(bulbaRow).toBeVisible();
    await expect(bulbaRow).toContainText('BULBASAUR');
    await expect(bulbaRow.locator('.tactical-badge', { hasText: '[PKRS INF: 1D]' })).toBeVisible();

    const ivyRow = planner.locator('> div > div').filter({ hasText: '#2' }).first();
    await expect(ivyRow).toContainText('IVYSAUR');
    await expect(ivyRow.getByText('[AT RISK]')).toBeVisible();

    const venuRow = planner.locator('> div > div').filter({ hasText: '#3' }).first();
    await expect(venuRow).toContainText('VENUSAUR');
    await expect(venuRow.locator('.tactical-badge', { hasText: '[PKRS CURED]' })).toBeVisible();

    // Move Bulbasaur down
    await bulbaRow.locator('button[title="Move down"]').first().click();

    // Now Slot 1: Ivysaur, Slot 2: Bulbasaur
    const newIvyRow = planner.locator('> div > div').filter({ hasText: '#1' }).first();
    await expect(newIvyRow).toBeVisible();
    await expect(newIvyRow).toContainText('IVYSAUR');
    await expect(newIvyRow.getByText('[AT RISK]')).toBeVisible();

    const newBulbaRow = planner.locator('> div > div').filter({ hasText: '#2' }).first();
    await expect(newBulbaRow).toBeVisible();
    await expect(newBulbaRow).toContainText('BULBASAUR');

    // Move Bulbasaur down again
    await newBulbaRow.locator('button[title="Move down"]').first().click();

    // Now Slot 1: Ivysaur, Slot 2: Venusaur, Slot 3: Bulbasaur
    const finalIvyRow = planner.locator('> div > div').filter({ hasText: '#1' }).first();
    await expect(finalIvyRow).toBeVisible();
    await expect(finalIvyRow).toContainText('IVYSAUR');
    await expect(finalIvyRow.getByText('[AT RISK]')).toBeHidden();

    const finalVenuRow = planner.locator('> div > div').filter({ hasText: '#2' }).first();
    await expect(finalVenuRow).toBeVisible();
    await expect(finalVenuRow).toContainText('VENUSAUR');
  });
});
