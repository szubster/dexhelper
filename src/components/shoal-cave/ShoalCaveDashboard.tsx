import { cn } from '../../utils/cn';
import { ShoalItemTracker, type ShoalItemTrackerProps } from './ShoalItemTracker';
import { TideDisplay, type TideDisplayProps } from './TideDisplay';

export interface ShoalCaveDashboardProps extends TideDisplayProps, ShoalItemTrackerProps {
  className?: string;
}

export function ShoalCaveDashboard({
  tide,
  hoursUntilNextTide,
  minutesUntilNextTide,
  shells,
  salts,
  className,
}: ShoalCaveDashboardProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', className)}>
      <TideDisplay tide={tide} hoursUntilNextTide={hoursUntilNextTide} minutesUntilNextTide={minutesUntilNextTide} />
      <ShoalItemTracker shells={shells} salts={salts} />
    </div>
  );
}
