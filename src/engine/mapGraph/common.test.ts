import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMapBase, getLocation, resolveOutdoorMapId } from './common';

const mockLocations: UnifiedLocation[] = [
  { id: 1, n: 'Town A', conn: [2], dist: { 1: 0, 2: 1, 3: 2 } },
  { id: 2, n: 'Route 1', conn: [1, 3], dist: { 2: 0, 1: 1, 3: 1 } },
  { id: 3, n: 'City B', conn: [2], dist: { 3: 0, 2: 1, 1: 2 } },
  { id: 100, n: 'Town A House 1F', prnt: 1, conn: [], dist: {} },
  { id: 101, n: 'Town A House 2F', prnt: 100, conn: [], dist: {} },
  { id: 200, n: 'Isolated Building', conn: [], dist: {} },
];

describe('getLocation', () => {
  it('retrieves location by ID and caches the lookup map', () => {
    const loc1 = getLocation(mockLocations, 1);
    expect(loc1).toEqual(mockLocations[0]);

    // Second call should hit the location cache
    const loc1Again = getLocation(mockLocations, 1);
    expect(loc1Again).toEqual(mockLocations[0]);

    // Non-existent ID
    const notFound = getLocation(mockLocations, 999);
    expect(notFound).toBeUndefined();
  });

  it('rebuilds cache when allLocations array reference changes', () => {
    getLocation(mockLocations, 1);

    const newLocations: UnifiedLocation[] = [...mockLocations, { id: 4, n: 'City C', conn: [], dist: { 4: 0 } }];

    const loc4 = getLocation(newLocations, 4);
    expect(loc4).toEqual({ id: 4, n: 'City C', conn: [], dist: { 4: 0 } });
  });
});

describe('resolveOutdoorMapId', () => {
  it('returns original mapId if location has no parent (outdoor map)', () => {
    expect(resolveOutdoorMapId(mockLocations, 1)).toBe(1);
  });

  it('resolves single-level indoor map to outdoor parent', () => {
    expect(resolveOutdoorMapId(mockLocations, 100)).toBe(1);
  });

  it('resolves multi-level indoor map recursively to root outdoor parent', () => {
    expect(resolveOutdoorMapId(mockLocations, 101)).toBe(1);
  });

  it('handles circular parent references without infinite loops', () => {
    const circularLocations: UnifiedLocation[] = [
      { id: 50, n: 'Room A', prnt: 51, conn: [], dist: {} },
      { id: 51, n: 'Room B', prnt: 50, conn: [], dist: {} },
    ];

    expect(resolveOutdoorMapId(circularLocations, 50)).toBe(50);
  });

  it('returns original mapId if map ID is not found in locations', () => {
    expect(resolveOutdoorMapId(mockLocations, 999)).toBe(999);
  });
});

describe('getDistanceToMapBase', () => {
  it('returns distance 0 when start location equals target location', () => {
    const result = getDistanceToMapBase(mockLocations, 1, 1, 3);
    expect(result).toEqual({ distance: 0, name: 'Town A' });
  });

  it('returns precomputed distance between two outdoor locations', () => {
    const result = getDistanceToMapBase(mockLocations, 1, 3, 3);
    expect(result).toEqual({ distance: 2, name: 'City B' });
  });

  it('resolves indoor start location to outdoor parent to find distance', () => {
    const result = getDistanceToMapBase(mockLocations, 101, 3, 3);
    expect(result).toEqual({ distance: 2, name: 'City B' });
  });

  it('falls back to fallbackStartMapId if start location is unknown', () => {
    const result = getDistanceToMapBase(mockLocations, 999, 2, 3);
    expect(result).toEqual({ distance: 1, name: 'Route 1' });
  });

  it('returns null if target Aid is not found', () => {
    const result = getDistanceToMapBase(mockLocations, 1, 999, 3);
    expect(result).toBeNull();
  });

  it('returns null if neither start map nor fallback start map exists', () => {
    const result = getDistanceToMapBase(mockLocations, 999, 2, 888);
    expect(result).toBeNull();
  });

  it('returns null if target is unreachable (no entry in dist lookup table)', () => {
    const isolatedLocations: UnifiedLocation[] = [
      { id: 1, n: 'Town A', conn: [], dist: {} },
      { id: 2, n: 'Isolated City', conn: [], dist: {} },
    ];

    const result = getDistanceToMapBase(isolatedLocations, 1, 2, 1);
    expect(result).toBeNull();
  });
});
