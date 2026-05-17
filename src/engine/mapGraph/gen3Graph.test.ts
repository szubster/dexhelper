import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap, resolveOutdoorMapId } from './gen3Graph';

const mockLocations: UnifiedLocation[] = [
  { id: 0, n: 'Littleroot Town', conn: [1], dist: { 0: 0, 1: 1, 2: 2 } },
  { id: 1, n: 'Route 101', conn: [0, 2], dist: { 1: 0, 0: 1, 2: 1 } },
  { id: 2, n: 'Oldale Town', conn: [1], dist: { 2: 0, 1: 1, 0: 2 } },
  { id: 0x25, n: "Player's House", prnt: 0, conn: [], dist: {} },
  { id: 0x26, n: "Player's House 2F", prnt: 0x25, conn: [], dist: {} },
];

describe('getDistanceToMap', () => {
  it('returns distance 0 when starting map is the target', () => {
    const result = getDistanceToMap(mockLocations, 0, 0);
    expect(result).toEqual({ distance: 0, name: 'Littleroot Town' });
  });

  it('returns distance 1 for an adjacent map', () => {
    const result = getDistanceToMap(mockLocations, 0, 1);
    expect(result).toEqual({ distance: 1, name: 'Route 101' });
  });

  it('returns distance 2 for a multi-hop distant map', () => {
    const result = getDistanceToMap(mockLocations, 0, 2);
    expect(result).toEqual({ distance: 2, name: 'Oldale Town' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    const result = getDistanceToMap(mockLocations, 0x25, 0);
    expect(result).toEqual({ distance: 0, name: 'Littleroot Town' });
  });

  it('gracefully falls back to root parent map for multi-level indoor locations', () => {
    const result = getDistanceToMap(mockLocations, 0x26, 0);
    expect(result).toEqual({ distance: 0, name: 'Littleroot Town' });
  });

  it('defaults to Littleroot Town for an unknown starting map', () => {
    const result = getDistanceToMap(mockLocations, 0x999, 1);
    expect(result).toEqual({ distance: 1, name: 'Route 101' });
  });

  it('returns null for an unknown target aid', () => {
    const result = getDistanceToMap(mockLocations, 0, 9999);
    expect(result).toBeNull();
  });

  it('returns null when start location cannot be resolved', () => {
    const result = getDistanceToMap([], 0x999, 0);
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
    const result = resolveOutdoorMapId(mockLocations, 0x25);
    expect(result).toBe(0);
  });

  it('correctly resolves a multi-level indoor map to its root outdoor hub', () => {
    const result = resolveOutdoorMapId(mockLocations, 0x26);
    expect(result).toBe(0);
  });

  it('handles circular prnt references gracefully', () => {
    const circularLocations = [
      ...mockLocations,
      { id: 0x90, n: 'Loop A', prnt: 0x91, conn: [], dist: {} },
      { id: 0x91, n: 'Loop B', prnt: 0x90, conn: [], dist: {} },
    ];
    const result = resolveOutdoorMapId(circularLocations, 0x90);
    expect(result).toBe(0x90);
  });
});
