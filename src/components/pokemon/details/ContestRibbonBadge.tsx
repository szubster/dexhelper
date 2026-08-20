import { Award, ShieldAlert } from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils/cn';
import { CornerCrosshairs } from '../../CornerCrosshairs';
import { DataLabel } from '../../DataLabel';
import { HoverScanner } from '../../HoverScanner';
import { LcdGrid } from '../../LcdGrid';

export type ContestConditionType = 'Cool' | 'Beauty' | 'Cute' | 'Smart' | 'Tough';
export type ContestRibbonRank = 'Normal' | 'Super' | 'Hyper' | 'Master';

export interface ContestRibbonBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: ContestConditionType;
  rank: ContestRibbonRank;
}

const typeColorMap: Record<ContestConditionType, string> = {
  Cool: 'border-red-500/30 shadow-[inset_2px_0_0_rgba(239,68,68,0.8)] bg-red-950/10 hover:border-red-500/60 hover:bg-red-950/30',
  Beauty:
    'border-blue-500/30 shadow-[inset_2px_0_0_rgba(59,130,246,0.8)] bg-blue-950/10 hover:border-blue-500/60 hover:bg-blue-950/30',
  Cute: 'border-pink-500/30 shadow-[inset_2px_0_0_rgba(236,72,153,0.8)] bg-pink-950/10 hover:border-pink-500/60 hover:bg-pink-950/30',
  Smart:
    'border-emerald-500/30 shadow-[inset_2px_0_0_rgba(16,185,129,0.8)] bg-emerald-950/10 hover:border-emerald-500/60 hover:bg-emerald-950/30',
  Tough:
    'border-amber-500/30 shadow-[inset_2px_0_0_rgba(245,158,11,0.8)] bg-amber-950/10 hover:border-amber-500/60 hover:bg-amber-950/30',
};

const typeTextColorMap: Record<ContestConditionType, string> = {
  Cool: 'text-red-500',
  Beauty: 'text-blue-500',
  Cute: 'text-pink-500',
  Smart: 'text-emerald-500',
  Tough: 'text-amber-500',
};

const rankColorMap: Record<ContestRibbonRank, string> = {
  Normal: 'text-zinc-400 bg-zinc-950 border-zinc-800',
  Super: 'text-zinc-200 bg-zinc-900 border-zinc-700',
  Hyper: 'text-yellow-400 bg-yellow-950 border-yellow-900/50',
  Master: 'text-purple-400 bg-purple-950 border-purple-900/50',
};

const getTooltipText = (type: ContestConditionType, rank: ContestRibbonRank) => {
  return `${type} Contest - ${rank} Rank Ribbon`;
};

export const ContestRibbonBadge = React.forwardRef<HTMLDivElement, ContestRibbonBadgeProps>(
  ({ type, rank, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        title={getTooltipText(type, rank)}
        className={cn(
          'group relative flex flex-col justify-between overflow-hidden rounded-none border border-dashed p-3 transition-all duration-300',
          typeColorMap[type],
          className,
        )}
        {...props}
      >
        <LcdGrid className="opacity-[0.03]" />
        <HoverScanner />
        <CornerCrosshairs />

        <div className="relative z-10 mb-4 flex items-start justify-between">
          <div className="flex flex-col">
            <DataLabel>${type}_SYS</DataLabel>
            <span
              className={cn('mt-0.5 font-black font-display text-xl uppercase tracking-tight', typeTextColorMap[type])}
            >
              {type}
            </span>
          </div>
          <Award className={cn('h-5 w-5', rankColorMap[rank]?.split(' ')[0] || 'text-zinc-500')} aria-hidden="true" />
        </div>

        <div className="relative z-10 flex items-center justify-between border-white/5 border-t border-dashed pt-3">
          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">CLEARANCE</span>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 border border-dashed px-1.5 py-0.5 font-bold font-mono text-[9px] uppercase tracking-wider',
              rankColorMap[rank],
            )}
          >
            {rank === 'Master' && <ShieldAlert size={8} />}
            {rank}
          </span>
        </div>
      </div>
    );
  },
);

ContestRibbonBadge.displayName = 'ContestRibbonBadge';
