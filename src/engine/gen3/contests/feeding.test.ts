import { describe, expect, it } from 'vitest';
import type { PokeblockProfile } from './blending';
import { MAX_CONDITION, MAX_FEEL } from './constants';
import { type ContestStats, calculateFeedingGains, feedPokeblock } from './feeding';

describe('feeding math', () => {
  const dummyPokeblock: PokeblockProfile = {
    spicy: 10,
    dry: 10,
    sweet: 10,
    bitter: 10,
    sour: 10,
    feel: 20,
  };

  const initialStats: ContestStats = {
    cool: 0,
    beauty: 0,
    cute: 0,
    smart: 0,
    tough: 0,
    sheen: 0,
  };

  describe('calculateFeedingGains', () => {
    it('applies neutral nature correctly', () => {
      const gains = calculateFeedingGains(dummyPokeblock, 'hardy');
      expect(gains).toEqual({
        cool: 10,
        beauty: 10,
        cute: 10,
        smart: 10,
        tough: 10,
      });
    });

    it('applies positive and negative nature modifiers correctly (Adamant: +spicy/-dry)', () => {
      const gains = calculateFeedingGains(dummyPokeblock, 'adamant');
      expect(gains).toEqual({
        cool: 11,
        beauty: 9,
        cute: 10,
        smart: 10,
        tough: 10,
      });
    });
  });

  describe('feedPokeblock', () => {
    it('increases stats and sheen correctly', () => {
      const result = feedPokeblock(initialStats, dummyPokeblock, 'hardy');
      expect(result).toEqual({
        cool: 10,
        beauty: 10,
        cute: 10,
        smart: 10,
        tough: 10,
        sheen: 20,
      });
    });

    it('caps stats at MAX_CONDITION and sheen at MAX_FEEL', () => {
      const maxedStats: ContestStats = {
        cool: 250,
        beauty: 250,
        cute: 250,
        smart: 250,
        tough: 250,
        sheen: 240,
      };

      const bigBlock: PokeblockProfile = {
        spicy: 20,
        dry: 20,
        sweet: 20,
        bitter: 20,
        sour: 20,
        feel: 30,
      };

      const result = feedPokeblock(maxedStats, bigBlock, 'hardy');
      expect(result).toEqual({
        cool: MAX_CONDITION,
        beauty: MAX_CONDITION,
        cute: MAX_CONDITION,
        smart: MAX_CONDITION,
        tough: MAX_CONDITION,
        sheen: MAX_FEEL,
      });
    });

    it('returns stats unchanged if sheen is already maxed', () => {
      const maxedSheenStats: ContestStats = {
        ...initialStats,
        sheen: MAX_FEEL,
      };

      const result = feedPokeblock(maxedSheenStats, dummyPokeblock, 'hardy');
      expect(result).toEqual(maxedSheenStats);
    });
  });
});
