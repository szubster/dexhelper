import { test, expect } from 'vitest';
import { generateSuggestions } from '../suggestionEngine';
import type { SaveData, PokemonInstance } from '../../saveParser/index';
import type { AssistantApiData } from '../suggestionEngine';

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
      { speciesId: 133, level: 20, otName: 'PLAYER' } as PokemonInstance,
      { speciesId: 236, level: 20, otName: 'PLAYER' } as PokemonInstance,
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
