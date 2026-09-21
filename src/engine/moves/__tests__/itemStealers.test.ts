import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '../../../db/schema';
import type { PokemonInstance } from '../../saveParser/parsers/common';
import { COVET_MOVE_ID, findAllItemStealers, findItemStealers, THIEF_MOVE_ID } from '../itemStealers';

describe('itemStealers', () => {
  const mockPokemon: PokemonInstance[] = [
    {
      speciesId: 1,
      level: 10,
      isShiny: false,
      moves: [1, 2, THIEF_MOVE_ID, 4],
      storageLocation: 'Party',
      hash: 'hash1',
    },
    {
      speciesId: 2,
      level: 20,
      isShiny: false,
      moves: [1, 2, 3, COVET_MOVE_ID],
      storageLocation: 'PC',
      hash: 'hash2',
    },
    {
      speciesId: 3,
      level: 30,
      isShiny: false,
      moves: [1, 2, 3, 4],
      storageLocation: 'PC',
      hash: 'hash3',
    },
  ];

  const mockMetadataMap = new Map<number, PokemonMetadata>([
    [1, { id: 1, n: 'Bulbasaur', cr: 45, baby: false, eto: [], efrm: [], det: [] }],
    [2, { id: 2, n: 'Ivysaur', cr: 45, baby: false, eto: [], efrm: [], det: [] }],
  ]);

  describe('findItemStealers', () => {
    it('should identify Pokemon with Thief', () => {
      const p = mockPokemon[0];
      if (!p) throw new Error('Mock Pokemon not found');
      const stealers = findItemStealers([p]);
      expect(stealers).toHaveLength(1);
      expect(stealers[0]?.stealingMoveId).toBe(THIEF_MOVE_ID);
      expect(stealers[0]?.instance.speciesId).toBe(1);
    });

    it('should identify Pokemon with Covet', () => {
      const p = mockPokemon[1];
      if (!p) throw new Error('Mock Pokemon not found');
      const stealers = findItemStealers([p]);
      expect(stealers).toHaveLength(1);
      expect(stealers[0]?.stealingMoveId).toBe(COVET_MOVE_ID);
      expect(stealers[0]?.instance.speciesId).toBe(2);
    });

    it('should ignore Pokemon without Thief or Covet', () => {
      const p = mockPokemon[2];
      if (!p) throw new Error('Mock Pokemon not found');
      const stealers = findItemStealers([p]);
      expect(stealers).toHaveLength(0);
    });

    it('should attach metadata if provided', () => {
      const p = mockPokemon[0];
      if (!p) throw new Error('Mock Pokemon not found');
      const stealers = findItemStealers([p], mockMetadataMap);
      expect(stealers[0]?.metadata).toBeDefined();
      expect(stealers[0]?.metadata?.n).toBe('Bulbasaur');
    });

    it('should handle instances without moves array safely', () => {
      const p = mockPokemon[0];
      if (!p) throw new Error('Mock Pokemon not found');
      const stealerlessPokemon: PokemonInstance = { ...p, moves: [] };
      const stealers = findItemStealers([stealerlessPokemon]);
      expect(stealers).toHaveLength(0);
    });
  });

  describe('findAllItemStealers', () => {
    it('should correctly separate party and PC item stealers', () => {
      const p1 = mockPokemon[0];
      const p2 = mockPokemon[1];
      const p3 = mockPokemon[2];
      if (!p1 || !p2 || !p3) throw new Error('Mock Pokemon not found');

      const party = [p1];
      const pc = [p2, p3];

      const result = findAllItemStealers(party, pc, mockMetadataMap);

      expect(result.party).toHaveLength(1);
      expect(result.party[0]?.stealingMoveId).toBe(THIEF_MOVE_ID);
      expect(result.party[0]?.metadata?.n).toBe('Bulbasaur');

      expect(result.pc).toHaveLength(1);
      expect(result.pc[0]?.stealingMoveId).toBe(COVET_MOVE_ID);
      expect(result.pc[0]?.metadata?.n).toBe('Ivysaur');
    });
  });
});
