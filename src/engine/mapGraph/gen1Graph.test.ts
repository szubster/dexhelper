import { describe, expect, it } from 'vitest';
import { GEN1_MAPS, getDistanceToMap } from './gen1Graph';

describe('getDistanceToMap', () => {
  it('returns distance 0 when starting map is the target', () => {
    // Pallet Town (0x00) -> pallet-town-area (AID 285)
    const result = getDistanceToMap(0x00, 285);
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });
  });

  it('returns distance 1 for an adjacent map', () => {
    // Pallet Town (0x00) -> route-1-area (AID 295)
    const result = getDistanceToMap(0x00, 295);
    expect(result).toEqual({ distance: 1, name: 'Route 1' });
  });

  it('returns distance 2 for a multi-hop distant map', () => {
    // Pallet Town (0x00) -> viridian-city-area (AID 280)
    const result = getDistanceToMap(0x00, 280);
    expect(result).toEqual({ distance: 2, name: 'Viridian City' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    // Pallet Town Interior (0x25) -> AID 285 (Pallet Town)
    const result = getDistanceToMap(0x25, 285);
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });

    // Viridian City Interior (0x2d) -> AID 285 (Pallet Town)
    const result2 = getDistanceToMap(0x2d, 285);
    expect(result2).toEqual({ distance: 2, name: 'Pallet Town' });
  });

  it('defaults to Saffron City for an unknown starting map as per domain rules', () => {
    // Unknown ID (0x999) -> AID 762 (Saffron City)
    const result = getDistanceToMap(0x999, 762);
    expect(result).toEqual({ distance: 0, name: 'Saffron City' });

    // Saffron City (0x0A) -> AID 1047 (Route 5) is adjacent
    const result2 = getDistanceToMap(0x999, 1047);
    expect(result2).toEqual({ distance: 1, name: 'Route 5' });
  });

  it('returns null for an unknown target aid', () => {
    const result = getDistanceToMap(0x00, 9999);
    expect(result).toBeNull();
  });

  it('avoids partial matches (ID based now)', () => {
    // Current is Pallet Town (0x00).
    // Route 12 (AID 276) is far away.
    const result = getDistanceToMap(0x00, 276);
    expect(result?.distance).toBeGreaterThan(1);
    expect(result?.name).not.toBe('Route 1');
  });

  it('handles graphs with missing connection nodes gracefully', () => {
    // Temporarily add a map with a dangling connection
    GEN1_MAPS[0x998] = { id: 0x998, aid: 9998, slug: 'test-map', name: 'Test', connections: [0x999] }; // 0x999 does not exist

    const result = getDistanceToMap(0x998, 9999);

    expect(result).toBeNull();

    // Cleanup
    delete GEN1_MAPS[0x998];
  });
});
