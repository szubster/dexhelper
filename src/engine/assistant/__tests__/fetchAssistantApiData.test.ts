import { describe, expect, test, vi } from 'vitest';
import { pokeapi } from '../../../utils/pokeapi';
import type { SaveData } from '../../saveParser/index';
import { fetchAssistantApiData } from '../suggestionEngine';

describe('fetchAssistantApiData', () => {
  test('should deduplicate ancestor lookups for missing targets sharing the same evolution chain', async () => {
    // Setup pokeapi mock
    const resourceSpy = vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };
      if (url.includes('encounters')) return [];
      if (url.includes('pokemon-species/2'))
        return { evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' } };
      if (url.includes('pokemon-species/3'))
        return { evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' } };
      if (url.includes('evolution-chain')) {
        return {
          chain: {
            species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
            evolves_to: [
              {
                species: { url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
                evolves_to: [
                  {
                    species: { url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
                    evolves_to: [],
                  },
                ],
              },
            ],
          },
        };
      }
      return {};
    });

    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [],
    } as unknown as SaveData;

    // Both pid 2 (Ivysaur) and 3 (Venusaur) share the exact same chain
    const result = await fetchAssistantApiData(mockSaveData, [2, 3]);

    expect(result.missingChains[2]).toBeDefined();
    expect(result.missingChains[3]).toBeDefined();

    // Check that ancestral encounters correctly identified '1' (Bulbasaur) as ancestor
    expect(result.ancestralEncounters[2]).toBeDefined();
    expect(result.ancestralEncounters[2][1]).toBeDefined();

    expect(result.ancestralEncounters[3]).toBeDefined();
    expect(result.ancestralEncounters[3][1]).toBeDefined();
    expect(result.ancestralEncounters[3][2]).toBeDefined();

    resourceSpy.mockRestore();
  });
});
