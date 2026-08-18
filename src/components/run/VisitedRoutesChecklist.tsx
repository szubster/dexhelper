import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { EmptyState } from '../EmptyState';
import { TacticalChecklistItem } from '../TacticalChecklistItem';
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
            <TacticalChecklistItem
              key={route.locationId}
              label={route.locationName}
              acquired={true}
              interactive={true}
              showCrosshairs={true}
              strikethroughWhenAcquired={false}
              subtitle={`${route.encounters.length} ENCOUNTER${route.encounters.length !== 1 ? 'S' : ''}`}
            />
          ))}
          {visited.length === 0 && <EmptyState label="NO ROUTES VISITED YET" />}
        </div>
      </TacticalPanel>

      <TacticalPanel variant="default" className="mt-4 mb-2 flex flex-col gap-3 p-4 sm:p-6">
        <TelemetryDecoration label="SYS.UNVISITED_ROUTES" className="-top-3 left-4" />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {unvisited.map((route) => (
            <TacticalChecklistItem
              key={route.locationId}
              label={route.locationName}
              acquired={false}
              interactive={true}
              showCrosshairs={true}
            />
          ))}
          {unvisited.length === 0 && <EmptyState label="ALL ROUTES VISITED" />}
        </div>
      </TacticalPanel>
    </div>
  );
}
