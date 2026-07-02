import type React from 'react';
import type { Gen3BattleFrontierWinStreaks, SaveData } from '../../../engine/saveParser/parsers/common';
import { DataPoint } from '../../DataPoint';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

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
      <TacticalPanel className="p-4 text-center">
        <span className="tactical-text text-zinc-500">NO BATTLE FRONTIER DATA FOUND</span>
      </TacticalPanel>
    );
  }

  const facilities = (Object.keys(FACILITY_NAMES) as Array<keyof Gen3BattleFrontierWinStreaks>).map((key) => {
    const symbols = gen3BattleFrontierSymbols[key] || { silver: false, gold: false };
    return {
      key,
      name: FACILITY_NAMES[key],
      streaks: gen3BattleFrontierWinStreaks[key] || { current: 0, record: 0 },
      symbols,
      variant: symbols.gold ? 'amber' : symbols.silver ? 'white' : 'default',
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <TacticalPanel className="mt-4 flex items-center justify-between border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.BATTLE_FRONTIER" className="-top-[17px] left-[-1px]" />
        <span className="tactical-text z-10 font-black text-lg text-white">COMBAT SIMULATION MATRIX</span>
        <div className="z-10 flex flex-col items-end">
          <DataPoint
            label="WALLET_BALANCE"
            value={`${gen3BattlePoints} BP`}
            valueClassName="text-2xl text-[var(--theme-primary)]"
          />
        </div>
      </TacticalPanel>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <TacticalPanel
            key={facility.key}
            variant={facility.variant as 'amber' | 'white' | 'default'}
            className="flex flex-col gap-0 border-l-2 p-0"
          >
            <div className="flex items-center justify-between border-zinc-800 border-b border-dashed bg-black/40 p-3 pb-2">
              <span className="tactical-text z-10 font-black text-white">[ {facility.name} ]</span>
            </div>

            <div className="z-10 flex flex-col gap-0 divide-y divide-dashed divide-zinc-800 bg-black/20 p-2">
              <div className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5">
                <span className="tactical-text font-black text-[10px] text-zinc-500">CURRENT_STREAK</span>
                <span className="font-bold font-mono text-[12px] text-white">{facility.streaks.current}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 hover:bg-white/5">
                <span className="tactical-text font-black text-[10px] text-zinc-500">RECORD_STREAK</span>
                <span className="font-bold font-mono text-[12px] text-zinc-400">{facility.streaks.record}</span>
              </div>

              {(facility.symbols.silver || facility.symbols.gold) && (
                <div className="flex flex-col gap-1 px-2 py-2">
                  {facility.symbols.silver && !facility.symbols.gold && (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-none bg-zinc-300" />
                      <span className="font-black font-mono text-[9px] text-zinc-300 uppercase tracking-widest">
                        SILVER_SYMBOL_ACQUIRED
                      </span>
                    </div>
                  )}
                  {facility.symbols.gold && (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-none bg-amber-500" />
                      <span className="font-black font-mono text-[9px] text-amber-500 uppercase tracking-widest">
                        GOLD_SYMBOL_ACQUIRED
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TacticalPanel>
        ))}
      </div>
    </div>
  );
};
