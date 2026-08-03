import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../../saveParser/index';
import { gen1Strategy } from '../../strategies/gen1Strategy';
import type { AssistantStrategy, Suggestion } from '../../strategies/types';
import type { AssistantApiData } from '../../suggestionEngineTypes';
import { generateCatchSuggestions } from '../catchGenerator';

describe('catchGenerator', () => {
  it('should skip processing if apiData.localEncounters is empty or localAid is missing', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([1]);
    const queryTargets = [1];
    const saveData = { generation: 1, currentMapId: 1 } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    const mockStrategy = {
      ...gen1Strategy,
      getMapDistance: (_curr: number, target: number) => {
        if (target === 50) return { distance: 1, name: 'Route 1' };
        return null;
      },
    } as unknown as AssistantStrategy;

    generateCatchSuggestions(
      apiData,
      1, // displayVersionId
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      mockStrategy,
      suggestions,
      localPids,
    );

    expect(suggestions).toHaveLength(0);
    expect(localPids.size).toBe(0);
  });

  it('should skip pokemon if they are static gifts and already owned (myOtIds)', () => {
    const apiData = {
      localEncounters: [
        { pid: 133, enc: [{ aid: 1, v: 1, d: [{ c: 100, m: 1, min: 25, max: 25 }] }] }, // Eevee (static gift Gen 1)
      ],
      localAid: 1,
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>([133]);
    const missingIds = new Set<number>([133]);
    const queryTargets = [133];
    const saveData = { generation: 1, currentMapId: 1 } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      gen1Strategy,
      suggestions,
      localPids,
    );

    expect(suggestions).toHaveLength(0);
  });

  it('should add local encounter suggestion with details and time', () => {
    const apiData = {
      localEncounters: [{ pid: 1, enc: [{ aid: 1, v: 1, d: [{ c: 10, m: 1, min: 2, max: 5, t: 1 }] }] }],
      localAid: 1,
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([1]);
    const queryTargets = [1];
    const saveData = { generation: 1, currentMapId: 1, currentMapName: 'Pallet Town' } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      gen1Strategy,
      suggestions,
      localPids,
    );

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.category).toBe('Catch');
    expect(suggestions[0]?.pokemonIds).toEqual([1]);
    expect(
      (
        suggestions[0] as unknown as {
          encounterInfo?: Record<number, import('../../strategies/types').EncounterDetail[]>;
        }
      )?.encounterInfo?.[1]?.[0]?.time,
    ).toBe(1);
  });

  it('should ignore encounters not matching displayVersionId or localAid', () => {
    const apiData = {
      localEncounters: [
        {
          pid: 1,
          enc: [
            { aid: 2, v: 1, d: [{ c: 10, m: 1, min: 2, max: 5 }] }, // Wrong aid
            { aid: 1, v: 2, d: [{ c: 10, m: 1, min: 2, max: 5 }] }, // Wrong version
          ],
        },
      ],
      localAid: 1,
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([1]);
    const queryTargets = [1];
    const saveData = { generation: 1, currentMapId: 1 } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      gen1Strategy,
      suggestions,
      localPids,
    );

    expect(suggestions).toHaveLength(0);
  });

  it('should ignore missing encounters with missing details or no enc data', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {
        1: { enc: null } as unknown,
        2: { enc: [{ aid: 2, v: 1, d: [undefined] }] } as unknown, // Missing detail object
      },
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([1, 2]);
    const queryTargets = [1, 2];
    const saveData = { generation: 1, currentMapId: 1 } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    const mockStrategy = {
      ...gen1Strategy,
      getMapDistance: () => ({ distance: 2, name: 'Route 1' }),
    } as unknown as AssistantStrategy;

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      mockStrategy,
      suggestions,
      localPids,
    );

    // Pid 1 has no enc data. Pid 2 has enc data, but its detail object is undefined.
    // So both will either not trigger nearby suggestion, or will trigger it with empty bestDetails.
    // Since bestE is set for pid 2, it WILL add pid 2 to group but with empty details.

    expect(suggestions.length).toBeGreaterThan(0);
    expect(
      (
        suggestions[0] as unknown as {
          encounterInfo?: Record<number, import('../../strategies/types').EncounterDetail[]>;
        }
      )?.encounterInfo?.[2],
    ).toEqual([]);
  });

  it('should suggest nearby encounters grouped by area and distance', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {
        1: { enc: [{ aid: 2, v: 1, d: [{ c: 10, m: 1, min: 2, max: 5 }] }] },
        2: { enc: [{ aid: 2, v: 1, d: [{ c: 10, m: 1, min: 2, max: 5 }] }] },
        3: { enc: [{ aid: 3, v: 1, d: [{ c: 10, m: 1, min: 2, max: 5 }] }] },
      },
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([1, 2, 3]);
    const queryTargets = [1, 2, 3];
    const saveData = { generation: 1, currentMapId: 1 } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    const mockStrategy = {
      ...gen1Strategy,
      getMapDistance: (_curr: number, target: number) => {
        if (target === 2) return { distance: 2, name: 'Route 1' };
        if (target === 3) return { distance: 4, name: 'Route 2' };
        return null;
      },
    } as unknown as AssistantStrategy;

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      mockStrategy,
      suggestions,
      localPids,
    );

    expect(suggestions).toHaveLength(2); // One for Route 1 (pids 1,2), one for Route 2 (pid 3)
    const sugg1 = suggestions.find((s) => s.id === 'catch-nearby-2-2');
    expect(sugg1).toBeDefined();
    expect(sugg1?.pokemonIds).toEqual([1, 2]);

    const sugg2 = suggestions.find((s) => s.id === 'catch-nearby-3-4');
    expect(sugg2).toBeDefined();
    expect(sugg2?.pokemonIds).toEqual([3]);
  });

  it('should ignore nearby encounters that are too far (> 7 distance) or wrong version', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {
        1: { enc: [{ aid: 2, v: 1, d: [{ c: 10, m: 1, min: 2, max: 5 }] }] },
        2: { enc: [{ aid: 3, v: 2, d: [{ c: 10, m: 1, min: 2, max: 5 }] }] }, // wrong version
      },
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([1, 2]);
    const queryTargets = [1, 2];
    const saveData = { generation: 1, currentMapId: 1 } as SaveData;
    const suggestions: Suggestion[] = [];
    const localPids = new Set<number>();

    const mockStrategy = {
      ...gen1Strategy,
      getMapDistance: (_curr: number, target: number) => {
        if (target === 2) return { distance: 8, name: 'Far Away' };
        return null;
      },
    } as unknown as AssistantStrategy;

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      mockStrategy,
      suggestions,
      localPids,
    );

    expect(suggestions).toHaveLength(0);
  });
});
it('should suggest catching a pre-evolution if target is missing and pre-evolution is nearby', () => {
  const apiData = {
    localEncounters: [],
    localAid: null,
    missingEncounters: {},
    pokemonMetadata: {
      5: { id: 5, n: 'Charmeleon', eto: [{ id: 6 }], efrm: [4] },
    },
    ancestralEncounters: {
      5: {
        4: {
          pid: 4,
          enc: [
            {
              aid: 50,
              v: 1,
              d: [{ m: 1, c: 10, min: 5, max: 10, t: 1 }],
            },
          ],
        },
      },
    },
    allLocations: [
      { id: 1, n: 'Pallet Town', connects: [{ id: 50 }] },
      { id: 50, n: 'Route 1' },
    ],
  } as unknown as AssistantApiData;

  const myOtIds = new Set<number>();
  const missingIds = new Set<number>([5]);
  const queryTargets = [5];
  const saveData = { generation: 1, currentMapId: 1 } as SaveData;
  const suggestions: Suggestion[] = [];
  const localPids = new Set<number>();

  const mockStrategy = {
    ...gen1Strategy,
    getMapDistance: (_curr: number, target: number) => {
      if (target === 50) return { distance: 1, name: 'Route 1' };
      return null;
    },
  } as unknown as AssistantStrategy;

  generateCatchSuggestions(
    apiData,
    1, // displayVersionId
    myOtIds,
    missingIds,
    queryTargets,
    saveData,
    mockStrategy,
    suggestions,
    localPids,
  );

  expect(suggestions).toHaveLength(1);
  expect(suggestions[0]).toMatchObject({
    id: 'catch-preevo-nearby-50-1',
    category: 'Catch',
    pokemonIds: [4],
    title: 'Nearby Pre-evolution: Route 1',
  });
});
