import { Packr } from 'msgpackr';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../../../src/db/PokeDB';
import 'fake-indexeddb/auto';

const packr = new Packr({ useRecords: true });

describe('Msgpack prefetch integration', () => {
  beforeEach(async () => {
    vi.restoreAllMocks();

    global.fetch = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      arrayBuffer: () => {
        // syncExtension populates ENCOUNTERS, LOCATIONS, BERRIES, METADATA
        // We simulate a location payload being injected
        const buffer = packr.pack({ loc: [{ id: 999, n: 'Mocked Location', pids: [1, 2, 3] }] });
        return Promise.resolve(
          buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer,
        );
      },
    } as Response);
  });

  it('should prefetch correctly using syncExtension and update the state', async () => {
    await pokeDB.syncExtension(1);

    // Ensure the fetch was triggered
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('pokedata-gen1.msgpack'));

    // Ensure the DB state was updated with the mock payload from syncExtension
    const location = await pokeDB.getLocation(999);
    expect(location).toBeDefined();
    expect(location?.n).toBe('Mocked Location');
  });
});
