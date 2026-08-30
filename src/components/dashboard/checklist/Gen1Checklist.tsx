import type React from 'react';
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

  const checklist = [
    { label: 'BULBASAUR', acquired: flags?.[1] },
    { label: 'CHARMANDER', acquired: flags?.[4] },
    { label: 'SQUIRTLE', acquired: flags?.[7] },
    { label: 'LAPRAS', acquired: flags?.[131] },
    { label: 'EEVEE', acquired: flags?.[133] },
    { label: 'HITMONLEE', acquired: flags?.[106] },
    { label: 'HITMONCHAN', acquired: flags?.[107] },
    { label: 'OMANYTE', acquired: flags?.[138] },
    { label: 'KABUTO', acquired: flags?.[140] },
    { label: 'AERODACTYL', acquired: flags?.[142] },
    { label: 'SNORLAX', acquired: flags?.[143] },
    { label: 'ARTICUNO', acquired: flags?.[144] },
    { label: 'ZAPDOS', acquired: flags?.[145] },
    { label: 'MOLTRES', acquired: flags?.[146] },
    { label: 'MEWTWO', acquired: flags?.[150] },
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
      <TacticalPanel className="relative flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN1_STATIC_ENCOUNTERS" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black font-mono text-lg text-white">STATIC ENCOUNTERS</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => (
            <TacticalChecklistItem key={item.label} label={item.label} acquired={item.acquired === true} />
          ))}
        </div>
      </TacticalPanel>
    </div>
  );
};
