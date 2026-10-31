import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../saveParser/index';
import { hasPerfectIVsOrDVs } from './IVFilters';

describe('IVFilters', () => {
  describe('hasPerfectIVsOrDVs', () => {
    it('returns true for perfect Gen 3 IVs', () => {
      const p = { ivs: { hp: 31, atk: 31, def: 31, spd: 31, spatk: 31, spdef: 31 } } as PokemonInstance;
      expect(hasPerfectIVsOrDVs(p)).toBe(true);
    });

    it('returns false for imperfect Gen 3 IVs', () => {
      const p = { ivs: { hp: 31, atk: 31, def: 31, spd: 31, spatk: 31, spdef: 30 } } as PokemonInstance;
      expect(hasPerfectIVsOrDVs(p)).toBe(false);
    });

    it('returns true for perfect Gen 1/2 DVs', () => {
      const p = { dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 } } as PokemonInstance;
      expect(hasPerfectIVsOrDVs(p)).toBe(true);
    });

    it('returns false for imperfect Gen 1/2 DVs', () => {
      const p = { dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 14 } } as PokemonInstance;
      expect(hasPerfectIVsOrDVs(p)).toBe(false);
    });

    it('returns false when neither ivs nor dvs are present', () => {
      const p = {} as PokemonInstance;
      expect(hasPerfectIVsOrDVs(p)).toBe(false);
    });
  });
});
