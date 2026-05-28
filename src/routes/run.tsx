import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AliveTeamView } from '../components/run/AliveTeamView';
import { VisitedRoutesChecklist } from '../components/run/VisitedRoutesChecklist';
import { pokeDB } from '../db/PokeDB';
import { aggregateEncountersByLocation } from '../engine/nuzlocke/tracker';
import { useStore } from '../store';

export const Route = createFileRoute('/run')({
  component: RunDashboardRoute,
});

function RunDashboardRoute() {
  const saveData = useStore((s) => s.saveData);

  const { data: allLocations = [] } = useQuery({
    queryKey: ['locations'],
    queryFn: () => pokeDB.getAllAreas(),
  });

  if (!saveData) {
    return null;
  }

  const aliveTeam = saveData.partyDetails?.filter((p) => (p.currentHp ?? 0) > 0) || [];
  const encounters = aggregateEncountersByLocation(saveData);
  const visitedIds = new Set(encounters.map((e) => e.locationId));

  const visited = encounters;
  const unvisited = allLocations
    .filter((loc) => loc.pids?.length && !visitedIds.has(loc.id))
    .map((loc) => ({
      locationId: loc.id,
      locationName: loc.n,
    }));

  return (
    <div className="flex flex-col gap-6">
      <AliveTeamView team={aliveTeam} generation={saveData.generation} />
      <VisitedRoutesChecklist visited={visited} unvisited={unvisited} />
    </div>
  );
}
