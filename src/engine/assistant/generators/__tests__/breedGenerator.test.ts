import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../../saveParser/index';
import type { StandardSuggestion, Suggestion } from '../../strategies/types';
import type { AssistantApiData } from '../../suggestionEngineTypes';
import { generateBreedingSuggestions } from '../breedGenerator';

describe('breedGenerator', () => {
  const mockGen2SaveData: SaveData = {
    generation: 2,
    currentMapId: 1,
    daycare: [],
    daycareHasEgg: false,
  } as unknown as SaveData;

  const mockGen3SaveData: SaveData = {
    generation: 3,
    currentMapId: 1,
    gen3Daycare: {
      mons: [],
      offspringPersonality: 0,
    },
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    pokemonMetadata: {
      1: { id: 1, gr: 1 }, // target
      2: { id: 2, gr: 1 }, // chain end
      3: { id: 3, gr: 1 }, // chain intermediate
      4: { id: 4, gr: 1 }, // chain base

      // Sea Incense target Azurill (#298), evolution Marill (#183)
      298: {
        id: 298,
        gr: 1,
        efrm: [],
        eto: [{ id: 183 }],
      },
      // Lax Incense target Wynaut (#360), evolution Wobbuffet (#202)
      360: {
        id: 360,
        gr: 1,
        efrm: [],
        eto: [{ id: 202 }],
      },
      183: { id: 183, gr: 1 },
      202: { id: 202, gr: 1 },

      // Base target with evolution
      25: {
        id: 25,
        gr: 1,
        efrm: [],
        eto: [{ id: 26 }], // Pikachu -> Raichu
      },

      // Target 10 has egg move 100, bred from 4 -> 3 -> 2 -> 10
      10: {
        id: 10,
        gr: 1,
        em: {
          100: [4, 3, 2, 10],
        },
      },
    } as unknown,
  } as unknown as AssistantApiData;

  it('should generate breeding suggestions when player owns an evolution of base target', () => {
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [26, [{ speciesId: 26, personalityValue: 255 } as unknown as PokemonInstance]],
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([25], mockGen2SaveData, mockApiData, instancesBySpecies, suggestions);

    expect(suggestions).toHaveLength(1);
    const suggestion = suggestions[0] as StandardSuggestion;
    expect(suggestion.id).toBe('breed-25');
    expect(suggestion.title).toBe('Breed: #25');
    expect(suggestion.description).toContain('Leave your #26 and a compatible partner');
    expect(suggestion.priority).toBe(85);
  });

  it('should include incense text when breeding Azurill (#298) or Wynaut (#360)', () => {
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [183, [{ speciesId: 183, personalityValue: 255 } as unknown as PokemonInstance]],
      [202, [{ speciesId: 202, personalityValue: 255 } as unknown as PokemonInstance]],
    ]);

    // Test Sea Incense for #298
    const suggestions298: Suggestion[] = [];
    generateBreedingSuggestions([298], mockGen2SaveData, mockApiData, instancesBySpecies, suggestions298);

    expect(suggestions298).toHaveLength(1);
    const s298 = suggestions298[0] as StandardSuggestion;
    expect(s298.description).toContain('holding a Sea Incense');

    // Test Lax Incense for #360
    const suggestions360: Suggestion[] = [];
    generateBreedingSuggestions([360], mockGen2SaveData, mockApiData, instancesBySpecies, suggestions360);

    expect(suggestions360).toHaveLength(1);
    const s360 = suggestions360[0] as StandardSuggestion;
    expect(s360.description).toContain('holding a Lax Incense');
  });

  it('should handle Daycare state variations (Need Partner, Egg Ready, Breeding in Progress)', () => {
    // Scenario 1: One mon in daycare (Need Partner)
    const saveDataOneInDaycare: SaveData = {
      generation: 2,
      currentMapId: 1,
      daycare: [{ speciesId: 26 } as unknown],
      daycareHasEgg: false,
    } as unknown as SaveData;

    const suggestions1: Suggestion[] = [];
    generateBreedingSuggestions([25], saveDataOneInDaycare, mockApiData, new Map(), suggestions1);

    expect(suggestions1).toHaveLength(1);
    expect(suggestions1[0]?.title).toBe('Need Partner: #25');
    expect(suggestions1[0]?.priority).toBe(80);

    // Scenario 2: Two mons in daycare, egg ready
    const saveDataEggReady: SaveData = {
      generation: 2,
      currentMapId: 1,
      daycare: [{ speciesId: 26 } as unknown, { speciesId: 132 } as unknown],
      daycareHasEgg: true,
    } as unknown as SaveData;

    const suggestions2: Suggestion[] = [];
    generateBreedingSuggestions([25], saveDataEggReady, mockApiData, new Map(), suggestions2);

    expect(suggestions2).toHaveLength(1);
    expect(suggestions2[0]?.title).toBe('Egg Ready: #25!');
    expect(suggestions2[0]?.priority).toBe(95);

    // Scenario 3: Two mons in daycare, breeding in progress
    const saveDataInProgress: SaveData = {
      generation: 2,
      currentMapId: 1,
      daycare: [{ speciesId: 26 } as unknown, { speciesId: 132 } as unknown],
      daycareHasEgg: false,
    } as unknown as SaveData;

    const suggestions3: Suggestion[] = [];
    generateBreedingSuggestions([25], saveDataInProgress, mockApiData, new Map(), suggestions3);

    expect(suggestions3).toHaveLength(1);
    expect(suggestions3[0]?.title).toBe('Breeding in Progress: #25');
    expect(suggestions3[0]?.priority).toBe(85);
  });

  it('should not populate missingLinks when the entire chain is owned with valid males', () => {
    // In Gen 2, DVs determine gender (Attack DV > femaleThreshold is male). Attack DV 15 is male.
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [4, [{ speciesId: 4, moves: [100], personalityValue: 255, dvs: { atk: 15 } } as unknown as PokemonInstance]],
      [3, [{ speciesId: 3, personalityValue: 255, dvs: { atk: 15 } } as unknown as PokemonInstance]],
      [2, [{ speciesId: 2, personalityValue: 255, dvs: { atk: 15 } } as unknown as PokemonInstance]],
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([10], mockGen2SaveData, mockApiData, instancesBySpecies, suggestions);

    expect(suggestions.length).toBeGreaterThan(0);
    const suggestion = suggestions.find((s) => s.id === 'egg-move-10-100-4') as StandardSuggestion;
    expect(suggestion).toBeDefined();
    expect(suggestion.missingLinks).toBeUndefined();
  });

  it('should flag absent missingLinks when an intermediate species is not owned', () => {
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [4, [{ speciesId: 4, moves: [100], personalityValue: 255, dvs: { atk: 15 } } as unknown as PokemonInstance]],
      [2, [{ speciesId: 2, personalityValue: 255, dvs: { atk: 15 } } as unknown as PokemonInstance]],
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([10], mockGen2SaveData, mockApiData, instancesBySpecies, suggestions);

    expect(suggestions.length).toBeGreaterThan(0);
    const suggestion = suggestions.find((s) => s.id === 'egg-move-10-100-4') as StandardSuggestion;
    expect(suggestion).toBeDefined();
    expect(suggestion.missingLinks).toBeDefined();
    expect(suggestion.missingLinks).toEqual([{ speciesId: 3, reason: 'absent' }]);
  });

  it('should flag missing_male missingLinks in Gen 3 when intermediate species has no valid male', () => {
    // In Gen 3, gender is computed via personalityValue. personalityValue % 256 <= threshold -> Female
    // For gr: 1 (female ratio, threshold = 31), personalityValue 0 is female, personalityValue 255 is male.
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [4, [{ speciesId: 4, moves: [100], personalityValue: 255 } as unknown as PokemonInstance]], // Male base with move
      [3, [{ speciesId: 3, personalityValue: 0 } as unknown as PokemonInstance]], // Female intermediate in Gen 3
      [2, [{ speciesId: 2, personalityValue: 255 } as unknown as PokemonInstance]], // Male pre-evo
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([10], mockGen3SaveData, mockApiData, instancesBySpecies, suggestions);

    expect(suggestions.length).toBeGreaterThan(0);
    const suggestion = suggestions.find((s) => s.id === 'egg-move-10-100-4') as StandardSuggestion;
    expect(suggestion).toBeDefined();
    expect(suggestion.missingLinks).toBeDefined();
    expect(suggestion.missingLinks).toEqual([{ speciesId: 3, reason: 'missing_male' }]);
  });

  it('should flag both absent and missing_male when there are multiple missing links', () => {
    const complexApiData = {
      pokemonMetadata: {
        ...mockApiData.pokemonMetadata,
        20: {
          id: 20,
          gr: 1,
          em: {
            200: [11, 12, 13, 14, 20],
          },
        },
      } as unknown,
    } as unknown as AssistantApiData;

    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [11, [{ speciesId: 11, moves: [200], personalityValue: 255, dvs: { atk: 15 } } as unknown as PokemonInstance]],
      [13, [{ speciesId: 13, personalityValue: 0, dvs: { atk: 0 } } as unknown as PokemonInstance]],
      [14, [{ speciesId: 14, personalityValue: 0, dvs: { atk: 0 } } as unknown as PokemonInstance]],
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([20], mockGen2SaveData, complexApiData, instancesBySpecies, suggestions);

    expect(suggestions.length).toBeGreaterThan(0);
    const suggestion = suggestions.find((s) => s.id === 'egg-move-20-200-11') as StandardSuggestion;
    expect(suggestion).toBeDefined();
    expect(suggestion.missingLinks).toBeDefined();
    expect(suggestion.missingLinks).toEqual([
      { speciesId: 12, reason: 'absent' },
      { speciesId: 13, reason: 'missing_male' },
      { speciesId: 14, reason: 'missing_male' },
    ]);
  });
});
