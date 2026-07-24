import type { Contact, TimerState } from '../../../engine/saveParser/parsers/gen2/phone/predictor';

interface ActiveCallersDashboardProps {
  contacts: Contact[];
  timerState: TimerState;
}

export function ActiveCallersDashboard({ contacts, timerState }: ActiveCallersDashboardProps) {
  const isCoolingDown = timerState.delayMinsRemaining > 0;
  const probability = isCoolingDown ? 0 : 50;

  return (
    <div className="flex flex-col gap-4 rounded-none border border-zinc-800 border-dashed bg-zinc-950 p-4 font-mono">
      <h2 className="border-zinc-800 border-b border-dashed pb-2 font-black text-white text-xl uppercase tracking-widest">
        Active Callers
      </h2>
      <div className="text-sm text-zinc-400">Status: {isCoolingDown ? 'COOLING DOWN' : 'ACTIVE'}</div>

      {contacts.length === 0 ? (
        <div className="py-4 text-center text-zinc-500">NO SIGNAL</div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between rounded-none border border-zinc-800 border-dashed bg-zinc-900/50 p-3"
            >
              <span className="font-bold text-zinc-200">{contact.name}</span>
              <span className="text-[var(--theme-primary)] text-xs">PROBABILITY: {probability}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
