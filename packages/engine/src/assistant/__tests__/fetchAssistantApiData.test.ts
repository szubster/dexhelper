import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dexDataLoader } from '@/db/DexDataLoader';
import { pokeDB } from '@/db/PokeDB';
import type { LocationAreaEncounters, PokemonMetadata } from '@/db/schema';
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

    vi.spyOn(pokeDB, 'getEncountersBulk').mockResolvedValue([]);
    vi.spyOn(pokeDB, 'getAllAreas').mockResolvedValue([]);
    vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([
      { id: 1, n: 'Test Area 1', pids: [] },
      { id: 2, n: 'Test Area 2', pids: [] },
    ]);
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

it('should fetch local encounters using bulk and correctly map encounters', async () => {
  const mockSaveData = {
    generation: 1,
    currentMapId: 1,
    party: [],
    trainerName: 'RED',
    inventory: [],
  } as unknown as SaveData;

  vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([
    { id: 1, n: 'Test Area 1', pids: [99, 100] },
    { id: 2, n: 'Test Area 2', pids: [] },
  ]);

  vi.spyOn(pokeDB, 'getEncountersBulk').mockImplementation(async (ids) => {
    const db: Record<number, unknown> = {
      99: { pid: 99, enc: [{ aid: 1, v: 1, d: [] }] },
      100: { pid: 100, enc: [{ aid: 1, v: 1, d: [] }] },
      101: { pid: 101, enc: [{ aid: 2, v: 1, d: [] }] }, // Missing target
      102: new Error('not found'), // Edge case
    };
    return ids.map((id) => db[id] || new Error('not found')) as (LocationAreaEncounters | Error)[];
  });

  vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([]);

  const result = await fetchAssistantApiData(mockSaveData, [101, 102]);

  expect(result.localAid).toBe(1);
  expect(result.localEncounters).toBeDefined();
  expect(result.localEncounters?.length).toBe(2);
  expect(result.localEncounters?.[0]?.pid).toBe(99);

  expect(result.missingEncounters[101]).toBeDefined();
  expect(result.missingEncounters[102]).toBeUndefined();
});

it('should fallback local encounters gracefully if pid is missing or target lacks enc', async () => {
  const mockSaveData = {
    generation: 1,
    currentMapId: 1,
    party: [],
    trainerName: 'RED',
    inventory: [],
  } as unknown as SaveData;

  vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([
    { id: 1, n: 'Test Area 1', pids: [undefined as unknown as number, 999] },
  ]);

  vi.spyOn(pokeDB, 'getEncountersBulk').mockImplementation(async (ids) => {
    return ids.map(() => new Error('not found'));
  });

  vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([]);

  const result = await fetchAssistantApiData(mockSaveData, [undefined as unknown as number, 999]);

  expect(result.localAid).toBe(1);
  expect(result.localEncounters).toEqual([]);
});

it('should skip encounters mapping if no targetEncounters is returned', async () => {
  const mockSaveData = {
    generation: 1,
    currentMapId: 1,
    party: [],
    trainerName: 'RED',
    inventory: [],
  } as unknown as SaveData;

  vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([{ id: 1, n: 'Test Area 1', pids: [] }]);

  vi.spyOn(pokeDB, 'getEncountersBulk').mockResolvedValue([]);

  vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([]);

  const result = await fetchAssistantApiData(mockSaveData, [101]);

  expect(result.localAid).toBe(1);
  expect(result.localEncounters).toEqual([]);
  expect(result.missingEncounters[101]).toBeUndefined();
});

it('should ignore encounters not matching localAid', async () => {
  const mockSaveData = {
    generation: 1,
    currentMapId: 1,
    party: [],
    trainerName: 'RED',
    inventory: [],
  } as unknown as SaveData;

  vi.spyOn(pokeDB, 'getLocations').mockResolvedValue([{ id: 1, n: 'Test Area 1', pids: [99] }]);

  vi.spyOn(pokeDB, 'getEncountersBulk').mockImplementation(async (ids) => {
    const db: Record<number, unknown> = {
      99: { pid: 99, enc: [{ aid: 2, v: 1, d: [] }] }, // aid mismatch
    };
    return ids.map((id) => db[id] || new Error('not found')) as (LocationAreaEncounters | Error)[];
  });

  vi.spyOn(dexDataLoader.pokemon, 'loadMany').mockResolvedValue([]);

  const result = await fetchAssistantApiData(mockSaveData, []);

  expect(result.localAid).toBe(1);
  expect(result.localEncounters).toEqual([]);
});
