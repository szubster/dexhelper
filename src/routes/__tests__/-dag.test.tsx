import { Suspense } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Route } from '../dag';

vi.mock('../../components/dag', () => ({
  DagDashboard: () => <div data-testid="dag-dashboard">Mocked Dag Dashboard</div>,
}));

describe('DagRoute', () => {
  it('renders the lazy-loaded DagDashboard component', async () => {
    // Assuming Route.options.component is the component we want to render
    const DagRouteComponent = Route.options.component as React.ComponentType;

    await render(
      <Suspense fallback={<div>Loading...</div>}>
        <DagRouteComponent />
      </Suspense>,
    );

    const dashboard = page.getByTestId('dag-dashboard');
    await expect.element(dashboard).toBeVisible();
  });
});
