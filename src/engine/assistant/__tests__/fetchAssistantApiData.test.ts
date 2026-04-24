import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dexDataLoader } from '../../../db/DexDataLoader';
import { pokeDB } from '../../../db/PokeDB';
import type { PokemonMetadata } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import { fetchAssistantApiData } from '../suggestionEngine';

describe('fetchAssistantApiData', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
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
    vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockImplementation(async (ids) => {
      const all: Record<number, unknown> = {
        1: { id: 1, n: 'bulbasaur', efrm: [], eto: [], det: [] },
        2: { id: 2, n: 'ivysaur', efrm: [1], eto: [], det: [] },
        4: { id: 4, n: 'charmander', efrm: [], eto: [], det: [] },
        5: { id: 5, n: 'charmeleon', efrm: [4], eto: [], det: [] },
      };
      const arrIds = Array.from(ids) as number[];
      return arrIds.map((id) => (all[id] as PokemonMetadata) || (new Error('not found') as unknown as PokemonMetadata));
    });

    // Added queryTargets to ensure we hit the encounter Map mapping
    const result = await fetchAssistantApiData(mockSaveData, [4, 5]);

    // It should have correctly populated pokemonMetadata
    expect(result.pokemonMetadata[2]).toBeDefined();
    expect(result.pokemonMetadata[1]).toBeDefined();
    expect(result.pokemonMetadata[2]?.n).toBe('ivysaur');
  });
});
