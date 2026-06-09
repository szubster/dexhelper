import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AliveTeamView } from '../components/run/AliveTeamView';
import { VisitedRoutesChecklist } from '../components/run/VisitedRoutesChecklist';
import { pokeDB } from '../db/PokeDB';
import type { UnifiedLocation } from '../db/schema';
import { aggregateEncountersByLocation } from '../engine/nuzlocke/tracker';
import { useStore } from '../store';

export const Route = createFileRoute('/run')({
  component: RunDashboardRoute,
});

function RunDashboardRoute() {
  const saveData = useStore((s) => s.saveData);
  const [allLocations, setAllLocations] = useState<UnifiedLocation[]>([]);

  useEffect(() => {
    let isMounted = true;
    void pokeDB.getAllAreas().then((locations) => {
      if (isMounted) {
        setAllLocations(locations);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!saveData) {
    return <div className="flex h-full items-center justify-center font-mono text-zinc-500">No save data loaded.</div>;
  }

  const visitedLocations = aggregateEncountersByLocation(saveData);

  const visitedLocationIds = new Set(visitedLocations.map((v) => v.locationId));
  const unvisitedLocations = allLocations
    .filter((loc) => !visitedLocationIds.has(loc.id))
    .map((loc) => ({
      locationId: loc.id,
      locationName: loc.n,
    }));

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 border-zinc-800 border-b border-dashed pb-4">
        <h1 className="font-black font-mono text-2xl text-zinc-100 uppercase tracking-widest">SYS.RUN_DASHBOARD</h1>
        <p className="mt-2 font-mono text-xs text-zinc-500 uppercase tracking-wider">
          TACTICAL ENCOUNTER & TEAM TELEMETRY
        </p>
      </div>

      <AliveTeamView team={saveData.partyDetails || []} generation={saveData.generation} />

      <VisitedRoutesChecklist visited={visitedLocations} unvisited={unvisitedLocations} />
    </div>
  );
}
