import { cn } from '../../utils/cn';
import { DataPoint } from '../DataPoint';
import { TacticalLed } from '../TacticalLed';
import { TacticalPanel } from '../TacticalPanel';

export interface ShoalItemTrackerProps {
  shells: number;
  salts: number;
  className?: string;
}

export function ShoalItemTracker({ shells, salts, className }: ShoalItemTrackerProps) {
  const isReady = shells >= 4 && salts >= 4;

  return (
    <TacticalPanel className={cn('p-4', className)}>
      <div className="mb-4 flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <h3 className="font-black font-mono text-xs text-zinc-400 uppercase tracking-widest">
          Shoal Material Reserves
        </h3>
        <div className="relative h-4 w-4">
          <TacticalLed variant={isReady ? 'emerald' : 'amber'} pipe={false} position="top-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DataPoint label="Shoal Shells" value={`${shells} / 4`} />
        <DataPoint label="Shoal Salts" value={`${salts} / 4`} />
      </div>
      <div className="mt-4 border-zinc-800 border-t border-dashed pt-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-zinc-500 uppercase">Shell Bell Crafting</span>
          <span
            className={cn(
              'font-bold font-mono text-[10px] uppercase',
              isReady ? 'text-emerald-400' : 'text-amber-400/60',
            )}
          >
            {isReady ? 'READY' : 'INSUFFICIENT MATERIALS'}
          </span>
        </div>
      </div>
    </TacticalPanel>
  );
}
