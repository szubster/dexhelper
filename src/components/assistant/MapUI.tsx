import { MapPin } from 'lucide-react';
import { useMemo } from 'react';
import type { RouteRadarHeatmap } from '../../engine/radar/RouteRadarController';
import { EdgeLabel } from '../EdgeLabel';

interface MapUIProps {
  heatmap: RouteRadarHeatmap;
  areaNames?: Record<number, string>;
}

export function MapUI({ heatmap, areaNames }: MapUIProps) {
  const areasWithSuggestions = useMemo(() => {
    return Object.entries(heatmap)
      .filter((entry) => entry[1].density > 0)
      .map(([areaId, data]) => ({
        areaId: Number(areaId),
        density: data.density,
        requiresMachBike: data.requiresMachBike,
        requiresAcroBike: data.requiresAcroBike,
      }))
      .sort((a, b) => b.density - a.density);
  }, [heatmap]);

  if (areasWithSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-6 border border-zinc-800 border-dashed bg-zinc-900/40 p-4">
      <EdgeLabel className="-top-2.5 left-4 text-[var(--theme-primary)]">ROUTE.RADAR</EdgeLabel>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 flex items-center gap-2 font-black font-display text-lg text-white uppercase tracking-wider">
          <MapPin className="text-[var(--theme-primary)]" size={18} />
          Active Route Radar
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areasWithSuggestions.map(({ areaId, density, requiresMachBike, requiresAcroBike }) => (
            <button
              type="button"
              key={areaId}
              className="focus-visible:tactical-focus flex items-center justify-between rounded-none border border-zinc-800 border-dashed bg-zinc-950/50 p-3 transition-colors hover:border-[var(--theme-primary)]/50"
            >
              <span className="font-mono text-xs text-zinc-300">{areaNames?.[areaId] || `AREA #${areaId}`}</span>
              <div className="flex items-center gap-2">
                {(requiresMachBike || requiresAcroBike) && (
                  <div className="flex gap-1">
                    {requiresMachBike && (
                      <span className="flex items-center justify-center rounded-none border border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 px-1 py-0.5 font-mono text-[8px] text-[var(--theme-primary)] uppercase leading-none">
                        Mach
                      </span>
                    )}
                    {requiresAcroBike && (
                      <span className="flex items-center justify-center rounded-none border border-emerald-500/50 bg-emerald-500/10 px-1 py-0.5 font-mono text-[8px] text-emerald-400 uppercase leading-none">
                        Acro
                      </span>
                    )}
                  </div>
                )}
                <div className="flex h-2 w-12 overflow-hidden rounded-none border border-zinc-700 bg-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
                    style={{ width: `${Math.min((density / 5) * 100, 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-[var(--theme-primary)]">[{density}]</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
