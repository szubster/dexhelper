import { describe, expect, it, test } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

describe('generateSuggestions', () => {
  it('should generate "Catch Right Here" (catch-local) suggestions', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing many, e.g. 4 (Charmander), 16 (Pidgey)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [
        {
          slug: 'pallet-town-area',
          pid: 16, // Pidgey
          enc: [
            {
              aid: 1, // localAid matches
              v: 1, // Red version (POKE_VERSION_MAP['red'] == 1)
              d: [{ m: 1, c: 50, min: 2, max: 5 }],
            },
          ],
        },
      ],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: { 1: 'Pallet Town' },
      allLocations: [{ id: 1, n: 'Pallet Town', r: 'Kanto', a: [{ id: 1, n: 'Pallet Town Area' }] }],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

    const localSuggestion = suggestions.find((s) => s.id === 'catch-local');
    expect(localSuggestion).toBeDefined();
    expect(localSuggestion?.title).toBe('Catch Right Here');
    expect(localSuggestion?.pokemonIds).toContain(16);
    expect(localSuggestion?.priority).toBe(120);
  });

  it('should generate "Nearby" (catch-nearby) suggestions', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 19 (Rattata)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0, // Assume 0 means some map, getMapDistance will process it
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1, // Let's say current is 1
      localEncounters: [], // Not local
      missingEncounters: {
        19: {
          slug: 'route-1-area',
          pid: 19,
          enc: [
            {
              aid: 2, // nearby aid
              v: 1, // Red
              d: [{ m: 1, c: 50, min: 2, max: 5 }],
            },
          ],
        },
      },
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: { 1: 'Pallet Town', 2: 'Route 1' },
      allLocations: [
        { id: 1, n: 'Pallet Town', r: 'Kanto', a: [{ id: 1, n: 'Pallet Town Area' }] },
        { id: 2, n: 'Route 1', r: 'Kanto', a: [{ id: 2, n: 'Route 1 Area' }] },
      ],
    } as unknown as AssistantApiData;

    // We need to spy on strategy.getMapDistance to return a distance < 8
    const mockStrategy = {
      ...gen1Strategy,
      getMapDistance: (_startMapId: number, targetAid: number) => {
        if (targetAid === 2) return { distance: 1, name: 'Route 1' };
        return null;
      },
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, mockStrategy);

    const nearbySuggestion = suggestions.find((s) => s.id === 'catch-nearby-19');
    expect(nearbySuggestion).toBeDefined();
    expect(nearbySuggestion?.title).toBe('Nearby: #19');
    expect(nearbySuggestion?.pokemonId).toBe(19);
    // Best distance is 1. Math.max(10, 110 - 1 * 12) = 110 - 12 = 98
    expect(nearbySuggestion?.priority).toBe(98);
  });

  it('should generate "Gift" suggestions when event flag is not set and badges are sufficient', () => {
    const eventFlags = new Uint8Array(300);
    // Do not set 0x190 (Lapras gift flag)

    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 4, // Enough badges for Lapras
      eventFlags,
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

    const giftSuggestion = suggestions.find((s) => s.id === 'gift-131');
    expect(giftSuggestion).toBeDefined();
    expect(giftSuggestion?.title).toBe('Claim Gift: #131');
    expect(giftSuggestion?.category).toBe('Gift');
  });

  it('should not generate "Gift" suggestions when badges are insufficient', () => {
    const eventFlags = new Uint8Array(300);

    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 3, // Not enough for Lapras (requires 4)
      eventFlags,
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

    const giftSuggestion = suggestions.find((s) => s.id === 'gift-131');
    expect(giftSuggestion).toBeUndefined();
  });

  it('should not generate "Gift" suggestions when event flag is set', () => {
    const eventFlags = new Uint8Array(300);
    // Set 0x190 (Lapras gift flag)
    const byteIndex = 0x190 >> 3;
    const bitIndex = 0x190 & 7;
    // @ts-expect-error
    eventFlags[byteIndex] |= 1 << bitIndex;

    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 8, // Enough badges
      eventFlags,
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

    const giftSuggestion = suggestions.find((s) => s.id === 'gift-131');
    expect(giftSuggestion).toBeUndefined();
  });

  it('should not generate "Trade" suggestions when tradeIndex flag is set', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 122 (Mr. Mime), requires trade index 1
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      npcTradeFlags: 1 << 1, // Set tradeIndex 1
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

    const tradeSuggestion = suggestions.find((s) => s.id === 'npc-trade-122');
    expect(tradeSuggestion).toBeUndefined();
  });
});

