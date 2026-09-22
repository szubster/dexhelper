import { cn } from '../../utils/cn';
import { DataPoint } from '../DataPoint';
import { TacticalLed } from '../TacticalLed';
import { TacticalPanel } from '../TacticalPanel';

export interface TideDisplayProps {
  tide: 'High' | 'Low';
  hoursUntilNextTide: number;
  minutesUntilNextTide: number;
  className?: string;
}

export function TideDisplay({ tide, hoursUntilNextTide, minutesUntilNextTide, className }: TideDisplayProps) {
  const isHighTide = tide === 'High';
  const timeString = `${hoursUntilNextTide}h ${minutesUntilNextTide}m`;

  return (
    <TacticalPanel className={cn('p-4', className)}>
      <div className="mb-4 flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <h3 className="font-black font-mono text-xs text-zinc-400 uppercase tracking-widest">Shoal Cave Tide Status</h3>
        <div className="relative h-4 w-4">
          <TacticalLed variant={isHighTide ? 'primary' : 'blue'} pipe={false} position="top-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DataPoint
          label="Current Tide"
          value={tide}
          valueClassName={isHighTide ? 'text-[var(--theme-primary)]' : 'text-blue-400'}
        />
        <DataPoint label="Next Change In" value={timeString} />
      </div>
    </TacticalPanel>
  );
}
