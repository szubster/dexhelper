import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Engine Code Splitting E2E', () => {
  test('should load dynamic imports for Gen 1 save parsing', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    await expect(page.locator('header').getByText(/BLUE/i).first()).toBeVisible({ timeout: 15000 });

    const saveData = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData) {
            return state.saveData;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return null;
    });

    expect(saveData).not.toBeNull();
    expect(saveData.generation).toBe(1);
    expect(saveData.trainerName).toBeDefined();
  });

  test('should load dynamic imports for Gen 2 save parsing', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await waitForSync(page);

    await expect(
      page
        .locator('header')
        .getByText(/CRYSTAL/i)
        .first(),
    ).toBeVisible({ timeout: 15000 });

    const saveData = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData) {
            return state.saveData;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return null;
    });

    expect(saveData).not.toBeNull();
    expect(saveData.generation).toBe(2);
    expect(saveData.trainerName).toBeDefined();
  });

  test('should load dynamic imports for Gen 3 save parsing', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    // Emerald seems to have a different text in the header, maybe just wait for the app to initialize instead
    const isInitialized = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData) {
            return state.saveData !== null;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return false;
    });

    expect(isInitialized).toBe(true);

    const saveData = await page.evaluate(async () => {
      for (let i = 0; i < 20; i++) {
        // biome-ignore lint/suspicious/noExplicitAny: testing hook
        const globalWindow = window as any;
        if (globalWindow.__store) {
          const state = globalWindow.__store();
          if (state?.saveData) {
            return state.saveData;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      return null;
    });

    expect(saveData).not.toBeNull();
    expect(saveData.generation).toBe(3);
    expect(saveData.trainerName).toBeDefined();
  });

  test('should load dynamic imports for Gen 1 assistant strategies', async ({ page, isMobile }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    await expect(page.getByText(/AI Assistant/i)).toBeVisible({ timeout: 15000 });

    // Using an assertion that would only pass if the assistant strategies are loaded and provide suggestions.
    await expect(page.locator('[data-testid="assistant-suggestion-card"]').first()).toBeVisible({ timeout: 15000 });
  });

  test('should load dynamic imports for Gen 2 assistant strategies', async ({ page, isMobile }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await waitForSync(page);

    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    await expect(page.getByText(/AI Assistant/i)).toBeVisible({ timeout: 15000 });

    // Using an assertion that would only pass if the assistant strategies are loaded and provide suggestions.
    await expect(page.locator('[data-testid="assistant-suggestion-card"]').first()).toBeVisible({ timeout: 15000 });
  });

  test('should load dynamic imports for Gen 3 assistant strategies', async ({ page, isMobile }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    if (isMobile) {
      const assistantLink = page.getByRole('link', { name: 'Assistant' });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    } else {
      const assistantLink = page.getByRole('link', { name: /SYS\.ASST/i });
      await expect(assistantLink).toBeVisible();
      await assistantLink.click();
    }

    await expect(page.getByText(/AI Assistant/i)).toBeVisible({ timeout: 15000 });

    // Using an assertion that would only pass if the assistant strategies are loaded and provide suggestions.
    await expect(page.locator('[data-testid="assistant-suggestion-card"]').first()).toBeVisible({ timeout: 15000 });
  });
});
