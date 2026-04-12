import { bench, describe } from 'vitest';
import { type AssistantApiData, generateSuggestions } from '../../src/engine/assistant/suggestionEngine';
import type { SaveData } from '../../src/engine/saveParser';

describe('suggestionEngine optimization', () => {
  // Mock data setup
  const mockSaveData = {
    generation: 1,
    gameVersion: 'red',
    currentMapId: 0,
    trainerName: 'Ash',
    badges: 0,
    party: [1, 2, 3],
    pc: [],
    owned: new Set([1, 2, 3]),
    partyDetails: [],
    pcDetails: [],
    inventory: [],
    hallOfFameCount: 0,
    currentBoxCount: 0,
    npcTradeFlags: 0,
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    missingEncounters: {},
    missingChains: {},
    ancestralEncounters: {},
    partyEvolutions: {},
    giftChains: {},
  };

  // Populate ancestralEncounters with enough mock data to show an optimization impact
  for (let i = 4; i <= 104; i++) {
    mockApiData.ancestralEncounters[i] = {
      [i - 1]: [
        {
          location_area: { name: 'route-1-area', url: '' },
          version_details: [
            {
              version: { name: 'red', url: '' },
              max_chance: 10,
              encounter_details: [
                {
                  chance: 10,
                  method: { name: 'walk', url: '' },
                  min_level: 2,
                  max_level: 5,
                  condition_values: [],
                },
              ],
            },
          ],
        },
      ],
      [i - 2]: [
        {
          location_area: { name: 'route-2-area', url: '' },
          version_details: [
            {
              version: { name: 'red', url: '' },
              max_chance: 10,
              encounter_details: [],
            },
          ],
        },
      ],
    };
  }

  bench('generateSuggestions', () => {
    generateSuggestions(mockSaveData, false, 'red', mockApiData);
  });
});
