import type { MockInstance } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { pokeapi } from '../../../utils/pokeapi';
import type { SaveData } from '../../saveParser/index';
import { fetchAssistantApiData } from '../suggestionEngine';

describe('fetchAssistantApiData', () => {
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle pokeapi evolution fetch failure gracefully in partyPromises', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [1, 2], // Bulbasaur and Ivysaur
    } as unknown as SaveData;

    vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      // Mock successful fetch for local area
      if (url.includes('location-area')) return { pokemon_encounters: [] };

      // Mock missing encounters
      if (url.includes('/pokemon/')) return [];

      // Mock species fetch
      if (url.includes('/pokemon-species/1')) {
        return { evolution_chain: { url: 'chain1' } };
      }
      if (url.includes('/pokemon-species/2')) {
        return { evolution_chain: { url: 'chain2' } };
      }

      // Mock chain fetch: throw for chain1, succeed for chain2
      if (url === 'chain1') {
        throw new Error('Network failure');
      }
      if (url === 'chain2') {
        return { id: 2, chain: { species: { url: '.../2/' }, evolves_to: [] } };
      }

      return {};
    });

    const result = await fetchAssistantApiData(mockSaveData, []);

    // It should have logged the error
    expect(consoleErrorSpy).toHaveBeenCalledWith('Evo fetch failed', 1, expect.any(Error));

    // It should have continued and fetched chain2
    expect(result.partyEvolutions[2]).toBeDefined();
    expect(result.partyEvolutions[1]).toBeUndefined();
  });
});
