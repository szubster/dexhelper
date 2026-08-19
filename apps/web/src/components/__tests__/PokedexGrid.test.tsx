import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { pokeDB } from '../../db/PokeDB';
import { useStore } from '../../store';
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

const mockList = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon${i + 1}`,
  idString: String(i + 1).padStart(3, '0'),
  nameLower: `pokemon${i + 1}`,
}));

describe('PokedexGrid', () => {
  beforeEach(() => {
    useStore.setState({
      saveData: null,
      isLivingDex: false,
      searchTerm: '',
      filters: [],
      selectedLocationId: null,
    });
    vi.spyOn(pokeDB, 'getInverseIndex').mockResolvedValue([1, 2]);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await cleanup();
    queryClient.clear();
  });

  test('renders [ SYS.QUERY_FAILED ] when empty', async () => {
    const router = createMockRouter(<PokedexGrid pokemonList={[]} />);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('[ SYS.QUERY_FAILED ]', { exact: true })).toBeInTheDocument();
  });

  test('renders pokemon list when not empty', async () => {
    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('Pokemon1', { exact: true })).toBeInTheDocument();
  });

  test('clears filters when clear filters button is clicked', async () => {
    useStore.setState({
      searchTerm: 'none',
      filters: ['secured'],
      selectedLocationId: 99,
    });

    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);

    const btn = page.getByRole('button', { name: 'Clear all filters' });
    await expect.element(btn).toBeInTheDocument();

    await userEvent.click(btn);

    const state = useStore.getState();
    expect(state.searchTerm).toBe('');
    expect(state.filters).toEqual([]);
    expect(state.selectedLocationId).toBeNull();
  });

  test('filters by search term', async () => {
    useStore.setState({ searchTerm: 'pokemon2' });
    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('Pokemon2', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon1', { exact: true })).not.toBeInTheDocument();
  });

  test('filters by selected location', async () => {
    useStore.setState({ selectedLocationId: 10 });
    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);

    // Only IDs 1 and 2 should be in the location based on our mock
    await expect.element(page.getByText('Pokemon1', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon2', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon3', { exact: true })).not.toBeInTheDocument();
  });

  test('filters by secured filter', async () => {
    useStore.setState({
      filters: ['secured'],
      saveData: {
        generation: 1,
        party: [1],
        pc: [2],
        owned: new Set([1, 2, 3]),
        seen: new Set([1, 2, 3]),
        partyDetails: [],
        pcDetails: [],
      } as unknown as ReturnType<typeof useStore.getState>['saveData'],
    });
    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);

    // IDs 1 and 2 are in party/pc (secured)
    await expect.element(page.getByText('Pokemon1', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon2', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon3', { exact: true })).not.toBeInTheDocument();
  });

  test('filters by missing filter', async () => {
    useStore.setState({
      filters: ['missing'],
      saveData: {
        generation: 1,
        party: [1],
        pc: [2],
        owned: new Set([1, 2, 3]),
        seen: new Set([1, 2, 3]),
        partyDetails: [],
        pcDetails: [],
      } as unknown as ReturnType<typeof useStore.getState>['saveData'],
    });
    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);

    // IDs 3, 4, 5 are missing (not in party/pc)
    await expect.element(page.getByText('Pokemon1', { exact: true })).not.toBeInTheDocument();
    await expect.element(page.getByText('Pokemon3', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon4', { exact: true })).toBeInTheDocument();
  });

  test('filters by dex-only filter', async () => {
    useStore.setState({
      filters: ['dex-only'],
      saveData: {
        generation: 1,
        party: [1],
        pc: [2],
        owned: new Set([1, 2, 3]),
        seen: new Set([1, 2, 3]),
        partyDetails: [],
        pcDetails: [],
      } as unknown as ReturnType<typeof useStore.getState>['saveData'],
    });
    const router = createMockRouter(<PokedexGrid pokemonList={mockList} />);
    await render(<RouterProvider router={router} />);

    // ID 3 is in dex (owned) but not secured (not in party/pc)
    await expect.element(page.getByText('Pokemon1', { exact: true })).not.toBeInTheDocument();
    await expect.element(page.getByText('Pokemon2', { exact: true })).not.toBeInTheDocument();
    await expect.element(page.getByText('Pokemon3', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Pokemon4', { exact: true })).not.toBeInTheDocument();
  });
});
