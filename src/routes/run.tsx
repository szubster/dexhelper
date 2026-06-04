import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AliveTeamView } from '../components/run/AliveTeamView';
import { VisitedRoutesChecklist } from '../components/run/VisitedRoutesChecklist';
import { pokeDB } from '../db/PokeDB';
import type { UnifiedLocation } from '../db/schema';
import { aggregateEncountersByLocation } from '../engine/nuzlocke/tracker';
import { useStore } from '../store';

export const Route = createFileRoute('/run')({
  component: RunDashboard,
});

function RunDashboard() {
  const saveData = useStore((s) => s.saveData);
  const [allLocations, setAllLocations] = useState<UnifiedLocation[]>([]);

  useEffect(() => {
    async function load() {
      const locations = await pokeDB.getAllAreas();
      setAllLocations(locations);
    }
    void load();
  }, []);

  if (!saveData) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <div className="text-center font-mono text-zinc-500">
          <p className="mb-2 text-lg uppercase tracking-widest">[ AWAITING_DATA ]</p>
          <p className="text-xs">Upload a save file to view run statistics</p>
        </div>
      </div>
    );
  }

  const visited = aggregateEncountersByLocation(saveData);
  const visitedIds = new Set(visited.map((v) => v.locationId));

  const unvisited = allLocations
    .filter((loc) => !visitedIds.has(loc.id))
    .map((loc) => ({
      locationId: loc.id,
      locationName: loc.n,
    }));

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div>
          <h1 className="mb-2 font-black font-mono text-2xl text-[var(--theme-primary)] uppercase tracking-widest">
            RUN_DASHBOARD.SYS
          </h1>
          <div className="h-[2px] w-full bg-gradient-to-r from-[var(--theme-primary)]/50 to-transparent" />
        </div>
        <AliveTeamView team={saveData.partyDetails || []} generation={saveData.generation} />
        <VisitedRoutesChecklist visited={visited} unvisited={unvisited} />
      </div>
    </div>
  );
}
