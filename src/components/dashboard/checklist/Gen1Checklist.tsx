import type React from 'react';
import { STATIC_GIFT_DATA } from '../../../engine/data/gen1/assistantData';
import { useStore } from '../../../store';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export const Gen1Checklist: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 1) {
    return null;
  }

  const flags = saveData.gen1StaticEncounters;

  // We want to map through the STATIC_GIFT_DATA and render a checklist item for each.
  // Grouping by location/reason is generally good, but simple list for now as per Gen2 format.
  // We filter out items with no eventFlag since we can't track them.

  const checklistItems = Object.entries(STATIC_GIFT_DATA)
    .filter(([, data]) => data.eventFlag !== undefined)
    .map(([idStr, data]) => {
      const id = parseInt(idStr, 10);
      const isAcquired = flags ? flags[id] : false;
      return {
        label: data.name.toUpperCase(),
        acquired: isAcquired,
        originalId: id,
      };
    })
    // Optional: Sort them by some logical order if desired, maybe ID
    .sort((a, b) => a.originalId - b.originalId);

  // We have some specific logic for hitmonlee/hitmonchan, omanyte/kabuto as they are mutually exclusive in one playthrough usually, but let's just show them all.

  return (
    <div className="mt-6 flex flex-col gap-6">
      <TacticalPanel className="relative flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN1_STATIC_ENCOUNTERS" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black font-mono text-lg text-white">STATIC ENCOUNTERS</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {checklistItems.map((item) => (
            <TacticalChecklistItem key={item.label} label={item.label} acquired={item.acquired === true} />
          ))}
        </div>
      </TacticalPanel>
    </div>
  );
};
