import { describe, expect, it } from 'vitest';
import { Gen1SafariZone } from '../../data/gen1/safariZone';
import type { SaveData } from '../../saveParser/parsers/common';
import { getMissingGen1SafariEncounters } from './missingEncounters';

describe('getMissingGen1SafariEncounters', () => {
  const createMockSaveData = (
    gameVersion: 'red' | 'blue' | 'yellow' | 'unknown',
    ownedIds: number[] = [],
    partyIds: number[] = [],
    pcIds: number[] = [],
  ): SaveData => {
    return {
      generation: 1,
      gameVersion,
      owned: new Set(ownedIds),
      seen: new Set(ownedIds), // Not used for this logic, but needed for type
      party: partyIds,
      pc: pcIds,
      partyDetails: [],
      pcDetails: [],
      badges: 0,
      // @ts-expect-error test mock
      kantoBadges: 0,
      trainerName: 'ASH',
      trainerId: 12345,
      currentMapId: 0,
      currentMapName: 'Pallet Town',
      inventory: [],
      pcItems: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };
  };

  it('should return empty array for non-gen1 games', () => {
    const saveData = createMockSaveData('unknown');
    const result = getMissingGen1SafariEncounters(saveData);
    expect(result).toEqual([]);
  });

  it('should return all encounters if nothing is owned', () => {
    const saveData = createMockSaveData('red');
    const result = getMissingGen1SafariEncounters(saveData);

    // Total areas should match the original data length, assuming all have 'red' encounters
    const redAreasWithEncounters = Gen1SafariZone.filter((a) => a.encounters.red && a.encounters.red.length > 0).length;
    expect(result.length).toBe(redAreasWithEncounters);
    expect(result[0]?.encounters.red).toEqual(Gen1SafariZone[0]?.encounters.red);
  });

  it('should correctly filter out owned pokemon', () => {
    // In Red, Area 1 (middle) has Nidoran F (29), Nidorina (30), etc.
    const saveData = createMockSaveData('red', [29, 30]);
    const result = getMissingGen1SafariEncounters(saveData);

    const middleArea = result.find((a) => a.name === 'kanto-safari-zone-middle');
    expect(middleArea).toBeDefined();

    // Nidoran F (29) and Nidorina (30) should not be in the missing list
    const hasNidoranF = middleArea?.encounters.red?.some((e) => e.pokemon === 29);
    const hasNidorina = middleArea?.encounters.red?.some((e) => e.pokemon === 30);

    expect(hasNidoranF).toBe(false);
    expect(hasNidorina).toBe(false);
  });

  it('should correctly filter out pokemon in party or pc, even if not in owned set', () => {
    // This tests the edge case where owned set doesn't contain a pokemon, but it's in party/pc.
    // 33 is Nidorino
    const saveData = createMockSaveData('red', [], [29], [30, 33]);
    const result = getMissingGen1SafariEncounters(saveData);

    const middleArea = result.find((a) => a.name === 'kanto-safari-zone-middle');

    const hasNidoranF = middleArea?.encounters.red?.some((e) => e.pokemon === 29);
    const hasNidorina = middleArea?.encounters.red?.some((e) => e.pokemon === 30);
    const hasNidorino = middleArea?.encounters.red?.some((e) => e.pokemon === 33);

    expect(hasNidoranF).toBe(false);
    expect(hasNidorina).toBe(false);
    expect(hasNidorino).toBe(false);
  });

  it('should return empty if all Safari Zone pokemon are already owned', () => {
    // Collect all pokemon from Red encounters
    const allRedPokemon = new Set<number>();
    for (const area of Gen1SafariZone) {
      for (const encounter of area.encounters.red || []) {
        allRedPokemon.add(encounter.pokemon);
      }
    }

    const saveData = createMockSaveData('red', Array.from(allRedPokemon));
    const result = getMissingGen1SafariEncounters(saveData);
    expect(result).toEqual([]);
  });

  it('should handle different game versions correctly (Blue)', () => {
    const saveData = createMockSaveData('blue', [29, 30]);
    const result = getMissingGen1SafariEncounters(saveData);

    const middleArea = result.find((a) => a.name === 'kanto-safari-zone-middle');
    expect(middleArea).toBeDefined();
    expect(middleArea?.encounters.blue).toBeDefined();
    expect(middleArea?.encounters.red).toBeUndefined(); // Should only have blue

    const hasNidoranF = middleArea?.encounters.blue?.some((e) => e.pokemon === 29);
    expect(hasNidoranF).toBe(false);
  });

  it('should handle different game versions correctly (Yellow)', () => {
    const saveData = createMockSaveData('yellow', [29, 30]);
    const result = getMissingGen1SafariEncounters(saveData);

    const middleArea = result.find((a) => a.name === 'kanto-safari-zone-middle');
    expect(middleArea).toBeDefined();
    expect(middleArea?.encounters.yellow).toBeDefined();

    const hasNidoranF = middleArea?.encounters.yellow?.some((e) => e.pokemon === 29);
    expect(hasNidoranF).toBe(false);
  });
});
