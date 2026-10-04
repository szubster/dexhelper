import { cn } from '../../../utils/cn';
import type { MatrixColumn, MatrixRow } from '../types/matrix';

interface BoxAnalyzerMatrixProps {
  data: MatrixRow[];
  columns: MatrixColumn[];
}

export function BoxAnalyzerMatrix({ data, columns }: BoxAnalyzerMatrixProps) {
  return (
    <div className="w-full overflow-x-auto rounded-none border border-cyan-500/30 border-dashed bg-zinc-950/60 p-2">
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
                <span className="text-emerald-400">{row.dvsIvs.hp}</span>/
                <span className="text-amber-400">{row.dvsIvs.atk}</span>/
                <span className="text-blue-400">{row.dvsIvs.def}</span>/
                <span className="text-purple-400">{row.dvsIvs.spa}</span>/
                <span className="text-pink-400">{row.dvsIvs.spd}</span>/
                <span className="text-cyan-400">{row.dvsIvs.spe}</span>
              </td>
              <td className="p-2">
                <span className="text-emerald-500">{row.calculatedIvTotal}</span> /{' '}
                <span className="text-cyan-500">{row.calculatedIvAverage.toFixed(1)}</span>
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
