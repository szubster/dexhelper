import type React from 'react';
import type { Gen3BattleFrontierWinStreaks, SaveData } from '../../../engine/saveParser/parsers/common';
export interface BattleFrontierDashboardProps {
  saveData: SaveData;
}

const FACILITY_NAMES: Record<keyof Gen3BattleFrontierWinStreaks, string> = {
  tower: 'BATTLE TOWER',
  dome: 'BATTLE DOME',
  palace: 'BATTLE PALACE',
  arena: 'BATTLE ARENA',
  factory: 'BATTLE FACTORY',
  pike: 'BATTLE PIKE',
  pyramid: 'BATTLE PYRAMID',
};

export const BattleFrontierDashboard: React.FC<BattleFrontierDashboardProps> = ({ saveData }) => {
  if (saveData.generation !== 3) {
    return null;
  }

  const { gen3BattlePoints, gen3BattleFrontierWinStreaks, gen3BattleFrontierSymbols } = saveData;

  if (gen3BattlePoints === undefined || !gen3BattleFrontierWinStreaks || !gen3BattleFrontierSymbols) {
    return (
      <div className="tactical-panel p-4 text-center">
        <span className="tactical-text text-zinc-500">NO BATTLE FRONTIER DATA FOUND</span>
      </div>
    );
  }

  const facilities = (Object.keys(FACILITY_NAMES) as Array<keyof Gen3BattleFrontierWinStreaks>).map((key) => {
    return {
      key,
      name: FACILITY_NAMES[key],
      streaks: gen3BattleFrontierWinStreaks[key] || { current: 0, record: 0 },
      symbols: gen3BattleFrontierSymbols[key] || { silver: false, gold: false },
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="tactical-panel flex items-center justify-between p-4">
        <span className="tactical-text font-black text-lg text-white">BATTLE FRONTIER STATUS</span>
        <div className="flex flex-col items-end">
          <span className="tactical-text font-black text-[10px] text-zinc-500">WALLET BALANCE</span>
          <span className="tactical-text font-black text-2xl text-[var(--theme-primary)]">{gen3BattlePoints} BP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <div key={facility.key} className="tactical-panel flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
              <span className="tactical-text font-black text-white">{facility.name}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="tactical-text font-black text-[10px] text-zinc-500">CURRENT STREAK</span>
                <span className="tactical-text font-black text-[12px] text-white">{facility.streaks.current}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="tactical-text font-black text-[10px] text-zinc-500">RECORD STREAK</span>
                <span className="tactical-text font-black text-[12px] text-zinc-400">{facility.streaks.record}</span>
              </div>

              {(facility.symbols.silver || facility.symbols.gold) && (
                <div className="mt-1 flex flex-col gap-1 border-zinc-800 border-t border-dashed pt-2">
                  {facility.symbols.silver && !facility.symbols.gold && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-none bg-zinc-300" />
                      <span className="tactical-text font-black text-[9px] text-zinc-300 tracking-widest">
                        SILVER SYMBOL ACQUIRED
                      </span>
                    </div>
                  )}
                  {facility.symbols.gold && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-none bg-yellow-500" />
                      <span className="tactical-text font-black text-[9px] text-yellow-500 tracking-widest">
                        GOLD SYMBOL ACQUIRED
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
