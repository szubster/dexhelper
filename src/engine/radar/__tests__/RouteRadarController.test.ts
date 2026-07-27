import { describe, expect, it } from 'vitest';
import type { CatchSuggestion, StandardSuggestion } from '../../assistant/strategies/types';
import { RouteRadarController } from '../RouteRadarController';

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
        10: 1,
        20: 1,
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
      expect(heatmap).toEqual({ 10: 1 });
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
      expect(heatmap).toEqual({ 10: 2 });
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
});
