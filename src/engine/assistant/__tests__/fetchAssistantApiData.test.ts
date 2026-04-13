import { beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { dexDataLoader } from '../../../db/DexDataLoader';
import { pokeDB } from '../../../db/PokeDB';
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
    vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([
      { id: 1, sid: 1, n: 'bulbasaur', t: ['grass', 'poison'], s: [45, 49, 49, 65, 65, 45] },
      { id: 2, sid: 2, n: 'ivysaur', t: ['grass', 'poison'], s: [60, 62, 63, 80, 80, 60] },
    ]);
    vi.spyOn(dexDataLoader.species, 'loadMany').mockResolvedValue([
      { id: 1, cid: 101, n: 'bulbasaur', cr: 45, gr: 1, baby: false },
      { id: 2, cid: 102, n: 'ivysaur', cr: 45, gr: 1, baby: false },
    ]);
    vi.spyOn(dexDataLoader.chains, 'loadMany').mockResolvedValue([
      new Error('Database failure'),
      { id: 102, chain: { sid: 2, evolves_to: [], details: [] } },
    ]);

    const result = await fetchAssistantApiData(mockSaveData, []);

    // It should have continued and fetched chain2 for Ivysaur (at index 1 of party, which is id 2)
    expect(result.partyEvolutions[2]).toBeDefined();
    expect(result.partyEvolutions[1]).toBeNull();
  });
});
