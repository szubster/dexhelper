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
    await page.getByLabel('View details for Pikachu').click();

    // 3. Verify Modal Headers
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/\[ SUBJECT_ID: 025 \]/i)).toBeVisible();
    await expect(page.getByText('Pikachu', { exact: true }).nth(0)).toBeVisible();

    // 5. Verify Collection Status
    await expect(page.getByText(/Status: Secured/i)).toBeVisible();

    // 6. Verify Evolution Section
    await expect(page.getByRole('heading', { name: /Evolution/i })).toBeVisible();
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
    await page.getByTestId('search-input').fill('Pidgey');

    // 2. Click Pidgey Card
    await page.getByLabel('View details for Pidgey').click();

    // 3. Verify Location
    await expect(page.getByText(/Field Distribution/i)).toBeVisible();

    // The UI transforms names to uppercase, wait for load
    const locationList = page.getByTestId('location-list');
    await expect(locationList).toBeVisible({ timeout: 15000 });
    await expect(locationList.getByText('ROUTE 1', { exact: true })).toBeVisible({ timeout: 10000 });
  });
});
