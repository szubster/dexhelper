import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AliveTeamView } from '../components/run/AliveTeamView';
import { VisitedRoutesChecklist } from '../components/run/VisitedRoutesChecklist';
import { pokeDB } from '../db/PokeDB';
import type { UnifiedLocation } from '../db/schema';
import { aggregateEncountersByLocation } from '../engine/nuzlocke/tracker';
import { useStore } from '../store';

export const Route = createFileRoute('/run')({
  component: RunDashboardPage,
});

function RunDashboardPage() {
  const saveData = useStore((s) => s.saveData);
  const [allLocations, setAllLocations] = useState<UnifiedLocation[]>([]);

  useEffect(() => {
    let mounted = true;
    void pokeDB.getAllAreas().then((locations) => {
      if (mounted) {
        setAllLocations(locations);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!saveData) {
    return null;
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
    <div className="flex flex-col gap-6 rounded-none border-dashed p-4 font-mono">
      <AliveTeamView team={saveData.partyDetails || []} generation={saveData.generation} />
      <VisitedRoutesChecklist visited={visited} unvisited={unvisited} />
    </div>
  );
}
