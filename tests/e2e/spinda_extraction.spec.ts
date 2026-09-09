import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Spinda PID Extraction E2E Verification', () => {
  test('successfully extracts Spinda and 32-bit PID from active party in emerald', async ({ page }) => {
    await clearStorage(page);

    const savePath = path.join(process.cwd(), 'tests/fixtures/saves/gen3/emerald_spinda_party_fixture.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));
    await waitForSync(page);

    // Verify a Spinda is found (ID 327 in Gen 3 National Dex)
    const spindaCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="327"]').first();
    await spindaCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await expect(spindaCard).toBeVisible({ timeout: 10000 });

    // Click the Spinda card to view details modal
    await spindaCard.dispatchEvent('click');

    // Verify Modal Header contains Spinda ID
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/\[ SUBJECT_ID: 327 \]/i)).toBeVisible();

    // Check for "PID:" or something indicating the 32-bit personality value
    // E.g., the UI might display it under a "TECHNICAL DATA" or "PID" section
    await expect(page.getByText(/ID: [0-9A-F]{8}/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('successfully extracts Spinda and 32-bit PID from PC box in emerald', async ({ page }) => {
    await clearStorage(page);

    const savePath = path.join(process.cwd(), 'tests/fixtures/saves/gen3/emerald_spinda_pc_fixture.sav');
    const saveData = fs.readFileSync(savePath);
    await initializeWithSave(page, new Uint8Array(saveData));
    await waitForSync(page);

    // Verify a Spinda is found (ID 327 in Gen 3 National Dex)
    const spindaCard = page.locator('[data-testid="pokedex-card"][data-pokemon-id="327"]').first();
    await spindaCard.evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' }));
    await expect(spindaCard).toBeVisible({ timeout: 10000 });

    // Click the Spinda card to view details modal
    await spindaCard.dispatchEvent('click');

    // Verify Modal Header contains Spinda ID
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/\[ SUBJECT_ID: 327 \]/i)).toBeVisible();

    // Check for "PID:"
    await expect(page.getByText(/ID: [0-9A-F]{8}/i).first()).toBeVisible({ timeout: 5000 });
  });
});
