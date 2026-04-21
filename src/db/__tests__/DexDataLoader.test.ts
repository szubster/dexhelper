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

  it('covers getPokemonDetails missing lines for traversing ancestors/descendants', async () => {
    const mockPokes: PokemonMetadata[] = [
      {
        id: 1,
        n: 'Bulba',
        cr: 45,
        gr: 1,
        baby: false,
        efrm: [0], // Fake ancestor
        eto: [{ id: 2, eto: [], det: [] }], // Fake descendant
        det: [],
      } as unknown as PokemonMetadata,
      { id: 2, n: 'Ivy' } as unknown as PokemonMetadata,
      { id: 0, n: 'Egg' } as unknown as PokemonMetadata,
    ];

    vi.mocked(pokeDB.getPokemons).mockImplementation(async (ids: number[]) => {
      return ids.map((id) => mockPokes.find((p) => p.id === id) || new Error('Not found'));
    });
    vi.mocked(pokeDB.getEncounters).mockResolvedValue({ pid: 1, enc: [{ aid: 99, v: 1, d: [] }] });
    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({ 99: 'Test Area' });

    const result = await dexDataLoader.getPokemonDetails(1);
    expect(result.nameMap[2]).toBe('Ivy');
    expect(result.nameMap[0]).toBe('Egg');
  });

  it('covers getPokemonDetails fallback when encounters throws/returns undefined', async () => {
    const mockPokes: PokemonMetadata[] = [
      {
        id: 1,
        n: 'Bulba',
        cr: 45,
        gr: 1,
        baby: false,
        efrm: [0],
        eto: [],
        det: [],
      } as PokemonMetadata,
      { id: 0, n: 'Egg' } as unknown as PokemonMetadata,
    ];
    vi.mocked(pokeDB.getPokemons).mockImplementation(async (ids: number[]) => {
      return ids.map((id) => mockPokes.find((p) => p.id === id) || new Error('Not found'));
    });

    // The DataLoader throws the Error we returned in the batch function if a record wasn't found.
    // However, the test can just let DataLoader return an Error and we check if getPokemonDetails catches it.
    // Wait, `await dexDataLoader.encounters.load(id)` will throw if DataLoader mapped it to an Error!
    // Since getPokemonDetails doesn't catch it internally, let's catch it in the test to ensure that logic wasn't fully tested or we should mock it returning an Error directly if possible...
    // Actually, DataLoader throws the error returned from the batch load function!
    vi.mocked(pokeDB.getEncounters).mockResolvedValue(undefined);
    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({});

    await expect(dexDataLoader.getPokemonDetails(1)).rejects.toThrow('Encounters not found for 1');
  });

  it('covers getPokemonDetails fallback when encounters is explicitly an Error from a bulk load', async () => {
    const mockPokes: PokemonMetadata[] = [
      {
        id: 1,
        n: 'Bulba',
        cr: 45,
        gr: 1,
        baby: false,
        efrm: [0],
        eto: [],
        det: [],
      } as PokemonMetadata,
    ];
    vi.mocked(pokeDB.getPokemons).mockImplementation(async (ids: number[]) => {
      // Since the loop gets ancestors using ids filter, we need to make sure it doesn't throw.
      return ids.map((id) => {
        const p = mockPokes.find((p) => p.id === id);
        if (p) return p;
        // Return a mock object rather than Error to prevent DataLoader from rejecting in test
        return { id, n: `Fake-${id}` } as unknown as PokemonMetadata;
      });
    });

    // We must bypass `dexDataLoader.encounters.load` throwing an error by mocking it to return an Error
    // but DataLoader type expects T, we can cast it
    vi.spyOn(dexDataLoader.encounters, 'load').mockResolvedValueOnce(
      new Error('Manual error') as unknown as LocationAreaEncounters,
    );
    // Since ancestor 0 will be fetched, we need to make sure pokeDB.getPokemons returns something for it
    vi.mocked(pokeDB.getAreaNames).mockResolvedValue({});

    const result = await dexDataLoader.getPokemonDetails(1);
    expect(result.enc).toEqual([]);
    expect(result.nameMap[0]).toBe('Fake-0'); // The mock ID 0 isn't properly returned except via Fake-0.
  });
});
