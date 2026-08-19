import { expect, test, vi } from 'vitest';
import { pokeDB } from '@/db/PokeDB';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import { generateSuggestions } from '../suggestionEngine';
import type { AssistantApiData } from '../suggestionEngineTypes';

const MOCK_ITEMS: Record<number, Record<string, string | number>> = {
  4: { id: 4, name: 'Poké Ball', gen1_id: 4, gen2_id: 4, gen3_id: 4 },
  80: { id: 80, name: 'Sun Stone', gen1_id: 17, gen2_id: 169, gen3_id: 93 },
  81: { id: 81, name: 'Moon Stone', gen1_id: 10, gen2_id: 8, gen3_id: 94 },
  82: { id: 82, name: 'Fire Stone', gen1_id: 32, gen2_id: 22, gen3_id: 95 },
  83: { id: 83, name: 'Thunder Stone', gen1_id: 33, gen2_id: 23, gen3_id: 96 },
  84: { id: 84, name: 'Water Stone', gen1_id: 34, gen2_id: 24, gen3_id: 97 },
  85: { id: 85, name: 'Leaf Stone', gen1_id: 47, gen2_id: 34, gen3_id: 98 },
  198: { id: 198, name: "King's Rock", gen1_id: 198, gen2_id: 221, gen3_id: 187 },
  210: { id: 210, name: 'Metal Coat', gen1_id: 210, gen2_id: 143, gen3_id: 199 },
  212: { id: 212, name: 'Dragon Scale', gen1_id: 212, gen2_id: 151, gen3_id: 201 },
  229: { id: 229, name: 'Upgrade', gen1_id: 229, gen2_id: 172, gen3_id: 218 },
  203: { id: 203, name: 'Deep Sea Tooth', gen1_id: 203, gen2_id: 203, gen3_id: 192 },
  204: { id: 204, name: 'Deep Sea Scale', gen1_id: 204, gen2_id: 204, gen3_id: 193 },
};

vi.spyOn(pokeDB, 'getItem').mockImplementation(async (id) => {
  return MOCK_ITEMS[id] as unknown as import('@/db/schema').ItemMetadata;
});

test('coverage for suggestionEngine new lines', async () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set(
      [...Array(251).keys()].map((i) => i + 1).filter((i) => ![196, 197, 106, 107, 237, 136, 68, 208].includes(i)),
    ),
    seen: new Set(),
    party: [],
    inventory: [{ id: 0x16, quantity: 1 }],
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
      },
      197: {
        id: 197,
        n: 'Umbreon',
        efrm: [133],
        det: [{ tr: 1, mh: 220, time: 2 }],
        eto: [],
      },
      106: {
        id: 106,
        n: 'Hitmonlee',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rps: 1 }],
        eto: [],
      },
      107: {
        id: 107,
        n: 'Hitmonchan',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rps: -1 }],
        eto: [],
      },
      237: {
        id: 237,
        n: 'Hitmontop',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rps: 0 }],
        eto: [],
      },
      136: {
        id: 136,
        n: 'Flareon',
        efrm: [133],
        det: [{ tr: 3, item: 82 }],
        eto: [],
      },
      68: {
        id: 68,
        n: 'Machamp',
        efrm: [67, 66],
        det: [{ tr: 2 }],
        eto: [],
      },
      208: {
        id: 208,
        n: 'Steelix',
        efrm: [95],
        det: [{ tr: 2, held: 0x8f }],
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);

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

  mockSaveData.inventory.push({ id: 0x8f, quantity: 1 });
  const { suggestions: readySuggestions } = await generateSuggestions(
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

test('coverage for suggestionEngine edge cases', async () => {
  const mockSaveData = {
    generation: 1,
    gameVersion: 'yellow',
    owned: new Set([...Array(134).keys()].map((i) => i + 1)),
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
        det: [{ tr: 3, item: 83 }],
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'gold', mockApiData, gen1Strategy);
  const jolteon = suggestions.find((s) => s.pokemonId === 135);
  expect(jolteon).toBeDefined();
  expect(jolteon?.title).toContain('Item Needed');
});

test('coverage for gen 2 breeding edge case without valid base pokemon', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 1, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance],
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
        n: 'Pichu',
        efrm: [],
        det: [],
        eto: [{ id: 1, min: 0, m: 1, tr: 1, mh: 220, item: null, held: null, time: null, rel_s: null }],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);

  const pichu = suggestions.find((s) => s.pokemonId === 50);
  expect(pichu).toBeDefined();
  expect(pichu?.title).toContain('Breed');
});

