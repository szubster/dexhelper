import { expect, test } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import { generateSuggestions } from '../suggestionEngine';
import type { AssistantApiData } from '../suggestionEngineTypes';

test('coverage for suggestionEngine new lines', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    // Mock owned up to 251 except the ones we want to suggest (targets must be missing)
    owned: new Set(
      [...Array(251).keys()].map((i) => i + 1).filter((i) => ![196, 197, 106, 107, 237, 136, 68, 208].includes(i)),
    ),
    seen: new Set(),
    party: [],
    inventory: [{ id: 0x16, quantity: 1 }], // Fire Stone
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [
      { speciesId: 133, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance,
      {
        speciesId: 236,
        level: 20,
        otName: 'PLAYER',
        dvs: { hp: 15, atk: 15, def: 0, spd: 15, spc: 15 },
        statExp: { hp: 0, atk: 0, def: 0, spd: 0, spc: 0 },
      } as unknown as PokemonInstance,
      { speciesId: 67, level: 30, otName: 'PLAYER' } as unknown as PokemonInstance,
      { speciesId: 95, level: 30, otName: 'PLAYER' } as unknown as PokemonInstance,
    ],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  // Manually ensure Eevee, Tyrogue, and Machoke are in owned
  mockSaveData.owned.add(133);
  mockSaveData.owned.add(236);
  mockSaveData.owned.add(67);
  mockSaveData.owned.add(95);

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      196: {
        id: 196,
        n: 'Espeon',
        efrm: [133],
        det: [{ tr: 1, mh: 220, time: 1 }],
        eto: [],
      }, // Espeon
      197: {
        id: 197,
        n: 'Umbreon',
        efrm: [133],
        det: [{ tr: 1, mh: 220, time: 2 }],
        eto: [],
      }, // Umbreon
      106: {
        id: 106,
        n: 'Hitmonlee',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rps: 1 }],
        eto: [],
      }, // Hitmonlee
      107: {
        id: 107,
        n: 'Hitmonchan',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rps: -1 }],
        eto: [],
      }, // Hitmonchan
      237: {
        id: 237,
        n: 'Hitmontop',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rps: 0 }],
        eto: [],
      }, // Hitmontop
      136: {
        id: 136,
        n: 'Flareon',
        efrm: [133],
        det: [{ tr: 3, item: 82 }], // Fire Stone
        eto: [],
      }, // Flareon (Item)
      68: {
        id: 68,
        n: 'Machamp',
        efrm: [67, 66],
        det: [{ tr: 2 }], // Trade (EVO_TRIGGER.TRADE = 2)
        eto: [],
      }, // Machamp (Trade)
      208: {
        id: 208,
        n: 'Steelix',
        efrm: [95],
        det: [{ tr: 2, held: 0x8f }], // Trade with Metal Coat
        eto: [],
      }, // Steelix
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);

  const espeon = suggestions.find((s) => s.pokemonId === 196);
  expect(espeon).toBeDefined();
  expect(espeon?.description).toContain('during the day');

  const umbreon = suggestions.find((s) => s.pokemonId === 197);
  expect(umbreon).toBeDefined();
  expect(umbreon?.description).toContain('during the night');

  const hitmonlee = suggestions.find((s) => s.pokemonId === 106);
  expect(hitmonlee).toBeDefined();

  const hitmonchan = suggestions.find((s) => s.pokemonId === 107);
  expect(hitmonchan).toBeDefined();

  const hitmontop = suggestions.find((s) => s.pokemonId === 237);
  expect(hitmontop).toBeDefined();

  const flareon = suggestions.find((s) => s.pokemonId === 136);
  expect(flareon).toBeDefined();
  expect(flareon?.title).toContain('Ready to Evolve');
  expect(flareon?.description).toContain('Use your Fire Stone');

  const machamp = suggestions.find((s) => s.pokemonId === 68);
  expect(machamp).toBeDefined();
  expect(machamp?.title).toContain('Trade Evolution');

  const steelix = suggestions.find((s) => s.pokemonId === 208);
  expect(steelix).toBeDefined();
  expect(steelix?.title).toContain('Item Needed for Trade');

  // Verify ready trade evolve
  mockSaveData.inventory.push({ id: 0x8f, quantity: 1 });
  const { suggestions: readySuggestions } = generateSuggestions(
    mockSaveData,
    false,
    'crystal',
    mockApiData,
    gen1Strategy,
  );
  const readySteelix = readySuggestions.find((s) => s.pokemonId === 208);
  expect(readySteelix).toBeDefined();
  expect(readySteelix?.title).toContain('Ready to Trade Evolve');
});

