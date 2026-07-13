import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { generateEvolutionSuggestions } from '../generators/evolutionGenerator';
import type { Suggestion } from '../strategies/types';
import type { AssistantApiData } from '../suggestionEngineTypes';

describe('EVO_TRIGGER.SHED', () => {
  it('generates a suggestion for Shedinja (Gen 3)', () => {
    const queryTargets = [292];
    const missingIds = new Set([292]);
    const displayVersion = 'ruby';

    // Nincada at lvl 20
    const nincada = {
      speciesId: 290,
      level: 20,
      isEgg: false,
      moves: [],
      otName: 'Jules',
    } as unknown as PokemonInstance;
    const instancesBySpecies = new Map<number, PokemonInstance[]>([[290, [nincada]]]);

    const saveData = {
      generation: 3,
      party: [290, 1, 2, 3, 4], // 5 Pokemon, 1 space left
      partyDetails: [nincada, {}, {}, {}, {}],
      inventory: [],
      pcItems: [],
    } as unknown as SaveData;

    const apiData = {
      pokemonMetadata: {
        292: {
          id: 292,
          n: 'Shedinja',
          efrm: [290], // Nincada
          det: [{ tr: 4 }], // SHED
        },
        290: {
          id: 290,
          n: 'Nincada',
          efrm: [],
          det: [],
        },
      },
    } as unknown as AssistantApiData;

    const suggestions: Suggestion[] = [];
    generateEvolutionSuggestions(
      queryTargets,
      saveData,
      apiData,
      instancesBySpecies,
      suggestions,
      displayVersion,
      missingIds,
    );

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.id).toBe('evo-shed-292');
    expect(suggestions[0]?.priority).toBe(90); // It is lvl 20 and has a slot
    expect(suggestions[0]?.description).toBe(
      'Your pre-evolution is ready! Level it up once with an empty party slot to get #292!',
    );
  });
});
