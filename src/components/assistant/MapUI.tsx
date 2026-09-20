import { MapPin } from 'lucide-react';
import { useMemo } from 'react';
import type { RouteRadarHeatmap } from '../../engine/radar/RouteRadarController';
import { BikeBadge } from '../BikeBadge';
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
    <div className="tactical-panel mt-6 overflow-visible p-4">
      <EdgeLabel className="-top-2.5 left-4 text-[var(--theme-primary)]">ROUTE.RADAR</EdgeLabel>
      <div className="flex flex-col gap-2">
        <h3 className="tactical-text mb-2 flex items-center gap-2 text-lg text-white">
          <MapPin className="text-[var(--theme-primary)]" size={18} />
          Active Route Radar
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areasWithSuggestions.map(({ areaId, density, requiresMachBike, requiresAcroBike }) => (
            <button
              type="button"
              aria-label={`View ${areaNames?.[areaId] || `AREA #${areaId}`} details`}
              key={areaId}
              className="tactical-button flex h-auto w-full items-center justify-between p-3"
              title={`View ${areaNames?.[areaId] || `AREA #${areaId}`} details`}
            >
              <span className="tactical-text text-xs text-zinc-300">{areaNames?.[areaId] || `AREA #${areaId}`}</span>
              <div className="flex items-center gap-2">
                {(requiresMachBike || requiresAcroBike) && (
                  <div className="flex gap-1">
                    {requiresMachBike && requiresAcroBike ? (
                      <BikeBadge type="both" className="px-1 py-0.5 text-[8px] leading-none" />
                    ) : requiresMachBike ? (
                      <BikeBadge type="mach" className="px-1 py-0.5 text-[8px] leading-none" />
                    ) : requiresAcroBike ? (
                      <BikeBadge type="acro" className="px-1 py-0.5 text-[8px] leading-none" />
                    ) : null}
                  </div>
                )}
                <div className="flex h-2 w-12 overflow-hidden rounded-none border border-zinc-700 bg-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
                    style={{ width: `${Math.min((density / 5) * 100, 100)}%` }}
                  />
                </div>
                <span className="tactical-text text-[10px] text-[var(--theme-primary)]">[{density}]</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
