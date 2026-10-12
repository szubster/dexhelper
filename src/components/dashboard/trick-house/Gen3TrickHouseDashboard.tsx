import React from 'react';
import type { Gen3SaveData } from '../../../engine/saveParser/parsers/common';
import { DataPoint } from '../../DataPoint';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3TrickHouseDashboardProps {
  saveData: Gen3SaveData;
}

const LEVEL_HM_REQUIREMENTS: Record<number, string> = {
  1: 'Cut',
  2: 'None',
  3: 'Rock Smash',
  4: 'Strength',
  5: 'None',
  6: 'None',
  7: 'None',
  8: 'None',
};

export const Gen3TrickHouseDashboard = React.memo(({ saveData }: Gen3TrickHouseDashboardProps) => {
  const trickHouse = saveData.gen3TrickHouse;

  if (!trickHouse) {
    return null;
  }

  const currentRequirement = LEVEL_HM_REQUIREMENTS[trickHouse.level] || 'Unknown';
  const prizeReady = trickHouse.prizePickup === 2;

  return (
    <TacticalPanel className="mt-4 flex flex-col border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.TRICK_HOUSE" className="-top-[17px] left-[-1px]" />
      <div className="z-10 mb-4 flex items-center justify-between">
        <span className="tactical-text text-lg text-white">TRICK HOUSE</span>
        {prizeReady && (
          <span className="rounded-none border border-[var(--theme-primary)] border-dashed px-2 py-1 font-bold font-mono text-[10px] text-[var(--theme-primary)]">
            PRIZE WAITING
          </span>
        )}
      </div>
      <div className="z-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DataPoint label="LEVEL" value={trickHouse.level} />
        <DataPoint label="HM REQUIREMENT" value={currentRequirement} />
        <DataPoint label="ENTRANCE STATE" value={trickHouse.entranceState} />
        <DataPoint label="PRIZE PICKUP" value={trickHouse.prizePickup} />
        <DataPoint label="LANDMARK FLAG" value={trickHouse.landmarkFlag ? 'TRUE' : 'FALSE'} />
        <DataPoint label="ENTER FROM CORRIDOR" value={trickHouse.enterFromCorridor} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(trickHouse.puzzles).map(([key, val]) => (
          <DataPoint key={key} label={key.toUpperCase()} value={String(val)} />
        ))}
      </div>
    </TacticalPanel>
  );
});
