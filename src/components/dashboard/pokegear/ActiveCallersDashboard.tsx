import type { Contact, TimerState } from '../../../engine/saveParser/parsers/gen2/phone/predictor';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

interface ActiveCallersDashboardProps {
  contacts: Contact[];
  timerState: TimerState;
}

export function ActiveCallersDashboard({ contacts, timerState }: ActiveCallersDashboardProps) {
  const isCoolingDown = timerState.delayMinsRemaining > 0;
  const probability = isCoolingDown ? 0 : 50;

  return (
    <TacticalPanel variant={isCoolingDown ? 'amber' : 'cyan'} className="relative flex flex-col gap-5 p-5 font-mono">
      <TelemetryDecoration label="SYS.SIGNAL_INTERCEPT" className="-top-3 left-4 bg-zinc-950" />

      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <h2 className="font-black text-lg text-white uppercase tracking-widest">Active Callers</h2>
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
          <span className="text-zinc-500">STATUS:</span>
          <span className={isCoolingDown ? 'text-amber-500' : 'text-cyan-500'}>
            [ {isCoolingDown ? 'COOLING DOWN' : 'ACTIVE'} ]
          </span>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="group relative overflow-hidden border border-zinc-800 border-dashed bg-black/40 py-8 text-center hover:border-zinc-500">
          <LcdGrid className="opacity-10" />
          <HoverScanner colorClass="via-white/5" />
          <span className="relative z-10 font-bold text-zinc-600 uppercase tracking-[0.3em]">[ NO_SIGNAL ]</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="group relative flex items-center justify-between border-zinc-800 border-t border-r border-b border-l-[3px] border-dashed bg-black/40 p-3 pl-4 transition-colors hover:border-zinc-500 hover:bg-black/60"
            >
              <LcdGrid className="opacity-10" />
              <HoverScanner />

              <div className="absolute top-1/2 -left-[4px] h-2 w-2 -translate-y-1/2 border border-zinc-600 bg-zinc-900 group-hover:border-[var(--theme-primary)] group-hover:bg-[var(--theme-primary)]" />

              <div className="relative z-10 flex flex-col">
                <span className="font-black text-[9px] text-zinc-500 tracking-widest group-hover:text-zinc-400">
                  [ SIGNAL_SOURCE ]
                </span>
                <span className="font-bold text-sm text-zinc-200 uppercase tracking-tight">{contact.name}</span>
              </div>

              <div className="relative z-10 flex flex-col items-end">
                <span className="font-black text-[9px] text-zinc-500 tracking-widest">[ PROBABILITY ]</span>
                <span className="font-bold text-[var(--theme-primary)]">{probability}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </TacticalPanel>
  );
}
