import { test, expect } from '@playwright/experimental-ct-react';
import React from 'react';
import { VersionModal } from './VersionModal';
import { AppProvider } from '../state';

// Component tests run in a real browser context
test.describe('VersionModal', () => {
  test('should render without crashing when provided state context', async ({ mount, page }) => {
    // Mount the component wrapped in its required context provider
    const component = await mount(
      <AppProvider>
        <VersionModal />
      </AppProvider>
    );
    
    // By default, VersionModal is hidden (isVersionModalOpen is false in default state).
    // The component returns null, so it shouldn't be visible.
    // The fact that it mounts successfully without throwing an error about missing useAppState is enough to verify CT works.
    await expect(component).toBeAttached();
  });
});
