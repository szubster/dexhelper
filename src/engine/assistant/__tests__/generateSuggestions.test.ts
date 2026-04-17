import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

describe('generateSuggestions', () => {
  it('should generate "Catch Right Here" (catch-local) suggestions', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing many, e.g. 4 (Charmander), 16 (Pidgey)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [
        {
          slug: 'pallet-town-area',
          pid: 16, // Pidgey
          encounters: [
            {
              aid: 1, // localAid matches
              v: 1, // Red version (POKE_VERSION_MAP['red'] == 1)
              d: [{ m: 1, c: 50, min: 2, max: 5 }],
            },
          ],
        },
      ],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: { 1: 'Pallet Town' },
      allLocations: [{ id: 1, n: 'Pallet Town', r: 'Kanto', a: [{ id: 1, n: 'Pallet Town Area' }] }],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);

    const localSuggestion = suggestions.find((s) => s.id === 'catch-local');
    expect(localSuggestion).toBeDefined();
    expect(localSuggestion?.title).toBe('Catch Right Here');
    expect(localSuggestion?.pokemonIds).toContain(16);
    expect(localSuggestion?.priority).toBe(120);
  });

  it('should generate "Nearby" (catch-nearby) suggestions', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 19 (Rattata)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0, // Assume 0 means some map, getMapDistance will process it
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1, // Let's say current is 1
      localEncounters: [], // Not local
      missingEncounters: {
        19: {
          slug: 'route-1-area',
          pid: 19,
          encounters: [
            {
              aid: 2, // nearby aid
              v: 1, // Red
              d: [{ m: 1, c: 50, min: 2, max: 5 }],
            },
          ],
        },
      },
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: { 1: 'Pallet Town', 2: 'Route 1' },
      allLocations: [
        { id: 1, n: 'Pallet Town', r: 'Kanto', a: [{ id: 1, n: 'Pallet Town Area' }] },
        { id: 2, n: 'Route 1', r: 'Kanto', a: [{ id: 2, n: 'Route 1 Area' }] },
      ],
    } as unknown as AssistantApiData;

    // We need to spy on strategy.getMapDistance to return a distance < 8
    const mockStrategy = {
      ...gen1Strategy,
      getMapDistance: (_startMapId: number, targetAid: number) => {
        if (targetAid === 2) return { distance: 1, name: 'Route 1' };
        return null;
      },
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, mockStrategy);

    const nearbySuggestion = suggestions.find((s) => s.id === 'catch-nearby-19');
    expect(nearbySuggestion).toBeDefined();
    expect(nearbySuggestion?.title).toBe('Nearby: #19');
    expect(nearbySuggestion?.pokemonId).toBe(19);
    // Best distance is 1. Math.max(10, 110 - 1 * 12) = 110 - 12 = 98
    expect(nearbySuggestion?.priority).toBe(98);
  });
});
