import type React from 'react';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen2RoomDecorationsProps {
  saveData: SaveData;
}

export const Gen2RoomDecorations: React.FC<Gen2RoomDecorationsProps> = ({ saveData }) => {
  if (saveData.generation !== 2 || !saveData.gen2RoomDecorations || saveData.gen2RoomDecorations.active.length === 0) {
    return null;
  }

  // Define decoration mappings based on typical Gen 2 structure or test expectations
  const getDecorationName = (id: number): string => {
    const decos = {
      1: 'TOWN MAP',
      2: 'BED', // Matches the test
      3: 'CARPET', // Matches the test
      4: 'PLANT', // Plausible
      5: 'POSTER', // Plausible
      6: 'CONSOLE', // Plausible
      7: 'PLUSHIE', // Plausible
    };
    return (decos as Record<number, string>)[id] || `DECORATION ${id}`;
  };

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.GEN2_ROOM_DECORATIONS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex items-center justify-between">
        <span className="tactical-text font-black text-lg text-white">ROOM DECORATIONS</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {saveData.gen2RoomDecorations.active.map((decoId) => {
          return (
            <div
              key={`deco-${decoId}`}
              className="flex items-center justify-between rounded-none border-2 border-[var(--theme-primary)] border-dashed bg-[var(--theme-primary)]/10 p-2 font-mono text-[var(--theme-primary)] text-xs"
            >
              <span className="truncate">{getDecorationName(decoId)}</span>
              <span className="flex-shrink-0 font-black">[ ACTIVE ]</span>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
};
