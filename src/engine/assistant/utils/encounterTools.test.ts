import { beforeEach, describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/index';
import type { CatchSuggestion, Suggestion } from '../strategies/types';
import { extractPlayerTools, filterSuggestionsByMissingTools, type PlayerTools } from './encounterTools';

describe('encounterTools', () => {
  describe('extractPlayerTools', () => {
    it('should return false for all tools if inventory, pcItems, and moves are empty', () => {
      const saveData: SaveData = {
        inventory: [],
        pcItems: [],
        // ... other properties not relevant for this test
      } as unknown as SaveData;
      const allInstances: PokemonInstance[] = [];

      const tools = extractPlayerTools(saveData, allInstances);

      expect(tools).toEqual({
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      });
    });

    it('should extract tools from inventory correctly', () => {
      const saveData: SaveData = {
        inventory: [
          { id: 192, quantity: 1 }, // Headbutt TM
          { id: 198, quantity: 1 }, // Rock Smash TM/HM
          { id: 399, quantity: 1 }, // Surf HM
          { id: 52, quantity: 1 }, // Old Rod (gen 1/2)
          { id: 53, quantity: 1 }, // Good Rod (gen 1/2)
          { id: 54, quantity: 1 }, // Super Rod (gen 1/2)
        ],
        pcItems: [],
      } as unknown as SaveData;
      const allInstances: PokemonInstance[] = [];

      const tools = extractPlayerTools(saveData, allInstances);

      expect(tools).toEqual({
        hasHeadbutt: true,
        hasRockSmash: true,
        hasSurf: true,
        hasOldRod: true,
        hasGoodRod: true,
        hasSuperRod: true,
      });
    });

    it('should extract tools from pcItems correctly', () => {
      const saveData: SaveData = {
        inventory: [],
        pcItems: [
          { id: 192, quantity: 1 }, // Headbutt TM
          { id: 198, quantity: 1 }, // Rock Smash TM/HM
          { id: 399, quantity: 1 }, // Surf HM
          { id: 260, quantity: 1 }, // Old Rod (gen 3)
          { id: 261, quantity: 1 }, // Good Rod (gen 3)
          { id: 262, quantity: 1 }, // Super Rod (gen 3)
        ],
      } as unknown as SaveData;
      const allInstances: PokemonInstance[] = [];

      const tools = extractPlayerTools(saveData, allInstances);

      expect(tools).toEqual({
        hasHeadbutt: true,
        hasRockSmash: true,
        hasSurf: true,
        hasOldRod: true,
        hasGoodRod: true,
        hasSuperRod: true,
      });
    });

    it('should extract tools from pokemon moves correctly', () => {
      const saveData: SaveData = {
        inventory: [],
        pcItems: [],
      } as unknown as SaveData;
      const allInstances: PokemonInstance[] = [
        { moves: [29, 249, 57] } as unknown as PokemonInstance, // Headbutt, Rock Smash, Surf
      ];

      const tools = extractPlayerTools(saveData, allInstances);

      expect(tools).toEqual({
        hasHeadbutt: true,
        hasRockSmash: true,
        hasSurf: true,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      });
    });

    it('should not extract tools if quantity is 0', () => {
      const saveData: SaveData = {
        inventory: [{ id: 192, quantity: 0 }],
        pcItems: [{ id: 198, quantity: 0 }],
      } as unknown as SaveData;
      const allInstances: PokemonInstance[] = [];

      const tools = extractPlayerTools(saveData, allInstances);

      expect(tools.hasHeadbutt).toBe(false);
      expect(tools.hasRockSmash).toBe(false);
    });

    it('should ignore missing arrays (undefined)', () => {
      const saveData: SaveData = {} as unknown as SaveData;
      const allInstances: PokemonInstance[] = [{} as unknown as PokemonInstance];

      const tools = extractPlayerTools(saveData, allInstances);

      expect(tools.hasHeadbutt).toBe(false);
    });
  });

  describe('filterSuggestionsByMissingTools', () => {
    let baseCatchSuggestion: CatchSuggestion;

    beforeEach(() => {
      baseCatchSuggestion = {
        id: 'test',
        title: 'Test Catch',
        description: 'Test message',
        priority: 100,
        category: 'Catch',
        encounterInfo: {},
        pokemonIds: [1],
      };
    });

    it('should do nothing if category is not Catch', () => {
      const suggestions: Suggestion[] = [
        {
          id: 'test-trade',
          title: 'Test Trade',
          description: 'Test message',
          priority: 100,
          category: 'Trade',
          pokemonIds: [1],
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(100);
      expect(localPids.has(1)).toBe(true);
    });

    it('should do nothing if there is no encounterInfo', () => {
      const suggestionWithoutEncounter = { ...baseCatchSuggestion };
      delete suggestionWithoutEncounter.encounterInfo;
      const suggestions: Suggestion[] = [suggestionWithoutEncounter as CatchSuggestion];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(100);
    });

    it('should keep suggestion if player has required tool', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          encounterInfo: {
            '1': [{ method: 'headbutt', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 }],
          },
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: true,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(100);
      expect(suggestions[0]?.warning).toBeUndefined();
    });

    it('should penalize suggestion if player lacks required tool', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          encounterInfo: {
            '1': [{ method: 'headbutt', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 }],
          },
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(45);
      expect(suggestions[0]?.warning).toBe('Requires Headbutt');
      // Local pid is NOT deleted because we keep the suggestion (penalized)
      expect(localPids.has(1)).toBe(true);
    });

    it('should keep suggestion unpenalized if at least one method is accessible', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          encounterInfo: {
            '1': [
              { method: 'headbutt', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 }, // Inaccessible
              { method: 'walk', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 }, // Accessible
            ],
          },
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(100);
      expect(suggestions[0]?.warning).toBeUndefined();
    });

    it('should completely remove suggestion if NO valid encounter remains (e.g. empty details array)', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          encounterInfo: {},
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(0);
      expect(localPids.has(1)).toBe(false); // Should be deleted
    });

    it('should correctly penalize and join multiple missing tools', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          encounterInfo: {
            '1': [
              { method: 'headbutt', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 },
              { method: 'surf', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 },
            ],
          },
          warning: 'Some previous warning',
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(45);
      expect(suggestions[0]?.warning).toBe('Some previous warning, Requires Headbutt or Surf');
    });

    it('should correctly remove filtered pids from pokemonIds', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          pokemonIds: [1, 2],
          encounterInfo: {
            '1': [{ method: 'headbutt', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 }],
            // pid 2 is missing from encounterInfo
          },
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1, 2]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.pokemonIds).toEqual([1]);
      expect(localPids.has(1)).toBe(true);
      expect(localPids.has(2)).toBe(false);
    });

    it('should completely remove suggestion if NO valid encounter remains and suggestion has single pokemonId', () => {
      const singlePidSuggestion: CatchSuggestion = {
        id: 'test-single',
        title: 'Test Catch',
        description: 'Test message',
        priority: 100,
        category: 'Catch',
        encounterInfo: {},
        pokemonId: 1, // Using pokemonId instead of pokemonIds
      };

      const suggestions: Suggestion[] = [singlePidSuggestion];
      const playerTools: PlayerTools = {
        hasHeadbutt: false,
        hasRockSmash: false,
        hasSurf: false,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(0);
      expect(localPids.has(1)).toBe(false); // Should be deleted
    });

    it('should penalize suggestion for all fishing rods and rock smash', () => {
      const suggestions: Suggestion[] = [
        {
          ...baseCatchSuggestion,
          encounterInfo: {
            '1': [
              { method: 'old-rod', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 },
              { method: 'good-rod', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 },
              { method: 'super-rod', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 },
              { method: 'rock-smash', chance: 10, minLevel: 5, maxLevel: 5, areaId: 1 },
            ],
          },
        },
      ];
      const playerTools: PlayerTools = {
        hasHeadbutt: true,
        hasRockSmash: false,
        hasSurf: true,
        hasOldRod: false,
        hasGoodRod: false,
        hasSuperRod: false,
      };
      const localPids = new Set<number>([1]);

      filterSuggestionsByMissingTools(suggestions, playerTools, localPids);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]?.priority).toBe(45);
      expect(suggestions[0]?.warning).toBe('Requires Old Rod or Good Rod or Super Rod or Rock Smash');
    });
  });
});
