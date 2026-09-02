import React from 'react';
import { FRONTIER_BRAIN_THRESHOLDS } from '../../../engine/gen3/battleFrontier/constants';
import type { Gen3BattleFrontierWinStreaks, SaveData } from '../../../engine/saveParser/parsers/common';
import { objectKeys } from '../../../utils/object';
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

export interface ProgressNodeData extends Record<string, unknown> {
  label: string;
  current: number;
  target: number | null;
  status: string | null;
  statusColor: string;
}

// ⚡ Bolt: Wrapped in React.memo to eliminate unnecessary re-renders.
const ProgressNode = React.memo(({ data }: { data: ProgressNodeData }) => {
  return (
    <div className="flex w-45 flex-col gap-0 border-2 border-zinc-700 border-dashed bg-black/80 font-mono text-white">
      <div className="border-zinc-700 border-b border-dashed bg-black/40 p-2 text-center font-black text-[10px] text-zinc-400 uppercase">
        {data.label}
      </div>
      <div className="flex flex-col gap-1 p-2 text-center">
        <span className="text-[10px] text-zinc-500">STREAK</span>
        <span className="font-bold text-xl">{data.current}</span>
        {data.target && (
          <>
            <span className="text-[10px] text-zinc-500">TARGET</span>
            <span className="font-bold text-amber-500 text-sm">{data.target}</span>
            <span className="text-[10px] text-zinc-500">REMAINING</span>
            <span className="font-bold text-sm text-white">{Math.max(0, data.target - data.current)}</span>
          </>
        )}
      </div>
      {data.status && (
        <div className={`p-1 text-center font-black text-[9px] tracking-widest ${data.statusColor}`}>{data.status}</div>
      )}
    </div>
  );
});

// ⚡ Bolt: Removed ReactFlow for rendering single nodes to eliminate bundle/memory bloat.
export const BattleFrontierDashboard = React.memo(({ saveData }: BattleFrontierDashboardProps) => {
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

  const facilities = objectKeys(FACILITY_NAMES).map((key) => {
    const symbols = gen3BattleFrontierSymbols[key] || { silver: false, gold: false };
    const variant: 'amber' | 'white' | 'default' = symbols.gold ? 'amber' : symbols.silver ? 'white' : 'default';
    const currentStreak = gen3BattleFrontierWinStreaks[key]?.current || 0;

    let target = null;
    let status = null;
    let statusColor = '';

    if (symbols.gold) {
      status = 'GOLD SYMBOL ACQUIRED';
      statusColor = 'bg-amber-500/20 text-amber-500 border-t border-dashed border-amber-500';
    } else if (symbols.silver) {
      target = FRONTIER_BRAIN_THRESHOLDS[key].gold;
      status = 'SILVER SYMBOL ACQUIRED';
      statusColor = 'bg-zinc-300/20 text-zinc-300 border-t border-dashed border-zinc-300';
    } else {
      target = FRONTIER_BRAIN_THRESHOLDS[key].silver;
    }

    const data = {
      label: FACILITY_NAMES[key],
      current: currentStreak,
      target,
      status,
      statusColor,
    };

    return {
      key,
      name: FACILITY_NAMES[key],
      symbols,
      variant,
      data,
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
            variant={facility.variant}
            className="flex h-[250px] flex-col gap-0 border-l-2 p-0"
          >
            <div className="flex items-center justify-between border-zinc-800 border-b border-dashed bg-black/40 p-3 pb-2">
              <span className="tactical-text z-10 font-black text-white">[ {facility.name} ]</span>
            </div>

            <div className="flex h-full w-full items-center justify-center bg-[#3f3f46]/20">
              <ProgressNode data={facility.data} />
            </div>
          </TacticalPanel>
        ))}
      </div>
    </div>
  );
});
