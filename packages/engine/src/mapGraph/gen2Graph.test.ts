import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '@/db/schema';
import { getDistanceToMap, resolveOutdoorMapId } from './gen2Graph';

const mockLocations: UnifiedLocation[] = [
  // Start locations (simulate Johto/Kanto structure)
  { id: 0x0306, n: 'Goldenrod City', conn: [0x0a04, 0x0b01], dist: { 0x0306: 0, 0x0a04: 1, 0x0b01: 1 } }, // Fallback Group 3, Map 6
  { id: 0x0a04, n: 'Route 34', conn: [0x0306], dist: { 0x0a04: 0, 0x0306: 1 } },
  { id: 0x0b01, n: 'Route 35', conn: [0x0306], dist: { 0x0b01: 0, 0x0306: 1 } },
  // Indoor
  { id: 0x25, n: 'Goldenrod Pokecenter', prnt: 0x0306, conn: [], dist: {} },
  // Multi-level indoor
  { id: 0x26, n: 'Goldenrod Pokecenter 2F', prnt: 0x25, conn: [], dist: {} },
];

describe('getDistanceToMap (Gen 2)', () => {
  it('returns distance 0 when starting map is the target', () => {
    // Goldenrod City -> Goldenrod City
    const result = getDistanceToMap(mockLocations, 0x0306, 0x0306);
    expect(result).toEqual({ distance: 0, name: 'Goldenrod City' });
  });

  it('returns distance 1 for an adjacent map', () => {
    // Goldenrod City -> Route 34
    const result = getDistanceToMap(mockLocations, 0x0306, 0x0a04);
    expect(result).toEqual({ distance: 1, name: 'Route 34' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    // Goldenrod Pokecenter -> Route 34
    // Resolves 0x25 -> 0x0306 (Goldenrod) -> distance to 0x0a04 is 1
    const result = getDistanceToMap(mockLocations, 0x25, 0x0a04);
    expect(result).toEqual({ distance: 1, name: 'Route 34' });
  });

  it('gracefully falls back to root parent map for multi-level indoor locations', () => {
    // Goldenrod Pokecenter 2F -> Route 34
    // Resolves 0x26 -> 0x25 -> 0x0306 (Goldenrod) -> distance to 0x0a04 is 1
    const result = getDistanceToMap(mockLocations, 0x26, 0x0a04);
    expect(result).toEqual({ distance: 1, name: 'Route 34' });
  });

  it('defaults to Goldenrod City (Map Group 3, ID 6 -> 0x0306) for an unknown starting map', () => {
    // Unknown ID (0x999) -> resolving to start map 0x0306 (Goldenrod City) -> distance to 0x0a04 is 1
    const result = getDistanceToMap(mockLocations, 0x999, 0x0a04);
    expect(result).toEqual({ distance: 1, name: 'Route 34' });
  });

  it('returns null for an unknown target aid', () => {
    const result = getDistanceToMap(mockLocations, 0x0306, 9999);
    expect(result).toBeNull();
  });

  it('returns null when start location cannot be resolved (no map id and no Goldenrod fallback)', () => {
    // Unknown start map, and no map with id 0x0306 in mockLocations
    const locationsWithoutGoldenrod: UnifiedLocation[] = [{ id: 0x0a04, n: 'Route 34', conn: [], dist: { 0x0a04: 0 } }];
    const result = getDistanceToMap(locationsWithoutGoldenrod, 0x999, 0x0a04);
    expect(result).toBeNull();
  });

  it('returns null when no distance is precomputed between start and target', () => {
    // Distant map that has no distance entry
    const locationsWithoutDist: UnifiedLocation[] = [
      { id: 0x0306, n: 'Goldenrod City', conn: [], dist: {} },
      { id: 0x1111, n: 'Unconnected Area', conn: [], dist: {} },
    ];
    const result = getDistanceToMap(locationsWithoutDist, 0x0306, 0x1111);
    expect(result).toBeNull();
  });
});

describe('resolveOutdoorMapId', () => {
  it('correctly resolves a map ID with no prnt to itself', () => {
    // Goldenrod City (0x0306) has no prnt
    const result = resolveOutdoorMapId(mockLocations, 0x0306);
    expect(result).toBe(0x0306);
  });

  it('correctly resolves a single-level indoor map to its outdoor hub', () => {
    // Goldenrod Pokecenter (0x25) -> Goldenrod City (0x0306)
    const result = resolveOutdoorMapId(mockLocations, 0x25);
    expect(result).toBe(0x0306);
  });

  it('correctly resolves a multi-level indoor map to its root outdoor hub', () => {
    // Goldenrod Pokecenter 2F (0x26) -> Goldenrod Pokecenter (0x25) -> Goldenrod City (0x0306)
    const result = resolveOutdoorMapId(mockLocations, 0x26);
    expect(result).toBe(0x0306);
  });

  it('handles circular prnt references gracefully', () => {
    // Create a circular mock: 0x90 -> 0x91 -> 0x90
    const circularLocations = [
      ...mockLocations,
      { id: 0x90, n: 'Loop A', prnt: 0x91, conn: [], dist: {} },
      { id: 0x91, n: 'Loop B', prnt: 0x90, conn: [], dist: {} },
    ];
    // It should stop at the first revisited node
    const result = resolveOutdoorMapId(circularLocations, 0x90);
    // Since 0x90 -> 0x91 -> 0x90, 0x90 is visited, then 0x91 is visited, then 0x90 is already visited
    // so it breaks loop when currentMapId becomes 0x90 again, returning 0x90.
    expect(result).toBe(0x90);
  });
});

describe('getDistanceToMap (Gen 2 Cross-Region)', () => {
  const crossRegionLocations: UnifiedLocation[] = [
    { id: 0x0306, n: 'Goldenrod City', conn: [0x0a], dist: { 0x0a: 1, 0x05: 2, 0x0307: 3 } },
    { id: 0x0a, n: 'Saffron City', conn: [0x0306, 0x05], dist: { 0x0306: 1, 0x05: 1, 0x0307: 2 } },
    { id: 0x05, n: 'Vermilion City', conn: [0x0a, 0x0307], dist: { 0x0a: 1, 0x0307: 1, 0x0306: 2 } },
    { id: 0x0307, n: 'Olivine City', conn: [0x05], dist: { 0x05: 1, 0x0a: 2, 0x0306: 3 } },
  ];

  it('calculates distance from Goldenrod to Saffron (Magnet Train)', () => {
    const result = getDistanceToMap(crossRegionLocations, 0x0306, 0x0a);
    expect(result).toEqual({ distance: 1, name: 'Saffron City' });
  });

  it('calculates distance from Olivine to Vermilion (S.S. Aqua)', () => {
    const result = getDistanceToMap(crossRegionLocations, 0x0307, 0x05);
    expect(result).toEqual({ distance: 1, name: 'Vermilion City' });
  });

  it('calculates multi-hop cross-region distance (Goldenrod to Vermilion)', () => {
    const result = getDistanceToMap(crossRegionLocations, 0x0306, 0x05);
    expect(result).toEqual({ distance: 2, name: 'Vermilion City' });
  });
});
