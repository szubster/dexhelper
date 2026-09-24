import type React from 'react';
import { gen2Decorations } from '../../../engine/data/gen2/decorations';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen2DecorationsDashboardProps {
  saveData: SaveData;
}

const DECORATION_CATEGORIES = [
  { name: 'Beds', ids: [5, 6, 7, 8] },
  { name: 'Plants', ids: [13, 14, 15] },
  { name: 'Posters', ids: [1, 2, 3, 4] },
  { name: 'Consoles', ids: [16, 17, 18, 19] },
  { name: 'Ornaments', ids: [9, 10, 11, 12, 20, 21, 44, 45] },
  { name: 'Dolls', ids: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43] },
];

const MYSTERY_GIFT_IDS = new Set([
  2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43,
]);

export const Gen2DecorationsDashboard: React.FC<Gen2DecorationsDashboardProps> = ({ saveData }) => {
  if (saveData.generation !== 2 || !saveData.gen2RoomDecorations) {
    return null;
  }

  const { active, unlocked } = saveData.gen2RoomDecorations;

  return (
    <TacticalPanel className="mt-4 flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.ROOM_DECORATIONS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 mb-2 flex items-center justify-between border-[var(--theme-primary)]/30 border-b pb-2">
        <span className="tactical-text font-black font-mono text-lg text-white tracking-widest">ROOM DECORATIONS</span>
      </div>

      <div className="z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DECORATION_CATEGORIES.map((category) => {
          const categoryDecorations = category.ids.filter((id) => unlocked[id - 1] || active.includes(id));

          if (categoryDecorations.length === 0) return null;

          return (
            <div
              key={category.name}
              className="flex flex-col gap-2 rounded-none border border-zinc-800 border-dashed bg-zinc-900/50 p-3"
            >
              <span className="mb-1 border-zinc-800 border-b border-dashed pb-1 font-bold font-mono text-[var(--theme-primary)] text-sm tracking-widest">
                {category.name.toUpperCase()}
              </span>
              <div className="flex flex-col gap-2 font-mono">
                {categoryDecorations.map((decoId) => {
                  const isActive = active.includes(decoId);
                  const isMysteryGift = MYSTERY_GIFT_IDS.has(decoId);

                  return (
                    <div
                      key={`deco-${decoId}`}
                      className={`flex items-center justify-between border border-dashed ${isActive ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10' : 'border-zinc-700 bg-zinc-950'} rounded-none px-2 py-1.5 text-xs`}
                    >
                      <div className="flex items-center gap-2">
                        {isActive && (
                          <span className="inline-block h-2 w-2 rounded-full bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]" />
                        )}
                        <span className={isActive ? 'font-bold text-[var(--theme-primary)]' : 'text-zinc-400'}>
                          {gen2Decorations[decoId] || `DECO ${decoId}`}
                        </span>
                      </div>

                      {isMysteryGift && (
                        <span
                          className="rounded-none border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/5 px-1 font-bold text-[9px] text-[var(--theme-primary)]/80 tracking-widest"
                          title="Mystery Gift Exclusive"
                        >
                          [MG]
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
};
