import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { BottomNav } from '../BottomNav';

describe('BottomNav', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => <BottomNav />,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    useStore.getState().setSaveData(null);
  });

  it('should render tactical nav items even without save data', async () => {
    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('DEX')).toBeInTheDocument();
    await expect.element(getByText('STRG')).toBeInTheDocument();
    await expect.element(getByText('ASST')).toBeInTheDocument();
    await expect.element(getByText('MENU')).toBeInTheDocument();
  });

  it('should render tactical nav items when save data is present', async () => {
    // Mock save data
    const mockSaveData: SaveData = {
      generation: 1,
      owned: new Set(),
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      gameVersion: 'yellow',
      badges: 0,
      trainerName: 'RED',
      trainerId: 12345,
      currentMapId: 0,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };

    useStore.getState().setSaveData(mockSaveData);

    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('DEX')).toBeInTheDocument();
    await expect.element(getByText('STRG')).toBeInTheDocument();
    await expect.element(getByText('ASST')).toBeInTheDocument();
    await expect.element(getByText('MENU')).toBeInTheDocument();
  });

  it('should be visible on small (sm) target screens', async () => {
    const { getByRole } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const nav = getByRole('navigation');
    await expect.element(nav).toBeVisible();
  });
});
