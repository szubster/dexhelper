import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../../../../db/PokeDB';
import type { ItemMetadata } from '../../../../db/schema';
import { EVO_TRIGGER } from '../../../../db/schema';
import type { PokemonInstance, SaveData } from '../../../saveParser/index';
import { getGameItemId } from '../../strategies/items/gameItemMap';
import type { Suggestion } from '../../strategies/types';
import type { AssistantApiData } from '../../suggestionEngineTypes';
import { findInstanceHoldingItem, generateEvolutionSuggestions } from '../evolutionGenerator';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getItem: vi.fn<(id: number) => Promise<ItemMetadata | undefined>>(),
  },
}));

vi.mock('../../strategies/items/gameItemMap', () => ({
  getGameItemId: vi.fn<(id: number, gen: number) => Promise<number>>(),
}));

describe('evolutionGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getGameItemId).mockImplementation(async (id: number) => id);
    vi.mocked(pokeDB.getItem).mockImplementation(async (id: number) => ({ id, name: `Item-${id}` }) as ItemMetadata);
  });

  describe('findInstanceHoldingItem', () => {
    it('returns the instance holding the specified item', () => {
      const inst1 = { speciesId: 10, item: 100 } as PokemonInstance;
      const inst2 = { speciesId: 20, item: 200 } as PokemonInstance;
      const map = new Map<number, PokemonInstance[]>([
        [10, [inst1]],
        [20, [inst2]],
      ]);

      expect(findInstanceHoldingItem(map, 200)).toBe(inst2);
    });

    it('returns undefined if no instance holds the specified item', () => {
      const inst1 = { speciesId: 10, item: 100 } as PokemonInstance;
      const map = new Map<number, PokemonInstance[]>([[10, [inst1]]]);

      expect(findInstanceHoldingItem(map, 999)).toBeUndefined();
    });
  });

  describe('generateEvolutionSuggestions', () => {
    const mockSaveData: SaveData = {
      generation: 3,
      trainerName: 'Ash',
      inventory: [],
      pcItems: [],
      party: [{ speciesId: 25 }],
    } as unknown as SaveData;

    it('handles empty queryTargets or missing metadata gracefully', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {},
      } as unknown as AssistantApiData;

      await generateEvolutionSuggestions([999], mockSaveData, apiData, new Map(), suggestions, 'ruby', new Set([999]));

      expect(suggestions).toHaveLength(0);
    });

    it('skips when player does not own any ancestor species', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          6: {
            id: 6,
            efrm: [5, 4], // Charizard from Charmeleon, Charmander
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, ml: 36 }],
          },
        },
      } as unknown as AssistantApiData;

      await generateEvolutionSuggestions([6], mockSaveData, apiData, new Map(), suggestions, 'ruby', new Set([6]));

      expect(suggestions).toHaveLength(0);
    });

    it('skips final stage when intermediate pre-evolution is also missing to avoid duplicate suggestions', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          6: {
            id: 6,
            efrm: [5, 4], // Charizard from Charmeleon (5), Charmander (4)
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, ml: 36 }],
          },
          5: {
            id: 5,
            efrm: [4],
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, ml: 16 }],
          },
        },
      } as unknown as AssistantApiData;

      const instancesBySpecies = new Map<number, PokemonInstance[]>([
        [4, [{ speciesId: 4, level: 10 } as PokemonInstance]], // Owns Charmander
      ]);

      const missingIds = new Set([5, 6]); // Both Charmeleon and Charizard are missing

      await generateEvolutionSuggestions(
        [6], // Query Charizard
        mockSaveData,
        apiData,
        instancesBySpecies,
        suggestions,
        'ruby',
        missingIds,
      );

      expect(suggestions).toHaveLength(0);
    });

    it('filters out Yellow Pikachu when owned by trainerName in Yellow version', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          26: {
            id: 26,
            efrm: [25], // Raichu from Pikachu
            det: [{ tr: EVO_TRIGGER.USE_ITEM, item: 33 }], // Thunder Stone
          },
        },
      } as unknown as AssistantApiData;

      const yellowPikachu = { speciesId: 25, otName: 'Ash', level: 20 } as PokemonInstance;
      const instancesBySpecies = new Map<number, PokemonInstance[]>([[25, [yellowPikachu]]]);

      await generateEvolutionSuggestions(
        [26],
        { ...mockSaveData, trainerName: 'Ash' },
        apiData,
        instancesBySpecies,
        suggestions,
        'yellow',
        new Set([26]),
      );

      expect(suggestions).toHaveLength(0);
    });

    it('generates level-up evolution suggestions (ready vs needs level)', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          2: {
            id: 2,
            efrm: [1],
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, ml: 16 }],
          },
        },
      } as unknown as AssistantApiData;

      const lowLevelBulba = { speciesId: 1, level: 10 } as PokemonInstance;
      const instancesBySpecies = new Map<number, PokemonInstance[]>([[1, [lowLevelBulba]]]);

      await generateEvolutionSuggestions(
        [2],
        mockSaveData,
        apiData,
        instancesBySpecies,
        suggestions,
        'ruby',
        new Set([2]),
      );

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.id).toBe('evo-lvl-2');
      expect(suggestions[0]?.priority).toBe(75);

      // Test high level (ready)
      const highLevelBulba = { speciesId: 1, level: 18 } as PokemonInstance;
      const readySuggestions: Suggestion[] = [];
      await generateEvolutionSuggestions(
        [2],
        mockSaveData,
        apiData,
        new Map([[1, [highLevelBulba]]]),
        readySuggestions,
        'ruby',
        new Set([2]),
      );

      expect(readySuggestions[0]?.priority).toBe(90);
    });

    it('handles Tyrogue RPS stat requirements (Attack > Defense)', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          106: {
            id: 106, // Hitmonlee
            efrm: [236],
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, ml: 20, rps: 1 }], // Needs Atk > Def
          },
        },
      } as unknown as AssistantApiData;

      const tyrogueHighAtk = {
        speciesId: 236,
        level: 20,
        dvs: { atk: 15, def: 0 },
        statExp: { atk: 65535, def: 0 },
      } as unknown as PokemonInstance;

      await generateEvolutionSuggestions(
        [106],
        mockSaveData,
        apiData,
        new Map([[236, [tyrogueHighAtk]]]),
        suggestions,
        'ruby',
        new Set([106]),
      );

      expect(suggestions[0]?.priority).toBe(90);
    });

    it('handles happiness/friendship evolution with time-of-day requirements', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          196: {
            id: 196, // Espeon
            efrm: [133],
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, mh: 220, time: 1 }], // Day happiness
          },
        },
      } as unknown as AssistantApiData;

      const happyEevee = { speciesId: 133, level: 25, friendship: 230 } as PokemonInstance;

      await generateEvolutionSuggestions(
        [196],
        mockSaveData,
        apiData,
        new Map([[133, [happyEevee]]]),
        suggestions,
        'ruby',
        new Set([196]),
      );

      expect(suggestions[0]?.id).toBe('evo-happy-196');
      expect(suggestions[0]?.priority).toBe(90);
      expect(suggestions[0]?.description).toContain('day');
    });

    it('handles generic level-up evolution with no level/happiness requirement', async () => {
      const suggestions: Suggestion[] = [];
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          999: {
            id: 999,
            efrm: [998],
            det: [{ tr: EVO_TRIGGER.LEVEL_UP, time: 2 }], // Night level up
          },
        },
      } as unknown as AssistantApiData;

      await generateEvolutionSuggestions(
        [999],
        mockSaveData,
        apiData,
        new Map([[998, [{ speciesId: 998, level: 5 } as PokemonInstance]]]),
        suggestions,
        'ruby',
        new Set([999]),
      );

      expect(suggestions[0]?.id).toBe('evo-lvl-any-999');
      expect(suggestions[0]?.priority).toBe(70);
      expect(suggestions[0]?.description).toContain('night');
    });

    it('generates item evolution suggestions when item is in inventory or held', async () => {
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          134: {
            id: 134, // Vaporeon
            efrm: [133],
            det: [{ tr: EVO_TRIGGER.USE_ITEM, item: 50 }], // Water Stone
          },
        },
      } as unknown as AssistantApiData;

      const instancesBySpecies = new Map<number, PokemonInstance[]>([
        [133, [{ speciesId: 133, level: 10 } as PokemonInstance]],
      ]);

      // Item in inventory
      const suggestions1: Suggestion[] = [];
      const saveDataWithItem: SaveData = {
        ...mockSaveData,
        inventory: [{ id: 50, quantity: 1 }],
      } as unknown as SaveData;

      await generateEvolutionSuggestions(
        [134],
        saveDataWithItem,
        apiData,
        instancesBySpecies,
        suggestions1,
        'ruby',
        new Set([134]),
      );

      expect(suggestions1[0]?.priority).toBe(95);

      // Item held by another instance
      const suggestions2: Suggestion[] = [];
      const instancesWithHolding = new Map<number, PokemonInstance[]>([
        [133, [{ speciesId: 133, level: 10 } as PokemonInstance]],
        [25, [{ speciesId: 25, level: 20, item: 50 } as PokemonInstance]],
      ]);

      await generateEvolutionSuggestions(
        [134],
        mockSaveData,
        apiData,
        instancesWithHolding,
        suggestions2,
        'ruby',
        new Set([134]),
      );

      expect(suggestions2[0]?.priority).toBe(95);
      expect(suggestions2[0]?.description).toContain('Take the');
    });

    it('generates trade evolution suggestions (simple vs held item)', async () => {
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          65: {
            id: 65, // Alakazam
            efrm: [64],
            det: [{ tr: EVO_TRIGGER.TRADE }],
          },
          212: {
            id: 212, // Scizor
            efrm: [123],
            det: [{ tr: EVO_TRIGGER.TRADE, held: 198 }], // Metal Coat
          },
        },
      } as unknown as AssistantApiData;

      // Simple trade
      const suggestions1: Suggestion[] = [];
      await generateEvolutionSuggestions(
        [65],
        mockSaveData,
        apiData,
        new Map([[64, [{ speciesId: 64, level: 20 } as PokemonInstance]]]),
        suggestions1,
        'ruby',
        new Set([65]),
      );

      expect(suggestions1[0]?.id).toBe('evo-trade-65');
      expect(suggestions1[0]?.priority).toBe(85);

      // Trade with held item on pre-evolution
      const suggestions2: Suggestion[] = [];
      const preEvoHolding = { speciesId: 123, level: 20, item: 198 } as PokemonInstance;
      await generateEvolutionSuggestions(
        [212],
        mockSaveData,
        apiData,
        new Map([[123, [preEvoHolding]]]),
        suggestions2,
        'ruby',
        new Set([212]),
      );

      expect(suggestions2[0]?.id).toBe('evo-trade-held-212');
      expect(suggestions2[0]?.priority).toBe(90);
      expect(suggestions2[0]?.description).toContain('already holding');
    });

    it('generates Shedinja special evolution suggestions', async () => {
      const apiData: AssistantApiData = {
        pokemonMetadata: {
          292: {
            id: 292, // Shedinja
            efrm: [290],
            det: [{ tr: EVO_TRIGGER.SHED }],
          },
        },
      } as unknown as AssistantApiData;

      // Gen 3: Ready with empty party slot (no Pokeball requirement in Gen 3)
      const suggestionsGen3: Suggestion[] = [];
      const saveDataGen3 = {
        ...mockSaveData,
        generation: 3,
        party: [{ speciesId: 290 }], // 1 member, 5 free slots
      } as unknown as SaveData;

      await generateEvolutionSuggestions(
        [292],
        saveDataGen3,
        apiData,
        new Map([[290, [{ speciesId: 290, level: 20 } as PokemonInstance]]]),
        suggestionsGen3,
        'ruby',
        new Set([292]),
      );

      expect(suggestionsGen3[0]?.id).toBe('evo-shed-292');
      expect(suggestionsGen3[0]?.priority).toBe(90);

      // Gen 3: Ready but full party
      const suggestionsFullParty: Suggestion[] = [];
      const saveDataFullParty = {
        ...mockSaveData,
        generation: 3,
        party: [1, 2, 3, 4, 5, 6].map((id) => ({ speciesId: id })),
      } as unknown as SaveData;

      await generateEvolutionSuggestions(
        [292],
        saveDataFullParty,
        apiData,
        new Map([[290, [{ speciesId: 290, level: 20 } as PokemonInstance]]]),
        suggestionsFullParty,
        'ruby',
        new Set([292]),
      );

      expect(suggestionsFullParty[0]?.description).toContain('deposit a Pokémon in the PC');
    });
  });
});
