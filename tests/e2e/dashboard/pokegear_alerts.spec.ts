import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../test-utils';

test.describe('Pokegear Alerts E2E', () => {
  test('should display SWARM and ITEM badges on high-value caller cards', async ({ page }) => {
    await clearStorage(page);

    await initializeWithSave(page, 'tests/fixtures/crystal_pokegear.sav');

    await page.goto('./dashboard');

    const matrixTitle = page.getByText('ACTIVE CALLERS MATRIX');
    await expect(matrixTitle).toBeVisible();

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
