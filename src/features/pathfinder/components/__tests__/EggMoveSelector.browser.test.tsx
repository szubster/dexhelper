import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../../db/PokeDB';
import type { MoveMetadata } from '../../../../db/schema';
import { usePathfinderStore } from '../../store';
import { EggMoveSelector } from '../EggMoveSelector';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getMovesBulk: vi.fn<(ids: number[]) => Promise<(MoveMetadata | Error)[]>>(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('EggMoveSelector', () => {
  beforeEach(() => {
    usePathfinderStore.setState({ targetPokemon: null, eggMove: null, availableEggMoves: [] });
    vi.resetAllMocks();
    queryClient.clear();
  });

  it('renders disabled when no available egg moves', async () => {
    expect.hasAssertions();

    usePathfinderStore.setState({ availableEggMoves: [] });
    vi.mocked(pokeDB.getMovesBulk).mockResolvedValue([]);

    await render(
      <QueryClientProvider client={queryClient}>
        <EggMoveSelector />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Target Egg Move')).toBeInTheDocument();

    const select = page.getByRole('combobox');
    await expect.element(select).toBeDisabled();
    await expect.element(page.getByText('-- SELECT MOVE --')).toBeInTheDocument();
  });

  it('fetches moves and displays them sorted alphabetically', async () => {
    expect.hasAssertions();

    usePathfinderStore.setState({ availableEggMoves: [33, 75, 14] });
    vi.mocked(pokeDB.getMovesBulk).mockResolvedValue([
      { id: 33, name: 'Tackle' } as MoveMetadata,
      { id: 75, name: 'Razor Leaf' } as MoveMetadata,
      { id: 14, name: 'Swords Dance' } as MoveMetadata,
    ]);

    await render(
      <QueryClientProvider client={queryClient}>
        <EggMoveSelector />
      </QueryClientProvider>,
    );

    const select = page.getByRole('combobox');
    await expect.element(select).toBeEnabled();

    // Wait for options to render
    await expect.element(page.getByText('RAZOR LEAF')).toBeInTheDocument();

    const options = page.getByRole('option').elements();
    expect(options).toHaveLength(4); // default + 3 moves

    // Check sorting
    await expect.element(options[1] ?? null).toHaveTextContent('RAZOR LEAF');
    await expect.element(options[2] ?? null).toHaveTextContent('SWORDS DANCE');
    await expect.element(options[3] ?? null).toHaveTextContent('TACKLE');

    expect(pokeDB.getMovesBulk).toHaveBeenCalledWith([33, 75, 14]);
  });

  it('updates store state when a move is selected', async () => {
    expect.hasAssertions();

    usePathfinderStore.setState({ availableEggMoves: [33] });
    vi.mocked(pokeDB.getMovesBulk).mockResolvedValue([{ id: 33, name: 'Tackle' } as MoveMetadata]);

    await render(
      <QueryClientProvider client={queryClient}>
        <EggMoveSelector />
      </QueryClientProvider>,
    );

    // Wait for options to render
    await expect.element(page.getByText('TACKLE')).toBeInTheDocument();

    const select = page.getByRole('combobox');
    await userEvent.selectOptions(select, '33');

    // Verify synchronous state update
    expect(usePathfinderStore.getState().eggMove).toBe(33);
  });
});
