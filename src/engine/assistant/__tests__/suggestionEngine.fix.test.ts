import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { AssistantApiData } from '../suggestionEngine';
import { generateSuggestions } from '../suggestionEngine';

describe('suggestionEngine - Redundancy Fix Verification', () => {
  const mockSaveData = {
    generation: 1,
    gameVersion: 'yellow',
    // Own 1-50 so that Jynx (124) is within the first 100 missing (100 is the slice limit in engine)
    owned: new Set([...Array.from({ length: 50 }, (_, i) => i + 1), 25]),
    seen: new Set([25]),
    party: [],
    inventory: [],
    currentMapId: 0, // Pallet Town
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
  };

  const mockApiData = {
    localEncounters: { slug: 'pallet-town-area', encounters: [] },
    missingEncounters: {
      124: [], // Jynx (not catchable in Yellow, and no NPC trade)
      122: [], // Mr. Mime (not catchable in Yellow, but NPC trade EXISTS)
    },
    ancestralEncounters: { 124: {}, 122: {} },
    missingChains: {
      124: { id: 1, chain: { id: 124, evolves_to: [], details: [] } },
      122: { id: 2, chain: { id: 122, evolves_to: [], details: [] } },
    },
    partyEvolutions: {},
    areaNames: {},
  } as unknown as AssistantApiData;

  it('should only show "Version Exclusive" for Jynx in Yellow', () => {
    const { suggestions } = generateSuggestions(
      mockSaveData as unknown as SaveData,
      false,
      'yellow',
      mockApiData,
      gen1Strategy,
    );
    const jynxSuggestions = suggestions.filter((s) => s.pokemonId === 124);

    // Jynx: 1 suggestion (Version Exclusive)
    expect(jynxSuggestions).toHaveLength(1);
    expect(jynxSuggestions[0]?.title).toContain('Version Exclusive');
  });

  it('should suppress "Version Exclusive" for Mr. Mime and only show NPC trade', () => {
    const { suggestions } = generateSuggestions(
      mockSaveData as unknown as SaveData,
      false,
      'yellow',
      mockApiData,
      gen1Strategy,
    );
    const mimeSuggestions = suggestions.filter((s) => s.pokemonId === 122);

    // Mr. Mime: 1 suggestion (NPC Trade)
    expect(mimeSuggestions).toHaveLength(1);
    expect(mimeSuggestions[0]?.title).toContain('Trade for #122');
  });
});
