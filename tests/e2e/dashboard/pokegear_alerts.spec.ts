import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { CRYSTAL_WPHONE_LIST, SRAM_WRAM_OFFSET_ADJUST } from '../../../src/engine/saveParser/parsers/gen2/phone/parser';
import { clearStorage, initializeWithSave } from '../test-utils';

test.describe('Pokegear Alerts E2E', () => {
  test('should display SWARM and ITEM badges on high-value caller cards', async ({ page }) => {
    await clearStorage(page);

    // Create a modified buffer in memory rather than reading a modified file from disk
    const buffer = fs.readFileSync('tests/fixtures/crystal.sav');
    const array = new Uint8Array(buffer.buffer);
    const phoneListOffset = CRYSTAL_WPHONE_LIST - SRAM_WRAM_OFFSET_ADJUST;
    array[phoneListOffset] = 17; // Fisher Ralph (Swarm)
    array[phoneListOffset + 1] = 19; // Hiker Anthony (Swarm)
    array[phoneListOffset + 2] = 28; // Hiker Parry (Trainer)
    array[phoneListOffset + 3] = 29; // Fisher Tully (Item)

    await initializeWithSave(page, array);

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
