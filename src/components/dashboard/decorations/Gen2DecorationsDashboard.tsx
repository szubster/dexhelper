import type React from 'react';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { Gen2RoomDecorationDashboard } from '../../gen2/Gen2RoomDecorationDashboard';
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
    <TacticalPanel className="mt-4 flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.ROOM_DECORATIONS" className="-top-[17px] left-[-1px]" />
      <Gen2RoomDecorationDashboard activeDecorations={active} unlockedDecorations={unlocked} />
    </TacticalPanel>
  );
};
