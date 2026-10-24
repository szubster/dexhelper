import { Flame } from 'lucide-react';
import { TacticalPanel } from '../../TacticalPanel';

interface Gen3AshTrackerDashboardProps {
  gen3VolcanicAsh: number;
}

export function Gen3AshTrackerDashboard({ gen3VolcanicAsh }: Gen3AshTrackerDashboardProps) {
  // Constants for glass flutes and other items that can be crafted
  const CRAFTABLE_ITEMS = [
    { name: 'Blue Flute', cost: 250 },
    { name: 'Yellow Flute', cost: 500 },
    { name: 'Red Flute', cost: 500 },
    { name: 'White Flute', cost: 1000 },
    { name: 'Black Flute', cost: 1000 },
    { name: 'Pretty Chair', cost: 6000 },
    { name: 'Pretty Desk', cost: 8000 },
  ];

  return (
    <TacticalPanel className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-zinc-700 border-b border-dashed pb-2">
        <Flame className="text-orange-500" size={20} />
        <h2 className="tactical-text font-black text-[14px]">VOLCANIC ASH TRACKER</h2>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex min-w-[200px] flex-col items-center justify-center border border-zinc-700 border-dashed bg-zinc-900/50 p-6">
          <span className="mb-2 font-mono text-[10px] text-zinc-500 uppercase">Current Ash Collected</span>
          <span className="font-black font-mono text-4xl text-orange-500" data-testid="ash-count">
            {gen3VolcanicAsh.toLocaleString()}
          </span>
          <span className="mt-1 font-mono text-[10px] text-zinc-500 uppercase">Steps</span>
        </div>

        <div className="flex-1">
          <h3 className="mb-3 font-bold font-mono text-[12px] text-zinc-400 uppercase">Craftable Items</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CRAFTABLE_ITEMS.map((item) => {
              const canCraft = gen3VolcanicAsh >= item.cost;
              return (
                <div
                  key={item.name}
                  className={`flex items-center justify-between border border-dashed p-2 ${
                    canCraft ? 'border-orange-500/50 bg-orange-500/10' : 'border-zinc-800 bg-zinc-900/50 opacity-50'
                  }`}
                >
                  <span className={`font-mono text-[11px] uppercase ${canCraft ? 'text-orange-100' : 'text-zinc-500'}`}>
                    {item.name}
                  </span>
                  <div className="flex flex-col items-end">
                    <span
                      className={`font-bold font-mono text-[12px] ${canCraft ? 'text-orange-400' : 'text-zinc-600'}`}
                    >
                      {item.cost}
                    </span>
                    {!canCraft && (
                      <span className="font-mono text-[9px] text-zinc-600">Need {item.cost - gen3VolcanicAsh}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TacticalPanel>
  );
}
