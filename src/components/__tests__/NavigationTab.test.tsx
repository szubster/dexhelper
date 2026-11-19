import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { NavigationTab } from '../NavigationTab';

describe('NavigationTab', () => {
  it('renders label with tactical brackets and whitespace-nowrap', async () => {
    const rootRoute = createRootRoute({
      component: () => <NavigationTab to="/" icon={<span data-testid="tab-icon">ICON</span>} label="SYS.TEST" />,
    });

    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => null,
    });

    const router = createRouter({
      routeTree: rootRoute.addChildren([indexRoute]),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    });

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByTestId('tab-icon')).toBeInTheDocument();
    await expect.element(page.getByText('SYS.TEST')).toBeInTheDocument();
  });
});
