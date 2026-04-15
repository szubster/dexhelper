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

  it('should handle pokeapi missingEncounters fetch failure gracefully', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [],
    } as unknown as SaveData;

    vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };

      if (url.includes('/pokemon/1/encounters')) {
        throw new Error('Encounter network failure');
      }

      if (url.includes('/pokemon-species/1')) {
        return { evolution_chain: { url: 'chain1' } };
      }
      if (url === 'chain1') {
        return { id: 1, chain: { species: { url: '.../1/' }, evolves_to: [] } };
      }

      return {};
    });

    const result = await fetchAssistantApiData(mockSaveData, [1]);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Encounter fetch failed', 1, expect.any(Error));
    expect(result.missingEncounters[1]).toEqual([]);
    expect(result.missingChains[1]).toBeDefined(); // Chain should still load
  });

  it('should handle pokeapi missingChains fetch failure gracefully', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [],
    } as unknown as SaveData;

    vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };

      if (url.includes('/pokemon/1/encounters')) {
        return [{ location_area: { name: 'area', url: 'area' }, version_details: [] }];
      }

      if (url.includes('/pokemon-species/1')) {
        return { evolution_chain: { url: 'chain1' } };
      }
      if (url === 'chain1') {
        throw new Error('Chain network failure');
      }

      return {};
    });

    const result = await fetchAssistantApiData(mockSaveData, [1]);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Missing chain fetch failed', 1, expect.any(Error));
    expect(result.missingEncounters[1]).toBeDefined(); // Encounter should still load
    expect(result.missingEncounters[1].length).toBe(1);
    expect(result.missingChains[1]).toBeUndefined();
  });

  it('should handle pokeapi local area fetch failure gracefully', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 1,
      party: [],
    } as unknown as SaveData;

    vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) throw new Error('Local area network failure');
      return {};
    });

    const result = await fetchAssistantApiData(mockSaveData, []);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Local area fetch failed', expect.any(Error));
    expect(result.localEncounters).toEqual([]);
  });

  it('should handle pokeapi gift fetch failure gracefully', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [],
    } as unknown as SaveData;

    vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };
      if (url.includes('/pokemon-species/133')) { // Eevee
        return { evolution_chain: { url: 'chain133' } };
      }
      if (url === 'chain133') {
        throw new Error('Gift chain network failure');
      }
      return {};
    });

    const result = await fetchAssistantApiData(mockSaveData, []);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Gift fetch failed', 133, expect.any(Error));
    expect(result.giftChains[133]).toBeUndefined();
  });

  it('should deduplicate network requests using resourceCache', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [1, 2, 3], // Bulbasaur, Ivysaur, Venusaur all share the same chain
    } as unknown as SaveData;

    const resourceSpy = vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };
      if (url.includes('/pokemon-species/1')) return { evolution_chain: { url: 'chain_bulbasaur' } };
      if (url.includes('/pokemon-species/2')) return { evolution_chain: { url: 'chain_bulbasaur' } };
      if (url.includes('/pokemon-species/3')) return { evolution_chain: { url: 'chain_bulbasaur' } };
      if (url === 'chain_bulbasaur') return { id: 1, chain: { species: { url: '.../1/' }, evolves_to: [] } };
      return {};
    });

    await fetchAssistantApiData(mockSaveData, []);

    // It should have called the chain URL exactly once because it is cached
    const chainCalls = resourceSpy.mock.calls.filter(call => call[0] === 'chain_bulbasaur');
    expect(chainCalls.length).toBe(1);
  });

  it('should handle pokeapi ancestor fetch failure gracefully', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [],
    } as unknown as SaveData;

    vi.spyOn(pokeapi, 'resource').mockImplementation(async (url: string) => {
      if (url.includes('location-area')) return { pokemon_encounters: [] };

      // Target pokemon 2
      if (url.includes('/pokemon/2/encounters')) return [];
      if (url.includes('/pokemon-species/2')) return { evolution_chain: { url: 'chain2' } };

      if (url === 'chain2') {
        return {
          id: 1,
          chain: {
            species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
            evolves_to: [
              {
                species: { url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
                evolves_to: []
              }
            ]
          }
        };
      }

      if (url.includes('/pokemon/1/encounters')) {
         throw new Error('Ancestor encounter fetch failed');
      }

      return {};
    });

    const result = await fetchAssistantApiData(mockSaveData, [2]);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Ancestor fetch failed', 1, expect.any(Error));
    expect(result.ancestralEncounters[2][1]).toEqual([]);
  });
});