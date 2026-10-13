import type { MatrixRow } from '../types/matrix';

export interface StatHighlights {
  hp: boolean;
  atk: boolean;
  def: boolean;
  spa: boolean;
  spd: boolean;
  spe: boolean;
  calculatedIvTotal: boolean;
}

export function findBestStats(rows: MatrixRow[]): Record<number, StatHighlights> {
  const result: Record<number, StatHighlights> = {};

  if (rows.length === 0) return result;

  const maxStats = {
    hp: -Infinity,
    atk: -Infinity,
    def: -Infinity,
    spa: -Infinity,
    spd: -Infinity,
    spe: -Infinity,
    calculatedIvTotal: -Infinity,
  };

  for (const row of rows) {
    maxStats.hp = Math.max(maxStats.hp, row.dvsIvs.hp);
    maxStats.atk = Math.max(maxStats.atk, row.dvsIvs.atk);
    maxStats.def = Math.max(maxStats.def, row.dvsIvs.def);
    maxStats.spa = Math.max(maxStats.spa, row.dvsIvs.spa);
    maxStats.spd = Math.max(maxStats.spd, row.dvsIvs.spd);
    maxStats.spe = Math.max(maxStats.spe, row.dvsIvs.spe);
    maxStats.calculatedIvTotal = Math.max(maxStats.calculatedIvTotal, row.calculatedIvTotal);
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;

    result[i] = {
      hp: row.dvsIvs.hp === maxStats.hp,
      atk: row.dvsIvs.atk === maxStats.atk,
      def: row.dvsIvs.def === maxStats.def,
      spa: row.dvsIvs.spa === maxStats.spa,
      spd: row.dvsIvs.spd === maxStats.spd,
      spe: row.dvsIvs.spe === maxStats.spe,
      calculatedIvTotal: row.calculatedIvTotal === maxStats.calculatedIvTotal,
    };
  }

  return result;
}
