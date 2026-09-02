import React from 'react';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { DataPoint } from '../../DataPoint';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3TrickHouseDashboardProps {
  saveData: SaveData;
}

export const Gen3TrickHouseDashboard = React.memo(({ saveData }: Gen3TrickHouseDashboardProps) => {
  if (saveData.generation !== 3) {
    return null;
  }

  const trickHouse = saveData.gen3TrickHouse;

  if (!trickHouse) {
    return null;
  }

  // Calculate puzzles completed based on levels and entrance states etc, though we just display raw for now or format nicely
  return (
    <TacticalPanel className="mt-4 flex flex-col border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.TRICK_HOUSE" className="-top-[17px] left-[-1px]" />
      <span className="tactical-text z-10 mb-4 font-black text-lg text-white">TRICK HOUSE</span>
      <div className="z-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DataPoint label="LEVEL" value={trickHouse.level} />
        <DataPoint label="ENTRANCE STATE" value={trickHouse.entranceState} />
        <DataPoint label="ENTER FROM CORRIDOR" value={trickHouse.enterFromCorridor} />
        <DataPoint label="PRIZE PICKUP" value={trickHouse.prizePickup} />
        <DataPoint label="LANDMARK FLAG" value={trickHouse.landmarkFlag ? 'TRUE' : 'FALSE'} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(trickHouse.puzzles).map(([key, val]) => (
          <DataPoint key={key} label={key.toUpperCase()} value={val} />
        ))}
      </div>
    </TacticalPanel>
  );
});
