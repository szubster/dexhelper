import React from 'react';
import type { Gen3MysteryGift } from '../../../engine/saveParser/parsers/common';
import { DataPoint } from '../../DataPoint';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface MysteryEventTrackerProps {
  mysteryGiftData?: Gen3MysteryGift | undefined;
}

export const MysteryEventTracker = React.memo(({ mysteryGiftData }: MysteryEventTrackerProps) => {
  if (!mysteryGiftData) {
    return null;
  }

  return (
    <TacticalPanel
      className="mt-4 flex flex-col border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6"
      aria-label="Mystery Event Tracker"
    >
      <TelemetryDecoration label="SYS.MYSTERY_EVENT" className="-top-[17px] left-[-1px]" />
      <span className="tactical-text z-10 mb-4 text-lg text-white">MYSTERY EVENT TRACKER</span>

      <div className="z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4" aria-live="polite">
        <DataPoint
          label="EON TICKET"
          value={mysteryGiftData.hasEonTicket ? 'ACQUIRED' : 'MISSING'}
          valueClassName={mysteryGiftData.hasEonTicket ? 'text-emerald-400' : 'text-red-400'}
        />
        <DataPoint
          label="SOUTHERN ISLAND"
          value={mysteryGiftData.isSouthernIslandEnabled ? 'ENABLED' : 'DISABLED'}
          valueClassName={mysteryGiftData.isSouthernIslandEnabled ? 'text-emerald-400' : 'text-zinc-500'}
        />

        <DataPoint
          label="MYSTIC TICKET"
          value={mysteryGiftData.hasMysticTicket ? 'ACQUIRED' : 'MISSING'}
          valueClassName={mysteryGiftData.hasMysticTicket ? 'text-emerald-400' : 'text-red-400'}
        />
        <DataPoint
          label="NAVEL ROCK"
          value={mysteryGiftData.isNavelRockEnabled ? 'ENABLED' : 'DISABLED'}
          valueClassName={mysteryGiftData.isNavelRockEnabled ? 'text-emerald-400' : 'text-zinc-500'}
        />

        <DataPoint
          label="AURORA TICKET"
          value={mysteryGiftData.hasAuroraTicket ? 'ACQUIRED' : 'MISSING'}
          valueClassName={mysteryGiftData.hasAuroraTicket ? 'text-emerald-400' : 'text-red-400'}
        />
        <DataPoint
          label="BIRTH ISLAND"
          value={mysteryGiftData.isBirthIslandEnabled ? 'ENABLED' : 'DISABLED'}
          valueClassName={mysteryGiftData.isBirthIslandEnabled ? 'text-emerald-400' : 'text-zinc-500'}
        />

        <DataPoint
          label="OLD SEA MAP"
          value={mysteryGiftData.hasOldSeaMap ? 'ACQUIRED' : 'MISSING'}
          valueClassName={mysteryGiftData.hasOldSeaMap ? 'text-emerald-400' : 'text-red-400'}
        />
        <DataPoint
          label="FARAWAY ISLAND"
          value={mysteryGiftData.isFarawayIslandEnabled ? 'ENABLED' : 'DISABLED'}
          valueClassName={mysteryGiftData.isFarawayIslandEnabled ? 'text-emerald-400' : 'text-zinc-500'}
        />
      </div>
    </TacticalPanel>
  );
});
