import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dexDataLoader } from '../DexDataLoader';
import { pokeDB } from '../PokeDB';
import type { CompactChainLink, CompactEncounter, PokemonMetadata } from '../schema';

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
    // biome-ignore lint/suspicious/noExplicitAny: accessing internal cache for testing
    (dexDataLoader.pokemon as any).clearAll();
    // biome-ignore lint/suspicious/noExplicitAny: accessing internal cache for testing
    (dexDataLoader.chains as any).clearAll();
    // biome-ignore lint/suspicious/noExplicitAny: accessing internal cache for testing
    (dexDataLoader.encounters as any).clearAll();
  });

  it('batches calls to pokeDB.getPokemons', async () => {
    const mockPokes = [
      { id: 1, n: 'P1' },
      { id: 2, n: 'P2' },
    ];
    vi.mocked(pokeDB.getPokemons).mockResolvedValue(mockPokes as unknown as PokemonMetadata[]);

    const [p1, p2] = await Promise.all([dexDataLoader.pokemon.load(1), dexDataLoader.pokemon.load(2)]);

    expect(p1).toEqual(mockPokes[0]);
    expect(p2).toEqual(mockPokes[1]);
    expect(pokeDB.getPokemons).toHaveBeenCalledTimes(1);
    expect(pokeDB.getPokemons).toHaveBeenCalledWith([1, 2]);
  });

  it('handles errors from pokeDB', async () => {
    vi.mocked(pokeDB.getPokemons).mockResolvedValue([new Error('Not Found')]);

    await expect(dexDataLoader.pokemon.load(999)).rejects.toThrow('Not Found');
  });

  it('loads chains correctly', async () => {
    vi.mocked(pokeDB.getChain).mockResolvedValue({ id: 10, chain: {} as CompactChainLink });

    const c10 = await dexDataLoader.chains.load(10);

    expect(c10.id).toBe(10);
  });

  it('getPokemonDetails aggregates data correctly', async () => {
    vi.mocked(pokeDB.getPokemons).mockResolvedValue([{ id: 1, n: 'P1', cid: 10 } as unknown as PokemonMetadata]);
    vi.mocked(pokeDB.getEncounters).mockResolvedValue({
      pid: 1,
      encounters: [{ slug: 'area-1' }] as unknown as CompactEncounter[],
    });
    vi.mocked(pokeDB.getChain).mockResolvedValue({ id: 10, chain: {} as CompactChainLink });

    const details = await dexDataLoader.getPokemonDetails(1);

    expect(details.pokemon.n).toBe('P1');
    expect(details.encounters).toHaveLength(1);
    expect(details.evolutionChain?.id).toBe(10);
  });
});
