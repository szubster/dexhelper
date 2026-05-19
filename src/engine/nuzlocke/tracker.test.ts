import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import { aggregateEncountersByLocation, detectNuzlockeViolations } from './tracker';

describe('aggregateEncountersByLocation', () => {
  it('should aggregate encounters by location correctly', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 1,
          caughtData: { location: 1, locationName: 'Route 1', level: 5, time: 'Day' },
        } as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 2,
          caughtData: { location: 1, locationName: 'Route 1', level: 6, time: 'Day' },
        } as PokemonInstance,
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2', level: 7, time: 'Day' },
        } as PokemonInstance,
        {
          speciesId: 4,
          caughtData: undefined,
        } as PokemonInstance,
      ],
    };

    const result = aggregateEncountersByLocation(saveData as SaveData);

    expect(result).toHaveLength(2);

    const route1 = result.find((r) => r.locationId === 1);
    expect(route1).toBeDefined();
    expect(route1?.encounters).toHaveLength(2);
    expect(route1?.encounters[0]?.speciesId).toBe(1);
    expect(route1?.encounters[1]?.speciesId).toBe(2);

    const route2 = result.find((r) => r.locationId === 2);
    expect(route2).toBeDefined();
    expect(route2?.encounters).toHaveLength(1);
    expect(route2?.encounters[0]?.speciesId).toBe(3);
  });
});

describe('detectNuzlockeViolations', () => {
  it('should return empty array if there are no violations', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 1,
          caughtData: { location: 1, locationName: 'Route 1', level: 5, time: 'Day' },
        } as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2', level: 7, time: 'Day' },
        } as PokemonInstance,
      ],
    };

    const result = detectNuzlockeViolations(saveData as SaveData);
    expect(result).toHaveLength(0);
  });

  it('should return violations if multiple encounters share the same location', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 1,
          caughtData: { location: 1, locationName: 'Route 1', level: 5, time: 'Day' },
        } as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 2,
          caughtData: { location: 1, locationName: 'Route 1', level: 6, time: 'Day' },
        } as PokemonInstance,
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2', level: 7, time: 'Day' },
        } as PokemonInstance,
      ],
    };

    const result = detectNuzlockeViolations(saveData as SaveData);
    expect(result).toHaveLength(1);
    expect(result[0]?.locationId).toBe(1);
    expect(result[0]?.encounters).toHaveLength(2);
    expect(result[0]?.encounters[0]?.speciesId).toBe(1);
    expect(result[0]?.encounters[1]?.speciesId).toBe(2);
  });
});
