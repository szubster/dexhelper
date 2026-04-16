import { describe, expect, it } from 'vitest';
import { gen1Strategy } from '../engine/assistant/strategies/gen1Strategy';
import type { AssistantApiData } from '../engine/assistant/suggestionEngine';
import { generateSuggestions } from '../engine/assistant/suggestionEngine';
import type { SaveData } from '../engine/saveParser/index';

describe('useAssistant - generateSuggestions logic', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'yellow',
    trainerName: 'YELLOW',
    trainerId: 12345,
    badges: 0,
    owned: new Set([25]), // Only Pikachu
    seen: new Set([25]),
    party: [25],
    pc: [],
    inventory: [],
    currentMapId: 0,
    currentBoxCount: 1,
    hallOfFameCount: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [
      {
        speciesId: 25,
        level: 5,
        otName: 'YELLOW',
        moves: [],
        isShiny: false,
        dvs: { hp: 10, atk: 10, def: 10, spd: 10, spc: 10 },
        storageLocation: 'Party',
      },
    ],
    pcDetails: [],
    trainerIdRaw: new Uint8Array(2),
  } as unknown as SaveData;

  const mockApiData: Partial<AssistantApiData> = {
    localEncounters: [],
    missingEncounters: {
      39: null, // Jigglypuff
      40: null, // Wigglytuff
      62: null, // Poliwrath
    },
    areaNames: {},
    ancestralEncounters: {
      40: {
        39: { pid: 39, enc: [{ aid: 100, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }] }, // Jigglypuff in Yellow
      },
      62: {
        60: { pid: 60, enc: [{ aid: 101, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }] }, // Poliwag catchable
        61: null, // Poliwhirl not directly catchable
      },
    },
    pokemonMetadata: {
      39: { id: 39, n: 'Jigglypuff', cr: 170, gr: 6, baby: false, efrm: [], det: [], eto: [] } as any,
      40: {
        id: 40,
        n: 'Wigglytuff',
        cr: 50,
        gr: 6,
        baby: false,
        efrm: [39],
        det: [{ tr: 3, item: 81 }],
        eto: [],
      } as any,
      62: {
        id: 62,
        n: 'Poliwrath',
        cr: 45,
        gr: 4,
        baby: false,
        efrm: [61, 60],
        det: [{ tr: 3, item: 84 }],
        eto: [],
      } as any,
    },
    allLocations: [],
  };

  it('should NOT mark Wigglytuff as Trade Required in Pokémon Yellow (ancestor logic)', () => {
    const { suggestions } = generateSuggestions(mockSaveData, false, 'yellow', mockApiData as any, gen1Strategy);
    const wigglyTrade = suggestions.find((s) => s.pokemonId === 40 && s.category === 'Trade');
    expect(wigglyTrade).toBeUndefined();
  });

  it('should NOT mark Poliwrath as Trade Required in Pokémon Yellow if Poliwag is catchable', () => {
    const { suggestions } = generateSuggestions(mockSaveData, false, 'yellow', mockApiData as any, gen1Strategy);
    const poliTrade = suggestions.find((s) => s.pokemonId === 62 && s.category === 'Trade');
    expect(poliTrade).toBeUndefined();
  });

  it('should mark Version Exclusives as Trade Required', () => {
    const exclusiveApiData = {
      ...mockApiData,
      missingEncounters: {
        13: null,
      },
      ancestralEncounters: {
        13: {}, // No ancestors catchable either
      },
      pokemonMetadata: {
        ...mockApiData.pokemonMetadata,
        13: { id: 13, n: 'Weedle', cr: 255, gr: 4, baby: false, efrm: [], det: [], eto: [] } as any,
      },
    };

    const { suggestions } = generateSuggestions(
      mockSaveData,
      false,
      'yellow',
      exclusiveApiData as unknown as AssistantApiData,
      gen1Strategy,
    );
    const weedleTrade = suggestions.find((s) => s.pokemonId === 13 && s.category === 'Trade');
    expect(weedleTrade).toBeDefined();
    expect(weedleTrade?.title).toContain('Version Exclusive');
  });

  it('should NOT duplicate "Catch Right Here" when found in both local and nearby logic', () => {
    const duplicateApiData = {
      ...mockApiData,
      localEncounters: [
        {
          pid: 16,
          enc: [{ aid: 1, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }],
        },
      ],
      localAid: 1,
      missingEncounters: {
        16: {
          pid: 16,
          enc: [{ aid: 1, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }],
        },
      },
    };

    // Current map matches localAid slug
    const testSaveData = { ...mockSaveData, currentMapId: 0x0c, owned: new Set([25]) } as unknown as SaveData;
    const { suggestions } = generateSuggestions(
      testSaveData,
      false,
      'yellow',
      duplicateApiData as unknown as AssistantApiData,
      gen1Strategy,
    );

    const catchRightHereTips = suggestions.filter((s) => s.title === 'Catch Right Here');
    expect(catchRightHereTips.length).toBe(1);
    expect(catchRightHereTips[0]?.id).toBe('catch-local');
  });
});
