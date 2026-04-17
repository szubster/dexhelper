import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dexDataLoader } from '../DexDataLoader';
import { pokeDB } from '../PokeDB';
import type { CompactEncounter, PokemonMetadata } from '../schema';

// Mock pokeDB
vi.mock('../PokeDB', () => ({
  pokeDB: {
    getPokemons: vi.fn(),
    getEncounters: vi.fn(),
    getEncountersBatch: vi.fn(),
    getAreaNames: vi.fn(),
  },
}));

describe('DexDataLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear DataLoader cache between tests
    dexDataLoader.pokemon.clearAll();
    dexDataLoader.encounters.clearAll();
  });

  it('batches calls to pokeDB.getPokemons', async () => {
    const mockPokes = [{ id: 1, n: 'P1' } as PokemonMetadata, { id: 2, n: 'P2' } as PokemonMetadata];
    vi.mocked(pokeDB.getPokemons).mockResolvedValue(mockPokes);

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

  it('getPokemonDetails aggregates data correctly', async () => {
    vi.mocked(pokeDB.getPokemons).mockResolvedValue([
      {
        id: 1,
        n: 'P1',
        cr: 45,
        gr: 1,
        baby: false,
        eto: [],
        efrm: [],
        det: [],
      } as PokemonMetadata,
    ]);
    vi.mocked(pokeDB.getEncountersBatch).mockResolvedValue([
      {
        pid: 1,
        enc: [{ aid: 1, v: 1, d: [] }] as CompactEncounter[],
      },
    ]);
    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({ 1: 'Area 1' });

    const details = await dexDataLoader.getPokemonDetails(1);

    expect(details.pokemon.n).toBe('P1');
    expect(details.enc).toHaveLength(1);
    expect(details.areaNames).toEqual({ 1: 'Area 1' });
  });
});
