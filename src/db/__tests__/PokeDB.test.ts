import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDB, pokeDB } from '../PokeDB';
import 'fake-indexeddb/auto';
import { DB_CONFIG } from '../schema';

// Mock build hash
vi.stubGlobal('__POKEDATA_HASH__', 'test-hash');
vi.stubGlobal(
  'fetch',
  vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      hash: 'test-hash',
      pokemon: [],
      encounters: [],
      locations: [],
      areas: [],
      locationIndex: [],
    }),
  } as Response),
);

describe('PokeDB', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        hash: 'test-hash',
        pokemon: [],
        encounters: [],
        locations: [],
        areas: [],
        locationIndex: [],
      }),
    } as Response);
    pokeDB._resetSync();
    const db = await getDB();
    const tx = db.transaction(Object.values(DB_CONFIG.STORES), 'readwrite');
    await Promise.all(Object.values(DB_CONFIG.STORES).map((s) => tx.objectStore(s).clear()));
    await tx.done;
  });

  it('syncs data correctly', async () => {
    const mockData = {
      hash: 'new-hash',
      pokemon: [
        {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          gr: 1,
          baby: false,
          evolves_to: [],
          evolves_from: [],
          details: [],
        },
      ],
      encounters: [{ pid: 1, encounters: [] }],
      locations: [{ id: 1, n: 'Pallet Town' }],
      areas: [{ id: 1, n: 'Area 1' }],
      locationIndex: [{ id: 1, pids: [1] }],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const p = await pokeDB.getPokemon(1);
    expect(p?.n).toBe('Bulbasaur');
    expect(p?.cr).toBe(45);
  });

  it('performs bulk operations for pokemons', async () => {
    const mockData = {
      hash: 'bulk-hash',
      pokemon: [
        { id: 1, n: 'P1', cr: 10, gr: 1, baby: false, evolves_to: [], evolves_from: [], details: [] },
        { id: 2, n: 'P2', cr: 10, gr: 1, baby: false, evolves_to: [], evolves_from: [], details: [] },
      ],
      encounters: [],
      locations: [],
      areas: [],
      locationIndex: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const results = await pokeDB.getPokemons([1, 2, 999]);
    expect(results).toHaveLength(3);

    const r1 = results[0];
    if (!r1 || r1 instanceof Error) throw r1 ?? new Error('r1 undefined');
    expect(r1.n).toBe('P1');

    const r2 = results[1];
    if (!r2 || r2 instanceof Error) throw r2 ?? new Error('r2 undefined');
    expect(r2.n).toBe('P2');

    expect(results[2]).toBeInstanceOf(Error);
  });

  it('handles invalid IDs gracefully', async () => {
    expect(await pokeDB.getPokemon(NaN)).toBeUndefined();
    expect(await pokeDB.getPokemon(null as unknown as number)).toBeUndefined();

    const manyResult = await pokeDB.getPokemons([NaN]);
    expect(manyResult[0]).toBeInstanceOf(Error);
  });

  it('resolves area names correctly', async () => {
    const mockData = {
      hash: 'area-hash',
      pokemon: [],
      encounters: [],
      locations: [],
      areas: [
        { id: 1, n: 'Viridian Forest' },
        { id: 2, n: 'Route 1' },
      ],
      locationIndex: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const names = await pokeDB.getAreaNames([1, 2, 999]);
    expect(names).toEqual({
      1: 'Viridian Forest',
      2: 'Route 1',
    });
  });
});
