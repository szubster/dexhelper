import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { getDB } from '../../db/PokeDB';
import type { PokemonInstance } from '../../engine/saveParser';
import { useStore } from '../../store';
import { BoxAnalyzerView } from './BoxAnalyzerView';

vi.mock('../../db/PokeDB', () => ({
  getDB: vi.fn<() => Promise<unknown>>(),
}));

const mockGetDB = getDB as unknown as ReturnType<typeof vi.fn>;

function renderWithProviders(component: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute();
  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <>{component}</>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: undefined as unknown as ReturnType<typeof createRouter>['history'],
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router as unknown as ReturnType<typeof createRouter>} />
    </QueryClientProvider>,
  );
}

describe('BoxAnalyzerView', () => {
  beforeEach(() => {
    mockGetDB.mockResolvedValue({
      getAll: vi.fn<() => Promise<unknown>>().mockResolvedValue([
        { id: 1, n: 'Bulbasaur' },
        { id: 4, n: 'Charmander' },
        { id: 25, n: 'Pikachu' },
      ]),
    });
  });

  it('renders header and awaiting state when no data', async () => {
    useStore.setState({ saveData: null, searchTerm: '' });

    void renderWithProviders(<BoxAnalyzerView />);

    await expect.element(page.getByText('Box Analyzer')).toBeVisible();
    await expect.element(page.getByText('SYS.ANALYSIS.CORE')).toBeVisible();
    await expect.element(page.getByText('AWAITING DATA SYNC')).toBeVisible();
  });

  it('filters pcDetails by species name, nickname, and OT name', async () => {
    const pcDetails: Partial<PokemonInstance>[] = [
      { speciesId: 1, storageLocation: 'Box 1', hash: 'hash1', level: 5, moves: [] }, // Bulbasaur
      { speciesId: 4, storageLocation: 'Box 1', hash: 'hash2', nickname: 'Flame', level: 5, moves: [] }, // Charmander
      { speciesId: 25, storageLocation: 'Box 2', hash: 'hash3', otName: 'Ash', level: 5, moves: [] }, // Pikachu
    ];

    useStore.setState({
      saveData: {
        pcDetails: pcDetails as PokemonInstance[],
        generation: 3,
      } as unknown as import('../../engine/saveParser').SaveData,
      searchTerm: 'bulb',
    });

    void renderWithProviders(<BoxAnalyzerView />);
    await expect.element(page.getByText('SEARCH RESULTS: 1 FOUND')).toBeVisible();
    await expect.element(page.getByText('BULBASAUR')).toBeVisible();

    useStore.setState({ searchTerm: 'flame' });
    await expect.element(page.getByText('SEARCH RESULTS: 1 FOUND')).toBeVisible();
    await expect.element(page.getByText('CHARMANDER')).toBeVisible();

    useStore.setState({ searchTerm: 'ash' });
    await expect.element(page.getByText('SEARCH RESULTS: 1 FOUND')).toBeVisible();
    await expect.element(page.getByText('PIKACHU')).toBeVisible();
  });

  it('shows no targets acquired when there are no matches', async () => {
    useStore.setState({
      saveData: {
        pcDetails: [],
        generation: 3,
      } as unknown as import('../../engine/saveParser').SaveData,
      searchTerm: 'missingno',
    });

    void renderWithProviders(<BoxAnalyzerView />);
    await expect.element(page.getByText('[ NO TARGETS ACQUIRED ]')).toBeVisible();
  });
});
