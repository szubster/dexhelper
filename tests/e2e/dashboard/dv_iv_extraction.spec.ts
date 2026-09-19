import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../test-utils';

test.describe('Gen 2 and Gen 3 DV/IV Visibility E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should display Gen 2 DVs when a Gen 2 save is loaded', async ({ page }) => {
    const savePath = path.join(process.cwd(), 'tests/fixtures/crystal.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));

    // Use the reliable search flow
    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Chikorita');

    await page.waitForTimeout(3000);
    const pCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="152"]').first();

    await pCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500);
    await expect(pCard).toBeVisible({ timeout: 10000 });
    await pCard.dispatchEvent('click');

    await expect(page.getByText(/DETERMINANT VALUES/i).first()).toBeVisible({ timeout: 15000 });
  });

  test('should display Gen 3 IVs and PVs when a Gen 3 save is loaded', async ({ page }) => {
    const savePath = path.join(process.cwd(), 'tests/fixtures/emerald.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Treecko');

    await page.waitForTimeout(3000);
    const pCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="252"]').first();

    await pCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500);
    await expect(pCard).toBeVisible({ timeout: 10000 });
    await pCard.dispatchEvent('click');

    await expect(page.getByText(/INDIVIDUAL VALUES/i).first()).toBeVisible({ timeout: 15000 });
  });
});