test('coverage for suggestionEngine edge cases', () => {
  const mockSaveData = {
    generation: 1,
    gameVersion: 'yellow',
    owned: new Set([...Array(134).keys()].map((i) => i + 1)), // Covers 1-134, including 133
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 133, level: 20, otName: 'PLAYER' }],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      135: {
        id: 135,
        n: 'Jolteon',
        efrm: [133],
        det: [{ tr: 3, item: 83 }], // Jolteon, but no stone in inventory
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, gen1Strategy);
  const jolteon = suggestions.find((s) => s.pokemonId === 135);
  expect(jolteon).toBeDefined();
  expect(jolteon?.title).toContain('Item Needed');
});

test('coverage for gen 2 breeding edge case without valid base pokemon', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([1]), // own bulbasaur, missing pichu (target)
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 1, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance], // need physical instance of evo (bulbasaur)
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      50: {
        id: 50, // Pichu
        n: 'Pichu',
        efrm: [],
        det: [],
        eto: [{ id: 1, min: 0, m: 1, tr: 1, mh: 220, item: null, held: null, time: null, rel_s: null }], // Pitchu evolves into Bulbasaur
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);

  const pichu = suggestions.find((s) => s.pokemonId === 50);
  expect(pichu).toBeDefined();
  expect(pichu?.title).toContain('Breed');
});

test('coverage for missing target id in pokemonMetadata for Gen 2 breeding', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([25]), // own Pikachu
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 25, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      // 50 is NOT defined here
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);
  const diglett = suggestions.find((s) => s.pokemonId === 50);
  expect(diglett).toBeUndefined();
});

test('coverage for generateSuggestions with missing parent / target id / empty details in evolution logic', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([1, 2, 3]), // don't own 50
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      50: {
        id: 50,
        n: 'Diglett',
        efrm: [25], // Diglett evolves from Pikachu (but we don't own Pikachu)
        det: [],
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);
  const diglett = suggestions.find((s) => s.pokemonId === 50);
  expect(diglett).toBeUndefined();
});

test('coverage for missing target metadata entirely in evo logic', () => {
  const mockSaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {},
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
  const invalidEvo = suggestions.find((s) => s.category === 'Evolve');
  expect(invalidEvo).toBeUndefined();
});

test('coverage for suggestionEngine getGameItemId unknown generation', () => {
  const mockSaveData: SaveData = {
    generation: 4, // Forcing this to 4 to hit the return on line 59.
    gameVersion: 'red',
    owned: new Set([133]),
    seen: new Set(),
    party: [],
    inventory: [{ id: 82, quantity: 1 }],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 133, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      136: {
        id: 136,
        n: 'Flareon',
        efrm: [133],
        det: [{ tr: 3, item: 82 }],
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  expect(() => generateSuggestions(mockSaveData, false, 'ruby', mockApiData, gen1Strategy)).toThrow(
    'Unknown generation',
  );
});

test('coverage for recursive missing exclusive logic', () => {
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
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    pokemonMetadata: {
      4: { id: 4, n: 'Charmander', efrm: [], det: [], eto: [] },
      5: { id: 5, n: 'Charmeleon', efrm: [4], det: [{ tr: 1, ml: 16 }], eto: [] },
      6: { id: 6, n: 'Charizard', efrm: [5, 4], det: [{ tr: 1, ml: 36 }], eto: [] }, // Charizard has Charmeleon (5) and Charmander (4) as ancestors
    },
    ancestralEncounters: {},
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const mockStrategy = {
    ...gen1Strategy,
    getSpecialSuggestions: () => [],
    getUnobtainableReason: (pid: number) => (pid === 6 ? 'Needs Link Cable' : null),
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, mockStrategy);
  const exclusiveSuggestion = suggestions.find((s) => s.id === 'exclusive-6');
  expect(exclusiveSuggestion).toBeUndefined();
});

test('coverage for localPids.delete with array of pokemonIds', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]), // Empty to trigger catch logic
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {
      1: {
        aid: 1,
        locId: 1,
        pids: [1, 2], // Both will be filtered out because no valid details
        details: [
          // No details means hasValidEncounter will be false
        ],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], det: [], eto: [] },
      2: { id: 2, n: 'Ivysaur', efrm: [1], det: [], eto: [] },
    },
    areaNames: {},
    allLocations: [{ id: 1, name: 'Route 1', pids: [1, 2], type: 'route', gen: 2, isLandmark: false }],
    allAreas: [],
    localAid: 1,
  } as unknown as AssistantApiData;

  const mockStrategyWithCatch = {
    ...gen1Strategy,
    generation: 2,
    isInternallyObtainable: () => true,
    getUnobtainableReason: () => null,
    resolveMapAid: () => 1,
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  // Both should be filtered out, suggestions length should be >0 but not contain Route 1 catch
  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeUndefined();
});

