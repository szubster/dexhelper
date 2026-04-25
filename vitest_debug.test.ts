import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDB, pokeDB } from './src/db/PokeDB.ts';
import { DB_CONFIG } from './src/db/schema.ts';

// Mock build hash
vi.stubGlobal('__POKEDATA_HASH__', 'test-hash');
vi.stubGlobal(
  'fetch',
  vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      hash: 'test-hash',
      poke: [],
      enc: [],
      loc: [],
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
        poke: [],
        enc: [],
        loc: [],
      }),
    } as Response);
    pokeDB._resetSync();
    const db = await getDB();
    const tx = db.transaction(Object.values(DB_CONFIG.STORES), 'readwrite');
    await Promise.all(
      [
        DB_CONFIG.STORES.POKEMON,
        DB_CONFIG.STORES.ENCOUNTERS,
        DB_CONFIG.STORES.LOCATIONS,
        DB_CONFIG.STORES.METADATA,
      ].map((s) => tx.objectStore(s).clear()),
    );
    await tx.done;
  });

  describe('Performance strategies', () => {
    it('getInverseIndexBulk uses adaptive cursor strategy for large queries', async () => {
      // Mock db records with large counts
      const mockData = {
        hash: 'new-hash-bulk-perf',
        poke: [],
        enc: [],
        loc: Array.from({length: 100}).map((_, i) => ({ id: i, n: `Area ${i}`, pids: [i], dist: {} })),
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      // Trigger large query > 25% of 100
      const idsToFetch = Array.from({length: 30}).map((_, i) => i);
      const results = await pokeDB.getInverseIndexBulk(idsToFetch);

      console.log("length:", results.length);
      console.log("0:", results[0]);
      console.log("29:", results[29]);

      expect(results.length).toBe(30);
      expect(results[0]).toEqual([0]);
      expect(results[29]).toEqual([29]);
    });
  });
});
