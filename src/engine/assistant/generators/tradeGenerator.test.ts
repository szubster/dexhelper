import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import { generateGiftAndTradeSuggestions } from './tradeGenerator';

describe('tradeGenerator', () => {
  it('should return correct Gen 3 trades', () => {
    const saveData = {
      generation: 3,
      badges: 0,
      eventFlags: new Uint8Array(300),
      gen3NPCTrades: { RUSTBORO: false, PACIFIDLOG: true, FORTREE: false, BATTLE_FRONTIER: false },
    } as unknown as SaveData;
    const suggestions: import('../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [273, 116],
      saveData,
      'emerald',
      new Set([280]),
      { pokemonMetadata: {} } as unknown as import('../suggestionEngineTypes').AssistantApiData,
      new Map([[280, [{} as unknown as PokemonInstance]]]),
      suggestions,
      new Set([273, 116]),
    );

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.pokemonId === 273)).toBe(true); // RUSTBORO trade available
    expect(suggestions.some((s) => s.pokemonId === 116)).toBe(false); // PACIFIDLOG trade claimed
  });
});
