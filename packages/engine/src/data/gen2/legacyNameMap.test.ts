import { describe, expect, it } from 'vitest';
import { gen2Items, gen2Locations } from './legacyNameMap';

describe('legacyNameMap', () => {
  describe('gen2Items', () => {
    it('should be defined', () => {
      expect(gen2Items).toBeDefined();
    });

    it('should map valid item IDs to strings', () => {
      expect(gen2Items[1]).toBe('Master Ball');
      expect(gen2Items[2]).toBe('Ultra Ball');
      // Edge cases - last known item
      expect(gen2Items[255]).toBe('Teru-sama');
    });

    it('should not contain undefined values for valid mapping IDs', () => {
      // Get all values from the record
      const values = Object.values(gen2Items);

      // Ensure we have mappings
      expect(values.length).toBeGreaterThan(0);

      // Ensure no values are undefined or empty strings
      values.forEach((value) => {
        expect(value).toBeDefined();
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('gen2Locations', () => {
    it('should be defined', () => {
      expect(gen2Locations).toBeDefined();
    });

    it('should map valid location IDs to strings', () => {
      expect(gen2Locations[1]).toBe('New Bark Town');
      expect(gen2Locations[90]).toBe('Fast Ship');
    });

    it('should not contain undefined values for valid mapping IDs', () => {
      // Get all values from the record
      const values = Object.values(gen2Locations);

      // Ensure we have mappings
      expect(values.length).toBeGreaterThan(0);

      // Ensure no values are undefined or empty strings
      values.forEach((value) => {
        expect(value).toBeDefined();
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});
