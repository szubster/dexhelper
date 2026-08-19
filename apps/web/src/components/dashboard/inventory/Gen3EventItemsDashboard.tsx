import type React from 'react';
import {
  ITEM_AURORA_TICKET,
  ITEM_EON_TICKET,
  ITEM_MYSTIC_TICKET,
  ITEM_OLD_SEA_MAP,
} from '@dexhelper/engine/saveParser/gen3/inventory/constants';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3EventItemsDashboardProps {
  saveData: SaveData;
}

const ITEM_NAMES: Record<number, string> = {
  [ITEM_EON_TICKET]: 'EON TICKET',
  [ITEM_MYSTIC_TICKET]: 'MYSTIC TICKET',
  [ITEM_AURORA_TICKET]: 'AURORA TICKET',
  [ITEM_OLD_SEA_MAP]: 'OLD SEA MAP',
};

export const Gen3EventItemsDashboard: React.FC<Gen3EventItemsDashboardProps> = ({ saveData }) => {
  if (saveData.generation !== 3 || !saveData.gen3EventItems) {
    return null;
  }

  const entries = Object.entries(saveData.gen3EventItems).map(([id, isClaimed]) => ({
    id: parseInt(id, 10),
    isClaimed,
  }));

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.EVENT_ITEMS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex items-center justify-between">
        <span className="tactical-text font-black text-lg text-white">EVENT ITEMS</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {entries.map(({ id, isClaimed }) => {
          const displayLabel = ITEM_NAMES[id] || `ITEM ${id}`;

          return (
            <div
              key={id}
              className={`flex items-center justify-between rounded-none border-2 border-dashed p-2 font-mono text-xs ${
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
