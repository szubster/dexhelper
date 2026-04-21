import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dexDataLoader } from '../DexDataLoader';
import { pokeDB } from '../PokeDB';
import type { CompactEncounter, LocationAreaEncounters, PokemonMetadata } from '../schema';

// Mock pokeDB
vi.mock('../PokeDB', () => ({
  pokeDB: {
    getPokemons: vi.fn(),
    getEncounters: vi.fn(),
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
    vi.mocked(pokeDB.getEncounters).mockResolvedValue({
      pid: 1,
      enc: [{ aid: 1, v: 1, d: [] }] as CompactEncounter[],
    });
    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({ 1: 'Area 1' });

    const details = await dexDataLoader.getPokemonDetails(1);

    expect(details.pokemon.n).toBe('P1');
    expect(details.enc).toHaveLength(1);
    expect(details.areaNames).toEqual({ 1: 'Area 1' });
  });

  it('resolves complex evolution trees with chained ids', async () => {
    const mockPokes = [
      { id: 2, n: 'P2', efrm: [1], eto: [{ id: 3, eto: [{ id: 4, eto: [] }] }] },
      { id: 1, n: 'P1', efrm: [], eto: [{ id: 2, eto: [] }] },
      { id: 3, n: 'P3', efrm: [2], eto: [{ id: 4, eto: [] }] },
      { id: 4, n: 'P4', efrm: [3], eto: [] },
    ] as unknown as PokemonMetadata[];

    vi.mocked(pokeDB.getPokemons).mockImplementation(async (ids) => {
      return ids.map((id) => {
        const found = mockPokes.find((p) => p.id === id);
        return found || new Error('Not found');
      });
    });

    vi.mocked(pokeDB.getEncounters).mockResolvedValue({
      pid: 2,
      enc: [{ aid: 99, v: 1, d: [] }],
    } as unknown as LocationAreaEncounters);

    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({ 99: 'Area 99' });

    const details = await dexDataLoader.getPokemonDetails(2);
    expect(details.pokemon.n).toBe('P2');
    expect(details.nameMap).toEqual({
      1: 'P1',
      2: 'P2',
      3: 'P3',
      4: 'P4',
    });
  });

  it('encounters dataloader handles missing encounters by returning error object', async () => {
    vi.mocked(pokeDB.getEncounters).mockResolvedValue(null as unknown as LocationAreaEncounters);
    const result = await dexDataLoader.encounters.load(999).catch((e) => e);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Encounters not found for 999');
  });

  it('getPokemonDetails handles missing encounters without crashing', async () => {
    vi.mocked(pokeDB.getPokemons).mockResolvedValue([
      { id: 1, n: 'P1', cr: 45, gr: 1, baby: false, eto: [], efrm: [], det: [] } as PokemonMetadata,
    ]);

    // Simulate DataLoader throwing (by returning Error in batch fn)
    vi.spyOn(dexDataLoader.encounters, 'load').mockResolvedValueOnce(
      new Error('Encounters not found') as unknown as LocationAreaEncounters,
    );

    const details = await dexDataLoader.getPokemonDetails(1);
    expect(details.enc).toHaveLength(0);
  });

  it('getPokemonDetails handles missing chain species safely', async () => {
    const mockPokes = [
      { id: 2, n: 'P2', efrm: [1], eto: [{ id: 3, eto: [] }] },
      // id 1 and id 3 are missing!
    ] as unknown as PokemonMetadata[];

    vi.mocked(pokeDB.getPokemons).mockImplementation(async (ids) => {
      return ids.map((id) => {
        const found = mockPokes.find((p) => p.id === id);
        return found || new Error('Not found');
      });
    });

    vi.mocked(pokeDB.getEncounters).mockResolvedValue({
      pid: 2,
      enc: [{ aid: 99, v: 1, d: [] }],
    } as unknown as LocationAreaEncounters);

    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({ 99: 'Area 99' });

    await expect(dexDataLoader.getPokemonDetails(2)).rejects.toThrow('Not found');
  });
});
