import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../../db/PokeDB';
import type { PokemonMetadata } from '../../../../db/schema';
import { usePathfinderStore } from '../../store';
import { TargetPokemonSelector } from '../TargetPokemonSelector';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<() => Promise<PokemonMetadata[]>>(),
    getPokemon: vi.fn<(id: number) => Promise<PokemonMetadata>>(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('TargetPokemonSelector', () => {
  beforeEach(() => {
    usePathfinderStore.setState({ targetPokemon: null, eggMove: null, availableEggMoves: [] });
    vi.resetAllMocks();
    queryClient.clear();
  });

  it('renders default option and fetches pokemon', async () => {
    expect.hasAssertions();
    vi.mocked(pokeDB.getAllPokemon).mockResolvedValue([
      { id: 1, n: 'Bulbasaur' } as PokemonMetadata,
      { id: 4, n: 'Charmander' } as PokemonMetadata,
    ]);

    await render(
      <QueryClientProvider client={queryClient}>
        <TargetPokemonSelector />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Target Species')).toBeInTheDocument();

    // Check for default option
    const select = page.getByRole('combobox');
    await expect.element(select).toBeInTheDocument();
    await expect.element(page.getByText('-- SELECT TARGET --')).toBeInTheDocument();

    // Check for options (Wait for query to resolve)
    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();
    await expect.element(page.getByText('CHARMANDER')).toBeInTheDocument();
  });

  it('sorts pokemon alphabetically', async () => {
    expect.hasAssertions();
    vi.mocked(pokeDB.getAllPokemon).mockResolvedValue([
      { id: 4, n: 'Charmander' } as PokemonMetadata,
      { id: 1, n: 'Bulbasaur' } as PokemonMetadata,
      { id: 7, n: 'Squirtle' } as PokemonMetadata,
    ]);

    await render(
      <QueryClientProvider client={queryClient}>
        <TargetPokemonSelector />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();

    // Get all options by role and verify text content
    const options = page.getByRole('option').elements();

    expect(options).toHaveLength(4); // default + 3 pokemon

    await expect.element(options[1] ?? null).toHaveTextContent('BULBASAUR');
    await expect.element(options[2] ?? null).toHaveTextContent('CHARMANDER');
    await expect.element(options[3] ?? null).toHaveTextContent('SQUIRTLE');
  });

  it('updates store state when a pokemon is selected', async () => {
    expect.hasAssertions();
    vi.mocked(pokeDB.getAllPokemon).mockResolvedValue([{ id: 1, n: 'Bulbasaur' } as PokemonMetadata]);

    // Mock getPokemon for the store's setTargetPokemon action
    vi.mocked(pokeDB.getPokemon).mockResolvedValue({
      id: 1,
      n: 'Bulbasaur',
      em: {
        33: [1],
      },
    } as unknown as PokemonMetadata);

    await render(
      <QueryClientProvider client={queryClient}>
        <TargetPokemonSelector />
      </QueryClientProvider>,
    );

    // Wait for options to load
    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();

    const select = page.getByRole('combobox');
    await userEvent.selectOptions(select, '1');

    // Wait for the state update (which includes an async call to getPokemon)
    await vi.waitFor(() => {
      expect(usePathfinderStore.getState().targetPokemon).toBe(1);
    });

    expect(usePathfinderStore.getState().availableEggMoves).toEqual([33]);
  });
});
