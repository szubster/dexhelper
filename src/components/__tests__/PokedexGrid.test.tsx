import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { afterEach, describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { PokedexGrid } from '../PokedexGrid';

const queryClient = new QueryClient();

const createMockRouter = (component: React.ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  });
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
    }),
  ]);
  const history = createMemoryHistory();
  return createRouter({ routeTree, history });
};

describe('PokedexGrid', () => {
  afterEach(async () => {
    await cleanup();
  });

  test('renders [ SYS.QUERY_FAILED ] when empty', async () => {
    const router = createMockRouter(<PokedexGrid pokemonList={[]} />);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('[ SYS.QUERY_FAILED ]', { exact: true })).toBeInTheDocument();
  });
});
