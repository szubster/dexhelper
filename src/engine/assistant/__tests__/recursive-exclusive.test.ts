import { describe, expect, it } from 'vitest';
import { gen1Strategy } from '../strategies/gen1Strategy';
import { generateSuggestions } from '../suggestionEngine';

describe('Recursive Exclusive Checking', () => {
  it('should not suggest a version exclusive trade if the player owns a deep ancestor (e.g. Charmander for Charizard)', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([4]), // Only owns Charmander
      seen: new Set([4]),
      party: [],
      pc: [],
      partyDetails: [{ speciesId: 4, level: 36, isShiny: false, hash: '', moves: [], storageLocation: 'party' }],
      pcDetails: [],
      inventory: [],
      trainerName: 'ASH',
      currentBoxCount: 0,
      hallOfFameCount: 1,
    };

    const mockApiData = {
      localAid: null,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        4: { id: 4, efrm: [], det: [] },
        5: { id: 5, efrm: [4], det: [{ tr: 1, ml: 16 }] },
        6: { id: 6, efrm: [5, 4], det: [{ tr: 1, ml: 36 }] }, // Charizard has Charmeleon (5) and Charmander (4) as ancestors
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    };

    const mockStrategy = {
      ...gen1Strategy,
      getSpecialSuggestions: () => [],
      getUnobtainableReason: (pid: number) => (pid === 6 ? 'Needs Link Cable' : null),
    };

    const { suggestions } = await generateSuggestions(
      mockSaveData as unknown as import('../../saveParser/index').SaveData,
      false,
      null,
      mockApiData as unknown as import('../suggestionEngineTypes').AssistantApiData,
      mockStrategy as unknown as import('../strategies/types').AssistantStrategy,
    );

    // Should NOT contain a 'Version Exclusive' suggestion for Charizard because we own Charmander
    const exclusiveSuggestion = suggestions.find((s) => s.id === 'exclusive-6');
    expect(exclusiveSuggestion).toBeUndefined();
  });
});
