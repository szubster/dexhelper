import type { QueryFunctionContext } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { getDB } from '../db/PokeDB';
import type { PokeDBSchema } from '../db/schema';
import { pokemonListQueryOptions } from './pokemonQueries';

vi.mock('../db/PokeDB', () => ({
  getDB: vi.fn<() => Promise<import('idb').IDBPDatabase<PokeDBSchema>>>(),
}));

describe('pokemonQueries', () => {
  describe('pokemonListQueryOptions', () => {
    it('should have correct queryKey', () => {
      expect(pokemonListQueryOptions.queryKey).toEqual(['pokemonList']);
    });

    it('should fetch, map, and sort pokemon data correctly', async () => {
      const mockGetAll = vi.fn<() => Promise<Array<{ id: number; n: string }>>>().mockResolvedValue([
        { id: 2, n: 'ivysaur' },
        { id: 1, n: 'bulbasaur' },
        { id: 3, n: 'venusaur' },
      ]);

      vi.mocked(getDB).mockResolvedValue({
        getAll: mockGetAll,
      } as unknown as import('idb').IDBPDatabase<PokeDBSchema>);

      const context = {
        queryKey: ['pokemonList'] as string[],
        signal: new AbortController().signal,
        meta: undefined,
      } as unknown as QueryFunctionContext<string[]>;

      const result = await pokemonListQueryOptions.queryFn?.(context);

      expect(mockGetAll).toHaveBeenCalledWith('pokemon');
      expect(result).toEqual([
        { id: 1, name: 'Bulbasaur' },
        { id: 2, name: 'Ivysaur' },
        { id: 3, name: 'Venusaur' },
      ]);
    });
  });
});
