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
          evolvesFrom: [290], // Nincada
          evolutionDetails: [{ tr: 4 }], // SHED
        },
        290: {
          id: 290,
          n: 'Nincada',
          evolvesFrom: [],
          evolutionDetails: [],
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

it('generates a suggestion for Shedinja (Gen 4+ with Pokeball)', () => {
  const queryTargets = [292];
  const missingIds = new Set([292]);
  const displayVersion = 'diamond'; // Or something that signifies Gen 4+

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
    generation: 4, // Gen 4 requires pokeball
    party: [290, 1, 2, 3, 4], // 5 Pokemon, 1 space left
    partyDetails: [nincada, {}, {}, {}, {}],
    inventory: [{ id: 4, quantity: 1 }], // standard Poké Ball is 4
    pcItems: [],
  } as unknown as SaveData;

  const apiData = {
    pokemonMetadata: {
      292: {
        id: 292,
        n: 'Shedinja',
        evolvesFrom: [290], // Nincada
        evolutionDetails: [{ tr: 4 }], // SHED
      },
      290: {
        id: 290,
        n: 'Nincada',
        evolvesFrom: [],
        evolutionDetails: [],
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
  expect(suggestions[0]?.priority).toBe(90); // It is lvl 20, has a slot, and has a pokeball
  expect(suggestions[0]?.description).toBe(
    'Your pre-evolution is ready! Level it up once with an empty party slot and a Poké Ball to get #292!',
  );
});

it('warns if missing party space', () => {
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
    party: [290, 1, 2, 3, 4, 5], // 6 Pokemon, full party
    partyDetails: [nincada, {}, {}, {}, {}, {}],
    inventory: [],
    pcItems: [],
  } as unknown as SaveData;

  const apiData = {
    pokemonMetadata: {
      292: {
        id: 292,
        n: 'Shedinja',
        evolvesFrom: [290], // Nincada
        evolutionDetails: [{ tr: 4 }], // SHED
      },
      290: {
        id: 290,
        n: 'Nincada',
        evolvesFrom: [],
        evolutionDetails: [],
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
  expect(suggestions[0]?.priority).toBe(75); // Level 20, but no space
  expect(suggestions[0]?.description).toBe(
    'Your pre-evolution is ready, but you need to deposit a Pokémon in the PC to have an empty party slot!',
  );
});

it('warns if missing Pokeball in Gen 4+', () => {
  const queryTargets = [292];
  const missingIds = new Set([292]);
  const displayVersion = 'diamond';

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
    generation: 4,
    party: [290, 1, 2, 3, 4], // 5 Pokemon, 1 space left
    partyDetails: [nincada, {}, {}, {}, {}],
    inventory: [], // NO POKEBALL
    pcItems: [],
  } as unknown as SaveData;

  const apiData = {
    pokemonMetadata: {
      292: {
        id: 292,
        n: 'Shedinja',
        evolvesFrom: [290], // Nincada
        evolutionDetails: [{ tr: 4 }], // SHED
      },
      290: {
        id: 290,
        n: 'Nincada',
        evolvesFrom: [],
        evolutionDetails: [],
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
  expect(suggestions[0]?.priority).toBe(75); // Level 20, but no pokeball
  expect(suggestions[0]?.description).toBe(
    'Your pre-evolution is ready, but you need a standard Poké Ball in your bag!',
  );
});

it('suggests standard level up requirement if under leveled', () => {
  const queryTargets = [292];
  const missingIds = new Set([292]);
  const displayVersion = 'ruby';

  // Nincada at lvl 15 (underleveled)
  const nincada = {
    speciesId: 290,
    level: 15,
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
        evolvesFrom: [290], // Nincada
        evolutionDetails: [{ tr: 4 }], // SHED
      },
      290: {
        id: 290,
        n: 'Nincada',
        evolvesFrom: [],
        evolutionDetails: [],
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
  expect(suggestions[0]?.priority).toBe(75); // Not leveled up yet
  expect(suggestions[0]?.description).toBe(
    'Level up your pre-evolution to Lv. 20 with an empty slot in your party to get #292!',
  );
});
