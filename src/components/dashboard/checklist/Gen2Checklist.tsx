import type React from 'react';
import { useStore } from '../../../store';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export const Gen2Checklist: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 2) {
    return null;
  }

  const flags = saveData.gen2StaticEncounters;
  const dailyEvents = saveData.gen2DailyEvents;

  const checklist = [
    { label: 'SUDOWOODO', acquired: flags?.sudowoodo },
    { label: 'SNORLAX', acquired: flags?.snorlax },
    { label: 'RED GYARADOS', acquired: flags?.redGyarados },
    { label: 'HO-OH', acquired: flags?.hoOh },
    { label: 'LUGIA', acquired: flags?.lugia },
  ];

  const dailyChecklist = [
    { label: 'MYSTERY GIFT', acquired: dailyEvents?.mysteryGift },
    { label: 'FRIDAY LAPRAS', acquired: dailyEvents?.fridayLapras },
    { label: 'BUG CATCHING CONTEST', acquired: dailyEvents?.bugCatchingContest },
    { label: 'HAIRCUT (OLDER)', acquired: dailyEvents?.haircutBrothers?.older },
    { label: 'HAIRCUT (YOUNGER)', acquired: dailyEvents?.haircutBrothers?.younger },
    { label: 'MONICA (MONDAY)', acquired: dailyEvents?.weekdaySiblings?.monica },
    { label: 'TUSCANY (TUESDAY)', acquired: dailyEvents?.weekdaySiblings?.tuscany },
    { label: 'WESLEY (WEDNESDAY)', acquired: dailyEvents?.weekdaySiblings?.wesley },
    { label: 'ARTHUR (THURSDAY)', acquired: dailyEvents?.weekdaySiblings?.arthur },
    { label: 'FRIEDA (FRIDAY)', acquired: dailyEvents?.weekdaySiblings?.frieda },
    { label: 'SANTOS (SATURDAY)', acquired: dailyEvents?.weekdaySiblings?.santos },
    { label: 'SUNNY (SUNDAY)', acquired: dailyEvents?.weekdaySiblings?.sunny },
    { label: 'BUENA NO BLUE CARD', acquired: dailyEvents?.buenasPassword?.offeredNumberNoBlueCard },
    { label: 'BUENA OFFERED NUMBER', acquired: dailyEvents?.buenasPassword?.offeredNumber },
    { label: 'BUENA MET', acquired: dailyEvents?.buenasPassword?.metBuena },
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
      <TacticalPanel className="relative flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN2_STATIC_ENCOUNTERS" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black text-lg text-white">STATIC ENCOUNTERS</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => (
            <TacticalChecklistItem key={item.label} label={item.label} acquired={item.acquired === true} />
          ))}
        </div>
      </TacticalPanel>

      <TacticalPanel className="relative flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN2_DAILY_EVENTS" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black text-lg text-white">DAILY / WEEKLY EVENTS</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {dailyChecklist.map((item) => (
            <TacticalChecklistItem key={item.label} label={item.label} acquired={item.acquired === true} />
          ))}
        </div>
      </TacticalPanel>
    </div>
  );
};
