import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('PersonaBadge Integration - Skins', () => {
  test('PersonaBadge renders correctly for new persona skins in DAG Dashboard', async ({ page }) => {
    // Unroute previous data
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    await mockDagData(page, 'tests/fixtures/dag/mock_dag_skins.json');

    await page.goto('./dag');

    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    const flowContainer = page.getByTestId('view-mode-board');
    await expect(flowContainer).toBeVisible();

    const personaBadges = page.getByTestId('persona-badge');
    await expect(personaBadges).toHaveCount(2);

    const oakBadge = personaBadges.filter({ hasText: 'oak' }).first();
    await expect(oakBadge).toBeVisible();

    const nurseBadge = personaBadges.filter({ hasText: 'nurse' }).first();
    await expect(nurseBadge).toBeVisible();
  });
});
