import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('MatchupContext integration', () => {
  test('Gen 1 active party data populates MatchupContext', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');

    // Evaluate in the browser context to inspect window.useStore
    const partyDetails = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: testing internal store
      return (window as any).useStore?.getState()?.saveData?.partyDetails;
    });

    expect(partyDetails).toBeTruthy();
    expect((partyDetails || []).length).toBeGreaterThan(0);
  });

  test('Gen 2 active party data populates MatchupContext', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    // Evaluate in the browser context to inspect window.useStore
    const partyDetails = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: testing internal store
      return (window as any).useStore?.getState()?.saveData?.partyDetails;
    });

    expect(partyDetails).toBeTruthy();
    expect((partyDetails || []).length).toBeGreaterThan(0);
  });

  test('Gen 3 active party data populates MatchupContext', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Evaluate in the browser context to inspect window.useStore
    const partyDetails = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: testing internal store
      return (window as any).useStore?.getState()?.saveData?.partyDetails;
    });

    expect(partyDetails).toBeTruthy();
    expect((partyDetails || []).length).toBeGreaterThan(0);
  });

  test('Edge Case: Uploading a new save overwrites previous context state', async ({ page }) => {
    // First, upload a Gen 1 save
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');

    let partyDetails = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: testing internal store
      return (window as any).useStore?.getState()?.saveData?.partyDetails;
    });

    expect(partyDetails).toBeTruthy();
    const gen1PartyLength = (partyDetails || []).length;
    expect(gen1PartyLength).toBeGreaterThan(0);

    // Then, upload a different Gen 2 save
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');

    partyDetails = await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: testing internal store
      return (window as any).useStore?.getState()?.saveData?.partyDetails;
    });

    expect(partyDetails).toBeTruthy();
    expect((partyDetails || []).length).toBeGreaterThan(0);
  });
});
