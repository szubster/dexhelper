import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

describe('suggestionEngine - checkFlag Edge Cases', () => {
  it('should ignore gift suggestion when eventFlags is undefined', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 4, // Enough badges for Lapras
      eventFlags: undefined,
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
    const giftSuggestion = suggestions.find((s) => s.id === 'gift-131');
    expect(giftSuggestion).toBeDefined();
  });

  it('should ignore gift suggestion when byteIndex is out of bounds', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 4, // Enough badges for Lapras
      eventFlags: new Uint8Array(10), // Too small!
      partyDetails: [],
      pcDetails: [],
      trainerName: 'ASH',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const { suggestions } = generateSuggestions(mockSaveData, false, 'red', mockApiData, gen1Strategy);
    const giftSuggestion = suggestions.find((s) => s.id === 'gift-131');
    expect(giftSuggestion).toBeDefined();
  });
});
