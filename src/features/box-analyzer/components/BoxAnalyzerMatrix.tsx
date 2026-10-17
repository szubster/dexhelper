import { cn } from '../../../utils/cn';
import type { MatrixColumn, MatrixRow } from '../types/matrix';

import { findBestStats } from '../utils/highlighting';

interface BoxAnalyzerMatrixProps {
  data: MatrixRow[];
  columns: MatrixColumn[];
}

export function BoxAnalyzerMatrix({ data, columns }: BoxAnalyzerMatrixProps) {
  const highlights = findBestStats(data);

  const getStatClass = (baseClass: string, isBest: boolean | undefined) =>
    cn(
      baseClass,
      'rounded-none border border-transparent px-1 transition-colors',
      isBest && 'border-emerald-500 border-dashed bg-emerald-900/30 font-bold text-emerald-400',
    );

  return (
    <div className="tactical-panel w-full overflow-x-auto border-cyan-500/30 p-2">
      <table className="w-full text-left font-mono text-xs text-zinc-300">
        <thead>
          <tr className="border-cyan-500/30 border-b border-dashed">
            {columns.map((col) => (
              <th key={col.key} className="p-2 font-bold text-cyan-500 uppercase">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable and required for duplicates
              key={`${row.pokemon.speciesId}-${idx}`}
              className={cn(
                'border-zinc-800/80 border-b border-dashed transition-colors hover:bg-zinc-900/80',
                idx === data.length - 1 && 'border-none',
              )}
            >
              <td className="p-2">Lvl {row.level}</td>
              <td className="p-2">{row.gender || '-'}</td>
              <td className="p-2">
                <span className={getStatClass('text-emerald-400', highlights[idx]?.hp)}>{row.dvsIvs.hp}</span>/
                <span className={getStatClass('text-amber-400', highlights[idx]?.atk)}>{row.dvsIvs.atk}</span>/
                <span className={getStatClass('text-blue-400', highlights[idx]?.def)}>{row.dvsIvs.def}</span>/
                <span className={getStatClass('text-purple-400', highlights[idx]?.spa)}>{row.dvsIvs.spa}</span>/
                <span className={getStatClass('text-pink-400', highlights[idx]?.spd)}>{row.dvsIvs.spd}</span>/
                <span className={getStatClass('text-cyan-400', highlights[idx]?.spe)}>{row.dvsIvs.spe}</span>
              </td>
              <td className="p-2">
                <span className={getStatClass('text-emerald-500', highlights[idx]?.calculatedIvTotal)}>
                  {row.calculatedIvTotal}
                </span>{' '}
                / <span className="text-cyan-500">{row.calculatedIvAverage.toFixed(1)}</span>
              </td>
              <td className="p-2">{row.nature || '-'}</td>
              <td className="p-2">{row.hiddenPower ? `${row.hiddenPower.type} (${row.hiddenPower.power})` : '-'}</td>
              <td className="p-2 text-amber-500">{row.isShiny ? '★ SHINY' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
