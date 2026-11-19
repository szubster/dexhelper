import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../../saveParser/index';
import {
  PRIORITY_ROAMER,
  PRIORITY_WEATHER_ANOMALY,
  SPECIES_ENTEI,
  SPECIES_GROUDON,
  SPECIES_KYOGRE,
  SPECIES_LATIAS,
  SPECIES_RAIKOU,
} from '../../constants';
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

  it('should skip pokemon if they are static gifts and already owned (myOtIds) in Gen 1, 2, and 3', () => {
    // Eevee is #133 in Gen 1, Togepi is #175 in Gen 2, Beldum is #374 in Gen 3
    const testCases = [
      { gen: 1, pid: 133 },
      { gen: 2, pid: 175 },
      { gen: 3, pid: 374 },
    ];

    for (const tc of testCases) {
      const apiData = {
        localEncounters: [{ pid: tc.pid, enc: [{ aid: 1, v: 1, d: [{ c: 100, method: 1, min: 25, max: 25 }] }] }],
        localAid: 1,
        missingEncounters: {},
        allLocations: [],
      } as unknown as AssistantApiData;

      const myOtIds = new Set<number>([tc.pid]);
      const missingIds = new Set<number>([tc.pid]);
      const queryTargets = [tc.pid];
      const saveData = { generation: tc.gen, currentMapId: 1 } as SaveData;
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
    }
  });

  it('should add local encounter suggestion with fallback location name, unknown method, and filter nulls', () => {
    const apiData = {
      localEncounters: [
        {
          pid: 1,
          enc: [
            null, // null re
            {
              aid: 1,
              v: 1,
              d: [
                null, // null ed
                { c: 10, method: 999, min: 2, max: 5, t: 1 }, // unknown method 999 -> fallback 'walk'
              ],
            },
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
    const saveData = { generation: 1, currentMapId: 1 } as SaveData; // currentMapName is undefined
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
    expect(suggestions[0]?.description).toContain('your current location');
    expect(
      (
        suggestions[0] as unknown as {
          encounterInfo?: Record<number, import('../../strategies/types').EncounterDetail[]>;
        }
      )?.encounterInfo?.[1]?.[0]?.method,
    ).toBe('walk');
  });

  it('should ignore encounters not matching displayVersionId or localAid', () => {
    const apiData = {
      localEncounters: [
        {
          pid: 1,
          enc: [
            { aid: 2, v: 1, d: [{ c: 10, method: 1, min: 2, max: 5 }] }, // Wrong aid
            { aid: 1, v: 2, d: [{ c: 10, method: 1, min: 2, max: 5 }] }, // Wrong version
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

    expect(suggestions.length).toBeGreaterThan(0);
    expect(
      (
        suggestions[0] as unknown as {
          encounterInfo?: Record<number, import('../../strategies/types').EncounterDetail[]>;
        }
      )?.encounterInfo?.[2],
    ).toEqual([]);
  });

  it('should suggest nearby encounters grouped by area and distance including distance === 0', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {
        1: { enc: [{ aid: 2, v: 1, d: [{ c: 10, method: 1, min: 2, max: 5 }] }] },
        2: { enc: [{ aid: 2, v: 1, d: [{ c: 10, method: 1, min: 2, max: 5 }] }] },
        3: { enc: [{ aid: 3, v: 1, d: [{ c: 10, method: 999, min: 2, max: 5 }] }] },
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
        if (target === 2) return { distance: 0, name: 'Pallet Town' }; // dist === 0 branch
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

    expect(suggestions).toHaveLength(2);
    const sugg1 = suggestions.find((s) => s.id === 'catch-nearby-2-0');
    expect(sugg1).toBeDefined();
    expect(sugg1?.description).toContain('very close');
    expect(sugg1?.pokemonIds).toEqual([1, 2]);

    const sugg2 = suggestions.find((s) => s.id === 'catch-nearby-3-4');
    expect(sugg2).toBeDefined();
    expect(sugg2?.description).toContain('4 areas away');
  });

  it('should ignore nearby encounters that are too far (> 7 distance) or wrong version', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {
        1: { enc: [{ aid: 2, v: 1, d: [{ c: 10, method: 1, min: 2, max: 5 }] }] },
        2: { enc: [{ aid: 3, v: 2, d: [{ c: 10, method: 1, min: 2, max: 5 }] }] }, // wrong version
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

  it('should generate high-priority roaming suggestions for active Gen 2 and Gen 3 roamers', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([SPECIES_RAIKOU, SPECIES_LATIAS]);
    const queryTargets = [SPECIES_RAIKOU, SPECIES_LATIAS];
    const saveDataGen2 = {
      generation: 2,
      currentMapId: 1,
      roamingLegendaries: [
        { speciesId: SPECIES_RAIKOU, isActive: true, hp: 100 }, // Active Raikou
        { speciesId: SPECIES_ENTEI, isActive: true, hp: 0 }, // Defeated Entei
      ],
    } as unknown as SaveData;

    const suggestionsGen2: Suggestion[] = [];
    const localPidsGen2 = new Set<number>();

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveDataGen2,
      gen1Strategy,
      suggestionsGen2,
      localPidsGen2,
    );

    expect(suggestionsGen2).toHaveLength(1);
    expect(suggestionsGen2[0]?.id).toBe(`catch-roamer-${SPECIES_RAIKOU}`);
    expect(suggestionsGen2[0]?.priority).toBe(PRIORITY_ROAMER);
    expect(suggestionsGen2[0]?.description).toContain('Fast Balls');

    const saveDataGen3 = {
      generation: 3,
      currentMapId: 1,
      roamingLegendaries: [{ speciesId: SPECIES_LATIAS, isActive: true, hp: 80 }],
    } as unknown as SaveData;

    const suggestionsGen3: Suggestion[] = [];
    const localPidsGen3 = new Set<number>();

    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveDataGen3,
      gen1Strategy,
      suggestionsGen3,
      localPidsGen3,
    );

    expect(suggestionsGen3).toHaveLength(1);
    expect(suggestionsGen3[0]?.id).toBe(`catch-roamer-${SPECIES_LATIAS}`);
    expect(suggestionsGen3[0]?.priority).toBe(PRIORITY_ROAMER);
    expect(suggestionsGen3[0]?.description).toContain('Shadow Tag');
  });

  it('should generate high-priority suggestions for Emerald weather anomaly Marine Cave (Kyogre #382) and Terra Cave (Groudon #383)', () => {
    const apiData = {
      localEncounters: [],
      localAid: undefined,
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const myOtIds = new Set<number>();
    const missingIds = new Set<number>([SPECIES_KYOGRE, SPECIES_GROUDON]);
    const queryTargets = [SPECIES_KYOGRE, SPECIES_GROUDON];

    // Marine Cave active on Route 105 (locationId 0)
    const saveDataKyogre = {
      generation: 3,
      currentMapId: 1,
      gen3WeatherAnomaly: { isActive: true, locationId: 0 },
    } as unknown as SaveData;

    const suggestionsKyogre: Suggestion[] = [];
    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveDataKyogre,
      gen1Strategy,
      suggestionsKyogre,
      new Set(),
    );

    expect(suggestionsKyogre).toHaveLength(1);
    expect(suggestionsKyogre[0]).toMatchObject({
      id: `catch-weather-anomaly-${SPECIES_KYOGRE}`,
      category: 'Catch',
      pokemonId: SPECIES_KYOGRE,
      priority: PRIORITY_WEATHER_ANOMALY,
      title: `Weather Anomaly: Kyogre (#${SPECIES_KYOGRE})`,
    });
    expect(suggestionsKyogre[0]?.description).toContain('Route 105');

    // Terra Cave active on Route 118 (locationId 7)
    const saveDataGroudon = {
      generation: 3,
      currentMapId: 1,
      gen3WeatherAnomaly: { isActive: true, locationId: 7 },
    } as unknown as SaveData;

    const suggestionsGroudon: Suggestion[] = [];
    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveDataGroudon,
      gen1Strategy,
      suggestionsGroudon,
      new Set(),
    );

    expect(suggestionsGroudon).toHaveLength(1);
    expect(suggestionsGroudon[0]).toMatchObject({
      id: `catch-weather-anomaly-${SPECIES_GROUDON}`,
      category: 'Catch',
      pokemonId: SPECIES_GROUDON,
      priority: PRIORITY_WEATHER_ANOMALY,
      title: `Weather Anomaly: Groudon (#${SPECIES_GROUDON})`,
    });
    expect(suggestionsGroudon[0]?.description).toContain('Route 118');

    // Suppressed when already caught/defeated in gen3StaticEncounters
    const saveDataCaught = {
      generation: 3,
      currentMapId: 1,
      gen3WeatherAnomaly: { isActive: true, locationId: 0 },
      gen3StaticEncounters: { kyogre: true },
    } as unknown as SaveData;

    const suggestionsCaught: Suggestion[] = [];
    generateCatchSuggestions(
      apiData,
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveDataCaught,
      gen1Strategy,
      suggestionsCaught,
      new Set(),
    );

    expect(suggestionsCaught).toHaveLength(0);
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
                d: [
                  null, // null ed
                  { method: 999, c: 10, min: 5, max: 10, t: 1 }, // unknown method 999
                ],
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

  it('should skip pre-evolution suggestion if target itself is already suggested in nearby encounters (isFullyRedundant)', () => {
    const apiData = {
      localEncounters: [],
      localAid: null,
      missingEncounters: {
        5: { enc: [{ aid: 50, v: 1, d: [{ c: 10, method: 1, min: 5, max: 10 }] }] },
      },
      ancestralEncounters: {
        5: {
          4: {
            pid: 4,
            enc: [{ aid: 50, v: 1, d: [{ c: 10, method: 1, min: 5, max: 10 }] }],
          },
        },
      },
      allLocations: [],
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
      1,
      myOtIds,
      missingIds,
      queryTargets,
      saveData,
      mockStrategy,
      suggestions,
      localPids,
    );

    // Nearby suggestion should be pushed for target #5, but pre-evo suggestion for #4 should be skipped as redundant
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]?.id).toBe('catch-nearby-50-1');
  });
});
