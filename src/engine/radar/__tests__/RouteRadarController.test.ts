import { describe, expect, it } from 'vitest';
import type { CatchSuggestion, StandardSuggestion } from '../../assistant/strategies/types';
import { extractEncounterAreaRequirements, RouteRadarController, updateHeatmapForArea } from '../RouteRadarController';
import type { RouteRadarHeatmap } from '../types';

describe('RouteRadarController', () => {
  it('should instantiate correctly', () => {
    const controller = new RouteRadarController();
    expect(controller).toBeInstanceOf(RouteRadarController);
  });

  describe('calculateHeatmap', () => {
    it('should return an empty heatmap for an empty array of suggestions', () => {
      const controller = new RouteRadarController();
      const heatmap = controller.calculateHeatmap([]);
      expect(heatmap).toEqual({});
    });

    it('should ignore standard (non-Catch) suggestions', () => {
      const controller = new RouteRadarController();
      const standardSuggestion: StandardSuggestion = {
        id: '1',
        title: 'Evolve Pidgey',
        description: 'Level up',
        priority: 1,
        category: 'Evolve',
      };
      const heatmap = controller.calculateHeatmap([standardSuggestion]);
      expect(heatmap).toEqual({});
    });

    it('should handle a single CatchSuggestion with multiple unique areas', () => {
      const controller = new RouteRadarController();
      const catchSuggestion: CatchSuggestion = {
        id: '2',
        title: 'Catch Pidgey',
        description: 'Wild encounter',
        priority: 1,
        category: 'Catch',
        encounterInfo: {
          // mapId 1 has areaId 10
          1: [{ chance: 50, method: 'grass', minLevel: 2, areaId: 10 }],
          // mapId 2 has areaId 20
          2: [{ chance: 40, method: 'grass', minLevel: 3, areaId: 20 }],
        },
      };

      const heatmap = controller.calculateHeatmap([catchSuggestion]);
      expect(heatmap).toEqual({
        10: { density: 1, requiresMachBike: false, requiresAcroBike: false },
        20: { density: 1, requiresMachBike: false, requiresAcroBike: false },
      });
    });

    it('should not double-count the same areaId within a single CatchSuggestion', () => {
      const controller = new RouteRadarController();
      const catchSuggestion: CatchSuggestion = {
        id: '3',
        title: 'Catch Rattata',
        description: 'Wild encounter',
        priority: 1,
        category: 'Catch',
        encounterInfo: {
          // mapId 1 has areaId 10 twice (e.g. morning/night or different levels)
          1: [
            { chance: 50, method: 'grass', minLevel: 2, areaId: 10 },
            { chance: 30, method: 'grass', minLevel: 4, areaId: 10 },
          ],
        },
      };

      const heatmap = controller.calculateHeatmap([catchSuggestion]);
      // Density score should only increment once for areaId 10
      expect(heatmap).toEqual({ 10: { density: 1, requiresMachBike: false, requiresAcroBike: false } });
    });

    it('should correctly sum density scores for multiple CatchSuggestions on the same area', () => {
      const controller = new RouteRadarController();
      const suggestion1: CatchSuggestion = {
        id: '1',
        title: 'Catch Pidgey',
        description: 'Wild encounter',
        priority: 1,
        category: 'Catch',
        encounterInfo: {
          1: [{ chance: 50, method: 'grass', minLevel: 2, areaId: 10 }],
        },
      };

      const suggestion2: CatchSuggestion = {
        id: '2',
        title: 'Catch Rattata',
        description: 'Wild encounter',
        priority: 1,
        category: 'Catch',
        encounterInfo: {
          2: [{ chance: 50, method: 'grass', minLevel: 2, areaId: 10 }],
        },
      };

      const heatmap = controller.calculateHeatmap([suggestion1, suggestion2]);
      // Both suggestions can be found in area 10, so density should be 2
      expect(heatmap).toEqual({ 10: { density: 2, requiresMachBike: false, requiresAcroBike: false } });
    });

    it('should correctly aggregate bike requirements for an area', () => {
      const controller = new RouteRadarController();
      const catchSuggestion: CatchSuggestion = {
        id: '4',
        title: 'Catch Bagon',
        description: 'Wild encounter',
        priority: 1,
        category: 'Catch',
        encounterInfo: {
          1: [
            { chance: 10, method: 'surf', minLevel: 20, areaId: 10 },
            { chance: 20, method: 'walk', minLevel: 25, areaId: 10, requiresMachBike: true },
          ],
          2: [{ chance: 30, method: 'walk', minLevel: 25, areaId: 20, requiresAcroBike: true }],
        },
      };

      const heatmap = controller.calculateHeatmap([catchSuggestion]);
      expect(heatmap).toEqual({
        10: { density: 1, requiresMachBike: true, requiresAcroBike: false },
        20: { density: 1, requiresMachBike: false, requiresAcroBike: true },
      });
    });

    it('should handle CatchSuggestion without encounterInfo gracefully', () => {
      const controller = new RouteRadarController();
      const suggestion: CatchSuggestion = {
        id: '1',
        title: 'Catch Pidgey',
        description: 'Wild encounter',
        priority: 1,
        category: 'Catch',
        // encounterInfo missing
      };

      const heatmap = controller.calculateHeatmap([suggestion]);
      expect(heatmap).toEqual({});
    });
  });

  describe('extractEncounterAreaRequirements', () => {
    it('returns empty sets when encounterInfo is undefined', () => {
      const result = extractEncounterAreaRequirements(undefined);
      expect(result.uniqueAreaIds.size).toBe(0);
      expect(result.areaBikeReqs.size).toBe(0);
    });

    it('accurately indexes unique area IDs and bike flags from encounter records', () => {
      const encounterInfo: CatchSuggestion['encounterInfo'] = {
        1: [
          { chance: 20, method: 'walk', minLevel: 5, areaId: 101, requiresMachBike: true },
          { chance: 30, method: 'walk', minLevel: 6, areaId: 101, requiresAcroBike: true },
        ],
        2: [{ chance: 10, method: 'surf', minLevel: 15, areaId: 102, requiresMachBike: false }],
      };

      const { uniqueAreaIds, areaBikeReqs } = extractEncounterAreaRequirements(encounterInfo);
      expect(Array.from(uniqueAreaIds)).toEqual([101, 102]);
      expect(areaBikeReqs.get(101)).toEqual({ mach: true, acro: true });
      expect(areaBikeReqs.get(102)).toEqual({ mach: false, acro: false });
    });
  });

  describe('updateHeatmapForArea', () => {
    it('initializes and increments area density without bike requirements', () => {
      const heatmap: RouteRadarHeatmap = {};
      updateHeatmapForArea(heatmap, 50);

      expect(heatmap[50]).toEqual({
        density: 1,
        requiresMachBike: false,
        requiresAcroBike: false,
      });

      updateHeatmapForArea(heatmap, 50);
      expect(heatmap[50]?.density).toBe(2);
    });

    it('merges bike requirement flags correctly into heatmap entries', () => {
      const heatmap: RouteRadarHeatmap = {};
      updateHeatmapForArea(heatmap, 50, { mach: true, acro: false });
      expect(heatmap[50]).toEqual({
        density: 1,
        requiresMachBike: true,
        requiresAcroBike: false,
      });

      updateHeatmapForArea(heatmap, 50, { mach: false, acro: true });
      expect(heatmap[50]).toEqual({
        density: 2,
        requiresMachBike: true,
        requiresAcroBike: true,
      });
    });
  });
});
