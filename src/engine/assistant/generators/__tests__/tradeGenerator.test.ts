import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../../saveParser/index';
import { generateGiftAndTradeSuggestions } from '../tradeGenerator';

describe('tradeGenerator', () => {
  it('should return correct Gen 3 trades', () => {
    const saveData = {
      generation: 3,
      badges: 0,
      eventFlags: new Uint8Array(300),
      gen3NPCTrades: { RUSTBORO: false, PACIFIDLOG: true, FORTREE: false, BATTLE_FRONTIER: false },
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [273, 116],
      saveData,
      'emerald',
      new Set([280]),
      { pokemonMetadata: {} } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([[280, [{} as unknown as PokemonInstance]]]),
      suggestions,
      new Set([273, 116]),
    );

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.pokemonId === 273)).toBe(true); // RUSTBORO trade available
    expect(suggestions.some((s) => s.pokemonId === 116)).toBe(false); // PACIFIDLOG trade claimed
  });

  it('should return correct Gen 3 static gifts and respect gen3StaticEncounters claimed flags', () => {
    const saveData = {
      generation: 3,
      badges: 8,
      eventFlags: new Uint8Array(300),
      gen3StaticEncounters: {
        castform: false,
        beldum: false,
        rayquaza: true, // claimed
        snorlaxRoute12: false,
      },
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [351, 375, 384, 143],
      saveData,
      'emerald',
      new Set(),
      { pokemonMetadata: {} } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map(),
      suggestions,
      new Set([351, 375, 384, 143]),
    );

    expect(suggestions.some((s) => s.pokemonId === 351)).toBe(true); // Castform
    expect(suggestions.some((s) => s.pokemonId === 375)).toBe(true); // Beldum
    expect(suggestions.some((s) => s.pokemonId === 384)).toBe(false); // Rayquaza claimed
  });

  it('should return correct Gen 1 trades and gifts', () => {
    const saveData = {
      generation: 1,
      badges: 8,
      eventFlags: new Uint8Array(300),
      npcTradeFlags: { 0: true, 1: false, 6: true },
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [30, 122, 124, 131, 37, 38], // added 38 to check pre-evo logic
      saveData,
      'red',
      new Set([63, 37]), // Don't own 38, but own 37. Makes 38 unobtainable via exclusives if pre-evo isn't checked
      {
        pokemonMetadata: {
          30: { efrm: [] },
          122: { efrm: [] },
          124: { efrm: [] },
          131: { efrm: [] },
          37: { efrm: [] },
          38: { efrm: [37] },
        },
      } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([
        [63, [{} as PokemonInstance]],
        [37, [{} as PokemonInstance]],
      ]),
      suggestions,
      new Set([30, 122, 124, 131, 38]),
    );

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.pokemonId === 122)).toBe(true);
    expect(suggestions.some((s) => s.pokemonId === 124)).toBe(false); // claimed
    expect(suggestions.some((s) => s.pokemonId === 30)).toBe(false); // claimed
    expect(suggestions.some((s) => s.pokemonId === 131)).toBe(true);

    const ninetalesSugg = suggestions.find((s) => s.pokemonId === 38);
    expect(ninetalesSugg).toBeUndefined(); // We own the pre-evo physically, so we shouldn't get an exclusive suggestion

    const vulpixSugg = suggestions.find((s) => s.pokemonId === 37);
    expect(vulpixSugg).toBeUndefined(); // We already have Vulpix
  });

  it('should return correct Gen 2 trades and check exclusiveness correctly', () => {
    const saveData = {
      generation: 2,
      badges: 16,
      eventFlags: new Uint8Array(300),
      npcTradeFlags: { 0: false, 1: true }, // 1 claimed
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [66, 175, 37],
      saveData,
      'gold',
      new Set([63]),
      {
        pokemonMetadata: {
          66: { efrm: [] },
          175: { efrm: [] },
          37: { efrm: [] },
        },
      } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([[96, [{} as PokemonInstance]]]), // Drowzee for Machop trade
      suggestions,
      new Set([66, 175, 37]),
    );

    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.some((s) => s.pokemonId === 66)).toBe(true);
    expect(suggestions.some((s) => s.pokemonId === 175)).toBe(true);
    const vulpixSugg = suggestions.find((s) => s.pokemonId === 37);
    expect(vulpixSugg).toBeDefined();
    expect(vulpixSugg?.priority).toBe(10);
    const machopSugg = suggestions.find((s) => s.pokemonId === 66);
    expect(machopSugg?.priority).toBe(85); // Because we own Drowzee
  });

  it('should skip version exclusive if the player owns an evolved form that can be bred', () => {
    const saveData = {
      generation: 2,
      badges: 16,
      eventFlags: new Uint8Array(300),
      npcTradeFlags: {},
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    // Player needs Meowth (52) which is a Gold exclusive. But they own Persian (53).
    generateGiftAndTradeSuggestions(
      [52],
      saveData,
      'gold',
      new Set([53]),
      {
        pokemonMetadata: {
          52: { eto: [{ id: 53, eto: [] }] }, // Meowth evolves into Persian
        },
      } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([[53, [{} as PokemonInstance]]]), // Physically own Persian
      suggestions,
      new Set([52]),
    );

    // Should NOT contain a trade suggestion for Meowth since it can be bred
    const meowthSugg = suggestions.find((s) => s.pokemonId === 52);
    expect(meowthSugg).toBeUndefined();
  });

  it('should skip version exclusive if the player owns an evolved form that can be bred (multi-stage)', () => {
    const saveData = {
      generation: 2,
      badges: 16,
      eventFlags: new Uint8Array(300),
      npcTradeFlags: {},
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [1], // Bulbasaur is not a version exclusive, but we can mock it as an unobtainable one for coverage testing if we want, or use an actual 3-stage exclusive like Mareep in Gen 3 or something. Let's use 69 (Bellsprout) which evolves to Weepinbell(70) then Victreebel(71). Bellsprout is exclusive to Silver in Gen 1, FireRed in Gen 3.
      saveData,
      'gold', // Wait, Bellsprout is unobtainable in Gold.
      new Set([71]), // Own Victreebel
      {
        pokemonMetadata: {
          69: { eto: [{ id: 70, eto: [{ id: 71, eto: [] }] }] },
        },
      } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([[71, [{} as PokemonInstance]]]),
      suggestions,
      new Set([69]),
    );

    // Should NOT contain a trade suggestion for Bellsprout
    const bellsproutSugg = suggestions.find((s) => s.pokemonId === 69);
    expect(bellsproutSugg).toBeUndefined();
  });

  it('should generate priority 75 suggestion to evolve an owned pre-evolution for an NPC trade', () => {
    const saveData = {
      generation: 1,
      badges: 8,
      eventFlags: new Uint8Array(300),
      npcTradeFlags: { 6: false }, // Lola Jynx trade available (tradeIndex 6: receive Jynx 124 for Poliwhirl 61)
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [124],
      saveData,
      'red',
      new Set([60]), // Own Poliwag (#60), pre-evo of Poliwhirl (#61)
      {
        pokemonMetadata: {
          61: { efrm: [60] }, // Poliwhirl pre-evo is Poliwag
          124: { efrm: [] },
        },
      } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([[60, [{} as PokemonInstance]]]),
      suggestions,
      new Set([124]),
    );

    const jynxSugg = suggestions.find((s) => s.pokemonId === 124);
    expect(jynxSugg).toBeDefined();
    expect(jynxSugg?.priority).toBe(75);
    expect(jynxSugg?.description).toContain('You have #60! Evolve it to #61');
  });

  it('should generate priority 70 suggestion to breed an owned post-evolution for an NPC trade', () => {
    const saveData = {
      generation: 3,
      badges: 8,
      eventFlags: new Uint8Array(300),
      gen3NPCTrades: { BATTLE_FRONTIER: false }, // Receive Meowth (#52) for Skitty (#300)
    } as unknown as SaveData;
    const suggestions: import('../../strategies/types').Suggestion[] = [];

    generateGiftAndTradeSuggestions(
      [52],
      saveData,
      'emerald',
      new Set([301]), // Own Delcatty (#301), post-evo of Skitty (#300)
      {
        pokemonMetadata: {
          300: { eto: [{ id: 301, eto: [] }] }, // Skitty evolves into Delcatty
          52: { efrm: [] },
        },
      } as unknown as import('../../suggestionEngineTypes').AssistantApiData,
      new Map([[301, [{} as PokemonInstance]]]),
      suggestions,
      new Set([52]),
    );

    const meowthSugg = suggestions.find((s) => s.pokemonId === 52);
    expect(meowthSugg).toBeDefined();
    expect(meowthSugg?.priority).toBe(70);
    expect(meowthSugg?.description).toContain('Breed your #301 to get #300');
  });
});
