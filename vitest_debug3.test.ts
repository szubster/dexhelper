import 'fake-indexeddb/auto';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDB, pokeDB } from './src/db/PokeDB.ts';
import { DB_CONFIG } from './src/db/schema.ts';

describe('Debug PokeDB.test', () => {
  beforeEach(async () => {
    pokeDB._resetSync();
    const db = await getDB();
    await db.clear(DB_CONFIG.STORES.LOCATIONS);
    await db.clear(DB_CONFIG.STORES.METADATA);
  });

  it('getInverseIndexBulk uses adaptive cursor strategy for large queries', async () => {
    const mockData = {
      hash: 'new-hash-bulk-perf',
      poke: [],
      enc: [],
      loc: Array.from({length: 100}).map((_, i) => ({ id: i, n: `Area ${i}`, pids: [i], dist: {} })),
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as any);
    await pokeDB.sync();

    // Trigger large query > 25% of 100
    const idsToFetch = Array.from({length: 30}).map((_, i) => i);
    const results = await pokeDB.getInverseIndexBulk(idsToFetch);

    console.log("length:", results.length);
    console.log("RESULTS[0]:", results[0]);
    console.log("RESULTS[1]:", results[1]);
    console.log("RESULTS[29]:", results[29]);
    expect(results.length).toBe(30);
    expect(results[0]).toEqual([0]);
    expect(results[29]).toEqual([29]);
  });
});
