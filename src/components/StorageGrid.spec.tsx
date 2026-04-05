import { test, expect } from '@playwright/experimental-ct-react';
import { argosScreenshot } from '@argos-ci/playwright';
import React from 'react';
import { StorageGridStory } from './StorageGrid.story';

test.describe('StorageGrid', () => {
  test('should render all boxes including empty ones', async ({ mount, page }) => {
    const component = await mount(<StorageGridStory />);

    // Check for filled locations
    await expect(page.getByText('Party', { exact: true })).toBeVisible();
    await expect(page.getByText('1 Units')).toHaveCount(3); // Party, Box 1, Box 3 each have 1
    
    // Check for empty locations
    await expect(page.getByText('Box 2', { exact: true })).toBeVisible();
    await expect(page.getByText('Box 4', { exact: true })).toBeVisible();
    
    // Check for "EMPTY" text in empty boxes (there should be many in Gen 1 except Box 1 and Box 3)
    // Box 2, 4, 5, 6, 7, 8, 9, 10, 11, 12 and Daycare are empty.
    await expect(page.getByText('EMPTY')).toHaveCount(11); 

    // Visual verification
    await argosScreenshot(page, 'storage-grid-empty-boxes');
  });
});
