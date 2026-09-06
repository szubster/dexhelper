import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('PersonaBadge Integration', () => {
  test('PersonaBadge renders with correct tactical styling in DAG Dashboard', async ({ page }) => {
    // Unroute previous data
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    // Ensure mock_dag.json data has at least one node with a persona, which it does ('coder', 'product_manager', 'epic_planner')
    await mockDagData(page);

    await page.goto('dag');

    // Wait for the DAG loading state to resolve
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    const flowContainer = page.locator('.tactical-flow');
    await expect(flowContainer).toBeVisible();

    // The badges should appear inside nodes
    const personaBadges = page.getByTestId('persona-badge');
    await expect(personaBadges).toHaveCount(3); // Based on mock_dag.json having 3 nodes

    // Verify a specific badge's aesthetic (Tactical hardware constraints ADR 008)
    const coderBadge = personaBadges.filter({ hasText: 'coder' }).first();
    await expect(coderBadge).toBeVisible();
    await expect(coderBadge).toHaveClass(/border-dashed/);
    await expect(coderBadge).toHaveClass(/rounded-none/);
    await expect(coderBadge).toHaveClass(/font-mono/);
    await expect(coderBadge).toHaveClass(/text-blue-400/);

    // Also verify icons are present
    const icon = page.getByTestId('persona-icon-coder').first();
    await expect(icon).toBeVisible();

    const pmBadge = personaBadges.filter({ hasText: 'product_manager' }).first();
    await expect(pmBadge).toBeVisible();
    await expect(pmBadge).toHaveClass(/text-amber-400/);

    const plannerBadge = personaBadges.filter({ hasText: 'epic_planner' }).first();
    await expect(plannerBadge).toBeVisible();
    await expect(plannerBadge).toHaveClass(/text-orange-400/);
  });
});
