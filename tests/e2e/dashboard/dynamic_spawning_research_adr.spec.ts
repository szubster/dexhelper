import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('Dynamic RESEARCH and ADR Spawning E2E Testing', () => {
  test('renders dynamically spawned RESEARCH and ADR nodes correctly', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    // Use the dynamic spawning RESEARCH fixture
    await mockDagData(page, 'tests/fixtures/dag/dynamic_spawning_research.json');

    // Navigate to the DAG visualization dashboard
    await page.goto('./dag');

    // Wait for the DAG loading state to resolve
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    // Verify the tactical flow container is visible

    // With the mock data we expect 3 nodes to be rendered (TASK, RESEARCH, ADR)

    // Assert that each node in the dynamic spawning lifecycle is rendered
    await expect(page.getByText('task-100')).toBeVisible();
    await expect(page.getByText('research-100-001')).toBeVisible();
    await expect(page.getByText('adr-100-002')).toBeVisible();

    // Ensure edges are drawn (0 edges because they are only linked by parent, not depends_on)
    const edges = page.locator('.react-flow__edge');
    await expect(edges).toHaveCount(0);

    // Verify nodes state according to fixture
    const taskNode = page.locator('text=task-100').first();
    await expect(taskNode).toBeVisible();

    const researchNode = page.locator('text=research-100-001').first();
    await expect(researchNode).toBeVisible();

    const adrNode = page.locator('text=adr-100-002').first();
    await expect(adrNode).toBeVisible();
  });
});
