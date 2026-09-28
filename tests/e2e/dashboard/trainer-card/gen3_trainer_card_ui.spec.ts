import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../../test-utils';

test.describe('Gen 3 Trainer Card UI Rendering E2E', () => {
  test('renders Trainer Card upgrades correctly for an Emerald save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Explicitly navigate to the dashboard where the component is rendered.
    await page.goto('./dashboard');
    await waitForSync(page);

    // Assert that the Gen 3 Trainer Card component is visible
    const trainerCardHeader = page.getByText('TRAINER CARD UPGRADES');
    await expect(trainerCardHeader).toBeVisible({ timeout: 15000 });

    // Assert that specific upgrade criteria are rendered correctly
    await expect(page.getByText('Hall of Fame Debut')).toBeVisible();
    await expect(page.getByText('Hoenn Pokédex Complete')).toBeVisible();
    await expect(page.getByText('National Pokédex Complete')).toBeVisible();
    await expect(page.getByText('Master Rank Contest Won')).toBeVisible();
    await expect(page.getByText('Battle Frontier Gold Symbols')).toBeVisible();
  });

  test('does not render Trainer Card upgrades for a Gen 1 save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Explicitly navigate to the dashboard
    await page.goto('./dashboard');
    await waitForSync(page);

    // Assert that the Gen 3 Trainer Card component is NOT visible
    const trainerCardHeader = page.getByText('TRAINER CARD UPGRADES');
    await expect(trainerCardHeader).not.toBeVisible();
  });
});
