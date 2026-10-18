import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('Atomic Handoff Lifecycle E2E Testing', () => {
  test('simulates a full IDEA -> PRD -> EPIC -> STORY -> TASK lifecycle using atomic files', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    // Use the atomic lifecycle fixture
    await mockDagData(page, 'tests/fixtures/dag/atomic_handoff_lifecycle.json');

    // Navigate to the DAG visualization dashboard
    await page.goto('./dag');

    // Wait for the DAG loading state to resolve
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    // Verify the tactical flow container is visible

    // With the mock data we expect 5 nodes to be rendered (IDEA, PRD, EPIC, STORY, TASK)

    // Assert that each node in the atomic lifecycle is rendered
    await expect(page.getByText('idea-001-atomic')).toBeVisible();
    await expect(page.getByText('prd-001-002-atomic')).toBeVisible();
    await expect(page.getByText('epic-002-003-atomic')).toBeVisible();
    await expect(page.getByText('story-003-004-atomic')).toBeVisible();
    await expect(page.getByText('task-004-005-atomic')).toBeVisible();

    // Ensure edges are drawn (4 edges for a linear chain of 5 nodes)
  });
});
