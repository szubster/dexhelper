import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import type { MatrixColumn, MatrixRow } from './matrix';

describe('Box Analyzer Matrix Types', () => {
  it('should compile correctly with valid MatrixRow', () => {
    const mockPokemon: PokemonInstance = {
      speciesId: 25,
      level: 10,
      isShiny: true,
      moves: [1, 2, 3, 4],
      storageLocation: 'Box 1',
      hash: 'mock-hash',
    };

    const row: MatrixRow = {
      pokemon: mockPokemon,
      level: 10,
      gender: 'M',
      dvsIvs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
      calculatedIvTotal: 186,
      calculatedIvAverage: 31,
      nature: 'Jolly',
      hiddenPower: { type: 'Dark', power: 70 },
      isShiny: true,
    };

    expect(row.level).toBe(10);
    expect(row.dvsIvs.hp).toBe(31);
    expect(row.calculatedIvTotal).toBe(186);
  });

  it('should compile correctly with valid MatrixColumn', () => {
    const col: MatrixColumn = {
      key: 'level',
      label: 'Level',
      sortable: true,
    };

    expect(col.key).toBe('level');
    expect(col.sortable).toBe(true);
  });
});
