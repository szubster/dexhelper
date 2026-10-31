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

    it.each([
      // Min boundary 0 ('00000') across all match lengths / tier levels
      { otId: 0, winningNumber: 0, expectedTier: 1, description: 'min boundary 0 vs 0 (5-digit match -> Tier 1)' },
      {
        otId: 0,
        winningNumber: 10000,
        expectedTier: 2,
        description: '0 vs 10000 trailing 4 zeros (4-digit match -> Tier 2)',
      },
      {
        otId: 0,
        winningNumber: 11000,
        expectedTier: 3,
        description: '0 vs 11000 trailing 3 zeros (3-digit match -> Tier 3)',
      },
      {
        otId: 0,
        winningNumber: 11100,
        expectedTier: 4,
        description: '0 vs 11100 trailing 2 zeros (2-digit match -> Tier 4)',
      },
      {
        otId: 0,
        winningNumber: 11110,
        expectedTier: 0,
        description: '0 vs 11110 trailing 1 zero (1-digit match -> Tier 0)',
      },
      { otId: 0, winningNumber: 11111, expectedTier: 0, description: 'min boundary 0 vs 11111 (0 matches -> Tier 0)' },

      // Max 16-bit Trainer ID boundary 65535 ('65535') across all match lengths / tier levels
      {
        otId: 65535,
        winningNumber: 65535,
        expectedTier: 1,
        description: 'max 16-bit TID 65535 vs 65535 (5-digit match -> Tier 1)',
      },
      {
        otId: 65535,
        winningNumber: 15535,
        expectedTier: 2,
        description: 'max 16-bit TID 65535 vs 15535 (4-digit match -> Tier 2)',
      },
      {
        otId: 65535,
        winningNumber: 11535,
        expectedTier: 3,
        description: 'max 16-bit TID 65535 vs 11535 (3-digit match -> Tier 3)',
      },
      {
        otId: 65535,
        winningNumber: 11135,
        expectedTier: 4,
        description: 'max 16-bit TID 65535 vs 11135 (2-digit match -> Tier 4)',
      },
      {
        otId: 65535,
        winningNumber: 11115,
        expectedTier: 0,
        description: 'max 16-bit TID 65535 vs 11115 (1-digit match -> Tier 0)',
      },
      {
        otId: 65535,
        winningNumber: 11111,
        expectedTier: 0,
        description: 'max 16-bit TID 65535 vs 11111 (0 matches -> Tier 0)',
      },

      // Max 5-digit decimal boundary 99999 ('99999') across all match lengths / tier levels
      {
        otId: 99999,
        winningNumber: 99999,
        expectedTier: 1,
        description: '5-digit max 99999 vs 99999 (5-digit match -> Tier 1)',
      },
      {
        otId: 99999,
        winningNumber: 19999,
        expectedTier: 2,
        description: '5-digit max 99999 vs 19999 (4-digit match -> Tier 2)',
      },
      {
        otId: 99999,
        winningNumber: 11999,
        expectedTier: 3,
        description: '5-digit max 99999 vs 11999 (3-digit match -> Tier 3)',
      },
      {
        otId: 99999,
        winningNumber: 11199,
        expectedTier: 4,
        description: '5-digit max 99999 vs 11199 (2-digit match -> Tier 4)',
      },
      {
        otId: 99999,
        winningNumber: 11119,
        expectedTier: 0,
        description: '5-digit max 99999 vs 11119 (1-digit match -> Tier 0)',
      },
      {
        otId: 99999,
        winningNumber: 11111,
        expectedTier: 0,
        description: '5-digit max 99999 vs 11111 (0 matches -> Tier 0)',
      },

      // Suffix (right-to-left) vs Prefix evaluation edge cases
      {
        otId: 12345,
        winningNumber: 12340,
        expectedTier: 0,
        description: '12345 vs 12340: 4 leading prefix matches but rightmost digit mismatch -> Tier 0',
      },
      {
        otId: 12345,
        winningNumber: 12305,
        expectedTier: 0,
        description: '12345 vs 12305: 1 rightmost match, 2nd rightmost mismatch -> Tier 0',
      },
      {
        otId: 12345,
        winningNumber: 12045,
        expectedTier: 4,
        description: '12345 vs 12045: 2 rightmost matches (45) -> Tier 4',
      },
      {
        otId: 12345,
        winningNumber: 10345,
        expectedTier: 3,
        description: '12345 vs 10345: 3 rightmost matches (345) -> Tier 3',
      },
      {
        otId: 12345,
        winningNumber: 92345,
        expectedTier: 2,
        description: '12345 vs 92345: 4 rightmost matches (2345) -> Tier 2',
      },

      // Single-digit zero-padded boundary values
      { otId: 7, winningNumber: 7, expectedTier: 1, description: '7 vs 7 (00007 vs 00007 -> Tier 1)' },
      {
        otId: 7,
        winningNumber: 10007,
        expectedTier: 2,
        description: '7 vs 10007 (00007 vs 10007 -> 4 matches -> Tier 2)',
      },
      {
        otId: 7,
        winningNumber: 11007,
        expectedTier: 3,
        description: '7 vs 11007 (00007 vs 11007 -> 3 matches -> Tier 3)',
      },
      {
        otId: 7,
        winningNumber: 11107,
        expectedTier: 4,
        description: '7 vs 11107 (00007 vs 11107 -> 2 matches -> Tier 4)',
      },
      {
        otId: 7,
        winningNumber: 11117,
        expectedTier: 0,
        description: '7 vs 11117 (00007 vs 11117 -> 1 match -> Tier 0)',
      },
      {
        otId: 7,
        winningNumber: 11111,
        expectedTier: 0,
        description: '7 vs 11111 (00007 vs 11111 -> 0 matches -> Tier 0)',
      },
    ])('parameterized boundary case: $description', ({ otId, winningNumber, expectedTier }) => {
      expect(calculateLotteryTier(otId, winningNumber)).toBe(expectedTier);
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
