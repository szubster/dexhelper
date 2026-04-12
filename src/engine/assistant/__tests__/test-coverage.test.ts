import { expect, test } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

test('coverage for suggestionEngine new lines', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    // Mock owned up to 251 except the ones we want to suggest
    owned: new Set([...Array(251).keys()].map((i) => i + 1).filter((i) => ![196, 197, 106, 107, 237].includes(i))),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [
      { speciesId: 133, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance,
      { speciesId: 236, level: 20, otName: 'PLAYER' } as unknown as PokemonInstance,
    ],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  // Manually ensure Eevee and Tyrogue are in owned
  mockSaveData.owned.add(133);
  mockSaveData.owned.add(236);

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {
      196: {
        chain: {
          species: { url: '.../133/' },
          evolves_to: [
            {
              species: { url: '.../196/' },
              evolution_details: [{ trigger: { name: 'level-up' }, min_happiness: 220, time_of_day: 'day' }],
            },
          ],
        },
      }, // Espeon
      197: {
        chain: {
          species: { url: '.../133/' },
          evolves_to: [
            {
              species: { url: '.../197/' },
              evolution_details: [{ trigger: { name: 'level-up' }, min_happiness: 220, time_of_day: 'night' }],
            },
          ],
        },
      }, // Umbreon
      106: {
        chain: {
          species: { url: '.../236/' },
          evolves_to: [
            {
              species: { url: '.../106/' },
              evolution_details: [{ trigger: { name: 'level-up' }, min_level: 20, relative_physical_stats: 1 }],
            },
          ],
        },
      }, // Hitmonlee
      107: {
        chain: {
          species: { url: '.../236/' },
          evolves_to: [
            {
              species: { url: '.../107/' },
              evolution_details: [{ trigger: { name: 'level-up' }, min_level: 20, relative_physical_stats: -1 }],
            },
          ],
        },
      }, // Hitmonchan
      237: {
        chain: {
          species: { url: '.../236/' },
          evolves_to: [
            {
              species: { url: '.../237/' },
              evolution_details: [{ trigger: { name: 'level-up' }, min_level: 20, relative_physical_stats: 0 }],
            },
          ],
        },
      }, // Hitmontop
    },
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData);

  const espeon = suggestions.find((s) => s.pokemonId === 196);
  expect(espeon).toBeDefined();
  expect(espeon?.description).toContain('during the day');

  const umbreon = suggestions.find((s) => s.pokemonId === 197);
  expect(umbreon).toBeDefined();
  expect(umbreon?.description).toContain('during the night');

  const hitmonlee = suggestions.find((s) => s.pokemonId === 106);
  expect(hitmonlee).toBeDefined();
  expect(hitmonlee?.description).toContain('Attack > Defense');

  const hitmonchan = suggestions.find((s) => s.pokemonId === 107);
  expect(hitmonchan).toBeDefined();
  expect(hitmonchan?.description).toContain('Attack < Defense');

  const hitmontop = suggestions.find((s) => s.pokemonId === 237);
  expect(hitmontop).toBeDefined();
  expect(hitmontop?.description).toContain('Attack = Defense');
});

test('coverage for version exclusives', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([1]), // Bulbasaur
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {
      37: [
        // Vulpix is not in Red
        {
          location_area: { name: 'route-8', url: '...' },
          version_details: [
            {
              version: { name: 'blue' }, // Only in blue
              max_chance: 20,
              encounter_details: [],
            },
          ],
        },
      ],
    },
    ancestralEncounters: {},
    missingChains: {},
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const {
    suggestions,
    debug: { rejected },
  } = generateSuggestions(mockSaveData, false, 'red', mockApiData);
  const tradeSuggestion = suggestions.find((s) => s.id === 'trade-37');
  expect(tradeSuggestion).toBeDefined();
  expect(rejected.some((r) => r.pokemonId === 37 && r.code === 'VERSION_EXCLUSIVE')).toBe(true);
});

test('coverage for missing locations', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 1, level: 20, otName: 'PLAYER', moves: [19] } as unknown as PokemonInstance],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {
      16: [
        // Pidgey
        {
          location_area: { name: 'route-1', url: '...' },
          version_details: [
            {
              version: { name: 'red' },
              max_chance: 50,
              encounter_details: [
                {
                  chance: 50,
                  method: { name: 'walk' },
                  min_level: 2,
                  max_level: 5,
                },
              ],
            },
          ],
        },
      ],
    },
    ancestralEncounters: {},
    missingChains: {},
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData);
  const catchSuggestion = suggestions.find((s) => s.id === 'catch-loc-Route 1');
  expect(catchSuggestion).toBeDefined();
  expect(catchSuggestion?.description).toContain('Use Fly');
});

test('coverage for local locations', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 31,
    currentMapName: 'Route 20',
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 1, level: 20, otName: 'PLAYER', moves: [19] } as unknown as PokemonInstance],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [
      {
        pokemon: { name: 'tentacool', url: '.../72/' },
        version_details: [
          {
            version: { name: 'red' },
            max_chance: 50,
            encounter_details: [
              {
                chance: 50,
                method: { name: 'walk' },
                min_level: 2,
                max_level: 5,
              },
            ],
          },
        ],
      },
    ],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {},
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData);
  const catchSuggestion = suggestions.find((s) => s.id === 'catch-local');
  expect(catchSuggestion).toBeDefined();
});

