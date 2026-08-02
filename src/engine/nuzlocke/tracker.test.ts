import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import {
  aggregateEncountersByLocation,
  aggregateFirstCatchByRoute,
  detectNuzlockeViolations,
  getDeadPokemon,
  getGraveyardPokemon,
} from './tracker';

describe('aggregateEncountersByLocation', () => {
  it('should aggregate encounters by location correctly', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 1,
          caughtData: { location: 1, locationName: 'Route 1', level: 5, time: 'Day' },
        } as unknown as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 2,
          caughtData: { location: 1, locationName: 'Route 1', level: 6, time: 'Day' },
        } as unknown as PokemonInstance,
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2', level: 7, time: 'Day' },
        } as unknown as PokemonInstance,
        {
          speciesId: 4,
          caughtData: undefined,
        } as unknown as PokemonInstance,
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

  it('should handle missing partyDetails and pcDetails', () => {
    const saveData: Partial<SaveData> = {};
    const result = aggregateEncountersByLocation(saveData as SaveData);
    expect(result).toHaveLength(0);
  });

  it('should fallback to Location {id} if locationName is missing', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 1,
          caughtData: { location: 99, level: 5, time: 'Day' },
        } as unknown as PokemonInstance,
      ],
    };
    const result = aggregateEncountersByLocation(saveData as SaveData);
    expect(result).toHaveLength(1);
    expect(result[0]?.locationName).toBe('Location 99');
  });
});

describe('detectNuzlockeViolations', () => {
  it('should return empty array if there are no violations', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 1,
          caughtData: { location: 1, locationName: 'Route 1', level: 5, time: 'Day' },
        } as unknown as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2', level: 7, time: 'Day' },
        } as unknown as PokemonInstance,
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
        } as unknown as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 2,
          caughtData: { location: 1, locationName: 'Route 1', level: 6, time: 'Day' },
        } as unknown as PokemonInstance,
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2', level: 7, time: 'Day' },
        } as unknown as PokemonInstance,
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

describe('getDeadPokemon', () => {
  it('should return pokemon in the party with 0 HP', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        { speciesId: 1, currentHp: 10 } as unknown as PokemonInstance,
        { speciesId: 2, currentHp: 0 } as unknown as PokemonInstance,
        { speciesId: 3, currentHp: undefined } as unknown as PokemonInstance,
        { speciesId: 4, currentHp: 0 } as unknown as PokemonInstance,
      ],
    };

    const result = getDeadPokemon(saveData as SaveData);
    expect(result).toHaveLength(2);
    expect(result[0]?.speciesId).toBe(2);
    expect(result[1]?.speciesId).toBe(4);
  });

  it('should return empty array if no pokemon have 0 HP', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        { speciesId: 1, currentHp: 10 } as unknown as PokemonInstance,
        { speciesId: 3, currentHp: undefined } as unknown as PokemonInstance,
      ],
    };

    const result = getDeadPokemon(saveData as SaveData);
    expect(result).toHaveLength(0);
  });

  it('should handle undefined partyDetails gracefully', () => {
    const saveData: Partial<SaveData> = {};
    const result = getDeadPokemon(saveData as SaveData);
    expect(result).toHaveLength(0);
  });
});

describe('getGraveyardPokemon', () => {
  it('should return pokemon stored in the designated graveyard box', () => {
    const saveData: Partial<SaveData> = {
      pcDetails: [
        { speciesId: 1, storageLocation: 'Box 1' } as unknown as PokemonInstance,
        { speciesId: 2, storageLocation: 'Box 14' } as unknown as PokemonInstance,
        { speciesId: 3, storageLocation: 'Box 14' } as unknown as PokemonInstance,
      ],
    };

    const result = getGraveyardPokemon(saveData as SaveData, 'Box 14');
    expect(result).toHaveLength(2);
    expect(result[0]?.speciesId).toBe(2);
    expect(result[1]?.speciesId).toBe(3);
  });

  it('should return empty array if no pokemon are in the graveyard box', () => {
    const saveData: Partial<SaveData> = {
      pcDetails: [
        { speciesId: 1, storageLocation: 'Box 1' } as unknown as PokemonInstance,
        { speciesId: 2, storageLocation: 'Box 2' } as unknown as PokemonInstance,
      ],
    };

    const result = getGraveyardPokemon(saveData as SaveData, 'Box 14');
    expect(result).toHaveLength(0);
  });

  it('should handle undefined pcDetails gracefully', () => {
    const saveData: Partial<SaveData> = {};
    const result = getGraveyardPokemon(saveData as SaveData, 'Box 14');
    expect(result).toHaveLength(0);
  });
});

describe('aggregateFirstCatchByRoute', () => {
  it('should identify the first catch correctly based on storageLocation and slot', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: [
        {
          speciesId: 2,
          caughtData: { location: 1, locationName: 'Route 1' },
          storageLocation: 'Party',
          slot: 2,
        } as unknown as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 1,
          caughtData: { metLocation: 1, locationName: 'Route 1' },
          storageLocation: 'Box 1',
          slot: 1,
        } as unknown as PokemonInstance,
        {
          speciesId: 3,
          caughtData: { location: 2, locationName: 'Route 2' },
          storageLocation: 'Box 2',
          slot: 5,
        } as unknown as PokemonInstance,
        {
          speciesId: 4,
          caughtData: { location: 2, locationName: 'Route 2' },
          storageLocation: 'Box 1',
          slot: 2,
        } as unknown as PokemonInstance,
        {
          speciesId: 5,
          caughtData: { location: 2, locationName: 'Route 2' },
          storageLocation: 'Box 1',
          slot: 1,
        } as unknown as PokemonInstance,
      ],
    };

    const result = aggregateFirstCatchByRoute(saveData as SaveData);

    expect(result).toHaveLength(2);

    const route1 = result.find((r) => r.locationId === 1);
    expect(route1).toBeDefined();
    expect(route1?.encounters).toHaveLength(1);
    // Party takes precedence over PC
    expect(route1?.encounters[0]?.speciesId).toBe(2);

    const route2 = result.find((r) => r.locationId === 2);
    expect(route2).toBeDefined();
    expect(route2?.encounters).toHaveLength(1);
    // Box 1 slot 1 takes precedence over Box 1 slot 2 and Box 2 slot 5
    expect(route2?.encounters[0]?.speciesId).toBe(5);
  });
});
