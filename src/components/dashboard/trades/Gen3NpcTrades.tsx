import type React from 'react';
import { useStore } from '../../../store';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export const Gen3NpcTrades: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 3) {
    return null;
  }

  const flags = saveData.gen3NPCTrades;

  if (!flags) {
    return null;
  }

  // Gen 3 FRLG or RSE based on keys
  const checklist = Object.entries(flags).map(([key, acquired]) => ({
    label: key,
    acquired,
  }));

  return (
    <div className="mt-6 flex flex-col gap-6">
      <TacticalPanel className="relative flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN3_IN_GAME_TRADES" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black text-lg text-white">IN-GAME TRADES</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => (
            <TacticalChecklistItem key={item.label} label={item.label} acquired={item.acquired} />
          ))}
        </div>
      </TacticalPanel>
    </div>
  );
};
