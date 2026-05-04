import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap } from './gen1Graph';

const mockLocations: UnifiedLocation[] = [
  { id: 0x00, n: 'Pallet Town', conn: [0x01], dist: { 0x00: 0, 0x01: 1, 0x02: 2 } },
  { id: 0x01, n: 'Route 1', conn: [0x00, 0x02], dist: { 0x01: 0, 0x00: 1, 0x02: 1 } },
  { id: 0x02, n: 'Viridian City', conn: [0x01, 0x03], dist: { 0x02: 0, 0x01: 1, 0x00: 2, 0x03: 1 } },
  { id: 0x03, n: 'Route 2', conn: [0x02], dist: { 0x03: 0, 0x02: 1 } },
  { id: 0x25, n: "Player's House", prnt: 0x00, conn: [], dist: {} },
];

describe('getDistanceToMap', () => {
  it('returns distance 0 when starting map is the target', () => {
    // Pallet Town (0x00) -> Pallet Town Map ID (0x00)
    const result = getDistanceToMap(mockLocations, 0x00, 0x00);
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });
  });

  it('returns distance 1 for an adjacent map', () => {
    // Pallet Town (0x00) -> Route 1 Map ID (0x01)
    const result = getDistanceToMap(mockLocations, 0x00, 0x01);
    expect(result).toEqual({ distance: 1, name: 'Route 1' });
  });

  it('returns distance 2 for a multi-hop distant map', () => {
    // Pallet Town (0x00) -> Viridian City Map ID (0x02)
    const result = getDistanceToMap(mockLocations, 0x00, 0x02);
    expect(result).toEqual({ distance: 2, name: 'Viridian City' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    // Pallet Town Interior (0x25) -> Map ID 0x00 (Pallet Town)
    // Distance from 0x25 to 0x00 = 0 because it resolves 0x25 to parent 0x00
    const result = getDistanceToMap(mockLocations, 0x25, 0x00);
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });
  });

  it('defaults to Saffron City (mocked as City ID 10) for an unknown starting map', () => {
    // Unknown ID (0x999) -> resolving to start map 10 (Saffron)
    const locWithSaffron: UnifiedLocation[] = [
      ...mockLocations,
      { id: 10, n: 'Saffron City', conn: [2], dist: { 10: 0 } },
    ];

    const result = getDistanceToMap(locWithSaffron, 0x999, 10);
    expect(result).toEqual({ distance: 0, name: 'Saffron City' });
  });

  it('returns null for an unknown target aid', () => {
    const result = getDistanceToMap(mockLocations, 0x00, 9999);
    expect(result).toBeNull();
  });

  it('returns null when start location cannot be resolved (no map id and no Saffron fallback)', () => {
    // Unknown start map, and no map with id 10 in mockLocations
    const result = getDistanceToMap(mockLocations, 0x999, 0x00);
    expect(result).toBeNull();
  });

  it('returns null when no distance is precomputed between start and target', () => {
    // Distant map that has no distance entry
    const locationsWithoutDist: UnifiedLocation[] = [
      { id: 0x00, n: 'Pallet Town', conn: [], dist: {} },
      { id: 0x01, n: 'Route 1', conn: [], dist: {} },
    ];
    const result = getDistanceToMap(locationsWithoutDist, 0x00, 0x01);
    expect(result).toBeNull();
  });
});
