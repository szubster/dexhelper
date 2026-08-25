import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('DV/IV/PV Extraction Rendering', () => {
  test('Gen 2 DVs are rendered correctly', async ({ page }) => {
    const savePath = path.join(process.cwd(), 'tests/fixtures/crystal.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Chikorita');

    await page.waitForTimeout(3000);
    const pCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="152"]');
    await pCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500);
    await expect(pCard).toBeVisible({ timeout: 10000 });
    await pCard.dispatchEvent('click');

    await expect(page.getByText(/Biometric Signatures/i)).toBeVisible({ timeout: 15000 });

    // Gen 2 uses DVs (0-15) for HP, ATK, DEF, SPD, SPC
    await expect(page.getByText('HP', { exact: true }).or(page.getByText('ATK', { exact: true }))).toBeVisible();
    await expect(page.getByText('DEF', { exact: true }).or(page.getByText('SPC', { exact: true }))).toBeVisible();
    await expect(page.getByText('SPD', { exact: true })).toBeVisible();
  });

  test('Gen 3 IVs/PVs are rendered correctly', async ({ page }) => {
    const savePath = path.join(process.cwd(), 'tests/fixtures/emerald.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));

    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Torchic');

    await page.waitForTimeout(3000);
    const pCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="255"]');
    await pCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500);
    await expect(pCard).toBeVisible({ timeout: 10000 });
    await pCard.dispatchEvent('click');

    await expect(page.getByText(/Biometric Signatures/i)).toBeVisible({ timeout: 15000 });

    // Gen 3 has a Personality Value (PV) which is displayed usually as a hex ID or similar.
    await expect(page.getByText(/ID:/i)).toBeVisible();

    // Gen 3 uses IVs (0-31) for HP, ATK, DEF, SPA, SPD, SPE
    await expect(page.getByText('HP', { exact: true })).toBeVisible();
    await expect(page.getByText('ATK', { exact: true })).toBeVisible();
    await expect(page.getByText('DEF', { exact: true })).toBeVisible();
    await expect(page.getByText('SPA', { exact: true }).or(page.getByText('SP.ATK', { exact: true }))).toBeVisible();
    await expect(page.getByText('SPD', { exact: true }).or(page.getByText('SP.DEF', { exact: true }))).toBeVisible();
    await expect(page.getByText('SPE', { exact: true }).or(page.getByText('SPEED', { exact: true }))).toBeVisible();
  });
});
