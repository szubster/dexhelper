import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import { VersionModal } from './VersionModal';

// Component tests run in a real browser context
// With Zustand, no Provider wrapper is needed
test.describe('VersionModal', () => {
  test('should render without crashing', async ({ mount }) => {
    const component = await mount(
      <VersionModal />
    );

    // By default, VersionModal is hidden (isVersionModalOpen is false in default state).
    // The component returns null, so it shouldn't be visible.
    // The fact that it mounts successfully without throwing an error is enough to verify CT works.
    await expect(component).toBeAttached();
  });
});
