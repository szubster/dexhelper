import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { pokeapi } from './pokeapi';

describe('pokeapi', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  describe('success cases', () => {
    it('returns json on successful fetch', async () => {
      const mockData = { name: 'bulbasaur' };
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await pokeapi.getPokemonByName('bulbasaur');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    });
  });

  describe('error handling', () => {
    it('getPokemonsList throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.getPokemonsList({ limit: 10, offset: 0 })).rejects.toThrow('Network response was not ok');
    });

    it('getPokemonEncounterAreasByName throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.getPokemonEncounterAreasByName('pikachu')).rejects.toThrow('Network response was not ok');
    });

    it('getPokemonByName throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.getPokemonByName('mewtwo')).rejects.toThrow('Network response was not ok');
    });

    it('getPokemonSpeciesByName throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.getPokemonSpeciesByName(151)).rejects.toThrow('Network response was not ok');
    });

    it('resource throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.resource('https://pokeapi.co/api/v2/evolution-chain/1/')).rejects.toThrow(
        'Network response was not ok',
      );
    });

    it('getItem throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.getItem(1)).rejects.toThrow('Network response was not ok');
    });

    it('getLocationArea throws when response is not ok', async () => {
      (global.fetch as import('vitest').Mock).mockResolvedValue({
        ok: false,
      });

      await expect(pokeapi.getLocationArea('pallet-town-area')).rejects.toThrow('Network response was not ok');
    });
  });
});
