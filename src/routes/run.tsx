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
    if (saveData) {
      pokeDB.getAllAreas().then(setAllLocations).catch(console.error);
    }
  }, [saveData]);

  if (!saveData) {
    return (
      <div className="flex h-[calc(100vh-140px)] w-full items-center justify-center">
        <div className="font-mono text-zinc-500 uppercase">NO SAVE DATA</div>
      </div>
    );
  }

  const visitedEncounters = aggregateEncountersByLocation(saveData);
  const visitedLocationIds = new Set(visitedEncounters.map((e) => e.locationId));

  // Filter the global locations to only those with 'dist' which typically indicates
  // significant outdoor hubs/routes that are valid nuzlocke catching locations
  // based on how the map graph is generated. Also ignore completely empty names or unknown areas.
  const unvisitedLocations = allLocations
    .filter((loc) => !visitedLocationIds.has(loc.id) && loc.dist && Object.keys(loc.dist).length > 0 && loc.n)
    .map((loc) => ({
      locationId: loc.id,
      locationName: loc.n,
    }));

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-4 pt-6 pb-24 lg:pb-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-black font-mono text-white text-xl uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Run Dashboard
        </h1>
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          SYS.NUZLOCKE_TRACKER {/* PROTOCOL_ACTIVE */}
        </p>
      </div>

      <AliveTeamView team={saveData.partyDetails} generation={saveData.generation} />

      <VisitedRoutesChecklist visited={visitedEncounters} unvisited={unvisitedLocations} />
    </div>
  );
}
