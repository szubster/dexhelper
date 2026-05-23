import { aggregateEncountersByLocation } from '../../engine/nuzlocke/tracker';
import { useStore } from '../../store';
import { AliveTeam } from './AliveTeam';
import { Graveyard } from './Graveyard';
import { VisitedRoutesChecklist } from './VisitedRoutesChecklist';

export function RunDashboard() {
  const saveData = useStore((s) => s.saveData);

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="font-bold font-mono text-zinc-400 uppercase tracking-widest">No Save Data</h2>
        <p className="mt-2 text-sm text-zinc-500">Please load a save file to view run dashboard.</p>
      </div>
    );
  }

  const visitedRoutes = aggregateEncountersByLocation(saveData);

  return (
    <div className="fade-in animate-in space-y-16 duration-500">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-zinc-800 border-b border-dashed pb-2">
          <span className="font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
            [ SYS.DIR ]
          </span>
          <h2 className="font-black font-display text-3xl text-white uppercase tracking-tight">RUN DASHBOARD</h2>
        </div>
      </div>

      <AliveTeam />
      <Graveyard />

      <VisitedRoutesChecklist visited={visitedRoutes} unvisited={[]} />
    </div>
  );
}
