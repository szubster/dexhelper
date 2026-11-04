import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import * as gen1Graph from './gen1Graph';
import * as gen2Graph from './gen2Graph';
import * as gen3Graph from './gen3Graph';

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

describe('MapGraph Generation Wrappers', () => {
  describe('gen1Graph', () => {
    it('calculates distance to map using Gen 1 defaults', () => {
      expect(gen1Graph.getDistanceToMap(mockGen1Locations, 0x00, 0x01)).toEqual({
        distance: 1,
        name: 'Route 1',
      });
    });

    it('falls back to default Gen 1 fallback map for unknown start map ID', () => {
      expect(gen1Graph.getDistanceToMap(mockGen1Locations, 0x999, 0x01)).toEqual({
        distance: 3,
        name: 'Route 1',
      });
    });

    it('resolves outdoor map ID correctly', () => {
      const indoorLocs: UnifiedLocation[] = [
        { id: 1, n: 'Outdoor', conn: [], dist: {} },
        { id: 2, n: 'Indoor', prnt: 1, conn: [], dist: {} },
      ];
      expect(gen1Graph.resolveOutdoorMapId(indoorLocs, 2)).toBe(1);
    });
  });

  describe('gen2Graph', () => {
    it('calculates distance to map using Gen 2 defaults', () => {
      expect(gen2Graph.getDistanceToMap(mockGen2Locations, 0x0306, 0x0a04)).toEqual({
        distance: 1,
        name: 'Route 34',
      });
    });

    it('falls back to default Gen 2 fallback map for unknown start map ID', () => {
      expect(gen2Graph.getDistanceToMap(mockGen2Locations, 0x999, 0x0a04)).toEqual({
        distance: 1,
        name: 'Route 34',
      });
    });

    it('resolves Gen 2 map name via composite game ID', () => {
      expect(gen2Graph.getGen2MapName(mockGen2Locations, 3, 6)).toBe('Goldenrod City');
      expect(gen2Graph.getGen2MapName(mockGen2Locations, 99, 99)).toBe('Unknown Location');
    });

    it('resolves outdoor map ID correctly', () => {
      const indoorLocs: UnifiedLocation[] = [
        { id: 0x0306, n: 'Outdoor', conn: [], dist: {} },
        { id: 0x0307, n: 'Indoor', prnt: 0x0306, conn: [], dist: {} },
      ];
      expect(gen2Graph.resolveOutdoorMapId(indoorLocs, 0x0307)).toBe(0x0306);
    });
  });

  describe('gen3Graph', () => {
    it('calculates distance to map using Gen 3 defaults', () => {
      expect(gen3Graph.getDistanceToMap(mockGen3Locations, 0, 1)).toEqual({
        distance: 1,
        name: 'Route 101',
      });
    });

    it('falls back to default Gen 3 fallback map for unknown start map ID', () => {
      expect(gen3Graph.getDistanceToMap(mockGen3Locations, 999, 1)).toEqual({
        distance: 1,
        name: 'Route 101',
      });
    });

    it('resolves outdoor map ID correctly', () => {
      const indoorLocs: UnifiedLocation[] = [
        { id: 0, n: 'Outdoor', conn: [], dist: {} },
        { id: 10, n: 'Indoor', prnt: 0, conn: [], dist: {} },
      ];
      expect(gen3Graph.resolveOutdoorMapId(indoorLocs, 10)).toBe(0);
    });
  });
});
