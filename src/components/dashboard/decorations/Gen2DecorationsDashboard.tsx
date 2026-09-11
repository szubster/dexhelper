import type React from 'react';
import { gen2Decorations } from '../../../engine/data/gen2/decorations';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen2DecorationsDashboardProps {
  saveData: SaveData;
}

export const Gen2DecorationsDashboard: React.FC<Gen2DecorationsDashboardProps> = ({ saveData }) => {
  if (saveData.generation !== 2 || !saveData.gen2RoomDecorations) {
    return null;
  }

  const { active, unlocked } = saveData.gen2RoomDecorations;

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.ROOM_DECORATIONS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex items-center justify-between">
        <span className="tactical-text font-black text-lg text-white">ROOM DECORATIONS</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="font-bold font-mono text-[var(--theme-primary)] text-sm">ACTIVE</span>
          <div className="flex flex-wrap gap-2">
            {active
              .filter((id) => id !== 0)
              .map((decoId) => (
                <span
                  key={`active-deco-${decoId}`}
                  className="rounded-none border border-zinc-700 border-dashed bg-zinc-900 px-2 py-1 font-mono text-xs text-zinc-300"
                >
                  {gen2Decorations[decoId] || `DECO ${decoId}`}
                </span>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-bold font-mono text-[var(--theme-primary)] text-sm">UNLOCKED</span>
          <div className="flex flex-wrap gap-2">
            {unlocked.map((isUnlocked, idx) => {
              if (!isUnlocked) return null;
              const decoId = idx + 1;
              return (
                <span
                  key={`unlocked-deco-${decoId}`}
                  className="rounded-none border border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-2 py-1 font-mono text-[var(--theme-primary)] text-xs"
                >
                  {gen2Decorations[decoId] || `DECO ${decoId}`}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </TacticalPanel>
  );
};
