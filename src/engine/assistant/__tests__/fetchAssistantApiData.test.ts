import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { dexDataLoader } from '../../../db/DexDataLoader';
import { pokeDB } from '../../../db/PokeDB';
import type { CompactEvolutionChain, PokemonMetadata } from '../../../db/schema';
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
    vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([
      { id: 1, sid: 1, cid: 101, n: 'bulbasaur' } as unknown as PokemonMetadata,
      { id: 2, sid: 2, cid: 102, n: 'ivysaur' } as unknown as PokemonMetadata,
    ]);
    // Species loader is no longer used in fetchAssistantApiData
    vi.spyOn(dexDataLoader.chains, 'loadMany').mockResolvedValue([
      new Error('Database failure'),
      { id: 102, chain: { sid: 2, evolves_to: [] } } as unknown as CompactEvolutionChain,
    ]);

    const result = await fetchAssistantApiData(mockSaveData, []);

    // It should have continued and fetched chain2 for Ivysaur (at index 1 of party, which is id 2)
    expect(result.partyEvolutions[2]).toBeDefined();
    expect(result.partyEvolutions[1]).toBeNull();
  });
});
