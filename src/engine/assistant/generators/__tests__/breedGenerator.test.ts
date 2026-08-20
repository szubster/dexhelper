import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../../saveParser/index';
import type { StandardSuggestion, Suggestion } from '../../strategies/types';
import type { AssistantApiData } from '../../suggestionEngineTypes';
import { generateBreedingSuggestions } from '../breedGenerator';

describe('breedGenerator', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    currentMapId: 1,
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    pokemonMetadata: {
      1: { id: 1, gr: 1 }, // target
      2: { id: 2, gr: 1 }, // chain end
      3: { id: 3, gr: 1 }, // chain intermediate
      4: { id: 4, gr: 1 }, // chain base

      // Target 1 has egg move 100, bred from 4 -> 3 -> 2 -> 1
      10: {
        id: 10,
        gr: 1,
        em: {
          100: [4, 3, 2, 10], // 4 -> 3 -> 2 -> 10 (target)
        },
      },
    } as unknown,
  } as unknown as AssistantApiData;

  it('should not populate missingLinks when the entire chain is owned with valid males', () => {
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [4, [{ speciesId: 4, moves: [100], personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Base with move (male)
      [3, [{ speciesId: 3, personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Intermediate (male)
      [2, [{ speciesId: 2, personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Pre-evolution (male)
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([10], mockSaveData, mockApiData, instancesBySpecies, suggestions);
    console.log(suggestions);

    expect(suggestions.length).toBeGreaterThan(0);
    const suggestion = suggestions.find((s) => s.id === 'egg-move-10-100-4') as StandardSuggestion;
    expect(suggestion).toBeDefined();
    expect(suggestion.missingLinks).toBeUndefined();
  });

  it('should flag absent missingLinks when an intermediate species is not owned', () => {
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [4, [{ speciesId: 4, moves: [100], personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Base with move (male)
      // 3 is completely missing
      [2, [{ speciesId: 2, personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Pre-evolution (male)
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([10], mockSaveData, mockApiData, instancesBySpecies, suggestions);

    expect(suggestions.length).toBeGreaterThan(0);
    const suggestion = suggestions.find((s) => s.id === 'egg-move-10-100-4') as StandardSuggestion;
    expect(suggestion).toBeDefined();
    expect(suggestion.missingLinks).toBeDefined();
    expect(suggestion.missingLinks).toEqual([{ speciesId: 3, reason: 'absent' }]);
  });

  it('should flag missing_male missingLinks when an intermediate species has no valid male', () => {
    const instancesBySpecies = new Map<number, PokemonInstance[]>([
      [4, [{ speciesId: 4, moves: [100], personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Base with move (male)
      [3, [{ speciesId: 3, personalityValue: 255, dvs: { atk: 0 } } as unknown as PokemonInstance]], // Intermediate (female, assuming gr:1 and atk:0 is female)
      [2, [{ speciesId: 2, personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Pre-evolution (male)
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([10], mockSaveData, mockApiData, instancesBySpecies, suggestions);

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
      [11, [{ speciesId: 11, moves: [200], personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Base with move (male)
      // 12 is missing completely -> absent
      [13, [{ speciesId: 13, personalityValue: 255, dvs: { atk: 0 } } as unknown as PokemonInstance]], // Intermediate -> missing_male
      [14, [{ speciesId: 14, personalityValue: 0, dvs: { atk: 15 } } as unknown as PokemonInstance]], // Pre-evolution (male)
    ]);

    const suggestions: Suggestion[] = [];
    generateBreedingSuggestions([20], mockSaveData, complexApiData, instancesBySpecies, suggestions);

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
