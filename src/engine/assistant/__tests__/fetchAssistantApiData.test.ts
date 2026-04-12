import { afterEach, describe, expect, it, vi } from 'vitest';
import { pokeapi } from '../../../utils/pokeapi';
import type { SaveData } from '../../saveParser/index';
import { fetchAssistantApiData } from '../suggestionEngine';

vi.mock('../../../utils/pokeapi', () => ({
  pokeapi: {
    resource: vi.fn(),
  },
}));

describe('fetchAssistantApiData', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log an error and continue when local area fetch fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Make pokeapi.resource throw an error for the local area fetch
    vi.mocked(pokeapi.resource).mockRejectedValueOnce(new Error('Network error'));

    const mockSaveData: SaveData = {
      generation: 2,
      gameVersion: 'crystal',
      owned: new Set(),
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [],
      trainerName: 'PLAYER',
    } as unknown as SaveData;

    const queryTargets: number[] = [];

    const result = await fetchAssistantApiData(mockSaveData, queryTargets);

    // Verify console.error was called with expected arguments
    expect(consoleErrorSpy).toHaveBeenCalledWith('Local area fetch failed', expect.any(Error));

    // Verify it continues and localEncounters is empty
    expect(result.localEncounters).toEqual([]);

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
