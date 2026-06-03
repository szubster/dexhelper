import { describe, expect, it } from 'vitest';
import { getGenerationConfig } from '../../../utils/generationConfig';
import type { SaveData } from '../../saveParser';
import { getStrategy } from '../strategies';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

const mockStrategy = getStrategy(1);
mockStrategy.getMapDistance = () => ({ distance: 1, name: 'Route 1' });

const MOCK_API_DATA: Partial<AssistantApiData> = {
  localAid: 1,
  localEncounters: [],
  missingEncounters: {
    129: {
      pid: 129,
      enc: [
        {
          v: 1,
          aid: 2,
          d: [{ m: 3, c: 100, min: 5, max: 5, t: 1 }],
        },
      ],
    },
  },
  pokemonMetadata: {},
  ancestralEncounters: {},
  areaNames: { 2: 'Route 1' },
  allLocations: [
    { id: 1, n: 'Pallet Town' },
    { id: 2, n: 'Route 1' },
  ] as unknown as import('../../../db/schema').UnifiedLocation[],
};

const mockOwnedSet = new Set(Array.from({ length: 128 }, (_, i) => i + 1));

const baseSaveData: SaveData = {
  trainerName: 'ASH',
  trainerId: 12345,
  badges: 0,
  inventory: [],
  pcItems: [],
  party: [],
  partyDetails: [],
  pc: [],
  pcDetails: [],
  owned: mockOwnedSet,
  seen: new Set(),
  generation: 1,
  gameVersion: 'red',
  currentMapId: 1,
  currentBoxCount: 0,
  eventFlags: new Uint8Array(),
  hallOfFameCount: 0,
};

describe('fishing rod prerequisites', () => {
  it('filters out old-rod encounters if the player lacks an Old Rod', () => {
    const saveData = {
      ...baseSaveData,
      inventory: [],
      pcItems: [],
    };

    const { suggestions } = generateSuggestions(saveData, false, null, MOCK_API_DATA as AssistantApiData, mockStrategy);
    const hasMagikarpSuggestion = suggestions.some((s) => s.pokemonId === 129);
    expect(hasMagikarpSuggestion).toBe(false);
  });

  it('includes old-rod encounters if the player has an Old Rod in inventory', () => {
    const genConfig = getGenerationConfig(1);
    const rodId = genConfig.rodIds?.OLD ?? 76;
    const saveData = {
      ...baseSaveData,
      inventory: [{ id: rodId, quantity: 1 }],
      pcItems: [],
    };

    const { suggestions } = generateSuggestions(saveData, false, null, MOCK_API_DATA as AssistantApiData, mockStrategy);

    const magikarpSuggestion = suggestions.find((s) => s.pokemonId === 129);
    expect(magikarpSuggestion).toBeDefined();
    // @ts-expect-error
    expect(magikarpSuggestion?.encounterInfo?.[129]?.[0]?.method).toBe('old-rod');
  });

  it('includes old-rod encounters if the player has an Old Rod in PC', () => {
    const genConfig = getGenerationConfig(1);
    const rodId = genConfig.rodIds?.OLD ?? 76;
    const saveData = {
      ...baseSaveData,
      inventory: [],
      pcItems: [{ id: rodId, quantity: 1 }],
    };

    const { suggestions } = generateSuggestions(saveData, false, null, MOCK_API_DATA as AssistantApiData, mockStrategy);
    const magikarpSuggestion = suggestions.find((s) => s.pokemonId === 129);
    expect(magikarpSuggestion).toBeDefined();
  });
});
