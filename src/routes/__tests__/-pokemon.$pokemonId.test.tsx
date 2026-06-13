import { describe, expect, it } from 'vitest';
import { Route } from '../pokemon.$pokemonId';

describe('Pokemon Route', () => {
  describe('validateSearch', () => {
    const validateSearch = Route.options.validateSearch as (search: Record<string, unknown>) => { from: string };

    it('returns the string from search', () => {
      expect(validateSearch({ from: '/pokedex' })).toEqual({ from: '/pokedex' });
    });

    it('returns default "/" if from is not a string', () => {
      expect(validateSearch({ from: 123 })).toEqual({ from: '/' });
      expect(validateSearch({ from: null })).toEqual({ from: '/' });
      expect(validateSearch({})).toEqual({ from: '/' });
    });
  });
});
