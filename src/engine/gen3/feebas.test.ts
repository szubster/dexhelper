import { describe, expect, it } from 'vitest';
import {
  calculateFeebasTiles,
  extractFeebasSeed,
  FEEBAS_SEED_RELATIVE_OFFSET_EMERALD,
  FEEBAS_SEED_RELATIVE_OFFSET_RS,
  mapSpotIdsToCoordinates,
} from './feebas';

describe('extractFeebasSeed', () => {
  it('extracts the Feebas seed for Ruby/Sapphire', () => {
    // 0x2dd6 + 2 bytes = 11736 bytes
    const buffer = new ArrayBuffer(12000);
    const view = new DataView(buffer);
    view.setUint16(0x1f00 + FEEBAS_SEED_RELATIVE_OFFSET_RS, 0x1234, true);

    const seedRuby = extractFeebasSeed(view, 'ruby', 0x1f00);
    expect(seedRuby).toBe(0x1234);

    const seedSapphire = extractFeebasSeed(view, 'sapphire', 0x1f00);
    expect(seedSapphire).toBe(0x1234);
  });

  it('extracts the Feebas seed for Emerald', () => {
    // 0x2e66 + 2 bytes = 11880 bytes
    const buffer = new ArrayBuffer(12000);
    const view = new DataView(buffer);
    view.setUint16(0x1f00 + FEEBAS_SEED_RELATIVE_OFFSET_EMERALD, 0x5678, true);

    const seedEmerald = extractFeebasSeed(view, 'emerald', 0x1f00);
    expect(seedEmerald).toBe(0x5678);
  });

  it('throws an error for unsupported game versions', () => {
    const buffer = new ArrayBuffer(12000);
    const view = new DataView(buffer);

    expect(() => extractFeebasSeed(view, 'firered', 0x1f00)).toThrow('Unsupported game version');
    expect(() => extractFeebasSeed(view, 'leafgreen', 0x1f00)).toThrow('Unsupported game version');
    expect(() => extractFeebasSeed(view, 'red', 0x1f00)).toThrow('Unsupported game version');
  });

  it('catches RangeError and re-throws specific corrupted file error', () => {
    // Buffer too small to read at 0x2dd6 (11734)
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);

    expect(() => extractFeebasSeed(view, 'ruby', 0x1f00)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('calculateFeebasTiles', () => {
  it('calculates exactly 6 valid spot IDs for a known seed', () => {
    const seed = 0x1234;
    const spots = calculateFeebasTiles(seed);
    expect(spots).toHaveLength(6);
    expect(spots).toEqual([247, 306, 425, 132, 230, 377]);
  });

  it('forces 0 to 447', () => {
    const spots = calculateFeebasTiles(0x0000);
    expect(spots).toHaveLength(6);
    for (const spot of spots) {
      expect(spot).toBeGreaterThanOrEqual(4);
      expect(spot).toBeLessThanOrEqual(447);
    }
  });
});

describe('mapSpotIdsToCoordinates', () => {
  it('maps spot IDs to relative (x, y) coordinates correctly', () => {
    const spots = [4, 447];
    const coords = mapSpotIdsToCoordinates(spots);
    expect(coords).toHaveLength(2);
    expect(coords[0]).toEqual([18, 18]);
    expect(coords[1]).toEqual([8, 112]);
  });
});
