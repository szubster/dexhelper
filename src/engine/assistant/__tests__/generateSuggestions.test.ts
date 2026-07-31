import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import type { PokemonInstance } from '../../saveParser/parsers/common';
import { getStrategy } from '../strategies';
import { gen1Strategy } from '../strategies/gen1Strategy';
import type { EncounterDetail } from '../strategies/types';
import { generateSuggestions } from '../suggestionEngine';
import type { AssistantApiData } from '../suggestionEngineTypes';

describe('generateSuggestions', () => {
  it('should detect when an evolution item is already equipped for Trade evolutions', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(208); // Missing Steelix
    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet, // Owns Onix
      party: [],
      pc: [95],
      inventory: [{ id: 1, quantity: 5 }], // No Metal Coat (id: 0x8f) in bag
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 95,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
          item: 0x8f, // Holding Metal Coat!
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        95: {
          id: 95,
          n: 'Onix',
          cr: 45,
          baby: false,
          evolvesTo: [{ id: 208, evolvesTo: [], evolutionDetails: [{ tr: 2, held: 210 }], ef: 95 }],
          evolvesFrom: [],
          evolutionDetails: [],
        },
        208: {
          id: 208,
          n: 'Steelix',
          cr: 25,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [95],
          evolutionDetails: [{ tr: 2, held: 210 }],
        },
      },
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const mockStrategy = {
      ...gen1Strategy,
      generation: 2,
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, mockStrategy);
    const suggestion = suggestions.find((s) => s.id === 'evo-trade-held-208');
    expect(suggestion).toBeDefined();
    expect(suggestion?.title).toBe('Ready to Trade Evolve: #208!');
    expect(suggestion?.description).toBe('Your pre-evolution is already holding the Metal Coat! Trade it to evolve!');
  });

  it('should suggest taking an evolution item from another pokemon if equipped for Trade evolutions', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(208); // Missing Steelix
    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet, // Owns Onix
      party: [],
      pc: [95, 16],
      inventory: [{ id: 1, quantity: 5 }], // No Metal Coat (id: 0x8f) in bag
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 95,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
          otName: 'ASH',
        },
        {
          speciesId: 16, // Random Pidgey
          level: 5,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
          item: 0x8f, // Holding Metal Coat!
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        95: {
          id: 95,
          n: 'Onix',
          cr: 45,
          baby: false,
          evolvesTo: [{ id: 208, evolvesTo: [], evolutionDetails: [{ tr: 2, held: 210 }], ef: 95 }],
          evolvesFrom: [],
          evolutionDetails: [],
        },
        208: {
          id: 208,
          n: 'Steelix',
          cr: 25,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [95],
          evolutionDetails: [{ tr: 2, held: 210 }],
        },
      },
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const mockStrategy = {
      ...gen1Strategy,
      generation: 2,
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, mockStrategy);
    const suggestion = suggestions.find((s) => s.id === 'evo-trade-held-208');
    expect(suggestion).toBeDefined();
    expect(suggestion?.title).toBe('Ready to Trade Evolve: #208!');
    expect(suggestion?.description).toBe(
      'Take the Metal Coat held by your Pokémon (#16), have your pre-evolution hold it, and trade to evolve!',
    );
  });

  it('should suggest taking an evolution item from another pokemon if equipped for USE_ITEM evolutions', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(36); // Missing Clefable
    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet, // Owns Clefairy (35)
      party: [],
      pc: [35, 16],
      inventory: [{ id: 1, quantity: 5 }], // No Moon Stone (id: 0x08) in bag
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 35,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
          otName: 'ASH',
        },
        {
          speciesId: 16, // Random Pidgey
          level: 5,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
          item: 0x08, // Holding Moon Stone!
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        35: {
          id: 35,
          n: 'Clefairy',
          cr: 45,
          baby: false,
          evolvesTo: [{ id: 36, evolvesTo: [], evolutionDetails: [{ tr: 3, item: 81 }], ef: 35 }],
          evolvesFrom: [173],
          evolutionDetails: [],
        },
        36: {
          id: 36,
          n: 'Clefable',
          cr: 25,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [35],
          evolutionDetails: [{ tr: 3, item: 81 }], // tr: 3 is USE_ITEM, item 81 is Moon Stone pokeapi ID
        },
      },
      missingEncounters: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const mockStrategy = {
      ...gen1Strategy,
      generation: 2,
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, mockStrategy);
    const suggestion = suggestions.find((s) => s.id === 'evo-item-36-81');
    expect(suggestion).toBeDefined();
    expect(suggestion?.title).toBe('Ready to Evolve: #36!');
    expect(suggestion?.description).toBe('Take the Moon Stone held by your Pokémon (#16) and use it to evolve it!');
  });

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
          enc: [
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
      allLocations: [
        {
          id: 1,
          n: 'Pallet Town',
          r: 'Kanto',
          a: [{ id: 1, n: 'Pallet Town Area' }],
        },
      ],
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
          enc: [
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
        {
          id: 1,
          n: 'Pallet Town',
          r: 'Kanto',
          a: [{ id: 1, n: 'Pallet Town Area' }],
        },
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

    const nearbySuggestion = suggestions.find((s) => s.id === 'catch-nearby-2-1');
    expect(nearbySuggestion).toBeDefined();
    expect(nearbySuggestion?.title).toBe('Nearby: Route 1');
    expect(nearbySuggestion?.pokemonIds).toContain(19);
    // Best distance is 1. Math.max(10, 110 - 1 * 12) = 110 - 12 = 98
    expect(nearbySuggestion?.priority).toBe(98);
  });

  it('should generate "Gift" suggestions when event flag is not set and badges are sufficient', () => {
    const eventFlags = new Uint8Array(300);
    // Do not set 0x190 (Lapras gift flag)

    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 4, // Enough badges for Lapras
      eventFlags,
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
    expect(giftSuggestion?.title).toBe('Claim Gift: #131');
    expect(giftSuggestion?.category).toBe('Gift');
  });

  it('should not generate "Gift" suggestions when badges are insufficient', () => {
    const eventFlags = new Uint8Array(300);

    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 3, // Not enough for Lapras (requires 4)
      eventFlags,
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
    expect(giftSuggestion).toBeUndefined();
  });

  it('should not generate "Gift" suggestions when event flag is set', () => {
    const eventFlags = new Uint8Array(300);
    // Set 0x190 (Lapras gift flag)
    const byteIndex = 0x190 >> 3;
    const bitIndex = 0x190 & 7;
    // @ts-expect-error
    eventFlags[byteIndex] |= 1 << bitIndex;

    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 131 (Lapras)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      badges: 8, // Enough badges
      eventFlags,
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
    expect(giftSuggestion).toBeUndefined();
  });

  it('should not generate "Trade" suggestions when tradeIndex flag is set', () => {
    const mockSaveData: SaveData = {
      generation: 1,
      gameVersion: 'red',
      owned: new Set([1, 2, 3]), // Missing 122 (Mr. Mime), requires trade index 1
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      npcTradeFlags: Array.from({ length: 16 }, (_, i) => i === 1), // Set tradeIndex 1 to true
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

    const tradeSuggestion = suggestions.find((s) => s.id === 'npc-trade-122');
    expect(tradeSuggestion).toBeUndefined();
  });

  it('should generate "Breed" suggestions for Gen 2 based on daycare egg status', () => {
    const mockSaveData: SaveData = {
      generation: 2,
      gameVersion: 'crystal',
      owned: new Set([153, ...Array.from({ length: 251 }, (_, i) => i + 1).filter((i) => i !== 152)]), // Missing 152 (Chikorita), owns 153 (Bayleef)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 153, // Bayleef
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
        },
      ],
      trainerName: 'GOLD',
      daycare: [
        {
          speciesId: 153, // Bayleef in daycare
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Daycare',
        },
        {
          speciesId: 132, // Ditto in daycare
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Daycare',
        },
      ],
      daycareHasEgg: true,
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        152: {
          // Chikorita
          id: 152,
          evolvesTo: [{ id: 153 }], // Evolves to 153
          evolvesFrom: [],
          evolutionDetails: [],
        } as unknown as PokemonMetadata,
        153: {
          // Bayleef
          id: 153,
          evolvesTo: [],
          evolvesFrom: [152],
          evolutionDetails: [],
        } as unknown as PokemonMetadata,
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    // Use a strategy with generation 2
    const mockStrategy = {
      ...gen1Strategy,
      generation: 2, // Must be 2 for Gen2 logic
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'crystal', mockApiData, mockStrategy);

    const breedSuggestion = suggestions.find((s) => s.id === 'breed-152');
    expect(breedSuggestion).toBeDefined();
    expect(breedSuggestion?.title).toBe('Egg Ready: #152!');
    expect(breedSuggestion?.description).toBe('Pick up your Egg from the Daycare!');
    expect(breedSuggestion?.priority).toBe(95);

    // Test when no egg is ready
    mockSaveData.daycareHasEgg = false;
    const { suggestions: suggestionsWait } = generateSuggestions(
      mockSaveData,
      false,
      'crystal',
      mockApiData,
      mockStrategy,
    );
    const breedSuggestionWait = suggestionsWait.find((s) => s.id === 'breed-152');
    expect(breedSuggestionWait).toBeDefined();
    expect(breedSuggestionWait?.title).toBe('Breeding in Progress: #152');
    expect(breedSuggestionWait?.description).toBe('Wait for an Egg from the Daycare!');
    expect(breedSuggestionWait?.priority).toBe(85);

    // Test when pokemon not in daycare
    mockSaveData.daycare = [];
    const { suggestions: suggestionsNotInDaycare } = generateSuggestions(
      mockSaveData,
      false,
      'crystal',
      mockApiData,
      mockStrategy,
    );
    const breedSuggestionNotInDaycare = suggestionsNotInDaycare.find((s) => s.id === 'breed-152');
    expect(breedSuggestionNotInDaycare).toBeDefined();
    expect(breedSuggestionNotInDaycare?.title).toBe('Breed: #152');
    expect(breedSuggestionNotInDaycare?.description).toBe(
      'Leave your #153 and a compatible partner (like Ditto) at the Daycare to get an Egg!',
    );
    expect(breedSuggestionNotInDaycare?.priority).toBe(85);

    // Test when pokemon is in daycare but alone
    mockSaveData.daycare = [
      {
        speciesId: 153, // Bayleef in daycare
        level: 20,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Daycare',
      },
    ];
    mockSaveData.daycareHasEgg = false;
    const { suggestions: suggestionsAlone } = generateSuggestions(
      mockSaveData,
      false,
      'crystal',
      mockApiData,
      mockStrategy,
    );
    const breedSuggestionAlone = suggestionsAlone.find((s) => s.id === 'breed-152');
    expect(breedSuggestionAlone).toBeDefined();
    expect(breedSuggestionAlone?.title).toBe('Need Partner: #152');
    expect(breedSuggestionAlone?.description).toBe(
      'Leave a compatible partner (like Ditto) at the Daycare to get an Egg!',
    );
    expect(breedSuggestionAlone?.priority).toBe(80);
  });

  it('should generate "Evolve" suggestion when min_l and min_h are missing (time-based fallback)', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(196); // Missing Espeon (196)
    ownedSet.add(133); // Owns Eevee (133)

    const mockSaveData: SaveData = {
      generation: 2,
      gameVersion: 'gold',
      owned: ownedSet,
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      eventFlags: new Uint8Array(300),
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 133,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Box 1',
        },
      ],
      trainerName: 'GOLD',
    } as unknown as SaveData;

    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        196: {
          id: 196,
          evolvesTo: [],
          evolvesFrom: [133],
          evolutionDetails: [{ tr: 1, time: 1 }], // Level up, day, no min_h or min_l
        } as unknown as PokemonMetadata,
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    // Use a strategy with generation 2
    const mockStrategy = {
      ...gen1Strategy,
      generation: 2,
    };

    const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, mockStrategy);

    const evoSuggestion = suggestions.find((s) => s.id === 'evo-lvl-any-196');
    expect(evoSuggestion).toBeDefined();
    expect(evoSuggestion?.title).toBe('Level Up Evolution: #196');
    expect(evoSuggestion?.description).toBe('Level up your pre-evolution during the day to evolve!');
    expect(evoSuggestion?.priority).toBe(70);
  });

  it('should penalize priority and add warnings for Headbutt and Rock Smash encounters if items are missing', () => {
    const localSaveData: SaveData = {
      generation: 2,
      gameVersion: 'gold',
      owned: new Set([1, ...Array.from({ length: 251 }, (_, i) => i + 1).filter((i) => i !== 2)]), // Only missing 2
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      badges: 0,
      johtoBadges: 0,
      trainerName: 'Ash',
      trainerId: 12345,
      currentMapId: 1,
      currentBoxCount: 0,
      hallOfFameCount: 0,
      inventory: [],
    };

    const localApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    };

    const localStrategy = {
      ...gen1Strategy,
      generation: 2,
      getMapDistance: () => ({ distance: 1, name: 'Route 1' }),
    };

    const missingPid = 2;
    // Set missing encounter to require headbutt
    localApiData.missingEncounters[missingPid] = {
      pid: missingPid,
      enc: [
        {
          aid: 2,
          v: 4, // 4 = gold
          d: [
            { c: 100, m: 8, min: 5 },
            { c: 100, m: 7, min: 5 },
          ], // m = 8 is Headbutt, m = 7 is Rock Smash
        },
      ],
    };

    // 1. Missing item
    localSaveData.generation = 2;
    localSaveData.inventory = [];
    const result1 = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const catch1 = result1.suggestions.find((s) => s.category === 'Catch' && s.id.startsWith('catch-nearby'));
    expect(catch1).toBeDefined(); // Retained, but with warning
    expect(catch1?.priority).toBe(45);
    expect(catch1?.warning).toBe('Requires Headbutt or Rock Smash');

    // 2. Has item (badges no longer required)
    localSaveData.inventory = [
      { id: 192, quantity: 1 },
      { id: 198, quantity: 1 },
    ];
    localSaveData.johtoBadges = 0;
    const result2 = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const catch2 = result2.suggestions.find((s) => s.category === 'Catch' && s.id.startsWith('catch-nearby'));
    expect(catch2).toBeDefined(); // Included since badges aren't needed
    expect(
      (catch2?.category === 'Catch' ? catch2 : undefined)?.encounterInfo?.[missingPid]?.some(
        (e: EncounterDetail) => e.method === 'headbutt',
      ),
    ).toBe(true);
    expect(
      (catch2?.category === 'Catch' ? catch2 : undefined)?.encounterInfo?.[missingPid]?.some(
        (e: EncounterDetail) => e.method === 'rock-smash',
      ),
    ).toBe(true);

    // 3. Missing item but a Pokemon knows the move
    localSaveData.inventory = [];
    localSaveData.partyDetails = [
      {
        speciesId: 1,
        level: 10,
        isShiny: false,
        hash: '',
        moves: [29, 249], // Headbutt and Rock Smash
        storageLocation: 'Party',
      },
    ];
    const result3 = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const catch3 = result3.suggestions.find((s) => s.category === 'Catch' && s.id.startsWith('catch-nearby'));
    expect(catch3).toBeDefined(); // Included because of known moves
    expect(
      (catch3?.category === 'Catch' ? catch3 : undefined)?.encounterInfo?.[missingPid]?.some(
        (e: EncounterDetail) => e.method === 'headbutt',
      ),
    ).toBe(true);
    expect(
      (catch3?.category === 'Catch' ? catch3 : undefined)?.encounterInfo?.[missingPid]?.some(
        (e: EncounterDetail) => e.method === 'rock-smash',
      ),
    ).toBe(true);
  });
  it('should generate stat-based evolution suggestions for Tyrogue (Atk > Def, Atk < Def, Atk = Def)', () => {
    const mockApiData: AssistantApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        106: { id: 106, evolvesFrom: [236], evolutionDetails: [{ tr: 1, ml: 20, rps: 1 }] } as unknown as PokemonMetadata, // Hitmonlee
        107: { id: 107, evolvesFrom: [236], evolutionDetails: [{ tr: 1, ml: 20, rps: -1 }] } as unknown as PokemonMetadata, // Hitmonchan
        237: { id: 237, evolvesFrom: [236], evolutionDetails: [{ tr: 1, ml: 20, rps: 0 }] } as unknown as PokemonMetadata, // Hitmontop
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const mockStrategy = {
      ...gen1Strategy,
      generation: 2,
    };

    // Helper to create mock save data with a specific Tyrogue
    const createSaveDataWithTyrogue = (dvs: { atk: number; def: number }, missingIds: number[]) => {
      const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
      missingIds.forEach((id) => {
        ownedSet.delete(id);
      });
      return {
        generation: 2,
        gameVersion: 'gold',
        owned: ownedSet,
        seen: new Set(),
        party: [],
        inventory: [],
        currentMapId: 0,
        eventFlags: new Uint8Array(300),
        partyDetails: [],
        pcDetails: [
          {
            speciesId: 236, // Tyrogue
            level: 20,
            dvs,
            statExp: { hp: 0, atk: 0, def: 0, spd: 0, spc: 0 },
            isShiny: false,
            hash: '',
            moves: [],
            storageLocation: 'Box 1',
          },
        ],
        trainerName: 'GOLD',
      } as unknown as SaveData;
    };

    // Case 1: Atk > Def (Hitmonlee - 106)
    const dataAtkGtr = createSaveDataWithTyrogue({ atk: 15, def: 0 }, [106]);
    const { suggestions: suggs1 } = generateSuggestions(dataAtkGtr, false, 'gold', mockApiData, mockStrategy);
    const evoLee = suggs1.find((s) => s.id === 'evo-lvl-106');
    expect(evoLee).toBeDefined();
    expect(evoLee?.title).toBe('Level Up Evolution: #106');
    expect(evoLee?.description).toBe('Your Lv. 20 pre-evolution is ready to evolve (needs Lv. 20, Atk > Def)!');

    // Case 2: Atk < Def (Hitmonchan - 107)
    const dataAtkLsr = createSaveDataWithTyrogue({ atk: 0, def: 15 }, [107]);
    const { suggestions: suggs2 } = generateSuggestions(dataAtkLsr, false, 'gold', mockApiData, mockStrategy);
    const evoChan = suggs2.find((s) => s.id === 'evo-lvl-107');
    expect(evoChan).toBeDefined();
    expect(evoChan?.title).toBe('Level Up Evolution: #107');
    expect(evoChan?.description).toBe('Your Lv. 20 pre-evolution is ready to evolve (needs Lv. 20, Atk < Def)!');

    // Case 3: Atk = Def (Hitmontop - 237)
    const dataAtkEq = createSaveDataWithTyrogue({ atk: 10, def: 10 }, [237]);
    const { suggestions: suggs3 } = generateSuggestions(dataAtkEq, false, 'gold', mockApiData, mockStrategy);
    const evoTop = suggs3.find((s) => s.id === 'evo-lvl-237');
    expect(evoTop).toBeDefined();
    expect(evoTop?.title).toBe('Level Up Evolution: #237');
    expect(evoTop?.description).toBe('Your Lv. 20 pre-evolution is ready to evolve (needs Lv. 20, Atk = Def)!');

    // Case 4: Not matching Atk > Def for Hitmonlee
    const dataAtkNotGtr = createSaveDataWithTyrogue({ atk: 0, def: 15 }, [106]);
    const { suggestions: suggs4 } = generateSuggestions(dataAtkNotGtr, false, 'gold', mockApiData, mockStrategy);
    const evoLeeNotReady = suggs4.find((s) => s.id === 'evo-lvl-106');
    expect(evoLeeNotReady).toBeDefined();
    expect(evoLeeNotReady?.title).toBe('Level Up Evolution: #106');
    expect(evoLeeNotReady?.description).toBe('Your Lv. 20 pre-evolution evolves at Lv. 20 (needs Lv. 20, Atk > Def).');
    expect(evoLeeNotReady?.priority).toBe(75); // Lower priority because it's not actually ready
  });

  it('should suppress breeding suggestions for intermediate evolutions (e.g. Charmeleon)', () => {
    const mockApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        4: { id: 4, baby: false, evolvesFrom: [], evolvesTo: [{ id: 5, evolvesTo: [{ id: 6 }] }] } as unknown as PokemonMetadata,
        5: { id: 5, baby: false, evolvesFrom: [4], evolvesTo: [{ id: 6, evolvesTo: [] }] } as unknown as PokemonMetadata, // Charmeleon
        6: { id: 6, baby: false, evolvesFrom: [5, 4], evolvesTo: [] } as unknown as PokemonMetadata, // Charizard
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const mockSaveData: SaveData = {
      generation: 2,
      gameVersion: 'gold',
      owned: new Set([4, 6]), // Owns Charmander and Charizard, missing Charmeleon (5)
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      partyDetails: [],
      pcDetails: [{ speciesId: 6, level: 40, storageLocation: 'Box 1', otName: 'TEST' } as unknown as PokemonInstance],
      trainerName: 'TEST',
    } as unknown as SaveData;

    const strategy = getStrategy(2);
    if (!strategy) throw new Error('Strategy not found');
    const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, strategy);

    const breedSugg = suggestions.find((s) => s.category === 'Breed' && s.pokemonId === 5);
    expect(breedSugg).toBeUndefined(); // It should be undefined because Charizard egg hatches to Charmander
  });

  it('should generate breeding suggestions for base/baby pokemon (e.g. Pichu)', () => {
    const mockApiData = {
      localAid: 1,
      localEncounters: [],
      missingEncounters: {},
      pokemonMetadata: {
        172: { id: 172, baby: true, evolvesFrom: [], evolvesTo: [{ id: 25, evolvesTo: [] }] } as unknown as PokemonMetadata, // Pichu
        25: { id: 25, baby: false, evolvesFrom: [172], evolvesTo: [{ id: 26, evolvesTo: [] }] } as unknown as PokemonMetadata, // Pikachu
        26: { id: 26, baby: false, evolvesFrom: [25, 172], evolvesTo: [] } as unknown as PokemonMetadata, // Raichu
      },
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const fullOwnedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    fullOwnedSet.delete(172);

    const mockSaveData: SaveData = {
      generation: 2,
      gameVersion: 'gold',
      owned: fullOwnedSet, // Owns Pikachu, missing Pichu
      seen: new Set(),
      party: [],
      inventory: [],
      currentMapId: 0,
      partyDetails: [
        { speciesId: 25, level: 40, storageLocation: 'Box 1', otName: 'TEST' } as unknown as PokemonInstance,
      ],
      pcDetails: [],
      trainerName: 'TEST',
    } as unknown as SaveData;

    const strategy = getStrategy(2);
    if (!strategy) throw new Error('Strategy not found');
    const { suggestions } = generateSuggestions(mockSaveData, false, 'gold', mockApiData, strategy);

    const breedSugg = suggestions.find((s) => s.category === 'Breed' && s.pokemonId === 172);
    expect(breedSugg).toBeDefined();
    expect(breedSugg?.title).toBe('Breed: #172');
  });
  it('should properly handle suggestion.pokemonIds and warnings when some or all encounters require missing tools', () => {
    const localSaveData: SaveData = {
      generation: 2,
      gameVersion: 'gold',
      owned: new Set([1]),
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      badges: 0,
      johtoBadges: 0,
      trainerName: 'Ash',
      trainerId: 12345,
      currentMapId: 1,
      currentBoxCount: 0,
      hallOfFameCount: 0,
      inventory: [],
    };

    const localApiData: AssistantApiData = {
      localAid: 2, // The player is at area 2
      localEncounters: [
        {
          pid: 10,
          enc: [{ aid: 2, v: 4, d: [{ c: 100, m: 8, min: 5 }] }], // Headbutt
        },
        {
          pid: 11,
          enc: [{ aid: 2, v: 4, d: [{ c: 100, m: 7, min: 5 }] }], // Rock Smash
        },
      ] as unknown as import('../../../db/schema').LocationAreaEncounters[],
      missingEncounters: {
        10: {
          pid: 10,
          enc: [{ aid: 2, v: 4, d: [{ c: 100, m: 8, min: 5 }] }], // Headbutt
        },
        11: {
          pid: 11,
          enc: [{ aid: 2, v: 4, d: [{ c: 100, m: 7, min: 5 }] }], // Rock Smash
        },
      },
      pokemonMetadata: {
        10: { id: 10, n: 'Caterpie', evolvesFrom: [], evolvesTo: [] } as unknown as PokemonMetadata,
        11: { id: 11, n: 'Metapod', evolvesFrom: [], evolvesTo: [] } as unknown as PokemonMetadata,
      },
      ancestralEncounters: {},
      areaNames: { 2: 'Route 2' },
      allLocations: [
        { aid: 2, name: 'Route 2', mapGraphIds: [] } as unknown as import('../../../db/schema').UnifiedLocation,
      ],
    };

    const localStrategy = {
      ...gen1Strategy,
      generation: 2,
      getMapDistance: () => ({ distance: 0, name: 'Route 2' }), // same location
      getSpecialSuggestions: () => [] as unknown as import('../strategies/types').Suggestion[],
    };

    // First check: Both moves present, should have catch-local with both PIDs
    localSaveData.partyDetails = [
      {
        speciesId: 1,
        level: 10,
        isShiny: false,
        hash: '',
        moves: [29, 249], // Headbutt and Rock Smash
        storageLocation: 'Party',
      } as unknown as PokemonInstance,
    ];

    const resAll = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const suggAll = resAll.suggestions.find((s) => s.id === 'catch-local');
    expect(suggAll).toBeDefined();
    expect(suggAll?.pokemonIds?.includes(10)).toBe(true);
    expect(suggAll?.pokemonIds?.includes(11)).toBe(true);

    // 1. Both encounters filtered out (no Headbutt, no Rock Smash)
    localSaveData.partyDetails = []; // No moves
    const res1 = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const sugg1 = res1.suggestions.find((s) => s.id === 'catch-local');
    expect(sugg1).toBeDefined(); // Should NOT be removed, just penalized
    expect(sugg1?.priority).toBe(45);
    expect(sugg1?.warning).toContain('Requires Headbutt');
    expect(sugg1?.warning).toContain('Requires Rock Smash');
    expect(sugg1?.pokemonIds).toContain(10);
    expect(sugg1?.pokemonIds).toContain(11);
    // expect(sugg1?.pokemonIds).toContain(12);

    // 2. Only one encounter filtered out (has Headbutt, but no Rock Smash)
    localSaveData.partyDetails = [
      {
        speciesId: 1,
        level: 10,
        isShiny: false,
        hash: '',
        moves: [29], // Only Headbutt
        storageLocation: 'Party',
      } as unknown as PokemonInstance,
    ];
    const res2 = generateSuggestions(localSaveData, false, 'gold', localApiData, localStrategy);
    const sugg2 = res2.suggestions.find((s) => s.id === 'catch-local');

    expect(sugg2).toBeDefined();
    expect(sugg2?.pokemonIds).toContain(10);
    expect(sugg2?.pokemonIds).toContain(11);
    expect((sugg2?.category === 'Catch' ? sugg2 : undefined)?.encounterInfo?.[10]).toBeDefined();
    expect((sugg2?.category === 'Catch' ? sugg2 : undefined)?.encounterInfo?.[11]).toBeDefined();
    expect(sugg2?.priority).toBe(45);
    expect(sugg2?.warning).toBe('Requires Rock Smash');
  });

  it('should generate breeding suggestions for Egg Moves when owning an ancestor in the chain', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(1); // Missing Bulbasaur

    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet,
      party: [],
      pc: [274], // Owns Nuzleaf
      inventory: [],
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 274,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [], // No moves initially
          storageLocation: 'Box 1',
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        1: {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
          em: {
            13: [274, 1], // Move 13 (Razor Leaf), chain: Nuzleaf -> Bulbasaur
          },
        },
        274: {
          id: 274,
          n: 'Nuzleaf',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
        },
      } as Record<number, PokemonMetadata>,
      localAid: null,
      localEncounters: null,
      missingEncounters: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const strategy = getStrategy(2);
    const result = generateSuggestions(mockSaveData, false, 'gold', mockApiData, strategy);

    const emSuggestion = result.suggestions.find((s) => s.id === 'egg-move-1-13-274');
    expect(emSuggestion).toBeDefined();
    expect(emSuggestion?.description).toBe('Breed your #274 to get a #1 with the Egg Move!');
    expect(emSuggestion?.priority).toBe(82);
  });

  it('should generate higher priority breeding suggestions for Egg Moves when owning an ancestor that actually knows the move', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(1); // Missing Bulbasaur

    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet,
      party: [],
      pc: [274], // Owns Nuzleaf
      inventory: [],
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 274,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [13], // Knows Razor Leaf
          storageLocation: 'Box 1',
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        1: {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
          em: {
            13: [274, 1], // Move 13 (Razor Leaf), chain: Nuzleaf -> Bulbasaur
          },
        },
        274: {
          id: 274,
          n: 'Nuzleaf',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
        },
      } as Record<number, PokemonMetadata>,
      localAid: null,
      localEncounters: null,
      missingEncounters: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const strategy = getStrategy(2);
    const result = generateSuggestions(mockSaveData, false, 'gold', mockApiData, strategy);

    const emSuggestion = result.suggestions.find((s) => s.id === 'egg-move-1-13-274');
    expect(emSuggestion).toBeDefined();
    expect(emSuggestion?.description).toBe('Breed your #274 (which knows the Egg Move) to get a #1!');
    expect(emSuggestion?.priority).toBe(88);
  });

  it('should generate breeding suggestions for Egg Moves when owning an ancestor multiple steps back in a 3+ step chain', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(1); // Missing final evolution

    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet,
      party: [],
      pc: [100], // Owns the earliest ancestor (e.g., step 1 in a 3-step chain)
      inventory: [],
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 100,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [], // No moves initially
          storageLocation: 'Box 1',
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        1: {
          id: 1,
          n: 'TestFinal',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
          em: {
            20: [100, 101, 1], // Move 20, chain: 100 -> 101 -> 1
          },
        },
        100: {
          id: 100,
          n: 'TestBase',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
        },
      } as Record<number, PokemonMetadata>,
      localAid: null,
      localEncounters: null,
      missingEncounters: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const strategy = getStrategy(2);
    const result = generateSuggestions(mockSaveData, false, 'gold', mockApiData, strategy);

    const emSuggestion = result.suggestions.find((s) => s.id === 'egg-move-1-20-100');
    expect(emSuggestion).toBeDefined();
    expect(emSuggestion?.description).toBe('Breed your #100 to get a #101 with the Egg Move!');
    expect(emSuggestion?.priority).toBe(82);
    expect(emSuggestion?.pokemonId).toBe(101);
  });

  it('should generate higher priority breeding suggestions for Egg Moves in a 3+ step chain when the early ancestor knows the move', () => {
    const ownedSet = new Set(Array.from({ length: 251 }, (_, i) => i + 1));
    ownedSet.delete(1); // Missing final evolution

    const mockSaveData = {
      generation: 2,
      gameVersion: 'gold',
      trainerName: 'ASH',
      owned: ownedSet,
      party: [],
      pc: [100], // Owns the earliest ancestor
      inventory: [],
      partyDetails: [],
      pcDetails: [
        {
          speciesId: 100,
          level: 20,
          isShiny: false,
          hash: '',
          moves: [20], // Knows the Egg Move
          storageLocation: 'Box 1',
          otName: 'ASH',
        },
      ],
    } as unknown as SaveData;

    const mockApiData = {
      pokemonMetadata: {
        1: {
          id: 1,
          n: 'TestFinal',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
          em: {
            20: [100, 101, 1], // Move 20, chain: 100 -> 101 -> 1
          },
        },
        100: {
          id: 100,
          n: 'TestBase',
          cr: 45,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
        },
      } as Record<number, PokemonMetadata>,
      localAid: null,
      localEncounters: null,
      missingEncounters: {},
      ancestralEncounters: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    const strategy = getStrategy(2);
    const result = generateSuggestions(mockSaveData, false, 'gold', mockApiData, strategy);

    const emSuggestion = result.suggestions.find((s) => s.id === 'egg-move-1-20-100');
    expect(emSuggestion).toBeDefined();
    expect(emSuggestion?.description).toBe('Breed your #100 (which knows the Egg Move) to get a #101!');
    expect(emSuggestion?.priority).toBe(88);
    expect(emSuggestion?.pokemonId).toBe(101);
  });
});
