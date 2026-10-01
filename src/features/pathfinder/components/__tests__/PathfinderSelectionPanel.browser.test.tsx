import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { usePathfinderStore } from '../../store';
import { PathfinderSelectionPanel } from '../PathfinderSelectionPanel';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<() => Promise<unknown[]>>().mockResolvedValue([]),
    getPokemon: vi.fn<(id: number) => Promise<unknown>>().mockResolvedValue({} as unknown),
    getMovesBulk: vi.fn<(ids: number[]) => Promise<unknown[]>>().mockResolvedValue([]),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('PathfinderSelectionPanel', () => {
  beforeEach(() => {
    usePathfinderStore.setState({ targetPokemon: null, eggMove: null, availableEggMoves: [] });
    vi.resetAllMocks();
    queryClient.clear();
  });

  it('renders the panel and its child selectors', async () => {
    expect.hasAssertions();

    await render(
      <QueryClientProvider client={queryClient}>
        <PathfinderSelectionPanel />
      </QueryClientProvider>,
    );

    // Verify Title
    await expect.element(page.getByText('SMART EGG PATHFINDER')).toBeInTheDocument();
    await expect.element(page.getByText('SYS.BREEDING_PATH')).toBeInTheDocument();

    // Verify Selectors
    await expect.element(page.getByText('Target Species')).toBeInTheDocument();
    await expect.element(page.getByText('Target Egg Move')).toBeInTheDocument();

    // Check that there are two comboboxes
    const selects = page.getByRole('combobox').elements();
    expect(selects).toHaveLength(2);
  });
});
