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
  try {
    return await originalArgosScreenshot(page, name, {
      fullPage: false,
      ...options,
    });
  } catch (err) {
    console.error(`Argos screenshot failed for ${name}:`, err);
    return;
  }
}
