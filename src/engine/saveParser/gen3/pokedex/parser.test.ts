import { describe, expect, it } from 'vitest';
import { GEN3_POKEDEX_OFFSET, GEN3_POKEDEX_OWNED_OFFSET, GEN3_POKEDEX_SEEN_OFFSET } from './constants';
import { parseGen3Pokedex } from './parser';

describe('parseGen3Pokedex', () => {
  it('should parse seen and owned pokemon correctly', () => {
    // We need a buffer large enough for offset + 0x18 + 0x44 + (386 / 8) bytes (~140 bytes minimum, let's use 200)
    const buffer = new ArrayBuffer(200);
    const view = new DataView(buffer);
    const section0Offset = 0;

    const pokedexOwnedOffset = section0Offset + GEN3_POKEDEX_OFFSET + GEN3_POKEDEX_OWNED_OFFSET;
    const pokedexSeenOffset = section0Offset + GEN3_POKEDEX_OFFSET + GEN3_POKEDEX_SEEN_OFFSET;

    // Set Bulbasaur (Dex 1) as seen and owned
    // Dex 1 is bit index 0 (byte 0, bit 0)
    view.setUint8(pokedexOwnedOffset, 1);
    view.setUint8(pokedexSeenOffset, 1);

    // Set Pikachu (Dex 25) as seen only
    // Dex 25 is bit index 24 (byte 3, bit 0)
    view.setUint8(pokedexSeenOffset + 3, 1);

    // Set Mew (Dex 151) as owned and seen
    // Dex 151 is bit index 150 (byte 18, bit 6)
    view.setUint8(pokedexOwnedOffset + 18, 1 << 6);
    view.setUint8(pokedexSeenOffset + 18, 1 << 6);

    const result = parseGen3Pokedex(view, section0Offset);

    expect(result.owned.has(1)).toBe(true);
    expect(result.seen.has(1)).toBe(true);

    expect(result.owned.has(25)).toBe(false);
    expect(result.seen.has(25)).toBe(true);

    expect(result.owned.has(151)).toBe(true);
    expect(result.seen.has(151)).toBe(true);

    // Check some random not set ones
    expect(result.owned.has(4)).toBe(false);
    expect(result.seen.has(4)).toBe(false);
  });

  it('should throw an error if the DataView is out of bounds', () => {
    // Too small buffer to reach pokedex seen offset
    const buffer = new ArrayBuffer(50);
    const view = new DataView(buffer);

    expect(() => parseGen3Pokedex(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});
