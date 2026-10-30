import type { Page } from '@playwright/test';
import { test as base, expect } from '@playwright/test';

export type ReactConcurrentFixtures = {
  waitForSuspense: (page: Page, fallbackLocator?: string) => Promise<void>;
  simulateDeferredUpdate: (page: Page, action: () => Promise<void>) => Promise<void>;
  assertTransitionState: (page: Page, isPendingLocator: string) => Promise<void>;
};

export const test = base.extend<ReactConcurrentFixtures>({
  waitForSuspense: async ({ page: _page }, use) => {
    const waitForSuspense = async (page: Page, fallbackLocator: string = '[data-testid="suspense-fallback"]') => {
      // Wait for the fallback to appear
      await expect(page.locator(fallbackLocator)).toBeVisible();
      // Wait for the fallback to disappear, indicating suspense resolved
      await expect(page.locator(fallbackLocator)).toBeHidden();
    };
    await use(waitForSuspense);
  },

  simulateDeferredUpdate: async ({ page: _page }, use) => {
    const simulateDeferredUpdate = async (__page: Page, action: () => Promise<void>) => {
      // Execute the action that triggers a deferred update
      await action();
      // We could add more sophisticated checks here to verify the deferred nature,
      // such as checking if the UI remains responsive, but a basic check is to
      // ensure the action completes and potentially a loading indicator appears.
    };
    await use(simulateDeferredUpdate);
  },

  assertTransitionState: async ({ page: _page }, use) => {
    const assertTransitionState = async (page: Page, isPendingLocator: string) => {
      // Assert that the pending state indicator (e.g., a spinner or opacity change) is active
      await expect(page.locator(isPendingLocator)).toBeVisible();
      // Assert that the pending state resolves
      await expect(page.locator(isPendingLocator)).toBeHidden();
    };
    await use(assertTransitionState);
  },
});

export { expect };
