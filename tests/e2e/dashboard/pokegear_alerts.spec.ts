import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../test-utils';

test.describe('Pokegear Alerts E2E', () => {
  test('should display SWARM and ITEM badges on high-value caller cards', async ({ page }) => {
    await clearStorage(page);

    // We generated a specific mock save with Fisher Ralph (Swarm), Hiker Anthony (Swarm), and Fisher Tully (Item).
    await initializeWithSave(page, 'tests/fixtures/crystal_mocked_phone.sav');

    await page.goto('./dashboard');

    const matrixTitle = page.getByText('ACTIVE CALLERS MATRIX');
    await expect(matrixTitle).toBeVisible();

    // The probability is either 0% or 50% depending on the cooldown.
    // It'll render the TacticalCallerCards for Ralph, Anthony, and Tully since they are high-value.

    const swarmBadge1 = page.getByText('[ SWARM ]').first();
    await expect(swarmBadge1).toBeVisible();

    const itemBadge = page.getByText('[ ITEM ]').first();
    await expect(itemBadge).toBeVisible();

    const ralphText = page.getByText('FISHER RALPH', { exact: false }).first();
    await expect(ralphText).toBeVisible();

    const qwilfishDetail = page.getByText('Qwilfish').first();
    await expect(qwilfishDetail).toBeVisible();

    const tullyText = page.getByText('FISHER TULLY', { exact: false }).first();
    await expect(tullyText).toBeVisible();

    const waterStoneDetail = page.getByText('Water Stone').first();
    await expect(waterStoneDetail).toBeVisible();
  });
});
