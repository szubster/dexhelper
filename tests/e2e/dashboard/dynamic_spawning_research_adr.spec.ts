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

    // Assert that each node in the dynamic spawning lifecycle is rendered
    await expect(page.getByText('task-100')).toBeVisible();
    await expect(page.getByText('research-100-001')).toBeVisible();
    await expect(page.getByText('adr-100-002')).toBeVisible();

    // Verify nodes state according to fixture
    const p = page.getByText('PENDING').first();
    await expect(p).toBeVisible();

    const c = page.getByText('COMPLETED').first();
    await expect(c).toBeVisible();

    const a = page.getByText('ACTIVE').first();
    await expect(a).toBeVisible();
  });
});
