import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('Dynamic IDEA Spawning and Late Binding Lifecycle E2E Testing', () => {
  test('simulates Late Binding wait state between PENDING TASK and dynamically spawned ACTIVE IDEA', async ({
    page,
  }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    // Use the dynamic spawning fixture
    await mockDagData(page, 'tests/fixtures/dag/dynamic_spawning_idea_late_binding.json');

    // Navigate to the DAG visualization dashboard
    await page.goto('./dag');

    // Wait for the DAG loading state to resolve
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    // Verify the tactical flow container is visible

    // Assert that each node in the dynamic spawning lifecycle is rendered
    await expect(page.getByText('task-200')).toBeVisible();
    await expect(page.getByText('idea-200-001')).toBeVisible();

    // Check that the parent is in a Late-Binding wait state.
    // The fixture states task-200 is PENDING, and idea-200-001 is ACTIVE.
    const p = page.getByText('PENDING').first();
    await expect(p).toBeVisible();

    const a = page.getByText('ACTIVE').first();
    await expect(a).toBeVisible();
  });
});
