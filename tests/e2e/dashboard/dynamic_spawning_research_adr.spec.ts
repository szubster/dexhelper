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
    const flowContainer = page.locator('.tactical-flow');
    await expect(flowContainer).toBeVisible();

    // With the mock data we expect 3 nodes to be rendered (TASK, RESEARCH, ADR)
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(3);

    // Assert that each node in the dynamic spawning lifecycle is rendered
    await expect(page.getByText('task-100')).toBeVisible();
    await expect(page.getByText('research-100-001')).toBeVisible();
    await expect(page.getByText('adr-100-002')).toBeVisible();

    // Ensure edges are drawn (0 edges because they are only linked by parent, not depends_on)
    const edges = page.locator('.react-flow__edge');
    await expect(edges).toHaveCount(0);

    // Verify nodes state according to fixture
    const taskNode = page.locator('xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "task-100")]]');
    await expect(taskNode).toBeVisible();
    await expect(taskNode.getByText('PENDING', { exact: true })).toBeVisible();

    const researchNode = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "research-100-001")]]',
    );
    await expect(researchNode).toBeVisible();
    await expect(researchNode.getByText('COMPLETED', { exact: true })).toBeVisible();

    const adrNode = page.locator('xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "adr-100-002")]]');
    await expect(adrNode).toBeVisible();
    await expect(adrNode.getByText('ACTIVE', { exact: true })).toBeVisible();
  });
});
