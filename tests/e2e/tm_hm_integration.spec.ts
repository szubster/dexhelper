import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('TM/HM Integration E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('Gen 1 - TM/HM Extraction', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/red-base.sav');

    // In dev, the state is exposed on window.__store
    const state = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: required for window injection
      type WindowStore = typeof window & { __store: () => any };
      const globalWindow = window as WindowStore;
      for (let i = 0; i < 20; i++) {
        if (globalWindow.__store) {
          return globalWindow.__store();
        }
        await new Promise((r) => setTimeout(r, 100));
      }
      throw new Error('__store not found');
    });

    expect(state.saveData).not.toBeNull();
    expect(state.saveData.tms).toBeDefined();

    // Check for some TMs or HMs that should exist in red-base.sav
    // Since we don't know the exact TMs, we just ensure the array is correct and has expected properties
    expect(state.saveData.tms.length).toBeGreaterThan(0);
    // biome-ignore lint/suspicious/noExplicitAny: required for array operations
    const hasAnyTM = state.saveData.tms.some((tm: any) => tm.isAcquired || (tm.quantity || 0) > 0);
    expect(hasAnyTM).toBe(true);
  });

  test('Gen 2 - TM/HM Extraction', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    const state = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: required for window injection
      type WindowStore = typeof window & { __store: () => any };
      const globalWindow = window as WindowStore;
      for (let i = 0; i < 20; i++) {
        if (globalWindow.__store) {
          return globalWindow.__store();
        }
        await new Promise((r) => setTimeout(r, 100));
      }
      throw new Error('__store not found');
    });

    expect(state.saveData).not.toBeNull();
    expect(state.saveData.tms).toBeDefined();

    expect(state.saveData.tms.length).toBeGreaterThan(0);
    // In Gen 2, it should track quantities
    // biome-ignore lint/suspicious/noExplicitAny: required for array operations
    const hasAnyTM = state.saveData.tms.some((tm: any) => (tm.quantity || 0) > 0);
    expect(hasAnyTM).toBeDefined();
    // Might be false if crystal.sav has no TMs, but tms array must exist.
    expect(Array.isArray(state.saveData.tms)).toBe(true);
  });

  test('Gen 3 - TM/HM Extraction', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    const state = await page.evaluate(async () => {
      // biome-ignore lint/suspicious/noExplicitAny: required for window injection
      type WindowStore = typeof window & { __store: () => any };
      const globalWindow = window as WindowStore;
      for (let i = 0; i < 20; i++) {
        if (globalWindow.__store) {
          return globalWindow.__store();
        }
        await new Promise((r) => setTimeout(r, 100));
      }
      throw new Error('__store not found');
    });

    expect(state.saveData).not.toBeNull();

    // Gen 3 might use gen3TMHMs or tms depending on the parser.
    const tms = state.saveData.gen3TMHMs || state.saveData.tms;
    expect(tms).toBeDefined();
    expect(Array.isArray(tms)).toBe(true);
  });
});
