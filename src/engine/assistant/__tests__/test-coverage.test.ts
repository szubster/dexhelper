import { expect, test } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';


test('coverage for suggestionEngine new lines', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'red',
    currentMapId: 0,
    // Mock owned up to 251 except the ones we want to suggest (targets must be missing)
    owned: new Set(
      [...Array(251).keys()].map((i) => i + 1).filter((i) => ![196, 197, 106, 107, 237, 136, 68].includes(i)),
    ),
    seen: new Set(),
    party: [],
    inventory: [{ id: 82, count: 1 }], // Fire Stone
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [
      { speciesId: 133, level: 20, otName: 'PLAYER' } as PokemonInstance,
      { speciesId: 236, level: 20, otName: 'PLAYER' } as PokemonInstance,
      { speciesId: 67, level: 30, otName: 'PLAYER' } as PokemonInstance,
    ],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  // Manually ensure Eevee, Tyrogue, and Machoke are in owned
  mockSaveData.owned.add(133);
  mockSaveData.owned.add(236);
  mockSaveData.owned.add(67);

  const mockApiData: AssistantApiData = {
    localAid: null,
    localEncounters: [],
    missingEncounters: {
      133: {
        id: 133,
        pid: 133,
        encounters: [
          { aid: 5, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, l: [] }] }
        ]
      },
      133: {
        id: 133,
        pid: 133,
        encounters: [
          { aid: 5, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, l: [] }] }
        ]
      },
      1: {
        id: 1,
        pid: 1,
        encounters: [
          { aid: 5, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, l: [] }] },
          { aid: 5, v: 1, d: [{ c: 20, m: 1, min: 2, max: 4, l: [] }] },
          { aid: 6, v: 1, d: [{ c: 5, m: 1, min: 2, max: 4, l: [] }] }
        ]
      },
      2: {
        id: 2,
        pid: 2,
        encounters: [
          { aid: 5, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, l: [] }] },
          { aid: 5, v: 1, d: [{ c: 20, m: 1, min: 2, max: 4, l: [] }] },
          { aid: 6, v: 1, d: [{ c: 5, m: 1, min: 2, max: 4, l: [] }] }
        ]
      }
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: {
        id: 1,
        n: 'Bulbasaur',
        evolves_from: [],
        details: [],
        evolves_to: [],
      },
      196: {
        id: 196,
        n: 'Espeon',
        evolves_from: [133],
        details: [{ tr: 1, min_h: 220, time: 1 }],
        evolves_to: [],
      }, // Espeon
      197: {
        id: 197,
        n: 'Umbreon',
        evolves_from: [133],
        details: [{ tr: 1, min_h: 220, time: 2 }],
        evolves_to: [],
      }, // Umbreon
      106: {
        id: 106,
        n: 'Hitmonlee',
        evolves_from: [236],
        details: [{ tr: 1, min_l: 20, rel_s: 1 }],
        evolves_to: [],
      }, // Hitmonlee
      107: {
        id: 107,
        n: 'Hitmonchan',
        evolves_from: [236],
        details: [{ tr: 1, min_l: 20, rel_s: -1 }],
        evolves_to: [],
      }, // Hitmonchan
      237: {
        id: 237,
        n: 'Hitmontop',
        evolves_from: [236],
        details: [{ tr: 1, min_l: 20, rel_s: 0 }],
        evolves_to: [],
      }, // Hitmontop
      136: {
        id: 136,
        n: 'Flareon',
        evolves_from: [133],
        details: [{ tr: 3, item: 82 }], // Fire Stone
        evolves_to: [],
      }, // Flareon (Item)
      68: {
        id: 68,
        n: 'Machamp',
        evolves_from: [67, 66],
        details: [{ tr: 2 }], // Trade (EVO_TRIGGER.TRADE = 2)
        evolves_to: [],
      }, // Machamp (Trade)
    },
    areaNames: {},
    allLocations: [
      { id: 0, n: 'Start', pids: [], dist: { 5: 2, 6: 5 }, parentId: undefined },
      { id: 5, n: 'Route 1', pids: [], dist: { 0: 2, 5: 0 }, parentId: undefined },
      { id: 6, n: 'Route 2', pids: [], dist: { 0: 5, 6: 0 }, parentId: undefined }
    ],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

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
  expect(flareon?.description).toContain('Use your item');

  const machamp = suggestions.find((s) => s.pokemonId === 68);
  expect(machamp).toBeDefined();
  expect(machamp?.title).toContain('Trade Evolution');

  // expect nearbyCatch removed for main lines
});

test('coverage for suggestionEngine catch coverage', () => {
  const mockSaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([4, 5, 6]), // Has Charmander
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
    localAid: null,
    localEncounters: [],
    missingEncounters: {
      1: {
        id: 1,
        pid: 1,
        encounters: [
          { aid: 5, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, l: [] }] },
          { aid: 6, v: 1, d: [{ c: 5, m: 1, min: 2, max: 4, l: [] }] }
        ]
      },
      2: {
        id: 2,
        pid: 2,
        encounters: [
          { aid: 5, v: 1, d: [{ c: 10, m: 1, min: 2, max: 4, l: [] }] },
          { aid: 6, v: 1, d: [{ c: 5, m: 1, min: 2, max: 4, l: [] }] }
        ]
      }
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      1: {
        id: 1,
        n: 'Bulbasaur',
        evolves_from: [],
        details: [],
        evolves_to: [],
      },
      2: {
        id: 2,
        n: 'Ivysaur',
        evolves_from: [1],
        details: [],
        evolves_to: [],
      }
    },
    areaNames: {},
    allLocations: [
      { id: 0, n: 'Start', pids: [], dist: { 5: 2, 6: 5 }, parentId: undefined },
      { id: 5, n: 'Route 1', pids: [], dist: { 0: 2, 5: 0 }, parentId: undefined },
      { id: 6, n: 'Route 2', pids: [], dist: { 0: 5, 6: 0 }, parentId: undefined }
    ],
    allAreas: [],
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
  const nearbyCatch1 = suggestions.find((s) => s.pokemonId === 1);
  expect(nearbyCatch1).toBeDefined();

  const nearbyCatch2 = suggestions.find((s) => s.pokemonId === 2);
  expect(nearbyCatch2).toBeDefined();
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
        evolves_from: [133],
        details: [{ tr: 3, item: 83 }], // Jolteon, but no stone in inventory
        evolves_to: [],
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
