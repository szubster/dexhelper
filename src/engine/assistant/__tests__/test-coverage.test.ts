import { expect, test } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

test('coverage for suggestionEngine new lines', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    // Mock owned up to 251 except the ones we want to suggest (targets must be missing)
    owned: new Set(
      [...Array(251).keys()].map((i) => i + 1).filter((i) => ![196, 197, 106, 107, 237, 136, 68].includes(i)),
    ),
    seen: new Set(),
    party: [],
    inventory: [{ id: 22, quantity: 1 }], // Fire Stone (Gen 2 is 22)
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
        det: [{ tr: 1, ml: 20, rel_s: 1 }],
        eto: [],
      }, // Hitmonlee
      107: {
        id: 107,
        n: 'Hitmonchan',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rel_s: -1 }],
        eto: [],
      }, // Hitmonchan
      237: {
        id: 237,
        n: 'Hitmontop',
        efrm: [236],
        det: [{ tr: 1, ml: 20, rel_s: 0 }],
        eto: [],
      }, // Hitmontop
      136: {
        id: 136,
        n: 'Flareon',
        efrm: [133],
        det: [{ tr: 3, item: [0x20, 22] }], // Fire Stone
        eto: [],
      }, // Flareon (Item)
      68: {
        id: 68,
        n: 'Machamp',
        efrm: [67, 66],
        det: [{ tr: 2 }], // Trade (EVO_TRIGGER.TRADE = 2)
        eto: [],
      }, // Machamp (Trade)
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
  expect(flareon?.description).toContain('Use your item');

  const machamp = suggestions.find((s) => s.pokemonId === 68);
  expect(machamp).toBeDefined();
  expect(machamp?.title).toContain('Trade Evolution');
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
        det: [{ tr: 3, item: [0x21, 23] }], // Jolteon, but no stone in inventory
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
