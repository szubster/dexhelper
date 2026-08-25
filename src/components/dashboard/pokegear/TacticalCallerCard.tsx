import type { CallerType } from '../../../engine/saveParser/parsers/gen2/phone/constants';
import type { Contact } from '../../../engine/saveParser/parsers/gen2/phone/predictor';
import { CornerCrosshairs } from '../../CornerCrosshairs';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';

interface TacticalCallerCardProps {
  contact: Contact;
  type: CallerType;
  details?: string | undefined;
  probability: number;
}

export function TacticalCallerCard({ contact, type, details, probability }: TacticalCallerCardProps) {
  let themeColors = {
    border: 'border-cyan-900/30 hover:border-cyan-500/50',
    hoverScanner: 'via-cyan-500/10',
    crosshairs: 'border-cyan-900/50 group-hover:border-cyan-500/50',
    probBg: 'bg-cyan-950/80',
    probBorder: 'border-cyan-900/50',
    probText: 'text-cyan-400',
    targetLock: 'text-cyan-700',
    badgeBg: '',
    badgeText: '',
  };

  if (type === 'SWARM') {
    themeColors = {
      border: 'border-fuchsia-900/30 hover:border-fuchsia-500/50',
      hoverScanner: 'via-fuchsia-500/10',
      crosshairs: 'border-fuchsia-900/50 group-hover:border-fuchsia-500/50',
      probBg: 'bg-fuchsia-950/80',
      probBorder: 'border-fuchsia-900/50',
      probText: 'text-fuchsia-400',
      targetLock: 'text-fuchsia-700',
      badgeBg: 'bg-fuchsia-950/80 border-fuchsia-900/50',
      badgeText: 'text-fuchsia-400',
    };
  } else if (type === 'ITEM') {
    themeColors = {
      border: 'border-amber-900/30 hover:border-amber-500/50',
      hoverScanner: 'via-amber-500/10',
      crosshairs: 'border-amber-900/50 group-hover:border-amber-500/50',
      probBg: 'bg-amber-950/80',
      probBorder: 'border-amber-900/50',
      probText: 'text-amber-400',
      targetLock: 'text-amber-700',
      badgeBg: 'bg-amber-950/80 border-amber-900/50',
      badgeText: 'text-amber-400',
    };
  }

  const isCoolingDown = probability === 0;

  return (
    <div
      className={`group relative flex flex-col gap-2 rounded-none border-2 border-dashed bg-black/60 p-3 font-mono text-xs transition-colors ${themeColors.border}`}
    >
      <LcdGrid className="opacity-10" />
      <HoverScanner colorClass={themeColors.hoverScanner} />
      <CornerCrosshairs className={`h-2 w-2 ${themeColors.crosshairs}`} thickness={2} />

      <div
        className={`absolute top-0 right-0 rounded-none border-b-2 border-l-2 border-dashed px-2 py-1 text-[9px] ${themeColors.probBg} ${themeColors.probBorder} ${themeColors.probText}`}
      >
        PROB: {probability}%
      </div>

      <div className="flex w-full flex-col gap-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`tactical-text text-[10px] ${themeColors.targetLock}`}>[ TARGET_LOCK ]</span>
            <span className="font-bold text-white uppercase tracking-widest">{contact.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${isCoolingDown ? 'bg-amber-500/50' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'}`}
            />
          </div>
        </div>

        {(type === 'SWARM' || type === 'ITEM') && (
          <div className="z-10 mt-1 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={`tactical-text rounded-none border border-dashed px-1.5 py-0.5 text-[9px] ${themeColors.badgeBg} ${themeColors.badgeText}`}
              >
                [ {type} ]
              </span>
              {details && <span className="truncate text-[10px] text-zinc-300">{details}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
