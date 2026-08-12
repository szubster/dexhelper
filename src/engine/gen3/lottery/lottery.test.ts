import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/parsers/common';
import { calculateLotteryTier, checkSaveDataForLottery, getBestLotteryMatch } from './lottery';

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
        { otId: 33809 } as unknown as PokemonInstance, // Tier 3 (33809 & 0xFFFF = 33809 => ends in 345, vs 12345 -> 3 match)
        { otId: 12345 } as unknown as PokemonInstance, // Tier 1 (12345 & 0xFFFF = 12345 -> 5 match)
      ];
      const winningNumber = 12345;

      const result = getBestLotteryMatch(pokemonList, winningNumber);
      expect(result.tier).toBe(1);
      expect(result.winningPokemon).toEqual({ otId: 12345 });
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

    it('should extract the 16-bit Trainer ID and ignore the 16-bit Secret ID', () => {
      // otId is stored as a 32-bit number (SID << 16 | TID)
      // SID = 0x8765, TID = 0x4321
      // otId = 0x87654321 = 2271560481
      // TID = 0x4321 = 17185
      const pokemonList = [{ otId: 0x87654321 } as unknown as PokemonInstance];

      // If we match exactly the Trainer ID part (17185), it should be a perfect match (Tier 1).
      const result1 = getBestLotteryMatch(pokemonList, 17185);
      expect(result1.tier).toBe(1);
      expect(result1.winningPokemon).toEqual({ otId: 0x87654321 });

      // If we attempt to match the full 32-bit otId (which is impossible in-game but proves we mask), it shouldn't match.
      const result2 = getBestLotteryMatch(pokemonList, 2271560481);
      expect(result2.tier).toBe(0); // Because 17185 != 2271560481 in any of the lower digits
    });
  });

  describe('checkSaveDataForLottery', () => {
    it('should find best match checking both party and pc pokemon', () => {
      const saveData = {
        partyDetails: [
          { otId: 11111 } as unknown as PokemonInstance,
          { otId: 33809 } as unknown as PokemonInstance, // Tier 3 match
        ],
        pcDetails: [
          { otId: 22222 } as unknown as PokemonInstance,
          { otId: 32345 } as unknown as PokemonInstance, // Tier 2 match (better)
        ],
      } as unknown as SaveData;
      const winningNumber = 12345;

      const result = checkSaveDataForLottery(saveData, winningNumber);
      expect(result.tier).toBe(2);
      expect(result.winningPokemon).toEqual({ otId: 32345 });
    });

    it('should prioritize Party match if ties occur', () => {
      const saveData = {
        partyDetails: [
          { otId: 32345, speciesId: 1 } as unknown as PokemonInstance, // Tier 2 match
        ],
        pcDetails: [
          { otId: 32345, speciesId: 2 } as unknown as PokemonInstance, // Tier 2 match
        ],
      } as unknown as SaveData;
      const winningNumber = 12345;

      const result = checkSaveDataForLottery(saveData, winningNumber);
      expect(result.tier).toBe(2);
      // Party comes first in array concat, so it's matched first. But wait, getBestLotteryMatch only replaces if tier < bestTier.
      // So the first one found with Tier 2 will be kept.
      expect(result.winningPokemon).toEqual({ otId: 32345, speciesId: 1 });
    });

    it('should return tier 0 if lists are empty', () => {
      const saveData = {
        partyDetails: [],
        pcDetails: [],
      } as unknown as SaveData;
      const winningNumber = 12345;

      const result = checkSaveDataForLottery(saveData, winningNumber);
      expect(result.tier).toBe(0);
      expect(result.winningPokemon).toBeNull();
    });
  });
});
