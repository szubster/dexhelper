import { describe, expect, it } from 'vitest';
import { gen1Strategy } from '../strategies/gen1Strategy';
import { generateSuggestions } from '../suggestionEngine';

describe('Recursive Evolution Suggestions', () => {
  it('should suggest evolving Charmander into Charmeleon if missing Charizard, owns Charmeleon dex entry, but only physically has Charmander', async () => {
    const mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([4, 5]), // Owns Charmander and Charmeleon in dex
      seen: new Set([4, 5, 6]),
      party: [],
      pc: [],
      partyDetails: [{ speciesId: 4, level: 36, isShiny: false, hash: '', moves: [], storageLocation: 'party' }],
      pcDetails: [],
      inventory: [],
      trainerName: 'ASH',
    };

    const mockApiData = {
      localAid: null,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        4: { id: 4, efrm: [], det: [] },
        5: { id: 5, efrm: [4], det: [{ tr: 1, ml: 16 }] },
        6: { id: 6, efrm: [5, 4], det: [{ tr: 1, ml: 36 }] }, // efrm actually contains [5, 4] for Charizard!
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    };

    const mockStrategy = { ...gen1Strategy, getSpecialSuggestions: () => [] };
    const { suggestions } = await generateSuggestions(
      mockSaveData as unknown as import('../../saveParser/index').SaveData,
      false,
      null,
      mockApiData as unknown as import('../suggestionEngineTypes').AssistantApiData,
      mockStrategy,
    );

    // Should suggest evolving Charmander -> Charmeleon (since missing #6 and #5 is immediate target)
    const evoSuggestion = suggestions.find((s) => s.pokemonId === 6);
    expect(evoSuggestion).toBeDefined();
    expect(evoSuggestion?.category).toBe('Evolve');
    expect(evoSuggestion?.description).toContain('Lv. 16');
  });
});
