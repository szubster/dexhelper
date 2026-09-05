import { expect, test } from '@playwright/test';
import type { SaveData } from '../../src/engine/saveParser/parsers/common';
import { initializeWithSave } from './test-utils';

test.describe('TM/HM Integration V2', () => {
  test('Gen 1 TM/HM extraction', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    const saveData = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Window injection for store testing
      const globalWindow = window as any;
      return globalWindow.__store().saveData as SaveData | null;
    });

    expect(saveData).not.toBeNull();
    const tms = saveData?.tms;
    expect(tms).toBeDefined();
    expect(tms?.length).toBeGreaterThan(50);

    const firstTM = tms?.[0];
    expect(firstTM).toHaveProperty('id');
    expect(firstTM).toHaveProperty('moveId');
    expect(firstTM).toHaveProperty('isAcquired');
  });

  test('Gen 2 TM/HM extraction', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    const saveData = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Window injection for store testing
      const globalWindow = window as any;
      return globalWindow.__store().saveData as SaveData | null;
    });

    expect(saveData).not.toBeNull();
    const tms = saveData?.tms;
    expect(tms).toBeDefined();
    expect(tms?.length).toBeGreaterThan(50);

    const firstTM = tms?.[0];
    expect(firstTM).toHaveProperty('id');
    expect(firstTM).toHaveProperty('moveId');
    expect(firstTM).toHaveProperty('isAcquired');
  });

  test('Gen 3 TM/HM extraction', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    const saveData = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: Window injection for store testing
      const globalWindow = window as any;
      return globalWindow.__store().saveData as SaveData | null;
    });

    expect(saveData).not.toBeNull();

    const tms = saveData?.tms;
    expect(tms).toBeDefined();
    expect(tms?.length).toBeGreaterThan(50);

    const firstTM = tms?.[0];
    expect(firstTM).toHaveProperty('id');
    expect(firstTM).toHaveProperty('moveId');
    expect(firstTM).toHaveProperty('isAcquired');
  });
});
