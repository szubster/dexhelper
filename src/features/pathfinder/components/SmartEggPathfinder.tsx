import type React from 'react';
import { TacticalPanel } from '../../../components/TacticalPanel';
import { TelemetryDecoration } from '../../../components/TelemetryDecoration';
import { PathfinderSelection } from './PathfinderSelection';

export const SmartEggPathfinder: React.FC = () => {
  return (
    <TacticalPanel className="relative mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.SMART_EGG_PATHFINDER" className="-top-[17px] left-[-1px]" />
      <div className="flex items-center justify-between">
        <span className="tactical-text z-10 font-black text-lg text-white">SMART EGG PATHFINDER</span>
        <span className="tactical-text z-10 text-amber-500 text-xs">[ PRIORITY: MOVE TARGETING ]</span>
      </div>
      <PathfinderSelection />
    </TacticalPanel>
  );
};
