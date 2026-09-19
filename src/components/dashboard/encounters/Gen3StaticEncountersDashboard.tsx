import type React from 'react';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3StaticEncountersDashboardProps {
  saveData: SaveData;
}

export const Gen3StaticEncountersDashboard: React.FC<Gen3StaticEncountersDashboardProps> = ({ saveData }) => {
  if (saveData.generation !== 3 || !saveData.gen3StaticEncounters) {
    return null;
  }

  const entries = Object.entries(saveData.gen3StaticEncounters);

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.STATIC_ENCOUNTERS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex items-center justify-between">
        <span className="tactical-text font-black text-lg text-white">STATIC ENCOUNTERS DB</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entries.map(([key, isClaimed]) => {
          // Add spacing to camelCase keys for display
          const displayLabel = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/([0-9]+)/g, ' $1')
            .trim();

          return (
            <div
              key={key}
              className={`tactical-panel flex items-center justify-between border-2 p-2 text-xs ${
                isClaimed
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
                  : 'border-zinc-700 bg-black/40 text-zinc-500'
              }`}
            >
              <span className="truncate">{displayLabel}</span>
              <span className="flex-shrink-0 font-black">{isClaimed ? '[X]' : '[ ]'}</span>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
};
