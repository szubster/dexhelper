import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDB, pokeDB } from '../PokeDB';
import 'fake-indexeddb/auto';
import { DB_CONFIG } from '../schema';

// Mock build hash
// biome-ignore lint/suspicious/noExplicitAny: needed for test global setup
(globalThis as any).__POKEDATA_HASH__ = 'test-hash';
// biome-ignore lint/suspicious/noExplicitAny: needed for test global fetch mock
(globalThis as any).fetch = vi.fn();

describe('PokeDB', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const db = await getDB();
    const tx = db.transaction(Object.values(DB_CONFIG.STORES), 'readwrite');
    await Promise.all(Object.values(DB_CONFIG.STORES).map((s) => tx.objectStore(s as any).clear()));
    await tx.done;
  });

  it('syncs data correctly', async () => {
    const mockData = {
      hash: 'new-hash',
      pokemon: [
        {
          id: 1,
          sid: 1,
          n: 'Bulbasaur',
          s: [45, 49, 49, 65, 65, 45],
          cid: 1,
          cr: 45,
          gr: 1,
          baby: false,
        },
      ],
      encounters: [{ pid: 1, encounters: [] }],
      chains: [{ id: 1, chain: { sid: 1, evolves_to: [], details: [] } }],
      locations: [{ id: 1, n: 'Pallet Town', slug: 'pallet-town' }],
      areas: [{ id: 1, n: 'Area 1', slug: 'area-1', lid: 1 }],
      locationIndex: { '1': [1] },
    };

    (globalThis.fetch as any).mockResolvedValue({
      json: async () => mockData,
    });

    await pokeDB.sync();

    const p = await pokeDB.getPokemon(1);
    expect(p?.n).toBe('Bulbasaur');
    expect(p?.cid).toBe(1);
    expect(p?.cr).toBe(45);
  });

  it('performs bulk operations for pokemons', async () => {
    const mockData = {
      hash: 'bulk-hash',
      pokemon: [
        { id: 1, sid: 1, n: 'P1', s: [1, 1, 1, 1, 1, 1], cid: 1, cr: 10, gr: 1, baby: false },
        { id: 2, sid: 2, n: 'P2', s: [2, 2, 2, 2, 2, 2], cid: 1, cr: 10, gr: 1, baby: false },
      ],
      encounters: [],
      chains: [],
      locations: [],
      areas: [],
      locationIndex: {},
    };

    (globalThis.fetch as any).mockResolvedValue({
      json: async () => mockData,
    });

    await pokeDB.sync();

    const results = await pokeDB.getPokemons([1, 2, 999]);
    expect(results).toHaveLength(3);
    expect((results[0] as any).n).toBe('P1');
    expect((results[1] as any).n).toBe('P2');
    expect(results[2]).toBeInstanceOf(Error);
  });

  it('handles invalid IDs gracefully', async () => {
    expect(await pokeDB.getPokemon(NaN)).toBeUndefined();
    expect(await pokeDB.getPokemon(null as any)).toBeUndefined();

    const manyResult = await pokeDB.getPokemons([NaN]);
    expect(manyResult[0]).toBeInstanceOf(Error);
  });
});
