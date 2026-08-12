import type { HighValueContact } from '../../../engine/saveParser/parsers/gen2/phone/constants';
import type { Contact } from '../../../engine/saveParser/parsers/gen2/phone/predictor';
import { cn } from '../../../utils/cn';
import { CornerCrosshairs } from '../../CornerCrosshairs';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';

export interface TacticalCallerCardProps {
  contact: Contact;
  highValueData?: Omit<HighValueContact, 'id'>;
  probability: number;
  isCoolingDown: boolean;
}

export function TacticalCallerCard({ contact, highValueData, probability, isCoolingDown }: TacticalCallerCardProps) {
  const type = highValueData?.type || 'NONE';
  const details = highValueData?.details;

  let borderColorClass = 'border-cyan-900/30 group-hover:border-cyan-500/50';
  let badgeBorderColorClass = 'border-cyan-900/50';
  let badgeTextColorClass = 'text-cyan-400';
  let badgeBgClass = 'bg-cyan-950/80';
  let typeTextColorClass = 'text-cyan-700';
  let hoverColorClass = 'via-cyan-500/10';
  let crosshairsColorClass = 'border-cyan-900/50 group-hover:border-cyan-500/50';

  if (type === 'SWARM') {
    borderColorClass = 'border-fuchsia-900/30 group-hover:border-fuchsia-500/50';
    badgeBorderColorClass = 'border-fuchsia-900/50';
    badgeTextColorClass = 'text-fuchsia-400';
    badgeBgClass = 'bg-fuchsia-950/80';
    typeTextColorClass = 'text-fuchsia-700';
    hoverColorClass = 'via-fuchsia-500/10';
    crosshairsColorClass = 'border-fuchsia-900/50 group-hover:border-fuchsia-500/50';
  } else if (type === 'ITEM') {
    borderColorClass = 'border-amber-900/30 group-hover:border-amber-500/50';
    badgeBorderColorClass = 'border-amber-900/50';
    badgeTextColorClass = 'text-amber-400';
    badgeBgClass = 'bg-amber-950/80';
    typeTextColorClass = 'text-amber-700';
    hoverColorClass = 'via-amber-500/10';
    crosshairsColorClass = 'border-amber-900/50 group-hover:border-amber-500/50';
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-2 rounded-none border-2 border-dashed bg-black/60 p-3 font-mono text-xs transition-colors',
        borderColorClass,
      )}
    >
      <LcdGrid className="opacity-10" />
      <HoverScanner colorClass={hoverColorClass} />
      <CornerCrosshairs className={cn('h-2 w-2', crosshairsColorClass)} thickness={2} />

      <div
        className={cn(
          'absolute top-0 right-0 rounded-none border-b-2 border-l-2 border-dashed px-2 py-1 text-[9px]',
          badgeBorderColorClass,
          badgeBgClass,
          badgeTextColorClass,
        )}
      >
        PROB: {probability}%
      </div>

      <div className="flex w-full flex-col gap-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className={cn('tactical-text text-[10px]', typeTextColorClass)}>[ TARGET_LOCK ]</span>
              {type !== 'NONE' && (
                <span className={cn('tactical-text font-bold text-[10px]', badgeTextColorClass)}>[ {type} ]</span>
              )}
            </div>
            <span className="font-bold text-white uppercase tracking-widest">{contact.name}</span>
            {details && <span className="tactical-text text-[10px] text-zinc-400">INFO: {details}</span>}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'h-2 w-2 rounded-none',
                isCoolingDown ? 'bg-amber-500/50' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
              )}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
