import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '@/db/schema';
import { getDistanceToMap, resolveOutdoorMapId } from './gen3Graph';

const mockLocations: UnifiedLocation[] = [
  { id: 0, n: 'Littleroot Town', conn: [1], dist: { 0: 0, 1: 1, 2: 2 } },
  { id: 1, n: 'Route 101', conn: [0, 2], dist: { 1: 0, 0: 1, 2: 1 } },
  { id: 2, n: 'Oldale Town', conn: [1], dist: { 2: 0, 1: 1, 0: 2 } },
  { id: 3, n: 'Player House', prnt: 0, conn: [], dist: {} },
  { id: 4, n: 'Player House 2F', prnt: 3, conn: [], dist: {} },
  { id: 42, n: 'Pallet Town', conn: [43], dist: { 42: 0, 43: 1 } },
  { id: 43, n: 'Route 1', conn: [42], dist: { 43: 0, 42: 1 } },
  { id: 44, n: 'Player House Kanto', prnt: 42, conn: [], dist: {} },
  { id: 45, n: 'Player House Kanto 2F', prnt: 44, conn: [], dist: {} },
];

describe('gen3Graph', () => {
  describe('getDistanceToMap', () => {
    it('returns distance 0 when starting map is the target', () => {
      const result = getDistanceToMap(mockLocations, 0, 0);
      expect(result).toEqual({ distance: 0, name: 'Littleroot Town' });
    });

    it('returns distance 1 for an adjacent map', () => {
      const result = getDistanceToMap(mockLocations, 0, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('gracefully falls back to parent map for indoor locations', () => {
      const result = getDistanceToMap(mockLocations, 3, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('gracefully falls back to root parent map for multi-level indoor locations', () => {
      const result = getDistanceToMap(mockLocations, 4, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('gracefully falls back to parent map for indoor locations in Kanto', () => {
      const result = getDistanceToMap(mockLocations, 44, 43);
      expect(result).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('gracefully falls back to root parent map for multi-level indoor locations in Kanto', () => {
      const result = getDistanceToMap(mockLocations, 45, 43);
      expect(result).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('defaults to map ID 0 for an unknown starting map', () => {
      const result = getDistanceToMap(mockLocations, 999, 1);
      expect(result).toEqual({ distance: 1, name: 'Route 101' });
    });

    it('returns null for an unknown target aid', () => {
      const result = getDistanceToMap(mockLocations, 0, 9999);
      expect(result).toBeNull();
    });

    it('returns null when start location cannot be resolved (no map id and no fallback map ID 0)', () => {
      const locationsWithoutZero: UnifiedLocation[] = [{ id: 1, n: 'Route 101', conn: [], dist: { 1: 0 } }];
      const result = getDistanceToMap(locationsWithoutZero, 999, 1);
      expect(result).toBeNull();
    });

    it('returns null when no distance is precomputed between start and target', () => {
      const locationsWithoutDist: UnifiedLocation[] = [
        { id: 0, n: 'Littleroot Town', conn: [], dist: {} },
        { id: 1, n: 'Route 101', conn: [], dist: {} },
      ];
      const result = getDistanceToMap(locationsWithoutDist, 0, 1);
      expect(result).toBeNull();
    });
  });

  describe('resolveOutdoorMapId', () => {
    it('correctly resolves a map ID with no prnt to itself', () => {
      const result = resolveOutdoorMapId(mockLocations, 0);
      expect(result).toBe(0);
    });

    it('correctly resolves a single-level indoor map to its outdoor hub', () => {
      const result = resolveOutdoorMapId(mockLocations, 3);
      expect(result).toBe(0);
    });

    it('correctly resolves a multi-level indoor map to its root outdoor hub', () => {
      const result = resolveOutdoorMapId(mockLocations, 4);
      expect(result).toBe(0);
    });

    it('correctly resolves a single-level indoor map to its outdoor hub in Kanto', () => {
      const result = resolveOutdoorMapId(mockLocations, 44);
      expect(result).toBe(42);
    });

    it('correctly resolves a multi-level indoor map to its root outdoor hub in Kanto', () => {
      const result = resolveOutdoorMapId(mockLocations, 45);
      expect(result).toBe(42);
    });

    it('handles circular prnt references gracefully', () => {
      const circularLocations = [
        ...mockLocations,
        { id: 90, n: 'Loop A', prnt: 91, conn: [], dist: {} },
        { id: 91, n: 'Loop B', prnt: 90, conn: [], dist: {} },
      ];
      const result = resolveOutdoorMapId(circularLocations, 90);
      expect(result).toBe(90);
    });
  });
});
