import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../../saveParser/parsers/common';
import { calculateLotteryTier, getBestLotteryMatch } from './lottery';

describe('Lottery Matching Logic', () => {
  describe('calculateLotteryTier', () => {
    it('should return 1 for a 5-digit match', () => {
      expect(calculateLotteryTier(12345, 12345)).toBe(1);
    });

    it('should return 2 for a 4-digit match', () => {
      expect(calculateLotteryTier(92345, 12345)).toBe(2);
    });

    it('should return 3 for a 3-digit match', () => {
      expect(calculateLotteryTier(99345, 12345)).toBe(3);
    });

    it('should return 4 for a 2-digit match', () => {
      expect(calculateLotteryTier(99945, 12345)).toBe(4);
    });

    it('should return 0 for a 1-digit match or no match', () => {
      expect(calculateLotteryTier(99995, 12345)).toBe(0);
      expect(calculateLotteryTier(99999, 12345)).toBe(0);
    });

    it('should handle zero-padding correctly', () => {
      expect(calculateLotteryTier(12, 12)).toBe(1); // 00012 == 00012 -> 5 matches -> tier 1
      expect(calculateLotteryTier(112, 12)).toBe(4); // 00112 vs 00012 -> 2 matches -> tier 4
      expect(calculateLotteryTier(1112, 12)).toBe(4); // 01112 vs 00012 -> 2 matches -> tier 4
      expect(calculateLotteryTier(11112, 12)).toBe(4); // 11112 vs 00012 -> 2 matches -> tier 4
      expect(calculateLotteryTier(12, 99012)).toBe(3); // 00012 vs 99012 -> 3 matches -> tier 3
      expect(calculateLotteryTier(12, 90012)).toBe(2); // 00012 vs 90012 -> 4 matches -> tier 2
    });
  });

  describe('getBestLotteryMatch', () => {
    it('should return the best match and corresponding pokemon', () => {
      const pokemonList = [
        { otId: 11111 } as unknown as PokemonInstance, // No match
        { otId: 99345 } as unknown as PokemonInstance, // Tier 3
        { otId: 92345 } as unknown as PokemonInstance, // Tier 2
      ];
      const winningNumber = 12345;

      const result = getBestLotteryMatch(pokemonList, winningNumber);
      expect(result.tier).toBe(2);
      expect(result.winningPokemon).toEqual({ otId: 92345 });
    });

    it('should return tier 0 if no match found', () => {
      const pokemonList = [
        { otId: 11111 } as unknown as PokemonInstance,
        { otId: 22222 } as unknown as PokemonInstance,
      ];
      const winningNumber = 12345;

      const result = getBestLotteryMatch(pokemonList, winningNumber);
      expect(result.tier).toBe(0);
      expect(result.winningPokemon).toBeNull();
    });
  });
});
