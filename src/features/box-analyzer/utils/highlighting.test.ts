import { describe, expect, it } from 'vitest';
import type { MatrixRow } from '../types/matrix';
import { findBestStats } from './highlighting';

describe('findBestStats', () => {
  it('returns empty object for empty array', () => {
    expect(findBestStats([])).toEqual({});
  });

  it('correctly identifies highest stats among rows', () => {
    const rows = [
      {
        dvsIvs: { hp: 10, atk: 20, def: 30, spa: 5, spd: 15, spe: 25 },
        calculatedIvTotal: 105,
      } as MatrixRow,
      {
        dvsIvs: { hp: 20, atk: 15, def: 25, spa: 10, spd: 20, spe: 10 },
        calculatedIvTotal: 100,
      } as MatrixRow,
      {
        dvsIvs: { hp: 5, atk: 30, def: 10, spa: 25, spd: 5, spe: 30 },
        calculatedIvTotal: 105,
      } as MatrixRow,
    ];

    const result = findBestStats(rows);

    expect(result[0]).toEqual({
      hp: false,
      atk: false,
      def: true, // 30 is max
      spa: false,
      spd: false,
      spe: false,
      calculatedIvTotal: true, // 105 is max
    });

    expect(result[1]).toEqual({
      hp: true, // 20 is max
      atk: false,
      def: false,
      spa: false,
      spd: true, // 20 is max
      spe: false,
      calculatedIvTotal: false,
    });

    expect(result[2]).toEqual({
      hp: false,
      atk: true, // 30 is max
      def: false,
      spa: true, // 25 is max
      spd: false,
      spe: true, // 30 is max
      calculatedIvTotal: true, // 105 is max (tie)
    });
  });

  it('handles single row', () => {
    const rows = [
      {
        dvsIvs: { hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10 },
        calculatedIvTotal: 60,
      } as MatrixRow,
    ];

    const result = findBestStats(rows);
    expect(result[0]).toEqual({
      hp: true,
      atk: true,
      def: true,
      spa: true,
      spd: true,
      spe: true,
      calculatedIvTotal: true,
    });
  });
});
