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

  it('should not render without save data', async () => {
    const { container } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
    expect(container.innerHTML).toBe('');
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

    await expect.element(getByText('SYS.DEX')).toBeInTheDocument();
    await expect.element(getByText('SYS.STRG')).toBeInTheDocument();
    await expect.element(getByText('SYS.ASST')).toBeInTheDocument();
    await expect.element(getByText('SYS.MENU')).toBeInTheDocument();
  });
});
