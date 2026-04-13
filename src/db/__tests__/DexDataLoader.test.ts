import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dexDataLoader } from '../DexDataLoader';
import { pokeDB } from '../PokeDB';

// Mock pokeDB
vi.mock('../PokeDB', () => ({
  pokeDB: {
    getPokemons: vi.fn(),
    getChain: vi.fn(),
    getEncounters: vi.fn(),
  },
}));

describe('DexDataLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear DataLoader cache between tests
    (dexDataLoader.pokemon as any).clearAll();
    (dexDataLoader.chains as any).clearAll();
    (dexDataLoader.encounters as any).clearAll();
  });

  it('batches calls to pokeDB.getPokemons', async () => {
    const mockPokes = [
      { id: 1, n: 'P1' },
      { id: 2, n: 'P2' },
    ];
    (pokeDB.getPokemons as any).mockResolvedValue(mockPokes);

    const [p1, p2] = await Promise.all([dexDataLoader.pokemon.load(1), dexDataLoader.pokemon.load(2)]);

    expect(p1).toEqual(mockPokes[0]);
    expect(p2).toEqual(mockPokes[1]);
    expect(pokeDB.getPokemons).toHaveBeenCalledTimes(1);
    expect(pokeDB.getPokemons).toHaveBeenCalledWith([1, 2]);
  });

  it('handles errors from pokeDB', async () => {
    (pokeDB.getPokemons as any).mockResolvedValue([new Error('Not Found')]);

    await expect(dexDataLoader.pokemon.load(999)).rejects.toThrow('Not Found');
  });

  it('loads chains correctly', async () => {
    (pokeDB.getChain as any).mockResolvedValue({ id: 10, chain: {} });

    const c10 = await dexDataLoader.chains.load(10);

    expect(c10.id).toBe(10);
  });

  it('getPokemonDetails aggregates data correctly', async () => {
    (pokeDB.getPokemons as any).mockResolvedValue([{ id: 1, n: 'P1', cid: 10 }]);
    (pokeDB.getEncounters as any).mockResolvedValue({ pid: 1, encounters: [{ slug: 'area-1' }] });
    (pokeDB.getChain as any).mockResolvedValue({ id: 10, chain: {} });

    const details = await dexDataLoader.getPokemonDetails(1);

    expect(details.pokemon.n).toBe('P1');
    expect(details.encounters).toHaveLength(1);
    expect(details.evolutionChain?.id).toBe(10);
  });
});
