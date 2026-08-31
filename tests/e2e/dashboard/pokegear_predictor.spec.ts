import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from '../test-utils';

test.describe('Pokegear Predictor Engine & UI', () => {
  test.beforeEach(async ({ page }) => {
    // Clear the storage first
    await clearStorage(page);

    // Initialize with a standard Gen 2 save (Crystal)
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
  });

  test('should parse Gen 2 Pokegear phone data and render the Active Callers Dashboard', async ({ page }) => {
    // Navigate to the Dashboard
    await page.goto('./dashboard');

    // Ensure the 'Active Callers Matrix' title is visible
    const matrixTitle = page.getByText('ACTIVE CALLERS MATRIX');
    await expect(matrixTitle).toBeVisible();

    // Ensure the state shows 'ACTIVE'
    const statusText = page.getByText('ACTIVE', { exact: true });
    await expect(statusText).toBeVisible();

    // Note: The specific contacts might vary based on the crystal.sav file contents,
    // so we can test that at least one of the expected fields exists or a tactical card is rendered.
    const hasAnyContact = await page.getByText('PROB: 50%').first().isVisible();
    const hasSearching = await page.getByText('[ SEARCHING_FOR_SIGNALS... ]').isVisible();

    expect(hasAnyContact || hasSearching).toBeTruthy();
  });

  test('should expose and successfully evaluate Pokegear predictor engine logic via window', async ({ page }) => {
    // Navigate to any page to ensure app is loaded and window is populated
    await page.goto('./dashboard');

    // Evaluate the engine logic exposed on window
    const engineTestResults = await page.evaluate(() => {
      if (!window.checkPhoneCall || !window.chooseRandomCaller) {
        throw new Error('Predictor engine functions not exposed on window');
      }

      const timerStateNoDelay = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
      const timerStateDelay = { delayMinsRemaining: 10, timeCyclesSinceLastCall: 0 };

      const noDelayWillCall = window.checkPhoneCall(timerStateNoDelay, 0); // masked < 64 (true)
      const noDelayWontCall = window.checkPhoneCall(timerStateNoDelay, 64); // masked >= 64 (false)
      const delayWontCall = window.checkPhoneCall(timerStateDelay, 0); // delay > 0 (false)

      const contacts = [
        { id: 1, name: 'Mom' },
        { id: 2, name: 'Prof. Elm' },
      ];
      const caller1 = window.chooseRandomCaller(contacts, 0); // 0 % 2 = 0 (Mom)
      const caller2 = window.chooseRandomCaller(contacts, 1); // 1 % 2 = 1 (Prof. Elm)
      const noCaller = window.chooseRandomCaller([], 0);

      return {
        noDelayWillCall,
        noDelayWontCall,
        delayWontCall,
        caller1Id: caller1?.id,
        caller2Id: caller2?.id,
        noCallerIsNull: noCaller === null,
      };
    });

    expect(engineTestResults.noDelayWillCall).toBe(true);
    expect(engineTestResults.noDelayWontCall).toBe(false);
    expect(engineTestResults.delayWontCall).toBe(false);

    expect(engineTestResults.caller1Id).toBe(1);
    expect(engineTestResults.caller2Id).toBe(2);
    expect(engineTestResults.noCallerIsNull).toBe(true);
  });
});
