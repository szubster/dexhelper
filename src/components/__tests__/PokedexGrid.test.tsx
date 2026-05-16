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

  test('renders pokemon list when not empty', async () => {
    const mockList = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Pokemon${i + 1}`,
      idString: String(i + 1).padStart(3, '0'),
      nameLower: `pokemon${i + 1}`,
    }));

    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('Pokemon1', { exact: true })).toBeInTheDocument();
  });
});
