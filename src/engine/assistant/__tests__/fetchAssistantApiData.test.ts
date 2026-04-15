import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { dexDataLoader } from '../../../db/DexDataLoader';
import { pokeDB } from '../../../db/PokeDB';
import type { PokemonMetadata } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import { fetchAssistantApiData } from '../suggestionEngine';

describe('fetchAssistantApiData', () => {
  let _consoleErrorSpy: MockInstance;

  beforeEach(() => {
    _consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should handle evolution fetch failure gracefully', async () => {
    const mockSaveData = {
      generation: 1,
      currentMapId: 0,
      party: [1, 2], // Bulbasaur and Ivysaur
      trainerName: 'RED',
      inventory: [],
    } as unknown as SaveData;

    vi.spyOn(pokeDB, 'getAllEncounters').mockResolvedValue([]);
    vi.spyOn(pokeDB, 'getAllAreas').mockResolvedValue([]);
    vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([]);
    vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([
      { id: 1, n: 'bulbasaur', evolves_from: [], evolves_to: [], details: [] } as unknown as PokemonMetadata,
      { id: 2, n: 'ivysaur', evolves_from: [1], evolves_to: [], details: [] } as unknown as PokemonMetadata,
    ]);

    const result = await fetchAssistantApiData(mockSaveData, []);

    // It should have correctly populated pokemonMetadata
    expect(result.pokemonMetadata[2]).toBeDefined();
    expect(result.pokemonMetadata[1]).toBeDefined();
    expect(result.pokemonMetadata[2]?.n).toBe('ivysaur');
  });
});
