import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
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

  it('should generate "Breed" suggestions for Gen 2 based on daycare egg status', () => {
    const mockSaveData: SaveData = {
      generation: 2,
      gameVersion: 'crystal',
      owned: new Set([153, ...Array.from({ length: 251 }, (_, i) => i + 1).filter((i) => i !== 152)]), // Missing 152 (Chikorita), owns 153 (Bayleef)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 153, // Bayleef
          level: 20,
          isShiny: false,
          moves: [],
          storageLocation: 'Box 1',
        },
      ],
      trainerName: 'GOLD',
      daycare: [
        {
          speciesId: 153, // Bayleef in daycare
          level: 20,
          isShiny: false,
          moves: [],
          storageLocation: 'Daycare',
        },
      ],
      daycareHasEgg: true,
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        152: {
          // Chikorita
          id: 152,
          eto: [{ id: 153 }], // Evolves to 153
          efrm: [],
          det: [],
        } as unknown as PokemonMetadata,
        153: {
          // Bayleef
          id: 153,
          eto: [],
          efrm: [152],
          det: [],
        } as unknown as PokemonMetadata,
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    // Use a strategy with generation 2
    const mockStrategy = {
      ...gen1Strategy,
      generation: 2, // Must be 2 for Gen2 logic
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategy);

    const breedSuggestion = suggestions.find((s) => s.id === 'breed-152');
    expect(breedSuggestion).toBeDefined();
    expect(breedSuggestion?.title).toBe('Egg Ready: #152!');
    expect(breedSuggestion?.description).toBe('Pick up your Egg from the Daycare!');
    expect(breedSuggestion?.priority).toBe(95);

    // Test when no egg is ready
    mockSaveData.daycareHasEgg = false;
    const { suggestions: suggestionsWait } = generateSuggestions(
      mockSaveData,
      false,
      'crystal',
      mockApiData,
      mockStrategy,
    );
    const breedSuggestionWait = suggestionsWait.find((s) => s.id === 'breed-152');
    expect(breedSuggestionWait).toBeDefined();
    expect(breedSuggestionWait?.title).toBe('Breeding in Progress: #152');
    expect(breedSuggestionWait?.description).toBe('Wait for an Egg from the Daycare!');
    expect(breedSuggestionWait?.priority).toBe(85);

    // Test when pokemon not in daycare
    mockSaveData.daycare = [];
    const { suggestions: suggestionsNotInDaycare } = generateSuggestions(
      mockSaveData,
      false,
      'crystal',
      mockApiData,
      mockStrategy,
    );
    const breedSuggestionNotInDaycare = suggestionsNotInDaycare.find((s) => s.id === 'breed-152');
    expect(breedSuggestionNotInDaycare).toBeDefined();
    expect(breedSuggestionNotInDaycare?.title).toBe('Breed: #152');
    expect(breedSuggestionNotInDaycare?.description).toBe('Leave your #153 at the Daycare to get an Egg!');
    expect(breedSuggestionNotInDaycare?.priority).toBe(85);
  });
});
