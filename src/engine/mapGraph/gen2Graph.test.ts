import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap, resolveOutdoorMapId } from './gen2Graph';

const mockLocations: UnifiedLocation[] = [
  // Start locations (simulate Johto/Kanto structure)
  { id: 0x0306, name: 'Goldenrod City', connections: [0x0a04, 0x0b01], distances: { 0x0306: 0, 0x0a04: 1, 0x0b01: 1 } }, // Fallback Group 3, Map 6
  { id: 0x0a04, name: 'Route 34', connections: [0x0306], distances: { 0x0a04: 0, 0x0306: 1 } },
  { id: 0x0b01, name: 'Route 35', connections: [0x0306], distances: { 0x0b01: 0, 0x0306: 1 } },
  // Indoor
  { id: 0x25, name: 'Goldenrod Pokecenter', parentId: 0x0306, connections: [], distances: {} },
  // Multi-level indoor
  { id: 0x26, name: 'Goldenrod Pokecenter 2F', parentId: 0x25, connections: [], distances: {} },
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
    const locationsWithoutGoldenrod: UnifiedLocation[] = [
      { id: 0x0a04, name: 'Route 34', connections: [], distances: { 0x0a04: 0 } },
    ];
    const result = getDistanceToMap(locationsWithoutGoldenrod, 0x999, 0x0a04);
    expect(result).toBeNull();
  });

  it('returns null when no distance is precomputed between start and target', () => {
    // Distant map that has no distance entry
    const locationsWithoutDist: UnifiedLocation[] = [
      { id: 0x0306, name: 'Goldenrod City', connections: [], distances: {} },
      { id: 0x1111, name: 'Unconnected Area', connections: [], distances: {} },
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
      { id: 0x90, name: 'Loop A', parentId: 0x91, connections: [], distances: {} },
      { id: 0x91, name: 'Loop B', parentId: 0x90, connections: [], distances: {} },
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
    { id: 0x0306, name: 'Goldenrod City', connections: [0x0a], distances: { 0x0a: 1, 0x05: 2, 0x0307: 3 } },
    { id: 0x0a, name: 'Saffron City', connections: [0x0306, 0x05], distances: { 0x0306: 1, 0x05: 1, 0x0307: 2 } },
    { id: 0x05, name: 'Vermilion City', connections: [0x0a, 0x0307], distances: { 0x0a: 1, 0x0307: 1, 0x0306: 2 } },
    { id: 0x0307, name: 'Olivine City', connections: [0x05], distances: { 0x05: 1, 0x0a: 2, 0x0306: 3 } },
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