test('coverage for localPids.delete with single pokemonId', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]), // Empty to trigger catch logic
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {
      1: {
        aid: 1,
        locId: 1,
        pids: [1], // Single ID, filtered out because no details
        details: [],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], det: [], eto: [] },
    },
    areaNames: {},
    allLocations: [{ id: 1, name: 'Route 1', pids: [1], type: 'route', gen: 2, isLandmark: false }],
    allAreas: [],
    localAid: 1,
  } as unknown as AssistantApiData;

  const mockStrategyWithCatch = {
    ...gen1Strategy,
    generation: 2,
    isInternallyObtainable: () => true,
    getUnobtainableReason: () => null,
    resolveMapAid: () => 1,
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeUndefined();
});

test('coverage for localPids.delete with some ids filtered out', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]), // Empty to trigger catch logic
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {
      1: {
        aid: 1,
        locId: 1,
        pids: [1, 2], // 1 has details, 2 doesn't
        details: [
          {
            method: 'WALK',
            methodId: 1,
            conditionId: 0,
            chance: 100,
            minLevel: 10,
            maxLevel: 10,
            games: [],
            pid: 1, // Only pid 1 is valid
          },
        ],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], det: [], eto: [] },
      2: { id: 2, n: 'Ivysaur', efrm: [1], det: [], eto: [] },
    },
    areaNames: {},
    allLocations: [{ id: 1, name: 'Route 1', pids: [1, 2], type: 'route', gen: 2, isLandmark: false }],
    allAreas: [],
    localAid: 1,
  } as unknown as AssistantApiData;

  const mockStrategyWithCatch = {
    ...gen1Strategy,
    generation: 2,
    isInternallyObtainable: () => true,
    getUnobtainableReason: () => null,
    resolveMapAid: () => 1,
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  // Suggestion exists but only has 1
  expect(suggestions.length).toBeGreaterThan(0);
});

test('coverage for suggestionEngine catch filtering with single pokemonId', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]), // Empty to trigger catch logic
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {
      1: {
        aid: 1,
        locId: 1,
        pids: [1], // Single ID
        details: [], // No details -> hasValidEncounter = false
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], det: [], eto: [] },
    },
    areaNames: {},
    allLocations: [{ id: 1, name: 'Route 1', pids: [1], type: 'route', gen: 2, isLandmark: false }],
    allAreas: [],
    localAid: 1,
  } as unknown as AssistantApiData;

  const mockStrategyWithCatch = {
    ...gen1Strategy,
    generation: 2,
    isInternallyObtainable: () => true,
    getUnobtainableReason: () => null,
    resolveMapAid: () => 1,
    getSpecialSuggestions: () => [
      {
        id: 'catch-local',
        category: 'Catch',
        title: 'Catch Right Here',
        description: '...',
        pokemonId: 1, // Notice this is a single ID, not array pokemonIds
        priority: 120,
        encounterInfo: {
          1: undefined,
        },
      } as unknown as import('../strategies/types').CatchSuggestion,
    ],
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeUndefined();
});

test('coverage for suggestionEngine catch filtering when pokemonIds has undefined encounterInfo elements', () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]), // Empty to trigger catch logic
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], det: [], eto: [] },
      2: { id: 2, n: 'Ivysaur', efrm: [1], det: [], eto: [] },
    },
    areaNames: {},
    allLocations: [{ id: 1, name: 'Route 1', pids: [1, 2], type: 'route', gen: 2, isLandmark: false }],
    allAreas: [],
    localAid: 1,
  } as unknown as AssistantApiData;

  const mockStrategyWithCatch = {
    ...gen1Strategy,
    generation: 2,
    isInternallyObtainable: () => true,
    getUnobtainableReason: () => null,
    resolveMapAid: () => 1,
    getSpecialSuggestions: () => [
      {
        id: 'catch-local',
        category: 'Catch',
        title: 'Catch Right Here',
        description: '...',
        pokemonIds: [1, 2],
        priority: 120,
        encounterInfo: {
          1: [
            {
              method: 'walk',
              methodId: 1,
              conditionId: 0,
              chance: 100,
              minLevel: 10,
              maxLevel: 10,
              games: [],
              pid: 1,
            },
          ],
          2: undefined,
        },
      } as unknown as import('../strategies/types').CatchSuggestion,
    ],
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeDefined();
  expect(locSugg?.pokemonIds).toEqual([1]); // 2 is filtered out
});
