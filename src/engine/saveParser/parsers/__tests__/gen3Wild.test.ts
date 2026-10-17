import { describe, expect, it } from 'vitest';
import { GEN3_POKEMON_ITEM_OFFSET_IN_G } from '../gen3';
import {
  determineGen3HeldItemProbabilities,
  extractHeldItemFromSubstruct0,
  parseGen3WildEncounterProbabilities,
} from '../gen3Wild';

describe('gen3Wild', () => {
  describe('parseGen3WildEncounterProbabilities', () => {
    it('should map land encounter chances correctly', () => {
      const slots = Array.from({ length: 12 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 2, maxLevel: 5 }));
      const encounters = parseGen3WildEncounterProbabilities('land', slots);

      expect(encounters).toHaveLength(12);
      expect(encounters[0].chance).toBe(20);
      expect(encounters[10].chance).toBe(1);
    });
  });

  describe('determineGen3HeldItemProbabilities', () => {
    it('should return 100% chance if common and rare items are identical', () => {
      const drops = determineGen3HeldItemProbabilities(15, 15, false);
      expect(drops).toHaveLength(1);
      expect(drops[0]).toEqual({ itemId: 15, chance: 100 });
    });

    it('should return base probabilities without Compound Eyes', () => {
      const drops = determineGen3HeldItemProbabilities(15, 20, false);
      expect(drops).toHaveLength(2);
      expect(drops[0]).toEqual({ itemId: 15, chance: 50 });
      expect(drops[1]).toEqual({ itemId: 20, chance: 5 });
    });

    it('should return boosted probabilities with Compound Eyes', () => {
      const drops = determineGen3HeldItemProbabilities(15, 20, true);
      expect(drops).toHaveLength(2);
      expect(drops[0]).toEqual({ itemId: 15, chance: 60 });
      expect(drops[1]).toEqual({ itemId: 20, chance: 20 });
    });

    it('should handle missing rare item', () => {
      const drops = determineGen3HeldItemProbabilities(15, 0, false);
      expect(drops).toHaveLength(1);
      expect(drops[0]).toEqual({ itemId: 15, chance: 50 });
    });
  });

  describe('extractHeldItemFromSubstruct0', () => {
    it('should extract held item from growth substructure', () => {
      const buffer = new ArrayBuffer(12);
      const view = new DataView(buffer);
      view.setUint16(GEN3_POKEMON_ITEM_OFFSET_IN_G, 42, true);

      const heldItem = extractHeldItemFromSubstruct0(view, 0);
      expect(heldItem).toBe(42);
    });

    it('should throw corrupted error on out of bounds', () => {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);

      expect(() => extractHeldItemFromSubstruct0(view, 10)).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
