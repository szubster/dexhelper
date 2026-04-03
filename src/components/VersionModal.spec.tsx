import { test, expect } from '@playwright/experimental-ct-react';
import { argosScreenshot } from '@argos-ci/playwright';
import React from 'react';
import { VersionModalStory } from './VersionModal.story';

// Component tests run in a real browser context
// With Zustand, no Provider wrapper is needed
test.describe('VersionModal', () => {
  test('should render and display visual state accurately', async ({ mount, page }, testInfo) => {
    const component = await mount(
      <VersionModalStory />
    );

    // Ensure the modal has animated in and is visible
    await expect(page.locator('text=Select Game Version')).toBeVisible();

    // Small delay to ensure framer-motion animations have settled
    await page.waitForTimeout(500);

    // Verify it doesn't just crash but also looks exactly as expected
    await argosScreenshot(page, `${testInfo.project.name}-version-modal`);
  });
});
