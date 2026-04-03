import { test, expect } from '@playwright/experimental-ct-react';
import React, { useEffect } from 'react';
import { VersionModal } from './VersionModal';
import { useStore } from '../store';

function TestWrapper() {
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
  
  useEffect(() => {
    setIsVersionModalOpen(true);
  }, [setIsVersionModalOpen]);

  return <VersionModal />;
}

// Component tests run in a real browser context
// With Zustand, no Provider wrapper is needed
test.describe('VersionModal', () => {
  test('should render and display visual state accurately', async ({ mount, page }) => {
    const component = await mount(
      <TestWrapper />
    );

    // Ensure the modal has animated in and is visible
    await expect(page.locator('text=Select Game Version')).toBeVisible();

    // Small delay to ensure framer-motion animations have settled
    await page.waitForTimeout(500);

    // Verify it doesn't just crash but also looks exactly as expected
    await expect(page).toHaveScreenshot('version-modal.png');
  });
});
