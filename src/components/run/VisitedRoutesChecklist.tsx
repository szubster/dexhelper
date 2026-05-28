import { Check, CircleDot } from 'lucide-react';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { TacticalCard } from '../TacticalCard';

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
      <div className="flex flex-col gap-3">
        <h3 className="font-bold font-mono text-emerald-500 text-sm uppercase tracking-widest">SYS.VISITED_ROUTES</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {visited.map((route) => (
            <TacticalCard
              key={route.locationId}
              variant="default"
              className="flex items-center gap-3 border-emerald-900/50 bg-emerald-950/10 hover:border-emerald-500/50"
            >
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-bold text-xs text-zinc-300">{route.locationName}</span>
                <span className="text-[10px] text-zinc-500">
                  {route.encounters.length} ENCOUNTER{route.encounters.length !== 1 ? 'S' : ''}
                </span>
              </div>
            </TacticalCard>
          ))}
          {visited.length === 0 && (
            <div className="col-span-full rounded-none border border-zinc-800 border-dashed bg-zinc-900/20 p-4 text-center font-mono text-xs text-zinc-500 uppercase">
              No routes visited yet
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold font-mono text-sm text-zinc-400 uppercase tracking-widest">SYS.UNVISITED_ROUTES</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {unvisited.map((route) => (
            <TacticalCard
              key={route.locationId}
              variant="default"
              className="flex items-center gap-3 border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
            >
              <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />
              <span className="truncate font-bold text-xs text-zinc-500">{route.locationName}</span>
            </TacticalCard>
          ))}
          {unvisited.length === 0 && (
            <div className="col-span-full rounded-none border border-zinc-800 border-dashed bg-zinc-900/20 p-4 text-center font-mono text-xs text-zinc-500 uppercase">
              All routes visited
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
