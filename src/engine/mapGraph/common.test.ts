import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMapBase, getLocation, resolveOutdoorMapId } from './common';

const mockLocations: UnifiedLocation[] = [
  { id: 0, n: 'Town 0', conn: [1], dist: { 0: 0, 1: 1, 2: 2 } },
  { id: 1, n: 'Route 1', conn: [0, 2], dist: { 1: 0, 0: 1, 2: 1 } },
  { id: 2, n: 'Town 2', conn: [1], dist: { 2: 0, 1: 1, 0: 2 } },
  { id: 3, n: 'House in Town 0', prnt: 0, conn: [], dist: {} },
  { id: 4, n: 'House 2F', prnt: 3, conn: [], dist: {} },
];

describe('common mapGraph', () => {
  describe('getLocation', () => {
    it('returns the location for a valid ID', () => {
      const loc = getLocation(mockLocations, 1);
      expect(loc).toBeDefined();
      expect(loc?.n).toBe('Route 1');
    });

    it('returns undefined for an invalid ID', () => {
      const loc = getLocation(mockLocations, 999);
      expect(loc).toBeUndefined();
    });

    it('uses the cache effectively when given the same array reference', () => {
      // It's hard to test cache usage directly without spies, but we can verify it works
      const loc1 = getLocation(mockLocations, 1);
      const loc2 = getLocation(mockLocations, 1);
      expect(loc1).toBe(loc2);
    });

    it('clears the cache when given a new array reference', () => {
      const newLocations = [...mockLocations, { id: 5, n: 'New Town', conn: [], dist: {} }];
      const loc1 = getLocation(mockLocations, 1);
      const loc2 = getLocation(newLocations, 1);
      expect(loc1).toEqual(loc2); // They have the same content
      const loc5 = getLocation(newLocations, 5);
      expect(loc5).toBeDefined();
      expect(loc5?.n).toBe('New Town');
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

    it('handles circular prnt references gracefully', () => {
      const circularLocations = [
        ...mockLocations,
        { id: 90, n: 'Loop A', prnt: 91, conn: [], dist: {} },
        { id: 91, n: 'Loop B', prnt: 90, conn: [], dist: {} },
      ];
      const result = resolveOutdoorMapId(circularLocations, 90);
      expect(result).toBe(90);
    });

    it('gracefully returns original mapId if location is not found', () => {
      const result = resolveOutdoorMapId(mockLocations, 999);
      expect(result).toBe(999);
    });
  });

  describe('getDistanceToMapBase', () => {
    it('returns null if target location is not found', () => {
      const result = getDistanceToMapBase(mockLocations, 0, 999, 0);
      expect(result).toBeNull();
    });

    it('returns null if start location is not found and fallback is not found', () => {
      const result = getDistanceToMapBase(mockLocations, 888, 1, 999);
      expect(result).toBeNull();
    });

    it('uses fallback start location if start location is not found', () => {
      const result = getDistanceToMapBase(mockLocations, 999, 2, 0);
      expect(result).toEqual({ distance: 2, name: 'Town 2' });
    });

    it('returns distance 0 when starting map is the target', () => {
      const result = getDistanceToMapBase(mockLocations, 0, 0, 0);
      expect(result).toEqual({ distance: 0, name: 'Town 0' });
    });

    it('returns distance 1 for an adjacent map', () => {
      const result = getDistanceToMapBase(mockLocations, 0, 1, 0);
      expect(result).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('gracefully falls back to parent map for indoor locations', () => {
      const result = getDistanceToMapBase(mockLocations, 3, 1, 0);
      expect(result).toEqual({ distance: 1, name: 'Route 1' });
    });

    it('returns null when no distance is precomputed between start and target', () => {
      const locationsWithoutDist: UnifiedLocation[] = [
        { id: 0, n: 'Town 0', conn: [], dist: {} },
        { id: 1, n: 'Route 1', conn: [], dist: {} },
      ];
      const result = getDistanceToMapBase(locationsWithoutDist, 0, 1, 0);
      expect(result).toBeNull();
    });
  });
});
