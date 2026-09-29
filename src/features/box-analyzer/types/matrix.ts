import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';

export interface MatrixRow {
  pokemon: PokemonInstance;
  level: number;
  gender: string | null;
  dvsIvs: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  calculatedIvTotal: number;
  calculatedIvAverage: number;
  nature: string | null;
  hiddenPower: { type: string; power: number } | null;
  isShiny: boolean;
}

export interface MatrixColumn {
  key: string;
  label: string;
  sortable: boolean;
}
