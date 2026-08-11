import { Check, CircleDot } from 'lucide-react';
import type React from 'react';
import { useStore } from '../../../store';
import { cn } from '../../../utils/cn';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export const Gen2NpcTrades: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 2) {
    return null;
  }

  const flags = saveData.npcTradeFlags;

  const checklist = [
    { label: 'ROCKY', acquired: flags?.[0] },
    { label: 'MUSCLE', acquired: flags?.[1] },
    { label: 'VOLTY', acquired: flags?.[2] },
    { label: 'DORIS', acquired: flags?.[3] },
    { label: 'MARBLE', acquired: flags?.[4] },
    { label: 'KEN', acquired: flags?.[5] },
    { label: 'SHUCKIE', acquired: flags?.[6] },
  ];

  return (
    <div className="mt-6 flex flex-col gap-6">
      <TacticalPanel className="relative flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
        <TelemetryDecoration label="SYS.GEN2_IN_GAME_TRADES" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center justify-between">
          <span className="tactical-text z-10 font-black font-mono text-lg text-white">IN-GAME TRADES</span>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item) => {
            const acquired = item.acquired === true;
            return (
              <div
                key={item.label}
                className={cn(
                  'group relative flex items-center gap-3 rounded-none border border-dashed p-3 transition-colors',
                  acquired ? 'border-emerald-900/50 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-950/50',
                )}
              >
                {acquired ? (
                  <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />
                )}
                <div className="flex min-w-0 flex-col">
                  <span
                    className={cn(
                      'truncate font-bold font-mono text-xs uppercase tracking-wider',
                      acquired ? 'text-zinc-500 line-through' : 'text-zinc-300',
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </TacticalPanel>
    </div>
  );
};