test('generateSuggestions edge cases', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [
      { speciesId: 1, level: 20, otName: 'PLAYER' } as PokemonInstance,
      { speciesId: 1, level: 30, otName: 'PLAYER' } as PokemonInstance,
    ],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [
      {
        pid: 2,
        enc: [{ v: 14, aid: 0, d: [{ c: 1, m: 1, ml: 1, mh: 1 }] }],
      },
      {
        pid: 3,
        enc: [{ v: 14, aid: 0, d: [{ c: 1, m: 1, ml: 1, mh: 1 }] }],
      },
    ],
    missingEncounters: {
      4: {
        pid: 4,
        enc: [{ v: 99, aid: 0, d: [] }],
      },
    },
    ancestralEncounters: {},
    pokemonMetadata: {
      2: {
        id: 2,
        n: 'Ivysaur',
        efrm: [1],
        det: [{ tr: 1, ml: 25 }],
        eto: [],
      },
      3: {
        id: 3,
        n: 'Venusaur',
        efrm: [2],
        det: [{ tr: 1, ml: 36 }],
        eto: [],
      },
      26: {
        id: 26,
        n: 'Raichu',
        efrm: [25],
        det: [{ tr: 3, item: 0x20 }],
        eto: [],
      },
    },
    areaNames: {},
    allLocations: [],
    allAreas: [],
    localAid: 0,
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);
  expect(suggestions.find((s) => s.pokemonId === 4)).toBeUndefined();

  mockSaveData.gameVersion = 'yellow';
  mockSaveData.owned.add(25);
  mockSaveData.partyDetails = [
    { speciesId: 25, level: 20, otName: 'PLAYER' } as PokemonInstance,
    { speciesId: 25, level: 50, otName: 'PLAYER' } as PokemonInstance,
  ];
  mockSaveData.trainerName = 'PLAYER';

  const { suggestions: ySug } = generateSuggestions(mockSaveData, false, 'yellow', mockApiData, gen1Strategy);

  const raichuSug = ySug.find((s) => s.pokemonId === 26);
  expect(raichuSug).toBeDefined();
  expect(raichuSug?.title).toBe('Version Exclusive: #26');

  if (mockApiData.pokemonMetadata[26]) mockApiData.pokemonMetadata[26].det = [];
  mockSaveData.gameVersion = 'red';
  const { suggestions: emptyDetSug } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
  expect(emptyDetSug.find((s) => s.pokemonId === 26)).toBeUndefined();

  mockSaveData.generation = 1;
  mockSaveData.gameVersion = 'red';
  mockSaveData.owned = new Set([1]);
  mockApiData.pokemonMetadata[122] = {
    id: 122,
    n: 'Mr. Mime',
    efrm: [],
    det: [],
    eto: [],
    cr: 0,
    baby: false,
  };
  const { suggestions: npcTradeSug } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
  const npcTradeMime = npcTradeSug.find((s) => s.pokemonId === 122);
  expect(npcTradeMime?.id).toBe('npc-trade-122');

  mockSaveData.partyDetails = [
    { speciesId: 1, level: 30, otName: 'PLAYER' } as PokemonInstance,
    { speciesId: 1, level: 20, otName: 'PLAYER' } as PokemonInstance,
  ];
  generateSuggestions(mockSaveData, false, 'crystal', mockApiData, gen1Strategy);
});
