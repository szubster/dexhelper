import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Trainer Card UI E2E', () => {
  test('verifies Trainer Card upgrades render correctly for Gen 3', async ({ page }) => {
    await clearStorage(page);

    // Load emerald-vithuang.sav
    await initializeWithSave(page, 'tests/fixtures/emerald-vithuang.sav');

    // We navigate to the dashboard to make sure it is rendered.
    await page.goto('./dashboard');
    await waitForSync(page);

    // Wait until the container for Trainer Card Upgrades is visible
    // Since Gen3TrainerCardDashboard lazy loads, it might take a moment.
    const header = page.getByText('TRAINER CARD UPGRADES', { exact: true });

    await expect(header).toBeVisible();

    // Verify Hall of Fame Debut checklist item is visible
    const hofDebut = page.getByText('Hall of Fame Debut', { exact: true });
    await expect(hofDebut).toBeVisible();

    // Verify Hoenn Pokédex Complete checklist item is visible
    const hoennDex = page.getByText('Hoenn Pokédex Complete', { exact: true });
    await expect(hoennDex).toBeVisible();

    // Verify National Pokédex Complete checklist item is visible
    const nationalDex = page.getByText('National Pokédex Complete', { exact: true });
    await expect(nationalDex).toBeVisible();

    // Verify Master Rank Contest Won checklist item is visible
    const contestMaster = page.getByText('Master Rank Contest Won', { exact: true });
    await expect(contestMaster).toBeVisible();

    // Verify Battle Frontier Gold Symbols checklist item is visible
    const battleFrontier = page.getByText('Battle Frontier Gold Symbols', { exact: true });
    await expect(battleFrontier).toBeVisible();
  });
});
