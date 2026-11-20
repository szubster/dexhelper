import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

const ROAMING_LEGENDARIES_OFFSET_CRYSTAL = 0x28b6;

test.describe('Gen 2 Roamer Dossier Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('renders active Gen 2 roamer correctly with mocked save data', async ({ page }) => {
    const fileBuffer = fs.readFileSync('tests/fixtures/crystal.sav');
    const modifiedArray = new Uint8Array(fileBuffer);

    // Raikou (Species ID 243)
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 0] = 243; // Species
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 1] = 40; // Level
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 2] = 1; // Map Group
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 3] = 1; // Map ID
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 4] = 120; // HP

    await initializeWithSave(page, modifiedArray);
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText('[ TRACKING ACTIVE ]')).toBeVisible();
    await expect(page.getByText('40').first()).toBeVisible();
    await expect(page.getByText('UNKNOWN')).not.toBeVisible();
    await expect(page.getByText('HP: 120')).toBeVisible();
    await expect(page.getByText('LOC: Olivine City (Group 1, ID 1)').first()).toBeVisible();
  });

  test('renders inactive Gen 2 roamer correctly', async ({ page }) => {
    const fileBuffer = fs.readFileSync('tests/fixtures/crystal.sav');
    const modifiedArray = new Uint8Array(fileBuffer);

    // Entei (Species ID 244)
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 0] = 244; // Species
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 1] = 40; // Level
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 2] = 0; // Map Group (Inactive)
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 3] = 0; // Map ID (Inactive)
    modifiedArray[ROAMING_LEGENDARIES_OFFSET_CRYSTAL + 4] = 0; // HP (Fainted/Inactive)

    await initializeWithSave(page, modifiedArray);
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('Roamer Dossier')).toBeVisible();
    await expect(page.getByText('[ INACTIVE ]')).toBeVisible();
  });
});
