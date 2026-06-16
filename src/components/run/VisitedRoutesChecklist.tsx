import { Check, CircleDot } from 'lucide-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { TacticalPanel } from '../TacticalPanel';
import { TelemetryDecoration } from '../TelemetryDecoration';

export interface VisitedRoutesChecklistProps {
  visited: {
    locationId: number;
    locationName: string;
    encounters: PokemonInstance[];
  }[];
  unvisited: {
    locationId: number;
    locationName: string;
  }[];
}

export function VisitedRoutesChecklist({ visited, unvisited }: VisitedRoutesChecklistProps) {
  return (
    <div className="flex flex-col gap-6">
      <TacticalPanel variant="emerald" className="mt-4 mb-2 flex flex-col gap-3 p-4 sm:p-6">
        <TelemetryDecoration
          label="SYS.VISITED_ROUTES"
          className="-top-3 left-4"
          textClassName="text-emerald-500"
          dotClassName="text-emerald-400"
        />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {visited.map((route) => (
            <div
              key={route.locationId}
              className="group relative flex items-center gap-3 rounded-none border border-emerald-900/50 border-dashed bg-emerald-950/10 p-3 transition-colors hover:border-emerald-500/50"
            >
              <CornerCrosshairs className="h-1.5 w-1.5 border-emerald-900/50 transition-colors group-hover:border-emerald-500/80" />
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-bold text-xs text-zinc-300 uppercase tracking-wider">
                  {route.locationName}
                </span>
                <span className="tactical-text text-[10px] text-zinc-500">
                  {route.encounters.length} ENCOUNTER{route.encounters.length !== 1 ? 'S' : ''}
                </span>
              </div>
            </div>
          ))}
          {visited.length === 0 && (
            <div className="relative col-span-full rounded-none border border-zinc-800/50 border-dashed bg-zinc-950/20 p-6 text-center font-mono text-xs text-zinc-500 uppercase">
              <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700/50" />
              NO ROUTES VISITED YET
            </div>
          )}
        </div>
      </TacticalPanel>

      <TacticalPanel variant="default" className="mt-4 mb-2 flex flex-col gap-3 p-4 sm:p-6">
        <TelemetryDecoration label="SYS.UNVISITED_ROUTES" className="-top-3 left-4" />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {unvisited.map((route) => (
            <div
              key={route.locationId}
              className="group relative flex items-center gap-3 rounded-none border border-zinc-800 border-dashed bg-zinc-950/50 p-3 transition-colors hover:border-zinc-700"
            >
              <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700/50 transition-colors group-hover:border-zinc-500" />
              <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />
              <span className="truncate font-bold text-xs text-zinc-500 uppercase tracking-wider">
                {route.locationName}
              </span>
            </div>
          ))}
          {unvisited.length === 0 && (
            <div className="relative col-span-full rounded-none border border-zinc-800/50 border-dashed bg-zinc-950/20 p-6 text-center font-mono text-xs text-zinc-500 uppercase">
              <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700/50" />
              ALL ROUTES VISITED
            </div>
          )}
        </div>
      </TacticalPanel>
    </div>
  );
}
