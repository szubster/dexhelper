import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Pokemon Details Modal', () => {
  test('should display detailed information for a Pokemon', async ({ page }) => {
    // 1. Initialize with a Gen 1 save (Yellow)
    const savePath = path.join(process.cwd(), 'tests/fixtures/yellow.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));

    // 2. Click on a Pokemon (e.g., Pikachu - ID 25)
    // Mobile layouts often have a sticky header and bottom nav that block clicks.
    await page.waitForTimeout(3000);
    const pikachuCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="25"]');
    // Ensure we scroll the element to the center of the screen to avoid top/bottom sticky navs
    await pikachuCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500); // allow layout to settle
    await expect(pikachuCard).toBeVisible({ timeout: 10000 });
    await pikachuCard.dispatchEvent('click'); // Bypasses pointer-events issues

    // 3. Verify Modal Headers
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/\[ SUBJECT_ID: 025 \]/i)).toBeVisible();
    await expect(page.getByText('Pikachu', { exact: true }).nth(0)).toBeVisible();

    // 5. Verify Collection Status
    await expect(page.getByText('SECURED', { exact: true })).toBeVisible();

    // 6. Verify Evolution Section
    await expect(page.getByText(/FORWARD EVOLUTION MATRIX/i)).toBeVisible();
    await expect(page.getByText('RAICHU')).toBeVisible();

    // 7. Test Navigation (Click on Raichu in evolutions)
    await page.getByRole('button', { name: 'RAICHU' }).first().click();
    await expect(page.getByText(/\[ SUBJECT_ID: 026 \]/i)).toBeVisible();
    await expect(page.getByText('Raichu', { exact: true }).nth(0)).toBeVisible();
  });

  test('should show correct locations for the version', async ({ page }) => {
    const savePath = path.join(process.cwd(), 'tests/fixtures/yellow.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));

    // 1. Search for Pidgey to be efficient
    // Use click to trigger focus which reveals the search input options, then fill
    const searchInput = page.getByTestId('search-input');
    await searchInput.click({ force: true });
    await searchInput.fill('Pidgey');

    // 2. Click Pidgey Card
    await page.waitForTimeout(3000);
    const pidgeyCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="16"]');
    // Ensure we scroll the element to the center of the screen to avoid top/bottom sticky navs
    await pidgeyCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await page.waitForTimeout(500); // allow layout to settle
    await expect(pidgeyCard).toBeVisible({ timeout: 10000 });
    await pidgeyCard.dispatchEvent('click'); // Bypasses pointer-events issues

    // 3. Verify Location
    await expect(page.getByText(/Geospatial Telemetry/i)).toBeVisible({ timeout: 15000 });

    // The UI transforms names to uppercase, wait for load
    const locationList = page.getByTestId('location-list');
    await expect(locationList).toBeVisible({ timeout: 15000 });
    await expect(locationList.getByText('ROUTE 1', { exact: true })).toBeVisible({ timeout: 10000 });
  });
});
