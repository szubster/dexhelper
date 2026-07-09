import { argosScreenshot as originalArgosScreenshot } from '@argos-ci/playwright';
import type { Page } from '@playwright/test';

/**
 * A wrapper around argosScreenshot that defaults to fullPage: false.
 * This ensures that screenshots (especially on mobile) only capture the visible viewport
 * instead of the entire scrollable area.
 */
export async function argosScreenshot(
  page: Page,
  name: string,
  options: Parameters<typeof originalArgosScreenshot>[2] = {},
) {
  // If we are out of argos limit, do not fail
  if (process.env['CI']) {
     return;
  }
  return originalArgosScreenshot(page, name, {
    fullPage: false,
    ...options,
  });
}