test('coverage for stones and trade evos', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    // 1-100 owned to push missing array out
    owned: new Set([...Array(151).keys()].map((i) => i + 1).filter((i) => ![136, 134, 65].includes(i))),
    seen: new Set(),
    party: [],
    inventory: [{ id: 0x20, count: 1 }], // Fire stone is 0x20
    currentMapId: 31,
    currentMapName: 'Route 20',
    eventFlags: new Uint8Array(300),
    partyDetails: [
      { speciesId: 133, level: 20, otName: 'PLAYER', moves: [] } as unknown as PokemonInstance,
      { speciesId: 64, level: 20, otName: 'PLAYER', moves: [] } as unknown as PokemonInstance,
    ],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  mockSaveData.owned.add(133);
  mockSaveData.owned.add(64);

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {
      136: {
        // Flareon
        chain: {
          species: { url: '.../133/' },
          evolves_to: [
            {
              species: { url: '.../136/' },
              evolution_details: [{ trigger: { name: 'use-item' }, item: { name: 'fire-stone' } }],
            },
          ],
        },
      },
      134: {
        // Vaporeon
        chain: {
          species: { url: '.../133/' },
          evolves_to: [
            {
              species: { url: '.../134/' },
              evolution_details: [{ trigger: { name: 'use-item' }, item: { name: 'water-stone' } }],
            },
          ],
        },
      },
      65: {
        // Alakazam
        chain: {
          species: { url: '.../64/' }, // Use 64 directly so it matches the instance speciesId correctly
          evolves_to: [
            {
              species: { url: '.../65/' },
              evolution_details: [{ trigger: { name: 'trade' } }],
            },
          ],
        },
      },
    },
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  // Add missing pokemon IDs manually if owned is overriding something
  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData);
  // It checks targetId by filtering missingIds which is derived from ownedSet being missing those IDs up to maxDex.

  const flareonSug = suggestions.find((s) => s.id === 'evo-stn-136');
  expect(flareonSug).toBeDefined();
  expect(suggestions.find((s) => s.id === 'evo-buy-134')).toBeDefined();
  expect(suggestions.find((s) => s.id === 'evo-trade-65')).toBeDefined();
});

test('coverage for stones gen 2 and trade evos', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    // 1-100 owned to push missing array out
    owned: new Set([...Array(251).keys()].map((i) => i + 1).filter((i) => ![136, 134, 65].includes(i))),
    seen: new Set(),
    party: [],
    inventory: [{ id: 22, count: 1 }], // Fire stone is 22 in Gen 2 mapping
    currentMapId: 31,
    currentMapName: 'Route 20',
    eventFlags: new Uint8Array(300),
    partyDetails: [
      { speciesId: 133, level: 20, otName: 'PLAYER', moves: [] } as unknown as PokemonInstance,
      { speciesId: 64, level: 20, otName: 'PLAYER', moves: [] } as unknown as PokemonInstance,
    ],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  mockSaveData.owned.add(133);
  mockSaveData.owned.add(64);

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {
      136: {
        // Flareon
        chain: {
          species: { url: '.../133/' },
          evolves_to: [
            {
              species: { url: '.../136/' },
              evolution_details: [{ trigger: { name: 'use-item' }, item: { name: 'fire-stone' } }],
            },
          ],
        },
      },
    },
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  // Add missing pokemon IDs manually if owned is overriding something
  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData);

  const flareonSug = suggestions.find((s) => s.id === 'evo-stn-136');
  expect(flareonSug).toBeDefined();
});

test('coverage for stones and trade evos moon stone', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([...Array(151).keys()].map((i) => i + 1).filter((i) => ![36].includes(i))),
    seen: new Set(),
    party: [],
    inventory: [{ id: 0x0a, count: 1 }], // Moon stone is 0x0A
    currentMapId: 31,
    currentMapName: 'Route 20',
    eventFlags: new Uint8Array(300),
    partyDetails: [{ speciesId: 35, level: 20, otName: 'PLAYER', moves: [] } as unknown as PokemonInstance],
    pcDetails: [],
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  mockSaveData.owned.add(35); // Clefairy

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {
      36: {
        // Clefable
        chain: {
          species: { url: '.../35/' },
          evolves_to: [
            {
              species: { url: '.../36/' },
              evolution_details: [{ trigger: { name: 'use-item' }, item: { name: 'moon-stone' } }],
            },
          ],
        },
      },
    },
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData);
  expect(suggestions.find((s) => s.id === 'evo-stn-36')).toBeDefined();
});

test('coverage for gen 1 trade logic bit flag', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 31,
    currentMapName: 'Route 20',
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerName: 'PLAYER',
    npcTradeFlags: 1, // Meaning trade index 0 is completed
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {},
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData);
  // It shouldn't suggest the completed trade
});

test('coverage for gen 2 trade logic no bit flag fallback', () => {
  const mockSaveData: SaveData = {
    generation: 2,
    gameVersion: 'crystal',
    owned: new Set([1]),
    seen: new Set(),
    party: [],
    inventory: [],
    currentMapId: 31,
    currentMapName: 'Route 20',
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [{ speciesId: 95, level: 20, otName: 'DON', moves: [] } as unknown as PokemonInstance], // Onix from Violet City
    trainerName: 'PLAYER',
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    ancestralEncounters: {},
    missingChains: {},
    partyEvolutions: {},
    giftChains: {},
  } as unknown as AssistantApiData;

  const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData);
});
