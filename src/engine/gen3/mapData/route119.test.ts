import { describe, expect, it } from 'vitest';
import {
  FEEBAS_SPOT_COORDINATES,
  INACCESSIBLE_SPOTS_COUNT,
  isFeebasWaterTile,
  isValidRoute119Coordinate,
  NUM_FISHING_SPOTS,
  ROUTE_119_HEIGHT,
  ROUTE_119_WIDTH,
} from './route119';

describe('Route 119 Layout Data Constraints', () => {
  it('should define correct map dimensions', () => {
    expect(ROUTE_119_WIDTH).toBe(40);
    expect(ROUTE_119_HEIGHT).toBe(140);
  });

  it('should have the exact number of fishing spots mapped', () => {
    expect(FEEBAS_SPOT_COORDINATES.length).toBe(NUM_FISHING_SPOTS);
  });

  it('should track inaccessible spots count', () => {
    expect(INACCESSIBLE_SPOTS_COUNT).toBe(3);
  });

  describe('isValidRoute119Coordinate', () => {
    it('should return true for valid coordinates', () => {
      expect(isValidRoute119Coordinate(0, 0)).toBe(true);
      expect(isValidRoute119Coordinate(39, 139)).toBe(true);
      expect(isValidRoute119Coordinate(20, 70)).toBe(true);
    });

    it('should return false for out of bounds coordinates', () => {
      expect(isValidRoute119Coordinate(-1, 50)).toBe(false);
      expect(isValidRoute119Coordinate(50, -1)).toBe(false);
      expect(isValidRoute119Coordinate(40, 50)).toBe(false);
      expect(isValidRoute119Coordinate(20, 140)).toBe(false);
    });
  });

  describe('isFeebasWaterTile', () => {
    it('should return false for inaccessible spots (IDs 1-3)', () => {
      // IDs are 1-indexed, so 1, 2, 3 correspond to indices 0, 1, 2
      expect(isFeebasWaterTile(9, 7)).toBe(false); // Spot 1
      expect(isFeebasWaterTile(7, 13)).toBe(false); // Spot 2
      expect(isFeebasWaterTile(15, 16)).toBe(false); // Spot 3
    });

    it('should return true for valid surfable water tiles', () => {
      expect(isFeebasWaterTile(18, 18)).toBe(true); // Spot 4
      expect(isFeebasWaterTile(20, 73)).toBe(true); // Spot halfway
      expect(isFeebasWaterTile(8, 112)).toBe(true); // Spot 447
    });

    it('should return false for non-water tiles or out of bounds', () => {
      expect(isFeebasWaterTile(0, 0)).toBe(false);
      expect(isFeebasWaterTile(39, 139)).toBe(false);
      expect(isFeebasWaterTile(100, 100)).toBe(false);
    });
  });
});
