import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/index';
import { useStore } from '../../store';
import { Route } from '../safari-zone';

const queryClient = new QueryClient();

const createMockRouter = (children: React.ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  });
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => children,
    }),
  ]);
  const history = createMemoryHistory({ initialEntries: ['/'] });
  return createRouter({ routeTree, history });
};

describe('SafariZonePage Route', () => {
  beforeEach(() => {
    queryClient.clear();
    useStore.setState({ saveData: null });
  });

  const Component = Route.options.component;

  it('renders unlinked empty state when saveData is null', async () => {
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('SAFARI ZONE TELEMETRY UNLINKED')).toBeVisible();
  });

  it('renders unavailable empty state for Gen 2 save files', async () => {
    useStore.setState({
      saveData: { generation: 2 } as SaveData,
    });
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('SAFARI ZONE UNAVAILABLE IN GEN 2')).toBeVisible();
  });

  it('renders missing safari encounters for Gen 1 save files', async () => {
    useStore.setState({
      saveData: {
        generation: 1,
        gameVersion: 'yellow',
        owned: new Set<number>(),
        party: [],
        pc: [],
      } as unknown as SaveData,
    });
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('SAFARI ZONE MISSING ENCOUNTERS')).toBeVisible();
  });

  it('renders missing safari encounters for Gen 3 save files', async () => {
    useStore.setState({
      saveData: {
        generation: 3,
        gameVersion: 'emerald',
        owned: new Set<number>(),
        party: [],
        pc: [],
      } as unknown as SaveData,
    });
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('SAFARI ZONE MISSING ENCOUNTERS')).toBeVisible();
  });
});
