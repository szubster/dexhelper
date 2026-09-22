import { Crosshair } from 'lucide-react';
import type React from 'react';
import { GEN2_NARRATIVE_ORDER, getUpcomingGen2Boss } from '../../../engine/saveParser/utils/gen2EventFlags';
import { useStore } from '../../../store';
import { cn } from '../../../utils/cn';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

const NARRATIVE_LABELS: Record<string, string> = {
  EVENT_RIVAL_CHERRYGROVE_CITY: 'RIVAL (CHERRYGROVE)',
  EVENT_BEAT_FALKNER: 'FALKNER',
  EVENT_RIVAL_AZALEA_TOWN: 'RIVAL (AZALEA)',
  EVENT_BEAT_BUGSY: 'BUGSY',
  EVENT_BEAT_WHITNEY: 'WHITNEY',
  EVENT_RIVAL_BURNED_TOWER: 'RIVAL (BURNED TOWER)',
  EVENT_BEAT_MORTY: 'MORTY',
  EVENT_BEAT_CHUCK: 'CHUCK',
  EVENT_BEAT_JASMINE: 'JASMINE',
  EVENT_CLEARED_ROCKET_HIDEOUT: 'ROCKET HIDEOUT',
  EVENT_BEAT_PRYCE: 'PRYCE',
  EVENT_RIVAL_GOLDENROD_UNDERGROUND: 'RIVAL (GOLDENROD)',
  EVENT_CLEARED_RADIO_TOWER: 'RADIO TOWER',
  EVENT_BEAT_CLAIR: 'CLAIR',
  EVENT_RIVAL_VICTORY_ROAD: 'RIVAL (VICTORY ROAD)',
  EVENT_BEAT_ELITE_4_WILL: 'WILL (E4)',
  EVENT_BEAT_ELITE_4_KOGA: 'KOGA (E4)',
  EVENT_BEAT_ELITE_4_BRUNO: 'BRUNO (E4)',
  EVENT_BEAT_ELITE_4_KAREN: 'KAREN (E4)',
  EVENT_BEAT_CHAMPION_LANCE: 'LANCE (CHAMPION)',
  EVENT_BEAT_LTSURGE: 'LT. SURGE',
  EVENT_BEAT_SABRINA: 'SABRINA',
  EVENT_BEAT_ERIKA: 'ERIKA',
  EVENT_BEAT_JANINE: 'JANINE',
  EVENT_BEAT_MISTY: 'MISTY',
  EVENT_BEAT_BROCK: 'BROCK',
  EVENT_BEAT_BLAINE: 'BLAINE',
  EVENT_BEAT_BLUE: 'BLUE',
  EVENT_BEAT_RIVAL_IN_MT_MOON: 'RIVAL (MT. MOON)',
  EVENT_RED_IN_MT_SILVER: 'RED (MT. SILVER)',
};

export const Gen2Checklist: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 2) {
    return null;
  }

  const flags = saveData.gen2StaticEncounters;
  const dailyEvents = saveData.gen2DailyEvents;
  const narrativeFlags = saveData.gen2NarrativeFlags || {};
  const upcomingBoss = getUpcomingGen2Boss(narrativeFlags);

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
      <TacticalPanel className="relative flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN2_NARRATIVE_EVENTS" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black text-lg text-white">NARRATIVE EVENTS</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {GEN2_NARRATIVE_ORDER.map((eventKey) => {
            const acquired = narrativeFlags[eventKey] === true;
            const isUpcoming = eventKey === upcomingBoss;
            const isFuture = !acquired && !isUpcoming;

            return (
              <TacticalChecklistItem
                key={eventKey}
                label={NARRATIVE_LABELS[eventKey] || eventKey}
                acquired={acquired}
                interactive={isUpcoming}
                className={cn(isFuture && 'opacity-50')}
                customIcon={isUpcoming ? <Crosshair className="h-4 w-4 shrink-0 text-amber-500" /> : undefined}
              />
            );
          })}
        </div>
      </TacticalPanel>

      <TacticalPanel className="relative flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
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

      <TacticalPanel className="relative flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
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
