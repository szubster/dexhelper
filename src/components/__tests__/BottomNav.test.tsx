import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
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

  it('should render tactical nav items without Gen 2/3 specific buttons when no save data', async () => {
    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('DEX')).toBeInTheDocument();
    await expect.element(getByText('STRG')).toBeInTheDocument();
    await expect.element(getByText('ASST')).toBeInTheDocument();
    await expect.element(getByText('MENU')).toBeInTheDocument();

    await expect.element(page.getByText('DASH')).not.toBeInTheDocument();
    await expect.element(page.getByText('SFRI')).not.toBeInTheDocument();
    await expect.element(page.getByText('G3DB')).not.toBeInTheDocument();
  });

  it('should render DASH button when Gen 2 save data is present', async () => {
    const mockGen2SaveData: SaveData = {
      generation: 2,
      owned: new Set(),
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      gameVersion: 'crystal',
      badges: 0,
      trainerName: 'GOLD',
      trainerId: 12345,
      currentMapId: 0,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };

    useStore.getState().setSaveData(mockGen2SaveData);

    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('DEX')).toBeInTheDocument();
    await expect.element(getByText('DASH')).toBeInTheDocument();

    await expect.element(page.getByText('SFRI')).not.toBeInTheDocument();
    await expect.element(page.getByText('G3DB')).not.toBeInTheDocument();
  });

  it('should render DASH, SFRI, and G3DB buttons when Gen 3 save data is present', async () => {
    const mockGen3SaveData: SaveData = {
      generation: 3,
      owned: new Set(),
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      gameVersion: 'emerald',
      badges: 0,
      trainerName: 'RUBY',
      trainerId: 12345,
      currentMapId: 0,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };

    useStore.getState().setSaveData(mockGen3SaveData);

    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('DEX')).toBeInTheDocument();
    await expect.element(getByText('DASH')).toBeInTheDocument();
    await expect.element(getByText('SFRI')).toBeInTheDocument();
    await expect.element(getByText('G3DB')).toBeInTheDocument();
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
