import 'fake-indexeddb/auto';
import { expect, test, vi } from 'vitest';
import { dexDataLoader } from '@/db/DexDataLoader';
import { pokeDB } from '@/db/PokeDB';
import type { SaveData } from '../../saveParser/index';
import { fetchAssistantApiData } from '../suggestionEngine';

test('fetchAssistantApiData for gen3', async () => {
  const mockSaveData = {
    generation: 3,
    currentMapId: 0,
    party: [],
    trainerName: 'MAY',
    inventory: [],
  } as unknown as SaveData;
  vi.spyOn(pokeDB, 'getEncountersBulk').mockResolvedValue([]);
  vi.spyOn(pokeDB, 'getAllAreas').mockResolvedValue([]);
  vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([]);
  const spy = vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([]);
  const result = await fetchAssistantApiData(mockSaveData, []);
  expect(result).toBeDefined();
  // Test that the mock was called
  expect(spy).toHaveBeenCalled();
});

test('fetchAssistantApiData for gen2', async () => {
  const mockSaveData = {
    generation: 2,
    currentMapId: 0,
    party: [],
    trainerName: 'GOLD',
    inventory: [],
  } as unknown as SaveData;
  vi.spyOn(pokeDB, 'getEncountersBulk').mockResolvedValue([]);
  vi.spyOn(pokeDB, 'getAllAreas').mockResolvedValue([]);
  vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([]);
  const spy = vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([]);
  const result = await fetchAssistantApiData(mockSaveData, []);
  expect(result).toBeDefined();
  expect(spy).toHaveBeenCalled();
});
