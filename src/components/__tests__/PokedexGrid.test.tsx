import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { describe, expect, test, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import { render, cleanup } from 'vitest-browser-react';
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

afterEach(() => {
  cleanup();
});

describe('PokedexGrid', () => {
  test('renders [ SYS.QUERY_FAILED ] when empty', async () => {
    const router = createMockRouter(<PokedexGrid pokemonList={[]} />);

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ SYS.QUERY_FAILED ]', { exact: true })).toBeInTheDocument();
  });
});

// Hack to prevent hanging process from missing file
afterEach(async () => {
  await cleanup();
});
