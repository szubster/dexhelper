import { GEN2_PHONE_CALLER_REGISTRY } from '../../../engine/saveParser/parsers/gen2/phone/constants';
import type { Contact, TimerState } from '../../../engine/saveParser/parsers/gen2/phone/predictor';
import { CornerCrosshairs } from '../../CornerCrosshairs';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';
import { TacticalCallerCard } from './TacticalCallerCard';

interface ActiveCallersDashboardProps {
  contacts: Contact[];
  timerState: TimerState;
}

export function ActiveCallersDashboard({ contacts, timerState }: ActiveCallersDashboardProps) {
  const isCoolingDown = timerState.delayMinsRemaining > 0;
  const probability = isCoolingDown ? 0 : 50;

  return (
    <div className="flex flex-col gap-6">
      <TacticalPanel
        variant="cyan"
        className="relative mt-4 flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6"
      >
        <TelemetryDecoration label="SYS.SIGNAL_INTERCEPT" className="-top-[17px] left-[-1px]" />

        <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
          <span className="tactical-text z-10 font-black text-lg text-white">ACTIVE CALLERS MATRIX</span>
          <div className="z-10 flex items-center gap-2">
            <span className="tactical-text text-[10px] text-zinc-500">[ FREQUENCY_STATUS ]</span>
            <span
              className={`font-black text-xs tracking-widest ${isCoolingDown ? 'animate-pulse text-amber-500' : 'text-emerald-500'}`}
            >
              {isCoolingDown ? 'COOLING_DOWN' : 'ACTIVE'}
            </span>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="z-10 flex flex-col items-center justify-center rounded-none border-2 border-zinc-800 border-dashed bg-black/40 p-12">
            <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
              <CornerCrosshairs className="h-2 w-2 border-zinc-600/50" thickness={2} />
              <div className="absolute h-8 w-8 animate-ping rounded-none border border-zinc-700 opacity-20"></div>
              <div className="absolute h-16 w-16 animate-[spin_4s_linear_infinite] rounded-none border-zinc-600 border-t border-r opacity-30"></div>
            </div>
            <span className="tactical-text text-zinc-500">[ SEARCHING_FOR_SIGNALS... ]</span>
          </div>
        ) : (
          <div className="z-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {contacts.map((contact) => {
              const registryEntry = GEN2_PHONE_CALLER_REGISTRY[contact.id];
              return (
                <TacticalCallerCard
                  key={contact.id}
                  contact={contact}
                  type={registryEntry ? registryEntry.type : 'NONE'}
                  details={registryEntry ? registryEntry.details : undefined}
                  probability={probability}
                />
              );
            })}
          </div>
        )}
      </TacticalPanel>
    </div>
  );
}
