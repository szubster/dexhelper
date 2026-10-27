import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap, getGen2MapName, resolveOutdoorMapId } from './index';

const mockGen1Locations: UnifiedLocation[] = [
  { id: 0x00, n: 'Pallet Town', conn: [0x01], dist: { 0x00: 0, 0x01: 1, 0x02: 2 } },
  { id: 0x01, n: 'Route 1', conn: [0x00, 0x02], dist: { 0x01: 0, 0x00: 1, 0x02: 1 } },
  { id: 0x02, n: 'Viridian City', conn: [0x01], dist: { 0x02: 0, 0x01: 1, 0x00: 2 } },
  { id: 10, n: 'Saffron City', conn: [], dist: { 10: 0, 0x01: 3 } },
];

const mockGen2Locations: UnifiedLocation[] = [
  { id: 0x0306, n: 'Goldenrod City', conn: [0x0a04], dist: { 0x0306: 0, 0x0a04: 1 } },
  { id: 0x0a04, n: 'Route 34', conn: [0x0306], dist: { 0x0a04: 0, 0x0306: 1 } },
];

const mockGen3Locations: UnifiedLocation[] = [
  { id: 0, n: 'Littleroot Town', conn: [1], dist: { 0: 0, 1: 1 } },
  { id: 1, n: 'Route 101', conn: [0], dist: { 1: 0, 0: 1 } },
];

describe('src/engine/mapGraph/index.ts', () => {
  describe('getDistanceToMap', () => {
    it('calculates distance correctly for Gen 1', () => {
      expect(getDistanceToMap(mockGen1Locations, 0x00, 0x01, 1)).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('falls back to Saffron City for unknown Gen 1 start map', () => {
      expect(getDistanceToMap(mockGen1Locations, 0x999, 0x01, 1)).toEqual({ distance: 3, name: 'Route 1' });
    });

    it('calculates distance correctly for Gen 2', () => {
      expect(getDistanceToMap(mockGen2Locations, 0x0306, 0x0a04, 2)).toEqual({ distance: 1, name: 'Route 34' });
    });

    it('falls back to Goldenrod City for unknown Gen 2 start map', () => {
      expect(getDistanceToMap(mockGen2Locations, 0x999, 0x0a04, 2)).toEqual({ distance: 1, name: 'Route 34' });
    });

    it('calculates distance correctly for Gen 3', () => {
      expect(getDistanceToMap(mockGen3Locations, 0, 1, 3)).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('falls back to Littleroot Town for unknown Gen 3 start map', () => {
      expect(getDistanceToMap(mockGen3Locations, 999, 1, 3)).toEqual({ distance: 1, name: 'Route 101' });
    });
  });

  describe('getGen2MapName', () => {
    it('formats and resolves Gen 2 map group and map ID correctly', () => {
      expect(getGen2MapName(mockGen2Locations, 3, 6)).toBe('Goldenrod City');
      expect(getGen2MapName(mockGen2Locations, 99, 99)).toBe('Unknown Location');
    });
  });

  describe('resolveOutdoorMapId', () => {
    it('resolves outdoor map ID', () => {
      const indoorLocs: UnifiedLocation[] = [
        { id: 1, n: 'Outdoor', conn: [], dist: {} },
        { id: 2, n: 'Indoor', prnt: 1, conn: [], dist: {} },
      ];
      expect(resolveOutdoorMapId(indoorLocs, 2)).toBe(1);
    });
  });
});
