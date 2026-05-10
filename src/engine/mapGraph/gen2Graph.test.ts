import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap } from './gen2Graph';

const mockLocations: UnifiedLocation[] = [
  { id: 0x01, n: 'New Bark Town', conn: [0x02], dist: { 0x01: 0, 0x02: 1, 0x03: 2 } },
  { id: 0x02, n: 'Route 29', conn: [0x01, 0x03], dist: { 0x02: 0, 0x01: 1, 0x03: 1 } },
  { id: 0x03, n: 'Cherrygrove City', conn: [0x02, 0x04], dist: { 0x03: 0, 0x02: 1, 0x01: 2, 0x04: 1 } },
  { id: 0x04, n: 'Route 30', conn: [0x03], dist: { 0x04: 0, 0x03: 1 } },
  { id: 0x25, n: "Player's House", prnt: 0x01, conn: [], dist: {} },
];

describe('getDistanceToMap', () => {
  it('returns distance 0 when starting map is the target', () => {
    // New Bark Town (0x01) -> New Bark Town Map ID (0x01)
    const result = getDistanceToMap(mockLocations, 0x01, 0x01);
    expect(result).toEqual({ distance: 0, name: 'New Bark Town' });
  });

  it('returns distance 1 for an adjacent map', () => {
    // New Bark Town (0x01) -> Route 29 Map ID (0x02)
    const result = getDistanceToMap(mockLocations, 0x01, 0x02);
    expect(result).toEqual({ distance: 1, name: 'Route 29' });
  });

  it('returns distance 2 for a multi-hop distant map', () => {
    // New Bark Town (0x01) -> Cherrygrove City Map ID (0x03)
    const result = getDistanceToMap(mockLocations, 0x01, 0x03);
    expect(result).toEqual({ distance: 2, name: 'Cherrygrove City' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    // Player's House (0x25) -> Map ID 0x01 (New Bark Town)
    const result = getDistanceToMap(mockLocations, 0x25, 0x01);
    expect(result).toEqual({ distance: 0, name: 'New Bark Town' });
  });

  it('defaults to Goldenrod City (mocked as City ID 16) for an unknown starting map', () => {
    // Unknown ID (0x999) -> resolving to start map 16 (Goldenrod)
    const locWithGoldenrod: UnifiedLocation[] = [
      ...mockLocations,
      { id: 0x0306, n: 'Goldenrod City', conn: [2], dist: { 0x0306: 0 } },
    ];

    const result = getDistanceToMap(locWithGoldenrod, 0x999, 0x0306);
    expect(result).toEqual({ distance: 0, name: 'Goldenrod City' });
  });

  it('returns null for an unknown target aid', () => {
    const result = getDistanceToMap(mockLocations, 0x01, 9999);
    expect(result).toBeNull();
  });

  it('returns null when start location cannot be resolved (no map id and no Goldenrod fallback)', () => {
    // Unknown start map, and no map with id 16 in mockLocations
    const result = getDistanceToMap(mockLocations, 0x999, 0x01);
    expect(result).toBeNull();
  });

  it('returns null when no distance is precomputed between start and target', () => {
    // Distant map that has no distance entry
    const locationsWithoutDist: UnifiedLocation[] = [
      { id: 0x01, n: 'New Bark Town', conn: [], dist: {} },
      { id: 0x02, n: 'Route 29', conn: [], dist: {} },
    ];
    const result = getDistanceToMap(locationsWithoutDist, 0x01, 0x02);
    expect(result).toBeNull();
  });
});
