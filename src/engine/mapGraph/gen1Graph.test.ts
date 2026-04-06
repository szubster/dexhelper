import { describe, expect, it } from 'vitest';
import { getDistanceToMap } from './gen1Graph';

describe('getDistanceToMap', () => {
  it('returns distance 0 when starting map is the target', () => {
    // Pallet Town (0x00) -> pallet-town-area
    const result = getDistanceToMap(0x00, 'pallet-town-area');
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });
  });

  it('returns distance 1 for an adjacent map', () => {
    // Pallet Town (0x00) -> route-1-area
    const result = getDistanceToMap(0x00, 'route-1-area');
    expect(result).toEqual({ distance: 1, name: 'Route 1' });
  });

  it('returns distance 2 for a multi-hop distant map', () => {
    // Pallet Town (0x00) -> viridian-city-area
    const result = getDistanceToMap(0x00, 'viridian-city-area');
    expect(result).toEqual({ distance: 2, name: 'Viridian City' });
  });

  it('gracefully falls back to parent map for indoor locations', () => {
    // Pallet Town Interior (0x25) -> pallet-town-area should be 0 distance since parent is Pallet Town (0x00)
    const result = getDistanceToMap(0x25, 'pallet-town-area');
    expect(result).toEqual({ distance: 0, name: 'Pallet Town' });

    // Viridian City Interior (0x28) -> pallet-town-area
    // Parent is Viridian City (0x01). Distance to Pallet Town is 2.
    const result2 = getDistanceToMap(0x28, 'pallet-town-area');
    expect(result2).toEqual({ distance: 2, name: 'Pallet Town' });
  });

  it('defaults to Saffron City for an unknown starting map as per domain rules', () => {
    // Unknown ID (0x999) -> saffron-city-area should be 0 since it defaults to Saffron City (0x0A)
    const result = getDistanceToMap(0x999, 'saffron-city-area');
    expect(result).toEqual({ distance: 0, name: 'Saffron City' });

    // Saffron City (0x0A) -> route-5-area is adjacent
    const result2 = getDistanceToMap(0x999, 'route-5-area');
    expect(result2).toEqual({ distance: 1, name: 'Route 5' });
  });

  it('handles slug cleaning correctly for pokeapi locations', () => {
    // kanto-route-1
    const resultKanto = getDistanceToMap(0x00, 'kanto-route-1');
    expect(resultKanto).toEqual({ distance: 1, name: 'Route 1' });

    // sea-route-21
    const resultSea = getDistanceToMap(0x00, 'sea-route-21');
    expect(resultSea).toEqual({ distance: 1, name: 'Route 21' });
  });

  it('returns null for an unreachable target or invalid target slug', () => {
    const result = getDistanceToMap(0x00, 'invalid-target-slug');
    expect(result).toBeNull();
  });
});
