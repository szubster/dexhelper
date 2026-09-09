import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../../../db/PokeDB';
import type { PokemonMetadata } from '../../../db/schema';
import { usePathfinderStore } from '../store';

vi.mock('../../../db/PokeDB', () => ({
  pokeDB: {
    getPokemon: vi.fn<(id: number) => Promise<PokemonMetadata>>(),
  },
}));

describe('usePathfinderStore', () => {
  beforeEach(() => {
    usePathfinderStore.setState({ targetPokemon: null, eggMove: null, availableEggMoves: [] });
    vi.resetAllMocks();
  });

  it('initializes with null state', () => {
    const state = usePathfinderStore.getState();
    expect(state.targetPokemon).toBeNull();
    expect(state.eggMove).toBeNull();
    expect(state.availableEggMoves).toEqual([]);
  });

  it('updates targetPokemon and fetches egg moves', async () => {
    vi.mocked(pokeDB.getPokemon).mockResolvedValue({
      id: 1,
      n: 'Bulbasaur',
      cr: 45,
      baby: false,
      eto: [],
      efrm: [],
      det: [],
      em: {
        33: [1],
        75: [1, 2],
      },
    } as unknown as PokemonMetadata);

    const store = usePathfinderStore.getState();
    await store.setTargetPokemon(1);

    expect(pokeDB.getPokemon).toHaveBeenCalledWith(1);
    expect(usePathfinderStore.getState().targetPokemon).toBe(1);
    expect(usePathfinderStore.getState().availableEggMoves).toEqual([33, 75]);
  });

  it('updates targetPokemon with no egg moves', async () => {
    vi.mocked(pokeDB.getPokemon).mockResolvedValue({
      id: 2,
      n: 'Ivysaur',
      cr: 45,
      baby: false,
      eto: [],
      efrm: [],
      det: [],
    } as unknown as PokemonMetadata);

    const store = usePathfinderStore.getState();
    await store.setTargetPokemon(2);

    expect(pokeDB.getPokemon).toHaveBeenCalledWith(2);
    expect(usePathfinderStore.getState().targetPokemon).toBe(2);
    expect(usePathfinderStore.getState().availableEggMoves).toEqual([]);
  });

  it('updates targetPokemon to null', async () => {
    const store = usePathfinderStore.getState();
    await store.setTargetPokemon(null);

    expect(pokeDB.getPokemon).not.toHaveBeenCalled();
    expect(usePathfinderStore.getState().targetPokemon).toBeNull();
    expect(usePathfinderStore.getState().availableEggMoves).toEqual([]);
  });

  it('updates eggMove', () => {
    const store = usePathfinderStore.getState();
    store.setEggMove(10);
    expect(usePathfinderStore.getState().eggMove).toBe(10);
  });
});
