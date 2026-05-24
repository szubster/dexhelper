import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { SearchAndFilters } from '../SearchAndFilters';

describe('SearchAndFilters', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => <SearchAndFilters />,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().setSaveData({
      gameVersion: 'emerald',
      generation: 3,
      trainerName: 'TEST',
      trainerId: 12345,
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      seen: new Set(),
      owned: new Set(),
      // biome-ignore lint/suspicious/noExplicitAny: Required for partial save mock
    } as any);
  });

  it('renders correctly', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('[ FILTER_PARAMETERS ]')).toBeInTheDocument();
    await expect.element(page.getByText('[ ALL ]')).toBeInTheDocument();
    await expect.element(page.getByText('[ SECURED ]')).toBeInTheDocument();
    await expect.element(page.getByText('[ MISSING ]')).toBeInTheDocument();
    await expect.element(page.getByText('[ DEX ONLY ]')).toBeInTheDocument();
    await expect.element(page.getByPlaceholder('[ ENTER QUERY_ ]')).toBeInTheDocument();
  });
});
