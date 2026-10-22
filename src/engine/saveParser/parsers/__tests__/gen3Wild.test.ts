import { describe, expect, it } from 'vitest';
import type { InteractionType } from '../../../data/gen3/wildModels';
import { GEN3_POKEMON_ITEM_OFFSET_IN_G } from '../gen3';
import {
  determineGen3HeldItemProbabilities,
  extractHeldItemFromSubstruct0,
  GEN3_WILD_LAND_CHANCES,
  parseGen3WildEncounterProbabilities,
} from '../gen3Wild';

describe('gen3Wild', () => {
  describe('parseGen3WildEncounterProbabilities', () => {
    it('should map land encounter chances correctly', () => {
      const slots = Array.from({ length: 12 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 2, maxLevel: 5 }));
      const encounters = parseGen3WildEncounterProbabilities('land', slots);

      expect(encounters).toHaveLength(12);
      expect(encounters[0]?.chance).toBe(20);
      expect(encounters[10]?.chance).toBe(1);
    });

    it('should map water encounter chances correctly', () => {
      const slots = Array.from({ length: 5 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 5, maxLevel: 35 }));
      const encounters = parseGen3WildEncounterProbabilities('water', slots);

      expect(encounters).toHaveLength(5);
      expect(encounters[0]?.chance).toBe(60);
      expect(encounters[4]?.chance).toBe(1);
    });

    it('should map rockSmash encounter chances correctly', () => {
      const slots = Array.from({ length: 5 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 10, maxLevel: 20 }));
      const encounters = parseGen3WildEncounterProbabilities('rockSmash', slots);

      expect(encounters).toHaveLength(5);
      expect(encounters[0]?.chance).toBe(60);
      expect(encounters[4]?.chance).toBe(1);
    });

    it('should map fishing encounter chances correctly', () => {
      const slots = Array.from({ length: 10 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 5, maxLevel: 45 }));
      const encounters = parseGen3WildEncounterProbabilities('fishing', slots);

      expect(encounters).toHaveLength(10);
      expect(encounters[0]?.chance).toBe(70);
      expect(encounters[9]?.chance).toBe(1);
    });

    it('should handle unmapped interaction types', () => {
      const slots = Array.from({ length: 5 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 5, maxLevel: 45 }));
      const encounters = parseGen3WildEncounterProbabilities('unknown' as InteractionType, slots);

      expect(encounters).toHaveLength(0);
    });

    it('should handle slot array being larger than chance array length', () => {
      const slots = Array.from({ length: 15 }).map((_, i) => ({ pokemonId: i + 1, minLevel: 2, maxLevel: 5 }));
      const encounters = parseGen3WildEncounterProbabilities('land', slots);

      expect(encounters).toHaveLength(12);
      expect(encounters[0]?.chance).toBe(20);
      expect(encounters[11]?.chance).toBe(1);
    });

    it('should fall back to 0 chance if chances[index] is undefined', () => {
      const originalValue = GEN3_WILD_LAND_CHANCES[0];
      // biome-ignore lint/suspicious/noExplicitAny: deliberate modification for test coverage
      delete (GEN3_WILD_LAND_CHANCES as any)[0];

      const slots = [{ pokemonId: 1, minLevel: 2, maxLevel: 5 }];
      const encounters = parseGen3WildEncounterProbabilities('land', slots);

      expect(encounters[0]?.chance).toBe(0);

      if (originalValue !== undefined) {
        GEN3_WILD_LAND_CHANCES[0] = originalValue;
      }
    });
  });

  describe('determineGen3HeldItemProbabilities', () => {
    it('should return 100% chance if common and rare items are identical', () => {
      const drops = determineGen3HeldItemProbabilities(15, 15, false);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(100);
    });

    it('should return base probabilities without Compound Eyes', () => {
      const drops = determineGen3HeldItemProbabilities(15, 20, false);
      expect(drops).toHaveLength(2);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(50);
      expect(drops[1]?.itemId).toBe(20);
      expect(drops[1]?.chance).toBe(5);
    });

    it('should return boosted probabilities with Compound Eyes', () => {
      const drops = determineGen3HeldItemProbabilities(15, 20, true);
      expect(drops).toHaveLength(2);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(60);
      expect(drops[1]?.itemId).toBe(20);
      expect(drops[1]?.chance).toBe(20);
    });

    it('should handle missing rare item', () => {
      const drops = determineGen3HeldItemProbabilities(15, 0, false);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(50);
    });

    it('should handle missing rare item with Compound Eyes', () => {
      const drops = determineGen3HeldItemProbabilities(15, 0, true);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(60);
    });

    it('should handle missing common item', () => {
      const drops = determineGen3HeldItemProbabilities(0, 15, false);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(5);
    });

    it('should handle missing common item with Compound Eyes', () => {
      const drops = determineGen3HeldItemProbabilities(0, 15, true);
      expect(drops).toHaveLength(1);
      expect(drops[0]?.itemId).toBe(15);
      expect(drops[0]?.chance).toBe(20);
    });

    it('should handle no items', () => {
      const drops = determineGen3HeldItemProbabilities(0, 0, false);
      expect(drops).toHaveLength(0);
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

    it('should extract correctly with an offset', () => {
      const buffer = new ArrayBuffer(24);
      const view = new DataView(buffer);
      view.setUint16(12 + GEN3_POKEMON_ITEM_OFFSET_IN_G, 42, true);

      const heldItem = extractHeldItemFromSubstruct0(view, 12);
      expect(heldItem).toBe(42);
    });

    it('should throw corrupted error on out of bounds', () => {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);

      expect(() => extractHeldItemFromSubstruct0(view, 10)).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
