import { afterEach, beforeEach, bench, describe, type MockInstance, vi } from 'vitest';
import { fetchAssistantApiData } from '../../src/engine/assistant/suggestionEngine';
import type { SaveData } from '../../src/engine/saveParser';
import { pokeapi } from '../../src/utils/pokeapi';

// Create a spy to count how many times `pokeapi.resource` is called
describe('fetchAssistantApiData', () => {
  let resourceSpy: MockInstance;

  beforeEach(() => {
    // We just return dummy data to make it run without network calls
    resourceSpy = vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };
      if (url.includes('encounters')) return [];
      if (url.includes('pokemon-species'))
        return { evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' } };
      if (url.includes('evolution-chain'))
        return { chain: { species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' }, evolves_to: [] } };
      return {};
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  bench('baseline mock', async () => {
    resourceSpy.mockClear();
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [25, 26, 133, 134, 135, 136], // lots of Eeveelutions and Pikachu
    } as unknown as SaveData;

    await fetchAssistantApiData(mockSaveData, [1, 2, 3, 4, 5, 6]);
    // console.log("Spy called:", resourceSpy.mock.calls.length);
  });
});