test('coverage for missing target id in pokemonMetadata for Gen 2 breeding', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([25]),
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
    pokemonMetadata: {},
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);
  const diglett = suggestions.find((s) => s.pokemonId === 50);
  expect(diglett).toBeUndefined();
});

test('coverage for generateSuggestions with missing parent / target id / empty details in evolution logic', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([1, 2, 3]),
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
        efrm: [25],
        det: [],
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);
  const diglett = suggestions.find((s) => s.pokemonId === 50);
  expect(diglett).toBeUndefined();
});

test('coverage for missing target metadata entirely in evo logic', async () => {
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

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
  const invalidEvo = suggestions.find((s) => s.category === 'Evolve');
  expect(invalidEvo).toBeUndefined();
});

test('coverage for suggestionEngine getGameItemId unknown generation', async () => {
  const mockSaveData: SaveData = {
    generation: 4,
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

  await expect(generateSuggestions(mockSaveData, false, 'ruby', mockApiData, gen1Strategy)).rejects.toThrow(
    'Unknown generation',
  );
});

test('coverage for recursive missing exclusive logic', async () => {
  const mockSaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([4]),
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
      6: { id: 6, n: 'Charizard', efrm: [5, 4], det: [{ tr: 1, ml: 36 }], eto: [] },
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

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'red', mockApiData, mockStrategy);
  const exclusiveSuggestion = suggestions.find((s) => s.id === 'exclusive-6');
  expect(exclusiveSuggestion).toBeUndefined();
});

test('coverage for localPids.delete with array of pokemonIds', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]),
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
        pids: [1, 2],
        details: [],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], eto: [] } as unknown as import('@/db/schema').PokemonMetadata,
      2: { id: 2, n: 'Ivysaur', efrm: [1], eto: [] } as unknown as import('@/db/schema').PokemonMetadata,
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

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeUndefined();
});

test('coverage for localPids.delete with single pokemonId', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]),
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
        pids: [1],
        details: [],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], eto: [] } as unknown as import('@/db/schema').PokemonMetadata,
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

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeUndefined();
});

test('coverage for localPids.delete with some ids filtered out', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]),
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
        pids: [1, 2],
        details: [
          {
            method: 'WALK',
            methodId: 1,
            conditionId: 0,
            chance: 100,
            minLevel: 10,
            maxLevel: 10,
            games: [],
            pid: 1,
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

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  expect(suggestions.length).toBeGreaterThan(0);
});

test('coverage for suggestionEngine catch filtering with single pokemonId', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]),
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
        placeholder: true,
        aid: 1,
        locId: 1,
        pids: [1],
        details: [],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: { id: 1, n: 'Bulbasaur', efrm: [], eto: [] } as unknown as import('@/db/schema').PokemonMetadata,
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
        pokemonId: 1,
        priority: 120,
        encounterInfo: {
          1: undefined,
        },
      } as unknown as import('../strategies/types').CatchSuggestion,
    ],
  } as unknown as import('../strategies/types').AssistantStrategy;

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeUndefined();
});

test('coverage for suggestionEngine catch filtering when pokemonIds has undefined encounterInfo elements', async () => {
  const mockSaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([]),
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

  const { suggestions } = await generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategyWithCatch);

  const locSugg = suggestions.find((s) => s.category === 'Catch');
  expect(locSugg).toBeDefined();
  expect(locSugg?.pokemonIds).toEqual([1]);
});
