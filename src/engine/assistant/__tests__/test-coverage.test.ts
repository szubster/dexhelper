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
        id: 1,
        chain: {
          sid: 133,
          evolves_to: [
            {
              sid: 196,
              evolves_to: [],
              details: [{ tr: 1, min_h: 220, time: 1 }],
            },
          ],
          details: [],
        },
      }, // Espeon
      197: {
        id: 1,
        chain: {
          sid: 133,
          evolves_to: [
            {
              sid: 197,
              evolves_to: [],
              details: [{ tr: 1, min_h: 220, time: 2 }],
            },
          ],
          details: [],
        },
      }, // Umbreon
      106: {
        id: 2,
        chain: {
          sid: 236,
          evolves_to: [
            {
              sid: 106,
              evolves_to: [],
              details: [{ tr: 1, min_l: 20, rel_s: 1 }],
            },
          ],
          details: [],
        },
      }, // Hitmonlee
      107: {
        id: 2,
        chain: {
          sid: 236,
          evolves_to: [
            {
              sid: 107,
              evolves_to: [],
              details: [{ tr: 1, min_l: 20, rel_s: -1 }],
            },
          ],
          details: [],
        },
      }, // Hitmonchan
      237: {
        id: 2,
        chain: {
          sid: 236,
          evolves_to: [
            {
              sid: 237,
              evolves_to: [],
              details: [{ tr: 1, min_l: 20, rel_s: 0 }],
            },
          ],
          details: [],
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
