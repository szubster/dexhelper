import type React from 'react';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3SecretBaseDashboardProps {
  saveData: SaveData;
}

export const Gen3SecretBaseDashboard: React.FC<Gen3SecretBaseDashboardProps> = ({ saveData }) => {
  if (saveData.generation !== 3 || !saveData.gen3SecretBases || saveData.gen3SecretBases.length === 0) {
    return null;
  }

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.SECRET_BASE_TRACKING" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex items-center justify-between">
        <span className="tactical-text font-black text-lg text-white">SECRET BASE REMATCHES</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {saveData.gen3SecretBases.map((base, idx) => {
          const isBattled = base.battledOwnerToday;

          return (
            <div
              key={base.trainerName || `Trainer ${idx + 1}`}
              className={`flex items-center justify-between rounded-none border-2 border-dashed p-2 font-mono text-xs ${
                isBattled
                  ? 'border-zinc-700 bg-black/40 text-zinc-500'
                  : 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
              }`}
            >
              <span className="truncate">{base.trainerName || `Trainer ${idx + 1}`}</span>
              <span className="flex-shrink-0 font-black">
                {isBattled ? '[ ALREADY BATTLED ]' : '[ BATTLE AVAILABLE ]'}
              </span>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
};
