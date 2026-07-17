import type React from 'react';
import type { Contact, TimerState } from '../../../engine/saveParser/parsers/gen2/phone/predictor';
import { EmptyState } from '../../EmptyState';
import { SectionHeader } from '../../SectionHeader';
import { TacticalCard } from '../../TacticalCard';
import { TacticalPanel } from '../../TacticalPanel';

export interface ActiveCallersDashboardProps {
  contacts: Contact[];
  timerState: TimerState;
}

export const ActiveCallersDashboard: React.FC<ActiveCallersDashboardProps> = ({ contacts, timerState }) => {
  // If delayed, total call chance is 0. Otherwise it's 50%.
  const isDelayed = timerState.delayMinsRemaining > 0;
  const baseCallChance = isDelayed ? 0 : 50;

  // Individual probability is base chance divided by number of available contacts
  const hasContacts = contacts && contacts.length > 0;
  const individualCallChance = hasContacts ? baseCallChance / contacts.length : 0;

  return (
    <div className="flex flex-col gap-4 font-mono">
      <TacticalPanel variant="default" className="rounded-none border-zinc-500/50 border-dashed p-4">
        <SectionHeader title="ACTIVE CALLERS PREDICTOR" className="mb-4 text-zinc-300" />

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-none border border-zinc-700 border-dashed bg-zinc-900/50 p-3">
            <span className="text-sm text-zinc-400">COOLDOWN</span>
            <span className={`font-bold text-sm ${isDelayed ? 'text-red-400' : 'text-emerald-400'}`}>
              {isDelayed ? `${timerState.delayMinsRemaining} MINS REMAINING` : 'READY'}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-none border border-zinc-700 border-dashed bg-zinc-900/50 p-3">
            <span className="text-sm text-zinc-400">BASE CALL CHANCE</span>
            <span className="font-bold text-emerald-400 text-sm">{baseCallChance}%</span>
          </div>
        </div>

        {!hasContacts ? (
          <EmptyState label="NO ACTIVE CALLERS" className="rounded-none border-dashed" />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <TacticalCard key={contact.id} variant="default" className="rounded-none border-dashed">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <span className="truncate pr-2 font-bold text-zinc-200">{contact.name}</span>
                    <span className="shrink-0 text-xs text-zinc-500">ID: {contact.id.toString().padStart(3, '0')}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-zinc-800 border-t border-dashed pt-2">
                    <span className="text-xs text-zinc-400">CALL PROBABILITY</span>
                    <span
                      className={`font-bold text-sm ${individualCallChance > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}
                    >
                      {individualCallChance.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </TacticalCard>
            ))}
          </div>
        )}
      </TacticalPanel>
    </div>
  );
};
