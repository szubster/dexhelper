import { describe, expect, it } from 'vitest';
import { NATIONAL_DEX_MAX } from './constants';
import { extractPokedexGaps } from './gaps';

describe('extractPokedexGaps', () => {
  it('should calculate missing pokemon correctly', () => {
    const seen = new Set([1, 2, 3]);
    const owned = new Set([1, 2]);

    const result = extractPokedexGaps(seen, owned);

    // Bulbasaur (1) and Ivysaur (2) are owned, so they should not be in missing
    expect(result.missingNational.has(1)).toBe(false);
    expect(result.missingNational.has(2)).toBe(false);

    // Venusaur (3) is seen but not owned, so it should be in missing
    expect(result.missingNational.has(3)).toBe(true);

    // Missing National should contain all other 383 Pokemon
    expect(result.missingNational.size).toBe(NATIONAL_DEX_MAX - 2);

    // Hoenn dex doesn't contain Bulbasaur line, check for Treecko (252)
    expect(result.missingHoenn.has(252)).toBe(true);

    // Total missing Hoenn should be 202 because we own 0 Hoenn pokemon
    expect(result.missingHoenn.size).toBe(202);
  });

  it('should not contain owned Hoenn pokemon in missing Hoenn dex', () => {
    const seen = new Set([252, 253]);
    const owned = new Set([252]);

    const result = extractPokedexGaps(seen, owned);

    // Treecko (252) is owned
    expect(result.missingHoenn.has(252)).toBe(false);
    // Grovyle (253) is not owned
    expect(result.missingHoenn.has(253)).toBe(true);

    // Total missing Hoenn should be 201
    expect(result.missingHoenn.size).toBe(201);
  });
});
