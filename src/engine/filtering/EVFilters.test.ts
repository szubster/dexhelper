import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../saveParser/parsers/common';
import { evaluateEVOperator, filterByEVs, getEVValue, sortByEVs } from './EVFilters';

describe('EVFilters', () => {
  const p1 = { evs: { hp: 10, atk: 20, def: 30, spa: 40, spd: 50, spe: 60 } } as unknown as PokemonInstance;
  const p2 = { evs: { hp: 5, atk: 5, def: 5, spa: 5, spd: 5, spe: 5 } } as unknown as PokemonInstance;
  const p3 = {} as unknown as PokemonInstance;

  describe('getEVValue', () => {
    it('returns the correct stat values', () => {
      expect(getEVValue(p1, 'hp')).toBe(10);
      expect(getEVValue(p1, 'attack')).toBe(20);
      expect(getEVValue(p1, 'defense')).toBe(30);
      expect(getEVValue(p1, 'specialAttack')).toBe(40);
      expect(getEVValue(p1, 'specialDefense')).toBe(50);
      expect(getEVValue(p1, 'speed')).toBe(60);
      expect(getEVValue(p1, 'total')).toBe(210);
    });

    it('returns 0 when evs are missing', () => {
      expect(getEVValue(p3, 'hp')).toBe(0);
      expect(getEVValue(p3, 'total')).toBe(0);
    });
  });

  describe('evaluateEVOperator', () => {
    it('evaluates eq', () => {
      expect(evaluateEVOperator(10, 'eq', 10)).toBe(true);
      expect(evaluateEVOperator(10, 'eq', 11)).toBe(false);
    });
    it('evaluates gt', () => {
      expect(evaluateEVOperator(11, 'gt', 10)).toBe(true);
      expect(evaluateEVOperator(10, 'gt', 10)).toBe(false);
    });
    it('evaluates lt', () => {
      expect(evaluateEVOperator(9, 'lt', 10)).toBe(true);
      expect(evaluateEVOperator(10, 'lt', 10)).toBe(false);
    });
    it('evaluates gte', () => {
      expect(evaluateEVOperator(10, 'gte', 10)).toBe(true);
      expect(evaluateEVOperator(9, 'gte', 10)).toBe(false);
    });
    it('evaluates lte', () => {
      expect(evaluateEVOperator(10, 'lte', 10)).toBe(true);
      expect(evaluateEVOperator(11, 'lte', 10)).toBe(false);
    });
  });

  describe('filterByEVs', () => {
    const list = [p1, p2, p3];

    it('returns the same list if no conditions are provided', () => {
      expect(filterByEVs(list, {})).toEqual(list);
    });

    it('filters correctly based on condition', () => {
      const result = filterByEVs(list, { conditions: [{ stat: 'hp', operator: 'gt', value: 5 }] });
      expect(result.length).toBe(1);
      expect(result[0]).toBe(p1);
    });

    it('handles missing evs by treating them as 0', () => {
      const result = filterByEVs(list, { conditions: [{ stat: 'hp', operator: 'eq', value: 0 }] });
      expect(result.length).toBe(1);
      expect(result[0]).toBe(p3);
    });
  });

  describe('sortByEVs', () => {
    const list = [p1, p2, p3];

    it('sorts descending correctly', () => {
      const result = sortByEVs(list, { stat: 'total', direction: 'desc' });
      expect(result[0]).toBe(p1);
      expect(result[1]).toBe(p2);
      expect(result[2]).toBe(p3);
    });

    it('sorts ascending correctly', () => {
      const result = sortByEVs(list, { stat: 'total', direction: 'asc' });
      expect(result[0]).toBe(p3);
      expect(result[1]).toBe(p2);
      expect(result[2]).toBe(p1);
    });
  });
});
