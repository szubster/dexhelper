import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Missed Milestones Widget UI Rendering E2E', () => {
  test('renders Missed Milestones for an Emerald save with missed Master Ball', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Explicitly navigate to the dashboard where the component is rendered.
    await page.goto('./gen3-dashboard');
    await waitForSync(page);

    // Assert that the Missed Milestones component is visible
    const missedMilestonesHeader = page.getByText('MISSED MILESTONES');
    await expect(missedMilestonesHeader).toBeVisible({ timeout: 15000 });
  });

  test('does not render Missed Milestones for a Gen 1 save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Explicitly navigate to the dashboard
    await page.goto('./gen3-dashboard');
    await waitForSync(page);

    // Assert that the Missed Milestones component is NOT visible
    const missedMilestonesHeader = page.getByText('MISSED MILESTONES');
    await expect(missedMilestonesHeader).not.toBeVisible();
  });
});
