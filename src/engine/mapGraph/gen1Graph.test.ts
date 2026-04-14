import { describe, expect, it } from 'vitest';
import type { GenericLocation, SpecificArea } from '../../db/schema';
import { getDistanceToMap } from './gen1Graph';

const mockLocations: GenericLocation[] = [
  { id: 0x00, n: 'Pallet Town', connections: [0x01] },
  { id: 0x01, n: 'Route 1', connections: [0x00, 0x02] },
  { id: 0x02, n: 'Viridian City', connections: [0x01, 0x03] },
  { id: 0x03, n: 'Route 2', connections: [0x02] },
  { id: 0x25, n: "Player's House", parentId: 0x00, connections: [] },
];

const mockAreas: SpecificArea[] = [
  { id: 285, lid: 0x00, n: 'Pallet Town' },
  { id: 295, lid: 0x01, n: 'Route 1' },
  { id: 280, lid: 0x02, n: 'Viridian City' },
];

describe('getDistanceToMap', () => {
  it('returns distance 0 when starting map is the target', () => {
    // Pallet Town (0x00) -> pallet-town-area (AID 285)
    const result = getDistanceToMap(mockLocations, mockAreas, 0x00, 285);
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });
  });

  it('returns distance 1 for an adjacent map', () => {
    // Pallet Town (0x00) -> route-1-area (AID 295)
    const result = getDistanceToMap(mockLocations, mockAreas, 0x00, 295);
    expect(result).toEqual({ distance: 1, name: 'Route 1' });
  });

  it('returns distance 2 for a multi-hop distant map', () => {
    // Pallet Town (0x00) -> viridian-city-area (AID 280)
    const result = getDistanceToMap(mockLocations, mockAreas, 0x00, 280);
    expect(result).toEqual({ distance: 2, name: 'Viridian City' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    // Pallet Town Interior (0x25) -> AID 285 (Pallet Town)
    const result = getDistanceToMap(mockLocations, mockAreas, 0x25, 285);
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });
  });

  it('defaults to Saffron City (mocked as Viridian for this test) for an unknown starting map', () => {
    // Unknown ID (0x999) -> AID 280 (Viridian City)
    // Saffron is hardcoded as gameId 0x0A, but we can't mock that easily here unless we add it.

    const locWithSaffron: GenericLocation[] = [...mockLocations, { id: 0x0a, n: 'Saffron City', connections: [2] }];
    const areasWithSaffron: SpecificArea[] = [...mockAreas, { id: 762, lid: 10, n: 'Saffron City' }];

    const result = getDistanceToMap(locWithSaffron, areasWithSaffron, 0x999, 762);
    expect(result).toEqual({ distance: 0, name: 'Saffron City' });
  });

  it('returns null for an unknown target aid', () => {
    const result = getDistanceToMap(mockLocations, mockAreas, 0x00, 9999);
    expect(result).toBeNull();
  });
});
