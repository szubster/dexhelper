import { useEffect, useState } from 'react';
import { pokeDB } from '../../db/PokeDB';
import type { UnifiedLocation } from '../../db/schema';
import { aggregateEncountersByLocation } from '../../engine/nuzlocke/tracker';
import { useStore } from '../../store';
import { AliveTeamView } from './AliveTeamView';
import { VisitedRoutesChecklist } from './VisitedRoutesChecklist';

export function RunDashboard() {
  const saveData = useStore((s) => s.saveData);
  const [allAreas, setAllAreas] = useState<UnifiedLocation[]>([]);

  useEffect(() => {
    async function loadAreas() {
      const areas = await pokeDB.getAllAreas();
      setAllAreas(areas);
    }
    void loadAreas();
  }, []);

  if (!saveData) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8 text-center font-mono text-zinc-500 uppercase tracking-widest">
        [ WAITING FOR SAVE DATA UPLOAD ]
      </div>
    );
  }

  const team = saveData.partyDetails || [];
  const visited = aggregateEncountersByLocation(saveData);

  const visitedLocationIds = new Set(visited.map((v) => v.locationId));
  const unvisited = allAreas
    .filter((area) => area.n && !visitedLocationIds.has(area.id))
    .map((area) => ({
      locationId: area.id,
      locationName: area.n,
    }));

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-6 lg:p-8">
      <AliveTeamView team={team} generation={saveData.generation} />
      <VisitedRoutesChecklist visited={visited} unvisited={unvisited} />
    </div>
  );
}
