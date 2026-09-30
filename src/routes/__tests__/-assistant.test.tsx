import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/index';
import { useStore } from '../../store';
import { Route } from '../assistant';

const queryClient = new QueryClient();

const createMockRouter = (children: ReactNode) => {
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

describe('AssistantPage Route', () => {
  beforeEach(() => {
    queryClient.clear();
    useStore.setState({ saveData: null });
  });

  const Component = Route.options.component;

  it('renders unlinked empty state when saveData is null', async () => {
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('ASSISTANT TELEMETRY UNLINKED')).toBeVisible();
  });

  it('renders assistant panel when saveData is provided', async () => {
    useStore.setState({
      saveData: {
        generation: 3,
        gameVersion: 'emerald',
        owned: new Set<number>(),
        seen: new Set<number>(),
        partyDetails: [],
        pcDetails: [],
      } as unknown as SaveData,
    });
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText(/ASSISTANT/i).first()).toBeVisible();
  });
});
